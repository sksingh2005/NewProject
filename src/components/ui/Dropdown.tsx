import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dropdown({ buttonLabel, buttonIcon: Icon, options }: any) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative " ref={ref}>
      {/* Button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.1 }}
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg cursor-pointer"
      >
        {Icon && <Icon size={20} />}
        {buttonLabel}
      </motion.button>

      {/* Animated Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -6 }}
            transition={{
              duration: 0.18,
              ease: [0.16, 1, 0.3, 1], // smooth "pop" easing
              delay: 0.05,
            }}
            className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-[100]"
          >
            {options.map((opt: any, idx: number) => (
              <motion.button
                key={idx}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  opt.onClick?.();
                  setOpen(false);
                }}
                className={`w-full text-left px-5 py-3.5 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-sm font-medium ${
                  idx !== options.length - 1
                    ? "border-b border-gray-100 dark:border-gray-700"
                    : ""
                }`}
              >
                {opt.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
