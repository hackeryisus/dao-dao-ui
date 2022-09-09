import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeResponsiveNavigationContextDecorator } from '@dao-dao/storybook/decorators/makeResponsiveNavigationContextDecorator'

import { PageHeader } from './PageHeader'

export default {
  title: 'DAO DAO / packages / ui / components / layout / PageHeader',
  component: PageHeader,
  decorators: [makeResponsiveNavigationContextDecorator(false)],
} as ComponentMeta<typeof PageHeader>

const Template: ComponentStory<typeof PageHeader> = (args) => (
  <PageHeader {...args} />
)

export const Default = Template.bind({})
Default.args = {
  title: 'Title!',
}

export const Breadcrumbs = Template.bind({})
Breadcrumbs.args = {
  ...Default.args,
  title: undefined,
  breadcrumbs: {
    crumbs: [
      {
        href: '#',
        label: 'Home',
      },
      {
        href: '#',
        label: 'DAO !',
      },
    ],
    current: 'Here',
  },
}