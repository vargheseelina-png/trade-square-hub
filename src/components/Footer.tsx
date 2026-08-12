import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { NAV, SOCIETY } from "@/lib/society";

export function Footer() {
  return (
    <footer className="mt-24 bg-deep text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-sm font-semibold text-white">{SOCIETY.fullName}</p>
          <p className="mt-2 flex gap-2 text-sm">
            <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
            <span>{SOCIETY.address}</span>
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-widest text-white">QUICK LINKS</h3>
          <span className="gold-rule mt-3 block" />
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-widest text-white">CONTACT</h3>
          <span className="gold-rule mt-3 block" />
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`tel:${SOCIETY.phoneHref}`}
                className="flex items-center gap-2 transition-colors hover:text-gold"
              >
                <Phone size={16} className="text-gold" />
                {SOCIETY.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SOCIETY.email}`}
                className="flex items-start gap-2 break-all transition-colors hover:text-gold"
              >
                <Mail size={16} className="mt-0.5 shrink-0 text-gold" />
                {SOCIETY.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs sm:px-6">
        © 2026 {SOCIETY.fullName} All rights reserved.
      </div>
    </footer>
  );
}
