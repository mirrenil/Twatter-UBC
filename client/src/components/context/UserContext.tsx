import React, { createContext, createFactory, FC, useContext, useState } from 'react';
import { makeReq } from '../../helper';

interface IUserContextValue {
    username: string,
    password: string,
    email: string,
    admin: boolean,
    isLoggedIn: boolean,
    authorize: () => void
}

export const UserContext = createContext<IUserContextValue>({
    username: "",
    password: "",
    email: "",
    admin: false,
    isLoggedIn: false,
    authorize: () => ''
})

export function useUserContext() {
    return useContext(UserContext)
}

const UserProvider: FC = (props) => {
    const [user, setUser] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
   


    return (
        <div></div>
    )
}