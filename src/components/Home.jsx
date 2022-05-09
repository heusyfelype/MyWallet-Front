import styled from "styled-components";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

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
                {transactions.length === 0 ?
                    <p> Não há registros de entrada ou saída </p> :
                    <>
                        <ListOfTransactions transactions={transactions} />
                        <Balance transactions={transactions} />
                    </>}
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

function ListOfTransactions(props) {
    const { transactions } = props;

    return (
        <>
            <ul>
                {transactions.map((eachTransaction) => {
                    return (
                        <li key={eachTransaction.userId + eachTransaction.time}>
                            <p className="data">
                                {dayjs(eachTransaction.time).format("YY/MM")}
                            </p>
                            <p>
                                {eachTransaction.description}
                            </p>
                            <TransactionValue transaction={eachTransaction.transaction}>
                                {eachTransaction.transaction}
                            </TransactionValue>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

function Balance(props) {
    const { transactions } = props;

    let soma = 0;
    for(let i = 0; i<transactions.length; i++){

        soma += parseFloat(transactions[i].transaction)
    }

    return (
        <BalanceStyled transaction = {transactions.transaction}>
            <p>SALDO</p>
            {transactions.length > 1 ? soma.toFixed(2) : transactions[0].transaction}
        </BalanceStyled>
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


    h1{
        color: white;
    }

    ion-icon{
        color: white;
    }
    .transactions-place{
        grid-column-start: 1;
        grid-column-end: 3;
        background-color: white;
        height: 70vh;
        cursor: default;
        position: relative;
        padding-bottom: 100px;
        overflow-y: scroll;
    }

    div{
        padding: 10px;
        background-color: #A328D6;
        height: 20vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: pointer;

        > p{
            color: white;
        }
    }

    ul{
        padding-bottom: 50px;
    }

    li{
        display: flex;
        position: relative;
        padding: 2%;
    }
    .data{
        color: #C6C6C6;
    }

`

const TransactionValue = styled.p`
    position: absolute;
    right: 0px;
    bottom: 0px;
    color: ${(props) => parseFloat(props.transaction) > 0 ? "#03AC00" : "#C70000"};
`

const BalanceStyled = styled.h3`
    position: sticky;
    left: 0px;
    bottom: -90px;
    width: 100%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    padding: 3%;

    color: ${(props) => parseFloat(props.transaction) > 0 ? "#03AC00" : "#C70000"};

`