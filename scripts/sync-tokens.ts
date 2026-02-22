/**
 * Downloads tokens.json from the camino-tokens repo and generates
 * CSS custom properties + a Tailwind v4 @theme block.
 *
 * Usage: npx tsx scripts/sync-tokens.ts
 */

import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'

const TOKENS_URL =
  'https://raw.githubusercontent.com/FernandoGalende/camino-tokens/main/tokens.json'

const OUT_DIR = resolve(import.meta.dirname ?? '.', '..', 'tokens')
const OUT_JSON = resolve(OUT_DIR, 'tokens.json')
const OUT_CSS = resolve(import.meta.dirname ?? '.', '..', 'src', 'tokens.css')

interface TokenNode {
  $type?: string
  $value?: string | number | Record<string, string>
  [key: string]: unknown
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isLeafToken(node: unknown): node is TokenNode & { $value: string | number } {
  return (
    typeof node === 'object' &&
    node !== null &&
    '$value' in node &&
    typeof (node as TokenNode).$type === 'string'
  )
}

/**
 * Recursively walk the token tree and collect flat key-value pairs.
 * References like `{color.primary.500}` are kept as-is for later resolution.
 */
function flattenTokens(
  obj: Record<string, unknown>,
  prefix: string[] = [],
): Array<{ path: string[]; value: string | number; type: string }> {
  const results: Array<{ path: string[]; value: string | number; type: string }> = []

  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('$') || key === '$themes' || key === '$metadata') continue

    if (isLeafToken(val)) {
      results.push({
        path: [...prefix, key],
        value: val.$value as string | number,
        type: val.$type!,
      })
    } else if (typeof val === 'object' && val !== null) {
      results.push(...flattenTokens(val as Record<string, unknown>, [...prefix, key]))
    }
  }

  return results
}

