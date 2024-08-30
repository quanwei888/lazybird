import {Label} from "@/components/ui/label";
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useState} from "react";

interface Size {
    tag: string;
    size: string;
}

interface Props {
    name: string,
    currentValue: string;
    onChange: (value: string) => void;
}

export const SizeSetting: React.FC<Props> = ({name, currentValue, onChange}) => {
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

        const size2str = (size: Size): string => {
            let value = "";
            const prefix = name == "height" ? "h-" : "w-";
            if (size.tag == "Hug") {
                value = prefix + "fit";
            }
            if (size.tag == "Fill") {
                value = prefix + "full";
            }
            if (size.tag == "Extra") {
                value = `${prefix}${size.size}`;
            }
            return value;
        }
        const str2size = (value: string): Size => {
            const prefix = name == "height" ? "h-" : "w-";
            if (value === `${prefix}fit`) {
                return {tag: "Hug", size: ""};
            }
            if (value === `${prefix}full`) {
                return {tag: "Fill", size: ""};
            }
            if (value.startsWith(prefix)) {
                return {tag: "Extra", size: value.replace(prefix, "")};
            }
            return {tag: "", size: ""};
        }

        const handleTagChange = (tagValue: string) => {
            setValue({
                tag: tagValue,
                size: value.size,
            });
            if (tagValue === 'Extra') {
                return;
            } else {
                onChange(size2str({
                    tag: tagValue,
                    size: value.size,
                }));
            }
        };

        const handleSizeChange = (sizeValue: string) => {
            setValue({
                tag: value.tag,
                size: sizeValue,
            });
            onChange(size2str({
                tag: value.tag,
                size: sizeValue,
            }));
        };

        const [value, setValue] = useState<Size>(str2size(currentValue));
        const {tag, size} = value;

        return (
            <div className="flex text-gray-700 flex-row items-center space-x-1">
                <Label htmlFor="status" className="text-sm text-gray-700 w-24">{name}</Label>
                <Tabs defaultValue={tag} onValueChange={handleTagChange} className="">
                    <TabsList className="grid-cols-2 text-sm h-8">
                        <TabsTrigger className="py-1 h-5 px-3" value="Hug">Hug</TabsTrigger>
                        <TabsTrigger className="py-1 h-5 px-3" value="Fill">Fill</TabsTrigger>
                        <TabsTrigger className="py-1 h-5 px-3" value="Extra">Extra</TabsTrigger>
                    </TabsList>
                </Tabs>
                {tag === "Extra" && <Select value={size} onValueChange={handleSizeChange}>
                    <SelectTrigger className="w-16 h-8">
                        <SelectValue placeholder={size}/>
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
    }
;
