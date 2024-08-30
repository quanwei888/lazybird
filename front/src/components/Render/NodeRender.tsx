import React, {forwardRef, ReactNode} from 'react';
import * as Core from "@/lib/core/node.ts";


interface UIProps {
    children?: ReactNode;
    id: string;
    props?: Record<string, any>
}

function cs(obj: Record<string, any>): any[] {
    return Object.values(obj).flatMap(value =>
        typeof value === 'object' && value !== null ? cs(value) : value
    );
}


export const UIComponent = forwardRef<HTMLElement, UIProps>(({children, id, props = {}}, ref) => {
    const {css, selectable, ...rest} = props;
    const className = props.css ? Object.values(props.css).join(' ') : "";


    return (
        <div
            ref={ref as React.Ref<HTMLDivElement>} id={id}
            {...(selectable ? {'data-selectable': true} : {})}
            className={className} {...rest}
        >
            {children}{id}
        </div>
    );
});

export const UIStack = forwardRef<HTMLElement, UIProps>(({children, id, props = {}}, ref) => {
    const {css, selectable, ...rest} = props;
    const className = props.css ? cs(props.css).join(' ') : "";

    console.log("Class name", className);

    return (
        <div
            ref={ref as React.Ref<HTMLDivElement>} id={id}
            {...(selectable ? {'data-selectable': true} : {})}
            className={className} {...rest}
        >
            {children}{id}
        </div>
    );
});

export const UILabel = forwardRef<HTMLSpanElement, UIProps>(({id, props = {}}, ref) => {
    const {css, selectable, ...rest} = props;
    const className = props.css ? Object.values(props.css).join(' ') : "";
    const text = props.text || "";


    return (
        <span ref={ref} id={id}
              {...(selectable ? {'data-selectable': true} : {})}
              className={className} {...rest}>
            {text}11
        </span>
    );
});

interface NodeRenderProps {
    children?: ReactNode;
    node: Core.Node;
}

const NodeRender = forwardRef<HTMLElement, NodeRenderProps>(({children, node}, ref) => {
    const nodeType = Core.getNodeTypeByNode(node);

    if (!nodeType) {
        return <div>Error: Node type not found</div>;
    }
    console.log(`Rendering Node ${node.id}`);

    return (
        <>
            {nodeType.render === 'LabelRender' &&
                <UILabel ref={ref} id={node.id} props={node.props}>{children}</UILabel>}
            {nodeType.render === 'StackRender' &&
                <UIStack ref={ref} id={node.id} props={node.props}>{children}</UIStack>}
            {nodeType.render === 'ComponentRender' &&
                <UIStack ref={ref} id={node.id} props={node.props}>{children}</UIStack>}
        </>
    );
});

export default NodeRender;
