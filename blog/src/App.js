import './App.css';
import './output.css';
import Blog from './components/pages/Blog';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './components/pages/NotFoundPage';
import Header from './components/Header';

function App() {
  return (
    <div>
    <Header />
    <Routes>
      <Route path="/" element={<Blog />} />
      <Route path="/blog" element={<Blog />} />
      <Route path='*' element={<NotFoundPage/>} />
    </Routes>
    </div>
  );
}

export default App;
