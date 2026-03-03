import { Mail, Phone } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { LazyImage } from "./ui/lazy-image";
import { memo } from "react";

const Footer = memo(function Footer() {
  return (
    <footer className="bg-transparent py-8 px-4 md:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="max-w-7xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-8 md:p-16 text-white"
      >
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          {/* Left Side */}
          <div className="space-y-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 group/logo">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white/10 cursor-pointer transition-transform duration-300 hover:scale-110 hover:rotate-6">
                  <LazyImage 
                    src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/footer-logo.webp" 
                    alt="Samuel Nduka" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                  Samuel Nduka
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                <a 
                  href="mailto:samonduka19@gmail.com" 
                  className="inline-flex items-center gap-2 md:gap-3 self-start rounded-full border border-white/20 bg-black/40 px-4 py-2 md:px-8 md:py-4 text-[10px] md:text-sm font-black uppercase tracking-wider text-white hover:bg-black/60 transition-all group"
                >
                  <Mail className="w-3 h-3 md:w-5 md:h-5 text-white group-hover:scale-110 transition-transform" />
                  <span>samonduka19@gmail.com</span>
                </a>
                <a 
                  href="tel:+421950280922" 
                  className="inline-flex items-center gap-2 md:gap-3 self-start rounded-full border border-white/20 bg-black/40 px-4 py-2 md:px-8 md:py-4 text-[10px] md:text-sm font-black uppercase tracking-wider text-white hover:bg-black/60 transition-all group"
                >
                  <Phone className="w-3 h-3 md:w-5 md:h-5 text-white group-hover:scale-110 transition-transform" />
                  <span>+421 950 280 922</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Links */}
          <div className="flex gap-16 md:gap-32 w-full md:w-auto justify-between md:justify-start">
            <div className="space-y-6">
              <h3 className="font-bold text-lg text-white">Pages</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/" className="hover:text-[#FF69B4] transition-colors">Home</Link></li>
                <li><Link to="/portfolio" className="hover:text-[#FF69B4] transition-colors">Portfolio</Link></li>
                <li><Link to="/about" className="hover:text-[#FF69B4] transition-colors">About</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="font-bold text-lg text-white">Info.</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/contact" className="hover:text-[#FF69B4] transition-colors">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-[#FF69B4] transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-[#FF69B4] transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-20 text-center text-gray-500 text-sm font-medium flex items-center justify-center gap-2 group/copyright">
          <div className="w-5 h-5 rounded-full overflow-hidden opacity-50 group-hover/copyright:opacity-100 transition-opacity cursor-pointer">
            <LazyImage 
              src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/footer-logo.webp" 
              alt="Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-white">Samuel Nduka</span> © 2026
        </div>
      </motion.div>
    </footer>
  );
});

export default Footer;
