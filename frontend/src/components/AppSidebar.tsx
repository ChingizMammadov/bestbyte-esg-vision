
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

interface SubItem {
  title: string;
  url: string;
}

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: SubItem[];
}

const mainItems: MenuItem[] = [
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

  // Auto-expand items based on current path
  React.useEffect(() => {
    const itemsToExpand = mainItems
      .filter(item => 
        item.subItems && 
        (pathname.startsWith(item.url) || item.subItems.some(sub => pathname === sub.url))
      )
      .map(item => item.title);
    
    setExpandedItems(prev => {
      const newItems = [...new Set([...prev, ...itemsToExpand])];
      return newItems;
    });
  }, [pathname]);

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
  const isParentActive = (item: MenuItem) => {
    if (isActiveItem(item.url)) return true;
    if (item.subItems) {
      return item.subItems.some((sub) => pathname === sub.url);
    }
    return false;
  };

  return (
    <div className="hidden lg:block">
      <Sidebar className="border-r border-slate-200/50">
        {/* Header with Logo */}
        <SidebarHeader className="border-b border-slate-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-6">
          <Link to="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <BestByteLogo size="md" showText={true} />
          </Link>
        </SidebarHeader>

        <SidebarContent className="bg-gradient-to-b from-slate-50 to-gray-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200">
          {/* Search Bar */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <Input 
                placeholder="Search ESG data..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl"
              />
            </div>
          </div>

          <SidebarSeparator className="bg-slate-200/50 dark:bg-gray-700/50" />

          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-600 dark:text-gray-400 font-semibold text-sm uppercase tracking-wider px-4 py-2">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainItems.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <div>
                      <SidebarMenuButton
                        asChild={true}
                        isActive={isParentActive(item)}
                        className={`
                          group relative transition-all duration-200 mx-2 rounded-xl
                          ${isParentActive(item) 
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 text-white border border-blue-600 dark:border-blue-700' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 hover:text-blue-700 dark:hover:text-blue-300 border border-transparent hover:border-blue-200 dark:hover:border-blue-800'
                          }
                          ${item.subItems ? 'cursor-pointer' : ''}
                        `}
                      >
                        {item.subItems ? (
                          <Link 
                            to={item.url}
                            className="flex items-center gap-3 w-full"
                            onClick={() => toggleExpanded(item.title)}
                          >
                            <item.icon className={`
                              w-5 h-5 transition-colors
                              ${isParentActive(item) ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'}
                            `} />
                            <span className="font-medium flex-1">{item.title}</span>
                            <div className={`
                              transition-transform duration-200
                              ${expandedItems.includes(item.title) ? 'rotate-180' : ''}
                            `}>
                              <ChevronDown className="w-3 h-3" />
                            </div>
                          </Link>
                        ) : (
                          <Link to={item.url} className="flex items-center gap-3 w-full">
                            <item.icon className={`
                              w-5 h-5 transition-colors
                              ${isParentActive(item) ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'}
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
                                  ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                                  : 'text-gray-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-gray-800 dark:hover:text-gray-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-700'
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

          <SidebarSeparator className="bg-slate-200/50 dark:bg-gray-700/50" />

          {/* Settings Section */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-600 dark:text-gray-400 font-semibold text-sm uppercase tracking-wider px-4 py-2">
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
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 text-white border border-blue-600 dark:border-blue-700'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 hover:text-blue-700 dark:hover:text-blue-300 border border-transparent hover:border-blue-200 dark:hover:border-blue-800'
                        }
                      `}
                    >
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className={`
                          w-5 h-5 transition-colors
                          ${isActiveItem(item.url) ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'}
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
        <SidebarFooter className="bg-gradient-to-r from-slate-100 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-slate-200/50 dark:border-gray-700/50 p-4">
          <div className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 rounded-full flex items-center justify-center border border-blue-600/20 dark:border-blue-500/20">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                {user?.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded-lg border border-transparent hover:border-red-200 dark:hover:border-red-800 transition-all duration-300"
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
