import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import React from "react";
import {MapStyleAttribute} from "@/lib/core";

interface SelectSettingProps {
    attribute: MapStyleAttribute;
    currentValue: string;
    onChange: (value: string) => void;
}

export const SelectSetting: React.FC<SelectSettingProps> = ({attribute, currentValue, onChange}) => {
    return (
        <div className="flex text-gray-700 flex-row items-center">
            <Label htmlFor="status" className="text-xs w-24">{attribute.name}</Label>
            <Select value={currentValue} onValueChange={onChange}>
                <SelectTrigger className="max-w-40 w-full h-8">
                    <SelectValue placeholder={attribute.name}/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {Object.entries(attribute.mapping).map(([key, value]) => (
                            <SelectItem key={key} value={key}>{key}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};
