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

  routeChangeModalOpen: boolean;
  setRouteChangeModalOpen: (open: boolean) => void;

  htmlContent: string;
  setHtmlContent: (content: string) => void;

  post: Post;
  setPost: (post: Post) => void;

  setCreatedAt: (date: Date) => void;
  setRoute: (route: string) => void;
  setFullpath: (fullpath: string) => void;
  setTitle: (title: string | undefined) => void;
  setDescription: (description: string | undefined) => void;
  setSubjects: (subjects: Subject[]) => void;
  setImgpath: (url: string | undefined) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  uploading: false,
  setUploading: (v) => set({ uploading: v }),

  error: null,
  setError: (e) => set({ error: e }),

  image: null,
  setImage: (image) => set({ image }),

  htmlContent: "",
  setHtmlContent: (content) => set({ htmlContent: content }),

  routeChangeModalOpen: false,
  setRouteChangeModalOpen: (open) => set({ routeChangeModalOpen: open }),

  post: {} as Post,

  setPost: (post) => set({ post }),

  setCreatedAt: (date) =>
    set((state) => ({ post: { ...state.post, createdAt: date } })),

  setRoute: (route) =>
    set((state) => ({ post: { ...state.post, route } })),

  setFullpath: (fullpath) =>
    set((state) => ({ post: { ...state.post, fullpath } })),

  setTitle: (title) =>
    set((state) => ({ post: { ...state.post, title } })),

  setDescription: (description) =>
    set((state) => ({ post: { ...state.post, description } })),

  setSubjects: (subjects) =>
    set((state) => ({ post: { ...state.post, subjects } })),

  setImgpath: (imgurl) =>
    set((state) => ({ post: { ...state.post, imgurl } })),
}));
