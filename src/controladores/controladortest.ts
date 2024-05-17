import { PrismaClient } from "@prisma/client";
import {Request, Response} from 'express';

const prisma = new PrismaClient();

// Obtener todos los tipe test
export const getAlltests = async (req: Request, res: Response) => {
    try {
      const test = await prisma.tipo_de_examen.findMany({
        where: {
          estado: {
            not: 'ELIMINADO',
          },
        },
      });
      res.status(200).json(test);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener los tipos de examenes ', error: error.message });
    }
  };

// Obtener un resultado por su ID
export const gettestById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const tests = await prisma.tipo_de_examen.findUnique({
      where: {
        id_examen: Number(id),
      },
    });
    if (!tests || tests.estado === 'ELIMINADO') {
      return res.status(404).json({ message: 'tipo de examen no encontrado' });
    }
    res.status(200).json(tests);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener los tipos de examenes', error: error.message });
  }
};

// Crear un nuevo test
export const createtest = async (req: Request, res: Response) => {
  const { Descripcion, Indicaciones } = req.body;
  try {
    const nuevotest = await prisma.tipo_de_examen.create({
      data: 
      {
        Descripcion,
        Indicaciones,
      },
    });
    res.status(201).json(nuevotest);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al crear el tipo de examen', error: error.message });
  }
};

// Actualizar un tipo de examen existente
export const updatetest = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { Descripcion,  Indicaciones } = req.body;
  try {
    const testActualizado = await prisma.tipo_de_examen.update({
      where: {
        id_examen: Number(id),
      },
      data: {
        Descripcion,
        Indicaciones,
      },
    });
    res.status(200).json(testActualizado);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al actualizar el tipo de examen', error: error.message });
  }
};

// Eliminar un tipo de examen
export const deletetest = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const testEliminado = await prisma.tipo_de_examen.update({
      where: { id_examen: Number(id) },
      data: { estado: 'ELIMINADO' },
    });
    res.status(200).json(testEliminado);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al eliminar el tipo de examen', error: error.message });
  }
};
  
  