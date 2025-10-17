import { useState, useCallback, useRef } from 'react';
import { API_BASE_URL } from '../Utils/constants.ts';
import { Car, EngineData, DriveResult } from '../types';

const useApiRaceEngine = (cars: Car[], onWinnerFound: (car: Car, time: number) => void) => {
    const [racingCars, setRacingCars] = useState<Set<number>>(new Set());
    const [carProgress, setCarProgress] = useState<Map<number, number>>(new Map());
    const [winner, setWinner] = useState<{ car: Car; time: number } | null>(null);
    const winnerFoundRef = useRef(false);
    const intervalsRef = useRef<Map<number, ReturnType<typeof setInterval>>>(new Map());


    const engineAPI = async (carId: number, status: string): Promise<EngineData | DriveResult | null> => {
        try {
            const response = await fetch(`${API_BASE_URL}/engine?id=${carId}&status=${status}`, {
                method: 'PATCH'
            });
            return response.ok ? await response.json() : null;
        } catch (error) {
            console.error(`Engine ${status} failed:`, error);
            return null;
        }
    };

    const activeRacesRef = useRef<Set<number>>(new Set());

    const startCarRace = useCallback(async (carId: number) => {
        const car = cars.find(c => c.id === carId);
        if (!car) {
            console.error(`Car ${carId} not found`);
            return;
        }

        if (activeRacesRef.current.has(carId)) return;


        const engineData = await engineAPI(carId, 'started') as EngineData;
        if (!engineData) {
            console.error(`Engine start failed for ${car.name}`);
            return;
        }

        const { velocity, distance } = engineData;
        const totalTime = distance / velocity;

        setRacingCars(prev => new Set(prev).add(carId));
        activeRacesRef.current.add(carId);

        const startTime = Date.now();
        const driveResult = await engineAPI(carId, 'drive') as DriveResult;

    
        if (!activeRacesRef.current.has(carId)) {
            return;
        }

        if (!driveResult?.success) {
            setRacingCars(prev => {
                const newSet = new Set(prev);
                newSet.delete(carId);
                return newSet;
            });
            activeRacesRef.current.delete(carId);
            return;
        }

        let progress = 0;
        const incrementPerFrame = 100 / (totalTime / 50);

        const interval = setInterval(() => {

            if (!activeRacesRef.current.has(carId)) {
                clearInterval(interval);
                intervalsRef.current.delete(carId);
                return;
            }

            progress += incrementPerFrame;
            if (progress >= 100) progress = 100;

            setCarProgress(prev => new Map(prev).set(carId, progress));

            if (progress >= 100) {
                clearInterval(interval);
                intervalsRef.current.delete(carId);

                if (!winnerFoundRef.current) {
                    winnerFoundRef.current = true;

                    const raceTime = (Date.now() - startTime) / 1000;
                    const winnerData = {
                        car: { id: car.id, name: car.name, color: car.color },
                        time: raceTime
                    };

                    setWinner(winnerData);
                    onWinnerFound(car, raceTime);
                } else {
                    console.log(`${car.name} finished but not winner`);
                }

                setRacingCars(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(carId);
                    return newSet;
                });
                activeRacesRef.current.delete(carId);
            }
        }, 50);

        intervalsRef.current.set(carId, interval);

    }, [cars, onWinnerFound]);


    const stopCarRace = useCallback(async (carId: number) => {
        await engineAPI(carId, 'stopped');

        const interval = intervalsRef.current.get(carId);
        if (interval) {
            clearInterval(interval);
            intervalsRef.current.delete(carId);
        }

        setRacingCars(prev => {
            const newSet = new Set(prev);
            newSet.delete(carId);
            return newSet;
        });

        setCarProgress(prev => new Map(prev).set(carId, 0));
    }, []);

    const startAllCarsRace = useCallback(async () => {
        if (cars.length === 0) return;

        winnerFoundRef.current = false;
        setWinner(null);
        setCarProgress(new Map());
        setRacingCars(new Set());

        intervalsRef.current.forEach(interval => clearInterval(interval));
        intervalsRef.current.clear();

        const racePromises = cars.map(car => startCarRace(car.id));
        await Promise.allSettled(racePromises);
    }, [cars, startCarRace]);

    const resetAllRaces = useCallback(async () => {


        const stopPromises = cars.map(car => engineAPI(car.id, 'stopped'));
        await Promise.allSettled(stopPromises);

        intervalsRef.current.forEach(interval => clearInterval(interval));
        intervalsRef.current.clear();

        activeRacesRef.current.clear();

        setRacingCars(new Set());
        setCarProgress(new Map());
        setWinner(null);
        winnerFoundRef.current = false;
    }, [cars]);

    return {
        racingCars,
        carProgress,
        winner,
        isAnyCarRacing: racingCars.size > 0,
        startCarRace,
        stopCarRace,
        startAllCarsRace,
        resetAllRaces
    };
};

export default useApiRaceEngine;