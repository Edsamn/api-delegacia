-- CreateTable
CREATE TABLE "arma" (
    "id" UUID NOT NULL,
    "tipo" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "arma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "criminosos" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "cpf" VARCHAR(15) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "criminosos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crime" (
    "id" UUID NOT NULL,
    "data" TEXT NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "observacoes" VARCHAR(150),
    "criminoso_id" UUID NOT NULL,
    "arma_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crime_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "crime" ADD CONSTRAINT "crime_criminoso_id_fkey" FOREIGN KEY ("criminoso_id") REFERENCES "criminosos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crime" ADD CONSTRAINT "crime_arma_id_fkey" FOREIGN KEY ("arma_id") REFERENCES "arma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
