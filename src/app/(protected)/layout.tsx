import { PropsWithChildren } from "react"

const layout = ({children}:PropsWithChildren) => {
  return (
    <div className="w-full min-h-screen">{children}</div>
  )
}

export default layout