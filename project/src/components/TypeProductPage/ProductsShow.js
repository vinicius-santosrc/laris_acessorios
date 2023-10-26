import { Query } from "appwrite"
import db from "../../lib/appwrite"
import { useEffect, useState } from "react"
import { Ring } from '@uiball/loaders'



export default function ProductsShow(props) {

    const [PRODUCTS, SETPRODUCTS] = useState([])

    const DATABASE_UID = '651ca99af19b7afad3f1'
    const PRODUTOS_UID = '651ca9adf3de7aad17d9'

    const getNovidades = () => {
        db.listDocuments(
            DATABASE_UID,
            PRODUTOS_UID,
            [
                Query.limit(200),
                Query.orderDesc("$createdAt"),

            ]
        )
            .then((res) => {
                if (window.location.href.includes("/novidades")) {
                    SETPRODUCTS(res.documents.map((produto) => {
                        return (
                            <a href={"produto/" + produto.URL} id={produto.$id} key={produto.$id}>
                                <div class='item-prata' id={produto.$id}>
                                    <img src={produto != "" && produto.PHOTOURL && produto.PHOTOURL.length > 0 ? produto.PHOTOURL[0] : ""} alt="" />
                                    <div class="text-prata">
                                        {produto.PERSONALIZAVEL == true ? <p class="personalizado-loja">PERSONALIZADO</p> :
                                            <>
                                                {produto.AVALIABLE == true ?
                                                    <p class='novidade-loja'>Disponível</p>
                                                    :
                                                    <p class="esgotado-loja">ESGOTADO</p>}
                                            </>}
                                        <h1 class="nome-prata">{produto.NAME_PRODUCT}</h1>
                                        <div class='estrelas'>
                                            <img src="./static/media/product-images/Nenhuma estrela.png" alt="" />
                                        </div>
                                        <div class="promocao">
                                            {produto.DESCONTO > 0 ?
                                                <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {(produto.PRICE).toFixed(2)}</s> R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                                :
                                                <p class="preço-loja">R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                            }

                                            <p class="opcoesdepaga">Pague à vista ou Pix</p>
                                        </div>
                                        <div class="botaocomprarprata">
                                            <label>VER DETALHES</label>
                                        </div>

                                    </div>
                                </div>
                            </a>
                        )
                    }))
                }
                if (window.location.href.includes("/promocoes")) {
                    SETPRODUCTS(res.documents.filter(r => r.DESCONTO > 0).map((produto) => {
                        return (
                            <a href={"produto/" + produto.URL} id={produto.$id} key={produto.$id}>
                                <div class='item-prata' id={produto.$id}>
                                    <img src={produto != "" && produto.PHOTOURL && produto.PHOTOURL.length > 0 ? produto.PHOTOURL[0] : ""} alt="" />
                                    <div class="text-prata">
                                        {produto.PERSONALIZAVEL == true ? <p class="personalizado-loja">PERSONALIZADO</p> :
                                            <>
                                                {produto.AVALIABLE == true ?
                                                    <p class='novidade-loja'>Disponível</p>
                                                    :
                                                    <p class="esgotado-loja">ESGOTADO</p>}
                                            </>}
                                        <h1 class="nome-prata">{produto.NAME_PRODUCT}</h1>
                                        <div class='estrelas'>
                                            <img src="./static/media/product-images/Nenhuma estrela.png" alt="" />
                                        </div>
                                        <div class="promocao">
                                            {produto.DESCONTO > 0 ?
                                                <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {(produto.PRICE).toFixed(2)}</s> R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                                :
                                                <p class="preço-loja">R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                            }

                                            <p class="opcoesdepaga">Pague à vista ou Pix</p>
                                        </div>
                                        <div class="botaocomprarprata">
                                            <label>VER DETALHES</label>
                                        </div>

                                    </div>
                                </div>
                            </a>
                        )
                    }))
                }
                return
            })
    }

    const getProducts = () => {
        db.listDocuments(
            DATABASE_UID,
            PRODUTOS_UID,
            [
                Query.limit(200),
                Query.equal("TYPE", props.type),
                Query.orderDesc("AVALIABLE"), // Ordena por AVALIABLE em ordem decrescente (false primeiro)
                Query.orderDesc("$createdAt"),
                

            ]
        )
            .then((res) => {
                if (window.location.href.includes("-colares")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Colar').map((produto) => {
                        return (
                            <a href={"produto/" + produto.URL} id={produto.$id} key={produto.$id}>
                                <div class='item-prata' id={produto.$id}>
                                    <img src={produto != "" && produto.PHOTOURL && produto.PHOTOURL.length > 0 ? produto.PHOTOURL[0] : ""} alt="" />
                                    <div class="text-prata">
                                        {produto.PERSONALIZAVEL == true ? <p class="personalizado-loja">PERSONALIZADO</p> :
                                            <>
                                                {produto.AVALIABLE == true ?
                                                    <p class='novidade-loja'>Disponível</p>
                                                    :
                                                    <p class="esgotado-loja">ESGOTADO</p>}
                                            </>}
                                        <h1 class="nome-prata">{produto.NAME_PRODUCT}</h1>
                                        <div class='estrelas'>
                                            <img src="./static/media/product-images/Nenhuma estrela.png" alt="" />
                                        </div>
                                        <div class="promocao">
                                            {produto.DESCONTO > 0 ?
                                                <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {(produto.PRICE).toFixed(2)}</s> R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                                :
                                                <p class="preço-loja">R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                            }

                                            <p class="opcoesdepaga">Pague à vista ou Pix</p>
                                        </div>
                                        <div class="botaocomprarprata">
                                            <label>VER DETALHES</label>
                                        </div>

                                    </div>
                                </div>
                            </a>
                        )
                    }))
                }
                else if (window.location.href.includes("-chockers")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Chocker').map((produto) => {
                        return (
                            <a href={"produto/" + produto.URL} id={produto.$id} key={produto.$id}>
                                <div class='item-prata' id={produto.$id}>
                                    <img src={produto != "" && produto.PHOTOURL && produto.PHOTOURL.length > 0 ? produto.PHOTOURL[0] : ""} alt="" />
                                    <div class="text-prata">
                                        {produto.PERSONALIZAVEL == true ? <p class="personalizado-loja">PERSONALIZADO</p> :
                                            <>
                                                {produto.AVALIABLE == true ?
                                                    <p class='novidade-loja'>Disponível</p>
                                                    :
                                                    <p class="esgotado-loja">ESGOTADO</p>}
                                            </>}
                                        <h1 class="nome-prata">{produto.NAME_PRODUCT}</h1>
                                        <div class='estrelas'>
                                            <img src="./static/media/product-images/Nenhuma estrela.png" alt="" />
                                        </div>
                                        <div class="promocao">
                                            {produto.DESCONTO > 0 ?
                                                <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {(produto.PRICE).toFixed(2)}</s> R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                                :
                                                <p class="preço-loja">R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                            }

                                            <p class="opcoesdepaga">Pague à vista ou Pix</p>
                                        </div>
                                        <div class="botaocomprarprata">
                                            <label>VER DETALHES</label>
                                        </div>

                                    </div>
                                </div>
                            </a>
                        )
                    }))
                }
                else if (window.location.href.includes("-pulseiras")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Pulseira').map((produto) => {
                        return (
                            <a href={"produto/" + produto.URL} id={produto.$id} key={produto.$id}>
                                <div class='item-prata' id={produto.$id}>
                                    <img src={produto != "" && produto.PHOTOURL && produto.PHOTOURL.length > 0 ? produto.PHOTOURL[0] : ""} alt="" />
                                    <div class="text-prata">
                                        {produto.PERSONALIZAVEL == true ? <p class="personalizado-loja">PERSONALIZADO</p> :
                                            <>
                                                {produto.AVALIABLE == true ?
                                                    <p class='novidade-loja'>Disponível</p>
                                                    :
                                                    <p class="esgotado-loja">ESGOTADO</p>}
                                            </>}
                                        <h1 class="nome-prata">{produto.NAME_PRODUCT}</h1>
                                        <div class='estrelas'>
                                            <img src="./static/media/product-images/Nenhuma estrela.png" alt="" />
                                        </div>
                                        <div class="promocao">
                                            {produto.DESCONTO > 0 ?
                                                <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {(produto.PRICE).toFixed(2)}</s> R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                                :
                                                <p class="preço-loja">R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                            }

                                            <p class="opcoesdepaga">Pague à vista ou Pix</p>
                                        </div>
                                        <div class="botaocomprarprata">
                                            <label>VER DETALHES</label>
                                        </div>

                                    </div>
                                </div>
                            </a>
                        )
                    }))
                }
                else if (window.location.href.includes("-phone-strap")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Phone-Strap').map((produto) => {
                        return (
                            <a href={"produto/" + produto.URL} id={produto.$id} key={produto.$id}>
                                <div class='item-prata' id={produto.$id}>
                                    <img src={produto != "" && produto.PHOTOURL && produto.PHOTOURL.length > 0 ? produto.PHOTOURL[0] : ""} alt="" />
                                    <div class="text-prata">
                                        {produto.PERSONALIZAVEL == true ? <p class="personalizado-loja">PERSONALIZADO</p> :
                                            <>
                                                {produto.AVALIABLE == true ?
                                                    <p class='novidade-loja'>Disponível</p>
                                                    :
                                                    <p class="esgotado-loja">ESGOTADO</p>}
                                            </>}
                                        <h1 class="nome-prata">{produto.NAME_PRODUCT}</h1>
                                        <div class='estrelas'>
                                            <img src="./static/media/product-images/Nenhuma estrela.png" alt="" />
                                        </div>
                                        <div class="promocao">
                                            {produto.DESCONTO > 0 ?
                                                <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {(produto.PRICE).toFixed(2)}</s> R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                                :
                                                <p class="preço-loja">R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                            }

                                            <p class="opcoesdepaga">Pague à vista ou Pix</p>
                                        </div>
                                        <div class="botaocomprarprata">
                                            <label>VER DETALHES</label>
                                        </div>

                                    </div>
                                </div>
                            </a>
                        )
                    }))
                }
                else if (window.location.href.includes("-chaveiros")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Chaveiros').map((produto) => {
                        return (
                            <a href={"produto/" + produto.URL} id={produto.$id} key={produto.$id}>
                                <div class='item-prata' id={produto.$id}>
                                    <img src={produto != "" && produto.PHOTOURL && produto.PHOTOURL.length > 0 ? produto.PHOTOURL[0] : ""} alt="" />
                                    <div class="text-prata">
                                        {produto.PERSONALIZAVEL == true ? <p class="personalizado-loja">PERSONALIZADO</p> :
                                            <>
                                                {produto.AVALIABLE == true ?
                                                    <p class='novidade-loja'>Disponível</p>
                                                    :
                                                    <p class="esgotado-loja">ESGOTADO</p>}
                                            </>}
                                        <h1 class="nome-prata">{produto.NAME_PRODUCT}</h1>
                                        <div class='estrelas'>
                                            <img src="./static/media/product-images/Nenhuma estrela.png" alt="" />
                                        </div>
                                        <div class="promocao">
                                            {produto.DESCONTO > 0 ?
                                                <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {(produto.PRICE).toFixed(2)}</s> R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                                :
                                                <p class="preço-loja">R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                            }

                                            <p class="opcoesdepaga">Pague à vista ou Pix</p>
                                        </div>
                                        <div class="botaocomprarprata">
                                            <label>VER DETALHES</label>
                                        </div>

                                    </div>
                                </div>
                            </a>
                        )
                    }))
                }
                else if (window.location.href.includes("-toucas")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Touca').map((produto) => {
                        return (
                            <a href={"produto/" + produto.URL} id={produto.$id} key={produto.$id}>
                                <div class='item-prata' id={produto.$id}>
                                    <img src={produto != "" && produto.PHOTOURL && produto.PHOTOURL.length > 0 ? produto.PHOTOURL[0] : ""} alt="" />
                                    <div class="text-prata">
                                        {produto.PERSONALIZAVEL == true ? <p class="personalizado-loja">PERSONALIZADO</p> :
                                            <>
                                                {produto.AVALIABLE == true ?
                                                    <p class='novidade-loja'>Disponível</p>
                                                    :
                                                    <p class="esgotado-loja">ESGOTADO</p>}
                                            </>}
                                        <h1 class="nome-prata">{produto.NAME_PRODUCT}</h1>
                                        <div class='estrelas'>
                                            <img src="./static/media/product-images/Nenhuma estrela.png" alt="" />
                                        </div>
                                        <div class="promocao">
                                            {produto.DESCONTO > 0 ?
                                                <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {(produto.PRICE).toFixed(2)}</s> R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                                :
                                                <p class="preço-loja">R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                            }

                                            <p class="opcoesdepaga">Pague à vista ou Pix</p>
                                        </div>
                                        <div class="botaocomprarprata">
                                            <label>VER DETALHES</label>
                                        </div>

                                    </div>
                                </div>
                            </a>
                        )
                    }))
                }
                else if (window.location.href.includes("-scrunchie")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Scrunchie').map((produto) => {
                        return (
                            <a href={"produto/" + produto.URL} id={produto.$id} key={produto.$id}>
                                <div class='item-prata' id={produto.$id}>
                                    <img src={produto != "" && produto.PHOTOURL && produto.PHOTOURL.length > 0 ? produto.PHOTOURL[0] : ""} alt="" />
                                    <div class="text-prata">
                                        {produto.PERSONALIZAVEL == true ? <p class="personalizado-loja">PERSONALIZADO</p> :
                                            <>
                                                {produto.AVALIABLE == true ?
                                                    <p class='novidade-loja'>Disponível</p>
                                                    :
                                                    <p class="esgotado-loja">ESGOTADO</p>}
                                            </>}
                                        <h1 class="nome-prata">{produto.NAME_PRODUCT}</h1>
                                        <div class='estrelas'>
                                            <img src="./static/media/product-images/Nenhuma estrela.png" alt="" />
                                        </div>
                                        <div class="promocao">
                                            {produto.DESCONTO > 0 ?
                                                <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {(produto.PRICE).toFixed(2)}</s> R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                                :
                                                <p class="preço-loja">R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                            }

                                            <p class="opcoesdepaga">Pague à vista ou Pix</p>
                                        </div>
                                        <div class="botaocomprarprata">
                                            <label>VER DETALHES</label>
                                        </div>

                                    </div>
                                </div>
                            </a>
                        )
                    }))
                }
                else if (window.location.href.includes("-brincos")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Brincos').map((produto) => {
                        return (
                            <a href={"produto/" + produto.URL} id={produto.$id} key={produto.$id}>
                                <div class='item-prata' id={produto.$id}>
                                    <img src={produto != "" && produto.PHOTOURL && produto.PHOTOURL.length > 0 ? produto.PHOTOURL[0] : ""} alt="" />
                                    <div class="text-prata">
                                        {produto.PERSONALIZAVEL == true ? <p class="personalizado-loja">PERSONALIZADO</p> :
                                            <>
                                                {produto.AVALIABLE == true ?
                                                    <p class='novidade-loja'>Disponível</p>
                                                    :
                                                    <p class="esgotado-loja">ESGOTADO</p>}
                                            </>}
                                        <h1 class="nome-prata">{produto.NAME_PRODUCT}</h1>
                                        <div class='estrelas'>
                                            <img src="./static/media/product-images/Nenhuma estrela.png" alt="" />
                                        </div>
                                        <div class="promocao">
                                            {produto.DESCONTO > 0 ?
                                                <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {(produto.PRICE).toFixed(2)}</s> R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                                :
                                                <p class="preço-loja">R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                            }

                                            <p class="opcoesdepaga">Pague à vista ou Pix</p>
                                        </div>
                                        <div class="botaocomprarprata">
                                            <label>VER DETALHES</label>
                                        </div>

                                    </div>
                                </div>
                            </a>
                        )
                    }))
                }
                else if (window.location.href.includes("-aneis")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Aneis').map((produto) => {
                        return (
                            <a href={"produto/" + produto.URL} id={produto.$id} key={produto.$id}>
                                <div class='item-prata' id={produto.$id}>
                                    <img src={produto != "" && produto.PHOTOURL && produto.PHOTOURL.length > 0 ? produto.PHOTOURL[0] : ""} alt="" />
                                    <div class="text-prata">
                                        {produto.PERSONALIZAVEL == true ? <p class="personalizado-loja">PERSONALIZADO</p> :
                                            <>
                                                {produto.AVALIABLE == true ?
                                                    <p class='novidade-loja'>Disponível</p>
                                                    :
                                                    <p class="esgotado-loja">ESGOTADO</p>}
                                            </>}
                                        <h1 class="nome-prata">{produto.NAME_PRODUCT}</h1>
                                        <div class='estrelas'>
                                            <img src="./static/media/product-images/Nenhuma estrela.png" alt="" />
                                        </div>
                                        <div class="promocao">
                                            {produto.DESCONTO > 0 ?
                                                <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {(produto.PRICE).toFixed(2)}</s> R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                                :
                                                <p class="preço-loja">R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                            }

                                            <p class="opcoesdepaga">Pague à vista ou Pix</p>
                                        </div>
                                        <div class="botaocomprarprata">
                                            <label>VER DETALHES</label>
                                        </div>

                                    </div>
                                </div>
                            </a>
                        )
                    }))
                }
                else if (window.location.href.includes("-braceletes")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Braceletes').map((produto) => {
                        return (
                            <a href={"produto/" + produto.URL} id={produto.$id} key={produto.$id}>
                                <div class='item-prata' id={produto.$id}>
                                    <img src={produto != "" && produto.PHOTOURL && produto.PHOTOURL.length > 0 ? produto.PHOTOURL[0] : ""} alt="" />
                                    <div class="text-prata">
                                        {produto.PERSONALIZAVEL == true ? <p class="personalizado-loja">PERSONALIZADO</p> :
                                            <>
                                                {produto.AVALIABLE == true ?
                                                    <p class='novidade-loja'>Disponível</p>
                                                    :
                                                    <p class="esgotado-loja">ESGOTADO</p>}
                                            </>}
                                        <h1 class="nome-prata">{produto.NAME_PRODUCT}</h1>
                                        <div class='estrelas'>
                                            <img src="./static/media/product-images/Nenhuma estrela.png" alt="" />
                                        </div>
                                        <div class="promocao">
                                            {produto.DESCONTO > 0 ?
                                                <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {(produto.PRICE).toFixed(2)}</s> R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                                :
                                                <p class="preço-loja">R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                            }

                                            <p class="opcoesdepaga">Pague à vista ou Pix</p>
                                        </div>
                                        <div class="botaocomprarprata">
                                            <label>VER DETALHES</label>
                                        </div>

                                    </div>
                                </div>
                            </a>
                        )
                    }))
                }
                else if (window.location.href.includes("-tornozeleiras")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Tornozeleira').map((produto) => {
                        return (
                            <a href={"produto/" + produto.URL} id={produto.$id} key={produto.$id}>
                                <div class='item-prata' id={produto.$id}>
                                    <img src={produto != "" && produto.PHOTOURL && produto.PHOTOURL.length > 0 ? produto.PHOTOURL[0] : ""} alt="" />
                                    <div class="text-prata">
                                        {produto.PERSONALIZAVEL == true ? <p class="personalizado-loja">PERSONALIZADO</p> :
                                            <>
                                                {produto.AVALIABLE == true ?
                                                    <p class='novidade-loja'>Disponível</p>
                                                    :
                                                    <p class="esgotado-loja">ESGOTADO</p>}
                                            </>}
                                        <h1 class="nome-prata">{produto.NAME_PRODUCT}</h1>
                                        <div class='estrelas'>
                                            <img src="./static/media/product-images/Nenhuma estrela.png" alt="" />
                                        </div>
                                        <div class="promocao">
                                            {produto.DESCONTO > 0 ?
                                                <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {(produto.PRICE).toFixed(2)}</s> R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                                :
                                                <p class="preço-loja">R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                            }

                                            <p class="opcoesdepaga">Pague à vista ou Pix</p>
                                        </div>
                                        <div class="botaocomprarprata">
                                            <label>VER DETALHES</label>
                                        </div>

                                    </div>
                                </div>
                            </a>
                        )
                    }))
                }
                else if (window.location.href.includes("-piercing")) {
                    SETPRODUCTS(res.documents.filter(r => r.STYLE == 'Piercing').map((produto) => {
                        return (
                            <a href={"produto/" + produto.URL} id={produto.$id} key={produto.$id}>
                                <div class='item-prata' id={produto.$id}>
                                    <img src={produto != "" && produto.PHOTOURL && produto.PHOTOURL.length > 0 ? produto.PHOTOURL[0] : ""} alt="" />
                                    <div class="text-prata">
                                        {produto.PERSONALIZAVEL == true ? <p class="personalizado-loja">PERSONALIZADO</p> :
                                            <>
                                                {produto.AVALIABLE == true ?
                                                    <p class='novidade-loja'>Disponível</p>
                                                    :
                                                    <p class="esgotado-loja">ESGOTADO</p>}
                                            </>}
                                        <h1 class="nome-prata">{produto.NAME_PRODUCT}</h1>
                                        <div class='estrelas'>
                                            <img src="./static/media/product-images/Nenhuma estrela.png" alt="" />
                                        </div>
                                        <div class="promocao">
                                            {produto.DESCONTO > 0 ?
                                                <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {(produto.PRICE).toFixed(2)}</s> R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                                :
                                                <p class="preço-loja">R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                            }

                                            <p class="opcoesdepaga">Pague à vista ou Pix</p>
                                        </div>
                                        <div class="botaocomprarprata">
                                            <label>VER DETALHES</label>
                                        </div>

                                    </div>
                                </div>
                            </a>
                        )
                    }))
                }
                else {
                    SETPRODUCTS(res.documents.map((produto) => {
                        return (
                            <a href={"produto/" + produto.URL} id={produto.$id} key={produto.$id}>
                                <div class='item-prata' id={produto.$id}>
                                    <img src={produto != "" && produto.PHOTOURL && produto.PHOTOURL.length > 0 ? produto.PHOTOURL[0] : ""} alt="" />
                                    <div class="text-prata">
                                        {produto.PERSONALIZAVEL == true ? <p class="personalizado-loja">PERSONALIZADO</p> :
                                            <>
                                                {produto.AVALIABLE == true ?
                                                    <p class='novidade-loja'>Disponível</p>
                                                    :
                                                    <p class="esgotado-loja">ESGOTADO</p>}
                                            </>}
                                        <h1 class="nome-prata">{produto.NAME_PRODUCT}</h1>
                                        <div class='estrelas'>
                                            <img src="./static/media/product-images/Nenhuma estrela.png" alt="" />
                                        </div>
                                        <div class="promocao">
                                            {produto.DESCONTO > 0 ?
                                                <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {(produto.PRICE).toFixed(2)}</s> R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                                :
                                                <p class="preço-loja">R$ {(produto.PRICE - produto.DESCONTO).toFixed(2)}</p>
                                            }

                                            <p class="opcoesdepaga">Pague à vista ou Pix</p>
                                        </div>
                                        <div class="botaocomprarprata">
                                            <label>VER DETALHES</label>
                                        </div>

                                    </div>
                                </div>
                            </a>
                        )
                    }))
                }

            })



    }

    useEffect(() => {
        getProducts()
        if (window.location.href.includes('/novidades') || window.location.href.includes('/promocoes')) {
            return getNovidades()
        }
    }, [])

    return (
        <>
            <div className='estoque-prata'>
                {PRODUCTS != '' ?
                    PRODUCTS
                    :
                    <Ring
                        size={40}
                        lineWeight={5}
                        speed={2}
                        color="#EF59A0"
                    />
                }
            </div>
        </>
    )
}