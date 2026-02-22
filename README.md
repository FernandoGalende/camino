# Camino Components

Librería de componentes React con Tailwind CSS y Storybook.

## Tech Stack

- **React 19** + TypeScript
- **Vite** - Build tool
- **Tailwind CSS v4** - Estilos
- **Storybook 10** - Documentación y desarrollo de componentes

## Desarrollo

```bash
# Instalar dependencias
pnpm install

# Ejecutar Storybook
pnpm storybook

# Ejecutar la app de desarrollo
pnpm dev

# Build de producción
pnpm build

# Build de Storybook
pnpm build-storybook
```

## Estructura

```
src/
  components/
    Button/
      Button.tsx          # Componente
      Button.stories.ts   # Stories
      index.ts            # Barrel export
    index.ts              # Barrel export general
```
