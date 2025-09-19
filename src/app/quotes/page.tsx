'use client'
import localFont from "next/font/local";
import { Cinzel_Decorative } from "next/font/google";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import WinModal from "../components/WinModal";
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import HintModal from "../components/HintModal";

const minhaFonte = localFont({
    src: '../fonts/Mantinia Regular.otf',
})
const cinzelDecorative = Cinzel_Decorative({
    weight: ["400", "700"],
    subsets: ["latin"],
});


type Quote = {
    personagem: string,
    fala: string,
    contexto: string,
    regiao: string
    dica1: string,
    dica2: string,
    dica3: string,
    imagem_url: string
}

type attempt = {
    value: string,
    imagem_url: string
    isCorrect: boolean
}

export default function quotesChallenge() {
    const [quotes, setQuotes] = useState<Quote[]>([])
    const [dailyQuote, setDailyQuote] = useState<Quote | null>(null);
    const [inputValue, setInputValue] = useState<string>("");
    const [attempts, setAttempts] = useState<attempt[]>([]);
    const [numberOfAttempts, setNumberOfAttempts] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showConfetti, setShowConfetti] = useState(false);
    const [showHintModal, setShowHintModal] = useState(false)
    const { width, height } = useWindowSize();

    function handleWin() {
        setShowConfetti(true)
        setShowModal(true)
    }
    
    function handleHintModal() {
        setShowHintModal(true)
    }

    function handleInputChanges(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value)
    }

    useEffect(() => {
        async function fetchQuotes() {
            const { data, error } = await supabase.from("quotes").select("*");
            if (error) {
                console.error("error: " + error);
                return;
            }

            setQuotes(data);

            const hoje = new Date();
            const seed = Math.floor(hoje.getTime() / (1000 * 60 * 60 * 24));
            const index = seed % data.length;
            setDailyQuote(data[index]);
        }

        fetchQuotes();
    }, []);

    function handleUserAttempt() {
        if (attempts.some(a => a.isCorrect)) {
            handleWin()
            return;
        }

        const verification = quotes.find((q) => q.personagem === inputValue)
        if (!verification) {
            alert("Por favor, digite um nome válido.");
            return;
        }

        if (verification.personagem === dailyQuote?.personagem) {
            setAttempts(prev => [...prev, {
                value: verification.personagem,
                imagem_url: verification.imagem_url,
                isCorrect: true
            }])
            handleWin()
            setInputValue("")
        } else {
            setAttempts(prev => [...prev, {
                value: verification.personagem,
                imagem_url: verification.imagem_url,
                isCorrect: false
            }])

            setNumberOfAttempts(prev => prev + 1);
            setInputValue("")
        }
    }

    return (
        <div className={`min-h-screen w-full bg-[url('/wallpaper.jpeg')] bg-cover bg-center flex flex-col justify-center items-center`}>
            <div className="flex-grow flex flex-col items-center w-full mt-6">
                <h1 className={`${minhaFonte.className} text-8xl drop-shadow-[0_0_10px_#fff] mb-8`}>EldenDle</h1>
                <div className="bg-black/50 rounded-2xl border p-10">
                    <p className={`${cinzelDecorative.className} font-extrabold text-2xl`}>{`"${dailyQuote?.fala}"`}</p>
                </div>

                <div className="flex justify-center items-center mt-5 gap-10">
                    <button onClick={handleHintModal} className="bg-black/50 rounded-md border p-3 text-center font-bold cursor-pointer">💡 Hint 1</button>
                    <button className="bg-black/50 rounded-md border p-3 text-center font-bold cursor-pointer">💡 Hint 2</button>
                </div>

                <div>
                    {
                        showHintModal && <HintModal show={showHintModal} hint={dailyQuote?.dica1} onClose={() => setShowHintModal(false)} />
                    }
                </div>
            </div>

            <main className="flex flex-col items-center justify-center">

                <div className="lista px-5 w-80 h-96 2xl:h-[50vh] overflow-y-auto flex flex-col gap-5 text-center">
                    {attempts.map((attempt) => (
                        <div key={attempt.value} className={`${attempt.isCorrect ? 'bg-[#35B957]' : 'bg-[#DF5858]'} border-2 py-2 flex flex-col text-center items-center justify-center rounded-md`}>
                            <img src={attempt.imagem_url} className="w-16 h-16 object-cover" alt="" />
                            <h1 className="mt-2 font-extrabold">{attempt.value}</h1>
                        </div>
                    ))}
                </div>
                <div className="w-20 h-20 flex items-center justify-center">
                    <div className="flex">
                        <input onChange={handleInputChanges} value={inputValue} list="personagens" type="text" className=" h-10 bg-white text-black rounded-md pl-2" placeholder="Guess the owner of the quote... " />
                        <datalist id="personagens">
                            {quotes.map((q) => (
                                <option key={q.personagem} value={q.personagem}>{q.personagem}</option>
                            ))}
                        </datalist>
                        <div onClick={handleUserAttempt} className="cursor-pointer border-2 p-2 flex h-10  justify-center items-center rounded-md ml-2">
                            <SendIcon />
                        </div>
                    </div>
                </div>

            </main>

            <footer className="w-full py-4 px-8 bg-black/50 backdrop-blur-sm">
                <p className={`${cinzelDecorative.className} text-center text-sm`}>
                    <span className="text-[#f1c40d]">Disclaimer:</span> This fan-made game is not affiliated with From Software or Elden Ring. All content is used for entertainment purposes only.
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
                characterName={dailyQuote?.personagem}
                onClose={() => {
                    setShowModal(false)
                    setShowConfetti(false)
                }}
            />
        </div>
    )
}