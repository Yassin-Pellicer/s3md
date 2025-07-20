import { create } from "zustand";
import { Post } from "../types/Post";
import { Folder } from "../types/Folder";

interface ExplorerStore {
  route: string;
  setRoute: (route: string) => void;

  posts: Post[];
  setPosts: (posts: Post[]) => void;

  folders: Folder[];
  setFolders: (folders: Folder[]) => void;
}

export const useExplorerStore = create<ExplorerStore>((set) => ({
  route: "",
  setRoute: (route: string) => set({ route }),
  
  posts: [],
  setPosts: (posts: Post[]) => set({ posts }),
  
  folders: [],
  setFolders: (folders: Folder[]) => set({ folders }),
  
}));
