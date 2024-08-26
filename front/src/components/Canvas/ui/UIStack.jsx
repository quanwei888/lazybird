import * as React from "react"

import {forwardRef} from "react";

export const UIStack = forwardRef(({children, id, className = ""}, ref) => {
    return (
        <div ref={ref} id={id} className={className}>
            {children}
        </div>
    )
})
