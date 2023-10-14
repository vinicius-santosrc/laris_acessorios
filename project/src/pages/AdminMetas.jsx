import { useEffect, useState } from "react";
import NavigationLeft from "../components/AdminPage/NavigationLeft";
import db from "../lib/appwrite";
import { Ring } from '@uiball/loaders'
import { ID } from "appwrite";
import Swal from "sweetalert2";

export default function AdminMetas() {

    const [saldoAtual, setSaldoAtual] = useState(0);
    const [MetaPrincipal, setMetaPrincipal] = useState(0);
    const [SaldoTotal, setSaldo] = useState(0);
    const [MetasSecundarias, setMetasSecundarias] = useState(null);
    const [MetasFixadas, setMetasFixadas] = useState([]);
    const [addMeta, setaddMeta] = useState(false);
    const [newMeta, setNewMeta] = useState('Nova Meta');
    const [newMetaAnual, setNewMetaAnual] = useState(0);
    const [newMetaMensal, setNewMetaMensal] = useState(0);

    const DBUID = "651ca99af19b7afad3f1";
    const collectionMetas = "6526fb79b32651e0087a";
    const collectionSaldo = "6526ef810e37b1d693c1"

    useEffect(() => {
        let entradas = 0; // Inicialize as variáveis aqui
        let saidas = 0;

        db.getDocument(
            DBUID,
            collectionMetas,
            "6529bb6b64c8490376bd"
        )
            .then((res) => {
                setMetaPrincipal(res)
            })

        db
            .listDocuments(
                DBUID,
                collectionSaldo
            )
            .then((response) => {
                response.documents.map((r) => {
                    if (r.tipo === "Receita") {
                        entradas += Number(r.valor);
                    } else {
                        saidas += Number(r.valor);
                    }
                });
                const saldototal = entradas - saidas;
                setSaldo(saldototal);
            })
            .catch(console.error);


    }, [])

    useEffect(() => {
        db.listDocuments(
            DBUID,
            collectionMetas
        )
            .then((res) => {
                setMetasFixadas(res.documents.map((response) => {
                    if (response.meta_name == 'META_MENSAL' || response.fixed == false) {
                        return
                    }
                    else {
                        if (SaldoTotal >= response.anual && SaldoTotal >= response.mensal) {
                            return (
                                <div className="meta-card" id="greenbackground-card-metas">
                                    <a href={window.location.origin + '/admin/metas/' + response.$id}>
                                        <div className="top-card-meta">
                                            <h1> {response.meta_name}</h1>
                                        </div>
                                        <p>Parabéns! Você atingiu essa meta.</p>
                                        <p>Anual: <span>R${response.anual}</span></p>
                                        <p>Mensal: <span>R${response.mensal}</span></p>


                                    </a>

                                </div>
                            )
                        }
                        else {
                            return (
                                <div className="meta-card">
                                    <a href={window.location.origin + '/admin/metas/' + response.$id}>
                                        <div className="top-card-meta">
                                            <h1> {response.meta_name}</h1>
                                        </div>
                                        <p>Anual: <span>R${response.anual}</span></p>
                                        <p>Mensal: <span>R${response.mensal}</span></p>

                                    </a>

                                </div>
                            )
                        }
                    }
                }))
            })
    }, [SaldoTotal])

    useEffect(() => {
        db.listDocuments(
            DBUID,
            collectionMetas
        )
            .then((res) => {
                setMetasSecundarias(res.documents.map((response) => {
                    if (response.meta_name == 'META_MENSAL' || response.fixed == true) {
                        return
                    }
                    else {
                        if (SaldoTotal >= response.anual && SaldoTotal >= response.mensal) {
                            return (
                                <div className="meta-card" id="greenbackground-card-metas">
                                    <a href={window.location.origin + '/admin/metas/' + response.$id}>
                                        <div className="top-card-meta">
                                            <h1> {response.meta_name}</h1>
                                        </div>
                                        <p>Parabéns! Você atingiu essa meta.</p>
                                        <p>Anual: <span>R${response.anual}</span></p>
                                        <p>Mensal: <span>R${response.mensal}</span></p>


                                    </a>

                                </div>
                            )
                        }
                        else {
                            return (
                                <div className="meta-card">
                                    <a href={window.location.origin + '/admin/metas/' + response.$id}>
                                        <div className="top-card-meta">
                                            <h1> {response.meta_name}</h1>
                                        </div>
                                        <p>Anual: <span>R${response.anual}</span></p>
                                        <p>Mensal: <span>R${response.mensal}</span></p>

                                    </a>

                                </div>
                            )
                        }
                    }
                }))
            })
    }, [SaldoTotal])

    function handleCreateMeta(e) {
        e.preventDefault()
        db.createDocument(
            DBUID,
            collectionMetas,
            ID.unique(),
            {
                meta_name: newMeta,
                anual: newMetaAnual,
                mensal: newMetaMensal,
                fixed: false
            }
        )
            .then((r) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Você criou uma meta.',

                })
                    .then((r) => {
                        window.location.reload()
                    })
            })
            .catch((e) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Não foi possível criar uma meta. Contate um Desenvolvedor.',
                    footer: '<a href="../errors">Por que deste erro?</a>'
                })
            })
    }


    return (
        <div className="AdminPage-DashBoard">
            <NavigationLeft />
            <div className="Content-Page-Metas">
                <section className="card-saldo-disponivel" onClick={() => {
                    window.location.href = window.location.origin + "/admin/planilhas/planilha-despesas"
                }}>
                    <h2>Saldo disponível</h2>
                    <p>R$<span>{SaldoTotal}</span></p>
                </section>
                {addMeta ?
                    <div className="add-meta">
                        <form onSubmit={(e) => { handleCreateMeta(e) }}>
                            <div className="title-create-metas">
                                <h2>Criação de Metas</h2>
                                <button onClick={() => {
                                    setaddMeta(false)
                                }}><i className="fa-solid fa-xmark"></i></button>
                            </div>
                            <input type='text' placeholder='Nome da Meta' value={newMeta} required onChange={e => setNewMeta(e.target.value)} />
                            <br />
                            <input type='number' placeholder='Meta Anual' value={newMetaAnual} required onChange={e => setNewMetaAnual(e.target.value)} />
                            <br />
                            <input type='number' placeholder='Meta Mensal' value={newMetaMensal} required onChange={e => setNewMetaMensal(e.target.value)} />
                            <br />
                            <button type="submit">Criar Meta</button>
                        </form>
                    </div>
                    :
                    <></>}
                <h1 className="title-section">Metas Principais</h1>
                <section className="meta-principal">
                    <div className="meta-card">
                        <a href={window.location.origin + '/admin/metas/' + MetaPrincipal.$id}>
                            <div className="top-card-meta">
                                <h1><i className="fa-solid fa-flag"></i> Meta Mensal e Anual</h1>
                            </div>
                            <p>Anual: <span>R${MetaPrincipal.anual}</span></p>
                            <p>Mensal: <span>R${MetaPrincipal.mensal}</span></p>

                        </a>

                    </div>
                    {MetasFixadas}
                    <div className="meta-card-add" onClick={() => {
                        setaddMeta(true)
                    }}>
                        <h2>ADICIONAR <i className="fa-solid fa-plus"></i></h2>
                    </div>
                </section>
                <h1 className="title-section">Metas Secundárias</h1>
                <section className="metas-secundarias">
                    {!MetasSecundarias ?
                        <Ring
                            size={40}
                            lineWeight={5}
                            speed={2}
                            color="#EF59A0"
                        />
                        :
                        <>{MetasSecundarias}</>
                    }
                </section>
            </div>
        </div>
    )
}