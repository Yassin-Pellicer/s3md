"use client";
import "quill/dist/quill.snow.css";
import { hooks } from "./hook";
import { useEditorStore } from "../../contexts/editor.store";
import BreadcrumbNavigator from "../breadcrumbs";
import { useExplorerStore } from "@/app/contexts/explorer.store";
import ChangeRoute from "./modal/change/route/item";

export default function QuillEditor() {
  const editorHooks = hooks();
  const editorStore = useEditorStore();
  const explorerStore = useExplorerStore();

  return (
    <div className="flex flex-col w-full my-2">
      <div className="flex flex-row mb-4 space-x-2 align-center items-center">
        <span className="material-symbols-outlined">create</span>
        <h1 className="text-3xl tracking-tighter font-bold ">Create content</h1>
      </div>

      <div className="flex w-full bg-gray-200 rounded-2xl mb-6">
        <button
          onClick={() => editorHooks.setActiveButton('create')}
          className={`flex-1 py-2 font-bold tracking-tighter px-4 rounded-l-2xl transition-all hover:cursor-pointer duration-50 ${editorHooks.activeButton === 'create'
            ? 'bg-black text-white'
            : 'bg-transparent text-gray-700 hover:text-gray-900'
            }`}
        >
          Create Post
        </button>
        <button
          onClick={() => editorHooks.setActiveButton('upload')}
          className={`flex-1 py-2 font-bold tracking-tighter px-4 rounded-r-2xl transition-all hover:cursor-pointer duration-50 ${editorHooks.activeButton === 'upload'
            ? 'bg-black text-white'
            : 'bg-transparent text-gray-700 hover:text-gray-900'
            }`}
        >
          Upload Files
        </button>
      </div>

      {editorHooks.activeButton === 'create' && <div className="flex flex-row gap-8 wrap content-wrap align-center justify-between items-center">
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
              className="text-sm border-b-[1px] p-2 w-full"
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
              className="text-sm border-b-[1px] p-2 w-full"
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
      </div>}

      <article className="flex flex-row max-w-4xl w-full bg-white rounded-xl shadow-sm mb-8 overflow-hidden">
        <div className="relative max-h-64 max-w-64 w-full overflow-hidden">
          <img
            src={editorStore.image ? URL.createObjectURL(editorStore.image) : "https://placehold.co/600x400?text=📸"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            {/* {post.author && ( */}
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>Yassin Pellicer</span>
            </div>
          </div>

          {/* Title */}
          {editorStore.post.title && (
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">
              {editorStore.post.title}
            </h1>
          )}

          {/* Description */}
          {editorStore.post.description && (
            <p className="text-sm text-gray-700 mb-6 leading-relaxed">
              {editorStore.post.description && editorStore.post.description.split(' ').length > 16 ? editorStore.post.description.split(' ').slice(0, 8).join(' ') + '...' : editorStore.post.description}
            </p>
          )}
        </div>
      </article>

      <div className="flex flex-col mb-4 w-full">
        <p className="text-xs text-gray-600 mb-1">Content will be published on the following route</p>
        <div>
          <div className="flex flex-row items-center justify-between gap-4">
            <BreadcrumbNavigator route={explorerStore.route} />
            <button
              title="Change route"
              className="bg-transparent border-[1px] border-black rounded-full flex items-center justify-center p-1 hover:bg-gray-200 hover:cursor-pointer shrink-0"
              onClick={() => editorStore.setRouteChangeModalOpen(true)}
            >
              <i className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                folder_data
              </i>
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: editorHooks.activeButton === 'create' ? 'block' : 'none' }}>
        <div ref={editorHooks.quillRef} />
      </div>
      {editorHooks.activeButton === 'upload' && (
        <div className="space-y-4">
          {/* Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${editorHooks.dragActive
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
              }`}
            onDragEnter={editorHooks.handleDrag}
            onDragLeave={editorHooks.handleDrag}
            onDragOver={editorHooks.handleDrag}
            onDrop={editorHooks.handleDrop}
          >
            <input
              type="file"
              multiple
              onChange={editorHooks.handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="*/*"
            />
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 text-gray-400">
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-900">
                  Drop files here or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  Support for all file types up to 10MB each
                </p>
              </div>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Choose Files
              </button>
            </div>
          </div>

          {/* Uploaded Files List */}
          {editorHooks.uploadedFiles.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900">
                Uploaded Files ({editorHooks.uploadedFiles.length})
              </h3>
              <div className="space-y-2">
                {editorHooks.uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 text-gray-400">
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {editorHooks.formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => editorHooks.removeFile(file.id)}
                      className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                  Upload All Files
                </button>
                <button
                  onClick={() => editorHooks.setUploadedFiles([])}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>
      )}
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
    </div>
  );
}
