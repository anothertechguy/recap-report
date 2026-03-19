import { motion } from "framer-motion";

interface SectionDividerProps {
  title: string;
  accent?: boolean;
  subtitle?: string;
}

const SectionDivider = ({ title, accent, subtitle }: SectionDividerProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="flex flex-col gap-2 mb-12"
  >
    <div className="flex items-center gap-4">
      {accent && (
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-3 h-3 rounded-full bg-primary"
        />
      )}
      <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-black text-foreground">{title}</h2>
      <div className="flex-1 h-px relative overflow-hidden">
        <div className={`absolute inset-0 ${accent ? "bg-gradient-to-r from-primary/50 via-primary/15 to-transparent" : "bg-gradient-to-r from-border via-border/40 to-transparent"}`} />
        {accent && (
          <motion.div
            initial={{ x: "-100%" }}
            whileInView={{ x: "300%" }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
            className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-primary/80 to-transparent"
          />
        )}
      </div>
    </div>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-sm text-muted-foreground font-body pl-7"
      >
        {subtitle}
      </motion.p>
    )}
  </motion.div>
);

export default SectionDivider;
