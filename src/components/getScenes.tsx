export async function getScenes() {
  const baseUrl = process.env.NODE_ENV === "production" 
    ? "https://indamovie.vercel.app/" 
    : "http://localhost:3000";
  
  try {
    const data = await fetch(`${baseUrl}/dnd/text.json`);
    const arr = await data.json();
    return arr;
  } catch {
    return [];
  }  
}