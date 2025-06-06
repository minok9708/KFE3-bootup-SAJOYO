import type { Meta, StoryObj } from '@storybook/react'
import { IconTextButton } from './IconTextButton'; 

const meta: Meta<typeof IconTextButton> = {
  title: 'Example/IconTextButton',
  component: IconTextButton,
  tags: ['autodocs'],
  args: {
    label: 'Click me',
    variant: 'primary',
    size: 'medium',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof IconTextButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    label: 'Tertiary',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Plus Only', // 실제로는 아이콘만 렌더됨
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled',
  },
};