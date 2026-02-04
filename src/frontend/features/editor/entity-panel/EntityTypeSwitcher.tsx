import { EntityTypes } from "./types/EntityTypes";

type SourceSwitcherProps = {
  currentMode: EntityTypes;
  allModes: readonly EntityTypes[];
  onChange: (mode: EntityTypes) => void;
};

export function EntityTypeSwitcher({currentMode, allModes, onChange}: SourceSwitcherProps) {
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