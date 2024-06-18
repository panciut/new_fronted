// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust the base URL as needed

export const fetchTasks = async () => {
    try {
        const response = await axios.get(`${API_URL}/tasks`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const fetchTaskById = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/tasks/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching task with id ${id}:`, error);
        throw error;
    }
};

export const fetchCardById = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/cards/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching card with id ${id}:`, error);
        throw error;
    }
};

export const fetchCards = async () => {
    try {
        const response = await axios.get(`${API_URL}/cards`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cards:', error);
        throw error;
    }
};
