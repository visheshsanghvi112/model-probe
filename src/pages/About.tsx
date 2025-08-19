import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Shield, Info } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 bg-gradient-hero" />
      <div className="fixed inset-0 grid-pattern" />

      <Header />

      <main className="relative container mx-auto px-4 py-10 lg:py-16 max-w-4xl z-10">
        <section className="mb-10 lg:mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">About Model Probe</h1>
          <p className="text-muted-foreground text-lg">Who we are, what we built, and how we treat your data.</p>
        </section>

        <div className="space-y-6">
          <div className="glass-strong rounded-xl">
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-primary/10"><Activity className="h-5 w-5 text-primary" /></div>
                <div>
                  <h2 className="text-xl font-semibold mb-1">Built by Vishesh Sanghvi</h2>
                  <p className="text-muted-foreground">
                    Model Probe is a lightweight, professional tool to quickly validate connectivity and latency across LLM providers.
                    It’s focused on clarity, speed, and a clean developer experience.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-strong rounded-xl">
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-success/10"><Shield className="h-5 w-5 text-success" /></div>
                <div>
                  <h2 className="text-xl font-semibold mb-1">Your API keys stay on your device</h2>
                  <p className="text-muted-foreground">
                    We do not collect or store your API keys. Checks are executed from your browser against provider endpoints you choose.
                    Results shown in the app are kept in your current session for your convenience only.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-strong rounded-xl">
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-accent/10"><Info className="h-5 w-5 text-accent" /></div>
                <div>
                  <h2 className="text-xl font-semibold mb-1">Contact</h2>
                  <p className="text-muted-foreground">
                    For questions or feedback, feel free to reach out via the creator’s site.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
