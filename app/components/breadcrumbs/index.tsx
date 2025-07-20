import React, { useRef } from 'react';

const BreadcrumbNavigator = ({ route }: { route: string }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const pathParts = route?.split('/').filter(part => part) || [];

  return (
    <div className="text-sm text-gray-500">
      <div className="flex items-center bg-gray-100 rounded overflow-hidden max-w-[400px]">
        <div
          ref={scrollContainerRef}
          className="flex items-center px-2 py-1 text-xs overflow-x-auto flex-1"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#cbd5e1 #f1f5f9'
          }}
        >
          <span className="flex-shrink-0">📁</span>
          <div className="flex items-center ml-1 whitespace-nowrap">
            {pathParts.map((part, index) => (
              <span key={index} className="flex items-center">
                <span 
                  className="hover:text-blue-600 hover:bg-blue-50 px-1 py-0.5 rounded cursor-pointer transition-colors"
                  title={part}
                >
                  {part}
                </span>
                {index < pathParts.length - 1 && (
                  <span className="mx-1 text-gray-400 flex-shrink-0">/</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbNavigator;