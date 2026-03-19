import { motion } from "framer-motion";
import { Mail, ArrowRight, Sparkles } from "lucide-react";

const NewsletterSignup = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-accent">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/15 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" style={{ animationDelay: "1s" }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(var(--accent-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent-foreground)) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 text-primary text-xs font-bold uppercase tracking-[0.15em] font-body mb-8">
              <Sparkles size={14} />
              Daily Digest
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-headline text-4xl md:text-6xl lg:text-7xl font-black text-accent-foreground leading-[1.05]"
          >
            Join the
            <span className="text-primary"> Recap</span>
            <br />Pack
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-accent-foreground/50 font-body text-base md:text-lg max-w-lg mx-auto leading-relaxed"
          >
            Exclusive reports, trending insights, and culture-defining stories delivered to your inbox every morning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <div className="relative w-full sm:flex-1">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-foreground/30" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full pl-11 pr-5 py-4 rounded-2xl bg-accent-foreground/10 text-accent-foreground placeholder:text-accent-foreground/30 font-body text-sm outline-none focus:ring-2 ring-primary/50 transition-all border border-accent-foreground/5 focus:border-primary/30"
                />
              </div>
              <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-body font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] group inline-flex items-center justify-center gap-2">
                Subscribe
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            <p className="mt-4 text-accent-foreground/25 text-xs font-body">
              No spam. Unsubscribe anytime. Read by 10,000+ culture movers.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
