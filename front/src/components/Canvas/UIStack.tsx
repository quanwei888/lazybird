import * as React from "react";
import { forwardRef, ReactNode } from "react";

interface UIStackProps {
    children?: ReactNode;
    id: string;
    className?: string;
}

export const UIStack = forwardRef<HTMLDivElement, UIStackProps>(({ children, id, className = "" }, ref) => {
    return (
        <div ref={ref} id={id} className={className}>
            {children}
        </div>
    );
});
