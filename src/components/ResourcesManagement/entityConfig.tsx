import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import PublicIcon from '@mui/icons-material/Public';
import { SatelliteForm } from '../SatelliteForm';
import { TerminalForm } from '../TerminalForm';
import { NetworkForm } from '../NetworkForm';
import { StationForm } from '../StationForm';
import { SatelliteCard } from '../SatelliteCard';
import { TerminalCard } from '../TerminalCard';
import { NetworkTag } from '../NetworkTag';
import { StationCard } from '../StationCard';
import { StationView } from '../StationView';
import { SatelliteView } from '../SatelliteView';
import { TerminalView } from '../TerminalView';
import { NetworkView } from '../NetworkView';
import { TerminalIcon } from './icons/TerminalIcon';
import { StationIcon } from './icons/StationIcon';
import { satellitesApi, terminalsApi, networksApi, stationsApi } from '../../services/api';

export interface EntityConfig {
  id: string;
  title: string;
  icon: React.ReactNode;
  emptyMessage: string;
  emptySubMessage: string;
  api: {
    getAllSummary: () => Promise<any[]>;
    getOne: (id: number) => Promise<any>;
    create: (data: any) => Promise<any>;
    update: (id: number, data: any) => Promise<any>;
    delete: (id: number) => Promise<void>;
  };
  FormComponent: React.ComponentType<any>;
  ViewComponent: React.ComponentType<any>;
  CardComponent: React.ComponentType<any>;
  mapToFormData: (data: any) => any;
  mapToPayload: (data: any) => any;
}

export const ENTITY_CONFIGS: Record<string, EntityConfig> = {
  stations: {
    id: 'stations',
    title: 'תחנות',
    icon: <StationIcon />,
    emptyMessage: 'לא נמצאו תחנות זמינות',
    emptySubMessage: 'תחנות חדשות יופיעו כאן ברגע שתוספנה',
    api: {
      getAllSummary: stationsApi.getAllSummary,
      getOne: stationsApi.getOne,
      create: stationsApi.create,
      update: stationsApi.update,
      delete: stationsApi.delete,
    },
    FormComponent: StationForm,
    ViewComponent: StationView,
    CardComponent: StationCard,
    mapToFormData: (station) => ({
      name: station.name,
      organizationalAffiliation: station.organizationalAffiliation,
      readinessStatus: station.readinessStatus,
      notes: station.notes || '',
      connectivities: station.connectivities || [],
      antennas: station.antennas || [],
    }),
    mapToPayload: (data) => ({
      name: data.name,
      organizationalAffiliation: data.organizationalAffiliation,
      readinessStatus: data.readinessStatus,
      notes: data.notes,
      connectivities: data.connectivities.map((c: any) => ({
        connectedStationId: Number(c.connectedStationId),
        communicationType: c.communicationType,
        channelCount: Number(c.channelCount),
      })),
      antennas: data.antennas.map((a: any) => ({
        size: Number(a.size),
        frequencyBand: a.frequencyBand,
      })),
    }),
  },
  satellites: {
    id: 'satellites',
    title: 'לווין',
    icon: <SatelliteAltIcon />,
    emptyMessage: 'לא נמצאו לווינים זמינים',
    emptySubMessage: 'לווינים חדשים יופיעו כאן ברגע שיוספו',
    api: {
      getAllSummary: satellitesApi.getAllSummary,
      getOne: satellitesApi.getOne,
      create: satellitesApi.create,
      update: satellitesApi.update,
      delete: satellitesApi.delete,
    },
    FormComponent: SatelliteForm,
    ViewComponent: SatelliteView,
    CardComponent: SatelliteCard,
    mapToFormData: (satellite) => ({
      name: satellite.name,
      affiliation: satellite.affiliation,
      hasFrequencyConverter: satellite.hasFrequencyConverter,
      readinessStatus: satellite.readinessStatus,
      notes: satellite.notes || '',
    }),
    mapToPayload: (data) => ({
      name: data.name,
      affiliation: data.affiliation,
      hasFrequencyConverter: data.hasFrequencyConverter,
      readinessStatus: data.readinessStatus,
      notes: data.notes,
    }),
  },
  terminals: {
    id: 'terminals',
    title: 'טרמינלים',
    icon: <TerminalIcon />,
    emptyMessage: 'לא נמצאו טרמינלים זמינים',
    emptySubMessage: 'טרמינלים חדשים יופיעו כאן ברגע שיוספו',
    api: {
      getAllSummary: terminalsApi.getAllSummary,
      getOne: terminalsApi.getOne,
      create: terminalsApi.create,
      update: terminalsApi.update,
      delete: terminalsApi.delete,
    },
    FormComponent: TerminalForm,
    ViewComponent: TerminalView,
    CardComponent: TerminalCard,
    mapToFormData: (terminal) => ({
      name: terminal.name,
      stationId: terminal.stationId,
      frequencyBand: terminal.frequencyBand,
      terminalType: terminal.terminalType?.name || '',
      readinessStatus: terminal.readinessStatus,
      notes: terminal.notes || '',
    }),
    mapToPayload: (data) => ({
      name: data.name,
      stationId: data.stationId,
      frequencyBand: data.frequencyBand,
      terminalType: data.terminalType,
      readinessStatus: data.readinessStatus,
      notes: data.notes,
    }),
  },
  networks: {
    id: 'networks',
    title: 'רשת',
    icon: <PublicIcon />,
    emptyMessage: 'לא נמצאו רשתות זמינות',
    emptySubMessage: 'רשתות חדשות יופיעו כאן ברגע שתוספנה',
    api: {
      getAllSummary: networksApi.getAllSummary,
      getOne: networksApi.getOne,
      create: networksApi.create,
      update: networksApi.update,
      delete: networksApi.delete,
    },
    FormComponent: NetworkForm,
    ViewComponent: NetworkView,
    CardComponent: NetworkTag,
    mapToFormData: (network) => ({
      name: network.name,
      terminalTypeId: network.terminalTypeId,
      readinessStatus: network.readinessStatus,
      notes: network.notes || '',
    }),
    mapToPayload: (data) => ({
      name: data.name,
      terminalTypeId: data.terminalTypeId,
      readinessStatus: data.readinessStatus,
      notes: data.notes,
    }),
  }
};

export const ENTITY_CONFIGS_ARRAY = Object.values(ENTITY_CONFIGS);
