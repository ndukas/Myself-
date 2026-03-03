import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";

export default function Privacy() {
  return (
    <div className="pt-32 min-h-screen flex flex-col">
      <Helmet>
        <title>Privacy Policy | Samuel Nduka Portfolio</title>
        <meta name="description" content="Privacy policy for Samuel Nduka's portfolio website. Learn how we handle your data and respect your privacy." />
        <link rel="canonical" href="https://ais-dev-yqgxzziqldm6gi4wgzw46l-99744611259.europe-west2.run.app/privacy" />
      </Helmet>
      <div className="max-w-3xl mx-auto px-6 flex-grow">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white">
            Privacy Policy
          </h1>
          <div className="prose prose-invert max-w-none text-slate-400 space-y-6">
            <p>
              Your privacy is important to us. It is Samuel Nduka's policy to respect your privacy regarding any information we may collect from you across our website.
            </p>
            <h2 className="text-2xl font-bold text-white mt-8">1. Information we collect</h2>
            <p>
              We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.
            </p>
            <h2 className="text-2xl font-bold text-white mt-8">2. Use of Information</h2>
            <p>
              We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft.
            </p>
            <p>
              Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information.
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
