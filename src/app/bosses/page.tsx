'use client'

import Image from "next/image";
import localFont from "next/font/local";
import { Cinzel_Decorative } from "next/font/google";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import CharacterAutocomplete from "../components/CharactersAutoComplete";
import SendIcon from '@mui/icons-material/Send';

const minhaFonte = localFont({
    src: '../fonts/Mantinia Regular.otf',
})

const cinzelDecorative = Cinzel_Decorative({
    weight: ["400", "700"],
    subsets: ["latin"],
});

type Boss = {
    id: number,
    nome: string,
    titulo: string,
    regiao: string,
    tipo: string,
    genero: string,
    dificuldade: string,
    descricao: string,
    dica1: string,
    dica2: string,
    imagem_url: string
}

export default function BossesChallenge() {
    const [bosses, setBosses] = useState<Boss[]>([])
    const [dailyBoss, setDailyBoss] = useState<Boss>()
    const [inputValue, setInputValue] = useState<string>()
    const [attempts, setAttempts] = useState<Boss[]>([])
    const [userAttempt, setUserAttempt] = useState<Boss>()

    useEffect(() => {
        async function fetchBosses() {
            const { data, error } = await supabase.from("bosses").select("*")

            if (error) {
                console.error(error)
                return
            }

            if (data) setBosses(data)

            const hoje = new Date()
            const seed = Math.floor(hoje.getTime() / (1000 * 60 * 60 * 24));
            const index = seed % data.length;

            setDailyBoss(data[index])
        }

        fetchBosses()
    }, [])

    function handleUserAttempt() {
        const verification = bosses.find((b) => inputValue === b.nome)
        if (!verification || !dailyBoss) return
        setAttempts((prev) => [...prev, verification])

        for (const key of Object.keys(verification) as (keyof Boss)[]) {
            const value = verification[key]
            const target = dailyBoss[key]

            if (value === target) {
                console.log(`igual em ${key}: ${value}`)
            } else {
                console.log(`diferente em ${key}: ${value}`)
            }
        }
    }

    return (
        <div className={`min-h-screen w-full bg-[url('/wallpaper.jpeg')] bg-cover bg-center flex flex-col justify-between items-center`}>
            <div className="flex-grow flex flex-col items-center w-full mt-6">
                <h1 className={`${minhaFonte.className} text-8xl drop-shadow-[0_0_10px_#fff] mb-8`}>EldenDle</h1>
                <div className="bg-black/50 rounded-2xl border p-10">
                    <p className={`${cinzelDecorative.className} font-extrabold text-2xl`}>Adivinhe o Boss de hoje</p>
                </div>

                <main className="mt-8 w-full max-w-5xl overflow-y-auto">
                    <div className="mt-8 w-full max-w-5xl overflow-y-auto">
                        <table className="w-full border-collapse text-center">
                            <thead>
                                <tr className="bg-black/60 text-white">
                                    <th className="p-2 border">Personagem</th>
                                    <th className="p-2 border">Região</th>
                                    <th className="p-2 border">Tipo</th>
                                    <th className="p-2 border">Gênero</th>
                                    <th className="p-2 border">Dificuldade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attempts.map((attempt, i) => (
                                    <tr key={i}>
                                        <td className="p-2 border flex items-center justify-center gap-2">
                                            <img className="w-12 h-12 object-voer" src={attempt.imagem_url} alt="" />
                                        </td>
                                        {(Object.keys(dailyBoss!) as (keyof Boss)[])
                                            .filter(key => ["regiao", "tipo", "genero", "dificuldade"].includes(key)) // só mostra os atributos principais
                                            .map((key) => {
                                                const isEqual = attempt[key] === dailyBoss![key]
                                                return (
                                                    <td
                                                        key={key}
                                                        className={`p-2 border font-semibold ${isEqual ? "bg-green-600 text-white" : "bg-red-600 text-white"
                                                            }`}
                                                    >
                                                        {attempt[key]}
                                                    </td>
                                                )
                                            })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </main>
                <div className="flex">
                    { /* trocar charaters para availableCharacters depois */}
                    <CharacterAutocomplete characters={bosses.map(b => ({
                        personagem: b.nome,
                        imagem_url: b.imagem_url
                    }))} onSelect={(c) => setInputValue(c.personagem)} />

                    <div onClick={handleUserAttempt} className="cursor-pointer border-2 p-2 flex h-10  justify-center items-center rounded-md ml-2">
                        <SendIcon />
                    </div>
                </div>
            </div>

            <footer className="w-full py-4 px-8 bg-black/50 backdrop-blur-sm">
                <p className={`${cinzelDecorative.className} text-center text-sm`}>
                    <span className="text-[#f1c40d]">Disclaimer:</span> This fan-made game is not affiliated with From Software or Elden Ring. All content is used for entertainment purposes only.
                </p>
            </footer>
        </div>
    )
}