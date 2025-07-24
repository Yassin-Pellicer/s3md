"use client";
import { hooks } from "./hook";
import { useExplorerStore } from "@/app/contexts/explorer.store";
import { Post } from "../../types/Post";
import { Folder } from "../../types/Folder";
import { formatDate } from "@/app/funcs/helper.funcs";
import BreadcrumbNavigator from "../breadcrumbs";
import CreateFolderModal from "./modal/create/folder";
import FolderMenu from "./modal/info";
import DeleteItems from "./modal/delete/item";
import MoveItems from "./modal/move/item";
import CreatePost from "./modal/create/post";

const ExplorerItem = ({
  item,
  onFolderClick,
  type,
}: {
  item: Post | Folder;
  onFolderClick?: (folderName: string) => void;
  type: "folder" | "post";
}) => {
  const explorerHooks = hooks();
  const explorerStore = useExplorerStore();

  const name = type === "folder" ? (item as Folder).name : (item as Post).title;
  const description = type === "post" ? "" : (item as Post).description;

  const handleClick = () => {
    if (explorerStore.editorMode || explorerStore.isFinding) {
      return;
    }
    if (type === "folder" && onFolderClick)
      onFolderClick((item as Folder).name ?? "");
    if (type === "post") return;
  };

  return (
    <div
      onClick={() => {
        if (explorerStore.editorMode) {
          explorerStore.toggleSelectedItem({ item: item, type: type });
        }
      }}
      className="flex py-2 hover:bg-blue-50 group transition-colors duration-150 align-center items-center"
    >
      {explorerStore.editorMode && (
        <input
          type="checkbox"
          className="mr-4"
          readOnly
          checked={explorerStore.selectedItems.some(
            (selectedItem) => selectedItem.item?.id === item.id
          )}
        ></input>
      )}
      {/* Icon */}
      <div className="flex-shrink-0 mr-3 flex items-center">
        {type === "folder" ? (
          <i
            className={`material-icons ${explorerStore.isFinding ? "text-gray-400" : ""
              }`}
          >
            folder
          </i>
        ) : (
          <i className="material-symbols-outlined">article</i>
        )}
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0 cursor-pointer" onClick={handleClick}>
        <div className="text-sm text-gray-900 truncate font-medium">{name}</div>
        {type === "post" && description && (
          <div className="text-xs text-gray-500 truncate">{description}</div>
        )}
      </div>

      {/* Type */}
      <div className="flex-shrink-0 mx-2 hidden md:block">
        <span className="text-xs text-gray-400 uppercase">
          {type === "folder" ? "Folder" : "Post"}
        </span>
      </div>

      {/* Date */}
      <div className="flex-shrink-0 w-10 mx-6 text-right hidden sm:block">
        <span className="text-xs text-gray-500">
          {formatDate(item.createdAt)}
        </span>
      </div>

      {/* Edit */}
      {!explorerStore.editorMode && (
        <FolderMenu
          onMove={() => {
            explorerStore.addSelectedItem({ item, type });
            explorerStore.setOpenMoveModal(true)}
          }
          onEdit={() => console.log("Edit clicked")}
          onDelete={() => {
            explorerStore.addSelectedItem({ item, type });
            explorerStore.setOpenDeleteModal(true);
          }}
        />
      )}
    </div>
  );
};

