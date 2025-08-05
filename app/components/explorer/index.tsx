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
import MoveItems from "./modal/change/location/item";
import CreatePost from "./modal/create/post";
import { useEditorStore } from "@/app/contexts/editor.store";

const ExplorerItem = ({
  item,
  onFolderClick,
  onPostClick,
  type,
}: {
  item: Post | Folder;
  onFolderClick?: (folderName: string) => void;
  onPostClick?: (post: Post) => void;
  type: "folder" | "post";
}) => {
  const explorerStore = useExplorerStore();
  const explorerHooks = hooks();
  const editorStore = useEditorStore();

  const name = type === "folder" ? (item as Folder).name : (item as Post).title;
  const description = type === "post" ? (item as Post).description : "";

  const handleClick = () => {
    if (explorerStore.editorMode || explorerStore.isFinding) {
      return;
    }
    if (type === "folder" && onFolderClick)
      onFolderClick((item as Folder).name ?? "");
    if (type === "post" && onPostClick)
      onPostClick((item as Post) ?? "");
  };

  return (
    <div
      className="flex hover:bg-blue-50 group transition-colors py-2 duration-150 align-center items-center"
    >
      {explorerStore.editorMode && (
        <input
          type="checkbox"
          className="mr-4 hover:cursor-pointer"
          checked={explorerStore.selectedItems.some(
            (selectedItem) => selectedItem.item?.id === item.id
          )}
          onChange={(e) => {
            explorerStore.toggleSelectedItem({
              item,
              type,
            });
          }}
        ></input>
      )}
      {/* Icon */}
      <div
        className="flex flex-row justify-between items-center w-full hover:cursor-pointer"
        onClick={() => {
          if (explorerStore.editorMode) {
            explorerStore.toggleSelectedItem({ item: item, type: type });
          }
          else{
            handleClick();
          }
        }}
      >
        <div className="flex flex-row">
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
          <div className="w-full">
            <h3 className="font-semibold text-gray-900 text-sm break-words whitespace-normal">
              {name}
            </h3>
            {description && <p className="text-gray-700 text-sm break-words whitespace-normal">
              {description && description.split(' ').length > 8 ? description.split(' ').slice(0, 8).join(' ') + '...' : description}
            </p>}
          </div>

        </div>

        <div className="flex flex-row">
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
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <FolderMenu
              onMove={() => {
                explorerStore.setIsEditing(false);
                explorerStore.addSelectedItem({ item, type });
                explorerStore.setOpenMoveModal(true);
              }}
              onDelete={() => {
                explorerStore.addSelectedItem({ item, type });
                explorerStore.setOpenDeleteModal(true);
              }}
              onEdit={() => {
                editorStore.setPost(item as Post);
                explorerStore.setIsEditing(true);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Explorer({ maxHeight }: { maxHeight?: string }) {
  const explorerHooks = hooks();
  const explorerStore = useExplorerStore();

  return (
    <div className="bg-white w-full my-2">
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex flex-row mb-4 space-x-2 align-center items-center">
          <span className="material-symbols-outlined">source</span>
          <h1 className="text-3xl tracking-tighter font-bold ">Explorer</h1>
        </div>
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
            <BreadcrumbNavigator
              route={explorerStore.route}
              onClickPart={explorerHooks.handleBreadcrumbClick}
            />
          </div>

          <div className="flex items-center justify-between w-full border-b-2 flex-wrap gap-4 border-gray-200 pb-4">
            <span className="flex flex-row items-center text-sm text-gray-500">
              {explorerStore.allItems.length} items | <span className="material-symbols-outlined ml-2 mr-1" style={{ fontSize: "18px" }}>folder</span>{explorerStore.folders.length} <span className="material-symbols-outlined ml-2 mr-1" style={{ fontSize: "18px" }}>article</span> {explorerStore.posts.length}
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

      {/* File List */}
      <div className="bg-white">
        {explorerStore.allItems.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {explorerStore.allItems.map(({ item, type }, index) => {
              return (
                <ExplorerItem
                  key={`${type}-${item.id}-${index}`}
                  item={item}
                  type={type}
                  onFolderClick={explorerHooks.handleFolderClick}
                  onPostClick={explorerHooks.handlePostClick}
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
