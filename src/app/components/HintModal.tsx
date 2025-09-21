import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { Cinzel_Decorative } from "next/font/google";

const cinzelDecorative = Cinzel_Decorative({
  weight: ["400", "700"],
  subsets: ["latin"],
});

type HintModalProps = {
  show: boolean;
  hint?: string;
  onClose: () => void;
};

export default function HintModal({ show, hint, onClose }: HintModalProps) {
  if (!show) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div
            className={`relative bg-gradient-to-b from-[#0d0d0d]/95 to-[#1a1a1a]/95 border rounded-2xl shadow-2xl text-center px-8 py-6 w-[22rem] ${cinzelDecorative.className}`}
          >
            {/* Ornamento dourado superior */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-white rounded-full shadow-[0_0_8px_#fff]"></div>

            <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_#fff]">
              Guia da graça
            </h2>

            <p className="mt-4 text-gray-200 text-lg leading-relaxed">
              {hint ? (
                <>
                  <span className="text-yellow-300 font-semibold">Dica:</span>{" "}
                  {hint}
                </>
              ) : (
                "No hints available..."
              )}
            </p>

            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 text-lg font-semibold rounded-lg border border-white text-white hover:bg-yellow-700/30 transition-all duration-200 shadow-[0_0_10px_#fff]"
            >
              Fechar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
