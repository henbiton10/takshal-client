import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragEndEvent 
} from '@dnd-kit/core';
import { 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { useFieldArray } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import { AddSubButton } from './styles';
import { SortableSubAllocation } from './SortableSubAllocation';

interface SubAllocationSectionProps {
  nestIndex: number;
  control: any;
  options: any;
  getFilteredAntennas: (index: number) => any[];
  isExpanded: boolean;
  onExpand: () => void;
}

export const SubAllocationSection = ({
  nestIndex,
  control,
  options,
  getFilteredAntennas,
  isExpanded,
  onExpand
}: SubAllocationSectionProps) => {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: `allocations.${nestIndex}.subAllocations`,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      move(oldIndex, newIndex);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={fields.map(f => f.id)}
        strategy={verticalListSortingStrategy}
      >
        {isExpanded && fields.map((field, index) => (
          <SortableSubAllocation
            key={field.id}
            field={field}
            index={index}
            nestIndex={nestIndex}
            control={control}
            options={options}
            getFilteredAntennas={getFilteredAntennas}
            remove={remove}
          />
        ))}
      </SortableContext>

      <AddSubButton type="button" onClick={() => {
        onExpand();
        append({
          terminalId: '' as any,
          transmissionSatelliteId: '' as any,
          transmissionAntennaId: '' as any,
          transmissionFrequency: '' as any,
          receptionSatelliteId: '' as any,
          receptionAntennaId: '' as any,
          receptionFrequency: '' as any,
          tailNumbers: [],
        });
      }}>
        <AddIcon sx={{ fontSize: 18 }} />
        הוסף הקצאה משנית
      </AddSubButton>
    </DndContext>
  );
};
