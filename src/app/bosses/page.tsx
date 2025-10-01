'use client'

import Image from "next/image";
import localFont from "next/font/local";
import { Cinzel_Decorative } from "next/font/google";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import CharacterAutocomplete from "../components/CharactersAutoComplete";
import SendIcon from '@mui/icons-material/Send';
import WinModal from "../components/WinModal";
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import HintModal from "../components/HintModal";
import { motion } from "framer-motion"
import { useRef } from "react";

const minhaFonte = localFont({
    src: '../fonts/Mantinia Regular.otf',
})

const cinzelDecorative = Cinzel_Decorative({
    weight: ["400", "700"],
    subsets: ["latin"],
});


type Boss = {
    id: string
    nome: string
    fala: string
    contexto: string
    regiao: string
    genero: string
    dificuldade: string
    dica1: string
    dica2: string
    imagem_url: string
    first_appearance: string
    fases: string
    especie: string
}

export default function BossesChallenge() {
    const [bosses, setBosses] = useState<Boss[]>([])
    const [dailyBoss, setDailyBoss] = useState<Boss>()
    const [inputValue, setInputValue] = useState<string>()
    const [attempts, setAttempts] = useState<Boss[]>([])
    const [numberOfAttempts, setNumberOfAttempts] = useState<number>(0);
    const [showWinModal, setShowWinModal] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)
    const { width, height } = useWindowSize();
    const [shakeHint1, setShakeHint1] = useState(false)
    const [shakeHint2, setShakeHint2] = useState(false)
    const [currentHint, setCurrentHint] = useState<string | null>(null);
    const [showHintModal, setShowHintModal] = useState(false)
    const [availableCharacters, setAvailableCharacters] = useState<Boss[]>([])

    useEffect(() => {
        async function fetchBosses() {
            const { data, error } = await supabase.from("personagens").select("*")

            if (error) {
                console.error(error)
                return
            }

            if (data) {
                const filtered = data.filter((d) => d.tipo === "Boss")
                setBosses(filtered)
                setAvailableCharacters(filtered);

                const hoje = new Date()
                const seed = Math.floor(hoje.getTime() / (1000 * 60 * 60 * 24));
                const index = seed % filtered.length;
                const bossIndex = (index - 1 + filtered.length) % filtered.length;

                setDailyBoss(data[bossIndex])
            }
        }

        fetchBosses()
    }, [])

    function handleUserAttempt() {
        const verification = bosses.find((b) => inputValue === b.nome)
        if (!verification || !dailyBoss) return
        setAvailableCharacters(prev => prev.filter((c) => c.nome !== verification.nome));
        setAttempts((prev) => [...prev, verification])
        setNumberOfAttempts(prev => prev + 1)

        for (const key of Object.keys(verification) as (keyof Boss)[]) {
            const value = verification[key]
            const target = dailyBoss[key]


            if (value === target) {
                console.log(`igual em ${key}: ${value}`)
                setInputValue("")
            } else {
                console.log(`diferente em ${key}: ${value}`)
                setInputValue("")
            }
        }

        if (verification.nome === dailyBoss.nome) {
            handleWin()
        }
    }

    function handleHintModal(hint: string) {
        setCurrentHint(hint)
        setShowHintModal(true)
    }

    function handleWin() {
        setShowWinModal(true)
        setShowConfetti(true)
    }

    const hoje = new Date().toISOString().split("T")[0];
    const attemptsKey = `bossAttempts-${hoje}`;
    const numberKey = `bossNumberOfAttempts-${hoje}`;

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

    const listaRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if (listaRef.current) {
            listaRef.current.scrollTop = listaRef.current.scrollHeight
        }
    }, [attempts])


    useEffect(() => {
        localStorage.setItem(attemptsKey, JSON.stringify(attempts))
        localStorage.setItem(numberKey, String(numberOfAttempts))
    }, [attempts, numberOfAttempts, attemptsKey, numberKey])

    // 🔹 Quando o boss do dia mudar → confere se já acertou
    useEffect(() => {
        if (attempts.some((a) => a.nome === dailyBoss?.nome)) {
            handleWin()
        }
    }, [attempts, dailyBoss])

    return (
        <div className={`min-h-screen w-full bg-[url('/wallpaper.jpeg')] bg-cover bg-center flex flex-col justify-between items-center`}>
            <div className="flex-1 flex flex-col items-center w-full mt-6">
                <h1 className={`${minhaFonte.className} text-5xl text-white md:text-7xl 2xl:text-8xl drop-shadow-[0_0_10px_#fff] mb-8`}>EldenDle</h1>

                <div className="flex justify-center items-center mt-5 gap-6">
                    <button
                        onClick={() => {
                            if (numberOfAttempts >= 3) {
                                handleHintModal(dailyBoss?.dica1 || "")
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
                                handleHintModal(dailyBoss?.dica2 || "")
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
                <main ref={listaRef} className="lista px-5 w-full h-96 2xl:h-[50vh] overflow-y-auto max-w-5xl">
                    <div className="mt-8 w-full max-w-5xl overflow-y-auto">
                        <table className="w-full border-collapse text-center">
                            <thead>
                                <tr className="bg-black/60 text-white">
                                    <th className="p-2 border">Character</th>
                                    <th className="p-2 border">Gender</th>
                                    <th className="p-2 border">Region</th>
                                    <th className="p-2 border">Difficult</th>
                                    <th className="p-2 border">First Appearance</th>
                                    <th className="p-2 border">Phases</th>
                                    <th className="p-2 border">Species</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dailyBoss && attempts.map((attempt, i) => (
                                    <tr key={i}>
                                        <td className="p-2 border flex items-center justify-center gap-2">
                                            <img className="max-w-20 border h-16 object-cover" src={attempt.imagem_url} alt="" />
                                        </td>
                                        {(Object.keys(dailyBoss!) as (keyof Boss)[])
                                            .filter(key => ["regiao", "genero", "first_appearance", "dificuldade", "fases", "especie"].includes(key)) // só mostra os atributos principais
                                            .map((key, j) => {
                                                const isEqual = attempt[key] === dailyBoss![key]
                                                return (

                                                    <motion.td
                                                        initial={{ rotateY: 90, opacity: 0 }}
                                                        animate={{ rotateY: 0, opacity: 1 }}
                                                        transition={{ duration: 0.6, delay: j * 0.5 }}
                                                        key={key}
                                                        className={`p-2 border font-semibold ${isEqual ? "bg-green-600 text-white" : "bg-red-600 text-white"
                                                            }`}
                                                    >
                                                        {attempt[key]}
                                                    </motion.td>
                                                )
                                            })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </main>
            </div>

            <div className="flex my-5 2xl:mb-5">
                <CharacterAutocomplete key={numberOfAttempts} characters={availableCharacters.map(b => ({
                    nome: b.nome,
                    imagem_url: b.imagem_url
                }))} onSelect={(c) => setInputValue(c?.nome)} />

                <div onClick={handleUserAttempt} className="cursor-pointer text-white border-2 p-2 flex h-10  justify-center items-center rounded-md ml-2">
                    <SendIcon />
                </div>
            </div>

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
                show={showWinModal}
                attempts={numberOfAttempts}
                characterImg={dailyBoss?.imagem_url}
                characterName={dailyBoss?.nome}
                onClose={() => {
                    setShowWinModal(false)
                    setShowConfetti(false)
                }}
            />
        </div>
    )
}