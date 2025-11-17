import React from "react";
import type { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import fs from "fs";
import path from "path";
import Head from "next/head";

import { Company } from "@/types/company";
import { parseCompaniesCsv } from "@/lib/parseCsv";
import { Hero } from "@/components/landing/Hero";
import { StatsSection } from "@/components/landing/StatsSection";
import { Footer } from "@/components/layout/Footer";

// Lazy load QuickHighlights - below the fold content
const QuickHighlights = dynamic(
  () => import("@/components/landing/QuickHighlights"),
  { ssr: true },
);

interface HomePageProps {
  companies: Company[];
}

export default function HomePage({ companies }: HomePageProps) {
  return (
    <>
      <Head>
        <title>KU Computer Engineering Job Fair 2025</title>
        <meta
          name="description"
          content="Connect with leading tech companies at the Kasetsart University Computer Engineering Job Fair 2025. Discover job opportunities, internships, and career paths."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="preload"
          href="/logos/CPSK-logo.png"
          as="image"
          type="image/png"
        />
      </Head>

      <main className="min-h-screen overflow-x-hidden">
        <Hero />
        <StatsSection companies={companies} />
        <QuickHighlights companies={companies} />
        <Footer />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const csvPath = path.join(process.cwd(), "data/companies.csv");
    const csvText = fs.readFileSync(csvPath, "utf-8");
    const companies = parseCompaniesCsv(csvText);

    return {
      props: {
        companies,
      },
    };
  } catch (error) {
    console.error("Error loading companies data:", error);
    return {
      props: {
        companies: [],
      },
    };
  }
};
