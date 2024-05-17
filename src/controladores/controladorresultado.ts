import { PrismaClient } from "@prisma/client";
import {Request, Response} from 'express';

const prisma = new PrismaClient();

// Obtener todos los RESULTDOS
export const getAllRESULTADOS = async (req: Request, res: Response) => {
    try {
      const resultados = await prisma.resultado.findMany({
        where: {
          estado: {
            not: 'ELIMINADO',
          },
        },
      });
      res.status(200).json(resultados);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener los resultado ', error: error.message });
    }
  };

// Obtener un resultado por su ID
export const getresultadoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const resultado = await prisma.resultado.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!resultado || resultado.estado === 'ELIMINADO') {
      return res.status(404).json({ message: 'resultado no encontrado' });
    }
    res.status(200).json(resultado);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener el resultado', error: error.message });
  }
};

// Crear un nuevo resultado
export const createResultado = async (req: Request, res: Response) => {
  const { Resultado_test, valor_paga, observaciones, paciente_id, examen_id } = req.body;
  try {
    const nuevoResultado = await prisma.resultado.create({
      data: 
      {
        Resultado_test,
        valor_paga,
        observaciones,
        paciente: { connect: { id_paciente: paciente_id } },
        tipo_de_examen: { connect: { id_examen: examen_id } }
      },
    });
    res.status(201).json(nuevoResultado);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al crear el resultado', error: error.message });
  }
};

// Actualizar un resultado existente
export const updateResultado = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { Resultado_test, valor_paga, observaciones, paciente_id, examen_id } = req.body;
  try {
    const resultadoActualizado = await prisma.resultado.update({
      where: {
        id: Number(id),
      },
      data: {
        Resultado_test,
        valor_paga,
        observaciones,
        paciente: { connect: { id_paciente: paciente_id } },
        tipo_de_examen: { connect: { id_examen: examen_id } }
      },
    });
    res.status(200).json(resultadoActualizado);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al actualizar el resultado', error: error.message });
  }
};

// Eliminar un resultado
export const deleteResultado = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const resultadoEliminado = await prisma.resultado.update({
      where: { id: Number(id) },
      data: { estado: 'ELIMINADO' },
    });
    res.status(200).json(resultadoEliminado);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al eliminar el resultado', error: error.message });
  }
};
  
  