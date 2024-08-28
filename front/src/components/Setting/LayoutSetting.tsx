import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface LayoutSettingProps {
    attribute: any;
    currentValue: {
        direction: string;
        position: string;
    };
    onChange: (value: { direction: string; position: string }) => void;
}

export const LayoutSetting: React.FC<LayoutSettingProps> = ({ attribute, currentValue, onChange }) => {
    const { direction, position } = currentValue;
    const directions = ["flex-row", "flex-col"];
    const positions: { [key: string]: string[] } = {
        "flex-row": [
            "justify-start items-start",
            "justify-center items-start",
            "justify-end items-start",
            "justify-start items-center",
            "justify-center items-center",
            "justify-end items-center",
            "justify-start items-end",
            "justify-center items-end",
            "justify-end items-end",
        ],
        "flex-col": [
            "justify-start items-start",
            "justify-start items-center",
            "justify-start items-end",
            "justify-center items-start",
            "justify-center items-center",
            "justify-center items-end",
            "justify-end items-start",
            "justify-end items-center",
            "justify-end items-end",
        ],
    };

    const validDirection = directions.includes(direction) ? direction : "flex-row";
    const validPosition = positions[validDirection].includes(position)
        ? position
        : positions[validDirection][0];

    const handleDirectionChange = (newDirection: string) => {
        const defaultPosition = positions[newDirection][0];
        onChange({ direction: newDirection, position: defaultPosition });
    };

    const handlePositionChange = (newPosition: string) => {
        onChange({ direction: validDirection, position: newPosition });
    };

    return (
        <div className="w-full space-y-2">
            <div className="flex flex-row items-center justify-between">
                <Label className="">Layout</Label>
            </div>
            <div className="w-full flex flex-row justify-between">
                <div className="grid grid-cols-3 gap-1">
                    {positions[validDirection].map((pos) => (
                        <button
                            key={pos}
                            onClick={() => handlePositionChange(pos)}
                            className={`flex items-center justify-center border h-6 w-6 ${
                                validPosition === pos ? "bg-neutral-500 text-primary-foreground" : "bg-white text-black"
                            }`}
                        >
                        </button>
                    ))}
                </div>
                <Tabs
                    value={direction}
                    onValueChange={(value) => handleDirectionChange(value)}
                >
                    <TabsList className="grid w-full grid-cols-2 h-8">
                        <TabsTrigger className="py-1 h-5 px-3" value="flex-row">Horizon</TabsTrigger>
                        <TabsTrigger className="py-1 h-5 px-3" value="flex-col">Vertical</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
        </div>
    );
}
