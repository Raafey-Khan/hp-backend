import { Routes, Route } from 'react-router-dom';
import FirstPage from './components/FirstPage';
import SecondPage from './components/SecondPage';

const App = () => (
  <Routes>
    <Route path="/" element={<FirstPage />} />
    <Route path="/second" element={<SecondPage />} />
  </Routes>
);

export default App;
