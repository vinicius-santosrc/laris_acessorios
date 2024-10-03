/**
 * Creation Date: 03/01/2024
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import React, { useState, useEffect } from "react";
import Notification_Top from "./Notification_Top";
import Swal from 'sweetalert2'
import '../style/header.css'
import SacolaDeCompras from "./ProductsPage/sacola";
import InputSearchBox from "./InputSearchBox";
import { CheckIfUserIsLogged, auth } from "../lib/firebase";
import { GetUserAtual } from "../lib/database";
import InputSearchBoxMobile from "./InputSearchBoxMobile";
import AlertComponent from "./alertComponent";

export default function Header() {
    let data = new Date;
    let ano = data.getFullYear();
    let footer = document.querySelector('p#ano');
    const [numberbagitems, setnumberbagitems] = useState(null);

    let [precototal, setprecototal] = useState(null);
    let [subtotal, setsubtotal] = useState(null);
    let [desconto, setdescontos] = useState(null);
    const [sacolaAt, setSacolaAtual] = useState([]);

    const [usuarioAtual, setusuarioAtual] = useState([]);
    const [loadingUser, setloadingUser] = useState(false);

    const [isAlert, setIsAlert] = useState(false);
    const [typeAlert, settypeAlert] = useState("error");
    const [alertMessage, setMessageAlert] = useState("");

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const res = await GetUserAtual(user.uid);
                    setusuarioAtual(res);
                } catch (error) {
                    console.warn("Erro ao obter dados do usuário: ", error);
                } finally {
                    setloadingUser(false);
                }
            } else {
                console.warn("Usuário não autenticado");
                setloadingUser(false);
            }
        });
        return () => unsubscribe();
    }, []);

    function extrairPrimeiroNome(nomeCompleto) {
        const partesDoNome = nomeCompleto.split(' ');
        const primeiroNome = partesDoNome[0];
        return primeiroNome;
    }

    useEffect(() => {
        fetchSacola();
    }, [])

    function fetchSacola() {
        setSacolaAtual(JSON.parse(localStorage.getItem("sacola")));
        setnumberbagitems(JSON.parse(localStorage.getItem("sacola"))?.length)
        if (Array.isArray(JSON.parse(localStorage.getItem("sacola")))) {
            let preco = 0;
            let sub = 0;
            let desc = 0;
            JSON.parse(localStorage.getItem("sacola")).map((item, index) => {
                preco += item.preco - item.desconto;
                sub += item.preco;
                desc += item.desconto;
            })
            setprecototal(preco);
            setsubtotal(sub);
            setdescontos(desc);
        }
    }

    async function GoToCheckOut() {
        const isLogged = await CheckIfUserIsLogged();
        if (!isLogged) {
            window.location.href = window.location.origin + '/accounts/login?=afterRedirectCheckout';
        }

        if (localStorage.getItem("sacola") == '[]') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Sua sacola está vazia.',
            })
        }

        else {
            window.location.href = window.location.origin + '/checkout#cart=' + getRandomInt(1502) + '?';
        }
    }

    function openmenu() {
        let menu = document.querySelector('.options');
        let back = document.querySelector('.background-option');

        menu.style.display = 'block';
        back.style.display = 'block';
    }

    function fecharmenu() {
        let menu = document.querySelector('.options');
        let back = document.querySelector('.background-option');

        menu.style.display = 'none';
        back.style.display = 'none';
    }

    function limpar() {
        Swal.fire({
            title: 'Você deseja continuar?',
            text: "Essa ação é irreversível.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF59A0',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setIsAlert(true);
                settypeAlert("sucess");
                setMessageAlert(`Sua sacola foi limpa.`);
                setTimeout(() => {
                    setIsAlert(false)
                    window.location.reload();
                }, 4000);
                localStorage.sacola = '[]';
                window.location.reload();
            }
        })
    }


    if (localStorage.sacola == '[]' || localStorage.sacola == undefined || localStorage.sacola == 'undefined' || localStorage == null) {

    }

    else {

        if (document.querySelector('.cart')) {
            let cart3 = document.querySelector('.cart')

            let cartmobile = document.querySelector('.headercell a.cart')
            cartmobile.style.color = '#EF59A0'
        }


    }

    function opencart() {
        let carrinho = document.querySelector('.carrinhoshow')
        let back = document.querySelector('.background-cart')
        fecharmenu()

        carrinho.style.display = 'block'
        back.style.display = 'block'
        fetchSacola()

    }

    function openfiltros() {
        let filtros = document.querySelector('.filtros-select-cell')
        let back = document.querySelector('.background-cart')
        back.style.display = 'block'
        filtros.style.display = 'block'

    }

    function fecharcart() {
        let carrinho = document.querySelector('.carrinhoshow')
        let back = document.querySelector('.background-cart')
        let filtros = document.querySelector('.filtros-select-cell')


        carrinho.style.display = 'none'
        back.style.display = 'none'

    }



    if (window.location.href.includes('checkout')) {
        return (
            <>
                <div className="HeaderContent-LARIS">

                    <header className='menu-pc'>
                        <div className='logo'>
                            <a href={window.location.origin}>
                                <img src={window.location.origin + '/static/media/Logo.webp'} alt="" />
                            </a>
                        </div>
                        <div className='icons'>

                        </div>
                    </header>
                </div>

                <div className='background-cart' onClick={fecharcart}></div>
                <div className='background-option' onClick={fecharmenu}></div>


                <div className='options'>
                    <div className='botaofecharsacola' onClick={fecharmenu}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L12 10.9393L17.4697 5.46967C17.7626 5.17678 18.2374 5.17678 18.5303 5.46967C18.8232 5.76256 18.8232 6.23744 18.5303 6.53033L13.0607 12L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L12 13.0607L6.53033 18.5303C6.23744 18.8232 5.76256 18.8232 5.46967 18.5303C5.17678 18.2374 5.17678 17.7626 5.46967 17.4697L10.9393 12L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967Z" fill="#0F172A" />
                    </svg>
                    </div>
                    <p className="titlemenu">Acesso Rápido</p>
                    <div className='linesacola'></div>
                    <div className='opcoes'>
                        <a href={window.location.origin + "/pratas"}><p>Pratas 925</p></a>
                    </div>
                </div>

                <div className='carrinhoshow'>
                    <div className='mobile'>
                        <p>PRODUTOS</p>
                    </div>
                    <div className='cheio'>
                        <div className='botaofecharsacola' onClick={fecharcart}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L12 10.9393L17.4697 5.46967C17.7626 5.17678 18.2374 5.17678 18.5303 5.46967C18.8232 5.76256 18.8232 6.23744 18.5303 6.53033L13.0607 12L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L12 13.0607L6.53033 18.5303C6.23744 18.8232 5.76256 18.8232 5.46967 18.5303C5.17678 18.2374 5.17678 17.7626 5.46967 17.4697L10.9393 12L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967Z" fill="#0F172A" />
                        </svg>
                        </div>
                        <div className='sacola-top'>
                            <h1>Meus acessórios</h1>
                            <div className='linesacola'></div>
                        </div>
                        <div className='sides'>
                            <div className='side1'>
                                <div className='list'>
                                    <ul>
                                        <SacolaDeCompras
                                            fetch={() => fetchSacola()}
                                        />
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='botoesfinais'>
                            <div className='obsfinal'>
                                <label>Pague com o Pix ou à vista</label>
                            </div>
                            <div className='botaofinal'>
                                <button onClick={GoToCheckOut}>FINALIZAR COMPRA</button>
                            </div>
                        </div>
                        <nav>
                            <ul>
                                <li><a onClick={limpar}><i className="fas fa-trash-alt"></i> Limpar carrinho</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </>
        )
    }


    return (
        <>
            <div className="header-content-laris-acessorios">
                {window.scrollY === 0 ?
                    <div className="topHeaderComponent">
                        <h2>SEJA BEM-VINDA(O) A LARI'S ACESSÓRIOS</h2>
                    </div>
                    :
                    null
                }
                {isAlert ?
                    <AlertComponent
                        message={alertMessage}
                        type={typeAlert}
                        close={() => setIsAlert()}
                    />
                    : null
                }
                <header className='header-component'>
                    <div className='menu-pc-flex'>
                        <div className="menu-pc-top">
                            <div className='logo'>
                                <a href={window.location.origin}>
                                    <img src={window.location.origin + '/static/media/Logo.webp'} alt="" />
                                </a>
                            </div>
                            <div className="rightside-header">
                                <div className="input-search">
                                    <InputSearchBox />
                                </div>
                                <div className="icons">
                                    <a onClick={opencart} className='cart' title="Sacola">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.75 10.5V6C15.75 3.92893 14.0711 2.25 12 2.25C9.92893 2.25 8.25 3.92893 8.25 6V10.5M19.606 8.50723L20.8692 20.5072C20.9391 21.1715 20.4183 21.75 19.7504 21.75H4.24963C3.58172 21.75 3.06089 21.1715 3.13081 20.5072L4.39397 8.50723C4.45424 7.93466 4.93706 7.5 5.51279 7.5H18.4872C19.0629 7.5 19.5458 7.93466 19.606 8.50723ZM8.625 10.5C8.625 10.7071 8.4571 10.875 8.25 10.875C8.04289 10.875 7.875 10.7071 7.875 10.5C7.875 10.2929 8.04289 10.125 8.25 10.125C8.4571 10.125 8.625 10.2929 8.625 10.5ZM16.125 10.5C16.125 10.7071 15.9571 10.875 15.75 10.875C15.5429 10.875 15.375 10.7071 15.375 10.5C15.375 10.2929 15.5429 10.125 15.75 10.125C15.9571 10.125 16.125 10.2929 16.125 10.5Z" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </a>
                                </div>
                                {loadingUser ?
                                    <></>
                                    :
                                    <>
                                        {usuarioAtual && usuarioAtual.nome_completo ?
                                            <div className="icons">
                                                <a href={window.location.origin + "/accounts/myaccount"} className='cart' title="Minha conta">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M15.75 6C15.75 8.07107 14.071 9.75 12 9.75C9.9289 9.75 8.24996 8.07107 8.24996 6C8.24996 3.92893 9.9289 2.25 12 2.25C14.071 2.25 15.75 3.92893 15.75 6Z" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M4.5011 20.1182C4.5714 16.0369 7.90184 12.75 12 12.75C16.0982 12.75 19.4287 16.0371 19.4988 20.1185C17.216 21.166 14.6764 21.75 12.0003 21.75C9.32396 21.75 6.78406 21.1659 4.5011 20.1182Z" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>

                                                    {usuarioAtual && usuarioAtual.nome_completo &&
                                                        <div className="flex-box-a">
                                                            <h3>Minha conta</h3>
                                                            <p>Olá, {extrairPrimeiroNome(usuarioAtual.nome_completo)}</p>
                                                        </div>
                                                    }</a>

                                            </div>
                                            :
                                            <div className="icons">
                                                <a href={window.location.origin + "/accounts/register"} className='cart' title="Minha conta">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M15.75 6C15.75 8.07107 14.071 9.75 12 9.75C9.9289 9.75 8.24996 8.07107 8.24996 6C8.24996 3.92893 9.9289 2.25 12 2.25C14.071 2.25 15.75 3.92893 15.75 6Z" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M4.5011 20.1182C4.5714 16.0369 7.90184 12.75 12 12.75C16.0982 12.75 19.4287 16.0371 19.4988 20.1185C17.216 21.166 14.6764 21.75 12.0003 21.75C9.32396 21.75 6.78406 21.1659 4.5011 20.1182Z" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>

                                                </a>
                                            </div>
                                        }
                                    </>
                                }


                            </div>
                        </div>
                        <div className="menu-pc-bottom">
                            <div className="item-bottom-header" id="destacado">
                                <a href={window.location.origin + "/novidades"}>LANÇAMENTOS</a>
                            </div>
                            <div className="item-bottom-header">
                                <a href={window.location.origin + "/pratas-colares"}>COLARES <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.23017 7.20938C5.52875 6.92228 6.00353 6.93159 6.29063 7.23017L10 11.1679L13.7094 7.23017C13.9965 6.93159 14.4713 6.92228 14.7698 7.20938C15.0684 7.49647 15.0777 7.97125 14.7906 8.26983L10.5406 12.7698C10.3992 12.9169 10.204 13 10 13C9.79599 13 9.60078 12.9169 9.45938 12.7698L5.20938 8.26983C4.92228 7.97125 4.93159 7.49647 5.23017 7.20938Z" fill="#0F172A" />
                                </svg>
                                </a>
                            </div>
                            <div className="item-bottom-header">
                                <a href={window.location.origin + "/pratas-brincos"}>BRINCOS <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.23017 7.20938C5.52875 6.92228 6.00353 6.93159 6.29063 7.23017L10 11.1679L13.7094 7.23017C13.9965 6.93159 14.4713 6.92228 14.7698 7.20938C15.0684 7.49647 15.0777 7.97125 14.7906 8.26983L10.5406 12.7698C10.3992 12.9169 10.204 13 10 13C9.79599 13 9.60078 12.9169 9.45938 12.7698L5.20938 8.26983C4.92228 7.97125 4.93159 7.49647 5.23017 7.20938Z" fill="#0F172A" />
                                </svg>
                                </a>
                            </div>
                            <div className="item-bottom-header">
                                <a href={window.location.origin + "/pratas-aneis"}>ANÉIS <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.23017 7.20938C5.52875 6.92228 6.00353 6.93159 6.29063 7.23017L10 11.1679L13.7094 7.23017C13.9965 6.93159 14.4713 6.92228 14.7698 7.20938C15.0684 7.49647 15.0777 7.97125 14.7906 8.26983L10.5406 12.7698C10.3992 12.9169 10.204 13 10 13C9.79599 13 9.60078 12.9169 9.45938 12.7698L5.20938 8.26983C4.92228 7.97125 4.93159 7.49647 5.23017 7.20938Z" fill="#0F172A" />
                                </svg>
                                </a>
                            </div>
                            <div className="item-bottom-header">
                                <a href={window.location.origin + "/pratas-pulseiras"}>PULSEIRAS <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.23017 7.20938C5.52875 6.92228 6.00353 6.93159 6.29063 7.23017L10 11.1679L13.7094 7.23017C13.9965 6.93159 14.4713 6.92228 14.7698 7.20938C15.0684 7.49647 15.0777 7.97125 14.7906 8.26983L10.5406 12.7698C10.3992 12.9169 10.204 13 10 13C9.79599 13 9.60078 12.9169 9.45938 12.7698L5.20938 8.26983C4.92228 7.97125 4.93159 7.49647 5.23017 7.20938Z" fill="#0F172A" />
                                </svg>
                                </a>
                            </div>
                            <div className="item-bottom-header">
                                <a href={window.location.origin + "/pratas-braceletes"}>BRACELETES <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.23017 7.20938C5.52875 6.92228 6.00353 6.93159 6.29063 7.23017L10 11.1679L13.7094 7.23017C13.9965 6.93159 14.4713 6.92228 14.7698 7.20938C15.0684 7.49647 15.0777 7.97125 14.7906 8.26983L10.5406 12.7698C10.3992 12.9169 10.204 13 10 13C9.79599 13 9.60078 12.9169 9.45938 12.7698L5.20938 8.26983C4.92228 7.97125 4.93159 7.49647 5.23017 7.20938Z" fill="#0F172A" />
                                </svg>
                                </a>
                            </div>
                            <div className="item-bottom-header">
                                <a href={window.location.origin + "/pratas-tornozeleiras"}>TORNOZELEIRAS <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.23017 7.20938C5.52875 6.92228 6.00353 6.93159 6.29063 7.23017L10 11.1679L13.7094 7.23017C13.9965 6.93159 14.4713 6.92228 14.7698 7.20938C15.0684 7.49647 15.0777 7.97125 14.7906 8.26983L10.5406 12.7698C10.3992 12.9169 10.204 13 10 13C9.79599 13 9.60078 12.9169 9.45938 12.7698L5.20938 8.26983C4.92228 7.97125 4.93159 7.49647 5.23017 7.20938Z" fill="#0F172A" />
                                </svg>
                                </a>
                            </div>
                            <div className="item-bottom-header">
                                <a href={window.location.origin + "/pratas-piercing"}>PIERCINGS <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.23017 7.20938C5.52875 6.92228 6.00353 6.93159 6.29063 7.23017L10 11.1679L13.7094 7.23017C13.9965 6.93159 14.4713 6.92228 14.7698 7.20938C15.0684 7.49647 15.0777 7.97125 14.7906 8.26983L10.5406 12.7698C10.3992 12.9169 10.204 13 10 13C9.79599 13 9.60078 12.9169 9.45938 12.7698L5.20938 8.26983C4.92228 7.97125 4.93159 7.49647 5.23017 7.20938Z" fill="#0F172A" />
                                </svg>
                                </a>
                            </div>
                        </div>



                    </div>
                </header>
            </div>
            <header className='headercell'>
                {window.scrollY < 15 ?
                    <div className="topHeaderComponent">
                        <h2>SEJA BEM-VINDA(O) A LARI'S ACESSÓRIOS</h2>
                    </div>
                    :
                    null
                }
                <div className="menu-cell">
                    <a onClick={openmenu} className='menu' title="Acesso rápido"><svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.46875 7.65625H29.5312M5.46875 14.2188H29.5312M5.46875 20.7812H29.5312M5.46875 27.3438H29.5312" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    </a>
                    <div className='logo'>
                        <a href={window.location.origin}>
                            <img src={window.location.origin + "/static/media/Logo.webp"} alt="" />
                        </a>
                    </div>
                    <div className="icons-right-side">
                        {usuarioAtual && usuarioAtual.nome_completo ?
                            <a href={window.location.origin + '/accounts/myaccount'} title="Minha conta"><i className="fa-regular fa-user"></i></a>
                            :
                            <a href={window.location.origin + '/accounts/login'} title="Minha conta"><i className="fa-regular fa-user"></i></a>
                        }
                        <a onClick={opencart} className='cart' title="Sacola"><svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5 16.5V9C13.5 6.51472 15.5147 4.5 18 4.5C20.4853 4.5 22.5 6.51472 22.5 9V16.4509M15.6 31.5H20.4C23.7603 31.5 25.4405 31.5 26.7239 30.846C27.8529 30.2708 28.7708 29.3529 29.346 28.2239C30 26.9405 30 25.2603 30 21.9V18.3C30 16.6198 30 15.7798 29.673 15.138C29.3854 14.5735 28.9265 14.1146 28.362 13.827C27.7202 13.5 26.8802 13.5 25.2 13.5H10.8C9.11984 13.5 8.27976 13.5 7.63803 13.827C7.07354 14.1146 6.6146 14.5735 6.32698 15.138C6 15.7798 6 16.6198 6 18.3V21.9C6 25.2603 6 26.9405 6.65396 28.2239C7.2292 29.3529 8.14708 30.2708 9.27606 30.846C10.5595 31.5 12.2397 31.5 15.6 31.5Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        </a>
                    </div>

                </div>
                {window.scrollY < 15 ?
                    <div className="SearchBox-Mobile">
                        <div className="innerSearchBox-content">
                            <label htmlFor="iptsearch"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            </label>
                            <InputSearchBoxMobile />
                        </div>
                    </div>
                    :
                    null
                }
            </header>

            <div className='background-cart' onClick={fecharcart}></div>
            <div className='background-option' onClick={fecharmenu}></div>


            <div className='options'>
                <div className='botaofecharsacola' onClick={fecharmenu}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L12 10.9393L17.4697 5.46967C17.7626 5.17678 18.2374 5.17678 18.5303 5.46967C18.8232 5.76256 18.8232 6.23744 18.5303 6.53033L13.0607 12L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L12 13.0607L6.53033 18.5303C6.23744 18.8232 5.76256 18.8232 5.46967 18.5303C5.17678 18.2374 5.17678 17.7626 5.46967 17.4697L10.9393 12L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967Z" fill="#0F172A" />
                </svg>
                </div>
                <p className="titlemenu">Acesso Rápido</p>
                <div className='linesacola'></div>
                <div className='opcoes'>
                    <a href={window.location.origin + "/pratas"}><p>Pratas 925</p></a>
                </div>
            </div>

            <div className='carrinhoshow'>
                <div className='mobile'>
                    <p>PRODUTOS</p>
                </div>
                <div className='cheio'>
                    <div className='botaofecharsacola' onClick={fecharcart}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L12 10.9393L17.4697 5.46967C17.7626 5.17678 18.2374 5.17678 18.5303 5.46967C18.8232 5.76256 18.8232 6.23744 18.5303 6.53033L13.0607 12L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L12 13.0607L6.53033 18.5303C6.23744 18.8232 5.76256 18.8232 5.46967 18.5303C5.17678 18.2374 5.17678 17.7626 5.46967 17.4697L10.9393 12L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967Z" fill="#0F172A" />
                    </svg>
                    </div>
                    <div className='sacola-top'>
                        <h1>Meus acessórios</h1>
                        <div className='linesacola'></div>
                    </div>
                    <div className='sides'>
                        <div className='side1'>
                            <div className='list'>
                                <ul>
                                    <SacolaDeCompras
                                        fetch={() => fetchSacola()}
                                    />
                                </ul>
                            </div>
                        </div>
                    </div>
                    {precototal && precototal > 0 ?
                        <div className='botoesfinais'>

                            <div className="precosfinais">
                                <div className="showitemprice">
                                    <h5>Subtotal</h5>
                                    <span>R$ {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="showitemprice">
                                    <h5>Descontos</h5>
                                    <span>R$ {desconto.toFixed(2)}</span>
                                </div>
                                <div className="showitemprice">
                                    <h4>Total</h4>
                                    <span><b>R$ {precototal.toFixed(2)}</b></span>
                                </div>
                            </div>


                            <div className='obsfinal'>
                                <label>Pague com o Pix ou à vista</label>
                            </div>
                            <div className='botaofinal'>
                                <button onClick={GoToCheckOut}>IR PARA O CHECKOUT</button>
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        </>
    )
}