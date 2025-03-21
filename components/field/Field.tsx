import { useRef, useState } from "react";

import useStore from "@/store/useStore";

import PencilIcon from "@/components/icon/PencilIcon";
import ArrowIcon from "@/components/icon/ArrowIcon";

import Options from "@/components/options/Options";
import Rules from "@/components/rules/Rules";
import { Field as FieldType } from "@/types/types";

export default function Field({
  fieldData,
  fieldIndex,
}: {
  fieldData: FieldType;
  fieldIndex: number;
}) {
  const { data, setData } = useStore();
  const fieldNameInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const onEditField = async () => {
    await setIsEdit(true);
    fieldNameInputRef.current!.focus();
  };

  return (
    <div className="flex flex-col border-2 w-full p-2">
      <div className="flex items-center justify-between">
        <input
          ref={fieldNameInputRef}
          className="font-bold w-full"
          type="text"
          disabled={isEdit ? false : true}
          defaultValue={fieldData.field_name}
          onBlur={(e) => {
            const updatedData = [...data];
            updatedData[fieldIndex] = {
              ...updatedData[fieldIndex],
              field_name: e.target.value,
              field_key: e.target.value
                .toLocaleLowerCase()
                .replace(/\s+/g, "_"),
            };
            setData(updatedData);
            setIsEdit(false);
          }}
        />
        <div className="flex gap-x-3">
          <PencilIcon onClick={onEditField} />
          <ArrowIcon
            onClick={() => setIsOpen((prev) => !prev)}
            rotated={isOpen}
          />
        </div>
      </div>
      {isOpen && (
        <section className="mt-2 border-2 p-2">
          <Options options={fieldData.options} fieldIndex={fieldIndex} />
          <Rules rules={fieldData.rules} fieldIndex={fieldIndex} />
        </section>
      )}
    </div>
  );
}
