import type { Meta, StoryObj } from '@storybook/react-vite'
import { Sun, ArrowRight, ChevronDown, Plus, Search } from 'lucide-react'
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
    children: {
      control: 'text',
    },
  },
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// -- Variants --

export const Primary: Story = {
  args: { variant: 'primary' },
}

export const Secondary: Story = {
  args: { variant: 'secondary' },
}

export const Outline: Story = {
  args: { variant: 'outline' },
}

export const Ghost: Story = {
  args: { variant: 'ghost' },
}

// -- Sizes --

export const Large: Story = {
  args: { size: 'lg' },
}

export const Medium: Story = {
  args: { size: 'md' },
}

export const Small: Story = {
  args: { size: 'sm' },
}

// -- With icons --

export const WithPrefix: Story = {
  args: {
    prefix: <Sun size={24} />,
  },
}

export const WithSuffix: Story = {
  args: {
    suffix: <ArrowRight size={24} />,
  },
}

export const WithPrefixAndSuffix: Story = {
  args: {
    prefix: <Search size={24} />,
    suffix: <ChevronDown size={24} />,
  },
}

// -- States --

export const Disabled: Story = {
  args: { disabled: true },
}

// -- All variants grid --

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-[24px]">
      {(['primary', 'secondary', 'outline', 'ghost'] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-[16px]">
          {(['lg', 'md', 'sm'] as const).map((size) => (
            <Button key={`${variant}-${size}`} variant={variant} size={size}>
              Button
            </Button>
          ))}
          <Button variant={variant} size="md" prefix={<Sun size={24} />}>
            Button
          </Button>
          <Button variant={variant} size="md" suffix={<ArrowRight size={24} />}>
            Button
          </Button>
          <Button variant={variant} size="md" disabled>
            Button
          </Button>
        </div>
      ))}
    </div>
  ),
}

// -- Icon examples --

export const IconExamples: Story = {
  render: () => (
    <div className="flex items-center gap-[16px]">
      <Button prefix={<Plus size={24} />}>Create</Button>
      <Button variant="secondary" prefix={<Search size={24} />}>Search</Button>
      <Button variant="outline" suffix={<ChevronDown size={24} />}>Options</Button>
      <Button variant="ghost" prefix={<Sun size={24} />}>Theme</Button>
    </div>
  ),
}
