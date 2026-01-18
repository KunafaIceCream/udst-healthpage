import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Star, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FeedbackDialog({ open, onOpenChange }: FeedbackDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [category, setCategory] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0 || !category || !feedback.trim()) {
      toast.error('Please complete all fields');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast.success('Feedback submitted!', {
      description: 'Thank you for helping us improve.',
    });

    // Reset after showing success
    setTimeout(() => {
      setRating(0);
      setCategory('');
      setFeedback('');
      setIsSubmitted(false);
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Feedback</DialogTitle>
          <DialogDescription>
            Help us improve the Health Sciences Resource Hub. Your feedback is anonymous and valuable.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold">Thank You!</h3>
            <p className="text-center text-muted-foreground">
              Your feedback has been submitted successfully.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Star Rating */}
            <div className="space-y-2">
              <Label>Overall Experience</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="rounded p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        star <= (hoveredRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Feedback Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="border-2">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usability">Usability & Navigation</SelectItem>
                  <SelectItem value="resources">Resources & Content</SelectItem>
                  <SelectItem value="gamification">Gamification & Rewards</SelectItem>
                  <SelectItem value="performance">Performance & Speed</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Feedback Text */}
            <div className="space-y-2">
              <Label>Your Feedback</Label>
              <Textarea
                placeholder="Tell us what you think... What works well? What could be improved?"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                className="border-2 resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Your feedback is anonymous and will be used to improve the platform.
              </p>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Feedback
                </>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
