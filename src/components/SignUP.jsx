import styled from "styled-components";
import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUP() {

    const navigate = useNavigate()
    const [signUpData, setSignUpData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: ""
    })


    function callSignUp(e) {
        e.preventDefault();
        const request = axios.post("http://localhost:5000/sign-up", signUpData);
        request.then((response) => {
            alert("Cadastro feito com sucesso!")
            navigate("/")
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

            <form onSubmit={callSignUp}>
                <input
                    type="text"
                    placeholder=' Nome'
                    name="name"
                    //value={logInData.email}
                    onChange={e => { setSignUpData({ ...signUpData, name: e.target.value }) }}
                />
                <input
                    type="email"
                    placeholder=' email'
                    name="email"
                    //value={logInData.email}
                    onChange={e => { setSignUpData({ ...signUpData, email: e.target.value }) }}
                />
                <input
                    type="password"
                    placeholder=' senha'
                    name="password"
                    //value={logInData.password}
                    onChange={e => { setSignUpData({ ...signUpData, password: e.target.value }) }}
                />
                <input
                    type="password"
                    placeholder=' Confirme a senha'
                    name="confirm_password"
                    //value={logInData.password}
                    onChange={e => { setSignUpData({ ...signUpData, confirm_password: e.target.value }) }}
                />
                <button
                    //disabled={isUnavailable}
                    type='submit'
                >
                    Cadastrar
                </button>
            </form>
            <Link to="/">
                Já tem uma conta? Entre agora!
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


    h1{
        padding-bottom: 50px;
        color: white;
    }
    form{
        width: 90%;
        display: grid;
        gap: 10px;
    }

    input{
        height: 60px;
        border-radius: 5px;
    }

    button{
        height: 60px;
        border-radius: 5px;
        background-color: #A328D6;
        color: white;
        border: none;
        cursor: pointer;
    }

    a{
        padding-top: 50px;
        text-decoration: none;
        color: white;
    }


`