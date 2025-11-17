import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import "@/styles/globals.css";

// Lazy load GradientWaves for better performance
const GradientWaves = dynamic(
  () =>
    import("@/components/effects/GradientWaves").then(
      (mod) => mod.GradientWaves,
    ),
  { ssr: false },
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GradientWaves opacity={0.15} />
      <Component {...pageProps} />
    </>
  );
}
