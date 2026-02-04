# PakEcom

## Overview

PakEcom is a full-stack e-commerce platform targeting the Pakistani market, featuring traditional and modern products including Kurtas, women's wear, Peshawari Chappals, and electronics. The application provides a complete shopping experience with product browsing, cart management, checkout flow, and contact functionality. Prices are displayed in Pakistani Rupees (PKR) with localized messaging like "Cash on Delivery Available Across Pakistan."

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library (Radix UI primitives)
- **State Management**: Zustand with localStorage persistence for cart functionality
- **Data Fetching**: TanStack React Query for server state management
- **Build Tool**: Vite with custom path aliases (@/, @shared/, @assets/)

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript with ES modules
- **API Pattern**: REST API with typed route definitions in shared/routes.ts
- **Validation**: Zod schemas for request/response validation

### Data Storage
- **Database**: PostgreSQL via Drizzle ORM
- **Schema Location**: shared/schema.ts (shared between client and server)
- **Migrations**: Drizzle Kit with migrations output to ./migrations
- **Connection**: pg Pool with DATABASE_URL environment variable

### Project Structure
```
client/           # Frontend React application
  src/
    components/   # UI components (layout, products, ui)
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
    pages/        # Route components
    store/        # Zustand stores
server/           # Backend Express application
  routes.ts       # API route handlers
  storage.ts      # Database access layer
  db.ts           # Database connection
shared/           # Shared code between client/server
  schema.ts       # Drizzle schema definitions
  routes.ts       # API route contracts
```

### Key Design Patterns
- **Shared Types**: Schema and route definitions are shared between frontend and backend for type safety
- **Storage Interface**: Database operations abstracted through IStorage interface for testability
- **Component Library**: shadcn/ui provides consistent, accessible UI primitives
- **Theme**: Pakistani green (#006400) and gold (#FFD700) color scheme with custom CSS variables

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, required via DATABASE_URL environment variable
- **Drizzle ORM**: Type-safe database queries and schema management

### UI Components
- **Radix UI**: Headless UI primitives (dialog, dropdown, toast, etc.)
- **Lucide React**: Icon library
- **Embla Carousel**: Product image carousels

### Form Handling
- **React Hook Form**: Form state management
- **@hookform/resolvers**: Zod integration for form validation

### Build & Development
- **Vite**: Development server with HMR and production bundling
- **esbuild**: Server-side bundling for production
- **Replit plugins**: Runtime error overlay, cartographer, dev banner