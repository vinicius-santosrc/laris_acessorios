/**
 * Creation Date: 19/09/2023
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import FooterIndexPage from "../../components/FooterIndexPage";
import Header from "../../components/Header";

export default function CuidadoJoias() {
    document.querySelector("title").innerText = "Cuidados com as Jóias | LARI'S ACESSÓRIOS"
    return (
        <>
            <Header />
            <section class="topinstitucional">
                <h1>Cuidados com as Jóias</h1>
                <div class='content-institucional'>
                    <div class='opcoesinstitucional'>
                        <a href="duvidas-frequentes"><i class="fa-regular fa-circle-question"></i> Duvidas Frequentes</a>
                        <a href="../pages/privacidade-seguranca"><i class="fa-solid fa-file-contract"></i> Política de Privacidade</a>
                        <a href="../institucional/guia-de-tamanhos/colares"><i class="fa-solid fa-book"></i> Guia de Tamanhos</a>
                        <a href="../institucional/cuidado-joias"><i class="fa-solid fa-gem"></i> Cuidados com as Joias e Miçangas</a>
                        <a href="../institucional/fale-conosco"><i class="fa-solid fa-comment"></i> Fale Conosco</a>
                    </div>
                    <div class="items-content-inst">
                        <div class="top-item-content">
                            <h1>Cuidados com as Jóias</h1>
                        </div>
                        <div class="content-inside-item">
                            <div class='content-inside-item-left-side'>
                                <h2>Cuidados com acesórios de PRATA</h2>
                                <br />
                                <p>A prata não enferruja, porém, se não for bem cuidada, pode oxidar, dando aspecto de "suja". Mas fazemos a limpeza das mesmas em nossa loja.</p><br />
                                <p>Para as peças em prata, é muito importante que tenha uma rotina de limpeza constante. Molhe a peça e escove-a levemente com uma escova de dente + bicarbonato de sódio. Após realizado esse processo, lave-a e enxugue-a com o secador no modo morno, para que não fique nem um resquício de água.</p>
                                <p>Oferecemos garantia somente contra defeitos de fabricação. Cuide bem de sua prata.</p>
                                <p><b>EVITE:</b> contato com produtos quimicos, esticar e amassar </p>
                                <p><b>GUARDE:</b> suas semijoias separadamente </p>
                                <p><b>RETIRE:</b> as joias antes de passar perfumes ou maquiagem </p>
                                <br />
                                <h2>Cuidados com acesórios de MIÇANGAS</h2>
                                <br />
                                <p>Não as use com o corpo ainda úmido. Não use na praia ou piscina. - Evitar o contato com perfumes, cremes, hidratantes e cosméticos em geral. - Guarde suas bijuterias em lugar seco e seguro, protegidas do calor, da umidade e do sol.</p>
                                <p><b>EVITE:</b> contato com água, esticar, enrolar e pendurar suas miçangas..  </p>
                                <p><b>COLOQUE</b>  as miçangas após passar cosméticos evitando contato direto. </p>
                                <p><b>GUARDE</b>  em locais com baixa umidade. </p>
                                <br />
                            </div>
                        </div>

                    </div>
                </div>


            </section>
            <FooterIndexPage />
        </>
    )
}