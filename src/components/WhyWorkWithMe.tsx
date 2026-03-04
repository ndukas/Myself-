import { motion } from "motion/react";
import { Star } from "lucide-react";
import Counter from "./ui/counter";
import { memo } from "react";

const WhyWorkWithMe = memo(function WhyWorkWithMe() {
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
    <section className="relative py-32 bg-transparent overflow-hidden">
      <motion.div
        initial="hidden"
        className="max-w-7xl mx-auto px-6"
      >
        <motion.div
          variants={itemVariants}
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -60% 0px" }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-slate-200 mb-6">
            Value
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-white leading-tight">
            Why Work With Me?
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-medium tracking-tight leading-snug">
            Backed by experience, driven by purpose.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -50% 0px" }}
          className="space-y-6"
        >
          <motion.div
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Card 1: Experience */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-6 relative overflow-hidden h-[320px] flex flex-col group"
            >
              <div className="relative z-10 flex flex-col items-center text-center w-full">
                <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight tracking-tight whitespace-nowrap">
                  <span className="text-white/40 font-medium">Over</span> 3+ years of experience
                </h3>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center">
                <img
                  src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/render/image/public/Public%20main/experience-avatar.webp?width=385&height=351&quality=80"
                  alt="Avatar"
                  width="220"
                  height="220"
                  loading="lazy"
                  decoding="async"
                  className="w-[220px] h-[220px] object-contain filter drop-shadow-2xl transform translate-y-6 group-hover:translate-y-2 transition-transform duration-500"
                />
              </div>
            </motion.div>

            {/* Card 3: Teams */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-6 md:p-8 relative overflow-hidden h-[320px] flex flex-col group"
            >
              <div className="relative z-10 mb-4">
                <h3 className="text-xl md:text-3xl font-bold text-white leading-tight text-center tracking-tight whitespace-nowrap">
                  Worked <span className="text-white/30 font-medium">in</span> fast-moving teams
                </h3>
              </div>
              <div className="mt-auto flex justify-center relative z-10 h-full w-full items-end">
                <img
                  src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/render/image/public/Public%20main/teams-avatar.webp?width=455&height=290&quality=80"
                  alt="Teams Avatar"
                  width="340"
                  height="217"
                  loading="lazy"
                  decoding="async"
                  className="w-[340px] h-auto object-contain filter drop-shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Second Row */}
          <motion.div
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Card 4: Solves problems */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-6 md:p-8 relative overflow-hidden h-[320px] flex flex-col group"
            >
              <div className="relative z-10 mb-4">
                <h3 className="text-xl md:text-3xl font-bold text-white leading-tight text-center tracking-tight whitespace-nowrap">
                  Solves problems <span className="text-white/30 font-medium">with</span> designs
                </h3>
              </div>
              <div className="mt-auto relative z-10 flex items-end justify-center w-full" style={{ height: '200px' }}>
                <img
                  src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/render/image/public/Public%20main/mobile-app-showcase.webp?width=467&height=271&quality=80"
                  alt="Mobile App Showcase"
                  width="632"
                  height="367"
                  loading="lazy"
                  decoding="async"
                  className="w-[85%] h-auto object-contain transform translate-y-6 group-hover:translate-y-2 transition-transform duration-500"
                />
              </div>
            </motion.div>

            {/* Card 5: Milestones */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-6 md:p-8 relative overflow-hidden h-[320px] flex flex-col group"
            >
              <div className="relative z-10 mb-4">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-white/50 leading-tight tracking-tight whitespace-nowrap">
                  Turning <span className="text-white font-bold">ideas</span> into <span className="text-white font-bold">milestones</span>
                </h3>
              </div>

              <div className="flex-1 relative z-10">
                {/* High quality 3D Avatar */}
                <div className="absolute bottom-[-30px] left-[-30px] w-[200px] md:w-[240px] z-0">
                  <img
                    src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/render/image/public/Public%20main/milestones-avatar.webp?width=350&height=350&quality=75"
                    alt="Waving Avatar"
                    width="240"
                    height="240"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain filter drop-shadow-2xl"
                  />
                </div>

                {/* Stats Cards */}
                <div className="absolute right-[-10px] top-0 bottom-0 flex flex-col justify-center gap-3 w-[150px] md:w-[170px] z-10">
                  <motion.div
                    className="bg-[#121212]/90 backdrop-blur-md border border-white/10 p-4 rounded-[1.5rem] flex flex-col items-center text-center shadow-2xl"
                  >
                    <div className="flex gap-0.5 text-orange-500 mb-1.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                    </div>
                    <div className="font-bold text-xl md:text-2xl text-white mb-0.5">
                      <Counter value={25} prefix="+ " stiffness={40} damping={40} />
                    </div>
                    <div className="text-[9px] md:text-[10px] text-slate-400 font-medium tracking-wide leading-tight">Successful Projects</div>
                  </motion.div>

                  <motion.div
                    className="bg-[#121212]/90 backdrop-blur-md border border-white/10 p-4 rounded-[1.5rem] flex flex-col items-center text-center shadow-2xl"
                  >
                    <div className="flex gap-0.5 text-orange-500 mb-1.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                    </div>
                    <div className="font-bold text-xl md:text-2xl text-white mb-0.5">
                      <Counter value={100} prefix="+ " suffix=" k" stiffness={40} damping={40} />
                    </div>
                    <div className="text-[9px] md:text-[10px] text-slate-400 font-medium tracking-wide leading-tight">Users Impacted</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
});

export default WhyWorkWithMe;
