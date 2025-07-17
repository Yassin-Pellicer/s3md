import { create } from "zustand";
import { Post } from "../types/Post";
import { Subject } from "../types/Subject";

interface EditorState {
  uploading: boolean;
  setUploading: (v: boolean) => void;

  error: string | null;
  setError: (e: string | null) => void;

  image?: File | null;
  setImage: (image: File | null) => void;

  post: Post;
  setCreatedAt: (date: Date) => void;
  setRoute: (route: string) => void;
  setTitle: (title: string | undefined) => void;
  setDescription: (description: string | undefined) => void;
  setSubjects: (subjects: Subject[]) => void;
  setImgUrl: (url: string | undefined) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  uploading: false,
  setUploading: (v) => set({ uploading: v }),

  error: null,
  setError: (e) => set({ error: e }),

  image: null,
  setImage: (image) => set({ image }),

  post: {
    createdAt: undefined,
    route: "",
    title: "",
    description: "",
    subjects: undefined,
    imgurl: "testimage",
  },

  setCreatedAt: (date) =>
    set((state) => ({ post: { ...state.post, createdAt: date } })),

  setRoute: (route) =>
    set((state) => ({ post: { ...state.post, route } })),

  setTitle: (title) =>
    set((state) => ({ post: { ...state.post, title } })),

  setDescription: (description) =>
    set((state) => ({ post: { ...state.post, description } })),

  setSubjects: (subjects) =>
    set((state) => ({ post: { ...state.post, subjects } })),

  setImgUrl: (imgurl) =>
    set((state) => ({ post: { ...state.post, imgurl } })),
}));
