"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LogOut,
  User,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getUserFromCookies, getInitials } from "@/lib/auth-utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/core/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/core/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/core/ui/sheet";
import { Button } from "@/components/core/ui/button";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { authService } from "@/api/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { menuItems } from "./Sidebar";
import { toast } from "../ui/use-toast";

interface MenuItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function MobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = React.useState(false);
  const user = getUserFromCookies();

const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: () => {
      return authService.logout();
    },
    onSuccess: () => {
      setIsLogoutDialogOpen(false);
      toast({
         variant: "success",
        description: "You have been successfully logged out.",
      });
    },
    onError: () => {
      setIsLogoutDialogOpen(false);
      toast({
        variant: "destructive",
        description: "An error occurred while logging out. Please try again.",
      });
    },
  });

  const handleLogout = () => {
    setIsLogoutDialogOpen(true);
  };

  if (!user) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-4/5 p-0">
        <div className="flex h-full flex-col">
          {/* Logo Section */}
          <div className="flex h-16 items-center border-b px-4">
            <Image
              src="/logo-with-text.svg"
              alt="Logo"
              width={160}
              height={40}
              className="h-10"
            />
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* User Section */}
          <div className="border-t p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-3 rounded-lg p-2 transition-colors hover:bg-accent cursor-pointer">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 flex-col items-start text-left">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.role}</span>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex cursor-pointer items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </SheetContent>

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
        title="Logout Confirmation"
        description="Are you sure you want to logout? You will need to login again to access your account."
        onConfirm={logout}
        isLoading={isLoggingOut}
        confirmText="Logout"
        cancelText="Cancel"
        variant="destructive"
      />
    </Sheet>
  );
}
