import { cn } from "@/lib/utils";

interface ThankYouHeaderProps {
  title?: string;
  subtitle?: string;
  align?: "left" | "center";
  compact?: boolean;
}

const ThankYouHeader = ({
  title = "THANK YOU JIMMY!",
  subtitle = "You just helped make a real difference in someone's life today.",
  align = "center",
  compact = false,
}: ThankYouHeaderProps) => {
  const alignmentClasses =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div
      className={cn(
        "w-full flex flex-col gap-6",
        compact ? "py-4" : "min-h-[18rem] justify-center",
        alignmentClasses
      )}
    >
      <h1 className={cn("text-primary font-semibold", compact ? "text-5xl" : "text-7xl")}>{title}</h1>
      <p className="text-xl text-primary font-medium max-w-2xl">{subtitle}</p>
    </div>
  );
};

export default ThankYouHeader;
