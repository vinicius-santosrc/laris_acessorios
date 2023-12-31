import "../style/stylelink.css"

export default function LinksPage() {
    return (
        <div className="Links-Page">
            <section class="background">
                <img src="https://laris-acessorios.netlify.app/imgs/Colar Ponto De Luz Rosa (2).jpeg" alt="" />
            </section>
            <section class="card-links">
                <div class="title-cards">
                    <div class="imgsback">
                        <img src="https://laris-acessorios.netlify.app/imgs/ico.jpeg" alt="" />
                    </div>
                    <div class="words-back">
                        <h1>LARI’S ACESSÓRIOS</h1>
                        <p>Escolha sua opção</p>
                    </div>
                </div>
                <div class="container">
                    <div class="card">
                        <div class="card-imagem">
                            <a class="LinkHref" href={window.location.origin}>
                                <img src={"https://laris-acessorios.netlify.app/imgs/site.png"} alt="" />
                            </a>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-imagem">
                            <a class="LinkHref" target="_blank" href={"https://api.whatsapp.com/send/?phone=5535997394181&text&type=phone_number&app_absent=0"}>
                                <img src="https://laris-acessorios.netlify.app/imgs/whats.png" alt="" />
                            </a>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-imagem">
                            <a class="LinkHref" target="_blank" href={"https://www.tiktok.com/@laris.acessorioss"}>
                                <img src="https://laris-acessorios.netlify.app/imgs/tiktok-link.png" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}