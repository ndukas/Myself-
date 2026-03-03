import { motion, AnimatePresence } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, Calendar, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Footer from "../components/Footer";
import { useState, useEffect, FormEvent } from "react";

// Load Cal.com embed only when Contact page is mounted
function useCalEmbed() {
  useEffect(() => {
    if ((window as any).Cal) return; // Already loaded
    (function (C: any, A: string, L: string) {
      let p = function (a: any, ar: any) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; }
        if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");
    (window as any).Cal("init", "15min", { origin: "https://app.cal.com" });
    (window as any).Cal.ns["15min"]("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
  }, []);
}

export default function ContactPage() {
  useCalEmbed();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      // Reset after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white pt-20 flex flex-col">
      <Helmet>
        <title>Contact Samuel Nduka | Let's Build Something Together</title>
        <meta name="description" content="Get in touch with Samuel Nduka for design and engineering opportunities. Book a call, send an email, or use the contact form." />
        <link rel="canonical" href="https://ais-dev-yqgxzziqldm6gi4wgzw46l-99744611259.europe-west2.run.app/contact" />
      </Helmet>
      <div className="max-w-3xl mx-auto px-6 flex-grow flex flex-col items-center text-center">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-center"
        >
          <div className="inline-block px-5 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-zinc-300 mb-8">
            Contact
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-none">
            Get in Touch
          </h1>
          <p className="text-base md:text-lg text-zinc-400 max-w-xl font-medium tracking-tight leading-relaxed mb-10">
            Have a question, opportunity, or just want to talk design? I'm always open to thoughtful conversations.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex gap-6 md:gap-10 mb-12"
        >
          <div className="flex flex-col items-center gap-3">
            <a
              href="mailto:samonduka19@gmail.com"
              className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <Mail size={24} className="text-black" />
            </a>
            <span className="text-base font-medium">Mail</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <a
              href="tel:+421950280922"
              className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <Phone size={24} className="text-black" />
            </a>
            <span className="text-base font-medium">Call</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <button
              data-cal-link="samuel.nduka/15min"
              data-cal-namespace="15min"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"auto"}'
              className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer"
            >
              <Calendar size={24} className="text-black" />
            </button>
            <span className="text-base font-medium">Book</span>
          </div>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-xl bg-white/5 backdrop-blur-md p-6 md:p-10 rounded-[2rem] border border-white/10 mb-24"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-8 text-white">
            Or shoot me a message!
          </h2>

          <form className="space-y-6 text-left" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400 ml-1">Name</label>
                <input
                  required
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm"
                  placeholder="Peter Parker"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400 ml-1">Email</label>
                <input
                  required
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm"
                  placeholder="peterparker@mail.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400 ml-1">Subject</label>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm"
                placeholder="Real Estate Website"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400 ml-1">Message</label>
              <textarea
                required
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all resize-none text-sm"
                placeholder="Your message..."
              />
            </div>

            <div className="relative">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2 text-emerald-400 font-medium py-4"
                  >
                    <CheckCircle2 size={20} />
                    Message sent successfully!
                  </motion.div>
                ) : status === "error" ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2 text-rose-400 font-medium py-4"
                  >
                    <AlertCircle size={20} />
                    Something went wrong. Please try again.
                  </motion.div>
                ) : (
                  <motion.button
                    key="submit"
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-white text-black font-bold py-4 rounded-full hover:bg-zinc-200 transition-all transform active:scale-[0.98] text-base shadow-[0_10px_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
