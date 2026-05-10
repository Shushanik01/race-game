const DB_KEY = 'race-game-db';

interface DB {
  garage: { id: number; name: string; color: string }[];
  winners: { id: number; wins: number; time: number }[];
  nextGarageId: number;
}

const defaultDB: DB = { garage: [], winners: [], nextGarageId: 1 };

export const loadDB = (): DB => {
  try {
    const raw = localStorage.getItem(DB_KEY);
    return raw ? JSON.parse(raw) : { ...defaultDB };
  } catch {
    return { ...defaultDB };
  }
};

export const saveDB = (db: DB): void => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};
