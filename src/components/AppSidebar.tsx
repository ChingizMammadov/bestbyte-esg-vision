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
import { LayoutDashboard, FileText, Cog, ChartBar, FolderOpen, User, LogOut, Search } from "lucide-react";
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
      <Sidebar className="w-[280px] border-r-0">
        {/* Header with Logo */}
        <SidebarHeader className="border-b border-gray-200 bg-gradient-to-r from-[#24292f] to-[#2b333e] p-6">
          <Link to="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <BestByteLogo size="md" variant="white" showText={true} />
          </Link>
        </SidebarHeader>

        <SidebarContent className="bg-[#24292f] text-white">
          {/* Search Bar */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search ESG data..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#1a1a1a] border-gray-600 text-white placeholder-gray-400 focus:border-primary focus:ring-primary"
              />
            </div>
          </div>

          <SidebarSeparator className="bg-gray-600" />

          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-300 font-semibold text-sm uppercase tracking-wider px-4 py-2">
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
                          group relative transition-all duration-200 mx-2 rounded-lg
                          ${isParentActive(item) 
                            ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg' 
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          }
                          ${item.subItems ? 'cursor-pointer' : ''}
                        `}
                        onClick={item.subItems ? () => toggleExpanded(item.title) : undefined}
                      >
                        {item.subItems ? (
                          <div className="flex items-center gap-3 w-full">
                            <item.icon className={`
                              w-5 h-5 transition-colors
                              ${isParentActive(item) ? 'text-white' : 'text-gray-400 group-hover:text-white'}
                            `} />
                            <span className="font-medium">{item.title}</span>
                            <div className={`
                              ml-auto transition-transform duration-200
                              ${expandedItems.includes(item.title) ? 'rotate-180' : ''}
                            `}>
                              <ChartBar className="w-3 h-3" />
                            </div>
                          </div>
                        ) : (
                          <Link to={item.url} className="flex items-center gap-3 w-full">
                            <item.icon className={`
                              w-5 h-5 transition-colors
                              ${isParentActive(item) ? 'text-white' : 'text-gray-400 group-hover:text-white'}
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
                                transition-all duration-150 mx-2 rounded-md
                                ${isActiveItem(subItem.url)
                                  ? 'bg-primary/20 text-primary border-l-2 border-primary'
                                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
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

          <SidebarSeparator className="bg-gray-600" />

          {/* Settings Section */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-300 font-semibold text-sm uppercase tracking-wider px-4 py-2">
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
                        group transition-all duration-200 mx-2 rounded-lg
                        ${isActiveItem(item.url)
                          ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }
                      `}
                    >
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className={`
                          w-5 h-5 transition-colors
                          ${isActiveItem(item.url) ? 'text-white' : 'text-gray-400 group-hover:text-white'}
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
        <SidebarFooter className="bg-[#1a1a1a] border-t border-gray-600 p-4">
          <div className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-gray-400 hover:text-white hover:bg-gray-700 p-2"
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
