import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'

import { cn } from '@/lib/utils'

type ToggleGroupItemProps = ToggleGroupPrimitive.ToggleGroupItemProps

const ToggleGroup = ToggleGroupPrimitive.Root

const ToggleGroupItem = ({ className, ...props }: ToggleGroupItemProps) => (
	<ToggleGroupPrimitive.Item
		className={cn(
			'inline-flex h-11 min-w-[140px] items-center justify-center rounded-full border border-border bg-card px-6 text-base font-semibold transition-all',
			'data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-lg data-[state=on]:ring-2 data-[state=on]:ring-ring',
			'hover:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
			className
		)}
		{...props}
	/>
)

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
