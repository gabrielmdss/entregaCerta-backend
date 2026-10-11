# Entrega Certa API (v1)

REST API for the first version of **Entrega Certa**, a system that helps a non-profit manage food basket donations: beneficiaries, pickups and inventory.

> **This is version 1.** The project evolved into a full rewrite with authentication, role-based access control and a much larger domain:
> **[Entrega Certa API v2](https://github.com/gabrielmdss/entrega_certa_backend_v3)** · **[Web app v2](https://github.com/gabrielmdss/pastoral_fronted)**

**Live demo (v1):** [entregacerta-frontend.onrender.com](https://entregacerta-frontend.onrender.com/estoque) · **Frontend (v1):** [gabrielmdss/entregacerta-frontend](https://github.com/gabrielmdss/entregacerta-frontend)

> Hosted on Render's free tier: the first request may take up to a minute. The demo contains only fictional data.

## What it does

- **Beneficiaries**: registration with document photo, lookup by document and duplicate detection.
- **Pickups**: record each basket pickup, history per beneficiary, filters by period, pagination and monthly totals for charts.
- **Inventory**: stock items with manual adjustments, automatically decremented on each pickup.
- **Image upload**: signed direct uploads to Cloudinary, so files never pass through the API.

## Technical highlights

- **Layered architecture**: `domain` (entities and repository interfaces), `infrastructure` (Prisma repositories) and `application` (services, controllers, routes and middlewares).
- **Data protection**: identity documents are **encrypted at rest with AES-256-CBC** and a random IV per record. Lookups and uniqueness use a separate **HMAC-SHA256 hash**, so the plain document is never stored or indexed.
- **Centralized error handling**: a single middleware maps domain and database errors (e.g. unique violations) to consistent HTTP responses, and only logs unexpected 5xx errors.
- **Tests** with the built-in `node:test` runner covering services, document hashing, error handling and date grouping.

## Tech stack

Node.js · TypeScript · Express · Prisma · PostgreSQL · Cloudinary · node:test · Render

## API overview

Base path: `/api/entregaCerta`

| Resource | Endpoints |
|---|---|
| Beneficiaries | `GET/POST /assistido`, `GET/PUT/DELETE /assistido/:id`, `GET /assistido/documento/:documento`, `GET /assistido/total` |
| Pickups | `GET/POST /retirada`, `GET/PUT/DELETE /retirada/:id`, `GET /retirada/paginas/:page/:pageSize`, `GET /retirada/periodo/:inicio/:fim`, `GET /retirada/meses/:ano`, `GET /retirada/ultimas`, `GET /retirada/total` |
| Inventory | `GET/POST /estoque`, `GET/PUT/DELETE /estoque/:id`, `POST /estoque/ajuste/:id` |
| Uploads | `GET /imagem/upload` (Cloudinary upload signature) |

> **Known limitation:** v1 has no authentication, so the API is open to anyone with the URL. This was one of the main drivers for v2, which adds JWT authentication and permission-based access control.

## Getting started

Requirements: Node.js and PostgreSQL.

```bash
npm install
cp env_example .env   # database URL, Cloudinary credentials and the two crypto keys
npm run dev
```

`CRYPTO_KEY` and `DOCUMENTO_HASH_KEY` must be 64-character hex strings (32 bytes), e.g. `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.

| Script | What it does |
|---|---|
| `npm run dev` | Start in watch mode |
| `npm test` | Run the test suite |
| `npm run build` | Sync the Prisma schema, generate the client and compile |
| `npm start` | Run the compiled server |

## Author

**Gabriel Mendes**, Full Stack Developer · [Portfolio](https://gabriel-mendes-dev.vercel.app) · [LinkedIn](https://linkedin.com/in/gabrielmendesdeveloper)
