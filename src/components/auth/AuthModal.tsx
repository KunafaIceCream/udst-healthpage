import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Lock, User, GraduationCap, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Program, UserRole } from '@/types';
import { toast } from 'sonner';

interface AuthModalProps {
  open: boolean;
}

export function AuthModal({ open }: AuthModalProps) {
  const { login, signup, isLoading } = useAuth();
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState<string | null>(null);

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState<UserRole>('student');
  const [signupProgram, setSignupProgram] = useState<Program>('paramedicine');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!loginEmail || !loginPassword) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(loginEmail, loginPassword);
    if (success) {
      toast.success('Welcome back!', {
        description: 'You have successfully logged in.',
      });
    } else {
      setError('No account found. Please sign up first.');
      setTab('signup');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!signupName || !signupEmail || !signupPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (signupPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const success = await signup(signupName, signupEmail, signupPassword, signupRole, signupProgram);
    if (success) {
      toast.success('Account created!', {
        description: 'Welcome to the Health Sciences Resource Hub! +50 welcome points added.',
      });
    } else {
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md [&>button]:hidden" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl">Health Sciences Hub</DialogTitle>
          <DialogDescription>
            Sign in to access your program resources and track your progress.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => { setTab(v as 'login' | 'signup'); setError(null); }}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your.email@udst.edu.qa"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="border-2 pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="border-2 pl-10"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button variant="outline" className="w-full border-2" disabled>
              Sign in with UDST SSO (Coming Soon)
            </Button>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    className="border-2 pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your.email@udst.edu.qa"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="border-2 pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="border-2 pl-10"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={signupRole} onValueChange={(v: UserRole) => setSignupRole(v)}>
                    <SelectTrigger className="border-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="faculty">Faculty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Program</Label>
                  <Select value={signupProgram} onValueChange={(v: Program) => setSignupProgram(v)}>
                    <SelectTrigger className="border-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paramedicine">Paramedicine</SelectItem>
                      <SelectItem value="nursing">Nursing</SelectItem>
                      <SelectItem value="radiography">Medical Radiography</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
