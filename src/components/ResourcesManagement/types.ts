export interface ResourceSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  emptyMessage: string;
}

export interface ResourcesManagementProps {
  onSaveSatellite?: (data: any) => Promise<void>;
  onSaveStation?: (data: any) => Promise<void>;
  onSaveTerminal?: (data: any) => Promise<void>;
  onSaveNetwork?: (data: any) => Promise<void>;
}
