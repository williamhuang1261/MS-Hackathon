import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const labelVariants = cva('text-sm font-semibold text-foreground', {
  variants: {
    muted: {
      true: 'text-muted-foreground font-medium',
      false: 'text-foreground',
    },
  },
  defaultVariants: {
    muted: false,
  },
})

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, muted, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(labelVariants({ muted }), className)}
      {...props}
    />
  )
)
Label.displayName = 'Label'

export { Label }
