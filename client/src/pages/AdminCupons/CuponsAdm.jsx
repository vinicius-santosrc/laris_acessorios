import { useEffect, useState } from "react";
import NavigationLeft from "../../components/AdminPage/NavigationLeft"
import { getCupons } from "../../lib/database";
import Swal from "sweetalert2";

const CuponsAdm = () => {

    const endpoint = process.env.REACT_APP_API_ENDPOINT;
    //const endpoint = process.env.REACT_APP_API_ENDPOINT_TEST;
    const secretKey = process.env.REACT_APP_API_SECRET_KEY;

    const [cuponsDisp, setcuponsDisp] = useState(null);
    const [CuponsCreator, setCuponsCreator] = useState(false)

    const [nomeCupom, setnomeCupom] = useState(null)
    const [CodigoCupom, setCodigoCupom] = useState(null)
    const [DescontoCupom, setDesconto] = useState(null)
    const [Private, setPrivate] = useState(true)

    async function getAllCupons() {
        const res = await getCupons();
        setcuponsDisp(res);
    }

    useEffect(() => {
        getAllCupons()
    }, [])

    async function createNewCupom() {
        try {
            if (nomeCupom && CodigoCupom, DescontoCupom) {
                await fetch(`${endpoint}/api/v1/${secretKey}/cupons/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        uniqueKey: CodigoCupom,
                        name: nomeCupom,
                        desconto: DescontoCupom,
                        private: Private ? 1 : 0
                    }),
                })
                    .then((res) => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `O cupom foi criado com sucesso.`,
                            showConfirmButton: false,
                            timer: 2500
                        })
                        getAllCupons()
                    })
            }

        }
        catch (error) {
            console.error("ERRO AO CRIAR CUPOM: ", error)
        }
    }

    async function removeCupom(id) {
        try {
            await fetch(`${endpoint}/api/v1/${secretKey}/cupons/remove`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id
                }),
            })
            .then(() => getAllCupons())

        }
        catch (error) {
            console.error("Erro: ", error)
        }
    }

    return (
        <div className="AdminPage-DashBoard">
            <NavigationLeft />
            <div className="Content-Orders-Page">
                <div className="toppage-products">
                    <div className="top-top-product-header">
                        <div>
                            <h2>Cupons Cadastrados ({cuponsDisp ? cuponsDisp.length : null})</h2>
                            <p>Gerencie os cupons da sua loja.</p>

                        </div>

                        <button onClick={() => { setCuponsCreator(CuponsCreator === false) }}><i className="fa-solid fa-plus"></i> ADICIONAR NOVO</button>
                    </div>
                </div>
                <div className="search-box-table">
                    <input type="text" placeholder="Procurar" />
                </div>

                {CuponsCreator &&
                    <div className="fixed-information-addres-pedido">
                        <div className="information-address">
                            <div className="title-info-address">
                                <h1><i className="fa-solid fa-truck-fast"></i> Criador de Cupons</h1>
                                <button onClick={() => { setCuponsCreator(CuponsCreator === false) }}><span><i class="fa-solid fa-xmark"></i></span></button>
                            </div>
                            <div className="Inputs-Show-Creator">
                                <div className="input-ticket">
                                    <input
                                        placeholder="Nome do Cupom *"
                                        value={nomeCupom}
                                        onChange={(e) => setnomeCupom(e.target.value)}
                                    />
                                </div>
                                <div className="input-ticket">
                                    <input
                                        placeholder="Desconto em % (ex: 5, 25) *"
                                        value={DescontoCupom}
                                        type="number"
                                        onChange={(e) => setDesconto(e.target.value)}
                                    />
                                </div>
                                <div className="input-ticket">
                                    <input
                                        placeholder="CÓDIGO-CUPOM * (ex: BEMVINDO) (20caracteres)"
                                        value={CodigoCupom}
                                        onChange={(e) => setCodigoCupom(e.target.value)}
                                    />
                                </div>
                                <div className="input-ticket">
                                    <p>Cupom privado? (Somente com o código)</p>
                                    <select onChange={(e) => { setPrivate(e.target.value); console.log(e.target.value) }} value={Private}>
                                        <option value={true}>Sim</option>
                                        <option value={false}>Não</option>
                                    </select>
                                </div>
                            </div>
                            <button onClick={createNewCupom}><span>CRIAR NOVO CUPOM</span></button>
                        </div>
                    </div>
                }

                <div className="list-pedidos">
                    <table>
                        <tr>
                            <td>ID</td>
                            <td>PALAVRA-CHAVE</td>
                            <td>NOME CUPOM</td>
                            <td>DESCONTO %</td>
                            <td>PRIVADO?</td>
                        </tr>
                        {cuponsDisp && cuponsDisp.map((cupom) => {
                            return (
                                <tr className="order_card" id={cupom.id} title={"Cupom " + cupom.id} key={cupom.id}>
                                    <td>{cupom.id}</td>
                                    <td>{cupom.uniqueKey}</td>
                                    <td>{cupom.name}</td>
                                    <td>{cupom.desconto}%</td>
                                    <td>{cupom.private ? 'Sim' : 'Não'}</td>
                                    <td><button onClick={() => removeCupom(cupom.id)}><span><i className="fa-solid fa-trash"></i></span></button></td>
                                </tr>
                            )
                        })}

                    </table>
                </div>
            </div>
        </div>
    )
}

export default CuponsAdm