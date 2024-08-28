import { Label } from "@/components/ui/label";
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import {Attribute} from "@/lib/core";

interface SizeSettingProps {
    attribute: Attribute;
    currentValue: { tag: string; size: string };
    onChange: (value: { tag: string; size: string }) => void;
}

export const SizeSetting: React.FC<SizeSettingProps> = ({ attribute, currentValue, onChange }) => {
    const [value, setValue] = useState(currentValue);
    const { tag, size } = value;

    const options = (): string[] => {
        const sizes: string[] = [];
        let value = 0;
        let increment = 2; // 初始增量

        while (value <= 1280) {
            sizes.push(value.toString());
            value += increment;

            // 根据范围调整增量
            if (value >= 16 && value < 128) {
                increment = 16;
            } else if (value >= 128 && value < 512) {
                increment = 32;
            } else if (value >= 512) {
                increment = 64;
            }
        }

        return sizes;
    };

    const handleTagChange = (value: string) => {
        setValue({
            tag: value,
            size: size,
        });
        if (value === 'Extra') {
            return;
        } else {
            onChange({
                tag: value,
                size: size,
            });
        }
    };

    const handleSizeChange = (value: string) => {
        setValue({
            tag: tag,
            size: value,
        });
        onChange({
            tag: tag,
            size: value,
        });
    };

    return (
        <div className="flex text-gray-700 flex-row items-center space-x-1">
            <Label htmlFor="status" className="text-sm text-gray-700 w-24">{attribute.name}</Label>
            <Tabs defaultValue={tag} onValueChange={handleTagChange} className="">
                <TabsList className="grid-cols-2 text-sm h-8">
                    <TabsTrigger className="py-1 h-5 px-3" value="Hug">Hug</TabsTrigger>
                    <TabsTrigger className="py-1 h-5 px-3" value="Fill">Fill</TabsTrigger>
                    <TabsTrigger className="py-1 h-5 px-3" value="Extra">Extra</TabsTrigger>
                </TabsList>
            </Tabs>
            {tag === "Extra" && <Select value={size} onValueChange={handleSizeChange}>
                <SelectTrigger className="w-16 h-8">
                    <SelectValue placeholder={size} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {options().map((key) => (
                            <SelectItem key={key} value={key}>{key}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>}
        </div>
    );
};
