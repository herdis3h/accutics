import { useMemo } from "react";
import useStore from "@/store/useStore";
import { Field as FieldType, Rule as ruleType } from "@/types/types";

export default function Rules({
  rules,
  fieldIndex,
}: {
  rules: any;
  fieldIndex: number;
}) {
  const { data, setData } = useStore();

  const availablefieldKeys = useMemo(
    () => data.map((field: FieldType) => field.field_key),
    [data]
  );

  const onSelectChange = (targetRule: ruleType, newKey: string) => {
    const updatedData = [...data];

    const updateRuleTree = (rules: ruleType[]): ruleType[] =>
      rules.map((rule) =>
        rule === targetRule
          ? { ...rule, rule_field_key: newKey }
          : { ...rule, children: updateRuleTree(rule.children) }
      );

    updatedData[fieldIndex].rules = updateRuleTree(
      updatedData[fieldIndex].rules
    );
    setData(updatedData);
  };

  const onRuleValueChange = (targetRule: ruleType, newValue: string) => {
    const updatedData = [...data];

    const updateRuleTree = (rules: ruleType[]): ruleType[] =>
      rules.map((rule) =>
        rule === targetRule
          ? { ...rule, rule_value: newValue }
          : { ...rule, children: updateRuleTree(rule.children) }
      );

    updatedData[fieldIndex].rules = updateRuleTree(
      updatedData[fieldIndex].rules
    );
    setData(updatedData);
  };

  const onAddChildRule = (targetRule: ruleType) => {
    const updatedData = [...data];

    const updateRuleTree = (rules: ruleType[]): ruleType[] => {
      return rules.map((rule) => {
        if (rule === targetRule) {
          return {
            ...rule,
            children: [
              ...rule.children,
              {
                rule_field_key: "",
                rule_value: "",
                children: [],
              },
            ],
          };
        }

        return {
          ...rule,
          children: updateRuleTree(rule.children),
        };
      });
    };

    updatedData[fieldIndex].rules = updateRuleTree(
      updatedData[fieldIndex].rules
    );
    setData(updatedData);
  };

  const onAddRule = () => {
    const updatedData = [...data];

    updatedData[fieldIndex] = {
      ...updatedData[fieldIndex],
      rules: [
        ...(updatedData[fieldIndex].rules || []),
        {
          rule_field_key: "",
          rule_value: "",
          children: [],
        },
      ],
    };

    setData(updatedData);
  };

  const renderRules = (rules: ruleType[], level = 0) => {
    return rules.map((fieldRule: ruleType, i: number) => (
      <div key={`${level}-${i}`} className="ml-[10px] border-l pl-3">
        <section className="flex gap-x-2 border-2 p-3">
          <select
            className="border-2"
            value={fieldRule.rule_field_key}
            onChange={(e) => onSelectChange(fieldRule, e.target.value)}
          >
            {availablefieldKeys.map((key: string) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>

          <input
            key={fieldRule.rule_value + i}
            className="border-2"
            type="text"
            defaultValue={fieldRule.rule_value}
            onBlur={(e) => onRuleValueChange(fieldRule, e.target.value)}
          />
          <button
            className="border-2 w-fit px-2 ml-auto bg-green-700"
            onClick={() => onAddChildRule(fieldRule)}
          >
            Add group
          </button>
        </section>

        {/* Check if there are more nested rules, call again */}
        {fieldRule.children.length > 0 && (
          <div className="ml-5 border-l-2 pl-3">
            {renderRules(fieldRule.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-y-2">
      <p className="font-bold w-full">Rules:</p>
      <div className="flex flex-col gap-y-4">{renderRules(rules)}</div>
      <button
        className="border-2 w-fit px-2 ml-auto bg-purple-600"
        onClick={onAddRule}
      >
        Add rules
      </button>
    </div>
  );
}
