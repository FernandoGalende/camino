import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack, type StackProps } from "./Stack";

const Box = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-[var(--radius-md)] px-4 py-2 text-sm font-bold ${className}`}>
    {children}
  </div>
);

const meta = {
  title: "Components/Stack",
  component: Stack,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["row", "column", "row-reverse", "column-reverse"],
    },
    spacing: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch", "baseline"],
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around", "evenly"],
    },
    wrap: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Column: Story = {
  args: {
    direction: "column",
    spacing: "md",
  },
  render: (args: StackProps) => (
    <Stack {...args}>
      <Box className="bg-[var(--color-primary-400)] text-[var(--color-primary-900)]">
        Item 1
      </Box>
      <Box className="bg-[var(--color-primary-400)] text-[var(--color-primary-900)]">
        Item 2
      </Box>
      <Box className="bg-[var(--color-primary-400)] text-[var(--color-primary-900)]">
        Item 3
      </Box>
    </Stack>
  ),
};

export const Row: Story = {
  args: {
    direction: "row",
    spacing: "md",
  },
  render: (args: StackProps) => (
    <Stack {...args}>
      <Box className="bg-[var(--color-secondary-400)] text-[var(--color-neutral-900)]">
        Item 1
      </Box>
      <Box className="bg-[var(--color-secondary-400)] text-[var(--color-neutral-900)]">
        Item 2
      </Box>
      <Box className="bg-[var(--color-secondary-400)] text-[var(--color-neutral-900)]">
        Item 3
      </Box>
    </Stack>
  ),
};

export const SpacingVariants: Story = {
  render: () => (
    <Stack direction="column" spacing="xl">
      {(["none", "xs", "sm", "md", "lg", "xl"] as const).map((spacing) => (
        <div key={spacing}>
          <p className="text-sm text-[var(--color-neutral-700)] mb-1">
            spacing="{spacing}"
          </p>
          <Stack direction="row" spacing={spacing}>
            <Box className="bg-[var(--color-info-300)]">A</Box>
            <Box className="bg-[var(--color-info-300)]">B</Box>
            <Box className="bg-[var(--color-info-300)]">C</Box>
          </Stack>
        </div>
      ))}
    </Stack>
  ),
};

export const Centered: Story = {
  args: {
    children: null,
    direction: "column",
    spacing: "md",
    align: "center",
    justify: "center",
  },
  render: (args: StackProps) => (
    <Stack
      {...args}
      className="h-[200px] w-[300px] border border-[var(--color-neutral-600)] rounded-[var(--radius-md)]">
      <Box className="bg-[var(--color-success-400)] text-[var(--color-success-900)]">
        Centered
      </Box>
      <Box className="bg-[var(--color-success-400)] text-[var(--color-success-900)]">
        Content
      </Box>
    </Stack>
  ),
};

export const SpaceBetween: Story = {
  render: () => (
    <Stack
      direction="row"
      justify="between"
      align="center"
      className="w-[400px] border border-[var(--color-neutral-600)] rounded-[var(--radius-md)] p-4">
      <span className="font-bold">Logo</span>
      <Stack direction="row" spacing="md">
        <span>Link 1</span>
        <span>Link 2</span>
        <span>Link 3</span>
      </Stack>
    </Stack>
  ),
};
