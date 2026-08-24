"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/core/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/core/ui/select";
import { useFormContext } from "react-hook-form";
export const Customdropdown = (props: any) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.dropdownlabel}{props.required && <span className="text-red-500 ml-1">*</span>}</FormLabel>
          <Select
            onValueChange={field.onChange}
            disabled={props.readOnly}
            defaultValue={props.options?.[0]?.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger className={["border-gray-300", props.classes].join(" ")}>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {props?.options?.map((data: any, index: any) => {
                return (
                  <SelectItem value={data.value} key={index}>
                    {data.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};