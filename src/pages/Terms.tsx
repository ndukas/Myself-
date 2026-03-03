import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";

export default function Terms() {
  return (
    <div className="pt-32 min-h-screen flex flex-col">
      <Helmet>
        <title>Terms of Service | Samuel Nduka Portfolio</title>
        <meta name="description" content="Terms of service for Samuel Nduka's portfolio website. Please read these terms carefully before using the site." />
        <link rel="canonical" href="https://ais-dev-yqgxzziqldm6gi4wgzw46l-99744611259.europe-west2.run.app/terms" />
      </Helmet>
      <div className="max-w-3xl mx-auto px-6 flex-grow">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white">
            Terms of Service
          </h1>
          <div className="prose prose-invert max-w-none text-slate-400 space-y-6">
            <p>
              By accessing the website at Samuel Nduka, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
            </p>
            <h2 className="text-2xl font-bold text-white mt-8">1. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on Samuel Nduka's website for personal, non-commercial transitory viewing only.
            </p>
            <h2 className="text-2xl font-bold text-white mt-8">2. Disclaimer</h2>
            <p>
              The materials on Samuel Nduka's website are provided on an 'as is' basis. Samuel Nduka makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
