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

interface Props {
    name: string;
    mapping: Record<string, string>;
    currentValue: string;
    onChange: (value: string) => void;
}

export const SelectSetting: React.FC<Props> = ({name, mapping, currentValue, onChange}) => {
    return (
        <div className="flex text-gray-700 flex-row items-center">
            <Label htmlFor="status" className="text-xs w-24">{name}</Label>
            <Select value={currentValue} onValueChange={onChange}>
                <SelectTrigger className="max-w-40 w-full h-8">
                    <SelectValue placeholder={name}/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {Object.entries(mapping).map(([key, value]) => (
                            <SelectItem key={key} value={key}>{key}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};
