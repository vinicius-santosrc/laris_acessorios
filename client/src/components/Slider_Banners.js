// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const items_slider = [
    {
        id: '1',
        image: '/static/media/banner-carnaval.png',
        imagemobile: '/static/media/banner-carnaval-mobile.png'
    },
    {
        id: '2',
        image: '/static/media/banner-pratas-luxo.png',
        imagemobile: '/static/media/banner-pratas-luxo-mobile.png'
    },
    {
        id: '3',
        image: '/static/media/banner-jewerly.png',
        imagemobile: '/static/media/banner-jewerly-mobile.png'
    }
    

]

export default function Slider_Banners() {

    return (
        <>
            <section className='container'>
                <div className='pc-slider'>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        navigation
                    >
                        {items_slider.map((item) => (
                            <SwiperSlide key={item.id}>
                                <img
                                    src={item.image}
                                    alt='Banner LARIS'
                                    className='slide-item'
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            <section className='container'>
                <div className='cell-slider'>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        
                    >
                        {items_slider.map((item) => (
                            <SwiperSlide key={item.id}>
                                <img
                                    src={item.imagemobile}
                                    alt='Banner LARIS'
                                    className='slide-item'
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

        </>
    )
}