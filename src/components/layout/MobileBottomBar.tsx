import { Link } from "react-router-dom";
import { Phone, MessageCircle, Mail } from "lucide-react";

const MobileBottomBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-14 border-t border-primary-muted/20 bg-primary lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href="tel:+914440400400"
        className="flex flex-1 flex-col items-center justify-center gap-0.5 text-accent-foreground bg-accent"
      >
        <Phone className="h-5 w-5" />
        <span className="font-body text-[10px] font-medium">Call</span>
      </a>
      <a
        href="https://wa.me/914440400400"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 flex-col items-center justify-center gap-0.5 bg-teal text-teal-foreground"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="font-body text-[10px] font-medium">WhatsApp</span>
      </a>
      <Link
        to="/contact"
        className="flex flex-1 flex-col items-center justify-center gap-0.5 bg-primary text-primary-foreground"
      >
        <Mail className="h-5 w-5" />
        <span className="font-body text-[10px] font-medium">Enquire</span>
      </Link>
    </div>
  );
};

export default MobileBottomBar;
