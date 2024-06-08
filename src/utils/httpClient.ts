import axios from 'axios';
import fetch from 'node-fetch';

type HttpClient = {
  get: (url: string) => Promise<any>;
};

// Implementación de axiosClient
const axiosClient: HttpClient = {
  get: async (url: string) => {
    console.log(`Making request to ${url} with axios`);
    try {
      const response = await axios.get(url);
      console.log('Response received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos del servicio externo con axios:', error);
      throw new Error('Error al obtener datos del servicio externo con axios');
    }
  }
};

// Implementación de fetchClient usando importación dinámica
const fetchClient: HttpClient = {
  get: async (url: string) => {
    console.log(`Making request to ${url} with fetch`);
    try {
      const { default: fetch } = await import('node-fetch');
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener datos del servicio externo con fetch');
      }
      const data = await response.json();
      console.log('Response received:', data);
      return data;
    } catch (error) {
      console.error('Error al obtener datos del servicio externo con fetch:', error);
      throw new Error('Error al obtener datos del servicio externo con fetch');
    }
  }
};

// Selección del cliente HTTP basado en la variable de entorno
const httpClient: HttpClient = process.env.HTTP_CLIENT === 'fetch' ? fetchClient : axiosClient;

export default httpClient;