function toVarName(path: string[]): string {
  return (
    '--' +
    path
      .map((p) => p.replace(/\//g, '-'))
      .join('-')
      .replace(/\s+/g, '-')
      .toLowerCase()
  )
}

/**
 * Resolve `{reference.path}` style values using the full flat map.
 */
function resolveValue(
  raw: string | number,
  lookup: Map<string, string>,
): string {
  if (typeof raw === 'number') return String(raw)
  const str = String(raw)

  return str.replace(/\{([^}]+)\}/g, (_match, ref: string) => {
    const varName =
      '--' +
      ref
        .replace(/\./g, '-')
        .replace(/\//g, '-')
        .replace(/\s+/g, '-')
        .toLowerCase()

    if (lookup.has(varName)) {
      return `var(${varName})`
    }
    return `var(${varName})`
  })
}

function needsUnit(type: string, varName: string, value: string): string {
  if (value.includes('var(')) return value

  const unitlessPatterns = ['fontweight', 'letterSpacing', 'column']
  if (unitlessPatterns.some((p) => varName.toLowerCase().includes(p))) return value

  const numericTypes = new Set([
    'fontSizes',
    'lineHeights',
    'number',
    'dimension',
  ])

  if (!numericTypes.has(type)) return value
  const num = Number(value)
  if (isNaN(num) || num === 0) return value
  if (value.endsWith('px') || value.endsWith('rem') || value.endsWith('%')) return value
  return `${value}px`
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('⬇  Downloading tokens from camino-tokens repo...')
  const res = await fetch(TOKENS_URL)
  if (!res.ok) throw new Error(`Failed to fetch tokens: ${res.statusText}`)
  const json = await res.json()

  mkdirSync(OUT_DIR, { recursive: true })
  mkdirSync(dirname(OUT_CSS), { recursive: true })
  writeFileSync(OUT_JSON, JSON.stringify(json, null, 2))
  console.log(`✓  Saved raw tokens → ${OUT_JSON}`)

  const coreTokens = flattenTokens(
    (json['core/value'] ?? {}) as Record<string, unknown>,
    [],
  )

  const semanticStd = flattenTokens(
    (json['semantic/standard'] ?? {}) as Record<string, unknown>,
    [],
  )

  const semanticEco = flattenTokens(
    (json['semantic/eco'] ?? {}) as Record<string, unknown>,
    [],
  )

  const allTokens = [...coreTokens, ...semanticStd, ...semanticEco]
  const lookup = new Map<string, string>()
  for (const t of allTokens) {
    lookup.set(toVarName(t.path), String(t.value))
  }

  function renderVars(
    tokens: typeof coreTokens,
  ): string {
    return tokens
      .map((t) => {
        const name = toVarName(t.path)
        const resolved = resolveValue(t.value, lookup)
        const final = needsUnit(t.type, name, resolved)
        return `  ${name}: ${final};`
      })
      .join('\n')
  }

  const css = `/* Auto-generated from camino-tokens — do not edit manually */
/* Run: pnpm sync-tokens */

/* ========== Core value tokens ========== */
:root {
${renderVars(coreTokens)}
}

/* ========== Semantic tokens (standard / light theme) ========== */
:root,
[data-theme="standard"] {
${renderVars(semanticStd)}
}

/* ========== Semantic tokens (eco / dark theme) ========== */
[data-theme="eco"] {
${renderVars(semanticEco)}
}

/* ========== Tailwind v4 @theme integration ========== */
@theme {
  /* Colors - Primary */
  --color-primary-100: var(--color-primary-100);
  --color-primary-200: var(--color-primary-200);
  --color-primary-300: var(--color-primary-300);
  --color-primary-400: var(--color-primary-400);
  --color-primary-500: var(--color-primary-500);
  --color-primary-600: var(--color-primary-600);
  --color-primary-700: var(--color-primary-700);
  --color-primary-800: var(--color-primary-800);
  --color-primary-900: var(--color-primary-900);

  /* Colors - Neutral */
  --color-neutral-100: var(--color-neutral-100);
  --color-neutral-200: var(--color-neutral-200);
  --color-neutral-300: var(--color-neutral-300);
  --color-neutral-400: var(--color-neutral-400);
  --color-neutral-500: var(--color-neutral-500);
  --color-neutral-600: var(--color-neutral-600);
  --color-neutral-700: var(--color-neutral-700);
  --color-neutral-800: var(--color-neutral-800);
  --color-neutral-900: var(--color-neutral-900);

  /* Colors - Secondary */
  --color-secondary-100: var(--color-secondary-100);
  --color-secondary-200: var(--color-secondary-200);
  --color-secondary-300: var(--color-secondary-300);
  --color-secondary-400: var(--color-secondary-400);
  --color-secondary-500: var(--color-secondary-500);
  --color-secondary-600: var(--color-secondary-600);
  --color-secondary-700: var(--color-secondary-700);
  --color-secondary-800: var(--color-secondary-800);
  --color-secondary-900: var(--color-secondary-900);

  /* Colors - Success */
  --color-success-100: var(--color-success-100);
  --color-success-200: var(--color-success-200);
  --color-success-300: var(--color-success-300);
  --color-success-400: var(--color-success-400);
  --color-success-500: var(--color-success-500);
  --color-success-600: var(--color-success-600);
  --color-success-700: var(--color-success-700);
  --color-success-800: var(--color-success-800);
  --color-success-900: var(--color-success-900);

  /* Colors - Warning */
  --color-warning-100: var(--color-waring-100);
  --color-warning-200: var(--color-waring-200);
  --color-warning-300: var(--color-waring-300);
  --color-warning-400: var(--color-waring-400);
  --color-warning-500: var(--color-waring-500);
  --color-warning-600: var(--color-waring-600);
  --color-warning-700: var(--color-waring-700);
  --color-warning-800: var(--color-waring-800);
  --color-warning-900: var(--color-waring-900);

  /* Colors - Error */
  --color-error-100: var(--color-error-100);
  --color-error-200: var(--color-error-200);
  --color-error-300: var(--color-error-300);
  --color-error-400: var(--color-error-400);
  --color-error-500: var(--color-error-500);
  --color-error-600: var(--color-error-600);
  --color-error-700: var(--color-error-700);
  --color-error-800: var(--color-error-800);
  --color-error-900: var(--color-error-900);

  /* Colors - Info */
  --color-info-100: var(--color-info-100);
  --color-info-200: var(--color-info-200);
  --color-info-300: var(--color-info-300);
  --color-info-400: var(--color-info-400);
  --color-info-500: var(--color-info-500);
  --color-info-600: var(--color-info-600);
  --color-info-700: var(--color-info-700);
  --color-info-800: var(--color-info-800);
  --color-info-900: var(--color-info-900);

  /* Spacing */
  --spacing-0: var(--spacing-0);
  --spacing-50: var(--spacing-50);
  --spacing-100: var(--spacing-100);
  --spacing-150: var(--spacing-150);
  --spacing-200: var(--spacing-200);
  --spacing-300: var(--spacing-300);
  --spacing-400: var(--spacing-400);
  --spacing-500: var(--spacing-500);
  --spacing-600: var(--spacing-600);
  --spacing-700: var(--spacing-700);
  --spacing-800: var(--spacing-800);
  --spacing-900: var(--spacing-900);
  --spacing-1000: var(--spacing-1000);

  /* Border Radius */
  --radius-none: var(--radius-none);
  --radius-xs: var(--radius-xs);
  --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg);
  --radius-xl: var(--radius-xl);
  --radius-full: var(--radius-full);

  /* Font Family */
  --font-primary: var(--typography-fontfamily-primary);
  --font-secondary: var(--typography-fontfamily-secondary);

  /* Font Size */
  --text-200: var(--typography-fontsize-200);
  --text-300: var(--typography-fontsize-300);
  --text-400: var(--typography-fontsize-400);
  --text-500: var(--typography-fontsize-500);
  --text-600: var(--typography-fontsize-600);
  --text-700: var(--typography-fontsize-700);
  --text-800: var(--typography-fontsize-800);
  --text-900: var(--typography-fontsize-900);

  /* Breakpoints */
  --breakpoint-xs: var(--breakpoint-xs);
  --breakpoint-sm: var(--breakpoint-sm);
  --breakpoint-md: var(--breakpoint-md);
  --breakpoint-lg: var(--breakpoint-lg);
  --breakpoint-xl: var(--breakpoint-xl);
  --breakpoint-xxl: var(--breakpoint-xxl);
}
`

  writeFileSync(OUT_CSS, css)
  console.log(`✓  Generated CSS tokens → ${OUT_CSS}`)
  console.log('✅ Done! Tokens are ready to use.')
}

main().catch((err) => {
  console.error('❌ Error:', err)
  process.exit(1)
})
