import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import StartPage from './/components/pages/StartPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<StartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
