import { MobileSidebar } from "@/components/core/sidebar/MobileSidebar";
import { Sidebar } from "@/components/core/sidebar/Sidebar";
import AuthGuard from "@/components/providers/AuthGuard";
import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:sticky lg:top-0 lg:h-screen">
          <Sidebar />
        </aside>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col">
          {/* Mobile Header with Sidebar Toggle */}
          <header className="flex flex-row-reverse h-16 items-center justify-between border-b px-4 lg:hidden shrink-0">
            <MobileSidebar />
            <Image
              src="/logo-with-text.svg"
              alt="Logo"
              width={160}
              height={40}
              className="h-10"
            />
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
