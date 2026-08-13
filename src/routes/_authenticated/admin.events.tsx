import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarPlus, Pencil, Trash2, LogOut, ShieldAlert, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/_authenticated/admin/events")({
  head: () => ({
    meta: [
      { title: "Manage Events — Trade Square Society Admin" },
      {
        name: "description",
        content:
          "Administrator area for adding, editing and removing event listings on the Trade Square Society website.",
      },
      { property: "og:title", content: "Manage Events — Trade Square Society Admin" },
      {
        property: "og:description",
        content: "Private admin panel for Trade Square Society event listings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminEvents,
});

type EventRow = {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_time: string | null;
  venue: string | null;
  is_published: boolean;
};

type FormState = {
  id?: string;
  title: string;
  description: string;
  event_date: string;
  event_time: string;
  venue: string;
  is_published: boolean;
};

const EMPTY: FormState = {
  title: "",
  description: "",
  event_date: "",
  event_time: "",
  venue: "",
  is_published: true,
};

function AdminEvents() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [form, setForm] = useState<FormState | null>(null);

  const roleQuery = useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) return false;
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid)
        .eq("role", "admin")
        .maybeSingle();
      if (error) throw error;
      return Boolean(data);
    },
  });

  const isAdmin = roleQuery.data === true;

  const eventsQuery = useQuery({
    queryKey: ["admin-events"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("id, title, description, event_date, event_time, venue, is_published")
        .order("event_date", { ascending: false });
      if (error) throw error;
      return data as EventRow[];
    },
  });

  const save = useMutation({
    mutationFn: async (f: FormState) => {
      const payload = {
        title: f.title.trim(),
        description: f.description.trim() || null,
        event_date: f.event_date,
        event_time: f.event_time.trim() || null,
        venue: f.venue.trim() || null,
        is_published: f.is_published,
      };
      if (f.id) {
        const { error } = await supabase.from("events").update(payload).eq("id", f.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("events").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Event saved");
      setForm(null);
      qc.invalidateQueries({ queryKey: ["admin-events"] });
      qc.invalidateQueries({ queryKey: ["public-events"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Event deleted");
      qc.invalidateQueries({ queryKey: ["admin-events"] });
      qc.invalidateQueries({ queryKey: ["public-events"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  useEffect(() => {
    if (roleQuery.isError) toast.error("Could not verify your access level.");
  }, [roleQuery.isError]);

  if (roleQuery.isPending) {
    return <div className="pt-40 pb-24 text-center text-sm text-muted-foreground">Checking access…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sky px-4 pt-28 pb-16">
        <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
          <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-sky text-primary">
            <ShieldAlert size={20} />
          </span>
          <h1 className="mt-5 text-xl font-bold">Access restricted</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            This account is not authorised to manage events. Please contact the Society Manager.
          </p>
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth" });
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28">
      <section className="bg-sky py-14">
        <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-4 px-4 sm:px-6">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-primary">ADMIN</p>
            <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Manage Events</h1>
            <span className="gold-rule mt-4 block" />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setForm({ ...EMPTY })}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-soft transition-transform hover:scale-[1.03]"
            >
              <CalendarPlus size={16} /> Add event
            </button>
            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signOut();
                qc.clear();
                navigate({ to: "/auth" });
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-bold text-deep"
            >
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        {eventsQuery.isPending && <p className="text-sm text-muted-foreground">Loading events…</p>}
        {eventsQuery.isError && (
          <p className="text-sm text-destructive">Could not load events. Please try again.</p>
        )}
        {eventsQuery.data?.length === 0 && (
          <p className="text-sm text-muted-foreground">No events yet. Add the first one.</p>
        )}
        <ul className="grid gap-4">
          {eventsQuery.data?.map((ev) => (
            <Reveal as="li" key={ev.id}>
              <article className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold">{ev.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {new Date(ev.event_date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                      {ev.event_time ? ` · ${ev.event_time}` : ""}
                      {ev.venue ? ` · ${ev.venue}` : ""}
                    </p>
                    {ev.description && <p className="mt-3 text-sm">{ev.description}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-[0.68rem] font-bold ${
                        ev.is_published
                          ? "bg-sky text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {ev.is_published ? "PUBLISHED" : "DRAFT"}
                    </span>
                    <button
                      type="button"
                      aria-label={`Edit ${ev.title}`}
                      onClick={() =>
                        setForm({
                          id: ev.id,
                          title: ev.title,
                          description: ev.description ?? "",
                          event_date: ev.event_date,
                          event_time: ev.event_time ?? "",
                          venue: ev.venue ?? "",
                          is_published: ev.is_published,
                        })
                      }
                      className="rounded-xl border border-border p-2.5 text-primary transition-transform hover:scale-110"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${ev.title}`}
                      onClick={() => {
                        if (confirm(`Delete "${ev.title}"?`)) remove.mutate(ev.id);
                      }}
                      className="rounded-xl border border-border p-2.5 text-destructive transition-transform hover:scale-110"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      {form && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Event details"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-deep/85 p-4"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              save.mutate(form);
            }}
            className="max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-card p-7 shadow-lift"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{form.id ? "Edit event" : "Add event"}</h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setForm(null)}
                className="rounded-full p-2 text-muted-foreground hover:text-primary"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="text-xs font-bold tracking-widest text-muted-foreground">TITLE</span>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold tracking-widest text-muted-foreground">DATE</span>
                <input
                  required
                  type="date"
                  value={form.event_date}
                  onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold tracking-widest text-muted-foreground">
                  TIME (OPTIONAL)
                </span>
                <input
                  value={form.event_time}
                  placeholder="7:00 PM onwards"
                  onChange={(e) => setForm({ ...form, event_time: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold tracking-widest text-muted-foreground">
                  VENUE (OPTIONAL)
                </span>
                <input
                  value={form.venue}
                  onChange={(e) => setForm({ ...form, venue: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold tracking-widest text-muted-foreground">
                  DETAILS (OPTIONAL)
                </span>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                />
                Visible to visitors
              </label>
            </div>

            <div className="mt-7 flex gap-2">
              <button
                type="submit"
                disabled={save.isPending}
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground disabled:opacity-60"
              >
                {save.isPending ? "Saving…" : "Save event"}
              </button>
              <button
                type="button"
                onClick={() => setForm(null)}
                className="rounded-xl border border-border px-5 py-3 text-sm font-bold text-deep"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
