import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { makeReq } from '../../helper';

interface IUserContextValue {
 isLoggedIn: boolean,
 logIn: (email: string, password: string) => void;
}

export const UserContext = createContext<IUserContextValue>({
  isLoggedIn: false,
  logIn: () => ""
});

export function useUserContext() {
  return useContext(UserContext);
}

const UserProvider: FC = (props) => {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        let response = makeReq('/login', 'GET');
        console.log(response);
      } catch (err) {
        console.log(err);
        return;
      }
    };
    getLoggedInUser();
  }, []);

  const logIn = async (email, password) => {
      const user = { email, password };
      let response = await makeReq("/login", "POST", user);
      console.log(response);
      return response;
  }

  return <UserContext.Provider value={{ isLoggedIn, logIn }}></UserContext.Provider>;
};
