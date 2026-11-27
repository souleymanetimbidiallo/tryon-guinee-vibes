import Image from "next/image";
import Link from "next/link";
import { STYLES } from "@/lib/styles";

const STEPS = [
  { n: "1", title: "Ta photo", text: "Une photo nette, de face, idéalement en pied et sur fond simple." },
  { n: "2", title: "Ta tenue", text: "Abaya, grand boubou, complet bazin, léppi… choisis dans le catalogue." },
  { n: "3", title: "Le rendu", text: "L'IA t'habille en gardant ton visage et ta pose. Télécharge et partage." },
];

const USES = [
  {
    icon: "🪞",
    title: "Essayer avant d'acheter",
    text: "Vois la tenue sur toi avant de commander chez ton tailleur ou ta créatrice.",
  },
  {
    icon: "🎬",
    title: "Habiller tes personnages",
    text: "Enregistre un personnage et réhabille-le à volonté pour tes images et vidéos, en gardant le même visage.",
  },
  {
    icon: "🧵",
    title: "Lookbook pour créateurs",
    text: "Envoie la photo d'une tenue, choisis un mannequin IA et un décor : des visuels prêts pour Instagram et TikTok.",
  },
];

export default function Home() {
  const showcase = STYLES.filter((s) => s.image).slice(0, 4);

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
            Essayage virtuel par IA
          </p>
          <h1 className="font-display text-4xl leading-tight font-semibold md:text-6xl">
            Porte le bazin <br className="hidden md:block" />
            avant de l&apos;acheter.
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted">
            Importe ta photo, choisis une tenue guinéenne et découvre le rendu sur toi en quelques
            secondes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/essayer"
              className="rounded-full bg-accent px-6 py-3 font-medium text-white transition hover:bg-accent-strong"
            >
              Essayer maintenant
            </Link>
            <a
              href="#comment"
              className="rounded-full border border-border px-6 py-3 font-medium transition hover:border-foreground"
            >
              Comment ça marche
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {showcase.map((s, i) => (
            <figure
              key={s.id}
              className={`relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface ${i % 2 ? "translate-y-6" : ""}`}
            >
              <Image
                src={s.image!}
                alt={s.label}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
                priority={i < 2}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-sm font-medium text-white">
                {s.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="comment" className="border-t border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n}>
              <span className="font-display text-4xl text-gold">{s.n}</span>
              <h2 className="mt-2 text-lg font-semibold">{s.title}</h2>
              <p className="mt-1 text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-3xl font-semibold">Pas seulement pour essayer</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {USES.map((u) => (
            <div key={u.title} className="rounded-3xl border border-border bg-surface p-6">
              <span className="text-3xl" aria-hidden>
                {u.icon}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{u.title}</h3>
              <p className="mt-1 text-muted">{u.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl border-t border-border px-4 py-16 text-center">
        <h2 className="font-display text-2xl font-semibold">Ta photo reste à toi</h2>
        <p className="mt-3 text-muted">
          Ta photo est envoyée au service d&apos;IA uniquement pour générer le rendu. Elle n&apos;est
          ni stockée sur nos serveurs, ni utilisée pour de la reconnaissance faciale.
        </p>
      </section>
    </>
  );
}
