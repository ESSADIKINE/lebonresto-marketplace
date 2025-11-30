# LeBonResto – Backend API

> A comprehensive REST API for a restaurant marketplace platform built with NestJS, Supabase, and TypeScript.

**LeBonResto** est une plateforme de marketplace pour restaurants permettant aux utilisateurs de découvrir, réserver et interagir avec des restaurants. Ce backend fournit une API REST complète avec authentification JWT, gestion des rôles, et intégrations externes (Google Drive, Cloudinary).

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Authentication & Authorization](#authentication--authorization)
- [Project Structure](#project-structure)
- [Module Descriptions](#module-descriptions)
- [Development Guidelines](#development-guidelines)
- [Deployment](#deployment)

## 🎯 Overview

LeBonResto Backend provides a complete API for managing:

- **🏙️ Geographic & Classification**: Cities, categories, tags
- **👥 User Management**: Customers, restaurant owners, platform admins
- **🍽️ Restaurant Operations**: Restaurant profiles, menus, plats (dishes), images, events
- **📅 Reservations & Interactions**: Table bookings, customer feedback, notifications
- **🔐 Security**: JWT authentication, role-based access control, OTP flows
- **☁️ External Services**: Google Drive (PDF menus), Cloudinary (images)

## 🛠️ Tech Stack

### Core Framework
- **[NestJS](https://nestjs.com/)** - Progressive Node.js framework (TypeScript)
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **Node.js** v18+ runtime

### Database & Storage
- **[Supabase](https://supabase.com/)** - PostgreSQL database with REST API
  - Supabase JS Client (v2)
  - Service Role Key for backend operations (bypasses RLS)
  - Row Level Security (RLS) enabled on tables
- **[Cloudinary](https://cloudinary.com/)** - Storage for images and PDF menus

### Security & Authentication
- **JWT** - Access tokens (15min) + Refresh tokens (7 days)
- **Bcrypt** - Password hashing
- **Passport** - Authentication middleware
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API throttling
- **Class Validator** - DTO validation

### API Documentation
- **[Swagger](https://swagger.io/)** - OpenAPI/Swagger UI at `/api`

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Morgan** - HTTP request logger

## 🏗️ Architecture

### Layered Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     HTTP Layer (REST)                        │
│                  Controllers (routes)                        │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  Business Logic Layer                        │
│                  Services (orchestration)                    │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   Data Access Layer                          │
│           Repositories (Supabase queries)                    │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  Supabase (PostgreSQL)                       │
│                  External APIs (Cloudinary)                  │
└─────────────────────────────────────────────────────────────┘
```

### Key Principles

1. **Repository Pattern**: All database operations isolated in `*.repository.ts` files
2. **Service Layer**: Business logic and orchestration in `*.service.ts` files
3. **DTO Validation**: Request/response validation with class-validator
4. **Dependency Injection**: NestJS modules for loose coupling
5. **Global Guards**: JWT authentication and role-based authorization
6. **Exception Handling**: Centralized error handling with custom filters

## 🗄️ Database Schema

### Supabase Tables

#### Reference Data
- **`cities`** - Available cities for restaurants
- **`categories`** - Restaurant categories (Italian, French, etc.)
- **`tags`** - Restaurant tags (terrasse, halal, wifi, etc.)

#### User Management
- **`customers`** - Platform customers
  - `id`, `email`, `first_name`, `last_name`, `phone`, `password_hash`
- **`owners`** - Restaurant owners
  - `id`, `email`, `first_name`, `last_name`, `phone`, `password_hash`
- **`admins`** - Platform administrators
  - `id`, `email`, `first_name`, `last_name`, `admin_role` (SUPER_ADMIN | MODERATOR | SUPPORT)

#### Core Entities
- **`restaurants`** - Restaurant profiles
  - `id`, `name`, `description`, `address`, `phone`, `email`
  - `city_id` (FK), `category_id` (FK), `owner_id` (FK)
  - `status` (PENDING | APPROVED | REJECTED | SUSPENDED)
- **`menus`** - Restaurant menus
  - `id`, `name`, `description`, `restaurant_id` (FK), `pdf_url`
- **`plats`** - Individual dishes
  - `id`, `name`, `description`, `price`, `restaurant_id` (FK), `menu_id` (FK)
- **`restaurant_images`** - Restaurant photos
  - `id`, `url`, `restaurant_id` (FK), `is_primary`
- **`restaurant_tags`** - Many-to-many relation (restaurants ↔ tags)
  - `restaurant_id` (FK), `tag_id` (FK)

#### Operations
- **`reservations`** - Table bookings
  - `id`, `customer_id` (FK), `restaurant_id` (FK)
  - `reservation_date`, `party_size`, `status` (PENDING | CONFIRMED | CANCELLED | COMPLETED | NO_SHOW)
- **`feedback`** - Customer reviews
  - `id`, `customer_id` (FK), `restaurant_id` (FK)
  - `rating`, `comment`
- **`events`** - Restaurant events
  - `id`, `title`, `description`, `restaurant_id` (FK)
  - `event_date`, `event_type`
- **`notifications`** - User notifications
  - `id`, `user_id`, `message`, `is_seen`
- **`contact_messages`** - Contact form submissions
  - `id`, `name`, `email`, `subject`, `message`

### Row Level Security (RLS)

- **Enabled** on all public tables
- Backend uses **`service_role` key** → bypasses RLS (full access)
- Frontend (if direct Supabase access) uses **`anon` key** → RLS policies apply
- **Never expose service_role key to frontend**

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and npm
- **Supabase account** with project created
- **Cloudinary account** (for image and PDF hosting)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lebonresto-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. **Set up Supabase database**
   - Create tables using Supabase SQL editor
   - Enable RLS policies (if using direct client access)
   - Copy `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

### Running the Application

#### Development Mode
```bash
npm run start:dev
```
The server starts at `http://localhost:3000`

#### Production Mode
```bash
npm run build
npm run start:prod
```

#### Watch Mode (auto-restart)
```bash
npm run start:dev
```

### Accessing API Documentation

Open your browser and navigate to:
```
http://localhost:3000/api
```

You'll see the Swagger UI with all available endpoints.

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# ===================================
# SERVER CONFIGURATION
# ===================================
PORT=3000
NODE_ENV=development

# ===================================
# SUPABASE (PostgreSQL Database)
# ===================================
SUPABASE_URL=https://xxxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ===================================
# JWT AUTHENTICATION
# ===================================
JWT_ACCESS_SECRET=your-super-secret-access-key-change-this-in-production
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-super-secret-refresh-key-different-from-access
JWT_REFRESH_EXPIRES_IN=7d

# ===================================
# SECURITY & RATE LIMITING
# ===================================
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
CORS_ORIGINS=http://localhost:3000,http://localhost:4200

# ===================================
# CLOUDINARY (Image & PDF Hosting)
# ===================================
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your-api-secret
```

> **⚠️ Security Warning**: Never commit `.env` file to version control. Use `.env.example` for documentation.

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Swagger UI
```
http://localhost:3000/api
```

### Main Endpoint Groups

| Group | Base Path | Description |
|-------|-----------|-------------|
| **Auth** | `/auth` | Login, register, refresh token, OTP |
| **Customers** | `/customers` | Customer CRUD + reservations, notifications, feedback |
| **Owners** | `/owners` | Restaurant owner management |
| **Admins** | `/admins` | Platform administrator management |
| **Restaurants** | `/restaurants` | Restaurant CRUD + menus, plats, images, tags, events, search |
| **Menus** | `/menus` | Menu management |
| **Plats** | `/plats` | Dish management |
| **Reservations** | `/reservations` | Table booking management |
| **Feedback** | `/feedback` | Customer reviews |
| **Events** | `/events` | Restaurant events |
| **Notifications** | `/notifications` | User notifications |
| **Cities** | `/cities` | City reference data |
| **Categories** | `/categories` | Restaurant categories |
| **Tags** | `/tags` | Restaurant tags |

### Example Requests

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "customer@example.com",
  "password": "password123",
  "role": "customer"
}
```

#### Create Restaurant
```http
POST /restaurants
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Dar Tajine Agadir",
  "description": "Authentic Moroccan cuisine",
  "address": "123 Rue Mohammed V",
  "phone": "+212 5 28 84 12 34",
  "email": "contact@dartajine.ma",
  "city_id": "uuid-of-agadir",
  "category_id": "uuid-of-moroccan-category"
}
```

#### Search Restaurants
```http
GET /restaurants/search?cityId=uuid&categoryId=uuid&q=tagine
Authorization: Bearer <access_token>
```

## 🔐 Authentication & Authorization

### Authentication Flow

1. **Registration**: `POST /auth/register/customer` or `/auth/register/owner`
   - Password hashed with bcrypt
   - Returns access + refresh tokens

2. **Login**: `POST /auth/login`
   - Validates credentials
   - Returns access token (15min) + refresh token (7 days)

3. **Token Refresh**: `POST /auth/refresh`
   - Send refresh token
   - Get new access token

4. **OTP Flow** (optional):
   - Request OTP: `POST /auth/send-otp`
   - Verify OTP: `POST /auth/verify-otp`

### Role-Based Access Control (RBAC)

Three user roles:

| Role | Description | Access Level |
|------|-------------|--------------|
| **Customer** | Platform users | Read restaurants, create reservations, leave feedback |
| **Owner** | Restaurant owners | Manage own restaurants, menus, plats, events |
| **Admin** | Platform administrators | Full access (SUPER_ADMIN, MODERATOR, SUPPORT) |

### Protected Routes

Use `@UseGuards(JwtAuthGuard, RolesGuard)` decorator:

```typescript
@Post()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('owner')
createRestaurant(@Body() dto: CreateRestaurantDto) {
  // Only owners can create restaurants
}
```

## 📁 Project Structure

```
lebonresto-backend/
├── src/
│   ├── main.ts                       # Application entry point
│   ├── app.module.ts                 # Root module
│   │
│   ├── common/                       # Shared utilities
│   │   ├── config/
│   │   │   ├── configuration.ts      # Environment config
│   │   │   └── validation.ts         # Env validation schema
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts  # Global error handler
│   │   ├── guards/
│   │   │   └── roles.guard.ts        # Role-based access
│   │   ├── decorators/
│   │   │   └── roles.decorator.ts    # @Roles() decorator
│   │   └── pipes/
│   │       └── validation.pipe.ts    # Global validation
│   │
│   ├── database/                     # Supabase integration
│   │   ├── database.module.ts
│   │   └── supabase.service.ts       # Supabase client wrapper
│   │
│   ├── modules/                      # Domain modules
│   │   ├── auth/                     # Authentication
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt-access.strategy.ts
│   │   │   │   └── jwt-refresh.strategy.ts
│   │   │   ├── guards/
│   │   │   │   └── jwt-auth.guard.ts
│   │   │   └── dto/
│   │   │       ├── login.dto.ts
│   │   │       ├── register-customer.dto.ts
│   │   │       └── refresh-token.dto.ts
│   │   │
│   │   ├── customers/                # Customer management
│   │   │   ├── customers.module.ts
│   │   │   ├── customers.controller.ts
│   │   │   ├── customers.service.ts
│   │   │   ├── customers.repository.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-customer.dto.ts
│   │   │   │   └── update-customer.dto.ts
│   │   │   └── entities/
│   │   │       └── customer.entity.ts
│   │   │
│   │   ├── owners/                   # Restaurant owners
│   │   ├── admins/                   # Platform admins
│   │   ├── restaurants/              # Restaurant management
│   │   ├── menus/                    # Menu management
│   │   ├── plats/                    # Dish management
│   │   ├── reservations/             # Booking management
│   │   ├── feedback/                 # Review management
│   │   ├── events/                   # Event management
│   │   ├── notifications/            # Notification system
│   │   ├── cities/                   # City reference
│   │   ├── categories/               # Category reference
│   │   └── tags/                     # Tag reference
│   │
│   └── cloudinary/                   # Cloudinary integration
│       ├── cloudinary.module.ts
│       └── cloudinary.service.ts     # Image & PDF upload
│
├── test/                             # E2E tests
├── .env                              # Environment variables (not in git)
├── .env.example                      # Environment template
├── nest-cli.json                     # NestJS CLI config
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
└── README.md                         # This file
```

## 📦 Module Descriptions

### Core Modules

#### Auth Module
**Purpose**: Handle authentication and authorization  
**Key Features**:
- User registration (customer, owner)
- JWT-based login
- Access/refresh token generation
- OTP flows
- Password hashing with bcrypt

**Endpoints**:
- `POST /auth/login` - User login
- `POST /auth/register/customer` - Customer registration
- `POST /auth/register/owner` - Owner registration
- `POST /auth/refresh` - Refresh access token
- `POST /auth/send-otp` - Request OTP
- `POST /auth/verify-otp` - Verify OTP

---

#### Restaurants Module
**Purpose**: Manage restaurant profiles and related data  
**Key Features**:
- Full CRUD for restaurants
- Search and filtering
- Relational endpoints (menus, plats, images, tags, events, reservations, feedback)
- Restaurant summary with aggregated stats

**Endpoints**:
- `GET /restaurants` - List all restaurants
- `POST /restaurants` - Create restaurant
- `GET /restaurants/:id` - Get restaurant details
- `PATCH /restaurants/:id` - Update restaurant
- `DELETE /restaurants/:id` - Delete restaurant
- `GET /restaurants/search?cityId&categoryId&tagId&q` - Search
- `GET /restaurants/:id/menus` - Get restaurant menus
- `GET /restaurants/:id/plats` - Get restaurant dishes
- `GET /restaurants/:id/summary` - Get aggregated stats
- `POST /restaurants/:id/upload-image` - Upload images

---

#### Customers Module
**Purpose**: Manage customer accounts  
**Key Features**:
- Customer CRUD
- Fetch customer's reservations
- Fetch customer's notifications
- Fetch customer's feedback

**Endpoints**:
- `GET /customers` - List customers
- `GET /customers/:id` - Get customer
- `PATCH /customers/:id` - Update customer
- `GET /customers/:id/reservations` - Customer's bookings
- `GET /customers/:id/notifications` - Customer's notifications
- `GET /customers/:id/feedback` - Customer's reviews

---

#### Reservations Module
**Purpose**: Manage table bookings  
**Key Features**:
- Create/update/cancel reservations
- List reservations by restaurant or customer
- Status management (PENDING, CONFIRMED, CANCELLED, COMPLETED, NO_SHOW)

**Endpoints**:
- `POST /reservations` - Create reservation
- `GET /reservations` - List reservations
- `GET /reservations/:id` - Get reservation
- `PATCH /reservations/:id` - Update reservation status
- `DELETE /reservations/:id` - Cancel reservation

---

### External Service Modules

#### Cloudinary Module
**Purpose**: Image and PDF hosting and optimization  
**Key Features**:
- Upload restaurant images
- Upload PDF menus
- Image transformations
- CDN delivery
- Cloudinary URL storage

---

### Reference Data Modules

#### Cities, Categories, Tags
**Purpose**: Provide reference data for restaurants  
**Features**:
- Simple CRUD operations
- Used in restaurant filtering
- Fetched for dropdowns in frontend

## 💻 Development Guidelines

### Adding a New Module

1. **Generate module skeleton**:
   ```bash
   nest g module modules/my-module
   nest g controller modules/my-module
   nest g service modules/my-module
   ```

2. **Create repository** (if database access needed):
   ```typescript
   // my-module.repository.ts
   @Injectable()
   export class MyModuleRepository {
     constructor(private readonly supabase: SupabaseService) {}
     
     async findAll() {
       const { data, error } = await this.supabase
         .getClient()
         .from('my_table')
         .select('*');
       
       if (error) throw new InternalServerErrorException(error.message);
       return data;
     }
   }
   ```

3. **Create DTOs**:
   ```typescript
   // dto/create-my-entity.dto.ts
   export class CreateMyEntityDto {
     @IsString()
     @IsNotEmpty()
     name: string;
     
     @IsOptional()
     @IsString()
     description?: string;
   }
   ```

4. **Implement service logic**:
   ```typescript
   @Injectable()
   export class MyModuleService {
     constructor(private readonly repository: MyModuleRepository) {}
     
     create(dto: CreateMyEntityDto) {
       return this.repository.create(dto);
     }
   }
   ```

5. **Add controller endpoints**:
   ```typescript
   @ApiTags('my-module')
   @Controller('my-module')
   export class MyModuleController {
     constructor(private readonly service: MyModuleService) {}
     
     @Post()
     @UseGuards(JwtAuthGuard)
     create(@Body() dto: CreateMyEntityDto) {
       return this.service.create(dto);
     }
   }
   ```

### Code Style

- Use **TypeScript strict mode**
- Follow **NestJS** conventions
- Use **class-validator** decorators for DTOs
- Write **descriptive variable names**
- Add **JSDoc comments** for complex logic
- Keep methods **small and focused**

### Error Handling

Always throw NestJS exceptions:

```typescript
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

// Not found
throw new NotFoundException(`Resource with ID ${id} not found`);

// Database errors
if (error) {
  throw new InternalServerErrorException(error.message);
}
```

### Testing

Run tests:
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

## 🚀 Deployment

### Environment-Specific Configs

- **Development**: `.env` (local)
- **Staging**: Set env vars in hosting platform
- **Production**: Set env vars in hosting platform

### Deployment Platforms

#### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Create `vercel.json`:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "dist/main.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "dist/main.js"
       }
     ]
   }
   ```
3. Deploy: `vercel --prod`

#### Railway
1. Connect GitHub repository
2. Set environment variables in Railway dashboard
3. Railway auto-deploys on push

#### Heroku
1. Install Heroku CLI
2. Create Heroku app: `heroku create`
3. Set env vars: `heroku config:set KEY=VALUE`
4. Deploy: `git push heroku main`

### Pre-Deployment Checklist

- [ ] All environment variables set
- [ ] Database migrations applied
- [ ] Google Drive service account configured
- [ ] Cloudinary credentials valid
- [ ] CORS origins updated for production domain
- [ ] Rate limits configured appropriately
- [ ] Swagger disabled in production (optional)

## 📝 License

[Your License Here]

## 👥 Contributors

[Your Team/Contributors]

## 📞 Support

For issues or questions:
- **Email**: support@lebonresto.ma
- **GitHub Issues**: [Your Repo URL]

---

**Built with ❤️ using NestJS and Supabase**
