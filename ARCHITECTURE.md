# Takshal Client - Code Architecture

## Directory Structure

```
src/
├── theme/              # Centralized theme configuration
│   ├── colors.ts       # Color palette
│   ├── spacing.ts      # Spacing and border radius
│   ├── typography.ts   # Font sizes, weights, and icon sizes
│   └── index.ts        # Theme export
│
├── shared/             # Reusable components and utilities
│   ├── components/
│   │   ├── ui/         # Generic UI components
│   │   │   ├── FormLayout.tsx      # Form container, grid, wrappers
│   │   │   ├── Button.tsx          # Styled button component
│   │   │   ├── FormSelect.tsx      # Reusable select field
│   │   │   ├── FormTextField.tsx   # Reusable text field
│   │   │   ├── MainContainer.tsx   # Main layout container
│   │   │   ├── LoadingSpinner.tsx  # Centralized loading indicator
│   │   │   ├── BigEmptyState.tsx   # Premium empty state component
│   │   │   ├── Toast/              # Notification system (Context + Component)
│   │   │   └── index.ts            # UI exports
│   │   │
│   │   └── PageLayout/     # Standardized page structure (Sticky header + Breadcrumbs)
│   │
│   └── constants/          # Shared constants and enums
│       └── status.ts       # Shared readiness status options with icons
│
├── contexts/           # Global application contexts
│   └── SocketContext.tsx   # WebSocket connection and management
│
└── components/         # Feature-specific components
    ├── ResourcesManagement/ # Entity management system (Stations, Satellites, etc.)
    │   ├── components/      # Sub-components (Dashboard, AddModal, Section)
    │   ├── hooks/           # EntityManager and ResourcesManagement logic
    │   ├── entityConfig.tsx # Central configuration for all entities
    │   └── ResourcesManagement.tsx
    │
    └── OperationOrders/     # Order and Allocation management
        ├── components/      # Modular sub-components
        │   ├── SortableAllocation.tsx    # Draggable main allocation row
        │   ├── SortableSubAllocation.tsx # Draggable sub-allocation row
        │   ├── SubAllocationSection.tsx  # Grouping container for sub-allocations
        │   ├── AllocationTitle.tsx       # Typography for row identifiers
        │   └── styles.ts                 # Shared styled-components for rows
        ├── hooks/           # Business logic for orders
        ├── OperationOrderPage.tsx   # Page orchestrator
        └── OperationOrderHeader.tsx # Unified form orchestrator
```

## Theme System

The theme provides consistent styling across the application:

### Colors
- **Primary**: Main action colors (buttons, highlights)
- **Background**: Different levels of dark backgrounds
- **Text**: Text colors with opacity variants
- **Border**: Border colors for different states
- **Error**: Error state colors

### Spacing
- `xs` to `xxxl` for consistent spacing
- Border radius variants (`sm`, `md`, `lg`, `xl`, `pill`)

### Typography
- Font sizes from `xs` (12px) to `xxxl` (28px)
- Font weights: `normal`, `medium`, `semiBold`, `bold`
- Icon sizes for consistent icon scaling

## Reusable Components

### EntityFormBanner
Generic banner component for entity forms.

**Props:**
- `title`: Banner title (e.g., "לווין חדש")
- `icon`: MUI icon component

**Usage:**
```tsx
<EntityFormBanner 
  title="לווין חדש" 
  icon={SatelliteAltIcon} 
/>
```

### EditableNameField
Editable name field with icon and edit functionality.

**Props:**
- `name`: Form field name (react-hook-form)
- `control`: Form control object
- `icon`: MUI icon component
- `placeholder`: Placeholder text

**Usage:**
```tsx
<EditableNameField
  name="name"
  control={control}
  icon={SatelliteAltIcon}
  placeholder="לווין 1"
/>
```

### FormSelect
Generic select dropdown for forms.

**Props:**
- `name`: Form field name
- `control`: Form control object
- `label`: Field label
- `options`: Array of `{ value, label, icon? }` objects
- `placeholder`: Placeholder text
- `error`: Error object from react-hook-form
- `rules`: Validation rules
- `disabled`: Boolean to disable the field
- `value`: Optional value override
- `onChange`: Optional callback for value changes
- `transformValue`: Optional value transformation

**Usage:**
```tsx
<FormSelect
  name="affiliation"
  control={control}
  label="שייכות"
  options={AFFILIATION_OPTIONS}
  placeholder="בחר שייכות"
  error={errors.affiliation}
  rules={{ required: 'שייכות הינה שדה חובה' }}
/>
```

### FormTextField
Generic text input for forms.

**Props:**
- `name`: Form field name
- `control`: Form control object
- `label`: Field label
- `placeholder`: Placeholder text
- `error`: Error object from react-hook-form
- `rules`: Validation rules
- `multiline`: Enable multiline mode
- `rows`: Number of rows (multiline)

**Usage:**
```tsx
<FormTextField
  name="notes"
  control={control}
  label="הערות"
  placeholder="פרט על הסטטוס כאן..."
  error={errors.notes}
  rules={{ required: 'הערות הינן שדה חובה' }}
/>
```

