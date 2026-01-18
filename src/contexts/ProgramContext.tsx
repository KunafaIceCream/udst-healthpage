import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Program, Resource } from '@/types';
import { MOCK_RESOURCES, PROGRAM_INFO } from '@/data/mockData';
import { useAuth } from './AuthContext';

interface ProgramContextType {
  selectedProgram: Program;
  setSelectedProgram: (program: Program) => void;
  filteredResources: Resource[];
  pinnedResources: Resource[];
  programInfo: typeof PROGRAM_INFO;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  togglePinResource: (resourceId: string) => void;
}

const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

const PINNED_STORAGE_KEY = 'udst_pinned_resources';

export function ProgramProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [selectedProgram, setSelectedProgram] = useState<Program>('paramedicine');
  const [searchQuery, setSearchQuery] = useState('');
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);

  useEffect(() => {
    // Set program from user preference
    if (user?.program) {
      setSelectedProgram(user.program);
    }
    
    // Check URL params for pilot tracking
    const params = new URLSearchParams(window.location.search);
    const pilot = params.get('pilot');
    if (pilot && ['paramedicine', 'nursing', 'radiography'].includes(pilot)) {
      setSelectedProgram(pilot as Program);
    }
    
    // Load pinned resources
    const stored = localStorage.getItem(PINNED_STORAGE_KEY);
    if (stored) {
      setPinnedIds(JSON.parse(stored));
    }
  }, [user]);

  const togglePinResource = (resourceId: string) => {
    setPinnedIds(prev => {
      const updated = prev.includes(resourceId)
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId];
      localStorage.setItem(PINNED_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const resources = MOCK_RESOURCES.map(r => ({
    ...r,
    pinned: pinnedIds.includes(r.id) || r.pinned,
  }));

  const filteredResources = resources.filter(r => {
    const matchesProgram = r.program === selectedProgram || r.program === 'all';
    const matchesSearch = searchQuery
      ? r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesProgram && matchesSearch;
  });

  const pinnedResources = filteredResources.filter(r => r.pinned);

  return (
    <ProgramContext.Provider
      value={{
        selectedProgram,
        setSelectedProgram,
        filteredResources,
        pinnedResources,
        programInfo: PROGRAM_INFO,
        searchQuery,
        setSearchQuery,
        togglePinResource,
      }}
    >
      {children}
    </ProgramContext.Provider>
  );
}

export function useProgram() {
  const context = useContext(ProgramContext);
  if (context === undefined) {
    throw new Error('useProgram must be used within a ProgramProvider');
  }
  return context;
}
