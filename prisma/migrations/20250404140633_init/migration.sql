-- CreateTable
CREATE TABLE "assistidos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "documento" TEXT NOT NULL,

    CONSTRAINT "assistidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estoque" (
    "id" SERIAL NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "descricao" VARCHAR(255),
    "data_atualizacao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "retirada_estoque" (
    "id" SERIAL NOT NULL,
    "retirada_id" INTEGER NOT NULL,
    "quantidade_retirada" INTEGER NOT NULL,
    "estoque_id" INTEGER NOT NULL,
    "data_retirada" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "retirada_estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "retiradas" (
    "id" SERIAL NOT NULL,
    "assistido_id" INTEGER NOT NULL,
    "data_retirada" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "retiradas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "retirada_estoque" ADD CONSTRAINT "retirada_estoque_estoque_id_fkey" FOREIGN KEY ("estoque_id") REFERENCES "estoque"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "retirada_estoque" ADD CONSTRAINT "retirada_estoque_retirada_id_fkey" FOREIGN KEY ("retirada_id") REFERENCES "retiradas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "retiradas" ADD CONSTRAINT "fk_assistido" FOREIGN KEY ("assistido_id") REFERENCES "assistidos"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
