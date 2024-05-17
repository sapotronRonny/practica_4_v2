-- AlterTable
ALTER TABLE "paciente" ADD COLUMN     "estado" "estado" NOT NULL DEFAULT 'ACTIVO';

-- AlterTable
ALTER TABLE "resultado" ADD COLUMN     "estado" "estado" NOT NULL DEFAULT 'ACTIVO';

-- AlterTable
ALTER TABLE "tipo_de_examen" ADD COLUMN     "estado" "estado" NOT NULL DEFAULT 'ACTIVO';
