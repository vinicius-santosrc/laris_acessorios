export default function FooterIndexPage() {
    return (
        <>
            <section className='infoindex'>
                <div className="infoindex-inside">
                    <div className="infoindex1">
                        <img src={window.location.origin + "/static/media/product-images/anel-de-casamento-desenhado-a-mao-vetorial-com-elemento-de-logotipo-feminino-de-diamante-no-estilo-doodle_515275-1090-removebg-preview.png"} alt="" />
                        <div>
                            <h1>Limpeza</h1>
                            <p>Ganhe uma limpeza grátis em sua PRATA após o recebimento de seu acessório.</p>
                        </div>
                    </div>
                    <div className="infoindex1">
                        <img src={window.location.origin + "/static/media/product-images/entrega.webp"} alt="" />
                        <div>
                            <h1>Entrega</h1>
                            <p>Receba seus produtos em casa, com conforto e qualidade LARI'S.</p>
                        </div>
                    </div>
                    <div className="infoindex1">
                        <img src={window.location.origin + "/static/media/product-images/favoritos.webp"} alt="" />
                        <div>
                            <h1>Meus Favoritos</h1>
                            <p>Compartilhe seus acessórios favoritos e indique looks incríveis.</p>
                        </div>
                    </div>

                </div>
            </section>

            <section className="redes-sociais">
                <div className='side1'>
                    <a href="https://api.whatsapp.com/send/?phone=5535997394181&text&type=phone_number&app_absent=0" target="_blank"><i className="fa-brands fa-square-whatsapp"></i></a>
                    <a href="https://www.instagram.com/laris.acessorioss/" target="_blank"><i className="fa-brands fa-square-instagram"></i></a>
                    <a href="https://www.tiktok.com/@laris.acessorioss" target="_blank"><i className="fa-brands fa-tiktok"></i></a>
                    <h1>Receba as novidades da LARIS ACESSÓRIOS</h1>
                    <p>Entre no nosso grupo' e receba novidades e promoções exclusivas.</p>
                    <div className="emailsubscribe">
                        <button onClick={() => { }}>Entrar</button>
                    </div>
                    <div className="frasesucessoemail"><p>Obrigado!</p></div>
                    <div className="fraseerroemail"><p>EMAIL INVÁLIDO</p></div>

                </div>
                <div className='side2'>
                    <div className="side2-side1">
                        <h1>Ajuda</h1>
                        <a href={window.location.origin + "/institucional/duvidas-frequentes"}>Dúvidas frequentes</a>
                        <br />
                        <a href={window.location.origin + "/institucional/guia-de-tamanhos/colares"}>Guia de Tamanhos</a>
                        <br />
                        <a href={window.location.origin + "/institucional/cuidado-joias"}>Cuidados com as Jóias</a>
                        <br />
                        <a href={window.location.origin + "/institucional/fale-conosco"}>Fale conosco</a>
                    </div>
                    <div className="side2-side2">
                        <h1>Sobre Nós</h1>
                        <a href={window.location.origin + "/pages/privacidade-seguranca"}>Formulário de Proteção de Dados</a>
                    </div>
                    <div className="side2-side3">
                        <h1>SAC</h1>
                        <h2>(35) 99739-4181</h2>
                        <p>Gerente da LARI'S</p>
                        <h2>(35) 9955-3467</h2>
                        <p>Sócio da LARI'S</p>
                    </div>
                </div>
            </section>

            <section className="sectiondown">
                <div className='formasdepag'>
                    <h2>Formas de pagamento</h2>
                    <div className="pagforms">
                        <img src={window.location.origin + "/static/media/product-images/payment-Pix.webp"} alt="" />
                        <img src={window.location.origin + "/static/media/product-images/payment-Money.png"} alt="" />
                    </div>
                </div>
                <div className='formasdepag'>
                    <h2>Selos</h2>
                    <div className="selos">

                    </div>
                </div>
            </section>
        </>
    )
}