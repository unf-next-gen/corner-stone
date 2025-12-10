"use client";

import type { ChangePreviewProps } from "../types";

export function ChangePreview({
  oldData,
  newData,
  fields,
}: ChangePreviewProps) {
  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) return "—";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    return String(value);
  };

  const changedFields = fields.filter(
    (field) => oldData[field.key] !== newData[field.key]
  );

  if (changedFields.length === 0) {
    return (
      <div className="border rounded-lg p-4">
        <p className="text-gray-500 text-center">No changes detected</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold mb-4">Changes Preview</h3>
      <div className="flex flex-col gap-3">
        {changedFields.map((field, index) => {
          const oldValue = oldData[field.key];
          const newValue = newData[field.key];

          return (
            <div key={field.key}>
              <p className="font-medium text-sm mb-2">{field.label}</p>
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Old Value</p>
                  <p className="text-sm text-red-600 line-through">
                    {formatValue(oldValue)}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">New Value</p>
                  <p className="text-sm text-green-600 font-medium">
                    {formatValue(newValue)}
                  </p>
                </div>
              </div>
              {index < changedFields.length - 1 && (
                <hr className="mt-3 border-gray-200" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
