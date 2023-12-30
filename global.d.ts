declare module '*.module.scss' {
  type IClassNames = Record<string, string>
  const classNames: IClassNames
  export = classNames
}

declare module '*.svg' {
  import type * as React from 'react'

  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >

  export default ReactComponent
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
