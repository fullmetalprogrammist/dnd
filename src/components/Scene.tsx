type SceneProps = {
  url: string;
  lines: any[];
}

export function Scene({ url, lines }: SceneProps) {
  return (
    <div className="border-1 border-solid border-gray-600 rounded-md p-2 w-lg bg-neutral-50">
      <img className="w-full mb-3" src={url} />
      { lines.map(line => <div key={line.id}>- { line.text }</div>) }
    </div>
  )
}