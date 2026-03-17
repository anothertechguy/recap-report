import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const NewsletterSignup = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      className="container mx-auto px-6 py-16 md:py-24"
    >
      <div className="relative rounded-3xl overflow-hidden bg-accent p-10 md:p-16 lg:p-20 text-center shadow-card">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-primary/8 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-medium uppercase tracking-widest font-body mb-6">
            <Mail size={14} />
            Daily Digest
          </span>
          <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl font-bold text-accent-foreground leading-tight max-w-2xl mx-auto">
            Join the Recap Pack
          </h2>
          <p className="mt-4 text-accent-foreground/60 font-body text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Exclusive reports, trending insights, and culture-defining stories delivered to your inbox.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full sm:flex-1 px-5 py-3.5 rounded-xl bg-accent-foreground/10 text-accent-foreground placeholder:text-accent-foreground/30 font-body text-sm outline-none focus:ring-2 ring-primary/50 transition-shadow"
            />
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default NewsletterSignup;
