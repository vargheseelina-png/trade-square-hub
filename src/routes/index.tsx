import { createFileRoute } from "@tanstack/react-router";
import {
  Building2,
  CalendarCheck,
  Layers,
  DoorOpen,
  Clock,
  MapPin,
  Phone,
  Mail,
  Award,
  Navigation,
  ImageOff,
} from "lucide-react";
import { Counter, Reveal } from "@/components/Reveal";
import { SOCIETY, MANAGER } from "@/lib/society";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trade Square — Commercial Address in Saki Naka, Mumbai" },
      {
        name: "description",
        content:
          "Trade Square Premises Cooperative Society Ltd. — a landmark commercial building at Saki Naka, Andheri–Kurla Road, Mumbai. Occupancy Certificate received.",
      },
      { property: "og:title", content: "Trade Square — Saki Naka, Mumbai" },
      {
        property: "og:description",
        content:
          "Together We Grow — office information, location and contacts for Trade Square Premises Cooperative Society Ltd., Mumbai.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const STATS = [
  { icon: CalendarCheck, label: "Established", value: 2025, plain: true },
  { icon: Layers, label: "Total Floors", value: 7, note: "Ground + 7 floors" },
  { icon: DoorOpen, label: "Office Units", value: 50, suffix: "+" },
];

function Home() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(SOCIETY.mapsQuery)}&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SOCIETY.mapsQuery)}`;

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-deep pb-20 pt-36 sm:pt-44">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-xs font-bold tracking-wider text-gold">
                <Award size={14} /> OCCUPANCY CERTIFICATE RECEIVED
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="mt-6 font-display text-5xl font-extrabold text-white sm:text-7xl">
                Trade Square
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-5 max-w-xl text-lg text-white/85 sm:text-xl">
                Together We Grow — A Landmark Commercial Address in Saki Naka, Mumbai.
              </p>
            </Reveal>
            <Reveal delay={360}>
              <a
                href="#contact"
                className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-primary shadow-lift transition-transform hover:scale-[1.04]"
              >
                Contact Us
              </a>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <div className="grid aspect-4/3 place-items-center rounded-2xl border border-dashed border-white/30 bg-white/5 p-8 text-center">
              <div>
                <ImageOff className="mx-auto text-gold" size={28} />
                <p className="mt-4 text-sm font-bold text-white">
                  Building photograph — content coming soon
                </p>
                <p className="mt-2 text-xs text-white/60">
                  A verified exterior photo of Trade Square will be published here.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OFFICE INFORMATION */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.25em] text-primary">OFFICE INFORMATION</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Trade Square at a glance</h2>
          <span className="gold-rule mt-5 block" />
        </Reveal>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal as="li">
            <article className="card-lift h-full rounded-2xl border border-border bg-card p-7 shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky text-primary">
                <Building2 size={20} />
              </span>
              <p className="mt-5 text-xs font-bold tracking-widest text-muted-foreground">
                BUILDING NAME
              </p>
              <p className="mt-1 font-display text-2xl font-extrabold text-deep">Trade Square</p>
              <p className="mt-2 text-sm">{SOCIETY.fullName}</p>
            </article>
          </Reveal>

          {STATS.map((s, i) => (
            <Reveal as="li" key={s.label} delay={(i + 1) * 80}>
              <article className="card-lift h-full rounded-2xl border border-border bg-card p-7 shadow-soft">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky text-primary">
                  <s.icon size={20} />
                </span>
                <p className="mt-5 text-xs font-bold tracking-widest text-muted-foreground">
                  {s.label.toUpperCase()}
                </p>
                <p className="mt-1 font-display text-4xl font-extrabold text-deep">
                  {s.plain ? s.value : <Counter value={s.value} suffix={s.suffix ?? ""} />}
                </p>
                {s.note && <p className="mt-2 text-sm">{s.note}</p>}
              </article>
            </Reveal>
          ))}

          <Reveal as="li" delay={320}>
            <article className="card-lift h-full rounded-2xl border border-border bg-card p-7 shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky text-primary">
                <Clock size={20} />
              </span>
              <p className="mt-5 text-xs font-bold tracking-widest text-muted-foreground">
                WORKING HOURS
              </p>
              <p className="mt-1 font-display text-2xl font-extrabold text-deep">
                Open all 7 days
              </p>
              <p className="mt-2 text-sm">Monday – Sunday</p>
            </article>
          </Reveal>

          <Reveal as="li" delay={400}>
            <span id="contact" className="block scroll-mt-28" />

            <article className="card-lift h-full rounded-2xl bg-gradient-deep p-7 text-white shadow-soft">
              <p className="text-xs font-bold tracking-widest text-gold">GET IN TOUCH</p>
              <a
                href={`tel:${SOCIETY.phoneHref}`}
                className="mt-4 flex items-center gap-2 text-sm font-semibold text-white hover:text-gold"
              >
                <Phone size={16} className="text-gold" />
                {SOCIETY.phone}
              </a>
              <a
                href={`mailto:${SOCIETY.email}`}
                className="mt-3 flex items-start gap-2 break-all text-sm font-semibold text-white hover:text-gold"
              >
                <Mail size={16} className="mt-0.5 shrink-0 text-gold" />
                {SOCIETY.email}
              </a>
              <p className="mt-4 text-xs text-white/65">
                Society Manager: {MANAGER.name} — {MANAGER.phones.join(" / ")}
              </p>
            </article>
          </Reveal>
        </ul>
      </section>

      {/* ABOUT + MAP */}
      <section className="bg-sky py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-extrabold">About Trade Square</h2>
            <span className="gold-rule mt-4 block" />
            <p className="mt-6">
              Trade Square is a commercial office building in Saki Naka, Mumbai, owned and governed
              by its members through Trade Square Premises Cooperative Society Ltd. Established in
              2025, the building comprises a ground floor plus seven upper floors with 50+ office
              units, and remains open all seven days of the week. The Society has received the
              Occupancy Certificate for Trade Square Premises — a milestone reflecting the
              collective effort of its members.
            </p>
            <p className="mt-6 flex items-start gap-2 rounded-xl bg-card p-4 text-sm font-semibold text-deep shadow-soft">
              <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
              {SOCIETY.address}
            </p>
            <a
              href={directions}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-soft transition-all hover:scale-[1.03] hover:shadow-lift"
            >
              <Navigation size={16} /> Get Directions
            </a>
          </Reveal>

          <Reveal delay={140}>
            <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
              <iframe
                title="Map showing the location of Trade Square, Saki Naka, Mumbai"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[420px] w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
