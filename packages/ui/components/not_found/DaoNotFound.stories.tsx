import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoNotFound } from './DaoNotFound'

export default {
  title: 'DAO DAO / packages / ui / components / not_found / DaoNotFound',
  component: DaoNotFound,
} as ComponentMeta<typeof DaoNotFound>

const Template: ComponentStory<typeof DaoNotFound> = (args) => (
  <DaoNotFound {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}