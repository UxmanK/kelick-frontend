import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { sidebarSections } from "@/constents/sidebarData";
import notificationIcon from "@/assets/icons/notification_bell.svg";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import logo from "@/assets/logo.png";
import wallat_icon from "@/assets/icons/wallat.svg";

const notifications = {
  text: "Notifications",
  link: "/notifications",
  icon: notificationIcon,
  hasUnread: true,
};

const user = {
  name: "John Doe",
  email: "johndoe@assure.pro",
  avatar: null,
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="space-y-6">
        {/* Sidebar Header */}
        <SidebarHeader>
          <SidebarMenuButton asChild>
            <a href={"/"} className="flex items-center space-x-2">
              <Image src={logo} alt={`kelick Icon`} className="w-5 h-5" />
              <span>kelick</span>
            </a>
          </SidebarMenuButton>
        </SidebarHeader>

        {/* Sidebar Groups with Collapsible Functionality */}
        {sidebarSections.map((section, sectionIdx) => (
          <Collapsible defaultOpen key={sectionIdx}>
            <CollapsibleTrigger asChild>
              <SidebarGroup>
                {section.title && (
                  <SidebarGroupLabel className="cursor-pointer flex items-center justify-between">
                    <span>{section.title}</span>
                    {/* <span className="text-gray-500"></span> */}
                    <SidebarMenuButton />
                  </SidebarGroupLabel>
                )}
              </SidebarGroup>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item, itemIdx) => (
                    <SidebarMenuItem key={itemIdx}>
                      <SidebarMenuButton asChild>
                        <a
                          href={item.link}
                          className="flex items-center space-x-2"
                        >
                          <Image
                            src={item.icon}
                            alt={`${item.text} Icon`}
                            className="w-5 h-5"
                          />
                          <span>{item.text}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        ))}

        {/* Sidebar Footer */}
        <SidebarFooter>
          {/* Plan Section */}
          <SidebarMenuButton asChild>
            <a href={"/"} className="flex items-center space-x-2">
              <Image src={wallat_icon} alt={`plan Icon`} className="w-5 h-5" />
              <span>Free Plan</span>
            </a>
          </SidebarMenuButton>

          {/* Progress Section */}
          <div className="p-6 space-y-6">
            <div>
              <p className="text-gray-600 text-sm">1/10 Employees</p>
              <Progress value={10} className="w-full h-2 mt-2" />
            </div>
          </div>

          <SidebarSeparator />

          {/* Notifications Section */}
          <div>
            <SidebarMenuButton asChild className="">
              <a
                href={"/"}
                className="flex justify-between  items-center space-x-2"
              >
                <Image
                  src={notificationIcon}
                  alt={`notificationIcon Icon`}
                  className="w-5 h-5"
                />
                <span>Notifications</span>
                <span className="rounded-full w-2 h-2 bg-red-500"></span>
              </a>
            </SidebarMenuButton>
          </div>

          {/* User Info Section */}
          <div className="flex items-center space-x-4">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="User Avatar"
                className="rounded-full w-10 h-10 border"
              />
            ) : (
              <div className="rounded-full bg-gray-300 w-10 h-10"></div>
            )}
            <div>
              <p className="font-semibold text-xs text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-600">{user.email}</p>
            </div>
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
