"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import userFormSchema from "@/schema/user-form.schema";
import { UserFormValue } from "@/types/user-form";
import { FormInput } from "@/components/form/FormInput";
import { Customdropdown } from "@/components/form/Formdropdown";
import { Form } from "@/components/core/ui/form";
import { Button } from "@/components/core/ui/button";
import { Skeleton } from "@/components/core/ui/skeleton";
import { useToast } from "@/components/core/ui/use-toast";
import { PageTitle } from "@/components/common/PageTitle";
import { userService } from "@/api/user/user.service";
import { USER_FORM_CONTENT, USER_ROLES } from "@/constants/user-form.constants";
import { Loader2 } from "lucide-react";

export default function UserPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const userId = searchParams.get("id");
  const mode = userId ? "edit" : "add";
  const content = USER_FORM_CONTENT[mode];
  const form = useForm<UserFormValue>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UserFormValue) => {
      if (userId !== null) {
        // Update user
        return userService.updateUser(userId, data);
      } else {
        // Create user
        return userService.createUser(data);
      }
    },
    onSuccess: (data: any) => {
      toast({
        variant: "success",
        description: data?.message || "User created successfully!",
      });
      router.push("/users");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        description: error?.message || "Failed to create user.",
      });
    },
  });

  const onSubmit = (data: UserFormValue) => {
    mutate(data);
  };

  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => userService.getUserForEdit(userId as string),
    enabled: !!userId,
  });

  useEffect(() => {
    if (userData && !isLoadingUser) {
      form.reset({ ...userData });
    }
  }, [form, userData, isLoadingUser]);

  return (
    <div className="container max-w-2xl">
      <div className="space-y-6">
        {/* Header */}
        <PageTitle
          title={content.title}
          description={content.description}
          isLoading={isLoadingUser}
        />

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                name="firstName"
                label="First Name"
                placeholder="Enter first name"
                required
              />
              <FormInput
                name="lastName"
                label="Last Name"
                placeholder="Enter last name"
                required
              />
            </div>

            {/* Email */}
            <FormInput
              name="email"
              label="Email"
              type="email"
              placeholder="Enter email address"
              required
            />

            {/* Phone */}
            <FormInput
              name="phone"
              label="Phone"
              placeholder="Enter phone number"
              required
            />

            {/* Role */}
            <Customdropdown
              name="role"
              dropdownlabel="Role"
              placeholder="Select a role"
              options={USER_ROLES}
              key={`role-dropdown-${userId}`} // Force remount when mode changes
              required
            />

            {/* Form Actions */}
            <div className="flex gap-4 pt-4 w-full justify-normal">
              <Button
                type="submit"
                disabled={isPending || isLoadingUser}
                className=""
              >
                {content.buttonText}
                {isPending && <Loader2 className="ml-2 animate-spin" />}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isPending || isLoadingUser}
                className=""
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
