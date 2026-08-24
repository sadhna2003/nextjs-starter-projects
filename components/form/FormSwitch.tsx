"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/core/ui/form";
import { Switch } from "@/components/core/ui/switch";
import { Label } from "@/components/core/ui/label";

export const CustomSwitch = (props: any) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex items-center space-x-1">
              <Switch
                id="leftover"
                checked={props.checked || field.value}
                onCheckedChange={(val) =>{props.onChange? props.onChange(val): field.onChange(val)}}
                disabled={field.disabled || props.disabled}
                value={field.value}
                className="data-[state=checked]:bg-theme-primary-500"
              />
              <Label htmlFor="leftover" className="font-medium">
                {props.label}
              </Label>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};