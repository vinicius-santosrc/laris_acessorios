import React, { useEffect, useState } from "react"
import Header from "../../../components/Header"
import { CheckIfUserIsLogged, auth } from "../../../lib/firebase";
import { GetUserAtual, getCupons } from "../../../lib/database";
import NavigationBarLeft from "../../../components/AuthPage/NavigationBarLeft";

const Cupons = () => {
    const endpoint = process.env.REACT_APP_API_ENDPOINT;
    //const endpoint = process.env.REACT_APP_API_ENDPOINT_TEST;
    const secretKey = process.env.REACT_APP_API_SECRET_KEY;

    const [userAtual, setuserAtual] = useState([]);

    const [cuponsDisp, setcuponsDisp] = useState(null);

    const [CupomInput, setCupomInput] = useState(null);

    const [SucessMessage, setSucessMessage] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState(false);

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
                return window.location.href = window.location.origin;
            }
        });

        return () => unsubscribe();
    }, []);

    window.document.title = "LARIS-ACESSORIOS: Minha conta";

    async function getAllCupons() {
        const res = await getCupons();
        setcuponsDisp(res);
    }

    useEffect(() => {
        getAllCupons()
    }, [])

    async function resgateCupom() {
        const cupomFinded = cuponsDisp.find((item) => item.uniqueKey == CupomInput.toUpperCase())

        const cuponsusados = JSON.parse(userAtual.cupons_usados) || ''


        if (cupomFinded) {
            if (cuponsusados.includes(cupomFinded.uniqueKey)) {
                alert("VOCÊ JÁ UTILIZOU ESSE CUPOM :(")
            }
            else {
                pushtoMyAccount(cupomFinded.uniqueKey)
            }
        }
        else {
            setErrorMessage(true)
            setTimeout(() => {
                setErrorMessage(false)
                getAllCupons()
            }, 5000);
        }

        async function pushtoMyAccount(uniqueKey) {

            const CUPONS_USER = JSON.parse(userAtual.cupons) || ''
            const cupons_usados = JSON.parse(userAtual.cupons_usados);

            if (CUPONS_USER.includes(uniqueKey)) {
                return
            }

            CUPONS_USER.push(uniqueKey)

            await fetch(`${endpoint}/api/v1/${secretKey}/cupons/myaccount/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cupons: JSON.stringify(CUPONS_USER),
                    cupom_usado: JSON.stringify(cupons_usados),
                    user_uid: userAtual.uid
                }),
            }).then((r) => {
                setSucessMessage(true)
                getAllCupons()
                setTimeout(() => {
                    setSucessMessage(false)
                    getAllCupons()
                }, 5000);
            })
        }

    }

    return (
        <React.Fragment>
            <Header />
            <div className="myaccount--page">
                <NavigationBarLeft />
                <div className="myaccount--section-content">
                    <h1>Meus cupons</h1>
                    <p>Gerencie os cupons da sua conta.</p>
                    {SucessMessage &&
                        <div className="sucessmessage">
                            <h2>Sucesso!</h2>
                            <p>Cupom adicionado com sucesso. Recarregue a página para aparecer</p>
                        </div>
                    }

                    {ErrorMessage &&
                        <div className="errormessage">
                            <h2>Erro!</h2>
                            <p>Cupom expirado ou não encontrado.</p>
                        </div>
                    }
                    <div className="input-resgate">
                        <input
                            type="text"
                            placeholder="Insira um cupom"
                            value={CupomInput}
                            onChange={(e) => setCupomInput(e.target.value)}
                        />
                        <button onClick={resgateCupom}><span>RESGATAR CUPOM</span></button>
                    </div>
                    {userAtual != "" &&
                        <div className="all-cuppons">
                            {cuponsDisp && cuponsDisp.map((cupom) => {

                                const CUPONS_USER = JSON.parse(userAtual.cupons) || ''

                                if (CUPONS_USER.includes(cupom.uniqueKey)) {
                                    return (
                                        <div className="cupom-box-wrapper" key={cupom.id}>
                                            <div className="left-side-box-cupom">
                                                <img src={window.location.origin + "/static/media/cupons/" + cupom.imageURL} />
                                            </div>
                                            <div className="right-side-box-cupom">
                                                <div className="up-cupom">
                                                    <p>Para você</p>
                                                    <h4>{cupom.name}</h4>
                                                    <h5>{cupom.desconto}% de desconto.</h5>
                                                </div>
                                                <div className="validade">
                                                    <p>Sem validade</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                            })}
                        </div>
                    }
                    <div className="cupons-avaliable">
                        <h1>Cupons disponíveis para resgate</h1>
                        <p>Resgate cupons agora!</p>
                        <div className="all-cuppons">
                            {userAtual && userAtual.cupons_usados && cuponsDisp && cuponsDisp.map((cupom) => {

                                const cuponsusados = JSON.parse(userAtual.cupons_usados) || ''

                                if (cuponsusados.includes(cupom.uniqueKey)) {
                                    return
                                }

                                if (cupom.private) {
                                    return
                                }

                                async function pushtoMyAccount() {

                                    const CUPONS_USER = JSON.parse(userAtual.cupons) || ''
                                    const cuponsusados = JSON.parse(userAtual.cupons_usados) || ''

                                    if (CUPONS_USER.includes(cupom.uniqueKey)) {
                                        return
                                    }

                                    if (cuponsusados.includes(cupom.uniqueKey)) {
                                        return
                                    }

                                    CUPONS_USER.push(cupom.uniqueKey)

                                    await fetch(`${endpoint}/api/v1/${secretKey}/cupons/myaccount/add`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            cupons: JSON.stringify(CUPONS_USER),
                                            user_uid: userAtual.uid
                                        }),
                                    }).then(r => {
                                        setSucessMessage(true)
                                        getAllCupons()
                                        setTimeout(() => {
                                            setSucessMessage(false)
                                        }, 5000);
                                    })
                                }

                                if (userAtual.cupons) {
                                    const CUPONS_USER = JSON.parse(userAtual.cupons) || ''
                                    if (CUPONS_USER.includes(cupom.uniqueKey)) {
                                        return
                                    }
                                }

                                return (
                                    <div className="cupom-box-wrapper" onClick={pushtoMyAccount} key={cupom.id}>
                                        <div className="left-side-box-cupom">
                                            <img src={window.location.origin + "/static/media/cupons/" + cupom.imageURL} />
                                        </div>
                                        <div className="right-side-box-cupom">
                                            <div className="up-cupom">
                                                <p>Para você</p>
                                                <h4>{cupom.name}</h4>
                                                <h5>{cupom.desconto}% de desconto.</h5>
                                            </div>
                                            <div className="validade">
                                                <p>Sem validade</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="cupons-avaliable">
                        <h1>Cupons utilizados</h1>
                        <p>Cupons usados recentemente.</p>
                        <div className="all-cuppons">
                            {userAtual && userAtual.cupons_usados && cuponsDisp && cuponsDisp.map((cupom) => {

                                const cuponsusados = JSON.parse(userAtual.cupons_usados) || ''

                                if (cuponsusados.includes(cupom.uniqueKey)) {
                                    return
                                }


                                if (cuponsusados.includes(cupom.uniqueKey)) {
                                    return (
                                        <div className="cupom-box-wrapper" key={cupom.id}>
                                            <div className="left-side-box-cupom">
                                                <img src={window.location.origin + "/static/media/cupons/" + cupom.imageURL} />
                                            </div>
                                            <div className="right-side-box-cupom">
                                                <div className="up-cupom">
                                                    <p>USADO</p>
                                                    <h4>{cupom.name}</h4>
                                                    <h5><s>{cupom.desconto}% de desconto.</s></h5>
                                                </div>
                                                <div className="validade">
                                                    <p>Utilizado por você</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Cupons