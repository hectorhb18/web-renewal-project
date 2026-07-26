import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `Eres un tutor educativo de Studymind, una plataforma de aprendizaje para estudiantes peruanos de secundaria y nivel preuniversitario.

Tu rol es explicar conceptos de forma clara, didáctica y motivadora en español. Ayudas con: Matemáticas (álgebra, geometría, cálculo), Física, Química, Historia del Perú y Universal, Comunicación e Inglés.

Reglas:
- Responde siempre en español (excepto si te preguntan algo en inglés sobre inglés)
- Sé conciso pero completo — máximo 4 párrafos por respuesta
- Usa **negrita** para términos clave
- Usa ejemplos numéricos concretos cuando expliques matemática o física
- Si hay una fórmula, escríbela claramente
- Termina con una frase motivadora o una pregunta de seguimiento breve
- No respondas sobre temas fuera del ámbito educativo`;

type HistoryItem = { role: "user" | "model"; text: string };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => ({}))) as {
          message?: string;
          history?: HistoryItem[];
        };

        const message = body.message?.trim();
        if (!message) {
          return Response.json({ error: "message is required" }, { status: 400 });
        }

        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) {
          return Response.json({ error: "AI service not configured" }, { status: 503 });
        }

        const history = Array.isArray(body.history) ? body.history.slice(-20) : [];

        const messages = [
          { role: "system", content: SYSTEM_PROMPT },
          ...history.map((m) => ({
            role: m.role === "model" ? "assistant" : "user",
            content: m.text,
          })),
          { role: "user", content: message },
        ];

        try {
          const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Lovable-API-Key": apiKey,
            },
            body: JSON.stringify({ model: "google/gemini-3.1-flash-lite", messages }),
          });

          if (res.status === 429) {
            return Response.json({ error: "quota_exceeded" }, { status: 429 });
          }
          if (res.status === 402) {
            return Response.json({ error: "credits_exhausted" }, { status: 402 });
          }
          if (!res.ok) {
            const detail = await res.text();
            console.error("[api/chat] gateway error", res.status, detail);
            return Response.json({ error: `gateway_error_${res.status}` }, { status: 500 });
          }

          const data = (await res.json()) as {
            choices?: Array<{ message?: { content?: string } }>;
          };
          const text = data.choices?.[0]?.message?.content ?? "";
          if (!text) {
            return Response.json({ error: "empty_response" }, { status: 500 });
          }
          return Response.json({ text });
        } catch (err) {
          console.error("[api/chat]", err);
          return Response.json({ error: "internal_error" }, { status: 500 });
        }
      },
    },
  },
});
