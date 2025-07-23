import { create } from "zustand";
import { Post } from "../types/Post";
import { Folder } from "../types/Folder";

interface ScoutStore {
  route: string;
  setRoute: (route: string) => void;

  isFinding: boolean;
  setIsFinding: (finding: boolean) => void;

  finder: string;
  setFinder: (finder: string) => void;

  posts: Post[];
  setPosts: (posts: Post[]) => void;

  folders: Folder[];
  setFolders: (folders: Folder[]) => void;

  allItems: { type: "folder" | "post"; item: Folder | Post }[];
  setAllItems: (allItems: Folder[], posts: Post[], mode : "move" | "guest" | null) => void;

  mode: "move" | "guest" | null;
  setMode: (mode: "move" | "guest" | null) => void;

  baseRoute?: string;
  setBaseRoute: (route: string) => void;
}

export const useScoutStore = create<ScoutStore>((set, get) => ({
  route: "AdministradorUsuario",
  setRoute: (route: string) => set({ route }),

  isFinding: false,
  setIsFinding: (finding: boolean) => set({ isFinding: finding }),

  finder: "",
  setFinder: (finder: string) => set({ finder }),

  posts: [],
  setPosts: (posts: Post[]) => set({ posts }),

  folders: [],
  setFolders: (folders: Folder[]) => set({ folders }),

  allItems: [],
  setAllItems: (folders: Folder[], posts: Post[], mode: "move" | "guest" | null) => {
    const folderItems = folders.map((folder) => ({
      type: "folder" as const,
      item: folder,
    }));

    const postItems = posts.map((post) => ({
      type: "post" as const,
      item: post,
    }));

    const allItems = [...folderItems, ...postItems].sort((a, b) => {
      if (a.type === "folder" && b.type === "post") return -1;
      if (a.type === "post" && b.type === "folder") return 1;
      return 0;
    });

    set({
      folders: [...folders],
      posts: [...posts],
      allItems,
    });
  },

  mode: null,
  setMode: (mode: "move" | "guest" | null) => set({ mode: mode }),

  baseRoute: "AdministradorUsuario",
  setBaseRoute: (route) => set({ baseRoute: route }),
}));
