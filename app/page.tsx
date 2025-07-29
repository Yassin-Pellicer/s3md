import Editor from "./components/editor";
import Explorer from "./components/explorer";

export default function Home() {
  return (
    <div className="mx-auto my-10">
      <div className="flex flex-row align-center gap-4 items-center mb-6">
        <p
          className="material-icons"
          style={{ fontSize: '40px' }}
        >
          edit
        </p>
        <h1 className="lg:text-5xl text-4xl  tracking-tighter font-bold underline">Create your post</h1>
      </div>
      <Editor />
      <Explorer />
    </div>
  );
}
