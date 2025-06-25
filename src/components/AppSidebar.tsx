
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { LayoutDashboard, FileText, Cog, ChartBar, FolderOpen, User, LogOut, Search, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { BestByteLogo } from "./BestByteLogo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { 
    title: "Reports", 
    url: "/reports", 
    icon: FileText,
    subItems: [
      { title: "Monthly Reports", url: "/reports/monthly" },
      { title: "Annual Reports", url: "/reports/annual" },
      { title: "Custom Reports", url: "/reports/custom" },
    ]
  },
  { title: "Carbon Calculator", url: "/carbon-calculator", icon: FolderOpen },
  { 
    title: "ESG Analytics", 
    url: "/analytics", 
    icon: ChartBar,
    subItems: [
      { title: "Environmental", url: "/analytics/environmental" },
      { title: "Social", url: "/analytics/social" },
      { title: "Governance", url: "/analytics/governance" },
    ]
  },
];

const settingsItems = [
  { title: "Settings", url: "/settings", icon: Cog },
];

export function AppSidebar() {
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActiveItem = (url: string) => pathname === url;
  const isParentActive = (item: any) => {
    if (isActiveItem(item.url)) return true;
    if (item.subItems) {
      return item.subItems.some((sub: any) => pathname === sub.url);
    }
    return false;
  };

  return (
    <div className="hidden lg:block w-[280px]">
      <Sidebar className="w-[280px] border-r border-slate-200/50">
        {/* Header with Logo */}
        <SidebarHeader className="border-b border-slate-200/50 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
          <Link to="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <BestByteLogo size="md" variant="dark" showText={true} />
          </Link>
        </SidebarHeader>

        <SidebarContent className="bg-gradient-to-b from-slate-50 to-gray-50 text-gray-800">
          {/* Search Bar */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search ESG data..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border border-slate-200 text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
              />
            </div>
          </div>

          <SidebarSeparator className="bg-slate-200/50" />

          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-600 font-semibold text-sm uppercase tracking-wider px-4 py-2">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainItems.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <div>
                      <SidebarMenuButton
                        asChild={!item.subItems}
                        isActive={isParentActive(item)}
                        className={`
                          group relative transition-all duration-200 mx-2 rounded-xl
                          ${isParentActive(item) 
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white border border-blue-600' 
                            : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 border border-transparent hover:border-blue-200'
                          }
                          ${item.subItems ? 'cursor-pointer' : ''}
                        `}
                        onClick={item.subItems ? () => toggleExpanded(item.title) : undefined}
                      >
                        {item.subItems ? (
                          <div className="flex items-center gap-3 w-full">
                            <item.icon className={`
                              w-5 h-5 transition-colors
                              ${isParentActive(item) ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}
                            `} />
                            <span className="font-medium">{item.title}</span>
                            <div className={`
                              ml-auto transition-transform duration-200
                              ${expandedItems.includes(item.title) ? 'rotate-180' : ''}
                            `}>
                              <ChevronDown className="w-3 h-3" />
                            </div>
                          </div>
                        ) : (
                          <Link to={item.url} className="flex items-center gap-3 w-full">
                            <item.icon className={`
                              w-5 h-5 transition-colors
                              ${isParentActive(item) ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}
                            `} />
                            <span className="font-medium">{item.title}</span>
                          </Link>
                        )}
                      </SidebarMenuButton>

                      {/* Submenu */}
                      {item.subItems && expandedItems.includes(item.title) && (
                        <div className="ml-6 mt-1 space-y-1 animate-in slide-in-from-top-2 duration-200">
                          {item.subItems.map(subItem => (
                            <SidebarMenuButton
                              key={subItem.title}
                              asChild
                              isActive={isActiveItem(subItem.url)}
                              className={`
                                transition-all duration-150 mx-2 rounded-lg
                                ${isActiveItem(subItem.url)
                                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                  : 'text-gray-600 hover:bg-slate-100 hover:text-gray-800 border border-transparent hover:border-gray-200'
                                }
                              `}
                            >
                              <Link to={subItem.url} className="flex items-center pl-4 py-2">
                                <span className="text-sm">{subItem.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          ))}
                        </div>
                      )}
                    </div>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator className="bg-slate-200/50" />

          {/* Settings Section */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-600 font-semibold text-sm uppercase tracking-wider px-4 py-2">
              System
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {settingsItems.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActiveItem(item.url)}
                      className={`
                        group transition-all duration-200 mx-2 rounded-xl
                        ${isActiveItem(item.url)
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white border border-blue-600'
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 border border-transparent hover:border-blue-200'
                        }
                      `}
                    >
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className={`
                          w-5 h-5 transition-colors
                          ${isActiveItem(item.url) ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}
                        `} />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* User Profile Footer */}
        <SidebarFooter className="bg-gradient-to-r from-slate-100 to-gray-100 border-t border-slate-200/50 p-4">
          <div className="flex items-center gap-3 text-gray-800">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center border border-blue-600/20">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {user?.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg border border-transparent hover:border-red-200 transition-all duration-300"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
