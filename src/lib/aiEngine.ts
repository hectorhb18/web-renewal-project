// ─── Studymind AI Engine — tutor con IA (con respaldo local) ───────────────

export async function getAIResponse(
  userMessage: string,
  history: Array<{ role: 'user' | 'model'; text: string }> = []
): Promise<string> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, history }),
    });

    if (res.status === 429) {
      return '⏳ Demasiadas consultas seguidas. Espera unos segundos y vuelve a intentarlo.';
    }
    if (res.status === 402) {
      return '💳 Se agotaron los créditos de IA del espacio de trabajo. Añádelos para seguir usando el asistente.';
    }

    if (res.ok) {
      const data = (await res.json()) as { text?: string };
      if (data.text && data.text.trim()) return data.text;
    }

    return generateLocalResponse(userMessage);
  } catch (err) {
    console.error('[aiEngine] Error:', err);
    try {
      return generateLocalResponse(userMessage);
    } catch {
      return '⚠️ Ocurrió un error al procesar tu pregunta. Inténtalo de nuevo.';
    }
  }
}


function generateLocalResponse(msg: string): string {
  const q = msg.toLowerCase().trim();

  // ─── Math: linear equations ──────────────────────────────────────────────
  const linearMatch = q.match(/(?:resuelve|resuelv[eo]|solve|calcula|hallar|encuentra)?\s*(?:la\s+)?(?:ecuaci[oó]n|equation)?.*?([+-]?\d*\.?\d*)x\s*([+-])\s*(\d*\.?\d*)\s*=\s*([+-]?\d*\.?\d*)/);
  if (linearMatch || (q.includes('ecuaci') && q.includes('x') && q.includes('='))) {
    return solveLinearEquation(msg);
  }

  // ─── Math: quadratic equations ───────────────────────────────────────────
  if ((q.includes('cuadr') || q.includes('cuadratic')) && q.includes('=')) {
    return solveQuadratic(msg);
  }

  // ─── Math: arithmetic ─────────────────────────────────────────────────────
  const arith = q.match(/(?:calcula|cu[aá]nto es|cu[aá]nto vale|solve|halla|r)?\s*\(?\s*(-?\d+\.?\d*)\s*\)?\s*([+\-*/x×÷])\s*\(?\s*(-?\d+\.?\d*)\s*\)?/);
  if (arith && (q.includes('calcula') || q.includes('cuanto') || q.includes('cuánto') || q.includes('solve') || q.includes('halla') || arith[2] === 'x' || arith[2] === '×' || arith[2] === '÷')) {
    return solveArithmetic(parseFloat(arith[1]), arith[2], parseFloat(arith[3]));
  }

  // ─── Physics: Newton's laws ───────────────────────────────────────────────
  if (q.includes('newton') || q.includes('ley') && q.includes('newton')) {
    return `**Las 3 Leyes de Newton:**

**1ª Ley (Inercia):** Todo cuerpo permanece en reposo o MRU a menos que una fuerza neta actúe sobre él.
> Ejemplo: Un libro sobre la mesa no se mueve porque las fuerzas están equilibradas.

**2ª Ley (F = m·a):** La aceleración de un cuerpo es proporcional a la fuerza neta e inversamente proporcional a su masa.
> F = m × a → Si aplicas 10 N a 2 kg, la aceleración es 5 m/s².

**3ª Ley (Acción-Reacción):** A toda acción corresponde una reacción igual y opuesta.
> Ejemplo: Al caminar empujas el suelo hacia atrás y el suelo te impulsa hacia adelante.

¿Quieres que resolvamos un problema aplicando alguna de estas leyes?`;
  }

  // ─── Physics: gravity, force ──────────────────────────────────────────────
  if (q.includes('graved') || q.includes('gravity') || q.includes('caída libre') || q.includes('caida libre')) {
    return `**Gravedad y Caída Libre**

La gravedad es la fuerza que atrae los cuerpos hacia el centro de la Tierra. En la superficie terrestre:
> **g ≈ 9.8 m/s²**

**Fórmulas clave (caída libre):**
- v = g·t (velocidad en el tiempo t)
- h = ½·g·t² (altura caída)
- v² = 2·g·h (velocidad final desde altura h)

**Ejemplo:** Si un objeto cae durante 3 s:
- v = 9.8 × 3 = **29.4 m/s**
- h = ½ × 9.8 × 9 = **44.1 m**

¿Quieres practicar con un problema de caída libre?`;
  }

  // ─── Chemistry: mole ──────────────────────────────────────────────────────
  if (q.includes('mol') && (q.includes('quim') || q.includes('quím') || q.includes('mole') || q.includes('que es') || q.includes('qué es'))) {
    return `**El Mol en Química**

Un **mol** es la cantidad de sustancia que contiene **6.022 × 10²³** partículas (átomos, moléculas, iones). Este número se llama **Número de Avogadro**.

**Fórmulas clave:**
- n = m / M (moles = masa / masa molar)
- N = n × Nₐ (partículas = moles × Avogadro)

**Ejemplo:** ¿Cuántos moles hay en 36 g de agua (H₂O)?
- Masa molar del H₂O = 18 g/mol
- n = 36 / 18 = **2 moles**
- Partículas = 2 × 6.022×10²³ = **1.2044 × 10²⁴ moléculas**

¿Quieres resolver un ejercicio de moles paso a paso?`;
  }

  // ─── Chemistry: periodic table ─────────────────────────────────────────────
  if (q.includes('tabla periódica') || q.includes('periodica') || q.includes('periódica') || q.includes('periodic table')) {
    return `**La Tabla Periódica**

Organiza los elementos químicos por su **número atómico** (Z) y propiedades. Principales grupos:

- **Grupo 1:** Metales alcalinos (Li, Na, K) — muy reactivos
- **Grupo 2:** Alcalinotérreos (Mg, Ca, Ba)
- **Grupos 3-12:** Metales de transición (Fe, Cu, Zn)
- **Grupo 17:** Halógenos (F, Cl, Br) — reactivos no metales
- **Grupo 18:** Gases nobles (He, Ne, Ar) — inertes

**Períodos:** filas horizontales (1-7). Indican niveles de energía.
**Grupos:** columnas verticales. Elementos del mismo grupo tienen propiedades similares.

¿Quieres saber sobre un elemento o grupo específico?`;
  }

  // ─── History: Peru independence ───────────────────────────────────────────
  if (q.includes('independencia') && q.includes('peru') || q.includes('independencia del perú') || q.includes('independencia del peru')) {
    return `**Independencia del Perú**

La independencia del Perú se proclamó el **28 de julio de 1821** por **José de San Martín** en la Plaza Mayor de Lima.

**Hechos clave:**
- **1820:** San Martín desembarca en Paracas (septiembre)
- **1821, 28 de julio:** Declaración de independencia
- **1824:** Batalla de Ayacucho (9 de diciembre) — Sucre derrota al ejército español, consolidando la independencia

**Protagonistas:** San Martín, Simón Bolívar, Antonio José de Sucre, y la participación del pueblo peruano.

¿Quieres que te explique la campaña de San Martín o la batalla de Ayacucho?`;
  }

  // ─── History: general ─────────────────────────────────────────────────────
  if (q.includes('historia') || q.includes('historia del peru') || q.includes('historia universal') || q.includes('inc') && q.includes('imperio')) {
    return `**Historia del Perú — Línea de tiempo**

- **1200-1532:** Imperio Inca (Cusco → Tahuantinsuyo)
- **1532:** Llegada de Pizarro y conquista española
- **1535:** Fundación de Lima
- **1780:** Rebelión de Túpac Amaru II
- **1821:** Independencia declarada por San Martín
- **1824:** Batalla de Ayacucho — independencia consolidada
- **1879-1883:** Guerra del Pacífico
- **1980-2000:** Conflicto interno (época del terrorismo)

¿Sobre qué período quieres profundizar?`;
  }

  // ─── English: Present Perfect ─────────────────────────────────────────────
  if (q.includes('present perfect') || q.includes('presente perfecto')) {
    return `**Present Perfect Tense**

Used for actions that started in the past and continue, or past actions with a result now.

**Structure:** Subject + have/has + past participle

**Examples:**
- I **have studied** English for 3 years.
- She **has visited** Paris twice.
- They **have finished** their homework.

**Signal words:** ever, never, already, yet, just, since, for

**Tip:** Use *has* for he/she/it, *have* for I/you/we/they.

Do you want to practice with some exercises?`;
  }

  // ─── English: general grammar ─────────────────────────────────────────────
  if (q.includes('english') || q.includes('ingl') || q.includes('grammar') || q.includes('gramática') || q.includes('past tense') || q.includes('pasado')) {
    return `**English Grammar Basics**

**Verb Tenses:**
- **Present Simple:** I play / She plays (habits, facts)
- **Present Continuous:** I am playing (now)
- **Past Simple:** I played (finished past)
- **Past Continuous:** I was playing (past ongoing)
- **Present Perfect:** I have played (past → now)
- **Future (will):** I will play (predictions, promises)

**Key Rules:**
- Third person singular adds **-s**: *she runs*
- Regular past tense adds **-ed**: *worked, played*
- Irregular verbs must be memorized: *go→went, see→saw, eat→ate*

Which topic would you like to practice?`;
  }

  // ─── Communication: text types ───────────────────────────────────────────
  if (q.includes('tipos de texto') || q.includes('texto') && (q.includes('comunicaci') || q.includes('tipo'))) {
    return `**Tipos de Texto (Comunicación)**

- **Narrativo:** Cuenta una historia (cuentos, novelas, mitos)
- **Descriptivo:** Describe personas, lugares u objetos
- **Expositivo:** Explica información de forma objetiva (artículos, ensayos)
- **Argumentativo:** Defiende una opinión con razones (debates, editoriales)
- **Instructivo:** Indica pasos o procedimientos (recetas, manuales)
- **Conversacional:** Diálogos (entrevistas, obras de teatro)

**Elementos:** Todo texto tiene: emisor, receptor, mensaje, canal, código y contexto.

¿Quieres que analicemos un tipo de texto específico?`;
  }

  // ─── Math: general help ───────────────────────────────────────────────────
  if (q.includes('matem') || q.includes('math') || q.includes('algebra') || q.includes('álgebra') || q.includes('geometr') || q.includes('calcul') || q.includes('cálcul')) {
    return `**Matemáticas — ¿En qué te ayudo?**

Puedo resolver y explicar:

- **Álgebra:** Ecuaciones lineales (ej: "resuelve 2x + 3 = 11"), cuadráticas
- **Aritmética:** Operaciones (ej: "calcula 15 × 24")
- **Geometría:** Áreas, perímetros, teorema de Pitágoras
- **Cálculo:** Derivadas básicas, límites

**Escríbeme tu problema**, por ejemplo:
> "Resuelve 3x - 7 = 14"
> "Calcula 45 + 38"
> "¿Cuánto vale el área de un círculo de radio 5?"

¿Qué problema quieres resolver?`;
  }

  // ─── Geometry: circle area ────────────────────────────────────────────────
  const circleMatch = q.match(/(?:[aá]rea|area|perim|perímet).*(?:c[ií]rculo|circulo|circle).*(?:radio|radius|r\s*=)\s*(\d+\.?\d*)/);
  if (circleMatch || (q.includes('circulo') && q.includes('radio'))) {
    const rMatch = q.match(/radio\s*(?:de\s*)?(?:es\s*)?(\d+\.?\d*)/) || q.match(/r\s*=\s*(\d+\.?\d*)/);
    if (rMatch) {
      const r = parseFloat(rMatch[1]);
      const area = Math.PI * r * r;
      const perim = 2 * Math.PI * r;
      return `**Círculo de radio ${r}**

- **Área** = π × r² = π × ${r}² = **${area.toFixed(2)}**
- **Perímetro** = 2 × π × r = 2 × π × ${r} = **${perim.toFixed(2)}**

¿Necesitas ayuda con otra figura geométrica?`;
    }
  }

  // ─── Pythagoras ───────────────────────────────────────────────────────────
  if (q.includes('pitag') || q.includes('pythag') || (q.includes('triangulo') && q.includes('rectang'))) {
    return `**Teorema de Pitágoras**

En un triángulo rectángulo: **a² + b² = c²**
donde *c* es la hipotenusa y *a*, *b* son los catetos.

**Ejemplo:** Si a = 3 y b = 4:
> c² = 3² + 4² = 9 + 16 = 25
> c = √25 = **5**

**Aplicación:** Calcular distancias, alturas, diagonales.

¿Quieres resolver un problema con el teorema de Pitágoras?`;
  }

  // ─── Greetings ────────────────────────────────────────────────────────────
  if (/^(hola|hi|hello|hey|buenas|que tal|qu[eé] tal)/.test(q)) {
    return `¡Hola! Soy tu tutor de Studymind. Puedo ayudarte con:

- **Matemáticas** (álgebra, geometría, cálculo)
- **Física** (fuerzas, energía, movimiento)
- **Química** (moles, tabla periódica, reacciones)
- **Historia** (del Perú y universal)
- **Comunicación** (tipos de texto, gramática)
- **Inglés** (gramática, vocabulario)

¿Qué tema quieres repasar hoy?`;
  }

  // ─── Default fallback ─────────────────────────────────────────────────────
  return `Puedo ayudarte con **Matemáticas, Física, Química, Historia, Comunicación e Inglés**.

Prueba preguntando algo como:
- "Resuelve 2x + 5 = 13"
- "Explícame la 2ª Ley de Newton"
- "¿Qué es la mole en química?"
- "¿Cuándo fue la Independencia del Perú?"
- "How do I use Present Perfect?"

¿Qué tema te gustaría repasar?`;
}

