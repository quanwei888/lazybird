import * as React from "react";

import {cn} from "@/lib/utils";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreVertical} from "lucide-react";


interface MenuButtonProps {
    className?: string;
    options?: Record<string, string>;
    onValueChange?: (value: string) => void;
    children?: React.ReactNode;
}

const MenuButton = React.forwardRef<
    HTMLElement,
    MenuButtonProps
>(({className, ...props}, ref) => {
    const {children, options = {}, onValueChange, ...rest} = props;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                    {children}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {Object.keys(options).map((key) => (
                    <DropdownMenuItem key={key} onSelect={() => onValueChange && onValueChange(key)}>
                        {options[key]}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>

    )
});

MenuButton.displayName = "Button";

export {MenuButton};