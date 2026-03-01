# Georgetown Islamic Center Website

## Overview

This is a community website for Georgetown Islamic Center (GIC), a masjid serving the Georgetown and Round Rock, Texas area. The application provides information about prayer times, events, education programs, donation options, and community resources. It includes an admin panel for managing event flyers with domain-restricted authentication.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS with shadcn/ui component library (new-york style)
- **Animations**: Framer Motion for page transitions (lazy-loaded pages only); CSS transitions for Navbar mobile menu
- **State Management**: TanStack React Query for server state and caching
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful endpoints under `/api/*` prefix
- **File Uploads**: Replit App Storage with presigned URL upload flow
- **Static Serving**: Express static middleware for production builds

### Authentication System
- **Provider**: Simple email/password login using ADMIN_EMAIL and ADMIN_PASSWORD secrets
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **Admin Access Control**: Single admin account verified against environment secrets

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` for shared types between client and server
- **Migrations**: Drizzle Kit with `db:push` command for schema synchronization
- **Validation**: Zod schemas generated from Drizzle tables via drizzle-zod

### Key Data Models
- **Events**: Stores event flyers with title, description, image URL, registration link, customizable button text, and display order
- **Sessions**: Manages user sessions for authentication persistence
- **SMS Consents**: Stores phone numbers for SMS alert signups
- **Newsletter Signups**: Stores email addresses and timestamps from newsletter form

### File Structure
- `client/`: React frontend application
- `server/`: Express backend with API routes
- `shared/`: Shared types and database schema
- `server/replit_integrations/`: Replit integration modules (object storage)
- `migrations/`: Database migration files

## External Dependencies

### Third-Party Services
- **PostgreSQL**: Primary database (provisioned via Replit)
- **Google Fonts**: Plus Jakarta Sans and Playfair Display typography

### External Links (configured in UI)
- **Mohid**: Online donation portal for the masjid
- **Calendly**: Imam office hours scheduling
- **Google Forms**: Various community forms (Nikkah requests, new Muslim contact)
- **Darul Uloom Austin**: Partner education organization

### Key npm Packages
- `drizzle-orm` / `drizzle-kit`: Database ORM and migration tooling
- `@google-cloud/storage`: Replit App Storage client
- `@uppy/core` / `@uppy/aws-s3` / `@uppy/dashboard` / `@uppy/react`: File upload UI components
- `express-session` / `connect-pg-simple`: Session management
- `@tanstack/react-query`: Async state management
- `framer-motion`: Animation library
- `embla-carousel-react`: Carousel component for event flyers