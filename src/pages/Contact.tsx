import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";
import BreakingTicker from "@/components/BreakingTicker";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <BreakingTicker />
      <Masthead />
      
      <main className="flex-1 container mx-auto px-6 py-24 max-w-3xl">
        <h1 className="font-headline text-5xl md:text-7xl font-bold uppercase tracking-tight text-foreground mb-8">
          Contact Us
        </h1>
        <div className="w-24 h-2 bg-primary mb-12" />
        
        <div className="prose prose-lg dark:prose-invert font-body text-muted-foreground">
          <p className="mb-8">
            Have a story idea, partnership inquiry, or general question? We'd love to hear from you.
          </p>
          <div className="p-8 border border-border/60 rounded-xl bg-card/30">
            <h3 className="text-foreground font-bold mb-2">Email</h3>
            <a href="mailto:info@therecapreport.com" className="text-primary hover:underline">info@therecapreport.com</a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