## Form Layout Components

### MainContainer
Main container for form layouts with banner.

### FormContainer
Container for form content (65% width).

### FormGrid
2-column grid layout for form fields.

### CombinedFieldWrapper & CombinedFieldSection
Components for creating side-by-side fields with custom widths and dividers.

**Usage:**
```tsx
<CombinedFieldWrapper>
  <CombinedFieldSection hasBorder flexBasis="20%">
    {/* Field 1 */}
  </CombinedFieldSection>
  <CombinedFieldSection flexBasis="80%">
    {/* Field 2 */}
  </CombinedFieldSection>
</CombinedFieldWrapper>
```

### ButtonContainer
Container for form action buttons (aligned to the right).

## Creating New Entity Forms

To create a new entity form (e.g., Station, Terminal):

1. **Create types file** (`types.ts`)
```typescript
export interface StationFormData {
  name: string;
  affiliation: string;
  // ... other fields
}

export interface StationFormProps {
  onSave?: (data: StationFormData) => Promise<void>;
}
```

2. **Create constants file** (`constants.ts`)
```typescript
export const INITIAL_FORM_DATA: StationFormData = {
  name: '',
  affiliation: '',
  // ... defaults
};

export const AFFILIATION_OPTIONS = [
  { value: 'tikshuv', label: 'תקשוב' },
  { value: 'airforce', label: 'חיל אוויר' },
];
```

3. **Create form component**
```tsx
import StationIcon from '@mui/icons-material/Router';
import { EntityFormBanner } from '../../shared/components/EntityFormBanner';
import { EditableNameField } from '../../shared/components/EditableNameField';
import { FormSelect, FormTextField } from '../../shared/components/ui';

export const StationForm = ({ onSave }: StationFormProps) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: INITIAL_FORM_DATA,
  });

  return (
    <MainContainer>
      <FormContainer>
        <FormTitle>הוספת תחנה חדשה</FormTitle>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <EditableNameField
            name="name"
            control={control}
            icon={StationIcon}
            placeholder="תחנה 1"
          />
          
          <FormGrid>
            <FormSelect
              name="affiliation"
              control={control}
              label="שייכות"
              options={AFFILIATION_OPTIONS}
              error={errors.affiliation}
            />
            {/* More fields... */}
          </FormGrid>

          <ButtonContainer>
            <StyledButton variant="outlined" onClick={handleReset}>
              נקה שדות
            </StyledButton>
            <StyledButton variant="contained" type="submit">
              שמירה
            </StyledButton>
          </ButtonContainer>
        </form>
      </FormContainer>
      
      <EntityFormBanner title="תחנה חדשה" icon={StationIcon} />
    </MainContainer>
  );
};
```

## Global Systems

### Toast Notification System
A centralized system for displaying premium success and error notifications.

**Usage:**
```tsx
const { showSuccess, showError } = useToast();

// Trigger a success notification
showSuccess("הלווין נשמר", "הלווין נוסף בהצלחה למערכת");

// Trigger an error notification
showError("שגיאה", "לא ניתן היה לשמור את השינויים");
```

**Architecture:**
- `ToastContext.tsx`: Manages the state and list of active toasts.
- `ToastProvider`: Wraps the app and renders overlapping toasts at the bottom-right.
- `Toast.tsx`: The visual component with slide-in/out animations.

### Readiness Status System
Standardized status options used across all resource types.

**Usage:**
```tsx
import { READINESS_STATUS_OPTIONS } from '../../shared/constants/status';

// In forms
<FormSelect options={READINESS_STATUS_OPTIONS} ... />
```

## Real-time Synchronization System

The application utilizes a **Signal-based Update** pattern to keep data synchronized across multiple clients and windows without manual refreshes.

### How it Works
1. **Server Broadcast**: When an entity is created, updated, or deleted, the backend emits an internal event via `EventEmitter2`.
2. **WebSocket Gateway**: The `EventsGateway` listens to these internal events and broadcasts them to all connected clients via Socket.io.
3. **Client Reception**: The `SocketContext` maintains the persistent connection and provides access to the socket instance.
4. **Reactive Hooks**: Hooks like `useEntityManager` and `useOperationOrderPage` subscribe to specific synchronization events (e.g., `entity_updated`).
5. **Silent Refresh**: Upon receiving a signal, the hooks trigger a re-fetch of the relevant data in the background, ensuring the UI stays consistent with the database state.

### Implementation Details
- `SocketContext.tsx`: Manages the lifecycle of the `socket.io-client` connection.
- `useSocket` hook: Provides easy access to the socket instance for any component.
- `useEffect` listeners: Used within domain hooks to handle incoming signals and refresh state.

## Visibility & Logic Patterns

### Note Visibility
In View Mode, notes are hidden if they are empty.
In Edit Mode, notes are mandatory if the status is NOT "Ready".

