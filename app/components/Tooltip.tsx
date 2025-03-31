import { useState } from "react";
import {
  useHover,
  useFloating,
  useInteractions,
  offset,
  FloatingPortal,
} from "@floating-ui/react";

type TooltipProps = {
  children: React.ReactNode;
  label: string;
  className?: string;
};

export default function Tooltip({ children, label, className }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom",
    middleware: [offset(5)],
  });

  const hover = useHover(context);
  const { getReferenceProps } = useInteractions([hover]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={className}
      >
        {children}
      </div>
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="rounded-md bg-gray-800 px-2 py-1 text-sm text-white"
          >
            {label}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
