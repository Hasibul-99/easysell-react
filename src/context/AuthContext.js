import React, { createContext, useState, useEffect } from 'react';
import { USER_INFO } from "../scripts/api";
import { getData } from '../scripts/api-service';

export const authContext = createContext();

const AuthContext = props => {
    const [user, setUser] = useState();
    const [permissions, setPermissions] = useState();

    useEffect(() => {
        setUser();
    }, []);

    const setUserInfo = async () => {
        let res = await getData(USER_INFO);
        if (res) {
            let masterData = res?.data;
            setUser(masterData);
        }
    }

    const getUserInfo = () => {
        return user;
    }

    const DeleteUserInfo = () => {
        setUser(null);
    }

    return (
        <authContext.Provider
            value={{
                user,
                setUserInfo,
                getUserInfo,
                DeleteUserInfo,
                permissions
            }}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthContext;
