import type { ReactNode } from "react";

type EditorLayoutProps = {
  children: ReactNode;
};

export default function EditorLayout({ children }: EditorLayoutProps) {
  return (
    <div className="h-screen w-screen overflow-hidden">
      {children}
    </div>
  );
}