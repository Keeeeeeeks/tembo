import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ArtistDashboard from './pages/ArtistDashboard';
import CollectorDashboard from './pages/CollectorDashboard';
import EnterpriseDashboard from './pages/EnterpriseDashboard';
import ArtworkUpload from './pages/ArtworkUpload';
import ArtworkDetails from './pages/ArtworkDetails';
import Authentication from './pages/Authentication';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/artist-dashboard" element={<ArtistDashboard />} />
            <Route path="/collector-dashboard" element={<CollectorDashboard />} />
            <Route path="/enterprise-dashboard" element={<EnterpriseDashboard />} />
            <Route path="/upload" element={<ArtworkUpload />} />
            <Route path="/artwork/:id" element={<ArtworkDetails />} />
            <Route path="/auth" element={<Authentication />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;