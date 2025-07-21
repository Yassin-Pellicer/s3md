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

  allItems: (Post | Folder)[];
  setAllItems: (allItems: Folder[], posts: Post[]) => void;

  openCreateFolderModal: boolean;
  setOpenCreateFolderModal: (open: boolean) => void;

  baseRoute?: string;
  setBaseRoute: (route: string) => void;
}

export const useExplorerStore = create<ExplorerStore>((set, get) => ({
  route: "",
  setRoute: (route: string) => set({ route }),

  posts: [],
  setPosts: (posts: Post[]) => set({ posts }),

  folders: [],
  setFolders: (folders: Folder[]) => set({ folders }),

  allItems: [],
  setAllItems: (folders: Folder[], posts: Post[]) => {
    const allItems = [...folders, ...posts];

    const sortedItems = allItems.sort((a: Folder | Post, b: Folder | Post) => {
      if ((a as Folder) && (b as Post)) return -1;
      if ((a as Post) && (b as Folder)) return 1;
      else return 0;
    });

    set({ allItems: sortedItems });
  },

  openCreateFolderModal: false,
  setOpenCreateFolderModal: (open: boolean) => set({ openCreateFolderModal: open }),

  baseRoute: "AdministradorUsuarioRemoto",
  setBaseRoute: (route) => set({ baseRoute: route }),
}));

