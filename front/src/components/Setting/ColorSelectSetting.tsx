import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ColorSelectSettingProps {
    attribute: {
        name: string;
        mapping: { [key: string]: string };
    };
    currentValue: string;
    onChange: (value: string) => void;
}

export const ColorSelectSetting: React.FC<ColorSelectSettingProps> = ({ attribute, currentValue, onChange }) => {
    return (
        <div className="flex text-gray-700 flex-row items-center">
            <Label htmlFor="status" className="text-gray-900 bold text-sm w-24">{attribute.name}</Label>
            <Select value={currentValue} onValueChange={onChange}>
                <SelectTrigger className="max-w-40 w-full h-8">
                    <SelectValue placeholder={attribute.name} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {Object.entries(attribute.mapping).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                                <div className="flex space-x-2 flex-row items-center justify-between">
                                    <div className={`bg-${value} w-8 h-4`}></div>
                                    <span className={`text-${value}`}>{key}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};
