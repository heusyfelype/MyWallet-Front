import styled from "styled-components";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import InfosUser from "./InfosUser";


export default function CashIn() {

    const { infosUser } = useContext(InfosUser);
    const navigate = useNavigate()

    const [entry, setEntry] = useState({
        transaction: "",
        description: ""
    })

    console.log(entry)

    function saveTransaction(e) {
        e.preventDefault();
        entry.transaction = parseFloat(entry.transaction.replace(",", ".")).toFixed(2)
        console.log("Valor convertido: ", entry.transaction)

        const request = axios.post("http://localhost:5000/cash-in", {
            ...entry,
            "userId": infosUser.userId,
            "token": infosUser.token
        })

        request.then(() =>{
            navigate("/home")
        })
        request.catch((error) =>{
            alert("Alguma coisa deu errado. Por favor faça Log-in novamente", e)
            navigate("/home")
        })
    }

    return (
        <Main>
            <h1>
                Nova Entrada
            </h1>

            <form onSubmit={saveTransaction}>
                <input
                    type="text"
                    placeholder=' Valor'
                    name="valor"
                    //value={logInData.email}
                    onChange={e => { setEntry({ ...entry, transaction: e.target.value }) }}
                />
                <input
                    type="text"
                    placeholder=' Descrição'
                    name="desciption"
                    //value={logInData.password}
                    onChange={e => { setEntry({ ...entry, description: e.target.value }) }}
                />
                <button
                    //disabled={isUnavailable}
                    type='submit'
                >
                    Salvar entrada
                </button>
            </form>
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
`

