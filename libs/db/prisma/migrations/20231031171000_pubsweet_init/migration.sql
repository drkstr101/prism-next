-- CreateTable
CREATE TABLE "entities" (
    "id" UUID NOT NULL,
    "data" JSONB,

    CONSTRAINT "entities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "identities" (
    "id" UUID NOT NULL,
    "created" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMPTZ(6),
    "user_id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT,
    "oauth_access_token" TEXT,
    "oauth_refresh_token" TEXT,
    "is_default" BOOLEAN DEFAULT false,
    "email" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_social" BOOLEAN,
    "profile_data" JSONB,
    "verification_token" TEXT,
    "verification_token_timestamp" TIMESTAMPTZ(6),

    CONSTRAINT "identities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "migrations" (
    "id" TEXT NOT NULL,
    "run_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "migrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_members" (
    "id" UUID NOT NULL,
    "created" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(255),
    "team_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "team_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" UUID NOT NULL,
    "created" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMPTZ(6),
    "object_id" UUID,
    "object_type" VARCHAR(255),
    "display_name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "global" BOOLEAN DEFAULT false,
    "type" TEXT NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "created" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMPTZ(6),
    "username" VARCHAR(255),
    "password_hash" TEXT,
    "password_reset_token" TEXT,
    "password_reset_timestamp" TIMESTAMPTZ(6),
    "agreed_tc" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "invitation_token" TEXT,
    "invitation_token_timestamp" TIMESTAMPTZ(6),
    "given_names" TEXT,
    "surname" TEXT,
    "title_pre" TEXT,
    "title_post" TEXT,
    "type" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_email" ON "identities"("email");

-- CreateIndex
CREATE UNIQUE INDEX "unique_verification_token" ON "identities"("verification_token");

-- CreateIndex
CREATE UNIQUE INDEX "team_members_team_id_user_id_unique" ON "team_members"("team_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_unique" ON "users"("username");

-- AddForeignKey
ALTER TABLE "identities" ADD CONSTRAINT "identities_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_team_id_foreign" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
