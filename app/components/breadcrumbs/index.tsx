import React from "react";
import { hooks } from "./hooks";

const BreadcrumbNavigator = ({
  route,
  onClickPart,
}: {
  route: string;
  onClickPart?: (index: number) => void;
}) => {
  const scrollContainerRef = hooks([route]);
  const pathParts = route?.split("/").filter((part) => part) || [];

  return (
    <div
      ref={scrollContainerRef}
      className="items-center px-2 py-1 text-xs bg-gray-100 rounded-xl"
      style={{
        scrollbarColor: "#cbd5e1 #f1f5f9",
      }}
    >
      <div className="text-sm text-gray-700 whitespace-nowrap scrollbar-thin scrollbar-thumb-slate-300 overflow-x-auto w-full">
        📁
        {pathParts.map((part, index) => (
          <span key={index}>
            {" "}
            <button
              onClick={() => onClickPart?.(index)}
              className="text-blue-600 hover:underline hover:text-blue-800 px-0.5"
              title={part}
            >
              {part}
            </button>
            {index < pathParts.length - 1 && "/"}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BreadcrumbNavigator;
