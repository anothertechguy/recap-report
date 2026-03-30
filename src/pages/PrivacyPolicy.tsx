import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";
import BreakingTicker from "@/components/BreakingTicker";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <BreakingTicker />
      <Masthead />
      
      <main className="flex-1 container mx-auto px-6 py-24 max-w-3xl">
        <h1 className="font-headline text-4xl md:text-6xl font-bold uppercase tracking-tight text-foreground mb-8">
          Privacy Policy
        </h1>
        <div className="w-24 h-2 bg-primary mb-12" />
        
        <div className="prose prose-lg dark:prose-invert font-body text-muted-foreground space-y-6">
          <p>Effective Date: January 1, 2026</p>
          <p>
            At The Recap Report, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website.
          </p>
          <h2 className="text-foreground font-headline font-bold text-2xl pt-6">Information We Collect</h2>
          <p>
            We may collect personal information such as your email address when you voluntarily subscribe to our newsletter. We also collect non-identifying data like browser type and standard website analytics to improve user experience.
          </p>
          <h2 className="text-foreground font-headline font-bold text-2xl pt-6">How We Use Your Information</h2>
          <p>
            Your information is used strictly to provide you with the content and services you request, evaluate site performance, and communicate updates. We do not sell or rent your personal information to third parties.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
