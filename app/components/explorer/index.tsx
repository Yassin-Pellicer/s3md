"use client";
import { hooks } from "./hook";
import { useExplorerStore } from "@/app/contexts/explorer.store";
import { Post } from "../../types/Post";
import { Folder } from "../../types/Folder";

// Helper function for date formatting
const formatDate = (date: Date | undefined | null): string => {
  if (!date) return 'No date';
  try {
    return new Date(date).toLocaleDateString();
  } catch (error) {
    return 'Invalid date';
  }
};

// Folder Icon Component
const FolderIcon = () => (
  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
  </svg>
);

// File/Post Icon Component
const FileIcon = () => (
  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
  </svg>
);

// Combined Item Component
const ExplorerItem = ({ 
  item, 
  type, 
  onFolderClick 
}: { 
  item: Post | Folder; 
  type: 'post' | 'folder';
  onFolderClick?: (folderName: string) => void;
}) => {
  const isFolder = type === 'folder';
  const name = isFolder ? (item as Folder).name : (item as Post).title;
  const description = isFolder ? '' : (item as Post).description;

  const handleClick = () => {
    if (isFolder && onFolderClick) {
      onFolderClick((item as Folder).name?? '');
    }
  };

  return (
    <div 
      className="flex items-center px-3 py-1 hover:bg-blue-50 cursor-pointer group transition-colors duration-150"
      onClick={handleClick}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mr-3">
        {isFolder ? <FolderIcon /> : <FileIcon />}
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
    </div>
  );
};

export default function Explorer() {
  const explorerHooks = hooks();
  const explorerStore = useExplorerStore();

  // Handle folder navigation
  const handleFolderClick = (folderName: string) => {
    const newRoute = explorerStore.route ? `${explorerStore.route}/${folderName}` : folderName;
    console.log('Navigating to route:', `${explorerStore.route}/${folderName}`);
    explorerHooks.fetchContent(newRoute);
  };

  // Handle back navigation
  const handleBackClick = () => {
    if (explorerStore.route) {
      const pathParts = explorerStore.route.split('/');
      pathParts.pop(); // Remove last part
      const parentRoute = pathParts.join('/');
      explorerHooks.fetchContent(parentRoute || 'AdministradorUsuario'); // Fallback to root
    }
  };

  // Combine and sort items
  const allItems = [
    ...explorerStore.folders.map(folder => ({ item: folder, type: 'folder' as const })),
    ...explorerStore.posts.map(post => ({ item: post, type: 'post' as const }))
  ].sort((a, b) => {
    // Folders first, then by name
    if (a.type === 'folder' && b.type === 'post') return -1;
    if (a.type === 'post' && b.type === 'folder') return 1;
    
    const nameA = a.type === 'folder' ? (a.item as Folder).name : (a.item as Post).title;
    const nameB = b.type === 'folder' ? (b.item as Folder).name : (b.item as Post).title;
    
    // Handle undefined names
    if (!nameA && !nameB) return 0;
    if (!nameA) return 1;
    if (!nameB) return -1;
    
    return nameA.localeCompare(nameB);
  });

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white min-h-screen">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {explorerStore.route && explorerStore.route !== 'AdminstradorUsuario' && (
              <button 
                onClick={handleBackClick}
                className="text-blue-500 hover:text-blue-700 transition-colors"
                title="Go back"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            )}
            <h1 className="text-lg font-semibold text-gray-900">Explorer</h1>
          </div>
          <div className="text-sm text-gray-500">
            {explorerStore.route && (
              <div className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs">
                <span>📁</span>
                <span className="ml-1">
                  {explorerStore.route.split('/').map((part, index, array) => (
                    <span key={index}>
                      {part}
                      {index < array.length - 1 && <span className="mx-1 text-gray-400">/</span>}
                    </span>
                  ))}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            {allItems.length} items
          </span>
          <button 
            onClick={() => explorerHooks.fetchContent(explorerStore.route || "AdminstradorUsuario")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* List Header */}
      {allItems.length > 0 && (
        <div className="flex items-center px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
          <div className="flex-1 flex items-center">
            <div className="w-7"></div> {/* Icon space */}
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
        {allItems.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {allItems.map(({ item, type }) => (
              <ExplorerItem 
                key={`${type}-${item.id}`} 
                item={item} 
                type={type}
                onFolderClick={handleFolderClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
            </div>
            <p className="text-lg font-medium text-gray-900 mb-2">No items found</p>
            <p className="text-gray-500 mb-4">This folder appears to be empty</p>
            <button 
              onClick={() => explorerHooks.fetchContent(explorerStore.route || "AdminstradorUsuario")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            >
              Load Content
            </button>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-4">
          <span>{explorerStore.folders.length} folders</span>
          <span>{explorerStore.posts.length} files</span>
        </div>
        <div>
          {explorerStore.route && `Route: ${explorerStore.route}`}
        </div>
      </div>
    </div>
  );
}