import React, { createContext, useState } from 'react';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        return token ? jwt_decode(token) : null;    
});

return (
    <AuthContext.Provider value={{ user, setUser}}>
        {children}
    </AuthContext.Provider>
);
};

export default AuthProvider;
