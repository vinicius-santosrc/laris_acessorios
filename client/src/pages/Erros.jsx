/**
 * Creation Date: 07/09/2023
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import NavigationLeft from "../components/AdminPage/NavigationLeft";

export default function Errors() {
    return (
        <div className="AdminPage-DashBoard">
            <NavigationLeft />
            <section className="error-page">
                <h1>Docs de Erros</h1>
                <p>Essa documentação te auxiliará a reconhecer o possível erro dentro do site da LARI'S ACESSÓRIOS</p>
                <div className="section-error-type">
                    <h2>Armazenamento de Fotos(Storage)</h2>
                    <p>O Storage permite você enviar fotos para o banco de dados, assim você consirá o URL da imagem para utiliza-la como produto ou outras alternativas. </p>
                    <br />
                    <p>Deste modo, é compreensível que nem todos os usuários tem acesso para fazer o envio de imagens para o Storage.</p>
                    <br />
                    <table>
                        <tr>
                            <td>AÇÃO</td>
                            <td>USER</td>
                            <td>LER</td>
                            <td>CRIAR</td>
                            <td>ATUALIZAR</td>
                            <td>REMOVER</td>
                        </tr>
                        <tr>
                            <td>CRIAR PRODUTO</td>
                            <td>QUALQUER</td>
                            <td>AUTORIZADO</td>
                            <td>NÃO AUTORIZADO</td>
                            <td>NÃO AUTORIZADO</td>
                            <td>NÃO AUTORIZADO</td>
                        </tr>
                        <tr>
                            <td>CRIAR PRODUTO</td>
                            <td>ADMINISTRAÇÃO</td>
                            <td>AUTORIZADO</td>
                            <td>AUTORIZADO</td>
                            <td>AUTORIZADO</td>
                            <td>AUTORIZADO</td>
                        </tr>
                    </table>
                    <br />


                </div>
                <div className="section-error-type">
                    <h2>Requerimento de Arquivos</h2>
                    <p>Requerimento de Arquivo é realizado toda vez que o usuário entra na página, fazendo uma requisição para o banco de dados atual. </p>
                    <br />
                    

                </div>
                <div className="section-error-type">
                    <h2>Códigos de Erros</h2>
                    <table>
                        <tr>
                            <td>CÓDIGO</td>
                            <td>TEXTO</td>
                            <td>DESCRIÇÃO</td>
                        </tr>
                        <tr>
                            <td>401</td>
                            <td>Não autorizado</td>
                            <td>As credênciais do usuário atual não permitem-o de realizar tal ação, assim, bloqueando de realizar Requests, Uploads, Reads ou Deletes</td>
                        </tr>
                        <tr>
                            <td>413</td>
                            <td>PayLoad Largo</td>
                            <td>O upload do arquivo não foi concluído por conta do seu tamanho largo que excede os limites do servidor.</td>
                        </tr>
                        <tr>
                            <td>500</td>
                            <td>Erro Interno</td>
                            <td>Problemas no código ou no banco de dados.</td>
                        </tr>

                        <tr>
                            <td>504</td>
                            <td>Servidores Offline</td>
                            <td>Os servidores estão pausados temporáriamente e não é possível realizar Requests.</td>
                        </tr>
                    </table>
                </div>
            </section>

        </div>

    )
}