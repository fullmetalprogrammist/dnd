import { SourceTypes } from "../types";

type SourceSwitcherProps = {
  currentMode: SourceTypes;
  allModes: readonly SourceTypes[];
  onChange: (mode: SourceTypes) => void;
};

export function SourceSwitcher({currentMode, allModes, onChange}: SourceSwitcherProps) {
  return (
    <div className="flex gap-2 border-b p-2">
      {allModes.map(mode => (
        <button
          key={mode}
          onClick={() => onChange(mode)}
          className={
            mode === currentMode
              ? "font-bold underline"
              : "opacity-60"
          }
        >
          {mode}
        </button>
      ))}
    </div>
  );
}