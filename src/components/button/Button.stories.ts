// src/components/button/Button.stories.ts

/**************************************************************************************/

import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'
import Button from './Button.vue'

/**************************************************************************************/

const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'contrast', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'xl'] },
    iconPosition: { control: 'select', options: ['left', 'right'] },
    width: { control: 'select', options: ['fit', 'full'] },
  },
  args: {
    text: 'Button',
    variant: 'primary',
    size: 'md',
    onClick: fn(),
  },
} satisfies Meta<typeof Button>
export default meta

/**************************************************************************************/

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    text: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    text: 'Button',
  },
}

export const Contrast: Story = {
  args: {
    variant: 'contrast',
    text: 'Button',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    text: 'Button',
  },
}

export const Large: Story = {
  args: {
    text: 'Button',
    size: 'xl',
  },
}

export const Small: Story = {
  args: {
    text: 'Button',
    size: 'sm',
  },
}
