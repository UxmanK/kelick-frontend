import { SidebarSection } from "@/types/sidebar.types";
import home_icon from "@/assets/icons/home.svg";
import building_icon from "@/assets/icons/building.svg";
import employee_icon from "@/assets/icons/employee.svg";
import payroll_icon from "@/assets/icons/payroll.svg";
import leave_icon from "@/assets/icons/leave.svg";
import claims_icon from "@/assets/icons/claims.svg";

import notificationIcon from "@/assets/icons/notification_bell.svg";

export const notifications = {
  text: "Notifications",
  link: "/notifications",
  icon: notificationIcon,
  hasUnread: true,
};

export const user = {
  name: "John Doe",
  email: "johndoe@assure.pro",
  avatar: null,
};

export const sidebarSections: SidebarSection[] = [
  {
    title: "",
    items: [{ text: "Dashboard", link: "/", icon: home_icon }],
  },
  {
    title: "ORGANIZATION",
    items: [{ text: "Kelick", link: "/", icon: building_icon }],
  },
  {
    title: "MANAGE",
    items: [
      { text: "Employees", link: "/employees", icon: employee_icon },
      { text: "Payroll", link: "/", icon: payroll_icon },
      { text: "Leaves", link: "/", icon: leave_icon },
      { text: "Claims", link: "/", icon: claims_icon },
    ],
  },
];
