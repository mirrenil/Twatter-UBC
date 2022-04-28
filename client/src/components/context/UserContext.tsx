import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { makeReq } from '../../helper';


interface ICurrentUser {
  username: string,
  password: string
}
interface IUserContextValue {
 isLoggedIn: boolean,
 setIsLoggedIn,
 logIn,
 signOut,
 currentUser: ICurrentUser | any,
}

export const UserContext = createContext<IUserContextValue>({
  isLoggedIn: false,
  setIsLoggedIn: () => false,
  logIn: () => '',
  signOut: () => "",
  currentUser: {
    username: "",
  }
  
})

 const UserProvider = (props) => {
  // const [newUser, setNewUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string>("Not signed in!");
  const navigate = useNavigate();



  const logIn = async (username: string, password: string) => {
    const user = { username, password };
    let response = await makeReq("/login", "POST", user);
    setIsLoggedIn(true);
    setCurrentUser(username);
    setTimeout(() => {
    }, 1000);
  }

  const signOut = async () => {
    let response = await makeReq("/logout", "DELETE");
    setIsLoggedIn(false);
    setTimeout(() => {
      window.location.reload();
      navigate('/')
    
    }, 2000);
  }


  return (
  <UserContext.Provider
   value={{ isLoggedIn, setIsLoggedIn, currentUser, logIn, signOut}}>
     {props.children}
   </UserContext.Provider>
  );
};
export function useUserContext() {
  return useContext(UserContext);
}
export default UserProvider;
