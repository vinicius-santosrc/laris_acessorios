import { useEffect, useState } from "react"
import db, { getUserData } from "../../lib/appwrite"

export default function HeaderAdminPage() {
    const [user, setUser] = useState(null)
    const [status, userStatus] = useState(null)
    const [userDB, setUserDBAccount] = useState(null)

    useEffect(() => {
        getUserData()
            .then((account) => {

                setUser(account)
                userStatus(account.status ? 'Online' : 'Offline')
                db.getDocument(
                    "651ca99af19b7afad3f1",
                    "652102213eeea3189590",
                    account.$id
                )
                    .then((r) => {
                        setUserDBAccount(r)
                    })

                if (!account) {
                    window.location.href = window.location.origin + "/admin/login"
                }
            })

    }, [])

    return (
        <>
            <header>
                <div className="leftside-header">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input placeholder="Buscar" />
                    <img src="" />
                </div>
                <div className="right-side-header">
                    {userDB ?
                        <>
                            <button><i class="fa-regular fa-bell" onclick="notificacaoopen()"></i></button>
                            <div>
                                <a className="account-details-header" href="#">
                                    <img src={userDB.PHOTOURL} />
                                    <div className="flex-details-account">
                                        <p>{userDB.USUARIO}</p>
                                        {status == "Online" ?
                                            <p id="useronline">Conectado</p>
                                            :
                                            <p id="useroffline">Sem conexão</p>
                                        }
                                    </div>
                                </a>


                            </div>
                        </>
                        :
                        <></>
                    }

                </div>
            </header >
        </>
    )
}