"use client";

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
import logo from "@/assets/icons/logo.svg";
import wallat_icon from "@/assets/icons/wallat.svg";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const user = {
  name: "John Doe",
  email: "johndoe@assure.pro",
  avatar: null,
};

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar className="">
      <SidebarContent className="flex flex-col justify-between space-y-6 p-4">
        <div className="">
          <SidebarHeader>
            <SidebarMenuButton asChild>
              <button
                onClick={() => router.push("/")}
                className="flex items-center space-x-2"
              >
                <Image src={logo} alt={`kelick Icon`} />
              </button>
            </SidebarMenuButton>
          </SidebarHeader>

          {sidebarSections.map((section, sectionIdx) => (
            <Collapsible defaultOpen key={sectionIdx}>
              <CollapsibleTrigger asChild>
                <SidebarGroup className="py-4">
                  {section.title && (
                    <SidebarGroupLabel className="cursor-pointer flex items-center justify-between">
                      <span className="font-bold text-base pr-4">
                        {section.title}
                      </span>
                      <span className="">
                        {section.title === "ORGANIZATION" ? (
                          <ChevronDown />
                        ) : (
                          ""
                        )}
                      </span>
                      <SidebarMenuButton />
                    </SidebarGroupLabel>
                  )}
                </SidebarGroup>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-4">
                    {section.items.map((item, itemIdx) => {
                      const isActive =
                        pathname === item.link && pathname !== "/";

                      return (
                        <SidebarMenuItem key={itemIdx}>
                          <SidebarMenuButton asChild>
                            <button
                              onClick={() => router.push(item.link)}
                              className={`flex items-center p-4 space-x-3 font-medium	 rounded-md ${
                                isActive
                                  ? "border border-gray-00 bg-gray-100 rounded-lg "
                                  : ""
                              }`}
                            >
                              <Image
                                src={item.icon}
                                alt={`${item.text} Icon`}
                                className="w-5 h-5"
                              />
                              <span
                                className={`${isActive ? "font-bold" : ""}`}
                              >
                                {item.text}
                              </span>
                            </button>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
        <div className="">
          <SidebarFooter>
            <SidebarSeparator />
            <SidebarMenuButton asChild>
              <button
                onClick={() => router.push("/")}
                className="flex items-center space-x-2"
              >
                <Image
                  src={wallat_icon}
                  alt={`plan Icon`}
                  className="w-5 h-5"
                />
                <span>Free Plan</span>
              </button>
            </SidebarMenuButton>

            <div className="p-6 space-y-6">
              <div>
                <p className="text-gray-600 text-sm">1/10 Employees</p>
                <Progress value={10} className="w-full h-2 mt-2" />
              </div>
            </div>

            <SidebarSeparator />

            <div>
              <SidebarMenuButton asChild className="">
                <div className="flex flex-row justify-between">
                  <button
                    onClick={() => router.push("/notifications")}
                    className="flex justify-between items-center space-x-2"
                  >
                    <Image
                      src={notificationIcon}
                      alt={`notificationIcon Icon`}
                      className="w-5 h-5"
                    />
                    <span>Notifications</span>
                  </button>
                  <span className="rounded-full w-2 h-2 bg-red-500"></span>
                </div>
              </SidebarMenuButton>
            </div>

            <div className="flex items-center space-x-4">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt="User Avatar"
                  className="rounded-full w-10 h-10 border"
                />
              ) : (
                <div className="rounded-full bg-gray-300 w-10 h-10"></div>
              )}
              <div>
                <p className="font-semibold text-xs text-gray-800">
                  {user.name}
                </p>
                <p className="text-xs text-gray-600">{user.email}</p>
              </div>
            </div>
          </SidebarFooter>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
