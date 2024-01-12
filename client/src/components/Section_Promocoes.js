import { Query } from "appwrite";
import db from "../lib/appwrite"
import { useEffect, useState } from "react";
import { Ring } from "@uiball/loaders";
import CardItems from "./ItemCard";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { getAllProducts } from "../lib/database";


export default function SectionProducts(props) {
    const [ProductsNovidades, setProductsNovidades] = useState([]);
    const [ProductForYouItems, setProductForYouItems] = useState([]);
    const [ProductsPromocoes, setProductsPromocoes] = useState([]);

    const PREFERENCE = localStorage.getItem("PREFERENCE");
    if (PREFERENCE) {

    }
    else {
        localStorage.setItem("PREFERENCE", 'PRATAS')
    }

    function randomNumberForYou() {
        const randomNum = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

        return randomNum;
    }

    async function setProductFOrYou() {
        const products = await getAllProducts();


        const ProductsArray = products.filter((a) => (a.disponibilidade == true)).slice(randomNumberForYou(), 30).map((products) => (
            products.disponibilidade ?
                <SwiperSlide>
                    <CardItems
                        data={products}
                    />
                </SwiperSlide>
                :
                null

        ));
        setProductForYouItems(ProductsArray)

    }

    async function setProductNovidades() {
        const products = await getAllProducts();

        const ProductsArray = products.map((products) => (
            <SwiperSlide>
                <CardItems
                    data={products}
                />
            </SwiperSlide>
        ));
        setProductsNovidades(ProductsArray)

    }

    async function setShowProductPromocoes() {
        const products = await getAllProducts();
        const ProductsArray = products.filter(pdt => pdt.desconto > 0).map((produto) => (
            <SwiperSlide>
                <CardItems
                    data={produto}
                />
            </SwiperSlide>
        ));
        setProductsPromocoes(ProductsArray)

    }


    useEffect(() => {

        setProductNovidades()
        setProductFOrYou()
        setShowProductPromocoes()

    }, [])
    return (
        <>
            <section>
                <div className="title-index">
                    <h1>{props.name}</h1>
                    {props.hide_bottom === true ?
                        <></>
                        :
                        <a href={window.location.origin + '/' + props.link}>VEJA TUDO</a>
                    }

                </div>
            </section>

            <div className='estoque-prata-index'>
                {props.name == 'NOVIDADES'
                    ?
                    <>
                        <Swiper
                            modules={[Navigation, Scrollbar, A11y]}
                            slidesPerView={2}
                            pagination={{ clickable: true }}

                        >
                            {ProductsNovidades}
                        </Swiper>
                    </>
                    :
                    <></>}
                {props.name == 'RECOMENDADOS PARA VOCÊ'
                    ?
                    <>
                        <Swiper
                            modules={[Navigation, Scrollbar, A11y]}
                            slidesPerView={2}
                            pagination={{ clickable: true }}

                        >
                            {ProductForYouItems}
                        </Swiper>
                    </>
                    :
                    <></>
                }
                {props.name == 'PROMOÇÕES'
                    ?
                    <>
                        {ProductsPromocoes == '' ?
                            <Ring
                                size={40}
                                lineWeight={5}
                                speed={2}
                                color="#EF59A0"
                            />
                            :
                            <>
                                <Swiper
                                    modules={[Navigation, Scrollbar, A11y]}
                                    slidesPerView={2}
                                    pagination={{ clickable: true }}

                                >
                                    {ProductsPromocoes}
                                </Swiper>
                            </>
                        }
                    </>
                    :
                    <></>
                }
            </div>



            <div className='estoque-prata-index-pc'>
                {props.name == 'NOVIDADES'
                    ?
                    <>
                        <Swiper
                            modules={[Navigation, Scrollbar, A11y]}
                            slidesPerView={4}
                            pagination={{ clickable: true }}

                        >
                            {ProductsNovidades}
                        </Swiper>
                    </>
                    :
                    <></>
                }
                {props.name == 'RECOMENDADOS PARA VOCÊ'
                    ?
                    <>
                        <Swiper
                            modules={[Navigation, Scrollbar, A11y]}
                            slidesPerView={4}
                            pagination={{ clickable: true }}

                        >
                            {ProductForYouItems}
                        </Swiper>
                    </>
                    :
                    <></>
                }
                {props.name == 'PROMOÇÕES'
                    ?
                    <>
                        {ProductsPromocoes == '' ?
                            <Ring
                                size={40}
                                lineWeight={5}
                                speed={2}
                                color="#EF59A0"
                            />
                            :
                            <>
                                <Swiper
                                    modules={[Navigation, Scrollbar, A11y]}
                                    slidesPerView={3}
                                    pagination={{ clickable: true }}

                                >
                                    {ProductsPromocoes}
                                </Swiper>
                            </>}
                    </>
                    :
                    <></>
                }
            </div>

        </>
    )
}