"use client";

import { useSpring, animated } from "@react-spring/web";

export default function PastelGradient({children}: {children: React.ReactNode}) {
  // warna-warna pastel
  const gradients = [
    ["#dbeafe", "#e0e7ff", "#fce7f3"], // biru muda → ungu muda → pink lembut
    ["#bae6fd", "#c7d2fe", "#fbcfe8"], // cyan → soft purple → soft pink
    ["#a5f3fc", "#c084fc", "#f9a8d4"], // aqua → violet → pink terang
  ];

  const styles = useSpring({
    from: { t: 0 },
    to: async (next) => {
      while (1) {
        for (let i = 0; i < gradients.length; i++) {
          await next({ t: i + 1 });
        }
      }
    },
    config: { duration: 8000, easing: (t) => t * t * (3 - 2 * t) }, // transisi smooth
    loop: true,
  });

  // interpolasi gradiasi
  const bg = styles.t.to({
    range: gradients.map((_, i) => i),
    output: gradients.map(
      (colors) => `linear-gradient(135deg, ${colors.join(", ")})`
    ),
  });

  return (
    <animated.div
      style={{
        background: bg,
        width: "100%",
        backgroundSize: "200% 200%",
      }}
      className="flex items-center justify-center"
    >
      {/* overlay transparan dengan blur lembut */}
      {children}
    </animated.div>
  );
}
