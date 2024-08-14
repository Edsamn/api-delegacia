/*
  Warnings:

  - You are about to drop the column `arma_id` on the `crime` table. All the data in the column will be lost.
  - Added the required column `crime_id` to the `arma` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "crime" DROP CONSTRAINT "crime_arma_id_fkey";

-- AlterTable
ALTER TABLE "arma" ADD COLUMN     "crime_id" UUID NOT NULL,
ALTER COLUMN "apreendida" SET DEFAULT true;

-- AlterTable
ALTER TABLE "crime" DROP COLUMN "arma_id";

-- AddForeignKey
ALTER TABLE "arma" ADD CONSTRAINT "arma_crime_id_fkey" FOREIGN KEY ("crime_id") REFERENCES "crime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
