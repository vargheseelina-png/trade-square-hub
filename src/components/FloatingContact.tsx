import { useState } from "react";
import { Phone, Mail, MessageCircle, X, Headset } from "lucide-react";
import { MANAGER } from "@/lib/society";

export function FloatingContact() {
  const [open, setOpen] = useState(false);

  const actions = [
    {
      href: `tel:${MANAGER.phones[0]}`,
      label: `Call manager ${MANAGER.phones[0]}`,
      icon: Phone,
      text: "Call",
    },
    {
      href: `https://wa.me/91${MANAGER.phones[0]}`,
      label: "WhatsApp the Society Manager",
      icon: MessageCircle,
      text: "WhatsApp",
    },
    {
      href: `mailto:${MANAGER.email}`,
      label: "Email the Society Manager",
      icon: Mail,
      text: "Email",
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open &&
        actions.map((a, i) => (
          <a
            key={a.text}
            href={a.href}
            target={a.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={a.label}
            style={{ animationDelay: `${i * 60}ms` }}
            className="animate-in slide-in-from-bottom-2 fade-in flex items-center gap-2 rounded-full bg-card px-4 py-2.5 text-sm font-semibold text-deep shadow-lift transition-transform hover:scale-105"
          >
            <a.icon size={16} className="text-primary" />
            {a.text}
          </a>
        ))}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close contact options" : "Contact the Society Manager"}
        className="flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-lift transition-transform hover:scale-105"
      >
        {open ? <X size={18} /> : <Headset size={18} />}
        <span className="hidden sm:inline">{open ? "Close" : "Contact Manager"}</span>
      </button>
    </div>
  );
}
