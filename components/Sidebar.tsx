import { useRef } from "react";
import useStore from "@/store/useStore";

export default function Sidebar({}) {
  const { data, setData } = useStore();
  const fieldNameInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col border-2 p-2 gap-y-2">
      <h2>Sidebar:</h2>
      <input
        ref={fieldNameInputRef}
        className="border-1 p-2"
        type="text"
        placeholder="Enter field name"
      />
      <button
        onClick={() => {
          const inputValue = fieldNameInputRef.current?.value;
          if (inputValue && inputValue.trim().length > 0) {
            // Add _ to field key if space is within field name
            const newField = {
              field_key: `${inputValue.trim().replace(/\s+/g, "_")}`,
              field_name: inputValue.trim(),
              options: [],
              rules: [],
            };
            setData([...data, newField]);
            fieldNameInputRef.current!.value = "";
          }
        }}
        className="border-2 p-1 w-fit ml-auto"
      >
        Add field
      </button>
    </div>
  );
}
