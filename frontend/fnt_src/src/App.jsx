import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Team from './pages/Team';
import Branches from './pages/Branches';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/about"    element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery"  element={<Gallery />} />
          <Route path="/team"     element={<Team />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="*"         element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
