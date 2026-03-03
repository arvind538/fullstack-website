import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const API = import.meta.env.VITE_APP_URL_API;

    
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);

    const authorizationToken = token ? `Bearer ${token}` : "";

    const isLoggedIn = !!token;
    console.log("isLoggedIN", isLoggedIn);


    // ------ STORE TOKEN -------
    const storeTokenInLS = (serverToken) => {
        if (!serverToken) return;
        localStorage.setItem("token", serverToken);
        setToken(serverToken);
    };

    // ----- LOGOUT ------
    const LogoutUser = () => {
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
    };

    // ----- USER AUTH CHECK -----
    const userAuthentication = async () => {
        try {
            if (!token) {
                setIsLoading(false);
                return;
            }

            const response = await fetch(`${API}/api/auth/user`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.userdata);
            } else {
                LogoutUser();
            }
        } catch (error) {
            console.error("User auth error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // ---- SERVICES FETCH ----
    const getServices = async () => {
        try {
            const response = await fetch(`${API}/api/data/service`);

            if (response.ok) {
                const data = await response.json();
                setServices(data);
            }
        } catch (error) {
            console.error("Service fetch error:", error);
        }
    };

    // ---- USE EFFECTS -----
    useEffect(() => {
        userAuthentication();
    }, [token]);

    useEffect(() => {
        getServices();
    }, []);

    // ---- CONTEXT VALUE ---
    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                storeTokenInLS,
                LogoutUser,
                user,
                services,
                authorizationToken,
                isLoading,
                API,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    return useContext(AuthContext);
};










