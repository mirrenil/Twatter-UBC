import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import StartPage from './/components/pages/StartPage';
import UserProvider from './components/context/UserContext';

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<StartPage />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
