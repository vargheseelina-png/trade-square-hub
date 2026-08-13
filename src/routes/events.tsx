import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { CalendarDays, Users, GraduationCap, MapPin, Clock, X, ChevronLeft, ChevronRight, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Reveal } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";
import a01 from "@/assets/agm-01.jpeg.asset.json";
import a02 from "@/assets/agm-02.jpeg.asset.json";
import a03 from "@/assets/agm-03.jpeg.asset.json";
import a04 from "@/assets/agm-04.jpeg.asset.json";
import a05 from "@/assets/agm-05.jpeg.asset.json";
import a06 from "@/assets/agm-06.jpeg.asset.json";
import a07 from "@/assets/agm-07.jpeg.asset.json";
import a08 from "@/assets/agm-08.jpeg.asset.json";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Meetings — Trade Square Society, Mumbai" },
      {
        name: "description",
        content:
          "Committee meetings, General Body Meetings and the 15th July 2026 AGM of Trade Square Premises Cooperative Society Ltd., with a photo gallery.",
      },
      { property: "og:title", content: "Events & Meetings — Trade Square Society" },
      {
        property: "og:description",
        content:
          "Governance meetings, the 2026 Annual General Body Meeting and real photo gallery from Trade Square Society, Mumbai.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventsPage,
});

type Category = "proceedings" | "milestone" | "hall" | "addressing";

const CATEGORIES: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All Photos" },
  { id: "proceedings", label: "Committee Head Table & Proceedings" },
  { id: "milestone", label: "Event Banner & Occupancy Certificate" },
  { id: "hall", label: "Members in the Hall" },
  { id: "addressing", label: "Addressing & Greeting Attendees" },
];

const PHOTOS: { url: string; alt: string; cat: Category }[] = [
  {
    url: a01.url,
    alt: "Committee members at the head table reviewing meeting papers during the Annual General Body Meeting",
    cat: "proceedings",
  },
  {
    url: a02.url,
    alt: "Members seated in the hall listening to the Annual General Body Meeting proceedings",
    cat: "hall",
  },
  {
    url: a03.url,
    alt: "Committee members at the head table beside the AGM banner showing the Occupancy Certificate announcement",
    cat: "milestone",
  },
  {
    url: a04.url,
    alt: "Members attending the Annual General Body Meeting, seated with meeting agenda papers",
    cat: "hall",
  },
  {
    url: a05.url,
    alt: "Committee members addressing and greeting attendees in front of the Trade Square AGM banner",
    cat: "addressing",
  },
  {
    url: a06.url,
    alt: "A member standing to speak among attendees during the Annual General Body Meeting",
    cat: "addressing",
  },
  {
    url: a07.url,
    alt: "Row of members attentively following the Annual General Body Meeting discussion",
    cat: "hall",
  },
  {
    url: a08.url,
    alt: "Wide view of the meeting hall at Suncity Hotel with members seated for the AGM",
    cat: "hall",
  },
];

const GOVERNANCE = [
  {
    icon: Users,
    title: "Managing Committee Meetings",
    body: "Held every month per Society bye-laws.",
  },
  {
    icon: CalendarDays,
    title: "General Body Meetings (AGM & EGM)",
    body: "AGM held annually; EGM convened as required.",
  },
  {
    icon: GraduationCap,
    title: "Education & Training Programme",
    body: "An annual programme for members covering Society rules, responsibilities, and updated government bye-laws and circulars.",
  },
];

type PublicEvent = {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_time: string | null;
  venue: string | null;
};

