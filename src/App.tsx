import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import cyberpunkTheme from './Styles/theme.ts';
import Layout from './components/Layout/Layout.tsx';
import AppRoutes from './AppRoutes.tsx';

import './Styles/neon.css';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={cyberpunkTheme}>
      <CssBaseline />
      <Router basename="/Async-race-project">
        <Layout>
         <AppRoutes/>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;