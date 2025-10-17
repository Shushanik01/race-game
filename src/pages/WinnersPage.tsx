import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { fetchWinners } from '../Store/winnersSlice.ts';
import { fetchCars } from '../Store/garageSlice.ts';
import { Winner, Car } from '../types';

interface RootState {
    winners: {
        winners: Winner[];
        loading: boolean;
        error: string | null;
    };
    garage: {
        cars: Car[];
    };
}

const WinnersPage: React.FC = () => {
    const dispatch = useDispatch();
    const { winners, loading, error } = useSelector((state: RootState) => state.winners);
    const { cars } = useSelector((state: RootState) => state.garage);

    useEffect(() => {
        dispatch(fetchWinners({ page: 1, limit: 100 }) as any);
        dispatch(fetchCars({ page: 1, limit: 1000 }) as any);
    }, [dispatch]);

    const winnersWithCarInfo = winners.map(winner => {
        const car = cars.find(c => c.id === winner.id);
        
        return {
            ...winner,
            name: car?.name || `Car #${winner.id}`,
            color: car?.color || '#FF0000'
        };
    });

    const sortedWinners = [...winnersWithCarInfo].sort((a, b) => a.time - b.time);

    if (loading) {
        return (
            <Box sx={{ textAlign: 'center', mt: 10 }}>
                <Typography variant="h4" className="neon-text">Loading...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: 'center', mt: 10 }}>
                <Typography variant="h4" className="neon-text">Error: {error}</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h2" className="neon-text-pink" sx={{ mb: 3, textAlign: 'center' }}>
                🏆 WINNERS ({sortedWinners.length})
            </Typography>

            {sortedWinners.length === 0 ? (
                <Typography variant="h5" sx={{ textAlign: 'center', my: 4 }} className="neon-text">
                    No winners yet. Start racing!
                </Typography>
            ) : (
                <>
                    <TableContainer 
                        component={Paper} 
                        sx={{ 
                            backgroundColor: 'rgba(0, 20, 40, 0.9)',
                            border: '2px solid #00ffff'
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'rgba(0, 255, 255, 0.1)' }}>
                                    <TableCell sx={{ color: '#00ffff', fontWeight: 'bold', textAlign: 'center' }}>
                                        Rank
                                    </TableCell>
                                    <TableCell sx={{ color: '#00ffff', fontWeight: 'bold', textAlign: 'center' }}>
                                        Car Name
                                    </TableCell>
                                    <TableCell sx={{ color: '#00ffff', fontWeight: 'bold', textAlign: 'center' }}>
                                        Wins
                                    </TableCell>
                                    <TableCell sx={{ color: '#00ffff', fontWeight: 'bold', textAlign: 'center' }}>
                                        Best Time
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedWinners.map((winner, index) => (
                                    <TableRow 
                                        key={winner.id}
                                        sx={{ 
                                            backgroundColor: index % 2 === 0 
                                                ? 'rgba(0, 255, 255, 0.05)' 
                                                : 'rgba(255, 0, 255, 0.05)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 255, 255, 0.15)'
                                            }
                                        }}
                                    >
                                        <TableCell sx={{ 
                                            color: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : '#ff00ff',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            fontSize: '1.3rem'
                                        }}>
                                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                                        </TableCell>
                                        <TableCell sx={{ 
                                            color: '#00ffff', 
                                            fontWeight: 'bold',
                                            textAlign: 'center'
                                        }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                                <Box 
                                                    sx={{ 
                                                        width: 20, 
                                                        height: 20, 
                                                        backgroundColor: winner.color,
                                                        borderRadius: '50%',
                                                        border: '2px solid #fff'
                                                    }} 
                                                />
                                                {winner.name}
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ 
                                            color: '#ff00ff', 
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }}>
                                            {winner.wins}
                                        </TableCell>
                                        <TableCell sx={{ 
                                            color: '#00ff00', 
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }}>
                                            {winner.time.toFixed(2)}s
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                        <Typography variant="h6" className="neon-text">
                            Total Races: {sortedWinners.reduce((sum, w) => sum + w.wins, 0)}
                        </Typography>
                
                    </Box>
                </>
            )}
        </Box>
    );
};

export default WinnersPage;