function EventsPage() {
  const upcoming = useQuery({
    queryKey: ["public-events"],
    queryFn: async (): Promise<PublicEvent[]> => {
      const today = new Date().toISOString().slice(0, 10);
      const { data, error } = await supabase
        .from("events")
        .select("id, title, description, event_date, event_time, venue")
        .eq("is_published", true)
        .gte("event_date", today)
        .order("event_date", { ascending: true });
      if (error) throw error;
      return data as PublicEvent[];
    },
  });
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [index, setIndex] = useState<number | null>(null);

  const shown = PHOTOS.filter((p) => filter === "all" || p.cat === filter);

  const move = useCallback(
    (dir: number) =>
      setIndex((i) => (i === null ? i : (i + dir + shown.length) % shown.length)),
    [shown.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, move]);

  const active = index === null ? null : shown[index];

  return (
    <div className="pt-28">
      <section className="bg-sky py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.25em] text-primary">COMMUNITY</p>
            <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Events &amp; Meetings</h1>
            <span className="gold-rule mt-5 block" />
            <p className="mt-4 max-w-xl text-lg">Building Community, One Meeting at a Time.</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-bold">Recurring Governance</h2>
        </Reveal>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {GOVERNANCE.map((g, i) => (
            <Reveal as="li" key={g.title} delay={i * 90}>
              <article className="card-lift h-full rounded-2xl border border-border bg-card p-7 shadow-soft">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky text-primary">
                  <g.icon size={20} />
                </span>
                <h3 className="mt-5 text-lg font-bold">{g.title}</h3>
                <p className="mt-2 text-sm">{g.body}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <Reveal>
          <article className="overflow-hidden rounded-2xl bg-gradient-deep p-8 text-white shadow-soft sm:p-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-[0.68rem] font-bold tracking-wider text-gold">
              <Award size={13} /> FEATURED EVENT
            </span>
            <h2 className="mt-6 text-2xl font-extrabold text-white sm:text-3xl">
              Annual General Body Meeting — 15th July 2026
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <p className="flex items-start gap-2 text-sm text-white/85">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                Suncity Hotel, MIDC, Andheri (E), Mumbai 400093
              </p>
              <p className="flex items-start gap-2 text-sm text-white/85">
                <Clock size={16} className="mt-0.5 shrink-0 text-gold" />
                7:00 PM onwards
              </p>
            </div>
            <p className="mt-6 max-w-2xl text-sm text-white/85">
              Marking the milestone of receiving the Occupancy Certificate for Trade Square
              Premises.
            </p>
          </article>
        </Reveal>
      </section>

      <section className="bg-sky py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-bold">Photo Gallery</h2>
            <span className="gold-rule mt-4 block" />
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-7 flex flex-wrap gap-2" role="tablist" aria-label="Filter photos">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === c.id}
                  onClick={() => {
                    setFilter(c.id);
                    setIndex(null);
                  }}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    filter === c.id
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "bg-card text-muted-foreground hover:text-primary"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {shown.map((p, i) => (
              <Reveal key={p.url} delay={(i % 6) * 70} className="mb-5 break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className="card-lift group block w-full overflow-hidden rounded-2xl bg-card shadow-soft"
                  aria-label={`Open photo: ${p.alt}`}
                >
                  <img
                    src={p.url}
                    alt={p.alt}
                    loading="lazy"
                    className="w-full transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <span className="gold-rule mt-4 block" />
        </Reveal>

        {upcoming.isPending && (
          <p className="mt-6 text-sm text-muted-foreground">Loading events…</p>
        )}

        {(upcoming.isError || (upcoming.data && upcoming.data.length === 0)) && (
          <Reveal>
            <article className="mt-6 rounded-2xl border border-dashed border-primary/35 bg-card p-8 text-center">
              <p className="text-sm">
                Details of upcoming events and meetings will be published here soon.
              </p>
            </article>
          </Reveal>
        )}

        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {upcoming.data?.map((ev, i) => (
            <Reveal as="li" key={ev.id} delay={i * 80}>
              <article className="card-lift h-full rounded-2xl border border-border bg-card p-7 shadow-soft">
                <p className="flex items-center gap-2 text-xs font-bold tracking-widest text-primary">
                  <CalendarDays size={14} />
                  {new Date(ev.event_date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h3 className="mt-3 text-lg font-bold">{ev.title}</h3>
                {ev.event_time && (
                  <p className="mt-2 flex items-center gap-2 text-sm">
                    <Clock size={14} className="shrink-0 text-primary" />
                    {ev.event_time}
                  </p>
                )}
                {ev.venue && (
                  <p className="mt-1.5 flex items-start gap-2 text-sm">
                    <MapPin size={14} className="mt-0.5 shrink-0 text-primary" />
                    {ev.venue}
                  </p>
                )}
                {ev.description && <p className="mt-3 text-sm">{ev.description}</p>}
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="animate-in fade-in fixed inset-0 z-[60] flex items-center justify-center bg-deep/95 p-4 duration-200"
          onClick={() => setIndex(null)}
        >
          <button
            type="button"
            aria-label="Close photo viewer"
            onClick={() => setIndex(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white transition-transform hover:scale-110"
          >
            <X size={20} />
          </button>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              move(-1);
            }}
            className="absolute left-3 rounded-full bg-white/10 p-3 text-white transition-transform hover:scale-110"
          >
            <ChevronLeft size={22} />
          </button>
          <figure
            className="animate-in zoom-in-95 max-h-[86vh] max-w-3xl duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.url}
              alt={active.alt}
              className="max-h-[76vh] w-full rounded-2xl object-contain"
            />
            <figcaption className="mt-3 text-center text-sm text-white/80">{active.alt}</figcaption>
          </figure>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              move(1);
            }}
            className="absolute right-3 rounded-full bg-white/10 p-3 text-white transition-transform hover:scale-110"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </div>
  );
}
