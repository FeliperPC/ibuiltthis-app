import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const LiveBadge = () => {
    return (
      <Badge variant={"outline"} className="px-4 py-2 mb-8 text-sm backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="rounded-full h-2 w-2 bg-primary" />
        </span>
        <span>Join thousands of creators sharing their work</span>
      </Badge>
    );
  };
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-background via-background-to-muted/20">
      <LiveBadge />{" "}
      <h1>Share What You&apos;ve Built, Discover What&apos;s Launching</h1>
      <p>
        A community platform for creators to showcase their apps, AI tools, SaaS
        products, and creative projects. Authentic launches, real builders,
        genuine feedback.
      </p>
      <Button>Share Your Project</Button>
      <Button>Explore Projects</Button>
    </section>
  );
}
