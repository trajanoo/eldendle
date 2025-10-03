import { useEffect, useState } from "react";
import { Cinzel_Decorative } from "next/font/google";
import localFont from "next/font/local";
import { motion } from "motion/react"
import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const minhaFonte = localFont({
    src: '../fonts/Mantinia Regular.otf',
})

const cinzelDecorative = Cinzel_Decorative({
    weight: ["400", "700"],
    subsets: ["latin"],
});

type WinModalProps = {
    show: boolean;
    attempts: number;
    characterName?: string;
    characterImg?: string;
    onClose: () => void;
};

export default function WinModal({
    show,
    attempts,
    characterName,
    characterImg,
    onClose,
}: WinModalProps) {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());
    const pathname = usePathname()

    useEffect(() => {
        if (!show) return;

        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [show]);

    if (!show) return null;

    return (
        <AnimatePresence>
            {show && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}>
                        <div
                            className={`relative bg-gradient-to-b from-[#0d0d0d]/95 to-[#1a1a1a]/95 
  border border-yellow-600/40 rounded-2xl text-center shadow-2xl 
  max-w-md w-[90%] p-6 sm:p-8 mx-auto 
  overflow-hidden break-words ${cinzelDecorative.className}`}
                        >
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-yellow-600 rounded-full shadow-[0_0_10px_rgba(241,196,13,0.6)]"></div>

                            <button
                                onClick={onClose}
                                className="absolute cursor-pointer top-3 right-3 text-gray-400 text-xl hover:text-yellow-600 transition-colors duration-100"
                            >
                                ✕
                            </button>
                            <h1 className="drop-shadow-[0_0_10px_#fff] text-2xl md:text-3xl font-bold ">
                                Congratulations, Tarnished
                            </h1>

                            <p className="mt-3 text-gray-200">
                                You prevailed in{" "}
                                <span className="font-bold text-xl ">{attempts}</span>{" "}
                                attempts.
                            </p>

                            {characterImg && (
                                <div className="mt-6">
                                    <img
                                        src={characterImg}
                                        alt={characterName}
                                        className="w-40 h-40 object-cover border-2 border-yellow-700/60 rounded-md shadow-lg mx-auto"
                                    />
                                </div>
                            )}

                            <h2 className={`${cinzelDecorative.className} mt-4 text-xl font-bold text-yellow-400 tracking-wide`}>
                                {characterName}
                            </h2>

                            <p className="mt-6 text-sm text-gray-400">
                                Next trial begins in:{" "}
                                <span className="font-extrabold text-yellow-400">{timeLeft}</span>
                            </p>

                            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent mt-8 mb-4" />

                            <div className="flex justify-center flex-col items-center">
                                <p className="mb-5">Next Mode:</p>
                                {pathname.startsWith("/bosses") ? (
                                    <Link href="/quotes">
                                        <button
                                            className="px-6 py-2 text-lg cursor-pointer font-semibold rounded-lg border border-yellow-700/60 text-yellow-400 hover:bg-yellow-700/30 transition-all duration-200 shadow-[0_0_10px_rgba(241,196,13,0.3)]">
                                            Quotes Challenge
                                        </button>
                                    </Link>
                                ) : (
                                    <Link href="/bosses">
                                        <button
                                            className="px-6 py-2 text-lg cursor-pointer font-semibold rounded-lg border border-yellow-700/60 text-yellow-400 hover:bg-yellow-700/30 transition-all duration-200 shadow-[0_0_10px_rgba(241,196,13,0.3)]">
                                            Bosses Challenge
                                        </button>
                                    </Link>
                                )}
                            </div>

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function getTimeLeft() {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0);

    const diff = tomorrow.getTime() - now.getTime();

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
    )}:${String(seconds).padStart(2, "0")}`;
}
