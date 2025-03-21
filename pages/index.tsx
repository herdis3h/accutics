import fs from "fs";
import path from "path";
import useStore from "@/store/useStore";
import OptionsContainer from "@/components/OptionsContainer";
import Sidebar from "@/components/Sidebar";
import { Field } from "@/types/types";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "public", "data.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const initialData = JSON.parse(jsonData);
  return {
    props: { initialData },
  };
}

export default function Home({ initialData }: { initialData: Field[] }) {
  const { data, setData } = useStore();

  if (data.length === 0) {
    setData(initialData);
  }

  return (
    <div className="flex justify-center items-center w-full h-fit  my-9">
      <div className="flex flex-col p-7 w-[1200px] h-fit justify-center border-2">
        <h1 className="mb-4">Accutics coding challenge:</h1>
        <div className="flex flex-row justify-between w-full gap-x-4">
          <OptionsContainer />
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
