import Blog from "@/app/components/blog/menus";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex xl:flex-row flex-col justify-between w-full divide-x divide-gray-300">
      <div className="w-full xl:overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        <Blog />
      </div>
      <div className="w-full xl:overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        {children}
      </div>
    </div>
  );
}
