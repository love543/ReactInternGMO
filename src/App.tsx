import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserForm from './components/UserForm';
import SecondPage from './components/SecondPage';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route 
            path="/second-page" 
            element={localStorage.getItem('user') ? <SecondPage /> : <Navigate to="/" />} 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
