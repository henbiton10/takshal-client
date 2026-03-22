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
│   └── components/
│       ├── ui/         # Generic UI components
│       │   ├── FormLayout.tsx      # Form container, grid, wrappers
│       │   ├── Button.tsx          # Styled button component
│       │   ├── FormSelect.tsx      # Reusable select field
│       │   ├── FormTextField.tsx   # Reusable text field
│       │   ├── MainContainer.tsx   # Main layout container
│       │   └── index.ts            # UI exports
│       │
│       ├── EntityFormBanner/       # Entity form banner with icon
│       │   ├── EntityFormBanner.tsx
│       │   └── index.ts
│       │
│       └── EditableNameField/      # Editable name field with icon
│           ├── EditableNameField.tsx
│           └── index.ts
│
└── components/         # Feature-specific components
    ├── SatelliteForm/
    │   ├── SatelliteForm.tsx
    │   ├── types.ts
    │   ├── constants.ts
    │   └── index.ts
    │
    └── ResourcesManagement/
        └── ...
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
- `options`: Array of `{ value, label }` objects
- `placeholder`: Placeholder text
- `error`: Error object from react-hook-form
- `rules`: Validation rules
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

## Clean Code Principles Applied

1. **Single Responsibility**: Each component does one thing
2. **DRY**: Common patterns extracted into reusable components
3. **Consistent Naming**: Clear, descriptive names throughout
4. **Type Safety**: Full TypeScript coverage
5. **Theme Consistency**: Centralized styling values
6. **Composition**: Small components composed into larger features
7. **Separation of Concerns**: Logic, types, constants, and UI separated

## Benefits

- **Maintainability**: Changes to styling apply everywhere
- **Consistency**: All forms look and behave the same way
- **Reusability**: Create new entity forms quickly
- **Type Safety**: Catch errors at compile time
- **Readability**: Clear structure and naming conventions
