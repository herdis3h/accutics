import useStore from "@/store/useStore";
import Field from "@/components/field/Field";
import { Field as FieldType } from "@/types/types";

export default function OptionsContainer() {
  const { data } = useStore();

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-1">
        {data.map((field: FieldType, index: number) => (
          <Field key={index} fieldData={field} fieldIndex={index} />
        ))}
      </div>
    </div>
  );
}
