import useStore from "@/store/useStore";
import { Option as OptionType } from "@/types/types";

export default function Options({
  options,
  fieldIndex,
}: {
  options: OptionType[];
  fieldIndex: number;
}) {
  const { data, setData } = useStore();

  return (
    <div>
      <div className="space-y-2">
        {options.map((option: OptionType, index: number) => (
          <div key={index + option.option_label}>
            <div className="flex justify-between items-center">
              <span className="mr-2">{index + 1}</span>
              <div className="flex w-full mr-3">
                <input
                  className="border-2 p-1 w-full mr-2"
                  type="text"
                  defaultValue={option.option_label}
                  onBlur={(e) => {
                    const newData = [...data];
                    const newOptions = [...newData[fieldIndex].options];
                    newOptions[index] = {
                      ...newOptions[index],
                      option_label: e.target.value,
                    };
                    newData[fieldIndex] = {
                      ...newData[fieldIndex],
                      options: newOptions,
                    };
                    setData(newData);
                  }}
                />
                <input
                  className="border-2 p-1 w-full"
                  type="text"
                  defaultValue={option.option_value}
                  onBlur={(e) => {
                    const newData = [...data];
                    const newOptions = [...newData[fieldIndex].options];
                    newOptions[index] = {
                      ...newOptions[index],
                      option_value: e.target.value,
                    };
                    newData[fieldIndex] = {
                      ...newData[fieldIndex],
                      options: newOptions,
                    };
                    setData(newData);
                  }}
                />
              </div>
              <button
                onClick={() => {
                  const newData = [...data];
                  const newOptions = [...newData[fieldIndex].options];
                  newOptions.splice(index, 1);
                  newData[fieldIndex] = {
                    ...newData[fieldIndex],
                    options: newOptions,
                  };
                  setData(newData);
                }}
                className="border-2 px-2 w-fit bg-red-700"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className="block border-2 p-1 w-fit ml-auto mt-4 bg-teal-700"
        onClick={() => {
          const newData = [...data];
          const newField = {
            option_label: `Option ${newData[fieldIndex].options.length + 1}`,
            option_value: `option_${newData[fieldIndex].options.length + 1}`,
          };
          newData[fieldIndex].options = [
            ...newData[fieldIndex].options,
            newField,
          ];
          setData(newData);
        }}
      >
        Add option
      </button>
    </div>
  );
}
