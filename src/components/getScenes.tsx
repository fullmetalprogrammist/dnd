export async function getScenes() {
  const baseUrl = process.env.NODE_ENV === "production" 
    ? "https://ваш-домен.com" 
    : "http://localhost:3000";
  
  const data = await fetch(`${baseUrl}/dnd/text.json`);
  const arr = await data.json();

  return arr;
}