import Image from "next/image";
import localFont from "next/font/local";
import { Cinzel_Decorative } from "next/font/google";
import Link from "next/link";

const cinzelDecorative = Cinzel_Decorative({
  weight: ["400", "700"],
  subsets: ["latin"],
});
const minhaFonte = localFont({
  src: "./fonts/Mantinia Regular.otf",
});

export default function Home() {
  return (
    <div className="h-[100dvh] w-full bg-[url('/wallpaper.jpeg')] bg-cover bg-center flex flex-col justify-center items-center text-white">
      <div className="flex flex-1 flex-col justify-center items-center w-full backdrop-brightness-[0.85] px-4">
        {/* título */}
        <h1
          className={`${minhaFonte.className} text-5xl sm:text-7xl lg:text-8xl tracking-wide drop-shadow-[0_0_25px_rgba(255,255,255,0.9)] mb-10 sm:mb-12 text-center`}
        >
          EldenDle
        </h1>

        <div className="main text-center border border-white/40 justify-center items-center rounded-2xl w-full max-w-xs sm:max-w-md lg:max-w-lg py-8 sm:py-10 bg-black/40 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] backdrop-blur-sm mb-8">
          <ul className="flex flex-col items-center gap-6 text-white/90">
            {/* bosses */}
            <li className="w-full flex flex-col items-center gap-2">
              <Link href={"/bosses"} className="w-full flex justify-center">
                <div className="border border-white/40 font-semibold hover:shadow-[0_0_20px_2px_rgba(255,255,255,0.8)] transform transition duration-200 hover:scale-105 cursor-pointer rounded-lg w-[90%] h-12 flex justify-center items-center bg-white/5">
                  🎯 Bosses Challenge
                </div>
              </Link>
              <p className="text-xs sm:text-sm italic px-2">
                Guess the character by comparing attributes.
              </p>
            </li>

            <li className="w-full flex flex-col items-center gap-2">
              <Link href={"/quotes"} className="w-full flex justify-center">
                <div className="border border-white/40 font-semibold hover:shadow-[0_0_20px_2px_rgba(255,255,255,0.8)] transform transition duration-200 hover:scale-105 cursor-pointer rounded-lg w-[90%] h-12 flex justify-center items-center bg-white/5">
                  💬 Quotes Challenge
                </div>
              </Link>
              <p className="text-xs sm:text-sm italic px-2">
                Guess the owner of the quote and prove your knowledge.
              </p>
            </li>

            <li className="w-full flex flex-col items-center gap-2">
              <Link href={"/help"} className="w-full flex justify-center">
                <div className="border border-white/40 font-semibold hover:shadow-[0_0_20px_2px_rgba(255,255,255,0.8)] transform transition duration-200 hover:scale-105 cursor-pointer rounded-lg w-[90%] h-12 flex justify-center items-center bg-white/5">
                  ❓ Need Help?
                </div>
              </Link>
              <p className="text-xs sm:text-sm italic px-2">
                Meaning of attributes and how to contact me.
              </p>
            </li>
          </ul>
        </div>
        <div className="links flex gap-3">
          <a href="https://x.com/eldendle" target="_blank"><img className="rounded-full  w-12 h-12 transform transition duration-200 hover:scale-105 shadow-[rgba(0,0,0,0.16)_0px_10px_36px_0px,rgba(0,0,0,0.06)_0px_0px_0px_1px]" src="/x_icon.webp" alt="" /></a>
          <a href="https://github.com/trajanoo" target="_blank"><img className="rounded-full  w-12 h-12 bg-black transform transition duration-200 hover:scale-105 shadow-[rgba(0,0,0,0.16)_0px_10px_36px_0px,rgba(0,0,0,0.06)_0px_0px_0px_1px]" src="/github-90.png" alt="" /></a>
          <a href="https://ko-fi.com/trajano" target="_blank"><img className="rounded-full  w-12 h-12 transform transition duration-200 hover:scale-105 shadow-[rgba(0,0,0,0.16)_0px_10px_36px_0px,rgba(0,0,0,0.06)_0px_0px_0px_1px]" src="/ko_fi_logo_icon.png" alt="" /></a>
        </div>
      </div>

      <footer className="w-full py-4 px-4 sm:px-8 bg-black/60 backdrop-blur-sm border-t border-white/20">
        <p
          className={`${cinzelDecorative.className} text-center text-[10px] sm:text-xs text-white/70`}
        >
          <span className="text-white">Disclaimer:</span> This fan-made game is
          not affiliated with From Software or Elden Ring. All content is used
          for entertainment purposes only.
        </p>
      </footer>
    </div>
  );
}
