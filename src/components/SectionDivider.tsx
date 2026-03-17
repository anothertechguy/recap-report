import { motion } from "framer-motion";

interface SectionDividerProps {
  title: string;
  accent?: boolean;
}

const SectionDivider = ({ title, accent }: SectionDividerProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="flex items-center gap-4 mb-10"
  >
    <h2 className="font-headline text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
    <div className="flex-1 h-px relative overflow-hidden">
      <div className={`absolute inset-0 ${accent ? "bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" : "bg-gradient-to-r from-border via-border/50 to-transparent"}`} />
      {accent && (
        <motion.div
          initial={{ x: "-100%" }}
          whileInView={{ x: "200%" }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-primary/60 to-transparent"
        />
      )}
    </div>
  </motion.div>
);

export default SectionDivider;
