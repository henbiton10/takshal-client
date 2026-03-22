# Takshal Sidebar Implementation

## Overview

A collapsible sidebar component built with React, MUI, and styled-components that follows clean code principles.

## Features

- **Folded State**: 76px wide showing icons and compact labels
- **Hover Expansion**: Expands to 220px with smooth 300ms animation
- **Three Menu Items**:
  - דאשבורד (Dashboard) with DashboardIcon
  - פמ״ים (Operations) with TableViewIcon
  - אמצעים (Resources) with CellTowerIcon
- **Glass Morphism**: Backdrop blur effect
- **RTL Support**: Right-to-left layout for Hebrew text

## Component Structure

```
src/
├── components/
│   ├── App/
│   │   └── AppLayout.tsx         # Main layout styled components
│   └── Sidebar/
│       ├── Sidebar.tsx            # Main container with hover logic
│       ├── SidebarHeader.tsx      # Logo and title section
│       ├── SidebarMenuItem.tsx    # Individual menu items
│       ├── SidebarFooter.tsx      # Collapse button section
│       ├── menuItems.tsx          # Menu item data
│       ├── constants.ts           # Design tokens
│       ├── types.ts               # TypeScript interfaces
│       ├── useSidebarHover.ts     # Custom hook for hover state
│       └── index.ts               # Public exports
└── styles/
    └── GlobalStyles.tsx           # Global styles (replaces index.css)
```

## Styling

All styling uses **styled-components** following the project rule in `.cursor/rules/claude.mdc`.

## Design Tokens

Extracted in `constants.ts`:
- Sidebar widths (collapsed: 76px, expanded: 220px)
- Colors (white, secondary, logo background)
- Transitions (300ms)
- Gradients and effects

## Clean Code Principles

- ✅ Single Responsibility: Each component does one thing
- ✅ Extracted Constants: No magic numbers
- ✅ Custom Hook: `useSidebarHover` for state logic
- ✅ TypeScript: Proper typing throughout
- ✅ Named Functions: Clear intent in handlers
- ✅ Composition: Small, focused components

## Running the Project

```bash
cd takshal-client
npm run dev
```

The app will run on `http://localhost:5175/`
