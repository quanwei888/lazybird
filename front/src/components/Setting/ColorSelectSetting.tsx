import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Label} from "@/components/ui/label";

interface Props {
    name: string;
    mapping: { [key: string]: string };
    currentValue: string;
    onChange: (value: string) => void;
}

export const ColorSelectSetting: React.FC<Props> = ({name, mapping, currentValue, onChange}) => {
    currentValue = currentValue.replace("text-", "").replace("bg-", "");
    const handleChange = (value: string) => {
        if (name == "color") {
            onChange("text-" + value);
        }
        if (name == "background") {
            onChange("bg-" + value);
        }
    };
    return (
        <div className="flex text-gray-700 flex-row items-center">
            <Label htmlFor="status" className="text-gray-900 bold text-sm w-24">{name}</Label>
            <Select value={currentValue} onValueChange={handleChange}>
                <SelectTrigger className="max-w-40 w-full h-8">
                    <SelectValue placeholder="Select Color"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {Object.entries(mapping).map(([key, value]) => (
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
