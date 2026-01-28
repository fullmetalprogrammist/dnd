-- CreateTable
CREATE TABLE "project" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "project_status" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "short_name" VARCHAR(100) NOT NULL,
    "portrait_filename" VARCHAR(255),

    CONSTRAINT "character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scene" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "picture_filename" VARCHAR(255) NOT NULL,

    CONSTRAINT "scene_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "line" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "line_text" TEXT NOT NULL,
    "character_id" INTEGER,
    "in_project_order" INTEGER NOT NULL,
    "scene_id" INTEGER,
    "in_scene_order" INTEGER,

    CONSTRAINT "line_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "project_code_key" ON "project"("code");

-- CreateIndex
CREATE INDEX "idx_character_project_id" ON "character"("project_id");

-- CreateIndex
CREATE INDEX "idx_line_project_id" ON "line"("project_id");

-- CreateIndex
CREATE INDEX "idx_line_character_id" ON "line"("character_id");

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scene" ADD CONSTRAINT "scene_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "line" ADD CONSTRAINT "line_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "line" ADD CONSTRAINT "line_scene_id_fkey" FOREIGN KEY ("scene_id") REFERENCES "scene"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "line" ADD CONSTRAINT "line_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "character"("id") ON DELETE SET NULL ON UPDATE CASCADE;
