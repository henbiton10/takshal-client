export const CONNECTIVITY_TYPE_LABELS: Record<string, string> = {
  fiber_optic: 'סיב אופטי',
  radio: 'רדיו',
  satellite: 'לוויני',
  hybrid: 'היברידי',
};

export const mapConnectivityTypeToLabel = (name: string): string => {
  return CONNECTIVITY_TYPE_LABELS[name] || name;
};
