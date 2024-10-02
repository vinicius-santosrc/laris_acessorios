/**
 * Creation Date: 20/05/2023
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import FooterIndexPage from "../components/FooterIndexPage";
import Header from "../components/Header";

export default function PrivacidadeSeguranca() {
    return (
        <>
            <Header />
            <section className="topinstitucional">
                <h1>Política de Privacidade</h1>
                <div className='content-institucional'>
                    <div className='opcoesinstitucional'>
                        <a href="../institucional/duvidas-frequentes"><i className="fa-regular fa-circle-question"></i> Duvidas Frequentes</a>
                        <a href="../pages/privacidade-seguranca"><i className="fa-solid fa-file-contract"></i> Política de Privacidade</a>
                        <a href="../institucional/guia-de-tamanhos/colares"><i className="fa-solid fa-book"></i> Guia de Tamanhos</a>
                        <a href="../institucional/cuidado-joias"><i className="fa-solid fa-gem"></i> Cuidados com as Joias e Miçangas</a>
                        <a href="../institucional/fale-conosco"><i className="fa-solid fa-comment"></i> Fale Conosco</a>
                    </div>
                    <div className="items-content-inst">
                        <div className="top-item-content">
                            <h1>Política de Privacidade</h1>
                        </div>
                        <div className="content-inside-item">
                            <section className='politica-dados'>
                                <h1>Política de Privacidade e de Proteção de Dados da Loja LARI'S ACESSÓRIOS</h1>
                                <p>Última atualização: 07/12/2021</p>

                                <h1>FINALIZADA DE COLETA DE DADOS</h1>

                                <p>A coleta de dados é realizada para:</p>
                                <p>(a) Otimizar o tempo da realização pedido</p>
                                <p>(b) Evitar pedidos "falsos"</p>
                                <p>(c) Manter contato por telefone, e-mail, SMS, WhatsApp, notificações ou outros meios de comunicação;</p>
                                <p>(d) Realizar cancelamento de compras, estorno de valores ou trocas de produtos, observado o disposto na legislação vigente;</p>
                                <p>Essas informações são feitas via Armazenamento Local, sem nenhum banco de dados incluído.</p>
                                <p>Feito para facilitar o uso seu em nosso site</p>

                                <br />

                                    <h1>QUAIS DADOS SÃO DADOS COLETADOS</h1>

                                    <p>(a) Nome - No momento da compra</p>
                                    <p>(b) Dados de contato - No momento da compra</p>
                                    <p>(c) E-mail - No momento da compra</p>
                                    <p>(d) Informações sobre seu endereço - No momento da compra</p>

                                    <br />

                                        <h1>COMPARTILHAMENTO DE DADOS PESSOAIS</h1>
                                        <p>Somente compartilhamos dados para: </p>
                                        <p>(a) Equipe LARI'S</p>

                                        <br />

                                            <h1>POLÍTICA DE COMUNICAÇÃO</h1>
                                            <p>Quando você realiza uma compra em nosso site, nós vamos entrar em contato com você para a confirmação de seu pedido.</p>
                                            <br />
                                                <p>Não coletamos, armazenamos ou de outra forma tratamos intencionalmente dados pessoais excessivos ou desnecessários para a prestação dos nossos serviços. Em função disso, pedimos que você se abstenha de compartilhar dados pessoais sensíveis conosco, como por exemplo, aqueles relativos à sua origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou a organização de caráter religioso, filosófico ou político, saúde ou vida sexual, bem como dado genético.</p>
                                                <h1>A LARI'S NUNCA IRÁ SOLICITAR DADOS DE CARTÃO DE CRÉDITO / DÉBITO POR WHATSAPP OU CONTATO TELEFÔNICO, NO CASO DE QUALQUER OUTRA ATITUDE SUSPEITA, ENCAMINHE SUA DÚVIDA ENTRE EM CONTATO CONOSCO: (35) 9739-4181</h1>
                                            </section>

                                        </div>
                                    </div>
                                </div>
                            </section>
                            <FooterIndexPage />
                        </>
                        )
}