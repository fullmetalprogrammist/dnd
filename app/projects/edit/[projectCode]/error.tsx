"use client";

export default function Error({ error, reset }: any) {
  return (
    <div>
      <h2>Ошибка</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Повторить</button>
    </div>
  );
}
