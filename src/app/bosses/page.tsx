import Image from "next/image";
import localFont from "next/font/local";
import { Cinzel_Decorative } from "next/font/google";
import Link from "next/link";

const minhaFonte = localFont({
    src: '../fonts/Mantinia Regular.otf',
})

const cinzelDecorative = Cinzel_Decorative({
    weight: ["400", "700"],
    subsets: ["latin"],
});

export default function BossesChallenge() {
    return (
        <div className={`min-h-screen w-full bg-[url('/wallpaper.jpeg')] bg-cover bg-center flex flex-col justify-between items-center`}>
            <div className="flex-grow flex flex-col justify-center items-center w-full">
                <h1 className={`${minhaFonte.className} text-8xl drop-shadow-[0_0_10px_#fff] mb-8`}>EldenDle</h1>

            </div>

            <footer className="w-full py-4 px-8 bg-black/50 backdrop-blur-sm">
                <p className={`${cinzelDecorative.className} text-center text-sm`}>
                    <span className="text-[#f1c40d]">Disclaimer:</span> This fan-made game is not affiliated with From Software or Elden Ring. All content is used for entertainment purposes only.
                </p>
            </footer>
        </div>
    )
}