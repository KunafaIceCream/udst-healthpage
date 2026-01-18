import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { MessageSquare, Shield, Mail } from 'lucide-react';
import { FeedbackDialog } from '@/components/feedback/FeedbackDialog';

export function Footer() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [analyticsOptOut, setAnalyticsOptOut] = useState(false);

  return (
    <>
      <footer className="border-t-2 border-border bg-foreground text-background">
        <div className="container py-8">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Links */}
            <div className="space-y-4">
              <h3 className="font-bold">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <Button
                  variant="link"
                  onClick={() => setFeedbackOpen(true)}
                  className="h-auto justify-start gap-2 p-0 text-background hover:text-background/80"
                >
                  <MessageSquare className="h-4 w-4" />
                  Submit Feedback
                </Button>
                <Button
                  variant="link"
                  asChild
                  className="h-auto justify-start gap-2 p-0 text-background hover:text-background/80"
                >
                  <a href="#privacy">
                    <Shield className="h-4 w-4" />
                    Privacy Policy
                  </a>
                </Button>
                <Button
                  variant="link"
                  asChild
                  className="h-auto justify-start gap-2 p-0 text-background hover:text-background/80"
                >
                  <a href="mailto:healthsci.support@udst.edu.qa">
                    <Mail className="h-4 w-4" />
                    Contact Support
                  </a>
                </Button>
              </div>
            </div>

            {/* Analytics Opt-Out */}
            <div className="space-y-4">
              <h3 className="font-bold">Privacy Settings</h3>
              <div className="flex items-center gap-3">
                <Switch
                  id="analytics-opt-out"
                  checked={analyticsOptOut}
                  onCheckedChange={setAnalyticsOptOut}
                  className="data-[state=checked]:bg-background/30"
                />
                <Label htmlFor="analytics-opt-out" className="text-sm">
                  Opt out of analytics tracking
                </Label>
              </div>
              <p className="text-xs text-background/70">
                We collect anonymous usage data to improve the platform. No personal information is stored.
              </p>
            </div>

            {/* Copyright */}
            <div className="space-y-4 text-right md:text-right">
              <div className="space-y-1">
                <p className="font-bold">UDST College of Health Sciences</p>
                <p className="text-sm text-background/70">Resource Hub v1.0 (Pilot)</p>
              </div>
              <p className="text-xs text-background/60">
                © 2026 University of Doha for Science and Technology. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <FeedbackDialog open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </>
  );
}
