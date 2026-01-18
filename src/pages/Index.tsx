import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProgramsSection } from '@/components/sections/ProgramsSection';
import { GamificationSection } from '@/components/sections/GamificationSection';
import { ToolsSection } from '@/components/sections/ToolsSection';
import { AuthModal } from '@/components/auth/AuthModal';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="space-y-4 text-center">
          <Skeleton className="mx-auto h-16 w-16 rounded-full" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary/10 via-background to-secondary/20">
        <div className="flex flex-1 items-center justify-center p-4">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold">Health Sciences Resource Hub</h1>
            <p className="text-muted-foreground">Please sign in to continue</p>
          </div>
        </div>
        <AuthModal open={true} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProgramsSection />
        <GamificationSection />
        <ToolsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
