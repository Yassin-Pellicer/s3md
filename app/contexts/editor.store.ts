import { create } from "zustand";

interface EditorState {
  uploading: boolean;
  setUploading: (v: boolean) => void;
  error: string | null;
  setError: (e: string | null) => void;
  title: string | null; 
  setTitle: (e: string | null) => void;
  description: string | null;
  setDescription: (e: string | null) => void;
  image: File | null;
  setImage: (e: File | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  uploading: false,
  setUploading: (v) => set({ uploading: v }),
  error: null,
  setError: (e) => set({ error: e }),
  title: "",
  setTitle: (e) => set({ title: e }),
  description: "",
  setDescription: (e) => set({ description: e }),
  image: null,
  setImage: (e) => set({ image: e }),
}));
