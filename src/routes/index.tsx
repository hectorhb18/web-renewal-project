import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import App from "@/App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StudyMind — Aprende con IA" },
      { name: "description", content: "Plataforma de aprendizaje con IA: cursos, práctica de matemáticas, recursos y asistente inteligente." },
      { property: "og:title", content: "StudyMind — Aprende con IA" },
      { property: "og:description", content: "Plataforma de aprendizaje con IA: cursos, práctica de matemáticas, recursos y asistente inteligente." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ClientOnly fallback={<div className="min-h-screen bg-white" />}>
      <App />
    </ClientOnly>
  );
}
