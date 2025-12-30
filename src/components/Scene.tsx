type SceneProps = {
  url: string;
  text: string;
}

export function Scene({ url, text }: SceneProps) {
  return (
    <div className="border-1 border-solid border-gray-600 rounded-md p-2 w-lg bg-neutral-50">
      <img className="w-full mb-3" src={url} />
      <p style={{ whiteSpace: 'pre-line' }}>{text}</p>
    </div>
  )
}