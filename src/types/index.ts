export interface CarData {
  name: string;
  color: string;
};

export  interface Car {
    id: number;
    name: string;
    color: string;
};

export interface EngineData {
    velocity: number;
    distance: number;
}

export interface DriveResult {
    success: boolean;
}

export interface Winner {
    id: number;
    wins: number;
    time: number;
}

export interface WinnersResponse {
    data: Winner[];
    totalCount: number;
}

export interface CarCreationFormProps {
    newCarName: string;
    setNewCarName: (name: string) => void;
    newCarColor: string;
    setNewCarColor: (color: string) => void;
    selectedCarId: number | null;
    isRacing: boolean;
    onCreateCar: () => void;
    onGenerateRandomCars: () => void;
    showSuccessMessage: boolean;
    successMessage: string;
    onUpdateCar: () => void;  
    onEditCar: (id: number) => void;

};

export interface Car {
    id: number;
    name: string;
    color: string;
}

export interface RaceControlsSectionProps {
    cars: Car[];
    isRacing: boolean;
    racingCars: Set<number>;
    onStartRace: () => void;
    onResetRace: () => void;
}; 

export interface WinnerModalProps {
    winner: {
        car: {
            id: number;
            name: string;
            color: string;
        };
        time: number;
    } | null;
    onClose: () => void;
};

export interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

export interface GarageState {
    cars: Car[];
    totalCount: number;
    loading: boolean;
    selectedCarId: number | null;
}

export interface RootState {
    garage: GarageState;
}

export interface Winner {
    id: number;
    wins: number;
    time: number;
};

export interface FetchCarsParams {
  page?: number;
  limit?: number;
}

export interface EditCarParams {
  id: number;
  carData: CarData;
}

export interface GarageState {
  cars: Car[];
  totalCount: number;
  currentPage: number;
  selectedCarId: number | null;
  loading: boolean;
  error: string | null;
  generatingCars: boolean;
};


export interface FetchWinnersParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
}

export interface AddWinnerParams {
  carId: number;
  raceTime: number;
}

export interface WinnersState {
  winners: Winner[];
  totalCount: number;
  currentPage: number;
  sortBy: string;
  sortOrder: string;
  loading: boolean;
  error: string | null;
}