export default function Slider_Banners() {

    return (
        <>
            <section className='container'>
                <div className="pc-slider">
                    <img onclick="window.open('novidades')" src={window.location.origin + "/static/media/product-images/banner-noviades.png"} />
                    <img onclick="window.open('promocoes')" src={window.location.origin + "/static/media/product-images/banner-promocoes.png"} />
                    <img onclick="window.open(`https://api.whatsapp.com/send/?phone=5535997394181&text&type=phone_number&app_absent=0`)" src={window.location.origin + "/static/media/product-images/pedidos-personalizados.png"} />

                </div>
            </section>

            <section className='container'>
                <div className="cell-slider">

                    <a href="novidades"><img src="/static/media/product-images/banner-noviades-1.png" /></a>
                    <a href="promocoes"><img src="/static/media/product-images/banner-promocoes-cell.png" /></a>
                    <a href="https://api.whatsapp.com/send/?phone=5535997394181&text&type=phone_number&app_absent=0"><img src="/static/media/product-images/pedidos-personalizados-cell.png" />  </a>

                </div>
            </section>
            <section className="quadros-inicio">
                <label>Agradecemos por escolher seu produto da loja LARI'S Acessórios</label>
            </section>
        </>
    )
}