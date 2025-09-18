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
    <div className={`min-h-screen w-full bg-[url('/wallpaper.jpeg')] bg-cover bg-center flex flex-col justify-between items-center`}>
      <div className="flex-grow flex flex-col justify-center items-center w-full">
        <h1 className={`${minhaFonte.className} text-8xl drop-shadow-[0_0_10px_#fff] mb-8`}>EldenDle</h1>
        <div className="main text-center border-3 justify-center items-center rounded-xl w-[22vw] py-10 bg-black/22 drop-shadow-2xl mb-8">
          <ul className="flex flex-col items-center gap-5 ">
            <Link href={"/bosses"}>
            <li className="border-2 font-bold hover:shadow-[0_0_15px_1px_rgba(255,255,255,0.7)] hover:shadow-white transform transition duration-200 hover:scale-105 cursor-pointer rounded-xl w-[18vw] h-10 flex justify-center bg-white/10 items-center">🎯 Bosses Challenge</li>
            </Link>
            <p>Guess the character by comparing attributes.</p>
            <Link href={"/quotes"}>
            <li className="border-2 font-bold hover:shadow-[0_0_15px_1px_rgba(255,255,255,0.7)] hover:shadow-white transform transition duration-200 hover:scale-105 cursor-pointer rounded-xl w-[18vw] h-10 flex justify-center bg-white/10 items-center">💬 Quotes Challenge</li>
            </Link>
            <p>Guess the quote owner by comparing attributes.</p>
            <li className="border-2 font-bold hover:shadow-[0_0_15px_1px_rgba(255,255,255,0.7)] hover:shadow-white transform transition duration-200 hover:scale-105 cursor-pointer rounded-xl w-[18vw] h-10 flex justify-center bg-white/10 items-center">❓ Need Help?</li>
            <p>Meaning of attributes and how to contact me.</p>
          </ul>
        </div>
      </div>

      <footer className="w-full py-4 px-8 bg-black/50 backdrop-blur-sm">
        <p className={`${cinzelDecorative.className} text-center text-sm`}>
          <span className="text-[#f1c40d]">Disclaimer:</span> This fan-made game is not affiliated with From Software or Elden Ring. All content is used for entertainment purposes only.
        </p>
      </footer>
    </div>
  );
}
