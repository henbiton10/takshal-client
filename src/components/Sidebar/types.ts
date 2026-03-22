export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface SidebarProps {
  selectedItem?: string;
  onItemSelect?: (itemId: string) => void;
}
