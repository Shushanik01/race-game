import React from 'react';
import { Box, Typography, Grid, Button, TextField, Card, CardContent } from '@mui/material';
import { CarCreationFormProps } from '../../types';


const CarCreationForm: React.FC<CarCreationFormProps> = ({
    newCarName,
    setNewCarName,
    newCarColor,
    setNewCarColor,
    selectedCarId,
    isRacing,
    onCreateCar,
    onGenerateRandomCars,
    showSuccessMessage,
    successMessage,
    onEditCar,
    onUpdateCar
}) => {
    return (
        <Card sx={{ mb: 3 }} className="neon-border">
            <CardContent>
                {showSuccessMessage && (
                    <Box
                        sx={{
                            mb: 2,
                            p: 2,
                            backgroundColor: 'rgba(0, 255, 0, 0.1)',
                            border: '1px solid #00ff00',
                            borderRadius: 1,
                            color: '#00ff00',
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}
                    >
                        ✅ {successMessage}
                    </Box>
                )}
                <Typography variant="h6" sx={{ mb: 2 }} className="neon-text">
                    {selectedCarId ? 'Edit Car' : 'Create New Car'}
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Car Name"
                            value={newCarName}
                            onChange={(e) => setNewCarName(e.target.value)}
                            placeholder="Enter car name..."
                            disabled={isRacing}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2">Color:</Typography>
                            <input
                                type="color"
                                value={newCarColor}
                                onChange={(e) => setNewCarColor(e.target.value)}
                                style={{ width: '50px', height: '40px', border: 'none', borderRadius: '4px' }}
                                disabled={isRacing}
                            />
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Button
                            variant="contained"
                            onClick={selectedCarId ? onUpdateCar : onCreateCar}
                            disabled={!newCarName.trim() || isRacing}
                            className="neon-button"
                            fullWidth
                        >
                            {selectedCarId ? 'UPDATE' : 'CREATE'}
                        </Button>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Button
                            variant="outlined"
                            onClick={onGenerateRandomCars}
                            disabled={isRacing}
                            className="neon-button-pink"
                            fullWidth
                        >
                            GENERATE 100 CARS
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CarCreationForm;