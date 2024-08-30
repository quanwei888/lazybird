import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import React from "react";

interface TextSettingProps {
    name: string;
    currentValue: string;
    onChange: (value: string) => void;
}

export const TextSetting: React.FC<TextSettingProps> = ({name, currentValue, onChange}) => {
    return (
        <div className="flex text-gray-700 flex-row items-center">
            <Label htmlFor="status" className="text-sm w-24">{name}</Label>
            <Input
                id="name"
                className="w-40 h-8 bg-secondary"
                defaultValue={currentValue}
                onBlur={(event) => onChange(event.target.value)}
            />
        </div>
    );
};
