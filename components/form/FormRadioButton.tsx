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
import { Item } from "@radix-ui/react-dropdown-menu";
import { useFormContext } from "react-hook-form";

export const CustomRadioButton = ({
  options,
  name,
  label,
  classes,
  placeholder,
  openside,
}: any) => {
  const { control } = useFormContext();
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-lg font-medium">{label}</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger
                  className={["border-gray-300 text-black text-2xl", classes].join(" ")}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent side="bottom" className="h-56">
                {options.map((item: any) => {
                  return (
                    <SelectItem
                      value={item.value}
                      className={
                        "font-medium text-2xl text-gray-600 w-60 h-10"}
                    >
                      {item.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
};