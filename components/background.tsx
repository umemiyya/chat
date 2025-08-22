"use client";

import { useSpring, animated } from "@react-spring/web";

export default function GradientBackground({ children } : {children: React.ReactNode}) {
  // animasi gradiasi dengan react-spring
  const styles = useSpring({
    from: { backgroundPosition: "0% 50%" },
    to: async (next) => {
      while (1) {
        await next({ backgroundPosition: "100% 50%" });
        await next({ backgroundPosition: "0% 50%" });
      }
    },
    config: { duration: 8000 }, // lama transisi (8 detik bolak-balik)
    loop: true,
  });

  return (
    <animated.div
      style={{
        ...styles,
        background: "linear-gradient(-45deg, #6366f1, #a855f7, #ec4899, #f43f5e)",
        backgroundSize: "400% 400%",
        width: "100%",
        height: "100vh",
      }}
      className="flex items-center justify-center"
    >
      {children}
    </animated.div>
  );
}
