import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";
import BreakingTicker from "@/components/BreakingTicker";

const About = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <BreakingTicker />
      <Masthead />
      
      <main className="flex-1 container mx-auto px-6 py-24 max-w-3xl">
        <h1 className="font-headline text-5xl md:text-7xl font-bold uppercase tracking-tight text-foreground mb-8">
          About Us
        </h1>
        <div className="w-24 h-2 bg-primary mb-12" />
        
        <div className="prose prose-lg dark:prose-invert font-body text-muted-foreground">
          <p className="lead text-xl text-foreground font-medium mb-8">
            The Recap Report is an American news publication covering world news, trending celebrities, luxe lifestyle, business and the latest in sports and entertainment — rooted in Atlanta.
          </p>
          <p>
            We believe in telling stories that matter, amplifying voices that drive culture forward, and providing a premium editorial experience for our readers.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
