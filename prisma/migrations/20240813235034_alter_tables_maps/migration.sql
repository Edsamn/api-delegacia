/*
  Warnings:

  - You are about to drop the `arma` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `crime` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "arma" DROP CONSTRAINT "arma_crime_id_fkey";

-- DropForeignKey
ALTER TABLE "crime" DROP CONSTRAINT "crime_criminoso_id_fkey";

-- DropTable
DROP TABLE "arma";

-- DropTable
DROP TABLE "crime";

-- CreateTable
CREATE TABLE "armas" (
    "id" UUID NOT NULL,
    "tipo" VARCHAR(50) NOT NULL,
    "apreendida" BOOLEAN NOT NULL DEFAULT false,
    "crime_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "armas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crimes" (
    "id" UUID NOT NULL,
    "data" TEXT NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "observacoes" VARCHAR(150),
    "criminoso_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crimes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "armas" ADD CONSTRAINT "armas_crime_id_fkey" FOREIGN KEY ("crime_id") REFERENCES "crimes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crimes" ADD CONSTRAINT "crimes_criminoso_id_fkey" FOREIGN KEY ("criminoso_id") REFERENCES "criminosos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
