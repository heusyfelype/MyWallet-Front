import styled from "styled-components";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import InfosUser from "./InfosUser";


export default function Home() {
    const { infosUser } = useContext(InfosUser);
    const navigate = useNavigate()

    //console.log(infosUser)

    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        const config = {
            headers: {
                "userId": infosUser.userId,
                "token": infosUser.token
            }
        }

        const request = axios.get("http://localhost:5000/transactions", config)
        request.then((response) => {
            setTransactions([...response.data]);
            console.log([...response.data])
        })
        request.catch((response) => {
            alert(
                `Algo deu errado, por favor recarregue a página e tente novamente!
                
                Erro: ${response}`
            );
            //window.location.reload()
        }
        )
    }, [])

    return (
        <Main>
            <h1> Olá, {infosUser.name} </h1>
            <ion-icon name="exit-outline"></ion-icon>
            <div className="transactions-place">
                {transactions.length === 0 ? <p> Não há registros de entrada ou saída </p> : <ListOfTransactions />}
            </div>
            <div onClick={() => {
                navigate("/cash-in")
            }}>
                <ion-icon name="add-circle-outline"></ion-icon>
                <p>Nova <br /> Entrada</p>
            </div>
            <div onClick={() => {
                navigate("/cash-out")
            }}>
                <ion-icon name="remove-circle-outline"></ion-icon>
                <p>Nova <br /> Saída</p>
            </div>

        </Main>
    )
}

function ListOfTransactions(){
    return(
        <p>
            Esta Será a Lista
        </p>
    )
}

const Main = styled.main`
    width: 100vw;
    height: 100vh;
    background-color: #8C11BE;
    padding: 5%;
    margin: auto;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    gap: 10px;

    .transactions-place{
        grid-column-start: 1;
        grid-column-end: 3;
        background-color: white;
        height: 70vh;
        cursor: default;
    }

    div{
        padding: 10px;
        background-color: #A328D6;
        height: 20vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: pointer;
    }
`