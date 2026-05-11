# Stayin 🏠

Finding accommodation in South Africa shouldn't mean joining 
20 WhatsApp groups and hoping a landlord notices your message.
And listing a property shouldn't either.

Stayin is a two-sided accommodation platform connecting tenants and 
landlords across South Africa — tenants browse and apply, landlords 
list and manage, all in one place.

## The Problem

**For tenants:**
- Join multiple WhatsApp groups just to start looking
- Post your budget and requirements and hope a landlord sees it
- Receive floods of unstructured photos with no context
- Listings missing key info (amenities, nearby places, accreditation)
- No way to vet potential roommates before moving in together

**For landlords:**
- Broadcast to WhatsApp groups with no structure or reach
- Manually answer the same questions from every interested tenant
- No way to screen or compare applicants properly
- No central place to manage inquiries and availability

## Features

### 🏘️ Browse & Discover (Tenant)
- Property cards showing room type, rent, key benefits and photos
- Filter by type (Backroom, NSFAS, Single, etc.)
- Save properties for later
- No account required to browse

### 📋 Property Listings (Tenant)
- Full photo gallery with carousel and thumbnail navigation
- Interactive map showing nearby places with travel times
- Pricing breakdown — rent, deposit, admin fee and total move-in amount
- NSFAS accreditation badge
- Request to view — pre-written message sent directly to landlord
- Room type, house rules, about the place and amenities
- Load shedding readiness (gas, solar, etc.)
- Security features (electric fence, CCTV, etc.)
- Landlord card — avatar, name, rating and response time
- Tenant reviews — star ratings, comments and average score

### 📁 My Applications (Tenant)
- Track all submitted viewing requests
- Application status — Pending, Viewed, Shortlisted, Rejected
- Retract an application at any time

### 🔖 Saved Places (Tenant)
- Saved property cards with photo, name, location and monthly rent
- Remove saves at any time

### 💬 Messages (Tenant & Landlord)
- Inbox with avatar, room type, location and last message preview

### 🏗️ Property Management (Landlord)
- Upload and manage property listings
- Add photos, amenities, house rules, pricing and accreditation info
- Mark properties as available or unavailable
- Landlord dashboard to oversee all listings in one place

### 📊 Applications Dashboard (Landlord)
- View and manage all incoming viewing requests
- Update application status — Pending, Viewed, Shortlisted, Rejected
- Compare applicants including their roommate quiz results and trust score

### 👤 Account & Profile (Tenant & Landlord)
- Register as a tenant or landlord
- 8-question roommate/tenant compatibility quiz on sign up
- Editable profile — about me, study information, institution
- Quiz output card with option to retake
- Trust score — comments from previous or current landlords
- App settings — dark/light mode, change email or password

## Tech Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Frontend    | Next.js, Tailwind CSS, shadcn/ui  |
| Backend     | Node.js, Next.js API Routes       |
| Database    | PostgreSQL + Prisma ORM           |
| Deployment  | Vercel (frontend), Railway (DB)   |

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (or a Railway instance)

### Installation

1. Clone the repo
```bash
   git clone https://github.com/Sphesihlesfiso/StayIN.git
   cd stayin
```

2. Install dependencies
```bash
   npm install
```

3. Set up environment variables
```bash
   cp .env.example .env
```
   Fill in your `DATABASE_URL` and any other required variables.

4. Run database migrations
```bash
   npx prisma migrate dev
```

5. Start the development server
```bash
   npm run dev
```

   Open [http://localhost:3000](http://localhost:3000)

## Deployment

- **Frontend & API** — deployed on [Vercel](https://vercel.com)
- **Database** — PostgreSQL hosted on [Railway](https://railway.app)



## Author

Built by Sphesihle Mabaso  inspired by firsthand frustration finding 
accommodation in Stellenbosch.