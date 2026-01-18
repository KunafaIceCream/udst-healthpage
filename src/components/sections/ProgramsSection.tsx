import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Ambulance,
  Heart,
  Scan,
  ExternalLink,
  Pin,
  BookOpen,
  Calendar,
  Folder,
  MessageSquare,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProgram } from '@/contexts/ProgramContext';
import { MOCK_RESOURCES } from '@/data/mockData';
import { Program, Resource } from '@/types';
import { toast } from 'sonner';

const PROGRAM_ICONS = {
  paramedicine: Ambulance,
  nursing: Heart,
  radiography: Scan,
};

const RESOURCE_ICONS: Record<string, any> = {
  BookOpen,
  Calendar,
  Folder,
  MessageSquare,
  Stethoscope: Heart,
  FileText: BookOpen,
  Monitor: Scan,
  Database: BookOpen,
  FileImage: Folder,
  GraduationCap: BookOpen,
  FolderOpen: Folder,
  Users: MessageSquare,
  Bell: MessageSquare,
};

export function ProgramsSection() {
  const { accessResource, user } = useAuth();
  const { programInfo, togglePinResource, selectedProgram } = useProgram();

  const handleAccessResource = (resource: Resource) => {
    accessResource(resource.id);
    toast.success(`Accessed ${resource.title}`, {
      description: '+5 points earned!',
    });
  };

  const getResourcesByProgram = (program: Program) => {
    return MOCK_RESOURCES.filter(r => r.program === program);
  };

  const programs: Program[] = ['paramedicine', 'nursing', 'radiography'];

  return (
    <section id="programs-section" className="py-12 md:py-16">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold">Core Programs</h2>
          <p className="text-muted-foreground">
            Access resources tailored to your degree program
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {programs.map((program) => {
            const info = programInfo[program];
            const Icon = PROGRAM_ICONS[program];
            const resources = getResourcesByProgram(program);
            const isSelected = selectedProgram === program;

            return (
              <Card
                key={program}
                className={`border-2 transition-all hover:shadow-lg ${
                  isSelected ? 'border-primary shadow-md' : 'border-border'
                }`}
              >
                <CardHeader>
                  <div className="mb-2 flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 ${
                        isSelected
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-secondary'
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    {isSelected && (
                      <Badge variant="secondary" className="border-2">
                        Selected
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{info.title}</CardTitle>
                  <CardDescription>{info.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="resources" className="border-none">
                      <AccordionTrigger className="hover:no-underline">
                        <span className="text-sm font-medium">
                          View Resources ({resources.length})
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          {resources.map((resource) => {
                            const ResourceIcon = RESOURCE_ICONS[resource.icon] || BookOpen;
                            return (
                              <div
                                key={resource.id}
                                className="flex items-center justify-between gap-2 rounded-lg border-2 border-border p-3 transition-colors hover:bg-secondary"
                              >
                                <div className="flex items-center gap-3">
                                  <ResourceIcon className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm font-medium">{resource.title}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {resource.description}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  {user?.role === 'faculty' && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => togglePinResource(resource.id)}
                                    >
                                      <Pin
                                        className={`h-4 w-4 ${
                                          resource.pinned ? 'fill-primary text-primary' : ''
                                        }`}
                                      />
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleAccessResource(resource)}
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
