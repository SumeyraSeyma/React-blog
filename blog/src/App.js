import './App.css';
import './output.css';
import Blog from './components/pages/Blog';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './components/pages/NotFoundPage';
import Header from './components/Header';
import PostDetail from './components/pages/PostDetail';
import Author from './components/pages/Author';

function App() {
  return (
    <div>
    <Header />
    <Routes>
      <Route path="/" element={<Blog />}/>
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path='*' element={<NotFoundPage/>} />
      <Route path="/authors/:authorName" element={<Author />} />
    </Routes>
    </div>
  );
}

export default App;
