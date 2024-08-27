import * as React from "react";
import { forwardRef, ReactNode } from "react";
import { Node } from "@/components/Canvas/Node.tsx";
import { NodeManager } from "@/lib/core/index.ts";

interface UILabelProps {
    children?: ReactNode;
    id: string;
    className?: string;
    text?: string;
}

export const UILabel = forwardRef<HTMLSpanElement, UILabelProps>(({ children, id, className = "", text = "" }, ref) => {
    return (
        <span ref={ref} id={id} className={className}>
            {text}
            {children}
        </span>
    );
});
