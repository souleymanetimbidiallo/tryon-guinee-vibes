/**
 * Limiteur en mémoire (fenêtre fixe), par IP.
 * Suffisant en local et pour démarrer ; sur Vercel chaque instance a sa
 * propre mémoire → passer à Upstash Ratelimit quand le trafic augmente.
 */
const WINDOW_MS = 60 * 60 * 1000; // 1 heure
const MAX_REQUESTS = Number(process.env.TRYON_MAX_PER_HOUR ?? 10);

const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    if (hits.size > 10_000) {
      for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
    }
    return { ok: true, retryAfter: 0 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count++;
  return { ok: true, retryAfter: 0 };
}
