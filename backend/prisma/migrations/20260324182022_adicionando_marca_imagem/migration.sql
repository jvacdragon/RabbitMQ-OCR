-- CreateTable
CREATE TABLE "MarcaImagem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "imagemProcessadaId" INTEGER NOT NULL,
    CONSTRAINT "MarcaImagem_imagemProcessadaId_fkey" FOREIGN KEY ("imagemProcessadaId") REFERENCES "ImagemProcessada" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
