import './App.css';
import './output.css';
import Blog from './components/pages/Blog';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './components/pages/NotFoundPage';
import Header from './components/Header';
import PostDetail from './components/pages/PostDetail';

function App() {
  return (
    <div>
    <Header />
    <Routes>
      <Route path="/" element={<Blog />}/>
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path='*' element={<NotFoundPage/>} />
    </Routes>
    </div>
  );
}

export default App;
