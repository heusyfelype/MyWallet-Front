import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import SignInScreen from "./SignInScreen";
import Home from "./Home";
import CashIn from "./CashIn";
import CashOut from "./CashOut";
import SignUP from "./SignUP";

import InfosUser from "./InfosUser";


export default function App() {
    const [infosUser, setInfosUser] = useState({})
    return (
        <BrowserRouter>
            <InfosUser.Provider value={{ infosUser, setInfosUser }}>
                <Routes>
                    <Route path="/" element={<SignInScreen />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/cash-in" element={<CashIn />} />
                    <Route path="/cash-out" element={<CashOut />} />
                    <Route path="/sign-up" element={<SignUP />} />
                </Routes>
            </InfosUser.Provider>
        </BrowserRouter>
    )
}