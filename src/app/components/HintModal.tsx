import { motion } from "motion/react"
import { AnimatePresence } from "motion/react";

type HintModalProps = {
    show: boolean
    hint?: string
    onClose: () => void
}

export default function HintModal({ show, hint, onClose }: HintModalProps) {
    if(!show) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                    <div className="bg-black/50 rounded-md border p-3 text-center font-bold cursor-pointer">
                        <p>{`Hint 1: ${hint}`}</p>

                        <button
                                onClick={onClose}
                                className="mt-8 px-6 py-2 text-lg cursor-pointer font-semibold rounded-lg border border-yellow-700/60 text-yellow-400 hover:bg-yellow-700/30 transition-all duration-200 shadow-[0_0_10px_rgba(241,196,13,0.3)]"
                            >
                                Close
                            </button>
                    </div>

                    
                </motion.div>
            </div>
        </AnimatePresence>
    )
}