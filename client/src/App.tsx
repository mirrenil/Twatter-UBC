import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './Header';
import Layout from './Layout';

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
