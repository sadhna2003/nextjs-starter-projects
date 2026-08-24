"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/core/ui/button";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService, type UserUiModel } from "@/api/user/user.service";
import { useToast } from "@/components/core/ui/use-toast";
import { useRouter } from "next/navigation";
import { ActionsDropdown } from "@/components/common/ActionsDropdown";
import { UserCard } from "@/components/common/UserCard";
import { MobilePagination } from "@/components/common/MobilePagination";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Loader2 } from "lucide-react";

const Page = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | number | null>(
    null,
  );

  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch users with pagination
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", pagination.pageIndex, pagination.pageSize],
    queryFn: () =>
      userService.getUsers(pagination.pageIndex, pagination.pageSize),
    select: (data) => ({
      items: data.items,
      total: data.total,
    }),
  });

  // Delete user mutation
  const { mutate: deleteUser, isPending: isDeleting } = useMutation({
    mutationFn: (userId: string | number) => userService.deleteUser(userId),
    onSuccess: () => {
      toast({
        variant: "success",
        description: "User deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        description: error?.message || "Failed to delete user.",
      });
      setDeleteDialogOpen(false);
    },
  });

  // Update user status mutation
  const { mutate: updateStatus } = useMutation({
    mutationFn: ({
      userId,
      isActive,
    }: {
      userId: string | number;
      isActive: boolean;
    }) => userService.updateUser(userId, { isActive }),
    onSuccess: () => {
      toast({
        variant: "success",
        description: "User status updated successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        description: error?.message || "Failed to update user status.",
      });
    },
  });

  const handleEdit = (userId: string | number) => {
    router.push(`/users/edit?id=${userId}`);
  };

  const handleDelete = (userId: string | number) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete);
    }
  };

  const handleToggleStatus = (
    userId: string | number,
    currentStatus: string,
  ) => {
    const isActive = currentStatus === "inactive";
    updateStatus({ userId, isActive });
  };

  // Columns definition
  const columns: ColumnDef<UserUiModel>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className="w-20">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role") as string;
        return <span className="capitalize">{role || "User"}</span>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <ActionsDropdown
            id={user.id}
            status={user.status}
            onEdit={handleEdit}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
          />
        );
      },
    },
  ];

  const totalPages = data?.total
    ? Math.ceil(data.total / pagination.pageSize)
    : 0;

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage your users and their roles
          </p>
        </div>
        <Link href="/users/add">
          <Button>Add User</Button>
        </Link>
      </div>

      {/* Users Table */}
      <div className="space-y-2 lg:block hidden">
        <DataTable
          columns={columns}
          data={data?.items || []}
          isLoading={isLoading}
          skeletonRowCount={10}
          manualPagination={true}
          pageCount={totalPages}
          pagination={pagination}
          onPaginationChange={setPagination}
        />
      </div>

      <div className="lg:hidden block space-y-4">
        {/* Mobile View */}
        {isLoading ? (
          <div className="h-screen flex flex-col justify-center items-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4">
            {(data?.items || []).map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                email={user.email}
                role={user.role}
                status={user.status}
                onEdit={handleEdit}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDelete}
              />
            ))}
            <MobilePagination
              pagination={pagination}
              onPaginationChange={setPagination}
              pageCount={totalPages}
              totalItems={data?.total || 0}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
};

export default Page;
