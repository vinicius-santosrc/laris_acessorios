import { useEffect, useState } from "react";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import { Client, Query, Storage } from "appwrite";
import Swal from "sweetalert2";

export default function AdminImages() {
    const [imagemipt, ImagemAtual] = useState(null);

    const [imagemmicangas, ImagemAtualMicangas] = useState(null);

    const [imagemcetim, ImagemAtualCetim] = useState(null);


    const client = new Client();
    const storage = new Storage(client);

    client
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject("651c17501139519bc5a2")



    async function uploadImage(i) {

        if (!imagemipt) {
            return alert('NÃO HÁ IMAGEM')
        }

        let timerInterval
        Swal.fire({
            title: 'Carregando...',
            html: 'Aguarde enquanto carregamos sua foto. Tempo restante: <b></b> millisegundos.',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {

            }
        })

        await storage.deleteFile(
            "653eccb57f4ab270eb1a",
            "PRATAS-INDEX-CAT-CARD"
        )
            .then(async () => {
                await storage.createFile(
                    "653eccb57f4ab270eb1a",
                    'PRATAS-INDEX-CAT-CARD',
                    imagemipt
                )
                    .then(() => {
                        return Swal.fire('As imagens foram alteradas!', 'O tempo para atualizar no website oficial é de alguns minutos.', 'success')
                    })
                    .catch((error) => {
                        return Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Algo deu errado. Contate um administrador!',
                        })
                    })
            })
            .catch((error) => {
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo deu errado. Contate um administrador!',
                })
            })

    }

    async function uploadImageMicangas() {

        if (!imagemmicangas) {
            return alert('NÃO HÁ IMAGEM')
        }

        let timerInterval
        Swal.fire({
            title: 'Carregando...',
            html: 'Aguarde enquanto carregamos sua foto. Tempo restante: <b></b> millisegundos.',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {

            }
        })

        await storage.deleteFile(
            "653eccb57f4ab270eb1a",
            "MICANGAS-INDEX-CAT-CARD"
        )
            .then(async () => {
                await storage.createFile(
                    "653eccb57f4ab270eb1a",
                    'MICANGAS-INDEX-CAT-CARD',
                    imagemmicangas
                )
                    .then(() => {
                        return Swal.fire('As imagens foram alteradas!', 'O tempo para atualizar no website oficial é de alguns minutos.', 'success')
                    })
                    .catch((error) => {
                        return Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Algo deu errado. Contate um administrador!',
                        })
                    })
            })
            .catch((error) => {
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo deu errado. Contate um administrador!',
                })
            })

    }

    async function uploadImageCetim() {

        if (!imagemcetim) {
            return alert('NÃO HÁ IMAGEM')
        }

        let timerInterval
        Swal.fire({
            title: 'Carregando...',
            html: 'Aguarde enquanto carregamos sua foto. Tempo restante: <b></b> millisegundos.',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {

            }
        })
        await storage.deleteFile(
            "653eccb57f4ab270eb1a",
            "CETIM-INDEX-CAT-CARD"
        )
            .then(async () => {
                await storage.createFile(
                    "653eccb57f4ab270eb1a",
                    'CETIM-INDEX-CAT-CARD',
                    imagemcetim
                )
                    .then(() => {
                        return Swal.fire('As imagens foram alteradas!', 'O tempo para atualizar no website oficial é de alguns minutos.', 'success')
                    })
                    .catch((error) => {
                        return Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Algo deu errado. Contate um administrador!',
                        })
                    })
            })
            .catch((error) => {
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo deu errado. Contate um administrador!',
                })
            })
        

    }

    return (
        <div className="AdminPage-DashBoard">
            <NavigationLeft />
            <div className="AdminImagensPage">
                <section className="SectionImages">
                    <div className="SectionImageHeader">
                        <h1>Imagens da Página Inicial</h1>
                        <p>Configure a página inicial do website oficial.</p>
                    </div>
                    <div className="contentSectionImage">
                        <h2>Categorias Cards</h2>
                       
                        <div className="index-select-type-admin">
                            <div className="">
                                <a>
                                    <div className="card-categorias">
                                        <img src="https://cloud.appwrite.io/v1/storage/buckets/653eccb57f4ab270eb1a/files/PRATAS-INDEX-CAT-CARD/view?project=651c17501139519bc5a2&mode=admin" alt="" />
                                        <h2>PRATAS 925</h2>
                                    </div>
                                </a>
                                <input id="inputfile" accept="image/*" type="file" onChange={(e) => { ImagemAtual(e.target.files[0]) }}></input>
                                <label for="inputfile">ENVIAR FOTO</label>
                                <br />
                                <button onClick={uploadImage}>SALVAR</button>
                            </div>
                            <div>
                                <a>
                                    <div className="card-categorias">
                                        <img src="https://cloud.appwrite.io/v1/storage/buckets/653eccb57f4ab270eb1a/files/MICANGAS-INDEX-CAT-CARD/view?project=651c17501139519bc5a2&mode=admin" alt="" />
                                        <h2>MIÇANGAS</h2>
                                    </div>
                                </a>
                                <input id="inputfile2" accept="image/*" type="file" onChange={(e) => { ImagemAtualMicangas(e.target.files[0]) }}></input>
                                <label for="inputfile2">ENVIAR FOTO</label>
                                <br />
                                <button onClick={uploadImageMicangas}>SALVAR</button>
                            </div>
                            <div>
                                <a>
                                    <div className="card-categorias">
                                        <img src="https://cloud.appwrite.io/v1/storage/buckets/653eccb57f4ab270eb1a/files/CETIM-INDEX-CAT-CARD/view?project=651c17501139519bc5a2&mode=admin" alt="" />
                                        <h2>CETIM</h2>
                                    </div>
                                </a>
                                <input id="inputfile3" accept="image/*" type="file" onChange={(e) => { ImagemAtualCetim(e.target.files[0]) }}></input>
                                <label for="inputfile3">ENVIAR FOTO</label>
                                <br />
                                <button onClick={uploadImageCetim}>SALVAR</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}