import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { cn } from '@/lib/utils'

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-3', className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'group relative flex w-full flex-col gap-2 rounded-2xl border border-border bg-card p-5 text-left transition-all hover:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'data-[state=checked]:border-ring data-[state=checked]:bg-primary/10 data-[state=checked]:shadow-lg',
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <RadioGroupPrimitive.Indicator className="inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-ring bg-background">
          <span className="h-3 w-3 rounded-full bg-ring" />
        </RadioGroupPrimitive.Indicator>
      </div>
      {children}
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
