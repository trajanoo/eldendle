'use client'
import localFont from "next/font/local";
import { Cinzel_Decorative } from "next/font/google";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import WinModal from "../components/WinModal";
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import HintModal from "../components/HintModal";
import CharacterAutocomplete from "../components/CharactersAutoComplete";

const minhaFonte = localFont({
    src: '../fonts/Mantinia Regular.otf',
})
const cinzelDecorative = Cinzel_Decorative({
    weight: ["400", "700"],
    subsets: ["latin"],
});

type Personagem = {
    id: string,
    nome: string,
    fala: string,
    contexto: string,
    regiao: string,
    tipo: string,
    genero: string,
    dificuldade: string,
    dica1: string,
    dica2: string,
    imagem_url: string
}

type Attempt = {
    value: string,
    imagem_url: string
    isCorrect: boolean
}

export default function QuotesChallenge() {
    const [characters, setCharacters] = useState<Personagem[]>([])
    const [dailyQuote, setDailyQuote] = useState<Personagem | null>(null);
    const [inputValue, setInputValue] = useState<string>("");
    const [attempts, setAttempts] = useState<Attempt[]>([]);
    const [numberOfAttempts, setNumberOfAttempts] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showConfetti, setShowConfetti] = useState(false);
    const [showHintModal, setShowHintModal] = useState(false)
    const [currentHint, setCurrentHint] = useState<string | null>();
    const { width, height } = useWindowSize();
    const [availableCharacters, setAvailableCharacters] = useState<Personagem[]>([])
    const [shake, setShake] = useState<boolean>(false)
    const [shakeHint1, setShakeHint1] = useState(false)
    const [shakeHint2, setShakeHint2] = useState(false)

    function handleWin() {
        setShowConfetti(true)
        setShowModal(true)
    }

    function handleHintModal(hint: string) {
        setCurrentHint(hint)
        setShowHintModal(true)
    }

    useEffect(() => {
        async function fetchCharacters() {
            const { data, error } = await supabase.from("personagens").select("*");
            if (error) {
                console.error("error: " + error);
                return;
            }
            const filtered = data.filter((d) => d.fala !== "null")
            setCharacters(filtered)
            setAvailableCharacters(filtered);

            const hoje = new Date();
            const seed = Math.floor(hoje.getTime() / (1000 * 60 * 60 * 24));
            const index = seed % data.length;
            setDailyQuote(data[index]);
        }

        fetchCharacters();
    }, []);

    const listaRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if (listaRef.current) {
            listaRef.current.scrollTop = listaRef.current.scrollHeight
        }
    }, [attempts])

    function handleUserAttempt() {
        if (attempts.some(a => a.isCorrect)) {
            handleWin()
            return;
        }

        const verification = characters.find((c) => c.nome === inputValue)
        if (!verification) return;

        setAvailableCharacters(prev => prev.filter((c) => c.nome !== verification.nome));

        if (verification.nome === dailyQuote?.nome) {
            setAttempts(prev => [...prev, {
                value: verification.nome,
                imagem_url: verification.imagem_url,
                isCorrect: true
            }])

            setShake(false)
            handleWin()
        } else {
            setAttempts(prev => [...prev, {
                value: verification.nome,
                imagem_url: verification.imagem_url,
                isCorrect: false
            }])

            setShake(true)
            setNumberOfAttempts(prev => prev + 1);
            setInputValue("")
        }
    }

    // reset diário
