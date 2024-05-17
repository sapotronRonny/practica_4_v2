import { PrismaClient } from "@prisma/client";
import {Request, Response} from 'express';

const prisma = new PrismaClient();

// Obtener todos los pacientes
export const getAllPACIENTES = async (req: Request, res: Response) => {
    try {
      const pacientes = await prisma.paciente.findMany({
        where: {
          estado: {
            not: 'ELIMINADO',
          },
        },
      });
      res.status(200).json(pacientes);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener los pacientes ', error: error.message });
    }
  };

// Obtener un paciente por su ID
export const getpacienteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const paciente = await prisma.paciente.findUnique({
      where: {
        id_paciente: Number(id),
      },
    });
    if (!paciente || paciente.estado === 'ELIMINADO') {
      return res.status(404).json({ message: 'resultado no encontrado' });
    }
    res.status(200).json(paciente);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener el paciente', error: error.message });
  }
};

// Crear un nuevo paciente
export const createpaciente = async (req: Request, res: Response) => {
  const { nombre, CI_paciente } = req.body;
  try {
    const nuevoPaciente = await prisma.paciente.create({
      data: 
      {
        nombre,
        CI_paciente,
      },
    });
    res.status(201).json(nuevoPaciente);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al crear el paciente', error: error.message });
  }
};

// Actualizar un paciente existente
export const updatePaciente = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, CI_paciente } = req.body;
  try {
    const pacienteActualizado = await prisma.paciente.update({
      where: {
        id_paciente: Number(id),
      },
      data: {
        nombre,
        CI_paciente,
      },
    });
    res.status(200).json(pacienteActualizado);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al actualizar el paciente', error: error.message });
  }
};

// Eliminar un paciente
export const deletePaciente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pacienteEliminado = await prisma.paciente.update({
      where: { id_paciente: Number(id) },
      data: { estado: 'ELIMINADO' },
    });
    res.status(200).json(pacienteEliminado);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al eliminar el resultado', error: error.message });
  }
};
  