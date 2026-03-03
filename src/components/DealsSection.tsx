import { OfferCard, type Offer } from "@/components/ui/offer-carousel";
import { Marquee } from "@/components/ui/marquee";
import { motion } from "motion/react";

// Sample data for the carousel
const sampleOffers: Offer[] = [
  {
    id: 1,
    imageSrc: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/project-super-chill.webp",
    imageAlt: "International travel landmarks collage",
    tag: "Education",
    title: "Super Chill",
    description: "Mindfullness educational platform",
    href: "https://superchill.org/en/",
  },
  {
    id: 2,
    imageSrc: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/project-codex.webp",
    imageAlt: "A delicious looking burger",
    tag: "Technology",
    title: "Codex",
    description: "Blockchain data API platform",
    href: "https://www.codex.io/",
  },
  {
    id: 3,
    imageSrc: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/project-volta-yachts.webp",
    imageAlt: "Logos of popular streaming services",
    tag: "Marketplace",
    title: "Volta Yachts",
    description: "Electric yacht marketplace",
    href: "https://www.voltayachts.com/",
  },
  {
    id: 4,
    imageSrc: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/project-amprit-palace.webp",
    imageAlt: "A person holding a phone with a payment app",
    tag: "Restaurant",
    title: "Amprit Palace",
    description: "Indian restaurant",
    href: "https://amritpalace.com/",
  },
  {
    id: 5,
    imageSrc: "https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/project-vimcosmo.webp",
    imageAlt: "Gourmet food on a plate",
    tag: "Beauty",
    title: "Vimcosmo",
    description: "Beauty cosmetics brand",
    href: "https://vimcosmo.com/",
  },
];


// The demo component
export default function DealsSection() {
  return (
    <section className="w-full py-32 bg-transparent flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-10"
        >
          <div className="inline-block px-3 py-1 bg-white/10 border border-white/10 rounded-full text-[10px] font-medium text-slate-300 mb-4 uppercase tracking-widest">
            Projects
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
            Featured Work
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            My past projects showcasing my expertise.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative"
        >
          {/* Gradient masks for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#0B1120] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#0B1120] to-transparent z-10 pointer-events-none" />
          
          <Marquee speed={60} pauseOnHover={true} className="[--gap:2rem]">
            {sampleOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </Marquee>
        </motion.div>
      </div>
    </section>
  );
}
