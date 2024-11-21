import type { ComponentProps } from 'react'
import { SiteHeader } from '@/components/site-header'

type Props = ComponentProps<'div'>

export const Layout = (props: Props) => {
  return (
    <div className="flex min-h-screen flex-col gap-8 pb-8">
      <SiteHeader />
      {props.children}
    </div>
  )
}
