import Image from "next/image";
import localFont from "next/font/local";
import { Cinzel_Decorative } from "next/font/google";
import Link from "next/link";

const cinzelDecorative = Cinzel_Decorative({
  weight: ["400", "700"],
  subsets: ["latin"],
});
const minhaFonte = localFont({
  src: './fonts/Mantinia Regular.otf',
})

export default function Home() {
  return (
    <div className={`min-h-screen w-full bg-[url('/wallpaper.jpeg')] bg-cover bg-center flex flex-col justify-between items-center text-white`}>
      
      <div className="flex-grow flex flex-col justify-center items-center w-full backdrop-brightness-[0.85]">
        <h1 className={`${minhaFonte.className} text-8xl tracking-wide drop-shadow-[0_0_25px_rgba(255,255,255,0.9)] mb-12`}>
          EldenDle
        </h1>

        <div className="main text-center border border-white/40 justify-center items-center rounded-2xl w-[24vw] py-10 bg-black/40 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] backdrop-blur-sm mb-8">
          <ul className="flex flex-col items-center gap-6 text-white/90">
            
            <Link href={"/bosses"}>
              <li className="border border-white/40 font-semibold hover:shadow-[0_0_20px_2px_rgba(255,255,255,0.8)] transform transition duration-200 hover:scale-105 cursor-pointer rounded-lg w-[18vw] h-12 flex justify-center items-center bg-white/5">
                🎯 Bosses Challenge
              </li>
            </Link>
            <p className="text-sm italic">Guess the character by comparing attributes.</p>

            <Link href={"/quotes"}>
              <li className="border border-white/40 font-semibold hover:shadow-[0_0_20px_2px_rgba(255,255,255,0.8)] transform transition duration-200 hover:scale-105 cursor-pointer rounded-lg w-[18vw] h-12 flex justify-center items-center bg-white/5">
                💬 Quotes Challenge
              </li>
            </Link>
            <p className="text-sm italic">Guess the owner of the quote and prove your knowledge.</p>

            <li className="border border-white/40 font-semibold hover:shadow-[0_0_20px_2px_rgba(255,255,255,0.8)] transform transition duration-200 hover:scale-105 cursor-pointer rounded-lg w-[18vw] h-12 flex justify-center items-center bg-white/5">
              ❓ Need Help?
            </li>
            <p className="text-sm italic">Meaning of attributes and how to contact me.</p>
          </ul>
        </div>
      </div>

      <footer className="w-full py-4 px-8 bg-black/60 backdrop-blur-sm border-t border-white/20">
        <p className={`${cinzelDecorative.className} text-center text-xs text-white/70`}>
          <span className="text-white">Disclaimer:</span> This fan-made game is not affiliated with From Software or Elden Ring.  
          All content is used for entertainment purposes only.
        </p>
      </footer>
    </div>
  );
}
