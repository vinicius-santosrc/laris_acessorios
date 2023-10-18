export default function Slider_Banners() {

    return (
        <>
            <section className='container'>
                <div className="pc-slider">
                    <ul>
                        <li>
                            <a href>
                                <img onclick="window.open('novidades')" src={window.location.origin + "/static/media/product-images/banner-noviades.png"} />
                            </a>
                        </li>
                        
                    </ul>

                </div>
            </section>

            <section className='container'>
                <div className="cell-slider">
                    <a href="novidades">
                        <img src="/static/media/product-images/banner-noviades-1.png" />
                    </a>
                    
                </div>
            </section>

        </>
    )
}