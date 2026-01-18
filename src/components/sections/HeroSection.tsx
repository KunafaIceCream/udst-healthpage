import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, Trophy, ArrowDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function HeroSection() {
  const { user } = useAuth();

  const scrollToResources = () => {
    document.getElementById('programs-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden border-b-2 border-border bg-gradient-to-br from-primary via-primary/90 to-primary/70 py-16 text-primary-foreground md:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Title */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Health Sciences Resource Hub
            <span className="block text-2xl font-normal text-primary-foreground/80 md:text-3xl">
              Unified Access & Engagement
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90 md:text-xl">
            Access all your program tools in one place. Track progress, earn rewards, and collaborate efficiently with peers and faculty across Health Sciences programs.
          </p>

          {/* CTA Button */}
          <Button
            onClick={scrollToResources}
            size="lg"
            variant="secondary"
            className="mb-8 gap-2 border-2 border-secondary-foreground/20 text-lg shadow-md hover:shadow-lg"
          >
            Get Started
            <ArrowDown className="h-5 w-5" />
          </Button>

          {/* Gamification Teaser */}
          {user && (
            <Card className="mx-auto max-w-md border-2 border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground shadow-lg">
              <CardContent className="flex items-center justify-between gap-4 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20">
                    <Flame className="h-5 w-5 text-orange-300" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">Current Streak</p>
                    <p className="text-2xl font-bold">{user.streak} days</p>
                  </div>
                </div>
                <div className="h-12 w-px bg-primary-foreground/30" />
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20">
                    <Trophy className="h-5 w-5 text-yellow-300" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">Total Points</p>
                    <p className="text-2xl font-bold">{user.points}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
