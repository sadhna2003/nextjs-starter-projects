"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/core/ui/use-toast";
import { PageTitle } from "@/components/common/PageTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/core/ui/tabs";
import { Form } from "@/components/core/ui/form";
import { Button } from "@/components/core/ui/button";
import { FormInput } from "@/components/form/FormInput";
import { Skeleton } from "@/components/core/ui/skeleton";
import updateProfileSchema from "@/schema/update-profile.schema";
import changePasswordSchema from "@/schema/change-password.schema";
import { UpdateProfileFormValue, ChangePasswordFormValue } from "@/types/profile";
import { PROFILE_FORM_CONTENT, PROFILE_TABS } from "@/constants/profile.constants";
import { authService } from "@/api/auth/auth.service";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  // Fetch current user profile
  const {
    data: userProfile,
    isLoading: isLoadingProfile,
    isError: isProfileError,
    error: profileError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => authService.getMe(),
  });

  // Update profile form
  const profileForm = useForm<UpdateProfileFormValue>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  // Change password form
  const passwordForm = useForm<ChangePasswordFormValue>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Update profile mutation
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useMutation({
    mutationFn: (data: UpdateProfileFormValue) => {
      return authService.updateProfile(data);
    },
    onSuccess: () => {
      toast({
        variant: "success",
        description: "Profile updated successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        description: error?.message || "Failed to update profile.",
      });
    },
  });

  // Change password mutation
  const { mutate: changePassword, isPending: isChangingPassword } = useMutation({
    mutationFn: (data: ChangePasswordFormValue) => {
      return authService.changePassword(data);
    },
    onSuccess: () => {
      toast({
        variant: "success",
        description: "Password changed successfully!",
      });
      passwordForm.reset();
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        description: error?.message || "Failed to change password.",
      });
    },
  });

  // Populate profile form with user data
  useEffect(() => {
    if (userProfile && !isLoadingProfile) {
        profileForm.reset({
           ...userProfile,
        });
    }
  }, [profileForm, userProfile, isLoadingProfile]);

  const onProfileSubmit = (data: UpdateProfileFormValue) => {
    updateProfile(data);
  };

  const onPasswordSubmit = (data: ChangePasswordFormValue) => {
    changePassword(data);
  };

  console.log("profile form value" , profileForm.getValues());
  
  return (
    <div className="container max-w-2xl">
      <div className="space-y-6">
        {/* Header */}
        <PageTitle
          title="Profile"
          description="Manage your profile and account settings"
          isLoading={isLoadingProfile}
        />

        {/* Tabs */}
        {isLoadingProfile ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            defaultValue="profile"
          >
            <TabsList className="grid w-full grid-cols-2">
              {PROFILE_TABS.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Update Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Form {...profileForm}>
                <form
                  onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                  className="space-y-6"
                >
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
                    readOnly
                  />

                  {/* Phone */}
                  <FormInput
                    name="phone"
                    label="Phone"
                    placeholder="Enter phone number"
                    required
                    readOnly
                  />

                  {/* Form Actions */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isUpdatingProfile || isLoadingProfile}
                    >
                      {isUpdatingProfile && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Save Changes
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isUpdatingProfile || isLoadingProfile}
                      onClick={() => {
                        if (userProfile) {
                          profileForm.reset({
                            firstName: userProfile.firstName || "",
                            lastName: userProfile.lastName || "",
                            email: userProfile.email || "",
                            phone: userProfile.phone || "",
                          });
                        }
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                </form>
              </Form>
            </TabsContent>

            {/* Change Password Tab */}
            <TabsContent value="password" className="space-y-6">
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                  className="space-y-6"
                >
                  {/* Old Password */}
                  <FormInput
                    name="oldPassword"
                    label="Old Password"
                    type="password"
                    placeholder="Enter your current password"
                    required
                  />

                  {/* New Password */}
                  <FormInput
                    name="password"
                    label="New Password"
                    type="password"
                    placeholder="Enter new password (min 8 chars, 1 uppercase, 1 special char)"
                    required
                  />

                  {/* Confirm Password */}
                  <FormInput
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="Re-enter your new password"
                    required
                  />

                  {/* Form Actions */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isChangingPassword}
                    >
                      {isChangingPassword && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Change Password
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isChangingPassword}
                      onClick={() => passwordForm.reset()}
                    >
                      Reset
                    </Button>
                  </div>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
