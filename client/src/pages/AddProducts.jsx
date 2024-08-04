import React, { useEffect, useState } from "react";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import { ID } from "appwrite";
import { Client, Storage } from "appwrite";
import Swal from "sweetalert2";
import db, { getUserData } from "../lib/appwrite";
import Loading from "../components/AdminPage/Loading";
import { auth, CheckIfUserIsLogged } from "../lib/firebase";
import { GetUserAtual } from "../lib/database";

const client = new Client();
const storage = new Storage(client);

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("651c17501139519bc5a2")


export default function AddProducts() {

    const [user, setUser] = useState(null)
    const [status, userStatus] = useState(null)
    const [userDB, setUserDBAccount] = useState([])

    const endpoint = process.env.REACT_APP_API_ENDPOINT;
    const secretKey = process.env.REACT_APP_API_SECRET_KEY;




    //CONST DO PASSO ATUAL (COMEÇA NO 1)

    const [step, setStep] = useState(1);


    //CONST DO PRODUTO

    const [file, setFile] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);

    const [nameProduct, setnameProduct] = useState(null);
    const [priceProduct, setpriceProduct] = useState(null);
    const [descontoProduct, setdescontoProduct] = useState(null);
    const [avaliable, setAvaliable] = useState(null);
    const [Sizes, setSizes] = useState('');
    const [QTDDISP, setQTDDISP] = useState(null);
    const [TYPE, setTYPE] = useState('PRATA');
    const [URLPRODUCT, setURL] = useState(null);
    const [FORNECEDOR, setFornecedor] = useState(null);
    const [Style, setStyle] = useState('Colar');
    const [PERSONALIZAVEL, setPERSONALIZAVEL] = useState(null);
    const [EXTENSOR, setExtensor] = useState(false)

    const [arraysizes, setArraySizes] = useState([]);

    const [photoURL, setPHOTOURL] = useState([])
    const [imageUrls, setImageUrls] = useState([]);

    const [JSONPHOTOS, setJSONPHOTOS] = useState([])
    const [filepreview, setFilePreview] = useState([])
    const [filepreview2, setFilePreview2] = useState([])
    const [filepreview3, setFilePreview3] = useState([])

    const [JSONPdtNovo, setJSONProductNovo] = useState([])



    //FAZENDO RECONHECIMENTO DA IMAGEM

    const handleImagemSelecionada = (e) => {
        const imagem = e.target.files[0]; // Pega o primeiro arquivo selecionado

        if (imagem instanceof Blob) {
            // Se uma imagem foi selecionada, você pode fazer algo com ela aqui
            setFile(imagem);
            setFilePreview(URL.createObjectURL(imagem));
        }
    };

    const handleImagemSelecionada2 = (e) => {
        const imagem = e.target.files[0]; // Pega o primeiro arquivo selecionado

        if (imagem instanceof Blob) {
            // Se uma imagem foi selecionada, você pode fazer algo com ela aqui
            setFile2(imagem);
            setFilePreview2(URL.createObjectURL(imagem));
        }
    };

    const handleImagemSelecionada3 = (e) => {
        const imagem = e.target.files[0]; // Pega o primeiro arquivo selecionado

        if (imagem instanceof Blob) {
            // Se uma imagem foi selecionada, você pode fazer algo com ela aqui
            setFile3(imagem);
            setFilePreview3(URL.createObjectURL(imagem));
        }
    };


    const addtoSizeContent = () => {
        if (Sizes.trim() !== "") {
            setArraySizes([...arraysizes, Sizes])
            setSizes("");
        }
    }


    useEffect(() => {
        if (file && file2 && file3) {
            setPHOTOURL([
                file,
                file2,
                file3
            ])
        }
        else if (file && file2 && !file3) {
            setPHOTOURL([
                file,
                file2,
            ])
        }

        else if (file && !file2 && !file3) {
            setPHOTOURL([
                file,
            ])
        }
    })

    function setJSONNew() {
        setJSONProductNovo(
            {
                name_product: nameProduct,
                price: priceProduct,
                photoURL: JSON.stringify(JSONPHOTOS),
                desconto: descontoProduct,
                disponibilidade: avaliable === 'true' ? true : false,
                tamanhos: JSON.stringify(arraysizes),
                quantidade_disponivel: QTDDISP,
                categoria: TYPE,
                url: URLPRODUCT,
                fornecedor: FORNECEDOR,
                tipo: Style,
                personalizavel: PERSONALIZAVEL === 'true' ? true : false,
                extensor: EXTENSOR === 'true' ? true : false,

            }
        )
    }

    const uploadImages = async () => {
        let jsonPHOTOS = [];
        try {
            for (const image of photoURL) {
                const response = await storage.createFile(
                    '651df9c4741bb296da03',
                    ID.unique(),
                    image
                );
                const imageURL = `https://cloud.appwrite.io/v1/storage/buckets/651df9c4741bb296da03/files/${response.$id}/view?project=651c17501139519bc5a2`;
                jsonPHOTOS.push(imageURL);

            }
            criarProduto(jsonPHOTOS);
            setJSONNew();
        } catch (error) {
            // Handle error appropriately
            console.error(error);
        }
    };


    useEffect(() => {

        setJSONNew()
    })

    //FAZENDO VERIFICACAO DO LOGIN



    const createNewProduct = () => {
        Swal.fire({
            title: `Deseja continuar?`,
            text: `Você está prestes a ${nameProduct}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Criar Produto',
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await uploadImages();
                /*try {
                    // Faça algo com imageUrls, se necessário
                    fetch(`${endpoint}/api/v1/${secretKey}/products/add`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(JSONPdtNovo),
                    })

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `O produto ${nameProduct} foi criado com sucesso.`,
                        showConfirmButton: false,
                        timer: 2500
                    }).then(() => {
                        window.location.reload()
                    })
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `Erro ao criar o produto: ${error}`,
                        footer: '<a href="errors">Por que deste erro?</a>'
                    });
                }*/
            }
        })

    }
    async function criarProduto(IMAGES) {
        try {
            // Faça algo com imageUrls, se necessário
            fetch(`${endpoint}/api/v1/${secretKey}/products/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name_product: nameProduct,
                    price: priceProduct,
                    photoURL: JSON.stringify(IMAGES),
                    desconto: descontoProduct,
                    disponibilidade: avaliable === 'true' ? true : false,
                    tamanhos: JSON.stringify(arraysizes),
                    quantidade_disponivel: QTDDISP,
                    categoria: TYPE,
                    url: URLPRODUCT,
                    fornecedor: FORNECEDOR,
                    tipo: Style,
                    personalizavel: PERSONALIZAVEL === 'true' ? true : false,
                    extensor: EXTENSOR === 'true' ? true : false,

                }),
            })

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `O produto ${nameProduct} foi criado com sucesso.`,
                showConfirmButton: false,
                timer: 2500
            }).then(() => {
                window.location.reload()
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Erro ao criar o produto: ${error}`,
                footer: '<a href="errors">Por que deste erro?</a>'
            });
        }
    }


    const [userAtual, setuserAtual] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const res = await GetUserAtual(user.uid);
                    setuserAtual(res);
                } catch (error) {
                    console.warn("Erro ao pegar usuário: ", error);
                }
            } else {
                setuserAtual(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (CheckIfUserIsLogged()) {
                return
            } else {
                return window.location.href = window.location.origin + "/admin/login";
            }
        });

        return () => unsubscribe();
    }, []);

    if (!userAtual) {
        return <Loading />

    }

    return (
        <div className="AdminPage-DashBoard">
            <NavigationLeft />
            <div className="CreateProduct">
                {step == 1
                    ?
                    <section className="sendPhotosDiv">
                        <img src={window.location.origin + '/static/media/admin-images/undraw_folder_files_re_2cbm.svg'} />
                        <h1>PRIMEIRO, ENVIE AS IMAGENS DO PRODUTO</h1>
                        <p>Envie até 3 imagens, sendo no mínimo uma, do produto.</p>
                        <div className="ipts-wrapper">
                            <div className="inputwrap">
                                <label for="inputfile1">{file ? <img src={filepreview} /> : <>
                                    <i className="fa-regular fa-file"></i> Selecionar Imagem 1
                                </>}</label>
                                <input
                                    type="file"
                                    id="inputfile1"
                                    accept="image/*" // Isso permite apenas que arquivos de imagem sejam selecionados
                                    onChange={handleImagemSelecionada}
                                />
                            </div>
                            <div className="inputwrap">
                                <label for="inputfile2">{file2 ? <img src={filepreview2} /> : <>
                                    <i className="fa-regular fa-file"></i> Selecionar Imagem 2
                                </>}</label>
                                <input
                                    type="file"
                                    id="inputfile2"
                                    accept="image/*" // Isso permite apenas que arquivos de imagem sejam selecionados
                                    onChange={handleImagemSelecionada2}
                                />
                            </div>
                            <div className="inputwrap">
                                <label for="inputfile3">{file3 ? <img src={filepreview3} /> : <>
                                    <i className="fa-regular fa-file"></i> Selecionar Imagem 3
                                </>}</label>
                                <input
                                    type="file"
                                    id="inputfile3"
                                    accept="image/*" // Isso permite apenas que arquivos de imagem sejam selecionados
                                    onChange={handleImagemSelecionada3}
                                />
                            </div>
                        </div>

                        {
                            file || file2 || file3 ?
                                <button className="buttonbottomsidecontinue" onClick={() => setStep((prevState) => prevState + 1)}>Continuar</button> : null
                        }

                    </section>
                    :
                    ''
                }

                {step == 2
                    ?

                    <div className="ContentPreviewPdtNew">
                        <section>
                            <h1>Configurar novo produto</h1>
                            <p>Passo 2</p>
                        </section>
                        <div className="ContentPreviewNewProduct">
                            {
                                file || file2 || file3 ?
                                    <>
                                        <div className="leftside-product">
                                            <img
                                                src={filepreview}
                                                alt="Produto Imagem"
                                            />
                                            <div className="preview-images-bottom">
                                                {file2 ?
                                                    <img
                                                        src={filepreview2}
                                                        alt="Produto Imagem 2"

                                                    />
                                                    :
                                                    <>
                                                    </>
                                                }
                                                {file3 ?
                                                    <img
                                                        src={filepreview3}
                                                        alt="Produto Imagem 3"

                                                    />
                                                    :
                                                    null
                                                }
                                            </div>
                                        </div>
                                        <div className="rightside-product">

                                            <div className="iptnewpdt">
                                                <select value={TYPE} onChange={(e) => {
                                                    setTYPE(e.target.value)
                                                }}>
                                                    <option value={'PRATA'} selected >PRATA</option>
                                                </select>
                                            </div>
                                            <div className="iptnewpdt">
                                                {TYPE == "PRATA"
                                                    ?
                                                    <select value={Style} onChange={(e) => {
                                                        setStyle(e.target.value)
                                                    }}>

                                                        <option value={'Colar'}>Colares</option>
                                                        <option value={'Pulseiras'}>Pulseiras</option>
                                                        <option value={'Brincos'}>Brincos</option>
                                                        <option value={'Aneis'}>Anéis</option>
                                                        <option value={'Braceletes'}>Braceletes</option>
                                                        <option value={'Tornozeleira'}>Tornozeleira</option>
                                                        <option value={'Piercing'}>Piercing</option>
                                                    </select>
                                                    :
                                                    ""
                                                }

                                            </div>
                                            <div className="iptnewpdt">
                                                <p>Nome do produto:</p>
                                                <input
                                                    placeholder=""
                                                    value={nameProduct}
                                                    onChange={(e) => {
                                                        setnameProduct(e.target.value)
                                                    }}
                                                ></input>
                                            </div>
                                            <div className="iptnewpdt">
                                                <p>Preço:</p>
                                                <input
                                                    value={priceProduct}
                                                    onChange={(e) => {
                                                        setpriceProduct(e.target.value)
                                                    }}
                                                />
                                            </div>
                                            <div className="iptnewpdt">
                                                <p>Desconto:</p>
                                                <input
                                                    value={descontoProduct}
                                                    onChange={(e) => {
                                                        setdescontoProduct(e.target.value)
                                                    }}
                                                />
                                            </div>
                                            <div className="iptnewpdt">
                                                <p>Tamanhos:</p>
                                                <input id="size"
                                                    value={Sizes}
                                                    onChange={(e) => {
                                                        setSizes(e.target.value)
                                                    }}
                                                />
                                                {arraysizes.map((r, index) => (
                                                    <p key={index}>{r}</p> // Adicione uma chave (key) única para cada elemento do map
                                                ))}
                                                <button onClick={addtoSizeContent}>Adicionar</button>
                                            </div>
                                            <div className="iptnewpdt">
                                                <p>Quantidade Disponível:</p>
                                                <input
                                                    value={QTDDISP}
                                                    onChange={(e) => {
                                                        setQTDDISP(e.target.value)
                                                    }} />

                                            </div>
                                            <div className="iptnewpdt">
                                                <p>URL do Produto:</p>
                                                <p>Não é aceito caracteres especiais (/, é, ., '', []). Exemplo do modelo padrão: colar-brisa-do-mar</p>
                                                <input
                                                    value={URLPRODUCT}
                                                    onChange={(e) => {
                                                        setURL(e.target.value)
                                                    }} />

                                            </div>
                                            <div className="iptnewpdt">
                                                <p>Fornecedor:</p>
                                                <p>Caso não tenha, mantenha em branco.</p>
                                                <input
                                                    value={FORNECEDOR}
                                                    onChange={(e) => {
                                                        setFornecedor(e.target.value)
                                                    }} />

                                            </div>
                                            <div className="iptnewpdt">
                                                <p>Personalizavel:</p>
                                                <select
                                                    value={PERSONALIZAVEL}
                                                    onChange={(e) => {
                                                        setPERSONALIZAVEL(e.target.value)
                                                    }}>
                                                    <option value='true'>Sim</option>
                                                    <option value='false' selected>Não</option>
                                                </select>
                                            </div>
                                            {TYPE == "PRATA" ?
                                                <div className="iptnewpdt">
                                                    <p>Extensor:</p>
                                                    <select
                                                        value={EXTENSOR}
                                                        onChange={(e) => {
                                                            setExtensor(e.target.value)
                                                        }}>
                                                        <option value={true}>Sim</option>
                                                        <option value={false} selected>Não</option>
                                                    </select>
                                                </div>
                                                :
                                                null}
                                            <div className="iptnewpdt">
                                                <p>Disponibilidade:</p>
                                                <select
                                                    value={avaliable}
                                                    onChange={(e) => {
                                                        setAvaliable(e.target.value)
                                                    }}>
                                                    <option value={true} selected>Disponível</option>
                                                    <option value={false}>Indisponível</option>
                                                </select>
                                            </div>
                                            <div className="buttons">
                                                {nameProduct != null
                                                    ?
                                                    <button onClick={() => setStep((prevState) => prevState + 1)}>Continuar</button>
                                                    :
                                                    null
                                                }
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <></>
                            }
                        </div>
                    </div>
                    :
                    ''
                }
                {step == 3

                    ?
                    <div className="preview-item">
                        <div className="titleeditproduto">
                            <h1>Preview do Produto</h1>
                            <div className="capturestela">
                                <div className='estoque-prata-index-pc'>
                                    <a href="#">
                                        <div class='item-prata'>
                                            <img src={
                                                window.location.origin + filepreview != "" && filepreview && filepreview.length > 0 ? filepreview : filepreview
                                            } alt="" />
                                            <div class="text-prata">
                                                {PERSONALIZAVEL == true ? <p class="personalizado-loja">PERSONALIZADO</p> :
                                                    <>
                                                        {avaliable === 'true' ?
                                                            <p class='novidade-loja'>Disponível</p>
                                                            :
                                                            <p class="esgotado-loja">ESGOTADO</p>
                                                        }
                                                    </>}
                                                <h1 class="nome-prata">{nameProduct}</h1>
                                                <div class='estrelas'>
                                                    <img src={window.location.origin + "/static/media/product-images/Nenhuma estrela.png"} alt="" />
                                                </div>
                                                <div class="promocao">
                                                    {descontoProduct > 0 ?
                                                        <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {priceProduct}</s> R$ {(priceProduct - descontoProduct).toFixed(2)}</p>
                                                        :
                                                        <p class="preço-loja">R$ {(priceProduct - descontoProduct).toFixed(2)}</p>
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
                            <div className='estoque-prata-index'>
                                <a href="#">
                                    <div class='item-prata'>
                                        <img src={
                                            window.location.origin + filepreview != "" && filepreview && filepreview.length > 0 ? filepreview : filepreview
                                        } alt="" />
                                        <div class="text-prata">
                                            {PERSONALIZAVEL == true ? <p class="personalizado-loja">PERSONALIZADO</p> :
                                                <>
                                                    {avaliable === 'true' ?
                                                        <p class='novidade-loja'>Disponível</p>
                                                        :
                                                        <p class="esgotado-loja">ESGOTADO</p>
                                                    }
                                                </>}
                                            <h1 class="nome-prata">{nameProduct}</h1>
                                            <div class='estrelas'>
                                                <img src={window.location.origin + "/static/media/product-images/Nenhuma estrela.png"} alt="" />
                                            </div>
                                            <div class="promocao">
                                                {descontoProduct > 0 ?
                                                    <p class="preço-loja"><s style={{ color: 'darkgray' }}>R$ {priceProduct}</s> R$ {(priceProduct - descontoProduct)}</p>
                                                    :
                                                    <p class="preço-loja">R$ {(priceProduct - descontoProduct)}</p>
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
                        <div className="buttons">
                            <button onClick={() => setStep((prevState) => prevState - 1)}>Voltar</button>
                            <button onClick={createNewProduct}>Criar Produto</button>

                        </div>
                    </div>

                    :
                    null}
            </div>
        </div>
    )
}