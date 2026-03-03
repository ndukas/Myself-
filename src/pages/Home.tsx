import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";

const BehindTheScreens = lazy(() => import("../components/BehindTheScreens"));
const WhyWorkWithMe = lazy(() => import("../components/WhyWorkWithMe"));
const DealsSection = lazy(() => import("../components/DealsSection"));
const ClientsSectionDemo = lazy(() => import("../components/ClientsSectionDemo"));
const Contact = lazy(() => import("../components/Contact"));
const Footer = lazy(() => import("../components/Footer"));

export default function Home({ isDark }: { isDark: boolean }) {
  return (
    <main>
      <Helmet>
        <title>Samuel Nduka | Modern Portfolio & Design Engineer</title>
        <meta name="description" content="Welcome to the portfolio of Samuel Nduka, a design engineer specializing in building modern, high-performance digital experiences." />
        <link rel="canonical" href="https://ais-dev-yqgxzziqldm6gi4wgzw46l-99744611259.europe-west2.run.app/" />
      </Helmet>
      <Hero isDark={isDark} />
      <Suspense fallback={<div className="h-96 flex items-center justify-center text-slate-500">Loading...</div>}>
        <BehindTheScreens />
        <WhyWorkWithMe />
        <DealsSection />
        <ClientsSectionDemo />
        <Contact />
        <Footer />
      </Suspense>
    </main>
  );
}
