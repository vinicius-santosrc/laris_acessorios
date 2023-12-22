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


export default function SectionProducts(props) {
    const DATABASE_UID = '651ca99af19b7afad3f1';
    const PRODUTOS_UID = '651ca9adf3de7aad17d9';

    const [ProductsNovidades, setProductsNovidades] = useState([]);
    const [ProductForYouItems, setProductForYouItems] = useState([]);
    const [ProductsPromocoes, setProductsPromocoes] = useState([]);

    const PREFERENCE = localStorage.getItem("PREFERENCE");
    if (PREFERENCE) {

    }
    else {
        localStorage.setItem("PREFERENCE", 'MICANGAS')
    }

    function randomNumberForYou() {
        const randomNum = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
        
        return randomNum;
    }

    async function setProductFOrYou() {

        await db.listDocuments(
            DATABASE_UID,
            PRODUTOS_UID,
            [
                Query.orderDesc("$createdAt"),
                Query.limit(30),
                Query.offset(randomNumberForYou()),
                Query.equal('TYPE', PREFERENCE)
            ]
        )
            .then((response) => {
                const ProductsArray = response.documents.map((products) => (


                    products.AVALIABLE ?
                        <SwiperSlide>

                            <CardItems
                                data={products}
                            />
                            false


                        </SwiperSlide>
                        :
                        null

                ));
                setProductForYouItems(ProductsArray)
            })
    }

    function setProductNovidades() {
        db.listDocuments(
            DATABASE_UID,
            PRODUTOS_UID,
            [
                Query.orderDesc("$createdAt"),
                Query.limit(16)
            ]
        )
            .then((response) => {
                const ProductsArray = response.documents.map((products) => (
                    <SwiperSlide>
                        <CardItems
                            data={products}
                        />
                    </SwiperSlide>
                ));
                setProductsNovidades(ProductsArray)
            })
    }

    function setShowProductPromocoes() {
        db.listDocuments(
            DATABASE_UID,
            PRODUTOS_UID,
            [
                Query.greaterThan("DESCONTO", 0),
                Query.orderDesc("$createdAt"),
                Query.limit(16),

            ]
        )
            .then((response) => {
                const ProductsArray = response.documents.map((products) => (
                    <SwiperSlide>
                        <CardItems
                            data={products}
                        />
                    </SwiperSlide>
                ));
                setProductsPromocoes(ProductsArray)
            })
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