// ─── Math solvers ───────────────────────────────────────────────────────────

function solveLinearEquation(input: string): string {
  const m = input.match(/([+-]?\d*\.?\d*)x\s*([+-])\s*(\d*\.?\d*)\s*=\s*([+-]?\d*\.?\d*)/);
  if (!m) return 'No pude identificar la ecuación. Escribe algo como: 2x + 3 = 11';

  const a = m[1] === '' || m[1] === '+' ? 1 : m[1] === '-' ? -1 : parseFloat(m[1]);
  const sign = m[2] === '-' ? -1 : 1;
  const b = sign * (parseFloat(m[3]) || 0);
  const c = parseFloat(m[4]);

  const x = (c - b) / a;

  return `**Ecuación:** ${a}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)} = ${c}

**Paso 1:** Aislar el término con x
> ${a}x = ${c} ${b >= 0 ? '-' : '+'} ${Math.abs(b)}
> ${a}x = ${c - b}

**Paso 2:** Despejar x
> x = ${c - b} / ${a}
> x = **${x}**

**Comprobación:** ${a}(${x}) ${b >= 0 ? '+' : '-'} ${Math.abs(b)} = ${a * x + b} ✓

¿Quieres resolver otra ecuación?`;
}

function solveQuadratic(input: string): string {
  const m = input.match(/([+-]?\d*\.?\d*)x\s*2|x²|x\^2.*?([+-])\s*(\d*\.?\d*)x\s*([+-])\s*(\d*\.?\d*)\s*=\s*0/);
  const m2 = input.match(/([+-]?\d*\.?\d*)x²\s*([+-])\s*(\d*\.?\d*)x\s*([+-])\s*(\d*\.?\d*)\s*=\s*0/);
  const m3 = input.match(/(-?\d+)\s*x\s*\^\s*2\s*([+-])\s*(\d+)\s*x\s*([+-])\s*(\d+)\s*=\s*0/);

  let a = 1, b = 0, c = 0;
  if (m3) {
    a = parseFloat(m3[1]);
    b = m3[2] === '-' ? -parseFloat(m3[3]) : parseFloat(m3[3]);
    c = m3[4] === '-' ? -parseFloat(m3[5]) : parseFloat(m3[5]);
  } else if (m2) {
    a = parseFloat(m2[1]) || 1;
    b = m2[2] === '-' ? -parseFloat(m2[3]) : parseFloat(m2[3]);
    c = m2[4] === '-' ? -parseFloat(m2[5]) : parseFloat(m2[5]);
  } else {
    return `Para ecuaciones cuadráticas, escribe algo como: x² - 5x + 6 = 0

Uso la **fórmula general:**
> x = (-b ± √(b² - 4ac)) / 2a

¿Quieres intentar con un ejemplo?`;
  }

  const disc = b * b - 4 * a * c;

  let result = `**Ecuación:** ${a}x² ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x ${c >= 0 ? '+' : '-'} ${Math.abs(c)} = 0\n\n`;
  result += `**Fórmula general:** x = (-b ± √(b² - 4ac)) / 2a\n\n`;
  result += `**Discriminante:** b² - 4ac = ${b}² - 4(${a})(${c}) = **${disc}**\n\n`;

  if (disc < 0) {
    result += `Como el discriminante es **negativo**, no hay soluciones reales.\n\n`;
    result += `Las soluciones son **complejas (imaginarias)**.`;
  } else if (disc === 0) {
    const x = -b / (2 * a);
    result += `Hay **una solución real** (raíz doble):\n> x = **${x}**`;
  } else {
    const sqrtD = Math.sqrt(disc);
    const x1 = (-b + sqrtD) / (2 * a);
    const x2 = (-b - sqrtD) / (2 * a);
    result += `**Soluciones:**\n> x₁ = ${x1.toFixed(4)}\n> x₂ = ${x2.toFixed(4)}`;
  }

  result += '\n\n¿Quieres resolver otra ecuación?';
  return result;
}

function solveArithmetic(a: number, op: string, b: number): string {
  let result: number;
  let opSym: string;
  switch (op) {
    case '+': result = a + b; opSym = '+'; break;
    case '-': result = a - b; opSym = '-'; break;
    case '*': case 'x': case '×': result = a * b; opSym = '×'; break;
    case '/': case '÷':
      if (b === 0) return `**No se puede dividir entre 0.**\n\nLa división por cero no está definida en matemáticas.`;
      result = a / b; opSym = '÷'; break;
    default: return 'No pude identificar la operación.';
  }
  return `**${a} ${opSym} ${b} = ${result}**

¿Necesitas otra operación?`;
}
