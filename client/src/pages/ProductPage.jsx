import { Query } from "appwrite"

import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"

import * as emailjs from "@emailjs/browser"

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

//DATABASE

import db from "../lib/appwrite"

//COMPONENTES
import Header from "../components/Header"


//COMPONENTE LOADING
import { Ring } from '@uiball/loaders'
import Swal from "sweetalert2"

//SCRIPTS

import { SacolaDeCompras, carregarSacolaDoLocalStorage } from "../components/ProductsPage/sacola"
import FooterIndexPage from "../components/FooterIndexPage"
import CardItems from "../components/ItemCard"
import { GetProduct, getAllProducts } from "../lib/database";


const produtos = JSON.parse(localStorage.getItem('produtos')) || []


export default function ProductPage() {

    const PRODUTO_NAME = useParams() //PEGAR URL ATUAL
    const [Product, setProduct] = useState([]) //DEFINIR PRODUTO ATUAL
    const [ProdutosRelacionados, setProductRelacionados] = useState([]) //DEFINIR PRODUTOS RELACIONADOS
    const [PHOTOURL, setPHOTOURL] = useState({ PHOTOURL: [] })
    const [photospublic, setPhotosOfPublic] = useState([])
    const [SIZES, SETSIZES] = useState([]) //PEGAR TODOS OS SIZES DA PUBLICACAO
    const [PHOTOATUAL, SETPHOTOATUAL] = useState(0) //PARA MUDAR A FOTO PRINCIPAL

    const [tamanho, setTamanho] = useState(null)

    useEffect(() => {

        async function request_Product() {
            try {
                const pdtRequest = await GetProduct(PRODUTO_NAME.product);
                setProduct(pdtRequest);
                SETSIZES(JSON.parse(pdtRequest.tamanhos))
                ChangePageTitle(pdtRequest.name_product); // Mudando Title Página
                setPHOTOURL(JSON.parse(pdtRequest.photoURL));

                if (pdtRequest.photoURL && pdtRequest.photoURL.length > 0) {
                    setPhotosOfPublic(pdtRequest.photoURL.map((r) => (
                        <img src={r} alt="" key={r} />
                    )));
                }

                localStorage.setItem('PREFERENCE', Product.categoria);
            } catch (error) {
                console.error('Erro na requisição:', error);
            }
        }

        async function getRelatedProducts() {
            try {
                const allProducts = await getAllProducts();
                setProductRelacionados(allProducts.splice(0, 20).map((products) => {

                    return (
                        <CardItems
                            data={products}
                        />
                    )
                }))
            }
            catch (error) {
                console.log('Erro ao pegar produtos relacionados: ', error)
            }
        }

        request_Product();
        getRelatedProducts();
    }, [PRODUTO_NAME]); // Adicione PRODUTO_NAME como dependência para reexecutar o efeito quando ele mudar

    async function ChangePageTitle(name) {
        document.querySelector("title").innerText = name + " | LARI'S ACESSÓRIOS"
    }

    function product_indisponivel() {
        (async () => {

            const { value: formValues } = await Swal.fire({
                title: 'Complete as opções abaixo para receber aviso quando esse produto estiver disponível.',
                html:
                    '<input id="swal-input" class="swal2-input" placeholder=Nome>' +
                    '<input type="email" id="swal-input1" class="swal2-input" placeholder=Email>' +
                    '<input type="tel" id="swal-input2" class="swal2-input" placeholder=Telefone>',
                focusConfirm: false,
                confirmButtonText: 'Confirmar recebimento de notificações',
                confirmButtonColor: '#EF59A0',
                preConfirm: () => {
                    return [
                        document.getElementById('swal-input').value,
                        document.getElementById('swal-input1').value,
                        document.getElementById('swal-input2').value
                    ]
                }
            })

            let nomeaviso = document.getElementById('swal-input').value
            let emailaviso = document.getElementById('swal-input1').value
            let numberaviso = document.getElementById('swal-input2').value

            if (emailaviso == '' || numberaviso == '' || nomeaviso == '' || emailaviso == undefined || numberaviso == undefined || nomeaviso == undefined || emailaviso == null || numberaviso == null || nomeaviso == null || emailaviso == 'null' || numberaviso == 'null' || nomeaviso == 'null' || emailaviso == ' ' || numberaviso == ' ' || nomeaviso == ' ' || emailaviso == '  ' || nomeaviso == '  ' || numberaviso == '  ' || emailaviso == '   ' || nomeaviso == '   ' || numberaviso == '   ') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Preenche todas as opções.',
                })
            }

            else {
                emailjs.send("laris-acessorios", "template_ei7wc9p", {
                    nome: nomeaviso,
                    produto: Product.name_product + ' / ' + Product.fornecedor,
                    email: emailaviso,
                    telefone: numberaviso,
                }, 'user_LFJAXNJjH0WCy5N2o9gl4');
                Swal.fire(
                    'Sucesso!',
                    'Você será avisada(o) de quando o produto estiver disponível.',
                    'success'
                )
            }

        })()
    }

    function HandleClickAdd() {

        if (!tamanho) {
            return
        }

        let LOCALST = localStorage.getItem("sacola")
        let quantidade = 1
        let personalizacao = document.querySelector(".personalizado-card input")

        let JSON2 = JSON.parse(LOCALST)

        let photopdt = PHOTOURL
        if (Product != "" && PHOTOURL && PHOTOURL.length > 0 ? PHOTOURL[0] : "") {
            photopdt = PHOTOURL[0]
        }

        if (Product.extensor == true) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })

            Swal.fire({
                title: 'Você deseja adicionar <b>Extensor (+4cm)</b>',
                icon: 'info',
                html:
                    `
                    <div class='item-prata'>
                        <img src="../static/media/product-images/extensor (1).jpeg" alt="">
                        <div class="text-prata">
                            <p class='novidade-loja'>Novo</p>
                            <h1 class="nome-prata">Extensor (+4cm)</h1>
                            <div class='estrelas'>
                                <img src="../static/media/product-images/Nenhuma estrela.png" alt="">
                            </div>
                            <div class="promocao">
                                <p class="preço-promo"><s>R$ 13,00</s>
                                <p class="preço-loja">R$ 8,50</p>
                                <p class="opcoesdepaga">(comprado junto com produtos)</p>
                            </div>
                            
                        </div>
                    </div>
              ` +
                    '+ R$ 8,50 na soma total',
                showCancelButton: true,
                confirmButtonColor: '#EF59A0',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ADICIONAR',
                cancelButtonText: 'NÃO '
            }).then((result) => {
                if (result.isConfirmed) {
                    JSON2.push({
                        name: 'Extensor (+4cm)',
                        tamanho: '4cm',
                        qtd: 1,
                        preco: 13,
                        desconto: 4.5,
                        photoURL: window.location.origin + '/static/media/product-images/extensor%20(1).jpeg',
                        onclick: window.location.origin + '/prata/extensor.html'
                    })
                    if (!personalizacao) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `Você adicionou ${Product.name_product} a sacola.`,
                            showConfirmButton: false,
                            timer: 1500
                        })
                            .then((r) => {
                                JSON2.push({
                                    id: Product.id,
                                    name: Product.name_product,
                                    tamanho: tamanho,
                                    qtd: parseInt(quantidade),
                                    preco: Product.price,
                                    desconto: Product.desconto,
                                    photoURL: photopdt
                                })
                                localStorage.setItem('sacola', JSON.stringify(JSON2))
                                window.location.reload()
                            })
                    }
                    else {
                        if (personalizacao.value == "") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Preencha todas informações!',
                            })
                        }
                        else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: `Você adicionou ${Product.name_product} a sacola.`,
                                showConfirmButton: false,
                                timer: 1500
                            })
                                .then((r) => {
                                    JSON2.push({
                                        id: Product.id,
                                        name: Product.name_product,
                                        tamanho: tamanho,
                                        qtd: parseInt(quantidade),
                                        preco: Product.price,
                                        desconto: Product.desconto,
                                        photoURL: photopdt,
                                        personalizacao: personalizacao.value
                                    })
                                    localStorage.setItem('sacola', JSON.stringify(JSON2))
                                    window.location.reload()
                                })
                        }

                    }
                }

                else if (result.dismiss) {
                    if (!personalizacao) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `Você adicionou ${Product.name_product} a sacola.`,
                            showConfirmButton: false,
                            timer: 1500
                        })
                            .then((r) => {
                                JSON2.push({
                                    id: Product.$id,
                                    name: Product.name_product,
                                    tamanho: tamanho,
                                    qtd: parseInt(quantidade),
                                    preco: Product.price,
                                    desconto: Product.desconto,
                                    photoURL: photopdt
                                })
                                localStorage.setItem('sacola', JSON.stringify(JSON2))
                                window.location.reload()
                            })
                    }
                    else {
                        if (personalizacao.value == "") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Preencha todas informações!',
                            })
                        }
                        else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: `Você adicionou ${Product.name_product} a sacola.`,
                                showConfirmButton: false,
                                timer: 1500
                            })
                                .then((r) => {
                                    JSON2.push({
                                        id: Product.$id,
                                        name: Product.name_product,
                                        tamanho: tamanho,
                                        qtd: parseInt(quantidade),
                                        preco: Product.price,
                                        desconto: Product.desconto,
                                        photoURL: photopdt,
                                        personalizacao: personalizacao.value
                                    })
                                    localStorage.setItem('sacola', JSON.stringify(JSON2))
                                    window.location.reload()
                                })
                        }

                    }
                }

            });
        }
        else {
            if (!personalizacao) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `Você adicionou ${Product.name_product} a sacola.`,
                    showConfirmButton: false,
                    timer: 1500
                })
                    .then((r) => {
                        JSON2.push({
                            id: Product.id,
                            name: Product.name_product,
                            tamanho: tamanho,
                            qtd: parseInt(quantidade),
                            preco: Product.price,
                            desconto: Product.desconto,
                            photoURL: photopdt
                        })
                        localStorage.setItem('sacola', JSON.stringify(JSON2))
                        window.location.reload()
                    })
            }
            else {
                if (personalizacao.value == "") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Preencha todas informações!',
                    })
                }
                else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Você adicionou ${Product.name_product} a sacola.`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                        .then((r) => {
                            JSON2.push({
                                id: Product.$id,
                                name: Product.name_product,
                                tamanho: tamanho,
                                qtd: parseInt(quantidade),
                                preco: Product.price,
                                desconto: Product.desconto,
                                photoURL: photopdt,
                                personalizacao: personalizacao.value
                            })
                            localStorage.setItem('sacola', JSON.stringify(JSON2))
                            window.location.reload()
                        })
                }

            }
        }

    }

    return (
        <>
            <Header />
            {/*
            <section>
                <div className='sessoes-top'>
                    <div className='etapa'>
                        <i className="fa-solid fa-truck-fast"></i>
                        <div><p>Entrega com qualidade Lari's</p></div>
                    </div>
                    <div className='etapa'>
                        <i className="fa-solid fa-money-bill"></i>
                        <div><p>Pague na entrega ou por Pix</p></div>
                    </div>
                </div>
            </section>
             */}

            {/*
            <section>
                <div className="infocompra">

                    {photospublic}

                </div>
            </section>
             */}

            <section>
                <div className='item'>
                    <div className='backitem'>
                        <div className='imgitem'>
                            <div className='opcoesdeimagem'>

                                {PHOTOURL.length && PHOTOURL.map((photo, index) => {
                                    const handleClick = () => {
                                        SETPHOTOATUAL(index);
                                    };

                                    return (
                                        <div>
                                            <img onClick={handleClick} id={index} key={index} src={photo} alt="" />
                                        </div>
                                    )
                                })}


                            </div>
                            <div className="imagemprincipal">
                                <img src={Product != "" && PHOTOURL && PHOTOURL.length > 0 ? PHOTOURL[PHOTOATUAL] : ""} alt="" />
                            </div>
                            <div className="imagem-principal-mobile">
                                <Swiper
                                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                                    slidesPerView={1}
                                    pagination={{ clickable: true }}
                                    navigation
                                >
                                    {PHOTOURL && PHOTOURL.length && PHOTOURL.map((item, index) => {

                                        const handleClick = () => {
                                            SETPHOTOATUAL(index);
                                        };

                                        return (
                                            <SwiperSlide  key={item.id}>
                                                <img
                                                    onClick={handleClick}
                                                    id={index}
                                                    key={index}
                                                    src={item}
                                                    className='imagemprincipal-img'
                                                />
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                            </div>

                        </div>
                        {Product != '' ?
                            <div className='itensdesc'>
                                <div className="directory-component">
                                    <p id='caminho'>LARI'S ACESSÓRIOS</p>
                                </div>
                                <div className="header-product-component">
                                    <h1>{Product.name_product}</h1>
                                    <p className="bottom-code">Código: LARIS-{Product.id}</p>
                                </div>
                                <div className="avaliacoes">
                                    <img src="../static/media/product-images/Nenhuma estrela.png" alt="" />
                                </div>
                                <div className="price-component-show">
                                    {Product.desconto > 0 ?
                                        <React.Fragment>
                                            <h2><s style={{ color: 'darkgray' }}>R$ {Product.price.toFixed(2)}</s> R$ {(Product.price - Product.desconto).toFixed(2)}</h2>
                                            <p>Produto disponível para cupons</p>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <h2>R$ {Product.price.toFixed(2)}</h2>
                                            <p>Produto disponível para cupons</p>
                                        </React.Fragment>
                                    }
                                </div>
                                <div className='tamanho-component'>
                                    <p className="tamanhofrase">Tamanho {!tamanho && <span id="red-color">Selecione uma opção</span>}</p>
                                    <div className="tamanhos-options">
                                        {SIZES.map((s) => {
                                            return (
                                                <div className="tamanho-option-select" value={s}>
                                                    <button onClick={() => setTamanho(s)} className="button-tamanhos-wrapper" id={tamanho === s ? "selected" : null}>
                                                        <span>{s}</span>
                                                    </button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="guia-tamanhos-component">
                                    <a href={window.location.origin + "/institucional/guia-de-tamanhos/colares"} target="_blank"><i className="fa-solid fa-ruler"></i> Descubra seu tamanho</a>
                                </div>

                                <div className="buttons-component-actions">
                                    {Product.disponibilidade == true ?
                                        <button className='button-wrapper--content' onClick={HandleClickAdd}>
                                            <span><i className="fas fa-cart-plus"></i> Adicionar a sacola</span>
                                        </button>
                                        :
                                        <button className='button-wrapper--indisponivel' onClick={product_indisponivel}>
                                            <span>
                                                <i className="fas fa-shopping-bag"></i> AVISE-ME QUANDO CHEGAR</span>
                                        </button>
                                    }
                                </div>

                                <div className="bottom-button-content-share">
                                    <p className="compartilhar">Compartilhe: <a href={'https://api.whatsapp.com/send/?text=' + window.location.href} target="_blank"><i className="fa-brands fa-square-whatsapp"></i></a></p>
                                </div>

                            </div>
                            :
                            <Ring
                                size={40}
                                lineWeight={5}
                                speed={2}
                                color="#EF59A0"
                            />
                        }
                        <div>
                        </div>
                    </div>
                </div>

                <div className='informaçõesproduto'>
                    <div className='infoprod'>
                        <h2>Ficha técnica</h2>

                        <div>
                            <ul>
                                <div className='linetype'>
                                    <li id='first'>Tipo:</li><li id='second'>{Product.categoria}</li>
                                </div>
                                <div className='linetype'>
                                    <li id='first'>Modelo:</li><li id='second'>{Product.name_product}</li>
                                </div>

                                <div className='linetype'>
                                    <li id='first'>Marca:</li><li id='second'>LARI'S</li>
                                </div>
                                <div className='linetype'>
                                    <li id='first'>Sac:</li><li id='second'>(35) 9739-4181</li>
                                </div>
                                <div className='linetype'>
                                    <li id='first'>Tamanho:</li><li id='second'>{SIZES}</li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className='comentarios'>
                <h1>Comentários</h1>
                <div className='comentarios-sides'>
                    <div className="comentarios1">
                        <p className="semcomentarios">Nenhum comentário foi feito ainda para este produto, deseja fazer um?</p>
                    </div>
                </div>
                <section className="obs-coments-sem">
                    <a href="">INDISPONÍVEL</a>
                </section>
            </section>
            <FooterIndexPage />
        </>
    )
}