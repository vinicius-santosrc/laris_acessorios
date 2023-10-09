import { useEffect, useState } from "react";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import db, { getUserData } from "../lib/appwrite";
import { Query } from "appwrite";
import { useParams } from "react-router-dom";
import Loading from "../components/AdminPage/Loading";
import Swal from "sweetalert2";

export default function AdminProductEditPage() {
    const { product } = useParams();
    const [ProdutoAtual, setProdutoAtual] = useState(null)
    const [user, setUser] = useState(null)

    const DBUID = '651ca99af19b7afad3f1';
    const PRODUTOSUID = '651ca9adf3de7aad17d9';

    const [nomeProduto, setNomeProduto] = useState('');
    const [typeProduto, setTypeProduto] = useState(null)
    const [priceProduto, setpriceProduto] = useState(null)
    const [descontoProduto, setdescontoProduto] = useState(null)
    const [avaliableProduto, setavaliableProduto] = useState(null)
    const [qtdDisProduto, setQntDisponivelProduto] = useState(null)
    const [URLPRODUTO, setURLProduto] = useState(null)
    
    useEffect(() => {
        getUserData()
            .then((account) => {
                setUser(account)
                if (!account) {
                    window.location.href = window.location.origin + "/admin/login"
                }
            })

    })

    useEffect(() => {
        db.getDocument(DBUID, PRODUTOSUID, product)
            .then((pdt) => {
                setProdutoAtual(pdt);
                setNomeProduto(pdt.NAME_PRODUCT);
                setTypeProduto(pdt.TYPE)
                setpriceProduto(pdt.PRICE)
                setdescontoProduto(pdt.DESCONTO)
                setavaliableProduto(pdt.AVALIABLE === true ? 'true' : 'false')
                setQntDisponivelProduto(pdt.QUANT_DISPONIVEL)
                setURLProduto(pdt.URL)
            });
    }, [product]);

    const handleNomeProdutoChange = (event) => {
        // Atualize o estado local com o novo valor do input
        setNomeProduto(event.target.value);
    };

    const handleChangeType = (event) => {
        // Atualize o estado local com o novo valor do select
        setTypeProduto(event.target.value);
    }

    const handleChangeAvaliable = (event) => {
        // Atualize o estado local com o novo valor do select
        setavaliableProduto(event.target.value);
    }

    const handlePriceProdutoChange = (event) => {
        setpriceProduto(event.target.value);
    }

    const handleDescontoProdutoChange = (event) => {
        setdescontoProduto(event.target.value);
    }

    const handleQuantDisponivelChange = (event) => {
        setQntDisponivelProduto(event.target.value);
    }

    const handleURLChange = (event) => {
        setURLProduto(event.target.value)
    }

    

    const SalvarAlteracoes = async () => {
        Swal.fire({
            title: 'Você deseja continuar?',
            text: "Ao salvar, o produto será automáticamente alterado no site oficial.",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Salvar',
            denyButtonText: `Não`,
            cancelButtonText: `Cancelar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                db.updateDocument(
                    DBUID,
                    PRODUTOSUID,
                    ProdutoAtual.$id,
                    {
                        NAME_PRODUCT: nomeProduto,
                        PRICE: priceProduto,
                        DESCONTO: descontoProduto,
                        AVALIABLE: avaliableProduto == 'true',
                        TYPE: typeProduto,
                        URL: URLPRODUTO
                    }
                )
                    .then((res) => {
                        Swal.fire(ProdutoAtual.NAME_PRODUCT + " foi salvo com sucesso.", '', 'success')
                    })
                    .catch((error) => {
                        Swal.fire('Error ao salvar: ' + error, '', 'info')
                    })
            } else if (result.isDenied) {

            }
        })

    }

    const ExcluirProduto = () => {
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Ao excluir, não será possível restaurar o produto.",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Salvar',
            denyButtonText: `Não`,
            cancelButtonText: `Cancelar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                db.deleteDocument(
                    DBUID,
                    PRODUTOSUID,
                    ProdutoAtual.$id,
                )
                    .then((res) => {
                        Swal.fire(ProdutoAtual.NAME_PRODUCT + " foi excluido do banco de dados.", '', 'success')
                    })
                    .catch((error) => {
                        Swal.fire('Error ao salvar: ' + error, '', 'info')
                    })
            } else if (result.isDenied) {

            }
        })
    }

    const isAvaliable = avaliableProduto == 'true' ? 'true' : 'false';
    const TypeProduct = typeProduto;


    

    if (!user) {
        return <Loading />
        
    }

    return (
        <div className="AdminPage-DashBoard">
            <NavigationLeft />
            <div className="Admin-ContentDashBoard">
                {ProdutoAtual ? (
                    <>
                        <div className="titleeditproduto"><h1>Editar Produto</h1></div>
                        <div className="product-atual">

                            {ProdutoAtual.PHOTOURL ?
                                <div className="leftside-product-atual">
                                    {ProdutoAtual.PHOTOURL.length > 0 ?
                                        <img src={ProdutoAtual.PHOTOURL.includes("/static/media") ? window.location.origin + ProdutoAtual.PHOTOURL[0] : ProdutoAtual.PHOTOURL[0]} />
                                        :
                                        <img src={ProdutoAtual.PHOTOURL.includes("/static/media") ? window.location.origin + ProdutoAtual.PHOTOURL : ProdutoAtual.PHOTOURL} />
                                    }
                                    <div className="images-product">
                                        {ProdutoAtual.PHOTOURL.length > 0 ?
                                            <>
                                                {ProdutoAtual.PHOTOURL.map((res) => {
                                                    return (
                                                        <img src={res.includes("/static/media") ? window.location.origin + res : res} />
                                                    )
                                                })}
                                            </>
                                            :
                                            <img src={ProdutoAtual.PHOTOURL.includes("/static/media") ? window.location.origin + ProdutoAtual.PHOTOURL : ProdutoAtual.PHOTOURL} />
                                        }
                                    </div>
                                </div>
                                :
                                <></>
                            }
                            <div className="rightside-product-atual">
                                <img id="imagelogo" src={window.location.origin + "/static/media/Logo.webp"} />
                                <h3>{nomeProduto}</h3>
                                <p>Referência ou ID: {ProdutoAtual.$id}</p>
                                <div className="optionsedit">
                                    <div className="typeproduct">
                                        <div className="inputbox-editp">
                                            <div><h3>TIPO: </h3></div>
                                            {typeProduto == "CETIM"
                                                ?
                                                <select
                                                    onChange={handleChangeType}
                                                >
                                                    <option value={typeProduto} selected>{typeProduto}</option>
                                                    <option value='MICANGAS'>MIÇANGAS</option>
                                                    <option value='PRATA'>PRATA</option>
                                                </select>
                                                :
                                                <>
                                                    {typeProduto == "MICANGAS" ?
                                                        <select
                                                            onChange={handleChangeType}
                                                        >
                                                            <option value={typeProduto} selected>{typeProduto}</option>
                                                            <option value='CETIM'>CETIM</option>
                                                            <option value='PRATA'>PRATA</option>
                                                        </select>
                                                        :
                                                        <>
                                                            {typeProduto == "PRATA"
                                                                ?
                                                                <select
                                                                    onChange={handleChangeType}
                                                                >
                                                                    <option value={typeProduto} selected>{typeProduto}</option>
                                                                    <option value='CETIM'>CETIM</option>
                                                                    <option value='MICANGAS'>MIÇANGAS</option>
                                                                </select>
                                                                :
                                                                <></>
                                                            }
                                                        </>
                                                    }
                                                </>
                                            }
                                        </div>
                                    </div>
                                    <div className="inputbox-editp">
                                        <div><h3>NOME: </h3></div>
                                        <input
                                            value={nomeProduto}
                                            onChange={handleNomeProdutoChange}
                                        />
                                    </div>

                                    <div className="inputbox-editp">
                                        <div><h3>PREÇO: </h3></div>
                                        <span>R$ </span> <input
                                            value={priceProduto}
                                            onChange={handlePriceProdutoChange}
                                        />
                                    </div>
                                    <div className="inputbox-editp">
                                        <div><h3>DESCONTO: </h3></div>
                                        <span>R$ </span> <input
                                            value={descontoProduto}
                                            onChange={handleDescontoProdutoChange}
                                        />
                                    </div>

                                    <div className="inputbox-editp">
                                        <div><h3>DISPONIBILIDADE: </h3></div>
                                        <select onChange={handleChangeAvaliable} value={avaliableProduto} name="" id="">
                                            <option value={true}>Disponível</option>
                                            <option value={false}>Indisponivel</option>
                                        </select>
                                    </div>
                                    <div className="inputbox-editp">
                                        <div><h3>QUANTIDADE: </h3></div>
                                        <span></span> <input
                                            value={qtdDisProduto}
                                            onChange={handleQuantDisponivelChange}
                                        />
                                    </div>
                                    <div className="inputbox-editp">
                                        <div><h3>URL: </h3></div>
                                        <span>/produto/</span>
                                        <input
                                            value={URLPRODUTO}
                                            onChange={handleURLChange}
                                        />
                                    </div>
                                </div>
                                <div className="btns-bottom-save">
                                    <button onClick={SalvarAlteracoes}>SALVAR ALTERAÇÕES</button>
                                    <button onClick={ExcluirProduto}>EXCLUIR ESSE PRODUTO</button>
                                </div>
                            </div>
                        </div>
                        <div className="titleeditproduto">
                            <h1>Preview do Produto</h1>
                            <div className="capturestela">
                                <div className='estoque-prata-index-pc'>
                                    <a href="#">
                                        <div class='item-prata' id={ProdutoAtual.$id}>
                                            <img src={ProdutoAtual != "" && ProdutoAtual.PHOTOURL && ProdutoAtual.PHOTOURL.length > 0 ? ProdutoAtual.PHOTOURL[0] : ""} alt="" />
                                            <div class="text-prata">
                                                {ProdutoAtual.PERSONALIZAVEL == true ? <p class="personalizado-loja">PERSONALIZADO</p> :
                                                    <>
                                                        {isAvaliable === 'true' ?
                                                            <p class='novidade-loja'>Disponível</p>
                                                            :
                                                            <p class="esgotado-loja">ESGOTADO</p>
                                                        }
                                                    </>}
                                                <h1 class="nome-prata">{nomeProduto}</h1>
                                                <div class='estrelas'>
                                                    <img src={window.location.origin + "/static/media/product-images/Nenhuma estrela.png"} alt="" />
                                                </div>
                                                <div class="promocao">
                                                    {descontoProduto > 0 ?
                                                        <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {priceProduto}</s> R$ {priceProduto - descontoProduto}</p>
                                                        :
                                                        <p class="preço-loja">R$ {priceProduto - descontoProduto}</p>
                                                    }
                                                    <p class="opcoesdepaga">Pague à vista ou Pix</p>
                                                </div>
                                                <div class="botaocomprarprata">
                                                    <span>VER DETALHES</span>
                                                </div>

                                            </div>
                                        </div>
                                    </a>

                                </div>
                            </div>
                        </div>

                    </>
                )
                    :
                    <Loading />
                }
            </div>
        </div>
    )
}