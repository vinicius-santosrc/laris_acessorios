import FooterIndexPage from "../../../components/FooterIndexPage";
import Header from "../../../components/Header";

export default function GuiaColares() {
    document.querySelector("title").innerText = "Guia de Tamanhos | LARI'S ACESSÓRIOS"

    return (
        <>
            <Header />
            <section class="topinstitucional">
                <h1>Guia de Tamanhos</h1>
                <div class='content-institucional'>
                    <div class='opcoesinstitucional'>
                        <a href="../duvidas-frequentes"><i class="fa-regular fa-circle-question"></i> Duvidas Frequentes</a>
                        <a href="../../pages/privacidade-seguranca"><i class="fa-solid fa-file-contract"></i> Política de Privacidade</a>
                        <a href="../../institucional/guia-de-tamanhos/colares"><i class="fa-solid fa-book"></i> Guia de Tamanhos</a>
                        <a href="../../institucional/cuidado-joias"><i class="fa-solid fa-gem"></i> Cuidados com as Joias e Miçangas</a>
                        <a href="../../institucional/fale-conosco"><i class="fa-solid fa-comment"></i> Fale Conosco</a>
                    </div>
                    <div class="items-content-inst">
                        <div class="top-item-content">
                            <h1>Colares</h1>
                            <div class="ref-item-content">
                                <a href="./pulseiras">Pulseiras</a>
                                <a id="selected" href="./colares">Colares</a>
                                <a href="./aneis">Anéis</a>
                                <a href="./tornozeleiras">Tornozeleiras</a>
                            </div>
                        </div>
                        <div class="content-inside-item">
                            <div class='content-inside-item-left-side'>
                                <h2>Como encontrar o comprimento perfeito do seu colar:</h2>
                                <p class="childinside">O Comprimento do colar varia de pessoa para pessoa; portanto, existem algumas maneiras de descobrir qual é o tamanho ideal para você. Siga as instruções abaixo.</p>

                                <div class='option-inside'>
                                    <h3>Pingentes:</h3><p>Os pingentes inclusos nos colares são de tamanho único.</p>
                                </div>
                                <div class='option-inside'>
                                    <h3>Miçangas:</h3><p>Siga a imagem ao lado para saber qual tamanho se encaixa melhor para você.</p>
                                </div>
                                <div class='option-inside'>
                                    <h3>Pratas 925:</h3><p>Tamanhos únicos.</p>
                                </div>
                            </div>
                            <div class="content-inside-item-img">
                                <img src={"../../static/media/product-images/guia-de-tamanhos-colares__0d8d30f2-b129-4717-b39d-c06c5dc1218f.webp"} alt="" />
                            </div>
                        </div>

                    </div>

                </div>
            </section>
            <FooterIndexPage />
        </>
    )
}