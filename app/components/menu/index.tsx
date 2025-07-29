"use client";
import { itemsService } from "@/app/services/item.service";
import { hooks } from "./hook";

export default function Explorer() {
  const useMenu = hooks();

  return (
    <div className="w-[400px] h-full overflow-y-auto bg-gray-100 border-gray-300 divide-y divide-gray-200">
      {useMenu.routes.map((item, index) => (
        <button
          key={index}
          className="gap-4 items-center flex flex-row hover:bg-gray-200 text-black px-4 py-2 w-full hover:cursor-pointer text-md"  
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{item.icon}</span>{item.name}
        </button>
      ))}
    </div>
  );
}
