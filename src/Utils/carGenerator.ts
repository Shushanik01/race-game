import { CAR_NAMES, CAR_COLORS, IMAGE_BASE_PATH } from './constants.ts';
import { CarData } from '../types/index.ts';

export const getRandomCarName = (): string => {
  const randomIndex = Math.floor(Math.random() * CAR_NAMES.length);

  return CAR_NAMES[randomIndex];
};

export const getRandomCarColor = (): string => {
  const randomIndex = Math.floor(Math.random() * CAR_COLORS.length);

  return CAR_COLORS[randomIndex];
};

const CAR_IMAGES: Record<string, string> = {
  tesla: `${IMAGE_BASE_PATH}/car3.webp`,
  bmw: `${IMAGE_BASE_PATH}/car2.webp`,
  mercedes: 'car3.webp',
  ford: `${IMAGE_BASE_PATH}/car4.webp`,
  lamborghini: `${IMAGE_BASE_PATH}/car5.png`,
  ferrari: `${IMAGE_BASE_PATH}/car2.webp`,
  porsche: `${IMAGE_BASE_PATH}/car1.webp`,
  mclaren: `${IMAGE_BASE_PATH}/car5.png`,
  bugatti: `${IMAGE_BASE_PATH}/car3.webp`,
  nissan: `${IMAGE_BASE_PATH}/car1.webp`,
  toyota: `${IMAGE_BASE_PATH}/car2.webp`,
  chevrolet: `${IMAGE_BASE_PATH}/car5.png`,
  dodge: `${IMAGE_BASE_PATH}/car4.webp`,
  audi: `${IMAGE_BASE_PATH}/car5.png`,
};

export const getCarEmoji = (carName: string = ''): string => {
  return CAR_IMAGES[carName.toLowerCase()] || `${IMAGE_BASE_PATH}/car1.webp`;
};

export const generateRandomCarData = (): CarData => {
  return {
    name: getRandomCarName(),
    color: getRandomCarColor(),
  };
};

export const generateRandomCarsData = (count: number = 100): CarData[] => {
  const cars: CarData[] = [];
  
  for (let i = 0; i < count; i++) {
    cars.push({
      name: `${getRandomCarName()} #${i + 1}`,
      color: getRandomCarColor(),
    });
  }
  
  return cars;
};
