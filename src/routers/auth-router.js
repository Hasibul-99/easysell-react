import SignIn from "../pages/Auth/SignIn";
import Register from "../pages/Auth/Register";

const AuthRouters = [  
    {
        path: "/login",
        name: "Login",
        component: SignIn,
        layout: "/auth"
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        layout: "/auth"
    }
];

export default AuthRouters;