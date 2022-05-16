import React, {createContext, useEffect, useState} from "react";

export const TodoContext = createContext();

export const Provider = ({ children }) => {

    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const value = {
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated
    }

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}
