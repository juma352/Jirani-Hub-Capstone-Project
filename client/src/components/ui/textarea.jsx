<<<<<<< HEAD
import React from 'react'
=======
import * as React from "react"
import { cn } from "../../lib/utils"
>>>>>>> 1a8dccf6301d4f2a20e219037a19ad689ba280eb

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
<<<<<<< HEAD
      ref={ref}
      className={`resize-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
=======
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
>>>>>>> 1a8dccf6301d4f2a20e219037a19ad689ba280eb
      {...props}
    />
  )
})
<<<<<<< HEAD

Textarea.displayName = 'Textarea'

export { Textarea }
=======
Textarea.displayName = "Textarea"

export { Textarea }
>>>>>>> 1a8dccf6301d4f2a20e219037a19ad689ba280eb
