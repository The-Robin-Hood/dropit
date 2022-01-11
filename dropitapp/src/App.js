import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './Components/HomePage';
import NotFoundPage from './Components/NotFoundPage';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
