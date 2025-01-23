import * as React from "react";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

const InputLocation = React.forwardRef<
	HTMLInputElement,
	React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
	return (
		<div className="relative">
			<div className="text-red-500 absolute left-1 top-1/2 transform -translate-y-1/2 flex gap-1 items-center text-muted-foreground pl-1">
				<MapPin className="w-5 h-5" />
				<p className="font-normal text-[16px]">Delivery address:</p>
			</div>

			<input
				type={type}
				className={cn(
					"flex text-[14px] h-12 w-[18rem] rounded-md bg-background px-3 pl-[160px] py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
					className
				)}
				ref={ref}
				{...props}
				placeholder="Add location >"
			/>
		</div>
	);
});

InputLocation.displayName = "InputLocation";

export { InputLocation };
