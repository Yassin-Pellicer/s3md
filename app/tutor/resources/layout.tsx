import Editor from "@/app/components/editor";
import Explorer from "@/app/components/explorer";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex xl:flex-row flex-col justify-between w-full divide-x divide-gray-300">
      <div className="w-full xl:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        <Explorer />
      </div>
      <div className="w-full xl:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        {children}
      </div>
    </div>
  );
}