export default function Explorer() {
  const explorerHooks = hooks();
  const explorerStore = useExplorerStore();

  return (
    <div className="max-w-4xl mx-auto py-4 bg-white min-h-screen">
      <div className="flex-1 flex-col items-center space-y-1">
        <h1 className="text-3xl tracking-tighter mb-4 font-semibold text-gray-900">
          Explorer
        </h1>
        <div className="flex flex-row justify-between items-center gap-x-4 mb-4 flex-wrap gap-y-4">
          <div className="flex flex-row w-full">
            {explorerStore.route &&
              explorerStore.route !== "AdminstradorUsuario" && (
                <button
                  onClick={explorerHooks.handleBackClick}
                  title="Back"
                  className="mr-2 flex items-center w-[2.5%]"
                >
                  <i
                    className="material-symbols-outlined leading-none align-middle"
                    style={{
                      fontSize: "16px",
                      lineHeight: "1",
                      display: "inline-block",
                    }}
                  >
                    arrow_back
                  </i>
                </button>
              )}
            <div className="w-[97.5%] mb-2">
              <BreadcrumbNavigator
                route={explorerStore.route}
                onClickPart={explorerHooks.handleBreadcrumbClick}
              />
            </div>
          </div>

          <div className="flex items-center justify-between w-full border-b-2 border-gray-200 pb-4">
            <span className="text-sm text-gray-500">
              {explorerStore.allItems.length} items
            </span>
            <div className="flex flex-row gap-x-1">
              <button
                onClick={() =>
                  explorerHooks.fetchContent(
                    explorerStore.route || "AdminstradorUsuario"
                  )
                }
                title="Refresh"
                className="bg-transparent border-[1px] border-black rounded-full width-10 height-10 flex items-center justify-center p-1 hover:bg-gray-200 hover:cursor-pointer"
              >
                <i
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
                  refresh
                </i>
              </button>
              <button
                title="Add new post"
                className="bg-transparent border-[1px] border-black rounded-full width-10 height-10 flex items-center justify-center p-1 hover:bg-gray-200 hover:cursor-pointer"
                onClick={() => explorerStore.setOpenCreatePostModal(true)}
              >
                <i
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
                  post_add
                </i>
              </button>
              <button
                title="Add new folder"
                onClick={() => explorerStore.setOpenCreateFolderModal(true)}
                className="bg-transparent border-[1px] border-black rounded-full width-10 height-10 flex items-center justify-center p-1 hover:bg-gray-200 hover:cursor-pointer"
              >
                <i
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
                  create_new_folder
                </i>
              </button>
              {explorerStore.editorMode && (
                <button
                  title="Move or delete selected items"
                  className="bg-transparent border-[1px] border-black rounded-full width-10 height-10 flex items-center justify-center p-1 hover:bg-gray-200 hover:cursor-pointer"
                  disabled={!explorerStore.editorMode}
                >
                  <FolderMenu
                    onMove={() => explorerStore.setOpenMoveModal(true)}
                    onDelete={() => {
                      explorerStore.setOpenDeleteModal(true);
                    }}
                  />
                </button>
              )}
              <button
                title="Move or delete selected items"
                onClick={() =>
                  explorerStore.setEditorMode(!explorerStore.editorMode)
                }
                className={
                  explorerStore.editorMode
                    ? "bg-black text-white border-[1px] border-black rounded-full width-10 height-10 flex items-center justify-center p-1 hover:bg-gray-600 hover:cursor-pointer"
                    : "bg-transparent border-[1px] border-black rounded-full width-10 height-10 flex items-center justify-center p-1 hover:bg-gray-200 hover:cursor-pointer"
                }
              >
                <i
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
                  edit
                </i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* List Header */}
      {explorerStore.allItems.length > 0 && (
        <div className="flex py-2 align-center items-center">
          {/* Icon */}
          <div className="flex-1 flex items-center font-light text-gray-500">
            RESOURCE
          </div>

          {/* Type */}
          <div className="mx-8 hidden md:block font-light text-gray-500">
            TYPE
          </div>

          {/* Date */}
          <div className=" text-right font-light text-gray-500">MODIFIED</div>
        </div>
      )}

      {/* File List */}
      <div className="bg-white min-h-[35vh]">
        {explorerStore.allItems.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {explorerStore.allItems.map(({ item, type }, index) => {
              console.log("explorer", { item, type, index });
              return (
                <ExplorerItem
                  key={`${type}-${item.id}-${index}`}
                  item={item}
                  type={type}
                  onFolderClick={explorerHooks.handleFolderClick}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 items-center">
            <div className="bg-transparent width-40 height-40">
              <i className="material-icons" style={{ fontSize: "60px" }}>
                folder
              </i>
            </div>
            <p className="text-lg font-medium text-gray-900 mb-2">
              No items found
            </p>
            <p className="text-gray-500 mb-4">
              This folder appears to be empty
            </p>
            <button
              onClick={() =>
                explorerHooks.fetchContent(
                  explorerStore.route || "AdminstradorUsuario"
                )
              }
              className="bg-transparent text-sm text-black border-[1px] border-black rounded-lg p-2 width-10 height-10 hover:bg-gray-200 hover:cursor-pointer"
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
      </div>
      <CreateFolderModal
        open={explorerStore.openCreateFolderModal}
        onConfirm={explorerHooks.addNewFolder}
      ></CreateFolderModal>
      <DeleteItems
        open={explorerStore.openDeleteModal}
        items={explorerStore.selectedItems}
        onConfirm={() => {
          if (explorerStore.selectedItems) {
            explorerHooks.deleteItems(explorerStore.selectedItems);
          }
        }}
      />
      <MoveItems
        open={explorerStore.openMoveModal}
        items={explorerStore.selectedItems}
        onConfirm={() => {
          if (explorerStore.selectedItems) {
            explorerHooks.moveItems(explorerStore.selectedItems);
          }
        }}
      />
      <CreatePost
        open={explorerStore.openCreatePostModal}
        onConfirm={explorerHooks.addNewPost}
        ></CreatePost>
    </div>
  );
}
