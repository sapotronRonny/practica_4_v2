-- CreateEnum
CREATE TYPE "estado" AS ENUM ('ACTIVO', 'PENDIENTE', 'ELIMINADO');

-- CreateTable
CREATE TABLE "paciente" (
    "id_paciente" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "CI_paciente" INTEGER NOT NULL,

    CONSTRAINT "paciente_pkey" PRIMARY KEY ("id_paciente")
);

-- CreateTable
CREATE TABLE "tipo_de_examen" (
    "id_examen" SERIAL NOT NULL,
    "Descripcion" TEXT NOT NULL,
    "Indicaciones" TEXT NOT NULL,

    CONSTRAINT "tipo_de_examen_pkey" PRIMARY KEY ("id_examen")
);

-- CreateTable
CREATE TABLE "resultado" (
    "id" SERIAL NOT NULL,
    "Resultado_test" TEXT NOT NULL,
    "valor_paga" INTEGER NOT NULL,
    "observaciones" TEXT NOT NULL,
    "paciente_id" INTEGER NOT NULL,
    "examen_id" INTEGER NOT NULL,

    CONSTRAINT "resultado_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "resultado" ADD CONSTRAINT "resultado_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "paciente"("id_paciente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resultado" ADD CONSTRAINT "resultado_examen_id_fkey" FOREIGN KEY ("examen_id") REFERENCES "tipo_de_examen"("id_examen") ON DELETE RESTRICT ON UPDATE CASCADE;
