"use client";
import React, {useState} from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/core/ui/form";
import { Input } from "@/components/core/ui/input";
import { useFormContext } from "react-hook-form";
type InputProps = {
  value?: any;
  label?: string;
  type?: string;
  required?: boolean;
  readOnly?:boolean
  name?: string;
  placeholder?: string;
  classes?: string;
  min?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formatInput?: (value: string) => string | string[];
  id?:string;
  maxLength?:number
};

export const FormInput = (props: InputProps) => {
  const {
    label,
    type = "text",
    required = false,
    name,
    placeholder,
    classes,
    min,
    maxLength,
    onFocus,
    onBlur,
    onChange,
    formatInput,
    ...rest
  } = props;
  const { control } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      <FormField
        control={control}
        name={name ?? ""}
        render={({ field }) => {
           const handleInputChange = (
             e: React.ChangeEvent<HTMLInputElement>
           ) => {
              let inputValue: string | number = e.target.value;

             // Use the provided formatInput function if available
             const formattedValue = formatInput
               ? formatInput(inputValue)
               : inputValue;

               // If the type is number, convert the inputValue to a number
            if (type === "number") {
              inputValue = Number(inputValue);
            }

             // Set the formatted value
             field.onChange(formattedValue);

             // Call the onChange prop if provided
             if (onChange) {
               onChange(e);
             }
           };
          return (
            <FormItem>
              <FormLabel className={`form-label`}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </FormLabel>
              <FormControl>
                <div className="relative">
                <Input
                  placeholder={placeholder}
                  {...field}
                  type={showPassword ? 'text' : type}
                  min={min}
                  className={`text-theme-secondary ${classes}`}
                  maxLength={maxLength}
                  onFocus={onFocus}
                  onChange={handleInputChange}
                  {...rest}
                />
                {type === 'password' && (
                    <span
                      className="absolute top-1/2 transform -translate-y-1/2 cursor-pointer right-0 w-6 flex flex-row justify-center mr-4"
                      onClick={togglePasswordVisibility}
                    >
                      {/* {showPassword ? '👁️' : '🔒'} */}
                      {showPassword ? (
                        <div className="w-full h-full">
                          <img src="/icon/View.svg" alt="view" className="w-5 h-5"/>
                        </div>
                      ): (
                        <div className="w-full h-full">
                        <img src="/icon/hide.svg" alt="hide" className="w-5 h-5" />
                        </div>
                      )

                      }
                    </span>
                  )}
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          );
        }}
      />
    </div>
  );
};