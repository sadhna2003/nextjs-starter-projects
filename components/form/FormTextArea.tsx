"use client"
import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/core/ui/form"
import { Textarea } from "@/components/core/ui/textarea"

export function FormTextArea(props: any) {
  const { control } = useFormContext();
  return (
        <FormField
          control={control}
          name={props.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-start">{props.label}
              {props.required && <span className="text-red-500 ml-1">*</span>}</FormLabel>
              <FormControl>
                <Textarea className={`min-h-[80px] ${props.className}`}
                  placeholder={props.placeholder}
                  onFocus={props.onFocus}
                  {...field}
                  maxLength={props.maxLength}
                  rows={props.rows}
                  onBlur={props.onBlur}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
  )
}