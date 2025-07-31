import { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import { useEditorStore } from "../../contexts/editor.store";
import { uploadPostAction } from "@/app/server/item.action";
import { useExplorerStore } from "@/app/contexts/explorer.store";

export const hooks = () => {
  const editorStore = useEditorStore();
  const explorerStore = useExplorerStore();
  const [activeButton, setActiveButton] = useState('create');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([] as UploadedFile[]);

  interface UploadedFile {
    id: string;
    name: string;
    size: number;
    type: string;
    file: File;
  }

  const handleDrag = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files: File[] = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files: File[] = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]): void => {
    const newFiles: UploadedFile[] = files.map((file: File) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId: string): void => {
    setUploadedFiles(prev => prev.filter(file => file.id! !== fileId));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  useEffect(() => {
    editorStore.setRoute(explorerStore.route);
  }, [explorerStore.route]);

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        [{ align: [] }],
        ["clean"],
      ],
    },
    theme: "snow",
  });

  useEffect(() => {
    if (!quill) return;

    const editorContainer = quill.root;

    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      const files = e.dataTransfer?.files;
      if (files?.length) {
        Array.from(files).forEach((file) => {
          if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = () => {
              const range = quill.getSelection();
              quill.insertEmbed(range?.index || 0, "image", reader.result as string);
            };
            reader.readAsDataURL(file);
          }
        });
      }
    };

    const onTextChange = () => {
      const html = quill.root.innerHTML;
      editorStore.setHtmlContent(html);
    };

    editorContainer.addEventListener("drop", onDrop);
    quill.on("text-change", onTextChange);

    editorStore.setHtmlContent(quill.root.innerHTML);

    return () => {
      editorContainer.removeEventListener("drop", onDrop);
      quill.off("text-change", onTextChange);
    };
  }, [quill]);

  useEffect(() => {
    if (!quill || !editorStore.htmlContent) return;

    quill.clipboard.dangerouslyPasteHTML(editorStore.htmlContent, 'silent');
    const length = quill.getLength();
    quill.setSelection(length, 0);
  }, [quill, editorStore.htmlContent]);

  const uploadContent = async () => {
    editorStore.setUploading(true);
    editorStore.setError(null);

    try {
      const formData = new FormData();

      const htmlContent = quill?.root?.innerHTML || "";
      const blob = new Blob([htmlContent], { type: "text/html" });
      formData.append("file", blob, "content.html");
      formData.append("post", JSON.stringify(editorStore.post));
      formData.append("image", editorStore.image || "");

      await uploadPostAction(formData);

      alert("Upload successful!");
    } catch (err: any) {
      editorStore.setError(err.message);
    } finally {
      editorStore.setUploading(false);
    }
  };

  return {
    uploadContent,
    activeButton,
    setActiveButton,
    quillRef,
    quill,
    dragActive,
    handleDrag,
    handleDrop,
    handleFileInput,
    uploadedFiles,
    removeFile,
    formatFileSize,
    setUploadedFiles
  };
};
