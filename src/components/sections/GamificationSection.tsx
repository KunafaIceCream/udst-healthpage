import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Trophy,
  Medal,
  Flame,
  Gift,
  Users,
  Sun,
  BookOpen,
  MessageSquare,
  Star,
  Zap,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_LEADERBOARD, DAILY_CHALLENGES, AVAILABLE_BADGES } from '@/data/mockData';
import { toast } from 'sonner';

const BADGE_ICONS: Record<string, any> = {
  Users,
  Sun,
  Flame,
  BookOpen,
  MessageSquare,
};

export function GamificationSection() {
  const { user, claimDailyBonus } = useAuth();
  const [challenges, setChallenges] = useState(DAILY_CHALLENGES);
  const [claimedBonus, setClaimedBonus] = useState(false);

  if (!user) return null;

  const totalResources = 20;
  const totalCollaborations = 10;
  const resourceProgress = (user.resourcesAccessed.length / totalResources) * 100;
  const collabProgress = (user.collaborations / totalCollaborations) * 100;
  const overallProgress = (resourceProgress + collabProgress) / 2;

  const handleClaimDaily = () => {
    const success = claimDailyBonus();
    if (success) {
      setClaimedBonus(true);
      setChallenges(prev =>
        prev.map(c => (c.id === 'dc1' ? { ...c, completed: true } : c))
      );
      toast.success('Daily bonus claimed!', {
        description: '+10 points added to your account',
      });
    } else {
      toast.error('Already claimed today', {
        description: 'Come back tomorrow for more points!',
      });
    }
  };

  // Add current user to leaderboard
  const leaderboard = [...MOCK_LEADERBOARD];
  const userRank = leaderboard.findIndex(e => e.points < user.points) + 1 || leaderboard.length + 1;
  if (userRank <= 5) {
    leaderboard.splice(userRank - 1, 0, {
      rank: userRank,
      username: 'You',
      points: user.points,
      isCurrentUser: true,
    });
    leaderboard.pop();
  }

  return (
    <section className="border-y-2 border-border bg-secondary/30 py-12 md:py-16">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold">Your Progress Dashboard</h2>
          <p className="text-muted-foreground">
            Track your achievements and compete with peers
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Progress Card */}
          <Card className="border-2 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Semester Progress
              </CardTitle>
              <CardDescription>Track your learning journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Overall Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm font-bold text-primary">
                    {Math.round(overallProgress)}%
                  </span>
                </div>
                <Progress value={overallProgress} className="h-4" />
              </div>

              {/* Detailed Progress */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 rounded-lg border-2 border-border p-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Resources Accessed</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {user.resourcesAccessed.length}
                    <span className="text-sm font-normal text-muted-foreground">
                      /{totalResources}
                    </span>
                  </p>
                  <Progress value={resourceProgress} className="h-2" />
                </div>

                <div className="space-y-2 rounded-lg border-2 border-border p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Collaborations</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {user.collaborations}
                    <span className="text-sm font-normal text-muted-foreground">
                      /{totalCollaborations}
                    </span>
                  </p>
                  <Progress value={collabProgress} className="h-2" />
                </div>
              </div>

              {/* Badges */}
              <div className="space-y-3">
                <h4 className="font-medium">Your Badges</h4>
                <div className="flex flex-wrap gap-3">
                  {AVAILABLE_BADGES.map((badge) => {
                    const earned = user.badges.find(b => b.id === badge.id);
                    const Icon = BADGE_ICONS[badge.icon] || Star;
                    return (
                      <div
                        key={badge.id}
                        className={`flex items-center gap-2 rounded-lg border-2 p-3 transition-all ${
                          earned
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-muted opacity-50'
                        }`}
                      >
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            earned ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{badge.name}</p>
                          <p className="text-xs text-muted-foreground">{badge.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Daily Challenge */}
            <Card className="border-2 border-primary bg-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Daily Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {challenges.slice(0, 1).map((challenge) => (
                    <div
                      key={challenge.id}
                      className="flex items-center justify-between gap-2"
                    >
                      <div>
                        <p className="font-medium">{challenge.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {challenge.description}
                        </p>
                      </div>
                      <Badge variant={challenge.completed || claimedBonus ? 'secondary' : 'default'}>
                        +{challenge.points} pts
                      </Badge>
                    </div>
                  ))}
                  <Button
                    onClick={handleClaimDaily}
                    disabled={claimedBonus}
                    className="w-full gap-2"
                  >
                    <Gift className="h-4 w-4" />
                    {claimedBonus ? 'Claimed!' : 'Claim Bonus'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Medal className="h-5 w-5 text-yellow-500" />
                  Top Engagers
                </CardTitle>
                <CardDescription>Anonymous weekly leaderboard</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead className="text-right">Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaderboard.slice(0, 5).map((entry, index) => (
                      <TableRow
                        key={index}
                        className={entry.isCurrentUser ? 'bg-primary/10' : ''}
                      >
                        <TableCell className="font-medium">
                          {index === 0 && '🥇'}
                          {index === 1 && '🥈'}
                          {index === 2 && '🥉'}
                          {index > 2 && index + 1}
                        </TableCell>
                        <TableCell className={entry.isCurrentUser ? 'font-bold' : ''}>
                          {entry.username}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {entry.points}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
