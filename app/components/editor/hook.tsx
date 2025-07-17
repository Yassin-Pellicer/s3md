import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import { useEditorStore } from "../../contexts/editor.store";

export const hooks = () => {
  const editorStore = useEditorStore();
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
    if (quill) {
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
                quill.insertEmbed(range?.index || 0, "image", reader.result);
              };
              reader.readAsDataURL(file);
            }
          });
        }
      };

      editorContainer.addEventListener("drop", onDrop);
      return () => editorContainer.removeEventListener("drop", onDrop);
    }
  }, [quill]);

  const uploadContent = async (quill: any) => {
    if (!quill || !quill.root) {
      editorStore.setError("Editor not ready");
      return;
    }

    editorStore.setUploading(true);
    editorStore.setError(null);

    try {
      const htmlContent = quill.root.innerHTML;
      const blob = new Blob([htmlContent], { type: "text/html" });
      const formData = new FormData();
      formData.append("file", blob, "content.html");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      alert("Upload successful!");
    } catch (err: any) {
      editorStore.setError(err.message || "Unknown error");
    } finally {
      editorStore.setUploading(false);
    }
  };

  return {
    uploadContent,
    quillRef,
    quill,
  };
};
