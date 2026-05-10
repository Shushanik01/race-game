import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Tabs, Tab } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

// Mesh triangles (viewBox 0 0 100 60, percentage coords)
const TRIANGLES = [
  '0,0 18,12 8,28',
  '18,12 35,0 30,22',
  '8,28 30,22 20,42',
  '35,0 55,14 45,30',
  '30,22 45,30 38,50',
  '55,14 72,0 68,20',
  '45,30 68,20 58,44',
  '72,0 90,16 82,32',
  '68,20 82,32 75,50',
  '90,16 100,4 100,30',
  '82,32 100,30 95,55',
  '20,42 38,50 25,60',
  '58,44 75,50 65,60',
  '0,28 8,28 0,50',
  '0,50 20,42 15,60',
];

const PolygonMesh = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '55vh',
      zIndex: -2,
      pointerEvents: 'none',
      opacity: 0.7,
    }}
  >
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 60"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {TRIANGLES.map((points, i) => (
        <motion.polygon
          key={i}
          points={points}
          fill={i % 3 === 0 ? 'rgba(224,64,251,0.03)' : 'rgba(0,229,255,0.02)'}
          stroke={i % 2 === 0 ? 'rgba(0,229,255,0.25)' : 'rgba(224,64,251,0.18)'}
          strokeWidth="0.3"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.15, 0.55, 0.15] }}
          transition={{
            duration: 3 + (i % 5) * 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: (i % 7) * 0.4,
          }}
        />
      ))}
    </svg>
  </Box>
);

const SynthwaveGrid = () => (
  <>
    {/* Horizon glow line */}
    <Box
      sx={{
        position: 'fixed',
        bottom: '44vh',
        left: 0,
        right: 0,
        height: '2px',
        background:
          'linear-gradient(90deg, transparent 0%, #00e5ff 20%, #e040fb 50%, #00e5ff 80%, transparent 100%)',
        boxShadow: '0 0 18px #e040fb, 0 0 40px rgba(224,64,251,0.25)',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
    {/* Perspective grid container */}
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '220%',
        height: '45vh',
        perspective: '350px',
        perspectiveOrigin: '50% 0%',
        zIndex: -2,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <Box
        className="synthwave-grid-plane"
        sx={{
          transformOrigin: 'top center',
          transform: 'rotateX(55deg)',
        }}
      />
    </Box>
    {/* Bottom fade */}
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '12vh',
        background: 'linear-gradient(to bottom, transparent, #040610)',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  </>
);

const GlowOrbs = () => (
  <Box sx={{ position: 'fixed', inset: 0, zIndex: -3, pointerEvents: 'none', overflow: 'hidden' }}>
    {/* Magenta — top left */}
    <motion.div
      style={{
        position: 'absolute',
        width: 700,
        height: 700,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(224,64,251,0.1) 0%, transparent 65%)',
        top: '-180px',
        left: '-180px',
        filter: 'blur(30px)',
      }}
      animate={{ x: [0, 80, 0], y: [0, 50, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* Cyan — right */}
    <motion.div
      style={{
        position: 'absolute',
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,229,255,0.09) 0%, transparent 65%)',
        top: '10%',
        right: '-150px',
        filter: 'blur(40px)',
      }}
      animate={{ x: [0, -60, 0], y: [0, 80, 0] }}
      transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* Green — faint center-bottom */}
    <motion.div
      style={{
        position: 'absolute',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,255,136,0.05) 0%, transparent 65%)',
        bottom: '15%',
        left: '35%',
        filter: 'blur(50px)',
      }}
      animate={{ x: [0, 40, -20, 0], y: [0, -30, 15, 0] }}
      transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }}
    />
  </Box>
);

const SpeedLines = () => (
  <Box sx={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden', pointerEvents: 'none' }}>
    {[
      { top: '12%', color: 'rgba(0,229,255,0.5)', width: 220, dur: 2.2, delay: 0 },
      { top: '24%', color: 'rgba(224,64,251,0.45)', width: 160, dur: 3.1, delay: 1.0 },
      { top: '36%', color: 'rgba(0,229,255,0.35)', width: 280, dur: 2.7, delay: 0.4 },
      { top: '50%', color: 'rgba(0,255,136,0.3)', width: 120, dur: 3.8, delay: 1.7 },
      { top: '62%', color: 'rgba(224,64,251,0.4)', width: 200, dur: 2.5, delay: 0.8 },
      { top: '74%', color: 'rgba(0,229,255,0.3)', width: 140, dur: 3.4, delay: 2.1 },
      { top: '85%', color: 'rgba(224,64,251,0.35)', width: 180, dur: 2.9, delay: 0.3 },
    ].map((line, i) => (
      <motion.div
        key={i}
        style={{
          position: 'absolute',
          top: line.top,
          left: '-320px',
          width: line.width,
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${line.color}, transparent)`,
        }}
        animate={{ x: ['0px', 'calc(100vw + 400px)'] }}
        transition={{ duration: line.dur, repeat: Infinity, ease: 'linear', delay: line.delay }}
      />
    ))}
  </Box>
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTab = location.pathname === '/winners' ? 1 : 0;

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    navigate(newValue === 0 ? '/garage' : '/winners');
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <PolygonMesh />
      <GlowOrbs />
      <SynthwaveGrid />
      <SpeedLines />

      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontFamily: 'Orbitron, monospace' }}
              className="neon-text-pink"
            >
              🏎 ASYNC RACE
            </Typography>
          </motion.div>

          <Box sx={{ ml: 'auto' }}>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              textColor="inherit"
              sx={{
                '& .MuiTab-root': {
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  minWidth: 110,
                  fontFamily: 'Orbitron, monospace',
                  letterSpacing: '0.1em',
                },
              }}
            >
              <Tab label="GARAGE" />
              <Tab label="WINNERS" />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 3, minHeight: 'calc(100vh - 64px)' }}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </Container>
    </Box>
  );
};

export default Layout;