const hoje = new Date().toISOString().split("T")[0];
const attemptsKey = `quotesAttempts-${hoje}`;
const numberKey = `quotesNumberOfAttempts-${hoje}`;

    useEffect(() => {
        const storedAttempts = localStorage.getItem(attemptsKey)
        const storedNumbers = localStorage.getItem(numberKey)

        if (storedAttempts && storedAttempts !== "undefined") {
            setAttempts(JSON.parse(storedAttempts))
        }
        if (storedNumbers && storedNumbers !== "undefined") {
            setNumberOfAttempts(Number(storedNumbers))
        }
    }, [attemptsKey, numberKey])

    useEffect(() => {
        localStorage.setItem(attemptsKey, JSON.stringify(attempts))
        localStorage.setItem(numberKey, numberOfAttempts.toString());
    }, [attempts, numberOfAttempts, attemptsKey, numberKey])

    return (
        <div className={`min-h-screen w-full bg-[url('/wallpaper.jpeg')] bg-cover bg-center flex flex-col justify-center items-center`}>
            <div className="flex-grow flex flex-col items-center w-full mt-6">
                <h1 className={`${minhaFonte.className} text-5xl md:text-7xl 2xl:text-8xl drop-shadow-[0_0_10px_#fff] mb-8`}>EldenDle</h1>
                <div className="bg-black/50 rounded-2xl border w-[80vw] 2xl:w-auto p-10">
                    <p className={`${cinzelDecorative.className} font-extrabold text-center text-md md:text-2xl`}>{`"${dailyQuote?.fala}"`}</p>
                </div>

                <div className="flex justify-center items-center mt-5 gap-6">
                    <button
                        onClick={() => {
                            if (numberOfAttempts >= 3) {
                                handleHintModal(dailyQuote?.dica1 || "")
                            } else {
                                setShakeHint1(true)
                                setTimeout(() => setShakeHint1(false), 500)
                            }
                        }}
                        className={`px-6 py-2 rounded-lg border font-semibold transition-all duration-200 ${numberOfAttempts >= 3
                            ? "border text-white hover:bg-yellow-700/30 bg-black/60 shadow-[0_0_8px_#fff] cursor-pointer"
                            : `border-white/40 text-white/50 bg-black/40  ${shakeHint1 ? 'shake' : ''}`
                            }`}
                    >
                        {numberOfAttempts >= 3 ? "💡 Hint 1" : "🚫 Hint 1"}
                    </button>

                    <button
                        onClick={() => {
                            if (numberOfAttempts >= 6) {
                                handleHintModal(dailyQuote?.dica2 || "")
                            } else {
                                setShakeHint2(true)
                                setTimeout(() => setShakeHint2(false), 500)
                            }
                        }}
                        className={`px-6 py-2 rounded-lg border font-semibold transition-all duration-200 ${numberOfAttempts >= 6
                            ? "border text-white hover:bg-yellow-700/30 bg-black/60 shadow-[0_0_8px_#fff] cursor-pointer"
                            : `border-white/40 text-white/50 bg-black/40 ${shakeHint2 ? 'shake' : ''}`
                            }`}
                    >
                        {numberOfAttempts >= 6 ? "💡 Hint 2" : "🚫 Hint 2"}
                    </button>
                </div>
                {showHintModal && (
                    <HintModal show={showHintModal} hint={currentHint || undefined} onClose={() => setShowHintModal(false)} />
                )}
            </div>

            <main className="flex flex-col md:mt-5 2xl:mt-0 items-center justify-center">
                <div ref={listaRef} className="lista text-white px-5 2xl:w-80 md:h-96 h-72 2xl:h-[50vh] overflow-y-auto flex flex-col gap-5 text-center">
                    {attempts.map((attempt) => (
                        <div key={attempt.value} className={`${attempt.isCorrect ? 'bg-[#35B957]' : 'bg-[#DF5858]'} ${shake ? 'shake' : ''} border-2 py-2 flex flex-col text-center items-center justify-center rounded-md`}>
                            <img src={attempt.imagem_url} className="w-16 h-16 object-cover" alt="" />
                            <h1 className="mt-2 px-2 font-extrabold">{attempt.value}</h1>
                        </div>
                    ))}
                </div>

                <div className="w-20 h-20 flex items-center justify-center">
                    <div className="flex">
                        <CharacterAutocomplete key={numberOfAttempts} characters={availableCharacters.map(c => ({
                            nome: c.nome,
                            imagem_url: c.imagem_url
                        }))} onSelect={(c) => setInputValue(c.nome)} />
                        <div onClick={handleUserAttempt} className="cursor-pointer border-2 p-2 flex h-10 justify-center items-center rounded-md ml-2">
                            <SendIcon />
                        </div>
                    </div>
                </div>
            </main>

            <footer className="w-full py-3 px-4 bg-black/60 backdrop-blur-sm border-t border-white/20 mt-6">
                <p className={`${cinzelDecorative.className} text-center text-[10px] sm:text-xs text-white/70`}>
                    <span className="text-white">Disclaimer:</span> This fan-made game is not affiliated with From Software or Elden Ring.  
                    All content is used for entertainment purposes only.
                </p>
            </footer>

            {showConfetti && <Confetti width={width} height={height} numberOfPieces={300}
                gravity={0.5}
                wind={0.02}
                initialVelocityX={{ min: -10, max: 10 }}
                initialVelocityY={{ min: 10, max: 10 }} />}
            <WinModal
                show={showModal}
                attempts={numberOfAttempts + 1}
                characterImg={dailyQuote?.imagem_url}
                characterName={dailyQuote?.nome}
                onClose={() => {
                    setShowModal(false)
                    setShowConfetti(false)
                }}
            />
        </div>
    )
}