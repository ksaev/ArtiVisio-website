-- Migration baseline pour Administrateur, JobOffer, Newsletter

-- Table Administrateur
CREATE TABLE IF NOT EXISTS "Administrateur" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now()
);

-- Table JobOffer
CREATE TABLE IF NOT EXISTS "JobOffer" (
    "id" SERIAL PRIMARY KEY,
    "externalId" TEXT NOT NULL UNIQUE,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT,
    "salary" TEXT,
    "type" TEXT,
    "sector" TEXT,
    "description" TEXT NOT NULL,
    "requirements" TEXT,
    "clickCount" INT DEFAULT 0,
    "shareCount" INT DEFAULT 0,
    "link" TEXT NOT NULL
);

-- Table Newsletter
CREATE TABLE IF NOT EXISTS "Newsletter" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL UNIQUE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now()
);