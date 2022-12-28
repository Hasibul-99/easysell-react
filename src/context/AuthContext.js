import React, { createContext, useState, useEffect } from 'react';
import { easy_permission_products, PERMANENT_VALUES, theme_color, USER_INFO } from "../scripts/api";
import { getData } from '../scripts/api-service';
import Cookies from "js-cookie";

export const authContext = createContext();

const AuthContext = props => {
    const [user, setUser] = useState();
    const [permissions, setPermissions] = useState();
    const [permanetValues, setPermanetValues] = useState();
    const [theme, setTheme] = useState()

    useEffect(() => {
        setUser();
    }, []);

    const setUserInfo = async () => {
        console.log("data", Cookies.get("AOSToken"));
        let token = Cookies.get("AOSToken");
        let user = token ? JSON.parse(token) : null;

        if (user && user.userId) {
            let res = await getData(USER_INFO + user.userId);
            if (res) {
                let masterData = res?.data;
                setUser(masterData);
            }

            let pre = await getData(easy_permission_products + user.userId);

            if (pre) {
                let masterData1 = pre?.data;
                setPermissions(masterData1);
            }

            let perVal = await getData(PERMANENT_VALUES);
            if (perVal) {
                let masterData = perVal.data[0];
                setPermanetValues(masterData);

                let themes = await getData(theme_color);

                if (themes) {
                    let masterDataT = themes?.data || [];
                    let the = masterDataT.find(item => item.theme_name === masterData.THEME_NAME);
                    setTheme(the);
                }
            }
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
                permissions,
                permanetValues,
                theme
            }}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthContext;
