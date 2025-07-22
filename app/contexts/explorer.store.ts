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

  allItems: { type: "folder" | "post"; item: Folder | Post }[];
  setAllItems: (allItems: Folder[], posts: Post[]) => void;

  openCreateFolderModal: boolean;
  setOpenCreateFolderModal: (open: boolean) => void;

  openDeleteModal: boolean;
  setOpenDeleteModal: (open: boolean) => void;

  selectedItems: {
    item: Folder | Post | null;
    type: "folder" | "post" | null;
  }[];
  setSelectedItems: (
    items: { item: Folder | Post | null; type: "folder" | "post" | null }[]
  ) => void;

  addSelectedItem: (item: {
    item: Folder | Post | null;
    type: "folder" | "post" | null;
  }) => void;

  removeSelectedItem: (item: {
    item: Folder | Post | null;
    type: "folder" | "post" | null;
  }) => void;

  toggleSelectedItem: (item: {
    item: Folder | Post | null;
    type: "folder" | "post" | null;
  }) => void;

  baseRoute?: string;
  setBaseRoute: (route: string) => void;

  editorMode: boolean;
  setEditorMode: (mode: boolean) => void;
}

export const useExplorerStore = create<ExplorerStore>((set, get) => ({
  route: "AdministradorUsuario",
  setRoute: (route: string) => set({ route }),

  posts: [],
  setPosts: (posts: Post[]) => set({ posts }),

  folders: [],
  setFolders: (folders: Folder[]) => set({ folders }),

  allItems: [],

  setAllItems: (folders: Folder[], posts: Post[]) => {
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

    set({ allItems });
  },

  openCreateFolderModal: false,
  setOpenCreateFolderModal: (open: boolean) =>
    set({ openCreateFolderModal: open }),

  openDeleteModal: false,
  setOpenDeleteModal: (open: boolean) => set({ openDeleteModal: open }),

  selectedItems: [],
  setSelectedItems: (
    items: { item: Folder | Post | null; type: "folder" | "post" | null }[]
  ) => set({ selectedItems: items }),

  addSelectedItem: (item: {
    item: Folder | Post | null;
    type: "folder" | "post" | null;
  }) =>
    set((state) => {
      const alreadySelected = state.selectedItems.some(
        (selectedItem) =>
          selectedItem.type === item.type &&
          selectedItem.item?.id === item.item?.id
      );

      if (!alreadySelected) {
        return {
          selectedItems: [...state.selectedItems, item],
        };
      }

      return state;
    }),

  removeSelectedItem: (item: {
    item: Folder | Post | null;
    type: "folder" | "post" | null;
  }) =>
    set((state) => {
      return {
        selectedItems: state.selectedItems.filter(
          (selectedItem) =>
            !(
              selectedItem.type === item.type &&
              selectedItem.item?.id === item.item?.id
            )
        ),
      };
    }),

  toggleSelectedItem: (item: {
    item: Folder | Post | null;
    type: "folder" | "post" | null;
  }) =>
    set((state) => {
      const isSelected = state.selectedItems.some(
        (selectedItem) =>
          selectedItem.type === item.type &&
          selectedItem.item?.id === item.item?.id
      );

      if (isSelected) {
        return {
          selectedItems: state.selectedItems.filter(
            (selectedItem) =>
              !(
                selectedItem.type === item.type &&
                selectedItem.item?.id === item.item?.id
              )
          ),
        };
      } else {
        return {
          selectedItems: [...state.selectedItems, item],
        };
      }
    }),

  baseRoute: "AdministradorUsuario",
  setBaseRoute: (route) => set({ baseRoute: route }),

  editorMode: false,
  setEditorMode: (mode: boolean) => set((state) => ({
    editorMode: mode,
    selectedItems: mode ? state.selectedItems : []
  })),
}));
