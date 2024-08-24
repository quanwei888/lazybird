import * as React from "react"

import {forwardRef} from "react";
import {Node} from "@/components/Canvas/Node.jsx";
import {NodeManager} from "@/lib/core/index.js";

export const UIComponent = forwardRef(({id,node, className = ""}, ref) => {
    return (
        <div ref={ref} id={id} className={className}>
            {id}
            {node && <Node node={node}/>}
        </div>
    )
})
