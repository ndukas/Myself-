import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";
import { PhotoGallery } from "@/components/ui/gallery";

const skills = [
  "React", "TypeScript", "Node.js", "Tailwind CSS", "Design Systems", "UI/UX", "Next.js", "PostgreSQL"
];

export default function AboutPage() {
  return (
    <div className="pt-32">
      <Helmet>
        <title>About Samuel Nduka | Design Engineer & Full Stack Developer</title>
        <meta name="description" content="Learn more about Samuel Nduka's journey, experience, and the technical skills he uses to build exceptional digital products." />
        <link rel="canonical" href="https://ais-dev-yqgxzziqldm6gi4wgzw46l-99744611259.europe-west2.run.app/about" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-slate-200 mb-6">
            The Story
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white leading-tight">
            About Me
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-medium tracking-tight leading-snug">
            Bridging the gap between design and engineering to create meaningful digital experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">My Journey</h3>
              <p className="text-slate-400 leading-relaxed mb-6 text-base md:text-lg">
                I started my journey as a graphic designer before falling in love with code. 
                This unique background allows me to build interfaces that not only work perfectly but look beautiful too.
              </p>
              <p className="text-slate-400 leading-relaxed text-base md:text-lg">
                With over 3 years of experience in the industry, I've worked with startups and established companies 
                to deliver high-quality products that solve real user problems.
              </p>
            </div>
            
            <div className="mt-auto">
              <PhotoGallery animationDelay={0.8} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8 mt-12 lg:mt-0"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white">Tech Stack</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between mb-2 items-end">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        ease: [0.22, 1, 0.36, 1] 
                      }}
                    >
                      <span className="text-lg font-medium text-slate-200 group-hover:text-white transition-colors">
                        {skill}
                      </span>
                    </motion.div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Proficient</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 1.5, 
                        delay: index * 0.1,
                        ease: [0.22, 1, 0.36, 1] 
                      }}
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
