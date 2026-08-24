"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext, useController } from "react-hook-form";
import * as z from "zod";
import { Checkbox } from "@/components/core/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/core/ui/form";



export const FormCheckBox = (props: any) => {
    const { name, items, classes, ...rest } = props;
    const { control } = useFormContext();


    return (
        <FormField
            control={control}
            name={name}
            render={() => (
                <FormItem>
                    <FormLabel className="text-base flex justify-start">{props?.label}</FormLabel>
                    <div className={classes}>
                        <FormField
                            key={props?.label}
                            control={control}
                            name={name}
                            render={({ field }) => {
                                return (
                                    <FormItem
                                        key={props?.label}
                                        className="flex flex-row items-center gap-1 w-full"
                                    >
                                        <div className={`flex items-center gap-1 w-full`}>
                                            <FormControl>
                                                <Checkbox
                                                    className="border-gray-300 data-[state=checked]:bg-theme-primary-600 data-[state=checked]:text-white"
                                                    checked={field.value}

                                                    onCheckedChange={(field.onChange as any)}
                                                    {...rest}
                                                />
                                            </FormControl>
                                            <p className="text-sm">
                                                {props?.description}
                                            </p>
                                        </div>
                                    </FormItem>
                                );
                            }}
                        />
                    </div>
                </FormItem>
            )}
        />
    );
};