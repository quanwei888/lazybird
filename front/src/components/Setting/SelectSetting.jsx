import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Label} from "@/components/ui/label";

export const SelectSetting = ({attribute, currentValue, onChange}) => {
    return (
        <div className="flex text-gray-700 flex-row items-center">
            <Label htmlFor="status" className="text-xs w-24">{attribute.name}</Label>
            <Select value={currentValue} onValueChange={onChange} className="p-0">
                <SelectTrigger className="max-w-40 w-full h-8">
                    <SelectValue placeholder={attribute.name}/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {Object.entries(attribute.mapping).map(([key, value]) => (
                            <SelectItem key={key} value={key}>{key}</SelectItem>
                        ))
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
