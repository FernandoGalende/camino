import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary Button',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    label: 'Outline Button',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost Button',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small Button',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large Button',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true,
  },
}
