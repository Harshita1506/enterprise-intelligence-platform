import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full text-sm font-medium tracking-tight transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(135deg,#38bdf8_0%,#3b82f6_55%,#06b6d4_100%)] text-white shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_8px_24px_-8px_rgba(59,130,246,0.55)] hover:-translate-y-0.5 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.3)_inset,0_14px_32px_-8px_rgba(56,189,248,0.6)] active:translate-y-0",
        outline:
          "glass-panel text-foreground/90 hover:text-foreground hover:border-white/20 hover:bg-white/[0.06]",
        ghost:
          "text-muted-foreground hover:text-foreground hover:bg-white/5",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-12 px-7",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)