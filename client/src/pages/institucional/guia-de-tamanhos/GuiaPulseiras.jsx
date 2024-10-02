/**
 * Creation Date: 19/09/2023
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import FooterIndexPage from "../../../components/FooterIndexPage";
import Header from "../../../components/Header";

export default function GuiaPulseiras() {
    document.querySelector("title").innerText = "Guia de Tamanhos | LARI'S ACESSÓRIOS"

    return (
        <>
            <Header />
            <section className="topinstitucional">
                <h1>Guia de Tamanhos</h1>
                <div className='content-institucional'>
                    <div className='opcoesinstitucional'>
                        <a href="../duvidas-frequentes"><i className="fa-regular fa-circle-question"></i> Duvidas Frequentes</a>
                        <a href="../../pages/privacidade-seguranca"><i className="fa-solid fa-file-contract"></i> Política de Privacidade</a>
                        <a href="../../institucional/guia-de-tamanhos/colares"><i className="fa-solid fa-book"></i> Guia de Tamanhos</a>
                        <a href="../../institucional/cuidado-joias"><i className="fa-solid fa-gem"></i> Cuidados com as Joias e Miçangas</a>
                        <a href="../../institucional/fale-conosco"><i className="fa-solid fa-comment"></i> Fale Conosco</a>
                    </div>
                    <div className="items-content-inst">
                        <div className="top-item-content">
                            <h1>Pulseiras</h1>
                            <div className="ref-item-content">
                                <a id="selected" href="./pulseiras">Pulseiras</a>
                                <a href="./colares">Colares</a>
                                <a href="./aneis">Anéis</a>
                                <a href="./tornozeleiras">Tornozeleiras</a>
                            </div>
                        </div>
                        <div className="content-inside-item">
                            <div className='content-inside-item-left-side'>
                                <h2>Como encontrar o tamanho perfeito para sua pulseira</h2>
                                <p className="childinside">O tamanho da pulseira varia de pessoa para pessoa; portanto, existem algumas maneiras de descobrir qual é o tamanho ideal para você. Siga as instruções abaixo.</p>

                                <div className='option-inside'>
                                    <h3>Miçangas:</h3><p>Siga a imagem ao lado para saber qual tamanho se encaixa melhor para você.</p>
                                </div>
                                <div className='option-inside'>
                                    <h3>Pratas 925:</h3><p>Tamanhos únicos.</p>
                                </div>
                            </div>
                            <div className="content-inside-item-img">
                                <img src="../../static/media/product-images/guia-de-tamanhos-pulseiras__806e067a-a6d2-4752-8020-9450f37d946d.webp" alt="" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <FooterIndexPage />
        </>
    )
}