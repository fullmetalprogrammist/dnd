export async function getScreenplay() {
  const baseUrl = process.env.NODE_ENV === "production" 
    ? "https://indamovie.vercel.app/" 
    : "http://localhost:3000";
  
  try {
    const data = await fetch(`${baseUrl}/dnd/text.json`);
    const arr = await data.json();
    return arr;
  } catch {
    console.log(`Ошибка при fetch ${baseUrl}/dnd/text.json`);
    return {};
  }  
}