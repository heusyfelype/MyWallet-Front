import styled from "styled-components";
import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import InfosUser from "./InfosUser";

//app.use(cors());

export default function SignInScreen() {
    const navigate = useNavigate()
    const [signInData, setSignInData] = useState({
        email: "",
        password: "",
    })
    const { setInfosUser } = useContext(InfosUser)
    //console.log(signInData)

    function callSignIn(e) {
        e.preventDefault();
        //let body = signInData
        const request = axios.post("http://localhost:5000/sign-in", signInData);
        request.then((response) => {
            setInfosUser(response.data);
            navigate("/home");
        })
        request.catch((response) => {
            alert(
                `Algo deu errado, por favor recarregue a página e tente novamente!
       
                Erro: ${response}`
            );
            //window.location.reload()
        }
        )
    }


    return (
        <Main>
            <h1>
                MyWallet
            </h1>

            <form onSubmit={callSignIn}>
                <input
                    type="email"
                    placeholder=' email'
                    name="email"
                    //value={logInData.email}
                    onChange={e => { setSignInData({ ...signInData, email: e.target.value }) }}
                />
                <input
                    type="password"
                    placeholder=' senha'
                    name="password"
                    //value={logInData.password}
                    onChange={e => { setSignInData({ ...signInData, password: e.target.value }) }}
                />
                <button
                    //disabled={isUnavailable}
                    type='submit'
                >
                    Entrar
                </button>
            </form>
            <Link to="/cadastro">
                Primeira vez? Cadastre-se!
            </Link>

        </Main>
    )
}

const Main = styled.main`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #8C11BE;
    padding: 15px;

    form{
        width: 90%;
        display: grid;
        gap: 10px;
    }


`