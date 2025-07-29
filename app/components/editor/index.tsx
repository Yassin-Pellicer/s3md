"use client";

import "quill/dist/quill.snow.css";
import { hooks } from "./hook";
import { useEditorStore } from "../../contexts/editor.store";
import BreadcrumbNavigator from "../breadcrumbs";
import { useExplorerStore } from "@/app/contexts/explorer.store";
import ChangeRoute from "./modal/change/route/post";

export default function QuillEditor() {
  const editorHooks = hooks();
  const editorStore = useEditorStore();
  const explorerStore = useExplorerStore();

  return (
    <>
      <div className="flex flex-row mb-4 space-x-2 align-center items-center">
        <p
          className="material-icons"
          style={{ fontSize: '30px' }}
        >
          article
        </p>
        <h1 className="lg:text-4xl text-3xl  tracking-tighter font-bold underline">Create your post</h1>
      </div>
      <div className="flex flex-row gap-8 wrap content-wrap align-center justify-between items-center">
        <div className="flex flex-col gap-4 mb-8 w-full">
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2">
              <i className="material-icons" style={{ fontSize: "20px" }}>
                title
              </i>
              <p className="text-lg">Title</p>
            </div>
            <input
              type="text"
              value={editorStore.post.title || ""}
              onChange={(e) => editorStore.setTitle(e.target.value)}
              placeholder="Add a title here..."
              className="text-sm border-[1px] p-2 rounded-xl w-full"
            ></input>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2">
              <i className="material-icons" style={{ fontSize: "20px" }}>
                description
              </i>
              <p className="text-lg ">Description</p>
            </div>
            <input
              type="text"
              value={editorStore.post.description || ""}
              onChange={(e) => editorStore.setDescription(e.target.value)}
              placeholder="Add a short description here..."
              className="border-[1px] p-2 text-sm rounded-xl w-full"
            ></input>
          </div>

          <div className="flex flex-col align-center">
            <div className="flex flex-row items-center gap-2">
              <i className="material-icons" style={{ fontSize: "20px" }}>
                image
              </i>
              <p className="text-lg">Upload banner</p>
            </div>
            <label className="flex flex-col items-center justify-center border-[1px] border-dashed border-gray-400 py-1 rounded-lg cursor-pointer hover:bg-gray-100">
              <div className="flex flex-row items-center gap-2">
                {editorStore.image ? (
                  <p className="text-lg font-bold">{editorStore.image.name}</p>
                ) : (
                  <>
                    <i className="material-icons text-lg">add</i>
                    <p className="text-lg font-bold">Add image</p>
                  </>
                )}
              </div>
              <input
                type="file"
                onChange={(e) =>
                  editorStore.setImage(e.target.files?.[0] || null)
                }
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col mb-4">
        <p className="text-xs text-gray-600 mb-1">This post will be published on the following route</p>
        <div>
          <div className="grid grid-cols-[80%_20%] items-center align-center">
            <BreadcrumbNavigator route={explorerStore.route}></BreadcrumbNavigator>
            <div className="flex flex-row justify-end">
              <button
                title="Change route"
                className="bg-transparent border-[1px] border-black rounded-full w-fit h-fit flex items-center justify-center p-1 hover:bg-gray-200 hover:cursor-pointer shrink-0"
                onClick={() => editorStore.setRouteChangeModalOpen(true)}
              >
                <i
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
                  folder_data
                </i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div ref={editorHooks.quillRef} />
      </div>
      <button
        disabled={editorStore.uploading}
        onClick={() => {
          editorHooks.uploadContent();
        }}
        className={`py-2 px-4 rounded-xl w-full font-bold mt-4 border-[1px] transition duration-100
          ${editorStore.uploading
            ? "bg-gray-400 cursor-not-allowed text-gray-700"
            : "bg-black text-white hover:cursor-pointer hover:bg-white hover:text-black hover:border-black"
          }`}
      >
        {editorStore.uploading ? "Uploading..." : "Publish"}
      </button>
      {editorStore.error && (
        <p className="text-red-600 mt-2">{editorStore.error}</p>
      )}
      <ChangeRoute
        open={editorStore.routeChangeModalOpen}
        onConfirm={() => {
        }}
      />
    </>
  );
}
