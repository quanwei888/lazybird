import * as React from "react"

import {forwardRef} from "react";
import {Node} from "@/components/Canvas/Node.jsx";
import {NodeManager} from "@/lib/core/index.js";

export const UILabel = forwardRef(({children, id, className = "", text = ""}, ref) => {
    return (
        <span ref={ref} id={id} className={className}>
            {text}
            {children}
        </span>
    )
})
