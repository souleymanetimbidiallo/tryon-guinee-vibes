import confetti from "canvas-confetti";

const COLORS = ["#ce1126", "#fcd116", "#009e49"]; //  rouge, jaune, vert

export function fireConfettiBurst() {
  const defaults = { colors: COLORS, scalar: 1, zIndex: 9999 };
  const count = 120;
  const angleSpread = 60;

  // Deux jets croisés pour un rendu propre
  confetti({ ...defaults, particleCount: count / 2, origin: { x: 0.2, y: 0.6 }, angle: 60, spread: angleSpread });
  confetti({ ...defaults, particleCount: count / 2, origin: { x: 0.8, y: 0.6 }, angle: 120, spread: angleSpread });
}

export function fireConfettiCelebrate(durationMs = 1200) {
  const end = Date.now() + durationMs;
  const frame = () => {
    confetti({
      colors: COLORS,
      scalar: 0.9,
      particleCount: 10,
      startVelocity: 28,
      spread: 80,
      ticks: 90,
      origin: { x: Math.random() * 0.6 + 0.2, y: Math.random() * 0.4 + 0.1 },
      zIndex: 9999,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}
