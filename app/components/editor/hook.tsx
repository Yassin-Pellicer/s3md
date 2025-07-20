import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import { useEditorStore } from "../../contexts/editor.store";
import { uploadPostAction } from "@/app/server/item.action";

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
    const editorContainer = quill?.root;
    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      const files = e.dataTransfer?.files;
      if (files?.length) {
        Array.from(files).forEach((file) => {
          if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = () => {
              const range = quill?.getSelection();
              quill?.insertEmbed(range?.index || 0, "image", reader.result);
            };
            reader.readAsDataURL(file);
          }
        });
      }
    };
    editorContainer?.addEventListener("drop", onDrop);
    return () => editorContainer?.removeEventListener("drop", onDrop);
  }, [quill]);

  const uploadContent = async () => {

    editorStore.setUploading(true);
    editorStore.setError(null);
    useEditorStore.setState((state) => ({
      post: {
        ...state.post,
        createdAt: new Date(),
        route: "AdministradorUsuario",
      },
    }));

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
    quillRef,
    quill,
  };
};
