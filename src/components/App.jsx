import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import SignInScreen from "./SignInScreen";
import Home from "./Home";
import InfosUser from "./InfosUser";

export default function App() {
    const [infosUser, setInfosUser] = useState({})
    return (
        <BrowserRouter>
            <InfosUser.Provider value={{ infosUser, setInfosUser }}>
                <Routes>
                    <Route path="/" element={<SignInScreen />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </InfosUser.Provider>
        </BrowserRouter>
    )
}