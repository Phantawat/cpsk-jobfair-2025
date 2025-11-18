import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import "@/styles/globals.css";
import { Prompt } from 'next/font/google';

const prompt = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['300','400','500','600','700'],
  display: 'swap',
});

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
    <div className={prompt.className}>
      <GradientWaves opacity={0.15} />
      <Component {...pageProps} />
    </div>
  );
}
