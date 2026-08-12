import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Landmark, Copy, Check, Phone, IndianRupee, Banknote, Headset } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { MANAGER } from "@/lib/society";

export const Route = createFileRoute("/payments")({
  head: () => ({
    meta: [
      { title: "Payments — Trade Square Premises Cooperative Society" },
      {
        name: "description",
        content:
          "Quarterly legal & administrative charges of ₹6,000 and bank transfer details for Trade Square Premises Cooperative Society Ltd., Mumbai.",
      },
      { property: "og:title", content: "Payments — Trade Square Society" },
      {
        property: "og:description",
        content:
          "Quarterly charges, bank transfer details and payment support contact for Trade Square members.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PaymentsPage,
});

const BANK = [
  { label: "Bank Name", value: "The Mumbai District Co-operative Bank" },
  { label: "Branch", value: "Saki Naka" },
  { label: "Account Number", value: "037100600000544" },
  { label: "IFSC Code", value: "MDCB0680037" },
];

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-sky px-4 py-3.5">
      <div className="min-w-0">
        <p className="text-[0.68rem] font-bold tracking-widest text-muted-foreground">
          {label.toUpperCase()}
        </p>
        <p className="mt-0.5 truncate text-sm font-bold text-deep">{value}</p>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="shrink-0 rounded-lg border border-primary/25 bg-card p-2 text-primary transition-transform hover:scale-110"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
}

function PaymentsPage() {
  return (
    <div className="pt-28">
      <section className="bg-sky py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.25em] text-primary">MEMBER SERVICES</p>
            <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Payments</h1>
            <span className="gold-rule mt-5 block" />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <article className="card-lift h-full rounded-2xl bg-gradient-deep p-8 text-white shadow-soft">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-[0.68rem] font-bold tracking-wider text-gold">
              <IndianRupee size={13} /> CHARGES
            </span>
            <h2 className="mt-6 text-xl font-bold text-white">
              Quarterly Legal &amp; Administrative Charges
            </h2>
            <p className="mt-6 font-display text-5xl font-extrabold text-white">₹6,000</p>
            <p className="mt-3 text-sm text-white/70">Per quarter</p>
          </article>
        </Reveal>

        <Reveal delay={120}>
          <article className="card-lift h-full rounded-2xl border border-border bg-card p-8 shadow-soft">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky px-3 py-1 text-[0.68rem] font-bold tracking-wider text-primary">
              <Banknote size={13} /> PAYMENT MODE
            </span>
            <h2 className="mt-6 text-xl font-bold">
              Payments are currently accepted via Bank Transfer only.
            </h2>
            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-deep">
              <Landmark size={16} className="text-gold" /> Bank Account Details
            </div>
            <div className="mt-4 space-y-3">
              {BANK.map((f) => (
                <CopyField key={f.label} label={f.label} value={f.value} />
              ))}
            </div>
          </article>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <Reveal>
          <article className="rounded-2xl border-l-4 border-gold bg-sky p-8">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <Headset size={18} className="text-primary" /> Payment Support
            </h2>
            <p className="mt-3">
              For payment-related queries, contact Society Manager Sneha Tripathi —{" "}
              {MANAGER.phones.map((p, i) => (
                <span key={p}>
                  {i > 0 && " / "}
                  <a href={`tel:${p}`} className="font-bold text-primary hover:underline">
                    {p}
                  </a>
                </span>
              ))}
              .
            </p>
            <a
              href={`tel:${MANAGER.phones[0]}`}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-soft transition-all hover:scale-[1.03] hover:shadow-lift"
            >
              <Phone size={16} /> Call Society Manager
            </a>
          </article>
        </Reveal>
      </section>
    </div>
  );
}
