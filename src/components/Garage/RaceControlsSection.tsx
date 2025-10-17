import React from 'react';
import { Typography, Grid, Button, Card, CardContent } from '@mui/material';
import { Car, RaceControlsSectionProps } from '../../types';

const RaceControlsSection: React.FC<RaceControlsSectionProps> = ({
    cars,
    isRacing,
    racingCars,
    onStartRace,
    onResetRace
}) => {
    return (
        <Card sx={{ mb: 3 }} className="neon-border">
            <CardContent >
                <Typography variant="h6" sx={{ mb: 2 }} className="neon-text" >
                    Race Controls
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    
                    <Grid size={{ xs:6 }}>
                        <Button 
                            variant="contained" 
                            className="neon-button" 
                            fullWidth 
                            size="large"
                            onClick={onStartRace}
                            disabled={cars.length === 0 || isRacing}
                        >
                            START RACE
                        </Button>
                    </Grid>
                  
                    <Grid size={{ xs: 6}}>
                        <Button 
                            variant="outlined" 
                            className="neon-button-pink" 
                            fullWidth 
                            size="large"
                            onClick={onResetRace}
                        >
                            RESET RACE
                        </Button>
                    </Grid>
                </Grid>
                {(isRacing || racingCars.size > 0) && (
                    <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }} className="neon-text">
                        Racing in progress... {racingCars.size} cars racing
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default RaceControlsSection;