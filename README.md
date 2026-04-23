# Takshal - Management System

A premium, state-of-the-art resource management and operation planning platform.

## Features

- **Modernized Operation Orders**: A high-fidelity, interactive interface for planning operations with a modular, scalable architecture.
- **Unified Editing Experience**: Real-time allocation management within a unified header view, featuring automatic expansion and focus for sub-allocations.
- **High-Fidelity Dashboard Matrices**: Advanced matrix views with custom SVG iconography, differentiated band color tokens, and glow-enhanced status indicators for real-time situational awareness.
- **Resource Management**: Comprehensive tracking of Stations, Satellites, Terminals, and Networks with a premium, RTL-optimized viewing experience.
- **Premium UI/UX**: State-of-the-art dark mode design based on Figma specifications, featuring glassmorphism, glowing status dots, and smooth internal scroll systems.

- **Real-time Background Synchronization**: Seamless data updates across multiple clients via WebSockets, eliminating the need for manual refreshes.
- **Global Notifications**: Real-time success and error toasts for all operations.

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Bundler**: Vite
- **Styling**: Styled-components for theme-aware, isolated styles
- **UI Components**: Material UI (MUI) icons and layout primitives
- **Forms**: React Hook Form for performant, type-safe forms
- **Real-time**: Socket.io-client for event-driven synchronization
- **State**: React Context for global systems (Toast, Sockets, etc.)

## Project Structure

For a detailed overview of the code architecture, please refer to [ARCHITECTURE.md](./ARCHITECTURE.md).

```bash
src/
├── components/         # Feature-specific modules
├── shared/             # Global UI systems and constants
├── services/           # API clients and data types
└── theme/              # Centralized design tokens
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Environment Configuration

Create a `.env` file in the root directory (based on `.env.example`).
The application proxies API requests to `http://localhost:3000` by default.

## Development Principles

- **Convention over Configuration**: Use the established `ENTITY_CONFIGS` pattern for adding new resource types.
- **Clean Code**: Follow the layout patterns defined in `shared/components/ui`.
- **Responsive Design**: All pages use the standardized `PageLayout` component.

---
© 2026 Takshal Team
