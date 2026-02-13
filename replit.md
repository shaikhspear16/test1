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
- **Animations**: Framer Motion for page transitions and UI effects
- **State Management**: TanStack React Query for server state and caching
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful endpoints under `/api/*` prefix
- **File Uploads**: Multer for handling event image uploads
- **Static Serving**: Express static middleware for production builds

### Authentication System
- **Provider**: Replit OpenID Connect (OIDC) authentication
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **Admin Access Control**: Domain-based (`@gicmasjid.org`) OR whitelist-based via admin_users table; banned users are blocked
- **User Management**: Automatic user creation/update on login via upsert pattern

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` for shared types between client and server
- **Migrations**: Drizzle Kit with `db:push` command for schema synchronization
- **Validation**: Zod schemas generated from Drizzle tables via drizzle-zod

### Key Data Models
- **Events**: Stores event flyers with title, description, image URL, registration link, and display order
- **Admin Users**: Stores whitelisted/banned admin users with email, display name, banned and whitelisted flags
- **Users**: Stores authenticated user profiles from Replit Auth
- **Sessions**: Manages user sessions for authentication persistence
- **SMS Consents**: Stores phone numbers for SMS alert signups

### File Structure
- `client/`: React frontend application
- `server/`: Express backend with API routes
- `shared/`: Shared types and database schema
- `uploads/`: User-uploaded event images
- `migrations/`: Database migration files

## External Dependencies

### Third-Party Services
- **Replit Auth**: OpenID Connect authentication provider
- **PostgreSQL**: Primary database (provisioned via Replit)
- **Google Fonts**: Plus Jakarta Sans and Playfair Display typography

### External Links (configured in UI)
- **Mohid**: Online donation portal for the masjid
- **Calendly**: Imam office hours scheduling
- **Google Forms**: Various community forms (Nikkah requests, new Muslim contact)
- **Darul Uloom Austin**: Partner education organization

### Key npm Packages
- `drizzle-orm` / `drizzle-kit`: Database ORM and migration tooling
- `passport` / `openid-client`: Authentication middleware
- `multer`: Multipart form handling for file uploads
- `express-session` / `connect-pg-simple`: Session management
- `@tanstack/react-query`: Async state management
- `framer-motion`: Animation library
- `embla-carousel-react`: Carousel component for event flyers