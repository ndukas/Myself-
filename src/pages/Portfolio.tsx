import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";
import Projects from "../components/Projects";

export default function Portfolio() {
  return (
    <div className="pt-40 pb-32">
      <Helmet>
        <title>Portfolio | Samuel Nduka - Design Engineer Projects</title>
        <meta name="description" content="Explore Samuel Nduka's portfolio of design and engineering projects, featuring UX research, high-fidelity prototypes, and full-stack applications." />
        <link rel="canonical" href="https://ais-dev-yqgxzziqldm6gi4wgzw46l-99744611259.europe-west2.run.app/portfolio" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-slate-200 mb-6">
            Showcase
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white leading-tight">
            My Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-medium tracking-tight leading-snug">
            A curated collection of my best work, from UX research to high-fidelity prototypes.
          </p>
        </motion.div>

        <Projects />
      </div>
      <Footer />
    </div>
  );
}
