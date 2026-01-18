import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ArrowLeft,
  Stethoscope,
  BookOpen,
  Coffee,
  Award,
  Ticket,
  FileText,
  Users,
  Heart,
  Coins,
  CheckCircle2,
  Gift,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { REWARDS, REWARD_CATEGORIES, Reward } from '@/data/rewardsData';
import { toast } from 'sonner';

const ICON_MAP: Record<string, any> = {
  Stethoscope,
  BookOpen,
  Coffee,
  Award,
  Ticket,
  FileText,
  Users,
  Heart,
};

const CATEGORY_COLORS: Record<string, string> = {
  academic: 'bg-primary/10 text-primary border-primary/20',
  wellness: 'bg-green-500/10 text-green-600 border-green-500/20',
  experience: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  merchandise: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
};

export default function Rewards() {
  const { user, addPoints } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [confirmDialog, setConfirmDialog] = useState<Reward | null>(null);
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-md border-2">
          <CardHeader className="text-center">
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>Please sign in to access the rewards store.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/">
              <Button className="w-full">Go to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredRewards = selectedCategory === 'all'
    ? REWARDS
    : REWARDS.filter(r => r.category === selectedCategory);

  const handleRedeem = (reward: Reward) => {
    if (user.points < reward.pointsCost) {
      toast.error('Not enough points', {
        description: `You need ${reward.pointsCost - user.points} more points.`,
      });
      return;
    }
    setConfirmDialog(reward);
  };

  const confirmRedeem = () => {
    if (!confirmDialog) return;
    
    addPoints(-confirmDialog.pointsCost);
    setRedeemedRewards(prev => [...prev, confirmDialog.id]);
    setConfirmDialog(null);
    
    toast.success('Reward Redeemed!', {
      description: `You've successfully redeemed "${confirmDialog.name}". Check your email for details.`,
    });
  };

  const nextReward = REWARDS.find(r => r.pointsCost > user.points && !redeemedRewards.includes(r.id));
  const progressToNext = nextReward ? (user.points / nextReward.pointsCost) * 100 : 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b-2 border-border bg-card shadow-sm">
        <div className="container flex h-16 items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Rewards Store</h1>
            <p className="text-sm text-muted-foreground">Redeem your earned points</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border-2 border-primary bg-primary/10 px-4 py-2">
            <Coins className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold text-primary">{user.points}</span>
            <span className="text-sm text-muted-foreground">pts</span>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Progress to Next Reward */}
        {nextReward && (
          <Card className="mb-8 border-2 border-primary/30 bg-primary/5">
            <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
              <Gift className="h-10 w-10 text-primary" />
              <div className="flex-1 space-y-2">
                <p className="font-medium">
                  {user.points} / {nextReward.pointsCost} points to unlock "{nextReward.name}"
                </p>
                <Progress value={progressToNext} className="h-3" />
              </div>
              <p className="text-sm text-muted-foreground">
                Need {nextReward.pointsCost - user.points} more points
              </p>
            </CardContent>
          </Card>
        )}

        {/* Category Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {REWARD_CATEGORIES.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Rewards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRewards.map((reward) => {
            const Icon = ICON_MAP[reward.icon] || Gift;
            const isRedeemed = redeemedRewards.includes(reward.id);
            const canAfford = user.points >= reward.pointsCost;

            return (
              <Card
                key={reward.id}
                className={`border-2 transition-all ${
                  isRedeemed
                    ? 'border-green-500/50 bg-green-500/5'
                    : canAfford
                    ? 'hover:border-primary hover:shadow-md'
                    : 'opacity-75'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg border ${
                        CATEGORY_COLORS[reward.category]
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    {reward.limitedQuantity && (
                      <Badge variant="secondary" className="text-xs">
                        {reward.limitedQuantity} left
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{reward.name}</CardTitle>
                  <CardDescription>{reward.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-lg font-bold text-primary">
                      <Coins className="h-4 w-4" />
                      {reward.pointsCost}
                    </div>
                    {isRedeemed ? (
                      <Button variant="secondary" disabled className="gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Redeemed
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleRedeem(reward)}
                        disabled={!canAfford}
                        variant={canAfford ? 'default' : 'outline'}
                      >
                        Redeem
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredRewards.length === 0 && (
          <div className="py-12 text-center">
            <Gift className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">No rewards in this category yet.</p>
          </div>
        )}
      </main>

      {/* Confirmation Dialog */}
      <Dialog open={!!confirmDialog} onOpenChange={() => setConfirmDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Redemption</DialogTitle>
            <DialogDescription>
              Are you sure you want to redeem "{confirmDialog?.name}" for{' '}
              <strong>{confirmDialog?.pointsCost} points</strong>?
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border-2 border-border bg-muted/50 p-4">
            <p className="text-sm">
              <strong>After redemption:</strong> {user.points - (confirmDialog?.pointsCost || 0)} points remaining
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialog(null)}>
              Cancel
            </Button>
            <Button onClick={confirmRedeem}>
              Confirm Redemption
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
