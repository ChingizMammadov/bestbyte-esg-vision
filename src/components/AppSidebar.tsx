
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LayoutDashboard, FileText, Cog, ChartBar, FolderOpen } from "lucide-react";
import React from "react";
import { useLocation, Link } from "react-router-dom";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Carbon Calculator", url: "/carbon-calculator", icon: FolderOpen },
  { title: "ESG Analytics", url: "/analytics", icon: ChartBar },
  { title: "Settings", url: "/settings", icon: Cog },
];

export function AppSidebar() {
  const { pathname } = useLocation();

  return (
    <div className="hidden lg:block">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-base font-bold text-primary tracking-tight mb-1">
              Menu
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className="transition-all duration-150"
                    >
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-primary/70 group-hover/menu-item:text-primary transition" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
