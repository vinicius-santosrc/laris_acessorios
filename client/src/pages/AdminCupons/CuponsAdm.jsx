/**
 * Creation Date: 15/01/2024
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import { useEffect, useState } from "react";
import NavigationLeft from "../../components/AdminPage/NavigationLeft"
import { getCupons, getUser, GetUserAtual } from "../../lib/database";
import Swal from "sweetalert2";
import { getUserData } from "../../lib/appwrite";
import Loading from "../../components/AdminPage/Loading";
import { auth, CheckIfUserIsLogged } from "../../lib/firebase";

const CuponsAdm = () => {

    const endpoint = process.env.REACT_APP_API_ENDPOINT;
    //const endpoint = process.env.REACT_APP_API_ENDPOINT_TEST;
    const secretKey = process.env.REACT_APP_API_SECRET_KEY;
    const preEndpoint = process.env.REACT_APP_API_PREENDPOINT;

    const [cuponsDisp, setcuponsDisp] = useState(null);
    const [CuponsCreator, setCuponsCreator] = useState(false);

    const [nomeCupom, setnomeCupom] = useState(null);
    const [CodigoCupom, setCodigoCupom] = useState(null);
    const [DescontoCupom, setDesconto] = useState(null);
    const [Private, setPrivate] = useState(true);

    const [user, setUser] = useState(null)

    async function getAllCupons() {
        const res = await getCupons();
        setcuponsDisp(res);
    }

    useEffect(() => {
        getAllCupons()
    }, [])

    async function createNewCupom() {
        try {
            if (nomeCupom && CodigoCupom, DescontoCupom) {

                let isPrivate;

                if (typeof Private === 'boolean') {
                    isPrivate = Private ? 1 : 0;
                }

                await fetch(`${endpoint}${preEndpoint}${secretKey}/cupons/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        uniqueKey: CodigoCupom,
                        name: nomeCupom,
                        desconto: DescontoCupom,
                        private: isPrivate
                    }),
                })
                    .then((res) => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `O cupom foi criado com sucesso.`,
                            showConfirmButton: false,
                            timer: 2500
                        })
                        getAllCupons()
                    })
            }

        }
        catch (error) {
            console.error("ERRO AO CRIAR CUPOM: ", error)
        }
    }

    async function removeCupom(id) {
        try {
            await fetch(`${endpoint}${preEndpoint}${secretKey}/cupons/remove`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id
                }),
            })
                .then(() => getAllCupons())

        }
        catch (error) {
            console.error("Erro: ", error)
        }
    }

    const [userAtual, setuserAtual] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const res = await GetUserAtual(user.uid);
                    setuserAtual(res);
                } catch (error) {
                    console.warn("Erro ao pegar usuário: ", error);
                }
            } else {
                setuserAtual(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (CheckIfUserIsLogged()) {
                return
            } else {
                return window.location.href = window.location.origin + "/admin/login";
            }
        });

        return () => unsubscribe();
    }, []);

    if (!userAtual) {
        return <Loading />

    }

    return (
        <div className="AdminPage-DashBoard">
            <NavigationLeft />
            <div className="Content-Orders-Page">
                <div className="toppage-products">
                    <div className="top-top-product-header">
                        <div>
                            <h2>Cupons Cadastrados ({cuponsDisp ? cuponsDisp.length : null})</h2>
                            <p>Gerencie os cupons da sua loja.</p>

                        </div>

                        <button onClick={() => { setCuponsCreator(CuponsCreator === false) }}><i className="fa-solid fa-plus"></i> ADICIONAR NOVO</button>
                    </div>
                </div>
                <div className="search-box-table">
                    <input type="text" placeholder="Procurar" />
                </div>

                {CuponsCreator &&
                    <div className="fixed-information-addres-pedido">
                        <div className="information-address">
                            <div className="title-info-address">
                                <h1><i className="fa-solid fa-truck-fast"></i> Criador de Cupons</h1>
                                <button onClick={() => { setCuponsCreator(CuponsCreator === false) }}><span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L12 10.9393L17.4697 5.46967C17.7626 5.17678 18.2374 5.17678 18.5303 5.46967C18.8232 5.76256 18.8232 6.23744 18.5303 6.53033L13.0607 12L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L12 13.0607L6.53033 18.5303C6.23744 18.8232 5.76256 18.8232 5.46967 18.5303C5.17678 18.2374 5.17678 17.7626 5.46967 17.4697L10.9393 12L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967Z" fill="#0F172A" />
                                </svg>
                                </span></button>
                            </div>
                            <div className="Inputs-Show-Creator">
                                <div className="input-ticket">
                                    <input
                                        placeholder="Nome do Cupom *"
                                        value={nomeCupom}
                                        onChange={(e) => setnomeCupom(e.target.value)}
                                    />
                                </div>
                                <div className="input-ticket">
                                    <input
                                        placeholder="Desconto em % (ex: 5, 25) *"
                                        value={DescontoCupom}
                                        type="number"
                                        onChange={(e) => setDesconto(e.target.value)}
                                    />
                                </div>
                                <div className="input-ticket">
                                    <input
                                        placeholder="CÓDIGO-CUPOM * (ex: BEMVINDO) (20caracteres)"
                                        value={CodigoCupom}
                                        onChange={(e) => setCodigoCupom(e.target.value)}
                                    />
                                </div>
                                <div className="input-ticket">
                                    <p>Cupom privado? (Somente com o código)</p>
                                    <select onChange={(e) => { setPrivate(e.target.value) }} value={Private}>
                                        <option value={true}>Sim</option>
                                        <option value={false}>Não</option>
                                    </select>
                                </div>
                            </div>
                            <button onClick={createNewCupom}><span>CRIAR NOVO CUPOM</span></button>
                        </div>
                    </div>
                }

                <div className="list-pedidos">
                    <table>
                        <tr>
                            <td>ID</td>
                            <td>PALAVRA-CHAVE</td>
                            <td>NOME CUPOM</td>
                            <td>DESCONTO %</td>
                            <td>PRIVADO?</td>
                        </tr>
                        {cuponsDisp && cuponsDisp.map((cupom) => {
                            return (
                                <tr className="order_card" id={cupom.id} title={"Cupom " + cupom.id} key={cupom.id}>
                                    <td>{cupom.id}</td>
                                    <td>{cupom.uniqueKey}</td>
                                    <td>{cupom.name}</td>
                                    <td>{cupom.desconto}%</td>
                                    <td>{cupom.private ? 'Sim' : 'Não'}</td>
                                    <td><button onClick={() => removeCupom(cupom.id)}><span><i className="fa-solid fa-trash"></i></span></button></td>
                                </tr>
                            )
                        })}

                    </table>
                </div>
            </div>
        </div>
    )
}

export default CuponsAdm