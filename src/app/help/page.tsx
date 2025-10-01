import localFont from "next/font/local";
import { Cinzel_Decorative } from "next/font/google";
import Link from "next/link";

const cinzelDecorative = Cinzel_Decorative({
  weight: ["400", "700"],
  subsets: ["latin"],
});
const minhaFonte = localFont({
  src: "../fonts/Mantinia Regular.otf",
});

export default function Help() {
  return (
    <div className="h-[100dvh] w-full bg-[url('/wallpaper.jpeg')] bg-cover bg-center flex flex-col justify-between items-center text-white">
      <div className="flex-grow flex flex-col justify-center items-center w-full backdrop-brightness-[0.85] px-6 sm:px-12">
        <h1 className={`${minhaFonte.className} text-5xl mt-10 md:mt-5 md:text-7xl 2xl:text-8xl drop-shadow-[0_0_10px_#fff] mb-8`}>EldenDle</h1>

        <div className="text-center border rounded-2xl w-full max-w-2xl py-10 px-8 bg-black/40 backdrop-blur-sm mb-10 leading-relaxed">
          <h2
            className={`${cinzelDecorative.className} drop-shadow-[0_0_020px_#fff] font-bold  text-2xl sm:text-3xl mb-8 text-white `}
          >
            📖 How to Play
          </h2>
          <p className="text-base text-white/80 mb-6 italic">
            As a Tarnished, you are challenged with trials of memory and
            knowledge. Each step shall test your wisdom of the Lands Between.
          </p>


          <div className="w-full drop-shadow-[0_0_020px_#fff] h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent mb-8" />

          <h2
            className={`${cinzelDecorative.className} text-2xl drop-shadow-[0_0_020px_#fff] font-bold sm:text-3xl mb-6 text-white`}
          >
            🗝️ Attributes
          </h2>
          <ul className="text-base text-white/80 space-y-4 text-left">
            <li>
              ⚔️ <span className="font-semibold text-white">Region:</span>{" "}
              The land where the boss resides — Limgrave, Caelid, Liurnia, and more.
            </li>
            <li>
              🛡️ <span className="font-semibold text-white">Difficulty:</span>{" "}
              A community-based measure of how tough the boss feels, ranging from Easy to Hard.
            </li>
            <li>
              🕐 <span className="font-semibold text-white">First Appearance:</span>{" "}
              The point in the game where the boss is usually encountered — Early, Mid, or Endgame.
            </li>
            <li>
              🔄 <span className="font-semibold text-white">Phases:</span>{" "}
              Number of distinct stages the boss has in battle, each with new abilities or transformations.
            </li>
            <li>
              🐉 <span className="font-semibold text-white">Species:</span>{" "}
              The in-game “biology” of the boss — human, demigod, dragon, beast, cosmic being, etc.
            </li>
          </ul>


          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent my-8" />

          <h2
            className={`${cinzelDecorative.className} drop-shadow-[0_0_020px_#fff] font-bold  text-2xl sm:text-3xl mb-6 text-white`}
          >
            📬 Contact
          </h2>
          <p className="text-base text-white/80">
            Should you discover flaws in the fabric of this realm, whisper to me
            at{" "}
            <Link
              href="mailto:brunotrajano.dev@gmail.com"
              className="underline hover:text-yellow-100 transition"
            >
              brunotrajano.dev@gmail.com
            </Link>{" "}
            or through{" "}
            <Link
              href="https://github.com/trajanoo"
              target="_blank"
              className="underline hover:text-yellow-100 transition"
            >
              GitHub
            </Link>
            .
          </p>
        </div>

        <Link href="/" className="mt-4">
          <div className="border font-semibold hover:shadow-[0_0_25px_rgba(255,255,150,0.9)] transform transition duration-200 hover:scale-105 cursor-pointer rounded-lg px-6 py-2 bg-white/5 text-white">
            ⬅️ Return to Grace
          </div>
        </Link>
      </div>

      <footer className="w-full py-3 px-4 bg-black/60 backdrop-blur-sm border-t border-white/20 mt-6">
        <p className={`${cinzelDecorative.className} text-center text-[10px] sm:text-xs text-white/70`}>
          <span className="text-white">Disclaimer:</span> This fan-made game is not affiliated with From Software or Elden Ring.
          All content is used for entertainment purposes only.
        </p>
      </footer>
    </div>
  );
}
