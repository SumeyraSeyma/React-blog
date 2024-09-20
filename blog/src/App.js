import './App.css';
import './output.css';
import Blog from './components/pages/Blog';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './components/pages/NotFoundPage';
import Header from './components/Header';
import PostDetail from './components/pages/PostDetail';
import Author from './components/pages/Author';
import { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Technology',
    'Nature',
    'Culture',
    'Design',
    'Food',
  ];

  return (
    <div>
    <Header categories={categories}
            onSearch={setSearchTerm}
            onCategoryChange={setSelectedCategory}  
    />
    <Routes>
      <Route path="/" element={<Blog 
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
       />}/>
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path='*' element={<NotFoundPage/>} />
      <Route path="/authors/:authorName" element={<Author />} />
    </Routes>
    </div>
  );
}

export default App;
