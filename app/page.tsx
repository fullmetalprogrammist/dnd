import { getScreenplay } from "@/src/components/getScreenplay";
import { Screenplay } from "@/src/components/Screenplay";

export default async function Home() {
  const { scenes, lines } = await getScreenplay();

  return (
    <div>
      <Screenplay scenes={scenes} lines={lines} />
    </div>
  );
}
