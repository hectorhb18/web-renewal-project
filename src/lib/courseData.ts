// ─── Studymind Course Data ────────────────────────────────────────────────────

export interface Exercise {
  question: string;
  options: string[];
  correct: number; // index
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string; // markdown-like rich text
  exercises: Exercise[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  modules: Module[];
}

// ─── Matemáticas ──────────────────────────────────────────────────────────────
const matematicas: Course = {
  id: 'matematicas',
  title: 'Matemáticas',
  description: 'Álgebra, Geometría y Cálculo diferencial para nivel universitario.',
  icon: '∫',
  color: 'from-primary-500 to-primary-700',
  bgColor: 'bg-primary-50',
  modules: [
    {
      id: 'mat-m1',
      title: 'Módulo 1: Álgebra',
      lessons: [
        {
          id: 'mat-1-1',
          title: 'Expresiones Algebraicas',
          duration: '12 min',
          content: `## Expresiones Algebraicas

Una **expresión algebraica** combina números, variables y operaciones matemáticas.

### Componentes
- **Variable**: letra que representa un valor desconocido (x, y, z)
- **Coeficiente**: número que multiplica a la variable (en 3x, el coeficiente es 3)
- **Término independiente**: número sin variable (en 2x + 5, el 5 es el término independiente)

### Tipos de expresiones
| Tipo | Ejemplo |
|------|---------|
| Monomio | 4x² |
| Binomio | 3x + 2 |
| Trinomio | x² + 5x - 6 |
| Polinomio | x³ + 2x² - x + 1 |

### Operaciones básicas
**Suma de monomios semejantes** (misma variable y grado):
> 3x + 5x = 8x
> 4y² + 2y² = 6y²

**Multiplicación** (suma de exponentes):
> x³ · x² = x⁵
> (2x)(3x²) = 6x³

### Productos notables memoriza estos:
- **(a + b)² = a² + 2ab + b²**
- **(a - b)² = a² - 2ab + b²**
- **(a + b)(a - b) = a² - b²**`,
          exercises: [
            {
              question: '¿Cuál es el resultado de (3x + 2)²?',
              options: ['9x² + 4', '9x² + 6x + 4', '9x² + 12x + 4', '6x² + 12x + 4'],
              correct: 2,
              explanation: 'Usando (a+b)² = a² + 2ab + b²: (3x)² + 2(3x)(2) + 2² = 9x² + 12x + 4',
            },
            {
              question: '¿Cuánto es 5x² + 3x² - 2x²?',
              options: ['6x²', '10x²', '8x⁶', '6x⁶'],
              correct: 0,
              explanation: 'Se suman/restan solo los monomios semejantes: 5 + 3 - 2 = 6, entonces 6x²',
            },
            {
              question: '¿Cuál es el coeficiente de x en la expresión 7x³ - 4x + 9?',
              options: ['7', '9', '-4', '3'],
              correct: 2,
              explanation: 'El término con x (sin exponente mayor) es -4x, cuyo coeficiente es -4',
            },
          ],
        },
        {
          id: 'mat-1-2',
          title: 'Ecuaciones Lineales',
          duration: '15 min',
          content: `## Ecuaciones Lineales

Una **ecuación lineal** tiene la forma ax + b = c, donde la variable tiene grado 1.

### Principio de equivalencia
Podemos realizar la **misma operación en ambos lados** sin alterar la solución:
- Sumar/restar el mismo número
- Multiplicar/dividir por el mismo número ≠ 0

### Método de resolución paso a paso
**Ejemplo**: Resolver 3x - 7 = 2x + 5

1. Agrupar variables a la izquierda: 3x - 2x = 5 + 7
2. Simplificar: x = 12
3. **Verificar**: 3(12) - 7 = 29 ✓ y 2(12) + 5 = 29 ✓

### Ecuaciones con fracciones
**Ejemplo**: x/2 + x/3 = 5

1. Mínimo común múltiplo = 6
2. Multiplicar todo por 6: 3x + 2x = 30
3. 5x = 30 → **x = 6**

### Ecuaciones con paréntesis
**Ejemplo**: 2(3x - 4) = 3(x + 2)

1. Distribuir: 6x - 8 = 3x + 6
2. Agrupar: 6x - 3x = 6 + 8
3. 3x = 14 → **x = 14/3**`,
          exercises: [
            {
              question: 'Resuelve: 4x - 8 = 2x + 6',
              options: ['x = 7', 'x = 1', 'x = -1', 'x = 14'],
              correct: 0,
              explanation: '4x - 2x = 6 + 8 → 2x = 14 → x = 7',
            },
            {
              question: 'Resuelve: 3(2x + 1) = 2(x + 7)',
              options: ['x = 2', 'x = 11/4', 'x = 3', 'x = 11/2'],
              correct: 1,
              explanation: '6x + 3 = 2x + 14 → 4x = 11 → x = 11/4',
            },
            {
              question: '¿Cuál es la solución de x/3 - 2 = x/6 + 1?',
              options: ['x = 12', 'x = 18', 'x = 6', 'x = 9'],
              correct: 1,
              explanation: 'Multiplicar por 6: 2x - 12 = x + 6 → x = 18',
            },
          ],
        },
        {
          id: 'mat-1-3',
          title: 'Sistemas de Ecuaciones',
          duration: '18 min',
          content: `## Sistemas de Ecuaciones

Un **sistema de ecuaciones** es un conjunto de dos o más ecuaciones con las mismas variables.

### Método de Sustitución
**Ejemplo**: { 2x + y = 7 ; x - y = 2 }

1. De la 2ª ecuación: x = y + 2
2. Sustituir en la 1ª: 2(y + 2) + y = 7
3. 2y + 4 + y = 7 → 3y = 3 → **y = 1**
4. x = 1 + 2 = **x = 3**

### Método de Eliminación (Suma/Resta)
**Ejemplo**: { 3x + 2y = 12 ; x - 2y = 4 }

1. Sumar ambas ecuaciones: 4x = 16 → **x = 4**
2. Sustituir: 3(4) + 2y = 12 → 2y = 0 → **y = 0**

### Tipos de sistemas
| Tipo | Descripción | Soluciones |
|------|-------------|------------|
| Compatible determinado | Las rectas se cruzan | Una solución |
| Compatible indeterminado | Las rectas son la misma | Infinitas |
| Incompatible | Las rectas son paralelas | Sin solución |`,
          exercises: [
            {
              question: 'Resuelve el sistema: 2x + y = 5 ; x - y = 1',
              options: ['x=2, y=1', 'x=3, y=-1', 'x=1, y=3', 'x=2, y=-1'],
              correct: 0,
              explanation: 'Sumando: 3x = 6 → x = 2; sustituyendo: 2+y=5 → y=1',
            },
            {
              question: 'En el sistema { x + 2y = 8 ; 3x - 2y = 4 }, ¿cuánto vale x?',
              options: ['3', '4', '5', '2'],
              correct: 0,
              explanation: 'Sumando: 4x = 12 → x = 3',
            },
            {
              question: '¿Qué tipo de sistema es { 2x + y = 4 ; 4x + 2y = 9 }?',
              options: ['Compatible determinado', 'Compatible indeterminado', 'Incompatible', 'Ninguno'],
              correct: 2,
              explanation: 'La 2ª ecuación es 2 veces la 1ª pero con distinto término independiente (4≠4.5), son paralelas → incompatible',
            },
          ],
        },
      ],
    },
    {
      id: 'mat-m2',
      title: 'Módulo 2: Geometría',
      lessons: [
        {
          id: 'mat-2-1',
          title: 'Triángulos y Ángulos',
          duration: '14 min',
          content: `## Triángulos y Ángulos

### Tipos de ángulos
- **Agudo**: 0° < α < 90°
- **Recto**: α = 90°
- **Obtuso**: 90° < α < 180°
- **Llano**: α = 180°

### Triángulos por lados
| Tipo | Características |
|------|----------------|
| Equilátero | 3 lados iguales, 3 ángulos de 60° |
| Isósceles | 2 lados iguales |
| Escaleno | 3 lados distintos |

### Teorema de Pitágoras
En un triángulo rectángulo: **a² + b² = c²**
donde c es la hipotenusa (lado opuesto al ángulo recto).

**Ejemplo**: catetos a=3, b=4 → c = √(9+16) = √25 = **5**

### Suma de ángulos interiores
La suma de los ángulos interiores de cualquier triángulo es **180°**.`,
          exercises: [
            {
              question: 'En un triángulo rectángulo con catetos 5 y 12, ¿cuánto mide la hipotenusa?',
              options: ['13', '17', '√17', '15'],
              correct: 0,
              explanation: '5² + 12² = 25 + 144 = 169 = 13²',
            },
            {
              question: 'Un triángulo tiene ángulos de 45° y 65°. ¿Cuánto mide el tercer ángulo?',
              options: ['70°', '80°', '90°', '60°'],
              correct: 0,
              explanation: '180° - 45° - 65° = 70°',
            },
            {
              question: '¿Qué tipo de triángulo tiene todos sus lados distintos?',
              options: ['Equilátero', 'Isósceles', 'Escaleno', 'Rectángulo'],
              correct: 2,
              explanation: 'El triángulo escaleno tiene los 3 lados de longitudes diferentes',
            },
          ],
        },
        {
          id: 'mat-2-2',
          title: 'Circunferencia y Área',
          duration: '13 min',
          content: `## Circunferencia y Área

### La circunferencia
- **Radio (r)**: distancia del centro a cualquier punto
- **Diámetro (d)**: d = 2r
- **Longitud** = 2πr
- **Área** = πr²

**Ejemplo**: r = 5 cm → Área = π(25) ≈ 78.54 cm²

### Áreas de figuras planas
| Figura | Fórmula |
|--------|---------|
| Cuadrado | l² |
| Rectángulo | b × h |
| Triángulo | (b × h) / 2 |
| Trapecio | ((B + b) × h) / 2 |
| Círculo | πr² |

### Perímetros
| Figura | Fórmula |
|--------|---------|
| Cuadrado | 4l |
| Rectángulo | 2(b + h) |
| Triángulo | a + b + c |
| Círculo | 2πr |`,
          exercises: [
            {
              question: '¿Cuál es el área de un círculo con radio 6 cm? (usa π ≈ 3.14)',
              options: ['113.04 cm²', '37.68 cm²', '18.84 cm²', '226.08 cm²'],
              correct: 0,
              explanation: 'A = πr² = 3.14 × 36 = 113.04 cm²',
            },
            {
              question: '¿Cuál es el área de un trapecio con bases 8 y 5, y altura 4?',
              options: ['26', '13', '20', '52'],
              correct: 0,
              explanation: 'A = ((8 + 5) × 4) / 2 = (13 × 4) / 2 = 26',
            },
            {
              question: 'Un cuadrado tiene perímetro 36 cm. ¿Cuánto mide su área?',
              options: ['81 cm²', '36 cm²', '144 cm²', '9 cm²'],
              correct: 0,
              explanation: 'Lado = 36/4 = 9 cm → Área = 9² = 81 cm²',
            },
          ],
        },
      ],
    },
    {
      id: 'mat-m3',
      title: 'Módulo 3: Cálculo',
      lessons: [
        {
          id: 'mat-3-1',
          title: 'Límites y Continuidad',
          duration: '20 min',
          content: `## Límites y Continuidad

### Concepto de Límite
**lim(x→a) f(x) = L** significa que cuando x se acerca a a, f(x) se acerca a L.

### Cálculo directo
Si la función es continua en a, simplemente sustituye:
> lim(x→2) (x² + 3) = 4 + 3 = **7**

### Indeterminaciones
Si obtienes 0/0, factoriza y simplifica:
> lim(x→3) (x² - 9)/(x - 3) = lim(x→3) (x+3)(x-3)/(x-3) = lim(x→3) (x+3) = **6**

### Límites al infinito
Para fracciones racionales, el comportamiento depende del grado:
- Grado numerador < denominador → límite = 0
- Grados iguales → límite = cociente de coeficientes líderes
- Grado numerador > denominador → límite = ±∞`,
          exercises: [
            {
              question: '¿Cuánto es lim(x→4) (x² - 16)/(x - 4)?',
              options: ['8', '0', '4', 'No existe'],
              correct: 0,
              explanation: 'Factor: (x-4)(x+4)/(x-4) = x+4 → cuando x→4: 4+4 = 8',
            },
            {
              question: '¿Cuánto es lim(x→∞) (3x² + 2)/(5x²)?',
              options: ['3/5', '0', '∞', '2/5'],
              correct: 0,
              explanation: 'Mismos grados: cociente de coeficientes líderes = 3/5',
            },
            {
              question: '¿Cuánto es lim(x→2) (x³ - 8)/(x - 2)?',
              options: ['12', '0', '4', '8'],
              correct: 0,
              explanation: 'x³-8 = (x-2)(x²+2x+4), simplificamos → x²+2x+4 con x=2: 4+4+4=12',
            },
          ],
        },
      ],
    },
  ],
};

// ─── Física ───────────────────────────────────────────────────────────────────
const fisica: Course = {
  id: 'fisica',
  title: 'Física',
  description: 'Cinemática, Dinámica y Termodinámica con problemas resueltos.',
  icon: '⚡',
  color: 'from-cyan-500 to-cyan-700',
  bgColor: 'bg-cyan-50',
  modules: [
    {
      id: 'fis-m1',
      title: 'Módulo 1: Cinemática',
      lessons: [
        {
          id: 'fis-1-1',
          title: 'Movimiento Rectilíneo Uniforme (MRU)',
          duration: '14 min',
          content: `## Movimiento Rectilíneo Uniforme

El **MRU** es el movimiento en línea recta con velocidad constante (aceleración = 0).

### Características
- Velocidad constante (v = constante)
- Aceleración = 0
- La gráfica x(t) es una línea recta

### Ecuación fundamental
> **x = x₀ + v · t**

Donde:
- x = posición final (m)
- x₀ = posición inicial (m)
- v = velocidad (m/s)
- t = tiempo (s)

### Ejemplo resuelto
Un auto viaja a 20 m/s. ¿Qué distancia recorre en 15 segundos?

x = x₀ + v·t = 0 + 20 × 15 = **300 m**

### Velocidad media
> v_media = Δx / Δt = (x_final - x_inicial) / (t_final - t_inicial)`,
          exercises: [
            {
              question: 'Un ciclista viaja a 5 m/s durante 60 segundos. ¿Cuántos metros recorre?',
              options: ['300 m', '12 m', '65 m', '55 m'],
              correct: 0,
              explanation: 'x = v·t = 5 × 60 = 300 m',
            },
            {
              question: 'Un tren viaja 1 km en 50 s. ¿Cuál es su velocidad en m/s?',
              options: ['20 m/s', '50 m/s', '0.02 m/s', '100 m/s'],
              correct: 0,
              explanation: 'v = x/t = 1000/50 = 20 m/s',
            },
            {
              question: '¿Qué caracteriza al MRU?',
              options: ['Velocidad variable', 'Aceleración constante', 'Velocidad constante y aceleración cero', 'Movimiento curvilíneo'],
              correct: 2,
              explanation: 'En el MRU la velocidad es constante y la aceleración es cero',
            },
          ],
        },
        {
          id: 'fis-1-2',
          title: 'MRUA y Caída Libre',
          duration: '18 min',
          content: `## Movimiento Uniformemente Acelerado (MRUA)

En el MRUA la aceleración es **constante y diferente de cero**.

### Ecuaciones del MRUA
| Ecuación | Uso |
|----------|-----|
| v = v₀ + at | Hallar velocidad final |
| x = v₀t + ½at² | Hallar posición |
| v² = v₀² + 2ax | Sin tiempo |
| x = (v + v₀)/2 · t | Con velocidades |

### Caída Libre
Caso especial de MRUA con a = g = 9.8 m/s² (hacia abajo)
- Velocidad inicial vertical = 0
- **v = g·t**
- **h = ½g·t²**

### Ejemplo: caída libre
Se suelta una piedra desde 80 m de altura. ¿En cuánto tiempo llega al suelo?

h = ½g·t² → 80 = ½(10)t² → t² = 16 → **t = 4 s**`,
          exercises: [
            {
              question: 'Un auto parte del reposo con a = 3 m/s². ¿Qué velocidad tiene a los 8 s?',
              options: ['24 m/s', '11 m/s', '5 m/s', '3 m/s'],
              correct: 0,
              explanation: 'v = v₀ + at = 0 + 3×8 = 24 m/s',
            },
            {
              question: 'Se deja caer una pelota desde 45 m. ¿Cuántos segundos tarda en llegar? (g=10 m/s²)',
              options: ['3 s', '4.5 s', '9 s', '6 s'],
              correct: 0,
              explanation: '45 = ½(10)t² → t² = 9 → t = 3 s',
            },
            {
              question: 'Un vehículo a 20 m/s frena con a = -4 m/s². ¿Cuánto recorre hasta detenerse?',
              options: ['50 m', '40 m', '25 m', '100 m'],
              correct: 0,
              explanation: 'v²= v₀²+ 2ax → 0 = 400 - 8x → x = 50 m',
            },
          ],
        },
      ],
    },
    {
      id: 'fis-m2',
      title: 'Módulo 2: Dinámica',
      lessons: [
        {
          id: 'fis-2-1',
          title: 'Leyes de Newton',
          duration: '16 min',
          content: `## Las 3 Leyes de Newton

### 1ª Ley: Inercia
"Un objeto en reposo permanece en reposo, y uno en movimiento continúa en movimiento rectilíneo uniforme, **a menos que actúe una fuerza neta sobre él**."

### 2ª Ley: Fuerza y Aceleración
> **F = m · a**

- F: fuerza neta (Newton, N)
- m: masa (kilogramos, kg)
- a: aceleración (m/s²)

**Ejemplo**: m = 10 kg, a = 5 m/s² → F = 50 N

### 3ª Ley: Acción y Reacción
"Por cada acción existe una **reacción igual y opuesta**."
- Siempre se presentan en pares
- Actúan sobre objetos distintos
- El suelo te empuja hacia arriba con la misma fuerza que tú lo pisas

### Peso vs Masa
- **Masa**: cantidad de materia (kg) — constante
- **Peso**: fuerza gravitacional W = mg (N) — varía según g`,
          exercises: [
            {
              question: 'Aplicas una fuerza de 60 N a un objeto de 12 kg. ¿Cuál es su aceleración?',
              options: ['5 m/s²', '720 m/s²', '0.2 m/s²', '48 m/s²'],
              correct: 0,
              explanation: 'a = F/m = 60/12 = 5 m/s²',
            },
            {
              question: '¿Cuál es el peso de un objeto de 8 kg en la Tierra? (g = 10 m/s²)',
              options: ['80 N', '8 N', '80 kg', '0.8 N'],
              correct: 0,
              explanation: 'W = mg = 8 × 10 = 80 N',
            },
            {
              question: '¿Qué ley de Newton explica por qué un cohete se impulsa hacia arriba expulsando gases hacia abajo?',
              options: ['1ª Ley', '2ª Ley', '3ª Ley', 'Ley de Gravedad'],
              correct: 2,
              explanation: 'La 3ª ley (acción-reacción): los gases salen hacia abajo y el cohete sube',
            },
          ],
        },
      ],
    },
  ],
};

// ─── Química ──────────────────────────────────────────────────────────────────
const quimica: Course = {
  id: 'quimica',
  title: 'Química',
  description: 'Átomo, enlace, estequiometría y química orgánica desde cero.',
  icon: '⚗️',
  color: 'from-emerald-500 to-emerald-700',
  bgColor: 'bg-emerald-50',
  modules: [
    {
      id: 'qui-m1',
      title: 'Módulo 1: Estructura Atómica',
      lessons: [
        {
          id: 'qui-1-1',
          title: 'El Átomo y sus Partículas',
          duration: '15 min',
          content: `## El Átomo

El **átomo** es la unidad mínima que conserva las propiedades de un elemento.

### Partículas subatómicas
| Partícula | Símbolo | Carga | Masa relativa | Ubicación |
|-----------|---------|-------|---------------|-----------|
| Protón | p⁺ | +1 | 1 | Núcleo |
| Neutrón | n⁰ | 0 | 1 | Núcleo |
| Electrón | e⁻ | -1 | ~0 | Orbitales |

### Números atómicos
- **Número atómico (Z)**: número de protones → identifica al elemento
- **Número másico (A)**: protones + neutrones → A = Z + N
- **Neutrones**: N = A - Z

### Notación atómica
> ᴬ_Z Símbolo

**Ejemplo**: ¹²_6 C → 6 protones, 6 neutrones, 6 electrones (átomo neutro)

### Isótopos
Átomos del mismo elemento con diferente número de neutrones.
¹H, ²H (deuterio), ³H (tritio) → mismo Z=1, distinto A`,
          exercises: [
            {
              question: 'Un átomo tiene Z=17 y A=35. ¿Cuántos neutrones tiene?',
              options: ['18', '17', '35', '52'],
              correct: 0,
              explanation: 'N = A - Z = 35 - 17 = 18 neutrones',
            },
            {
              question: '¿Qué partícula determina la identidad de un elemento?',
              options: ['Neutrón', 'Electrón', 'Protón', 'Ninguna'],
              correct: 2,
              explanation: 'El número de protones (número atómico Z) identifica al elemento',
            },
            {
              question: 'Dos átomos son isótopos si tienen el mismo número de:',
              options: ['Neutrones', 'Protones y neutrones', 'Protones pero diferente número de neutrones', 'Electrones y neutrones'],
              correct: 2,
              explanation: 'Los isótopos tienen el mismo Z (protones) pero diferente N (neutrones)',
            },
          ],
        },
        {
          id: 'qui-1-2',
          title: 'Tabla Periódica',
          duration: '16 min',
          content: `## Tabla Periódica

### Organización
- **Periodos** (filas): 7 filas horizontales. Los elementos en el mismo periodo tienen el mismo número de capas de electrones.
- **Grupos** (columnas): 18 columnas. Los elementos en el mismo grupo tienen la misma configuración de electrones de valencia.

### Grupos importantes
| Grupo | Nombre | Ejemplo |
|-------|--------|---------|
| 1 | Metales alcalinos | Na, K |
| 2 | Metales alcalinotérreos | Ca, Mg |
| 17 | Halógenos | F, Cl |
| 18 | Gases nobles | He, Ne |

### Tendencias periódicas
| Propiedad | Aumenta en periodo → | Aumenta en grupo ↑ |
|-----------|---------------------|---------------------|
| Radio atómico | Disminuye | Aumenta |
| Electronegatividad | Aumenta | Disminuye |
| Energía de ionización | Aumenta | Disminuye |`,
          exercises: [
            {
              question: '¿En qué grupo están los gases nobles?',
              options: ['Grupo 1', 'Grupo 17', 'Grupo 18', 'Grupo 2'],
              correct: 2,
              explanation: 'Los gases nobles (He, Ne, Ar, Kr, Xe) están en el Grupo 18 (VIIIA)',
            },
            {
              question: '¿Qué propiedad aumenta de izquierda a derecha en un periodo?',
              options: ['Radio atómico', 'Electronegatividad', 'Carácter metálico', 'Número de capas'],
              correct: 1,
              explanation: 'La electronegatividad aumenta hacia la derecha en un periodo',
            },
            {
              question: 'El cloro (Cl) pertenece al grupo de los:',
              options: ['Metales alcalinos', 'Gases nobles', 'Halógenos', 'Metales de transición'],
              correct: 2,
              explanation: 'El cloro (Z=17) es un halógeno, grupo 17',
            },
          ],
        },
        {
          id: 'qui-1-3',
          title: 'Enlace Químico',
          duration: '17 min',
          content: `## Tipos de Enlace Químico

### Enlace Iónico
Transferencia de electrones entre **metal y no metal**.
- El metal pierde electrones → catión (+)
- El no metal gana electrones → anión (-)
- **Ejemplo**: Na⁺ + Cl⁻ → NaCl (sal de mesa)

### Enlace Covalente
Compartición de electrones entre **no metales**.
- **Simple**: 1 par compartido (H-H)
- **Doble**: 2 pares (O=O)
- **Triple**: 3 pares (N≡N)
- **Ejemplo**: H₂O, CO₂, CH₄

### Enlace Metálico
Entre **metales**: electrones forman una "nube" que fluye libremente.
- Explica la conductividad eléctrica y térmica de los metales

### Regla del Octeto
Los átomos tienden a tener **8 electrones** en su capa de valencia (como los gases nobles).`,
          exercises: [
            {
              question: '¿Qué tipo de enlace se forma entre Na y Cl?',
              options: ['Covalente polar', 'Iónico', 'Metálico', 'Covalente apolar'],
              correct: 1,
              explanation: 'Na es metal y Cl es no metal → transfieren electrones → enlace iónico',
            },
            {
              question: '¿Cuántos pares de electrones comparte el triple enlace del N₂?',
              options: ['1', '2', '3', '6'],
              correct: 2,
              explanation: 'El triple enlace (N≡N) comparte 3 pares de electrones (6 electrones)',
            },
            {
              question: '¿Qué propiedad explica el enlace metálico?',
              options: ['Fragilidad', 'Conductividad eléctrica', 'Alta electronegatividad', 'Carácter no metálico'],
              correct: 1,
              explanation: 'La nube de electrones libres en el enlace metálico permite conducir electricidad',
            },
          ],
        },
      ],
    },
    {
      id: 'qui-m2',
      title: 'Módulo 2: Estequiometría',
      lessons: [
        {
          id: 'qui-2-1',
          title: 'La Mole y Masa Molar',
          duration: '14 min',
          content: `## La Mole

### Definición
**1 mole = 6.022 × 10²³ partículas** (Número de Avogadro)

La mole es simplemente un número, como "una docena = 12".

### Masa Molar
La masa molar (M) es la masa de 1 mol de sustancia en **g/mol**.
Equivale al peso atómico o molecular de la tabla periódica.

**Ejemplos**:
- H₂: M = 2(1) = 2 g/mol
- H₂O: M = 2(1) + 16 = 18 g/mol
- NaCl: M = 23 + 35.5 = 58.5 g/mol
- CO₂: M = 12 + 2(16) = 44 g/mol

### Conversiones
> **n = m / M** (moles = masa / masa molar)
> **m = n × M** (masa = moles × masa molar)

**Ejemplo**: ¿Cuántos moles hay en 36 g de H₂O?
n = 36 / 18 = **2 moles**`,
          exercises: [
            {
              question: '¿Cuántos moles hay en 44 g de CO₂? (M=44 g/mol)',
              options: ['1 mol', '2 mol', '0.5 mol', '44 mol'],
              correct: 0,
              explanation: 'n = m/M = 44/44 = 1 mol',
            },
            {
              question: '¿Qué masa tiene 3 moles de H₂O? (M=18 g/mol)',
              options: ['54 g', '18 g', '6 g', '21 g'],
              correct: 0,
              explanation: 'm = n×M = 3×18 = 54 g',
            },
            {
              question: '¿Cuántas moléculas hay en 2 moles de O₂?',
              options: ['1.2×10²⁴', '6×10²³', '3×10²³', '2×10²³'],
              correct: 0,
              explanation: '2 × 6.022×10²³ = 1.2044×10²⁴ moléculas',
            },
          ],
        },
      ],
    },
  ],
};

// ─── Historia ─────────────────────────────────────────────────────────────────
const historia: Course = {
  id: 'historia',
  title: 'Historia',
  description: 'Historia del Perú y Universal desde los orígenes hasta el siglo XX.',
  icon: '🏛️',
  color: 'from-amber-500 to-amber-700',
  bgColor: 'bg-amber-50',
  modules: [
    {
      id: 'his-m1',
      title: 'Módulo 1: Perú Prehispánico',
      lessons: [
        {
          id: 'his-1-1',
          title: 'Culturas Preincaicas',
          duration: '16 min',
          content: `## Culturas Preincaicas del Perú

### Horizonte Temprano (1000 a.C. – 100 d.C.)
**Chavín de Huántar** (900-200 a.C.)
- Primera gran civilización andina
- Centro ceremonial en la sierra de Áncash
- Arte caracterizado por figuras zoomorfas (felinos, serpientes)

### Período Intermedio Temprano (100 – 700 d.C.)
**Paracas**: Costa sur. Famosos por sus textiles de colores y trepanaciones craneanas.

**Nasca**: Costa sur. Famosas **Líneas de Nazca** — geoglifos gigantes visibles solo desde el aire.

**Mochica (Moche)**: Costa norte. Maestros de la cerámica retrato. Huacas del Sol y de la Luna.

### Horizonte Medio (600 – 1000 d.C.)
**Tiahuanaco**: Altiplano boliviano. Monolitos y la Puerta del Sol.

**Wari**: Sierra ayacuchana. Primer estado expansivo, precursor del Tawantinsuyu.

### Período Intermedio Tardío (1000 – 1400 d.C.)
**Chimú**: Norte. Capital Chan Chan (ciudad de adobe más grande del mundo precolombino).`,
          exercises: [
            {
              question: '¿Cuál es la cultura conocida por las Líneas de Nazca?',
              options: ['Chavín', 'Mochica', 'Nasca', 'Chimú'],
              correct: 2,
              explanation: 'La cultura Nasca (costa sur) creó los famosos geoglifos conocidos como Líneas de Nazca',
            },
            {
              question: '¿Cuál fue el primer gran estado expansivo que antecedió al Imperio Inca?',
              options: ['Chavín', 'Wari', 'Paracas', 'Tiahuanaco'],
              correct: 1,
              explanation: 'La cultura Wari (Horizonte Medio) fue el primer estado expansivo andino',
            },
            {
              question: '¿Por qué fue famosa la cultura Paracas?',
              options: ['Por sus líneas gigantes', 'Por sus textiles y trepanaciones', 'Por la cerámica retrato', 'Por Chan Chan'],
              correct: 1,
              explanation: 'Paracas destacó por sus textiles de colores brillantes y las prácticas de trepanación craneana',
            },
          ],
        },
        {
          id: 'his-1-2',
          title: 'El Imperio Inca',
          duration: '18 min',
          content: `## El Imperio Inca (Tawantinsuyu)

### Fundación y expansión
- Fundado hacia 1438 por **Pachacútec**, el gran reformador
- En náhuatl: "Tawantinsuyu" = Las Cuatro Regiones
- Cuatro suyos: Chinchaysuyo (norte), Antisuyo (este), Collasuyo (sur), Contisuyo (oeste)

### Organización política
- **Sapa Inca**: gobernante máximo, hijo del Sol (Inti)
- **Auqui**: heredero del Sapa Inca
- **Apu**: gobernador de cada suyo
- **Curaca**: jefe local

### Sistema económico
| Sistema | Descripción |
|---------|-------------|
| Mita | Trabajo obligatorio para el Estado |
| Ayni | Trabajo colectivo comunitario |
| Minka | Trabajo para la comunidad |

### Logros e innovaciones
- **Red de caminos (Qhapaq Ñan)**: 40,000 km de caminos
- **Quipus**: sistema de registro con cuerdas anudadas
- **Terrazas (andenes)**: agricultura en zonas montañosas
- Capital: **Cusco** (ombligo del mundo)`,
          exercises: [
            {
              question: '¿Qué significa "Tawantinsuyu"?',
              options: ['La Ciudad del Sol', 'Las Cuatro Regiones', 'El Gran Imperio', 'Tierra de los Incas'],
              correct: 1,
              explanation: 'Tawantinsuyu significa "Las Cuatro Regiones" en quechua',
            },
            {
              question: '¿Qué Inca fue conocido como el gran reformador que consolidó el Tawantinsuyu?',
              options: ['Manco Cápac', 'Huayna Cápac', 'Pachacútec', 'Atahualpa'],
              correct: 2,
              explanation: 'Pachacútec (1438-1471) fue el gran reformador que transformó Cusco y expandió el imperio',
            },
            {
              question: '¿Para qué servían los quipus?',
              options: ['Para construir caminos', 'Como sistema de registro y contabilidad', 'Para comunicarse con el sol', 'Como armas de guerra'],
              correct: 1,
              explanation: 'Los quipus eran cuerdas anudadas usadas como sistema de registro numérico y administrativo',
            },
          ],
        },
        {
          id: 'his-1-3',
          title: 'Conquista y Virreinato',
          duration: '20 min',
          content: `## La Conquista Española del Perú

### Antecedentes
- Guerra civil entre **Huáscar y Atahualpa** debilitó al Imperio
- Llegada de **Francisco Pizarro** en 1532

### La Conquista (1532-1535)
1. **Captura de Atahualpa** en Cajamarca (noviembre 1532)
2. El Inca ofreció llenar un cuarto de oro y dos de plata como rescate
3. A pesar del rescate, Atahualpa fue ejecutado en 1533
4. **Fundación de Lima**: 18 de enero de 1535 (Ciudad de los Reyes)

## El Virreinato del Perú (1542-1821)

### Organización
- **Virrey**: máxima autoridad en nombre del Rey de España
- **Audiencia**: tribunal de justicia
- **Cabildos**: gobierno municipal

### Mita minera
Sistema de trabajo forzado. Las minas de **Potosí** (plata) y **Huancavelica** (mercurio) fueron las más importantes.

### Sociedad colonial
| Estamento | Descripción |
|-----------|-------------|
| Peninsulares | Españoles nacidos en España |
| Criollos | Españoles nacidos en América |
| Mestizos | Hijos de español e indígena |
| Indígenas | Pueblos originarios |
| Esclavos | Africanos traídos forzosamente |`,
          exercises: [
            {
              question: '¿Dónde fue capturado Atahualpa por los españoles?',
              options: ['Lima', 'Cusco', 'Cajamarca', 'Potosí'],
              correct: 2,
              explanation: 'La captura de Atahualpa ocurrió en Cajamarca en noviembre de 1532',
            },
            {
              question: '¿En qué año se fundó Lima?',
              options: ['1532', '1535', '1542', '1521'],
              correct: 1,
              explanation: 'Lima fue fundada el 18 de enero de 1535 por Francisco Pizarro como "Ciudad de los Reyes"',
            },
            {
              question: '¿Cómo se llamaba la máxima autoridad española en el Virreinato?',
              options: ['Curaca', 'Sapa Inca', 'Virrey', 'Peninsular'],
              correct: 2,
              explanation: 'El Virrey era el representante del Rey de España y la máxima autoridad en el Virreinato',
            },
          ],
        },
      ],
    },
    {
      id: 'his-m2',
      title: 'Módulo 2: República',
      lessons: [
        {
          id: 'his-2-1',
          title: 'Independencia del Perú',
          duration: '15 min',
          content: `## Independencia del Perú

### Causas
**Externas**: Revolución Francesa (1789), Independencia de EE.UU. (1776), Invasión de Napoleón a España (1808)
**Internas**: Desigualdad social, monopolio comercial, rebeliones previas (Túpac Amaru II, 1780)

### La Independencia
- **Llegada de San Martín**: Desembarco en Paracas, 1820
- **Proclamación**: 28 de julio de 1821 en Lima
- **Consolidación**: Batalla de Ayacucho, 9 de diciembre de 1824 (Sucre vs Laserna)

### Simón Bolívar
Libertador de Venezuela, Colombia, Ecuador, Perú y Bolivia.
Convocó el **Congreso de Panamá** (1826) para unir América Latina.`,
          exercises: [
            {
              question: '¿Cuándo se proclamó la Independencia del Perú?',
              options: ['9 de diciembre de 1824', '28 de julio de 1821', '18 de enero de 1535', '8 de noviembre de 1820'],
              correct: 1,
              explanation: 'La Independencia del Perú fue proclamada el 28 de julio de 1821 por José de San Martín',
            },
            {
              question: '¿Qué batalla consolidó la Independencia de Perú?',
              options: ['Batalla de Junín', 'Batalla de Cajamarca', 'Batalla de Ayacucho', 'Batalla de Boyacá'],
              correct: 2,
              explanation: 'La Batalla de Ayacucho (9 de diciembre de 1824) fue la última gran batalla de la Independencia sudamericana',
            },
            {
              question: '¿Cuál fue una causa interna de la Independencia?',
              options: ['Invasión napoleónica', 'Revolución Francesa', 'Rebelión de Túpac Amaru II', 'Independencia de EE.UU.'],
              correct: 2,
              explanation: 'La rebelión de Túpac Amaru II (1780) fue una importante causa interna de la Independencia del Perú',
            },
          ],
        },
      ],
    },
  ],
};

// ─── Comunicación ─────────────────────────────────────────────────────────────
const comunicacion: Course = {
  id: 'comunicacion',
  title: 'Comunicación',
  description: 'Comprensión lectora, redacción académica y literatura peruana.',
  icon: '📝',
  color: 'from-violet-500 to-violet-700',
  bgColor: 'bg-violet-50',
  modules: [
    {
      id: 'com-m1',
      title: 'Módulo 1: Comprensión Lectora',
      lessons: [
        {
          id: 'com-1-1',
          title: 'Tipos de Texto y Estructura',
          duration: '14 min',
          content: `## Tipos de Texto

### Según la intención comunicativa
| Tipo | Propósito | Ejemplo |
|------|-----------|---------|
| **Narrativo** | Contar hechos o historia | Novela, cuento |
| **Descriptivo** | Caracterizar objetos/personas | Retrato, paisaje |
| **Expositivo** | Informar/explicar | Artículo científico |
| **Argumentativo** | Convencer con razones | Ensayo, editorial |
| **Instructivo** | Guiar acciones | Manual, receta |

### Estructura del texto expositivo
1. **Introducción**: presenta el tema
2. **Desarrollo**: explica con datos, ejemplos, comparaciones
3. **Conclusión**: sintetiza las ideas principales

### Propiedades del texto
- **Coherencia**: unidad temática (todas las ideas sobre el mismo tema)
- **Cohesión**: conectores y referencias que unen las oraciones
- **Adecuación**: lenguaje apropiado al receptor y contexto`,
          exercises: [
            {
              question: '¿Qué tipo de texto tiene como propósito convencer al lector?',
              options: ['Narrativo', 'Descriptivo', 'Argumentativo', 'Instructivo'],
              correct: 2,
              explanation: 'El texto argumentativo busca persuadir al lector mediante razones y evidencias',
            },
            {
              question: '¿Cuál es la propiedad textual que se refiere a la unidad temática?',
              options: ['Cohesión', 'Adecuación', 'Coherencia', 'Corrección'],
              correct: 2,
              explanation: 'La coherencia es la propiedad que garantiza que todas las ideas del texto giren en torno al mismo tema',
            },
            {
              question: 'Una receta de cocina es un ejemplo de texto:',
              options: ['Narrativo', 'Argumentativo', 'Expositivo', 'Instructivo'],
              correct: 3,
              explanation: 'La receta de cocina es un texto instructivo porque guía paso a paso las acciones a realizar',
            },
          ],
        },
        {
          id: 'com-1-2',
          title: 'Idea Principal e Inferencias',
          duration: '16 min',
          content: `## Idea Principal e Inferencias

### Idea principal
Es el mensaje más importante del texto, aquello de lo que trata fundamentalmente.

**¿Cómo identificarla?**
1. Pregúntate: "¿De qué trata este texto?"
2. Suele estar en la primera o última oración del párrafo
3. Todas las demás ideas (secundarias) la apoyan o desarrollan

### Ideas secundarias
Son las que dan detalles, ejemplos o argumentos que sustentan la idea principal.

### Tipos de inferencias
| Tipo | Descripción |
|------|-------------|
| **Deductiva** | De lo general a lo particular |
| **Inductiva** | De lo particular a lo general |
| **Por analogía** | Basada en semejanzas |
| **Causal** | Causa-efecto |

### Estrategia para preguntas de comprensión
1. Lee el texto completo una vez
2. Identifica el tema general
3. Para cada pregunta, regresa al texto y localiza la evidencia
4. Nunca respondas desde tu opinión personal, solo desde el texto`,
          exercises: [
            {
              question: 'La idea principal de un párrafo se puede encontrar principalmente:',
              options: ['Solo en el título', 'En la primera o última oración', 'En los ejemplos', 'Solo en los conectores'],
              correct: 1,
              explanation: 'La idea principal suele ubicarse en la oración temática, generalmente al inicio o al final del párrafo',
            },
            {
              question: '¿Qué es una inferencia?',
              options: ['Copiar literalmente el texto', 'Una conclusión obtenida implícitamente del texto', 'Una opinión personal', 'Un tipo de conector'],
              correct: 1,
              explanation: 'Una inferencia es información que no está expresada directamente pero que se puede deducir del contenido del texto',
            },
            {
              question: 'Las ideas secundarias sirven para:',
              options: ['Contradecir la idea principal', 'Desarrollar y apoyar la idea principal', 'Introducir un nuevo tema', 'Cerrar el texto'],
              correct: 1,
              explanation: 'Las ideas secundarias aportan detalles, ejemplos y argumentos que desarrollan la idea principal',
            },
          ],
        },
      ],
    },
    {
      id: 'com-m2',
      title: 'Módulo 2: Redacción',
      lessons: [
        {
          id: 'com-2-1',
          title: 'El Párrafo y sus Partes',
          duration: '15 min',
          content: `## El Párrafo

### Definición
El **párrafo** es la unidad básica de la redacción. Agrupa oraciones relacionadas con una misma idea.

### Partes del párrafo
1. **Oración tópica** (oración temática): expresa la idea principal del párrafo
2. **Oraciones de desarrollo**: aportan evidencias, ejemplos, explicaciones
3. **Oración de cierre**: concluye la idea o hace transición al siguiente párrafo

### Ejemplo:
> "La lectura es el pilar del conocimiento." ← Oración tópica
> "Diversos estudios demuestran que leer 30 minutos al día mejora la comprensión y el vocabulario." ← Desarrollo
> "Por ello, cultivar el hábito lector desde temprana edad es fundamental para el éxito académico." ← Cierre

### Extensión ideal
Un párrafo de 5 a 10 oraciones es lo más adecuado para el texto académico.

### Tipos de párrafos
- **De introducción**: presenta el tema
- **De desarrollo**: explora el tema con argumentos
- **De conclusión**: sintetiza y cierra`,
          exercises: [
            {
              question: '¿Qué función tiene la oración tópica?',
              options: ['Dar ejemplos', 'Expresar la idea principal del párrafo', 'Cerrar el párrafo', 'Conectar párrafos'],
              correct: 1,
              explanation: 'La oración tópica enuncia la idea central del párrafo y orienta el contenido de las demás oraciones',
            },
            {
              question: 'Un párrafo académico bien escrito tiene aproximadamente:',
              options: ['1-2 oraciones', '3-4 oraciones', '5-10 oraciones', 'Más de 15 oraciones'],
              correct: 2,
              explanation: 'El párrafo académico ideal tiene entre 5 y 10 oraciones, suficientes para desarrollar la idea sin excederse',
            },
            {
              question: '¿Qué aportan las oraciones de desarrollo al párrafo?',
              options: ['Introducen el tema nuevo', 'Presentan la idea principal', 'Dan evidencias y ejemplos que sustentan la idea tópica', 'Resumen el texto'],
              correct: 2,
              explanation: 'Las oraciones de desarrollo argumentan, ejemplifican y profundizan en la idea expresada por la oración tópica',
            },
          ],
        },
      ],
    },
  ],
};

// ─── Inglés ───────────────────────────────────────────────────────────────────
const ingles: Course = {
  id: 'ingles',
  title: 'Inglés',
  description: 'Grammar, vocabulary and writing skills for academic English.',
  icon: '🇬🇧',
  color: 'from-rose-500 to-rose-700',
  bgColor: 'bg-rose-50',
  modules: [
    {
      id: 'ing-m1',
      title: 'Module 1: Grammar',
      lessons: [
        {
          id: 'ing-1-1',
          title: 'Present Tenses',
          duration: '15 min',
          content: `## Present Tenses in English

### Simple Present
**Form**: Subject + base verb (add -s/-es for he/she/it)
**Use**: habits, routines, general truths, facts

✅ Examples:
- She **studies** every day.
- Water **boils** at 100°C.
- I **don't** like coffee.

### Present Continuous
**Form**: Subject + am/is/are + verb-ing
**Use**: actions happening now, temporary situations

✅ Examples:
- He **is studying** right now.
- They **are working** on a new project.

### Present Perfect
**Form**: Subject + have/has + past participle
**Use**: experiences, recent actions, actions with present results

✅ Examples:
- I **have visited** Paris twice.
- She **has just finished** her homework.

### Key signal words
| Tense | Signal Words |
|-------|-------------|
| Simple Present | always, usually, every day, never |
| Present Continuous | now, at the moment, currently |
| Present Perfect | already, yet, ever, never, just, since, for |`,
          exercises: [
            {
              question: 'Which sentence uses Present Perfect correctly?',
              options: [
                'She visit Paris last year.',
                'She has visited Paris twice.',
                'She is visiting Paris now.',
                'She visits Paris every year.',
              ],
              correct: 1,
              explanation: 'Present Perfect = have/has + past participle. "has visited" is correct for experiences.',
            },
            {
              question: 'Choose the correct form: "They ___ (study) for the exam right now."',
              options: ['study', 'studied', 'are studying', 'have studied'],
              correct: 2,
              explanation: '"Right now" signals an action in progress → Present Continuous: are studying',
            },
            {
              question: 'Which signal word is used with Present Perfect?',
              options: ['yesterday', 'last week', 'already', 'ago'],
              correct: 2,
              explanation: '"Already" is a Present Perfect signal word. "yesterday", "last week", "ago" signal Simple Past.',
            },
          ],
        },
        {
          id: 'ing-1-2',
          title: 'Past Tenses',
          duration: '16 min',
          content: `## Past Tenses in English

### Simple Past
**Form**: Subject + verb-ed (regular) / irregular past form
**Use**: completed actions at a specific time in the past

✅ Examples:
- She **studied** all night.
- They **went** to the cinema yesterday.
- I **didn't see** the movie.

### Past Continuous
**Form**: Subject + was/were + verb-ing
**Use**: action in progress at a specific moment in the past; background action

✅ Examples:
- He **was reading** when the phone rang.
- We **were playing** football at 5 pm.

### Past Perfect
**Form**: Subject + had + past participle
**Use**: action completed before another past action

✅ Examples:
- She **had already left** when I arrived.
- They **had finished** dinner before the movie started.

### Irregular verbs (essential list)
| Base | Past Simple | Past Participle |
|------|-------------|-----------------|
| go | went | gone |
| write | wrote | written |
| take | took | taken |
| speak | spoke | spoken |
| see | saw | seen |`,
          exercises: [
            {
              question: 'She ___ (read) when the lights went out.',
              options: ['read', 'was reading', 'has read', 'had read'],
              correct: 1,
              explanation: 'Background action interrupted by another → Past Continuous: was reading',
            },
            {
              question: 'By the time he arrived, we ___ (already/eat) dinner.',
              options: ['already ate', 'were eating', 'had already eaten', 'have already eaten'],
              correct: 2,
              explanation: 'Action completed before another past action → Past Perfect: had already eaten',
            },
            {
              question: 'What is the Past Simple of "write"?',
              options: ['writed', 'written', 'wrote', 'writ'],
              correct: 2,
              explanation: '"Write" is irregular: write → wrote → written',
            },
          ],
        },
        {
          id: 'ing-1-3',
          title: 'Conditionals',
          duration: '17 min',
          content: `## Conditional Sentences

### Zero Conditional (General Truths)
**Form**: If + Simple Present, Simple Present
**Use**: facts, scientific truths

✅ If you heat water to 100°C, it **boils**.

### First Conditional (Real Future)
**Form**: If + Simple Present, will + base verb
**Use**: possible/likely future situations

✅ If it **rains** tomorrow, I **will stay** home.

### Second Conditional (Hypothetical Present/Future)
**Form**: If + Simple Past, would + base verb
**Use**: imaginary, unlikely, or impossible present/future

✅ If I **had** a million dollars, I **would travel** the world.
✅ If I **were** you, I **would study** more. (use WERE for all subjects)

### Third Conditional (Impossible Past)
**Form**: If + Past Perfect, would have + past participle
**Use**: imagining a different past

✅ If she **had studied**, she **would have passed** the exam.

### Mixed Conditionals
Combining second and third for mixed time references:
✅ If I **had studied** medicine (past), I **would be** a doctor now (present).`,
          exercises: [
            {
              question: '"If I were rich, I would travel the world." This is a ___ conditional.',
              options: ['Zero', 'First', 'Second', 'Third'],
              correct: 2,
              explanation: 'If + Simple Past (were) + would + base verb = Second Conditional (hypothetical present)',
            },
            {
              question: 'Complete: "If you ___ (heat) ice, it melts."',
              options: ['heated', 'would heat', 'heat', 'had heated'],
              correct: 2,
              explanation: 'Zero conditional (general truth): If + Simple Present, Simple Present → "heat"',
            },
            {
              question: '"If she had studied, she would have passed." What time does this refer to?',
              options: ['Present', 'Future', 'Impossible past situation', 'General truth'],
              correct: 2,
              explanation: 'Third conditional refers to an impossible past situation (she did not study, so she did not pass)',
            },
          ],
        },
      ],
    },
    {
      id: 'ing-m2',
      title: 'Module 2: Vocabulary & Writing',
      lessons: [
        {
          id: 'ing-2-1',
          title: 'Phrasal Verbs',
          duration: '14 min',
          content: `## Phrasal Verbs

A **phrasal verb** = verb + preposition/adverb particle. Its meaning is different from the individual words.

### Essential Phrasal Verbs
| Phrasal Verb | Meaning | Example |
|---|---|---|
| give up | rendirse/dejar | Don't give up! |
| look forward to | esperar ansiosamente | I look forward to the weekend. |
| run out of | quedarse sin | We ran out of milk. |
| put off | postponer | Don't put off your homework. |
| take up | empezar un hobby | She took up painting. |
| bring up | criar / mencionar | He was brought up in Lima. |
| call off | cancelar | They called off the meeting. |
| carry out | llevar a cabo | We will carry out the plan. |
| come across | encontrar por casualidad | I came across an old friend. |
| figure out | entender/resolver | Can you figure out this problem? |

### Tips
- Learn phrasal verbs in context (not isolated)
- Many phrasal verbs are separable: "pick up the book" = "pick the book up"
- Some are inseparable: "look after the children" (NOT "look the children after")`,
          exercises: [
            {
              question: 'What does "run out of" mean?',
              options: ['correr afuera', 'quedarse sin', 'escapar', 'terminar tarde'],
              correct: 1,
              explanation: '"Run out of" significa quedarse sin algo. Ej: "We ran out of time" = Se nos acabó el tiempo',
            },
            {
              question: 'Choose the correct meaning of "put off":',
              options: ['Apagar', 'Ponerse', 'Posponer', 'Cancelar definitivamente'],
              correct: 2,
              explanation: '"Put off" = postpone (posponer). Ej: "Don\'t put off until tomorrow what you can do today"',
            },
            {
              question: '"She _______ painting last year." (started as a hobby)',
              options: ['took off', 'took up', 'gave up', 'put off'],
              correct: 1,
              explanation: '"Take up" = empezar un hobby o actividad. "She took up painting" = empezó a pintar',
            },
          ],
        },
      ],
    },
  ],
};

// ─── All courses ──────────────────────────────────────────────────────────────
export const ALL_COURSES: Course[] = [
  matematicas,
  fisica,
  quimica,
  historia,
  comunicacion,
  ingles,
];

export function getCourse(id: string): Course | undefined {
  return ALL_COURSES.find((c) => c.id === id);
}

export function getLesson(
  courseId: string,
  lessonId: string
): Lesson | undefined {
  const course = getCourse(courseId);
  if (!course) return undefined;
  for (const mod of course.modules) {
    const lesson = mod.lessons.find((l) => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
}

export function getTotalLessons(course: Course): number {
  return course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
}