### Entity Management Pattern
Entities (Stations, Satellites, etc.) are managed through a central configuration (`entityConfig.tsx`) and a generic manager hook (`useEntityManager`). This allows the `ResourcesManagement` page to handle any entity type without duplicating logic.

## Clean Code Principles Applied

1. **Single Responsibility**: Each component does one thing
2. **DRY**: Common patterns like `READINESS_STATUS_OPTIONS` extracted to shared constants
3. **Consistent Naming**: Clear, descriptive names throughout
4. **Type Safety**: Full TypeScript coverage for forms and API responses
5. **Theme Consistency**: Centralized styling via `styled-components` and theme tokens
6. **Composition**: Small components like `BigEmptyState` composed into larger features
7. **Declarative UI**: Features like gender-aware toasts are defined in config objects (`EntityConfig`) rather than hardcoded logic.
## Modernized Operation Orders Architecture

The Operation Orders module has been refactored from a monolithic form into a modular, highly interactive system.

### Unified Editor Pattern
Instead of using separate popups (`AllocationForm`) for managing allocations, the system utilizes a **Unified Header Editor**. This allows users to manage the high-level order metadata (name, dates) and all underlying allocations in a single, cohesive view.

### Component Breakdown
- **OperationOrderHeader**: The primary orchestrator. It manages the global form state via `react-hook-form` and provides contexts for drag-and-drop.
- **SortableAllocation**: Manages a single top-level allocation row. It handles localized filtering of resources (e.g., antennas filtered by frequency band).
- **SubAllocationSection**: A specialized component that manages nested field arrays for sub-allocations.
- **SortableSubAllocation**: A lightweight version of the allocation row designed for nested display.

### Drag-and-Drop Implementation
The system uses `@dnd-kit` to provide smooth, accessible reordering of allocations. Reordering happens at two levels:
1. **Top-level Allocations**: Managed within the `OperationOrderHeader`.
2. **Sub-allocations**: Managed independently within each `SubAllocationSection`.

### Navigation & Focus Logic
To ensure a smooth transition from the "View" mode to "Edit" mode, the system implements a **Focus & Expand** pattern:
- When a user modifies an allocation from the grid, the page state transitions to the header editor.
- The system automatically expands the relevant parent allocation in the `OperationOrderHeader`.
- The interface automatically scrolls to the target row and applies a temporal highlight (glow effect) to focus the user's attention.

### High-Fidelity Dialogs
The `ConfirmDialog` system has been completely redesigned to match Figma specifications, featuring:
- **Red Glow Shadows**: Indicates destructive actions.
- **Glassmorphism**: Transparent, frosted backgrounds (`rgba(28, 36, 57, 0.95)`).
- **Premium Separators**: Using MUI `Divider` for sub-pixel precision instead of custom borders.

## Dashboard Matrix Patterns

The dashboard utilizes specialized matrix components for real-time monitoring of Stations, Terminals, Satellites, and Connectivity.

### Differentiated Iconography
To maintain visual hierarchy, the system uses specific SVG sets:
- **SatelliteHeaderIcon**: Used in column headers for satellite identification.
- **SatelliteCustomIcon**: Used within individual cell badges (chips) for status indicators.

### Status Indicator Glows
All status dots (`StatusDot`) implement situational glow effects (`box-shadow`) to enhance visibility in the dark-themed dashboard:
- **Ready**: Green glow.
- **Partly Ready**: Orange/Yellow glow.
- **Damaged**: Red glow.

## Sticky Button & Scroll Architecture

To ensure action buttons are always accessible while forms or views remain scrollable, the application follows a strict container-overflow hierarchy.

### Pattern for Forms
1. **Parent Container**: Set to `overflow-y: hidden` when a form is active (in `ResourcesManagement.tsx`).
2. **FormMainContainer**: A flex container that fills 100% of the available height.
3. **FormScrollContainer**: A middle container with `flex: 1` and `overflow-y: auto`. This container uses `direction: ltr` to force the scrollbar to the right side, while its children are reset to `direction: rtl`.
4. **FormBottomActions**: A sticky footer component that remains outside the scrollable area, ensuring "Save" and "Cancel" buttons never scroll away.

### Pattern for Resource Viewing
Resource views (`EntityView`) utilize the `ViewScrollContainer`, which mirrors the `FormScrollContainer` pattern, providing a premium scrolling experience with a custom-styled scrollbar on the right side.

## RTL-Optimized Terminal Popup Pattern

The Terminal Popup follows a specific high-fidelity mirroring pattern for RTL (Hebrew) contexts:
- **Visual Indicators**: Status-colored borders (white/orange/red) are positioned on the **right border** of allocation cards.
- **Mirrored Metadata**: Frequency and Direction info is aligned to the right of the card header, while the Band Badge (KU/KA) is on the left.
- **Icon Alignment**: Icons within technical sections are positioned "first" (on the right) relative to their text labels for natural RTL reading.
- **Design System Sync**: Band chips (KU/KA) are synchronized with the global `EquipmentCard` tag system, ensuring consistent visual language between the matrix views and the detailed popups.
