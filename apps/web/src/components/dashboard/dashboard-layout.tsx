"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  CalendarLove02Icon,
  Chart03Icon,
  DashboardSquareSettingIcon,
  HelpCircleIcon,
  Invoice02Icon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const sidebarLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: DashboardSquareSettingIcon,
  },
  { label: "Chat", href: "/dashboard/chat", icon: CalendarLove02Icon },
  {
    label: "Order Management",
    href: "/dashboard/orders",
    icon: Invoice02Icon,
  },
  {
    label: "Reports & Analytics",
    href: "/dashboard/reports",
    icon: Chart03Icon,
  },
  { label: "Settings", href: "/dashboard/settings", icon: Settings02Icon },
];

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <header className="bg-background sticky top-0 z-40 flex h-16 w-full items-center gap-4 border-b p-4">
        <SidebarTrigger className="self-end" />
        <Link
          href="/"
          className="mr-auto shrink-0 flex gap-2 not-link items-center"
        >
          <Image
            src="/logo/logo.svg"
            alt="Scholarkit Logo"
            width={180}
            height={40}
            className="h-6 w-auto object-contain"
          />
          <h2>Scholarkit</h2>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="rounded-full" size="icon" variant="ghost">
              <HugeiconsIcon icon={HelpCircleIcon} className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Help</p>
          </TooltipContent>
        </Tooltip>
        <ProfileMenu name="John Doe" />
      </header>

      <div className="flex min-h-[calc(100vh-var(--spacing)*16)]">
        <Sidebar
          className="sticky top-16 h-[calc(100vh-var(--spacing)*16)]"
          collapsible="icon"
        >
          <SidebarContent className="p-4 group-data-[collapsible=icon]:p-2">
            <SidebarMenu>
              {sidebarLinks.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    size="lg"
                    className="text-gray-500 group-data-[collapsible=icon]:justify-center"
                    tooltip={item.label}
                    isActive={
                      (pathname === "/dashboard" &&
                        item.href === "/dashboard") ||
                      (pathname.startsWith(item.href) &&
                        item.href !== "/dashboard")
                    }
                    asChild
                  >
                    <Link href={item.href}>
                      <HugeiconsIcon icon={item.icon} />
                      <span className="group-data-[collapsible=icon]:sr-only">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter
            className="hidden text-xs group-data-[collapsible=icon]:block"
            style={{ writingMode: "sideways-lr" }}
          >
            Scholarkit Inc
          </SidebarFooter>
        </Sidebar>
        <div className="container mx-auto grow p-4">{children}</div>
      </div>
    </SidebarProvider>
  );
};

type ProfileMenuProps = {
  name: string;
  image?: string;
  handle?: string;
};

const ProfileMenu = ({ name, image, handle }: ProfileMenuProps) => {
  const initials = name
    ?.split(" ")
    .map((word) => word[0])
    .join("");

  const handleLogout = async () => {
    const logoutPromise = authClient.signOut({
      fetchOptions: {
        onSuccess: () => window.location.replace("/login"),
      },
    });
    toast.promise(logoutPromise, {
      loading: "Logging out...",
      success: "Logged out successfully",
      error: "Failed to log out",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 rounded-full bg-gray-50 has-[>svg]:px-1"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={image} />
            <AvatarFallback className="capitalize">{initials}</AvatarFallback>
          </Avatar>
          <span className="max-sm:hidden">{name}</span>
          <HugeiconsIcon icon={ArrowDown01Icon} className="max-sm:hidden" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {handle}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} data-variant="destructive">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
