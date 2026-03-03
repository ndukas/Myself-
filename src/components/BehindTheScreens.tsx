import { motion } from "motion/react";
import { useRef, memo } from "react";
import Bubbles from "./Bubbles";
import { LazyImage } from "./ui/lazy-image";

const cards = [
  {
    icon: <LazyImage src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/render/image/public/Public%20main/thinking-face-removebg-preview.webp?width=112&height=112&quality=75" alt="Thinking Face" width="56" height="56" className="w-14 h-14 mx-auto" containerClassName="bg-transparent" />,
    title: "Who am I?",
    description: "I am a skilled UX Designer crafting seamless digital experiences."
  },
  {
    icon: <LazyImage src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/render/image/public/Public%20main/brain_1f9e0-removebg-preview.webp?width=112&height=112&quality=75" alt="Brain" width="56" height="56" className="w-14 h-14 mx-auto" containerClassName="bg-transparent" />,
    title: "My Philosophy",
    description: "Great design is clarity, usability, and effortless impact."
  },
  {
    icon: <LazyImage src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/render/image/public/Public%20main/sparkles_2728-Photoroom.webp?width=112&height=112&quality=75" alt="Sparkles" width="56" height="56" className="w-14 h-14 mx-auto" containerClassName="bg-transparent" />,
    title: "My Distinct Edge",
    description: "I bridge design and dev to craft engaging, impactful solutions."
  }
];

const FeatureCard = memo(({ card, index, itemVariants }: { card: typeof cards[0]; index: number; itemVariants: any }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{
      y: -10,
      scale: 1.02,
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }}
    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] py-8 px-10 md:py-10 md:px-12 text-center transition-colors duration-300 flex flex-col items-center justify-center min-h-[280px] cursor-default group"
  >
    <motion.div
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.5
      }}
      className="mb-6 group-hover:scale-110 transition-transform duration-300"
    >
      {card.icon}
    </motion.div>
    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">{card.title}</h3>
    <p className="text-slate-400 leading-relaxed text-base md:text-lg">
      {card.description}
    </p>
  </motion.div>
));

export default function BehindTheScreens() {
  const sectionRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <section ref={sectionRef} className="relative py-32 bg-transparent overflow-hidden">
      <Bubbles />
      <motion.div
        initial="hidden"
        className="relative z-10 max-w-7xl mx-auto px-6"
      >
        <motion.div
          variants={itemVariants}
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -50% 0px" }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-slate-200 mb-6">
            Essence
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-white leading-tight">
            Behind the Screens
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-medium tracking-tight leading-snug">
            A glimpse into my mindset, style, and design edge.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -60% 0px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {cards.map((card, index) => (
            <FeatureCard key={index} card={card} index={index} itemVariants={itemVariants} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
