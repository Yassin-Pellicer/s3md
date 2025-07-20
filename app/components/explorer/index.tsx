"use client";
import { hooks } from "./hook";
import { useExplorerStore } from "@/app/contexts/explorer.store";
import { Post } from "../../types/Post";
import { Folder } from "../../types/Folder";
import { formatDate } from "@/app/funcs/helper.funcs";
import BreadcrumbNavigator from "../breadcrumbs";
import CreateFolderModal from "./modal/create/folder";

// Combined Item Component
const ExplorerItem = ({
  item,
  onFolderClick
}: {
  item: Post | Folder;
  onFolderClick?: (folderName: string) => void;
}) => {

  const handleClick = () => {
    if (onFolderClick) onFolderClick((item as Folder).name ?? '');
  };

  const isFolder = 'name' in item;
  const name = isFolder ? (item as Folder).name : (item as Post).title;
  const description = isFolder ? '' : (item as Post).description;
  return (
    <div
      className="flex items-center px-3 py-1 hover:bg-blue-50 cursor-pointer group transition-colors duration-150 align-center items-center"
      onClick={handleClick}
    >
      <input type="checkbox" className="mr-2"></input>
      {/* Icon */}
      <div className="flex-shrink-0 mr-3 flex items-center">
        {isFolder ?
          <i className="material-icons">folder</i> :
          <i className="material-symbols-outlined">
            article
          </i>
        }
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <div className="text-sm text-gray-900 truncate font-medium">
          {name}
        </div>
        {!isFolder && description && (
          <div className="text-xs text-gray-500 truncate">
            {description}
          </div>
        )}
      </div>

      {/* Type */}
      <div className="flex-shrink-0 mx-4 hidden md:block">
        <span className="text-xs text-gray-400 uppercase">
          {isFolder ? 'Folder' : 'Post'}
        </span>
      </div>

      {/* Date */}
      <div className="flex-shrink-0 w-20 text-right hidden sm:block">
        <span className="text-xs text-gray-500">
          {formatDate(item.createdAt)}
        </span>
      </div>

      {/* Edit */}
      <div className="flex-shrink-0 text-right hidden sm:block">
          <button
            title="Add new folder"
            className="bg-transparent rounded-full width-10 height-10 flex items-center justify-center hover:bg-gray-200 ml-4 p-1 hover:cursor-pointer"
          >
            <i className="material-symbols-outlined" style={{ fontSize: '20px' }}>more_vert</i>
          </button>
      </div>

    </div>
  );
};

export default function Explorer() {
  const explorerHooks = hooks();
  const explorerStore = useExplorerStore();

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white min-h-screen">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex-1 flex-col items-center space-x-4 space-y-1 mr-8">
          <div className="flex items-center space-x-2">
            {explorerStore.route && explorerStore.route !== 'AdminstradorUsuario' && (
              <button
                onClick={explorerHooks.handleBackClick}
                title="Back"
                className="bg-transparent border-[1px] border-black rounded-full width-10 height-10 flex items-center justify-center p-[2px] hover:bg-gray-200 hover:cursor-pointer"
              >
                <i className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</i>
              </button>
            )}
            <h1 className="text-lg font-semibold text-gray-900">Explorer</h1>
          </div>
          <BreadcrumbNavigator route={explorerStore.route}></BreadcrumbNavigator>
        </div>

        <span className="text-sm text-gray-500 mr-6">
          {explorerStore.allItems.length} items
        </span>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => explorerHooks.fetchContent(explorerStore.route || "AdminstradorUsuario")}
            title="Refresh"
            className="bg-transparent border-[1px] border-black rounded-full width-10 height-10 flex items-center justify-center p-1 hover:bg-gray-200 hover:cursor-pointer"
          >
            <i className="material-symbols-outlined" style={{ fontSize: '20px' }}>refresh</i>
          </button>
          <button
            title="Add new post"
            className="bg-transparent border-[1px] border-black rounded-full width-10 height-10 flex items-center justify-center p-1 hover:bg-gray-200 hover:cursor-pointer"
          >
            <i className="material-symbols-outlined" style={{ fontSize: '20px' }}>post_add</i>
          </button>
          <button
            title="Add new folder"
            onClick={() => explorerStore.setOpenCreateFolderModal(true)}
            className="bg-transparent border-[1px] border-black rounded-full width-10 height-10 flex items-center justify-center p-1 hover:bg-gray-200 hover:cursor-pointer"
          >
            <i className="material-symbols-outlined" style={{ fontSize: '20px' }}>create_new_folder</i>
          </button>
          <button
            title="Add new folder"
            className="bg-transparent border-[1px] border-black rounded-full width-10 height-10 flex items-center justify-center p-1 hover:bg-gray-200 hover:cursor-pointer"
          >
            <i className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</i>
          </button>
        </div>
      </div>

      {/* List Header */}
      {explorerStore.allItems.length > 0 && (
        <div className="flex items-center px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
          <div className="flex-1 flex items-center">
            <input type="checkbox" className="mr-6"></input>
            Name
          </div>
          <div className="flex-shrink-0 mx-4 hidden md:block">
            Type
          </div>
          <div className="flex-shrink-0 w-20 text-right hidden sm:block">
            Modified
          </div>
        </div>
      )}

      {/* File List */}
      <div className="bg-white">
        {explorerStore.allItems.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {explorerStore.allItems.map((item, type) => (
              <ExplorerItem
                key={`${type}-${item.id}`}
                item={item}
                onFolderClick={explorerHooks.handleFolderClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 items-center">
            <div
              className="bg-transparent width-40 height-40"
            >
              <i className="material-icons" style={{ fontSize: '60px' }}>folder</i>
            </div>
            <p className="text-lg font-medium text-gray-900 mb-2">No items found</p>
            <p className="text-gray-500 mb-4">This folder appears to be empty</p>
            <button
              onClick={() => explorerHooks.fetchContent(explorerStore.route || "AdminstradorUsuario")}
              className="bg-transparent text-sm text-black border-[1px] border-black rounded-lg p-2 width-10 height-10 p-1 hover:bg-gray-200 hover:cursor-pointer"
            >
              Load Content
            </button>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="pt-2 mt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-4">
          <span>{explorerStore.folders.length} folders</span>
          <span>{explorerStore.posts.length} files</span>
        </div>
        <div>
          {explorerStore.route && `Route: ${explorerStore.route}`}
        </div>
      </div>

      <CreateFolderModal open={explorerStore.openCreateFolderModal} onConfirm={explorerHooks.addNewFolder}  ></CreateFolderModal>
    </div>
  );
}