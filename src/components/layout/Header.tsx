import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, LogOut, User, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProgram } from '@/contexts/ProgramContext';
import { Program } from '@/types';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  const { user, logout } = useAuth();
  const { selectedProgram, setSelectedProgram, searchQuery, setSearchQuery, programInfo } = useProgram();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleLabel = () => {
    if (!user) return '';
    const programLabel = programInfo[user.program].shortTitle;
    return `${user.role === 'student' ? 'Student' : 'Faculty'}, ${programLabel}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-primary text-primary-foreground shadow-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="https://www.udst.edu.qa/themes/custom/developer/logo.svg"
            alt="UDST Logo"
            className="h-10 w-auto bg-primary-foreground p-1"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          <span className="hidden font-bold md:inline-block">Health Sciences</span>
        </div>

        {/* Program Selector - Desktop */}
        <div className="hidden md:block">
          <Select
            value={selectedProgram}
            onValueChange={(value: Program) => setSelectedProgram(value)}
          >
            <SelectTrigger className="w-[240px] border-2 border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground">
              <SelectValue placeholder="Select Program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paramedicine">Paramedicine (B.Sc. P)</SelectItem>
              <SelectItem value="nursing">Nursing (B.Sc. N)</SelectItem>
              <SelectItem value="radiography">Medical Radiography (B.Sc. MR)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search & User - Desktop */}
        <div className="hidden items-center gap-4 md:flex">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground/60" />
            <Input
              type="search"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[200px] border-2 border-primary-foreground/30 bg-primary-foreground/10 pl-9 text-primary-foreground placeholder:text-primary-foreground/60"
            />
          </div>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 hover:bg-primary-foreground/10">
                  <Avatar className="h-8 w-8 border-2 border-primary-foreground/30">
                    <AvatarFallback className="bg-primary-foreground text-primary text-sm font-bold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden text-left lg:block">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-primary-foreground/70">{getRoleLabel()}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="gap-2 text-destructive">
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <div className="flex flex-col gap-6 pt-6">
              {user && (
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  <Avatar className="h-10 w-10 border-2 border-border">
                    <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{getRoleLabel()}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Program</label>
                <Select
                  value={selectedProgram}
                  onValueChange={(value: Program) => {
                    setSelectedProgram(value);
                    setMobileMenuOpen(false);
                  }}
                >
                  <SelectTrigger className="w-full border-2">
                    <SelectValue placeholder="Select Program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paramedicine">Paramedicine (B.Sc. P)</SelectItem>
                    <SelectItem value="nursing">Nursing (B.Sc. N)</SelectItem>
                    <SelectItem value="radiography">Medical Radiography (B.Sc. MR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-2 pl-9"
                  />
                </div>
              </div>

              <Button onClick={logout} variant="destructive" className="mt-auto gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
