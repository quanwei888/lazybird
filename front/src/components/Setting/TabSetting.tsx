import React from 'react';
import {Label} from "@/components/ui/label";
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

interface Props {
    name: string;
    mapping: Record<string, string>;
    currentValue: string;
    onChange: (value: string) => void;
}

export const TabSetting: React.FC<Props> = ({name, mapping, currentValue, onChange}) => {
    console.log("currentValue", currentValue);
    return (
        <div className="flex text-gray-700 flex-row items-center">
            <Label htmlFor="status" className="text-sm text-gray-700 w-24">{name}</Label>
            <Tabs defaultValue={currentValue} onValueChange={onChange} className="">
                <TabsList className="grid-cols-2 text-sm h-8">
                    {Object.entries(mapping).map(([key, value]) => (
                        <TabsTrigger key={key} className="py-1 h-5 px-3" value={value}>{key}</TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    );
}
