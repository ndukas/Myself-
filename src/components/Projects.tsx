import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, memo } from "react";
import { LazyImage } from "./ui/lazy-image";

const projects = [
  {
    title: "Super Chill",
    category: "Education",
    description: "Mindfullness educational platform designed to help users achieve mental clarity and focus through guided sessions.",
    image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/project-super-chill.webp",
    tags: ["Education", "Mindfulness", "UI Design"],
    link: "https://superchill.org/en/",
    github: "#"
  },
  {
    title: "Volta Yachts",
    category: "Marketplace",
    description: "The premier marketplace for electric yachts, connecting eco-conscious buyers with cutting-edge marine technology.",
    image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/project-volta-yachts.webp",
    tags: ["Electric", "Yachts", "Marketplace"],
    link: "https://www.voltayachts.com/",
    github: "#"
  },
  {
    title: "Vimcosmo",
    category: "Beauty",
    description: "A luxury beauty cosmetics brand focusing on sustainable products and high-end digital storytelling.",
    image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/project-vimcosmo.webp",
    tags: ["Beauty", "Cosmetics", "Branding"],
    link: "https://vimcosmo.com/",
    github: "#"
  },
  {
    title: "Matcha Ren",
    category: "Food",
    description: "A premium Matcha & Mochi e-commerce, offering rich and authentic Japanese flavors.",
    image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/project-matcha-ren.webp",
    tags: ["Matcha", "Branding", "Web Design"],
    link: "https://www.matcharen.com/",
    github: "#"
  },
  {
    title: "Joi Planner",
    category: "Productivity",
    description: "The daily planner designed to keep distracted minds on track with intuitive scheduling and focus tools.",
    image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/project-joi-planner.webp",
    tags: ["Productivity", "Neurodiversity", "App Design"],
    link: "https://www.joiplanner.com/",
    github: "#"
  },
  {
    title: "Cylinder",
    category: "Healthcare",
    description: "A comprehensive digital health platform providing personalized care.",
    image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/project-cylinder.webp",
    tags: ["Healthcare", "Wellness", "Digital Health"],
    link: "https://cylinderhealth.com/",
    github: "#"
  },
  {
    title: "Codex",
    category: "Technology",
    description: "A powerful blockchain data API platform providing real-time insights and analytics for decentralized networks.",
    image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/project-codex.webp",
    tags: ["Blockchain", "API", "Web3"],
    link: "https://www.codex.io/",
    github: "#"
  },
  {
    title: "Amprit Palace",
    category: "Restaurant",
    description: "A digital experience for a premium Indian restaurant, featuring online reservations and an immersive menu.",
    image: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/project-amprit-palace.webp",
    tags: ["Restaurant", "Hospitality", "Web Design"],
    link: "https://amritpalace.com/",
    github: "#"
  }
];

const ProjectCard = memo(({ project, index }: { project: typeof projects[0]; index: number }) => (
  <motion.a
    key={project.title}
    href={project.link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ 
      duration: 0.7, 
      delay: (index % 2) * 0.1, 
      ease: [0.21, 0.47, 0.32, 0.98] 
    }}
    className="group bg-[#0B1120] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl flex flex-col cursor-pointer"
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <LazyImage 
        src={project.image} 
        alt={project.title}
        className="group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
    
    <div className="p-6 md:p-10 flex flex-col items-center text-center">
      <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 md:mb-6">
        {project.category}
      </div>
      
      <h4 className="text-2xl md:text-4xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors duration-300">
        {project.title}
      </h4>
      
      <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-[280px] mx-auto">
        {project.description}
      </p>
    </div>
  </motion.a>
));

export default function Projects() {
  const [visibleCount, setVisibleCount] = useState(projects.length);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // If it's mobile, start with 3. If not, start with 4.
      if (mobile) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const showMore = () => {
    setVisibleCount(projects.length);
  };

  return (
    <section id="work" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          <AnimatePresence mode="popLayout">
            {projects.slice(0, visibleCount).map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {visibleCount < projects.length && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 flex justify-center"
          >
            <button
              onClick={showMore}
              className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-bold transition-all hover:scale-105 active:scale-95 group"
            >
              <span>Load More Projects</span>
              <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
