type EntityAddButtonProps = {
  addEntity: () => void;
}

export function AddEntityButton({ addEntity }: EntityAddButtonProps) {
  return <button 
    onClick={addEntity}
    className="bg-gray-400 py-1" 
  >
    Добавить
  </button>
}