// src/stores/ProjectStore.ts

import { create } from 'zustand';

interface ProjectStoreState {
  selectedProjectId: number | null;
  setSelectedProjectId: (id: number) => void;
}

export const useProjectStore = create<ProjectStoreState>((set) => ({
  selectedProjectId: null,
  setSelectedProjectId: (id: number) => set({ selectedProjectId: id }),
}));
