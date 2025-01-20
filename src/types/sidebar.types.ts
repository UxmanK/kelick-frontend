export interface SidebarItem {
  text: string;
  link: string;
  icon: string;
}

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}
