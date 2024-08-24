import * as React from "react"

import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {forwardRef} from "react";

export const UICard = forwardRef(({id, className, title = "Title"}, ref) => {
    return (
        <Card ref={ref} id={id} className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
        </Card>
    )
})
