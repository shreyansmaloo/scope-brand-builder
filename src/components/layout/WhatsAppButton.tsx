import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="https://wa.me/914440400400"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Chat with us on WhatsApp"
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="hidden rounded-full bg-card px-4 py-2 font-body text-sm font-medium text-foreground shadow-lg lg:block"
          >
            Chat with us on WhatsApp →
          </motion.span>
        )}
      </AnimatePresence>

      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-accent animate-pulse-ring" />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-accent shadow-lg transition-transform hover:scale-110">
          <MessageCircle className="h-7 w-7 text-accent-foreground" />
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
