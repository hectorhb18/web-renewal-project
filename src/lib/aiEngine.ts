// ─── Studymind AI Engine — Gemini powered ─────────────────────────────────────

const API_BASE = typeof window !== 'undefined' ? `${window.location.origin}/api` : '/api';

export async function getAIResponse(
  userMessage: string,
  history: Array<{ role: 'user' | 'model'; text: string }> = []
): Promise<string> {
  let status = 0;
  try {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, history }),
    });
    status = res.status;

    if (!res.ok) {
      if (res.status === 429) {
        return '⏳ El asistente está ocupado por el momento (límite de solicitudes). Espera unos segundos e inténtalo de nuevo.';
      }
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { error?: string }).error ?? `HTTP ${res.status}`);
    }

    const data = await res.json() as { text: string };
    return data.text;
  } catch (err) {
    if (status === 429) {
      return '⏳ El asistente está ocupado por el momento (límite de solicitudes). Espera unos segundos e inténtalo de nuevo.';
    }
    console.error('[aiEngine] Error calling Gemini:', err);
    return '⚠️ No pude conectarme al asistente. Verifica tu conexión e inténtalo de nuevo.';
  }
}
