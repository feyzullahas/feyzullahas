import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import BackgroundAnimation from './components/BackgroundAnimation';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import CVPage from './pages/CVPage';
import ContactPage from './pages/ContactPage';
import { LanguageProvider } from './context/LanguageContext';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="app">
          <BackgroundAnimation />
          <Header />
          <main className="main-content">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hakkimda" element={<AboutPage />} />
              <Route path="/deneyim" element={<ExperiencePage />} />
              <Route path="/projeler" element={<ProjectsPage />} />
              <Route path="/beceriler" element={<SkillsPage />} />
              <Route path="/cv" element={<CVPage />} />
              <Route path="/iletisim" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
