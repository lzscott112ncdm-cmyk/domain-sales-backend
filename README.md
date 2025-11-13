
# Domain Marketplace Backend API

A RESTful API backend for managing and selling domain names, built with Express, TypeScript, and PostgreSQL.

## 🚀 Features

- **Domain Management**: CRUD operations for domain records
- **Admin Authentication**: Secure endpoints with Bearer token authentication
- **Currency Conversion**: Automatic USD to BRL conversion using exchangerate.host API
- **PostgreSQL Database**: Robust data storage with Prisma ORM
- **TypeScript**: Type-safe development experience

## 📋 Prerequisites

- Node.js 18+ (or any version supporting ES2020)
- PostgreSQL database
- npm, yarn, or pnpm package manager

## 🛠️ Installation

1. **Clone or extract the backend package**

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set your values:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `ADMIN_TOKEN`: Secure token for admin operations
   - `PORT`: Server port (default: 3001)

4. **Set up the database**
   ```bash
   npm run prisma:generate
   npm run prisma:push
   npm run prisma:seed
   ```

## 🎮 Usage

### Development Mode
```bash
npm run dev
```
Server runs on `http://localhost:3001` (or your configured PORT)

### Production Build
```bash
npm run build
npm start
```

### Database Management
```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema changes to database
npm run prisma:push

# Seed the database with example data
npm run prisma:seed

# Open Prisma Studio (visual database editor)
npm run prisma:studio
```

## 📡 API Endpoints

### Public Endpoints

#### Get All Active Domains
```http
GET /api/domains
```
Returns all active domains.

**Response:**
```json
[
  {
    "id": 1,
    "domain_name": "techstartup.com",
    "price_usd": 5000,
    "price_brl": 27500,
    "whatsapp_number": "+5521999998888",
    "afternic_url": "https://www.afternic.com/...",
    "active": true
  }
]
```

#### Get Single Domain
```http
GET /api/domain/:domain
```
Returns a single domain by domain name.

**Response:**
```json
{
  "id": 1,
  "domain_name": "techstartup.com",
  "price_usd": 5000,
  "price_brl": 27500,
  "whatsapp_number": "+5521999998888",
  "afternic_url": "https://www.afternic.com/...",
  "active": true
}
```

### Admin Endpoints

All admin endpoints require authentication via `Authorization` header:
```
Authorization: Bearer YOUR_ADMIN_TOKEN
```

#### Create Domain
```http
POST /api/admin/domain
Content-Type: application/json
Authorization: Bearer YOUR_ADMIN_TOKEN

{
  "domain_name": "newdomain.com",
  "price_usd": 10000,
  "whatsapp_number": "+5521999998888",
  "afternic_url": "https://www.afternic.com/..."
}
```

**Note:** `price_brl` is auto-calculated from current USD/BRL exchange rate.

#### Update Domain
```http
PUT /api/admin/domain/:id
Content-Type: application/json
Authorization: Bearer YOUR_ADMIN_TOKEN

{
  "price_usd": 12000,
  "active": true
}
```

#### Deactivate Domain
```http
DELETE /api/admin/domain/:id
Authorization: Bearer YOUR_ADMIN_TOKEN
```

Sets `active` to `false` instead of deleting the record.

## 🗄️ Database Schema

```prisma
model Domain {
  id              Int      @id @default(autoincrement())
  domain_name     String   @unique
  price_usd       Float
  price_brl       Float
  whatsapp_number String
  afternic_url    String
  active          Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

## 🔐 Security

- Admin endpoints protected with Bearer token authentication
- Token stored in environment variables
- Returns 401 Unauthorized for invalid/missing tokens
- Input validation on all admin operations

## 🌍 Currency Conversion

The API automatically converts USD to BRL using the exchangerate.host API:
- Real-time exchange rates
- Fallback rate of 5.5 if API fails
- Auto-calculates BRL price when only USD is provided

## 📝 Example Seed Data

The database comes pre-seeded with three example domains:
1. **techstartup.com** - $5,000 USD
2. **airevolution.com** - $12,500 USD
3. **cryptotrader.com** - $8,750 USD

## 🧪 Testing the API

Using curl:
```bash
# Get all domains
curl http://localhost:3001/api/domains

# Get specific domain
curl http://localhost:3001/api/domain/techstartup.com

# Create new domain (admin)
curl -X POST http://localhost:3001/api/admin/domain \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer domain-admin-2024-secure-token" \
  -d '{
    "domain_name": "example.com",
    "price_usd": 15000,
    "whatsapp_number": "+5521999998888",
    "afternic_url": "https://www.afternic.com/example"
  }'
```

## 📦 Project Structure

```
backend_package/
├── src/
│   ├── index.ts              # Express server entry point
│   ├── routes/
│   │   ├── domains.ts        # Public domain routes
│   │   └── admin.ts          # Admin-protected routes
│   ├── middleware/
│   │   └── auth.ts           # Authentication middleware
│   └── utils/
│       ├── db.ts             # Prisma client instance
│       ├── currency.ts       # Currency conversion
│       └── validation.ts     # Input validation
├── prisma/
│   └── schema.prisma         # Database schema
├── scripts/
│   └── seed.ts               # Database seeding script
├── package.json
├── tsconfig.json
└── .env
```

## 🚢 Deployment

For production deployment:

1. Set `NODE_ENV=production` in environment
2. Use a secure `ADMIN_TOKEN`
3. Configure a production PostgreSQL database
4. Build and run:
   ```bash
   npm run build
   npm start
   ```

## 🤝 Support

For issues or questions, please refer to the project documentation or contact support.

## 📄 License

MIT License - feel free to use this project for your domain marketplace needs.
