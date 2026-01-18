import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  GraduationCap,
  FolderOpen,
  MessageSquare,
  Bell,
  ExternalLink,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProgram } from '@/contexts/ProgramContext';
import { MOCK_ANNOUNCEMENTS } from '@/data/mockData';
import { toast } from 'sonner';
import { useState } from 'react';

const TOOL_TILES = [
  {
    id: 'lms',
    title: 'LMS Courses',
    description: 'Access all your enrolled courses and materials',
    icon: GraduationCap,
    status: 'online',
  },
  {
    id: 'resources',
    title: 'Shared Resources',
    description: 'College-wide document and file library',
    icon: FolderOpen,
    status: 'online',
  },
  {
    id: 'forum',
    title: 'Collaboration Forum',
    description: 'Discuss with peers across programs',
    icon: MessageSquare,
    status: 'online',
  },
  {
    id: 'announcements',
    title: 'Faculty Announcements',
    description: 'Latest updates from your instructors',
    icon: Bell,
    status: 'online',
  },
];

export function ToolsSection() {
  const { accessResource } = useAuth();
  const { filteredResources } = useProgram();
  const [loadingTool, setLoadingTool] = useState<string | null>(null);

  const handleAccessTool = async (toolId: string, title: string) => {
    setLoadingTool(toolId);
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 500));
    accessResource(toolId);
    setLoadingTool(null);
    toast.success(`Opening ${title}`, {
      description: '+5 points earned!',
    });
  };

  const handleReportIssue = (toolId: string) => {
    toast.info('Issue reported', {
      description: 'Our team will look into this. Try again later.',
    });
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold">Unified Tools</h2>
          <p className="text-muted-foreground">
            Quick access to all your learning and collaboration tools
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TOOL_TILES.map((tool) => {
            const Icon = tool.icon;
            const isLoading = loadingTool === tool.id;

            return (
              <Card
                key={tool.id}
                className="group border-2 transition-all hover:border-primary hover:shadow-lg"
              >
                <CardHeader className="pb-3">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-border bg-secondary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge
                      variant={tool.status === 'online' ? 'secondary' : 'destructive'}
                      className="text-xs"
                    >
                      {tool.status === 'online' ? '● Online' : '○ Offline'}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  {tool.status === 'online' ? (
                    <Button
                      onClick={() => handleAccessTool(tool.id, tool.title)}
                      disabled={isLoading}
                      className="w-full gap-2"
                    >
                      {isLoading ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <ExternalLink className="h-4 w-4" />
                      )}
                      {isLoading ? 'Loading...' : 'Open Tool'}
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        Tool temporarily unavailable
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReportIssue(tool.id)}
                        className="w-full"
                      >
                        Report Issue
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Announcements Section */}
        <Card className="mt-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_ANNOUNCEMENTS.map((announcement) => (
                <div
                  key={announcement.id}
                  className="flex items-start gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium">{announcement.title}</h4>
                      <span className="text-xs text-muted-foreground">
                        {new Date(announcement.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{announcement.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
