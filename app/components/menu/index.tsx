"use client";
import { itemsService } from "@/app/services/item.service";
import { hooks } from "./hook";

export default function Explorer() {
  const useMenu = hooks();

  return (
    <div className="xl:max-w-[300px] w-full xl:h-full h-fit bg-gray-100 divide-y divide-gray-200 border-r border-gray-200">
      <div className="flex flex-row justify-between px-4 py-4 shadow-sm w-full">
        <div className="flex flex-row gap-4 items-center">
          <div className="flex justify-center items-center bg-gray-300 rounded-full shrink-0 w-10 h-10">
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>person</span>
          </div>
          <div>
            <p className="text-md font-bold">Yassin</p>
            <p className="text-sm text-gray-500">Pellicer</p>
          </div>
        </div>
        <div className="flex justify-center items-center p-2 shrink-0">
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>notifications</span>
        </div>
      </div>
      {useMenu.routes.map((item, index) => (
        <button
          key={index}
          className="gap-4 items-center xl:flex flex-row hover:bg-gray-200 text-black px-4 py-2 w-full hover:cursor-pointer text-sm hidden"
          onClick={() => { useMenu.handleRouteChange(item.route) }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{item.icon}</span>{item.name}
        </button>
      ))}
    </div>
  );
}
