import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

export const TextSetting = ({attribute, currentValue, onChange}) => {
    return (
        <div className="flex text-gray-700  flex-row items-center">
            <Label htmlFor="status" className="text-sm w-24">{attribute.name}</Label>
            <Input id="name" className="w-40 h-8 bg-secondary" defaultValue={currentValue}
                   onBlur={(event) => onChange(event.target.value)}/>
        </div>
    )
}
