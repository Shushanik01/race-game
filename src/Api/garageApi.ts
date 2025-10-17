import { API_BASE_URL, CARS_PER_PAGE } from '../Utils/constants.ts';
import { CarData } from '../types/index.ts';

export const getCars = async (page: number = 1, limit: number = CARS_PER_PAGE) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/garage?_page=${page}&_limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch cars');
    }
    
    const data = await response.json();
    const totalCount = response.headers.get('X-Total-Count');
    
    return {
      data,
      totalCount: parseInt(totalCount || '0') || 0,
    };
  } catch (error) {
    throw new Error(`Error fetching cars: ${error}`);
  }
};

export const getCar = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/garage/${id}`);
    
    if (!response.ok) {
      throw new Error('Car not found');
    }
    
    return await response.json();
  } catch (error: unknown) {
    throw new Error(`Error fetching car: ${error}`);
  }
};

export const createCar = async (carData: CarData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create car');
    }
    
    return await response.json();
  } catch (error: unknown) {
    throw new Error(`Error creating car: ${error}`);
  }
};

export const updateCar = async (id: number, carData: CarData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/garage/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update car');
    }
    
    return await response.json();
  } catch (error: unknown) {
    throw new Error(`Error updating car: ${error}`);
  }
};

export const deleteCar = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/garage/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete car');
    }
    
    return { success: true };
  } catch (error: unknown) {
    throw new Error(`Error deleting car: ${error}`);
  }
};