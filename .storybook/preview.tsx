import React, { useEffect } from 'react'
import type { Decorator, Preview } from '@storybook/react-vite'
import '../src/index.css'

const ThemeDecorator: Decorator = (Story, context) => {
  const theme = (context.globals['theme'] as string) || 'standard'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.backgroundColor =
      theme === 'eco' ? '#464436' : '#fdfcf4'
  }, [theme])

  return <Story />
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Design system theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'standard', title: 'Standard (Light)', icon: 'sun' },
          { value: 'eco', title: 'Eco (Dark)', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'standard',
  },
  decorators: [ThemeDecorator],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
