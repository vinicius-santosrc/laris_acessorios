import { useState } from "react";
import Notification_Top from "./Notification_Top";
import Swal from 'sweetalert2'



import SacolaDeCompras from "./ProductsPage/sacola";

export default function Header() {
    let data = new Date;
    let ano = data.getFullYear()
    let footer = document.querySelector('p#ano')

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function GoToCheckOut() {
        if(localStorage.getItem("sacola") == '[]') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Sua sacola está vazia.',
              })
        }
        else {
            window.location.href = window.location.origin + '/checkout#cart=' + getRandomInt(1502) + '?'
        }
    }

    function openmenu() {
        let menu = document.querySelector('.options')
        let back = document.querySelector('.background-option')

        menu.style.display = 'block';
        back.style.display = 'block';
    }

    function fecharmenu() {
        let menu = document.querySelector('.options')
        let back = document.querySelector('.background-option')

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
                Swal.fire(
                    'Sucesso!',
                    'Sua sacola foi limpa',
                    'success'
                )
                localStorage.sacola = '[]';
                window.location.reload()
            }
        })
    }

    if (localStorage.sacola == '[]' || localStorage.sacola == undefined || localStorage.sacola == 'undefined' || localStorage == null) {

    }
    else {

        if (document.querySelector('.cart')) {
            let cart3 = document.querySelector('.cart')
            cart3.style.color = '#EF59A0'
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
        if (filtros) {
            filtros.style.display = 'none'
        }
        if (window.location.href.includes("/pratas")) {
            filtros.style.display = 'none'
        }
    }



    if (window.location.href.includes('checkout')) {
        return (
            <>
                <header class='menu-pc'>
                    <div class='logo'>
                        <a href={window.location.origin}>
                            <img src={window.location.origin + '/static/media/Logo.webp'} alt="" />
                        </a>
                    </div>
                    <div class='icons'>

                    </div>
                </header>

                <div className='background-cart' onClick={fecharcart}></div>
                <div className='background-option' onClick={fecharmenu}></div>


                <div class='options'>
                    <div class='botaofecharsacola' onClick={fecharmenu}><i class="fas fa-xmark"></i></div>
                    <p class="titlemenu">Acesso Rápido</p>
                    <div class='linesacola'></div>
                    <div class='opcoes'>
                        <a href={window.location.origin + "/micangas"}><p>Miçangas</p></a>
                        <a href={window.location.origin + "/pratas"}><p>Pratas 925</p></a>
                        <a href={window.location.origin + "/cetim"}><p>Cetim</p></a>


                    </div>
                </div>

                <div class='carrinhoshow'>
                    <div class='mobile'>
                        <p>PRODUTOS</p>
                    </div>
                    <div class='cheio'>
                        <div class='botaofecharsacola' onClick={fecharcart}><i class="fas fa-xmark"></i></div>
                        <div class='sacola-top'>
                            <h1>Meus acessórios</h1>
                            <div class='linesacola'></div>
                        </div>
                        <div class='sides'>
                            <div class='side1'>
                                <div class='list'>
                                    <ul>
                                        <SacolaDeCompras />
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class='botoesfinais'>
                            <div class='obsfinal'>
                                <label>Pague com o Pix ou à vista</label>
                            </div>
                            <div class='botaofinal'>
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

            <header className='menu-pc'>
                <div className='menu-pc-flex'>
                    <div className="menu-pc-top">
                        <div className='logo'>
                            <a href={window.location.origin}>
                                <img src={window.location.origin + '/static/media/Logo.webp'} alt="" />
                            </a>
                        </div>
                        <div className='icons'>
                            <a onClick={opencart} className='cart' title="Sacola"><i className="fas fa-bag-shopping"></i></a>
                            <a onClick={openmenu} className='menu' title="Acesso rápido"><i className="fas fa-bars"></i></a>
                        </div>
                    </div>
                </div>
            </header>
            <header className='headercell'>

                <div className="menu-cell">
                    <a onClick={openmenu} className='menu' title="Acesso rápido"><i className="fas fa-bars"></i></a>
                    <div className='logo'>
                        <a href={window.location.origin}>
                            <img src={window.location.origin + "/static/media/Logo.webp"} alt="" />
                        </a>
                    </div>
                    <a onClick={opencart} className='cart' title="Sacola"><i className="fas fa-bag-shopping"></i></a>
                </div>
            </header>

            <div className='background-cart' onClick={fecharcart}></div>
            <div className='background-option' onClick={fecharmenu}></div>


            <div class='options'>
                <div class='botaofecharsacola' onClick={fecharmenu}><i class="fas fa-xmark"></i></div>
                <p class="titlemenu">Acesso Rápido</p>
                <div class='linesacola'></div>
                <div class='opcoes'>
                    <a href={window.location.origin + "/micangas"}><p>Miçangas</p></a>
                    <a href={window.location.origin + "/pratas"}><p>Pratas 925</p></a>
                    <a href={window.location.origin + "/cetim"}><p>Cetim</p></a>


                </div>
            </div>

            <div class='carrinhoshow'>
                <div class='mobile'>
                    <p>PRODUTOS</p>
                </div>
                <div class='cheio'>
                    <div class='botaofecharsacola' onClick={fecharcart}><i class="fas fa-xmark"></i></div>
                    <div class='sacola-top'>
                        <h1>Meus acessórios</h1>
                        <div class='linesacola'></div>
                    </div>
                    <div class='sides'>
                        <div class='side1'>
                            <div class='list'>
                                <ul>
                                    <SacolaDeCompras />
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class='botoesfinais'>
                        <div class='obsfinal'>
                            <label>Pague com o Pix ou à vista</label>
                        </div>
                        <div class='botaofinal'>
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