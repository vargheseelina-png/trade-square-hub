import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { NAV } from "@/lib/society";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-background/95 shadow-soft backdrop-blur-md"
          : "bg-background/40 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="min-w-0" aria-label={`${"Trade Square"} home`}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-lg px-3.5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-sky hover:text-primary data-[status=active]:bg-sky data-[status=active]:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/"
            hash="contact"
            className="ml-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:scale-[1.03] hover:shadow-lift"
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-lg border border-border p-2 text-deep md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-border bg-background px-4 pb-4 pt-2 md:hidden"
          aria-label="Mobile navigation"
        >
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="block rounded-lg px-3 py-3 text-sm font-semibold text-muted-foreground data-[status=active]:bg-sky data-[status=active]:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/"
            hash="contact"
            className="mt-2 block rounded-xl bg-primary px-3 py-3 text-center text-sm font-semibold text-primary-foreground"
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
