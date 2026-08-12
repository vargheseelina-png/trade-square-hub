import { createFileRoute } from "@tanstack/react-router";
import { Users, UserCheck, Phone, Mail, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { MANAGER } from "@/lib/society";

export const Route = createFileRoute("/committee")({
  head: () => ({
    meta: [
      { title: "Managing Committee — Trade Square Society, Saki Naka" },
      {
        name: "description",
        content:
          "Meet the Managing Committee and Core Signatory Members of Trade Square Premises Cooperative Society Ltd., Saki Naka, Mumbai.",
      },
      { property: "og:title", content: "Managing Committee — Trade Square Society" },
      {
        property: "og:description",
        content:
          "Managing Committee, authorized signatories and Society Management contact for Trade Square, Saki Naka, Mumbai.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommitteePage,
});

const COMMITTEE = [
  { name: "Mr. A.Y. Sakaria", role: "Chairman" },
  { name: "Mr. Varghese Jacob", role: "Hon. Secretary" },
  { name: "Mr. Vishal Chhabria", role: "Treasurer" },
  { name: "Mr. Vinay Mohan Puri", role: "Committee Member" },
  { name: "Mrs. Seema Varghese", role: "Committee Member" },
  { name: "Mrs. Shyama Sakaria", role: "Committee Member" },
  { name: "Mr. Tony Fernandes", role: "Committee Member" },
  { name: "Mr. M.N. Patel", role: "Committee Member" },
];

const SIGNATORIES = COMMITTEE.slice(0, 3);

function initials(name: string) {
  return name
    .replace(/^(Mr\.|Mrs\.|Ms\.)\s*/, "")
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function CommitteePage() {
  return (
    <div className="pt-28">
      <section className="bg-sky py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.25em] text-primary">GOVERNANCE</p>
            <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Managing Committee</h1>
            <span className="gold-rule mt-5 block" />
            <p className="mt-4 max-w-xl text-lg">Together We Decide, Together We Progress.</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal className="mb-8 flex items-center gap-3">
          <Users className="text-primary" />
          <h2 className="text-2xl font-bold">Committee Members</h2>
        </Reveal>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COMMITTEE.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i * 70}>
              <article className="card-lift h-full rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
                <div
                  aria-hidden="true"
                  className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-deep font-display text-xl font-bold text-white"
                >
                  {initials(m.name)}
                </div>
                <p className="mt-1 text-[0.65rem] font-medium tracking-wide text-muted-foreground">
                  Photo coming soon
                </p>
                <h3 className="mt-3 text-base font-bold">{m.name}</h3>
                <p className="mt-1 text-sm font-semibold text-primary">{m.role}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-sky py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mb-8 flex items-center gap-3">
            <ShieldCheck className="text-gold" />
            <h2 className="text-2xl font-bold">Core Signatory Members</h2>
          </Reveal>
          <ul className="grid gap-6 md:grid-cols-3">
            {SIGNATORIES.map((m, i) => (
              <Reveal as="li" key={m.name} delay={i * 90}>
                <article className="card-lift h-full rounded-2xl border-t-4 border-gold bg-deep p-7 text-white shadow-soft">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-[0.68rem] font-bold tracking-wide text-gold">
                    <UserCheck size={13} /> AUTHORIZED SIGNATORY
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-white">{m.name}</h3>
                  <p className="mt-1 text-sm text-white/70">{m.role}</p>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-bold">Society Management</h2>
          <span className="gold-rule mt-4 block" />
        </Reveal>
        <Reveal delay={120}>
          <article className="card-lift mt-8 rounded-2xl border border-border bg-card p-8 shadow-soft">
            <h3 className="text-xl font-bold">{MANAGER.name}</h3>
            <p className="mt-1 text-sm font-semibold text-primary">{MANAGER.role}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-sky p-4">
                <p className="flex items-center gap-2 text-xs font-bold tracking-wider text-deep">
                  <Phone size={14} className="text-primary" /> PHONE
                </p>
                {MANAGER.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p}`}
                    className="mt-1 block text-sm font-semibold text-primary hover:underline"
                  >
                    {p}
                  </a>
                ))}
              </div>
              <div className="rounded-xl bg-sky p-4">
                <p className="flex items-center gap-2 text-xs font-bold tracking-wider text-deep">
                  <Mail size={14} className="text-primary" /> EMAIL
                </p>
                <a
                  href={`mailto:${MANAGER.email}`}
                  className="mt-1 block break-all text-sm font-semibold text-primary hover:underline"
                >
                  {MANAGER.email}
                </a>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Please route all inquiries through the Society Manager.
            </p>
          </article>
        </Reveal>
      </section>
    </div>
  );
}
