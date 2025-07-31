import Editor from "./components/editor";
import Explorer from "./components/explorer";

export default function Home() {
  return (
    <div className="mx-auto my-12 px-8">
      <Editor />
      <Explorer />
    </div>
  );
}
