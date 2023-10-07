import { useEffect, useState } from "react"
import { getUserData, login } from "../lib/appwrite";
import { Models } from "appwrite";

export default function AdminLogin() {
    const [user, setUser] = useState(null)
    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState(null)

    function signIn() {
        if(!email || !password) {
            alert("Preencha todos os dados")
            return;
        }
        login(email, password)        
        .then((res) => {
            alert('voce entrou com sucesso')
        })
        .catch((error) => {
            alert(error)
        })
    }

    useEffect(() => {
        getUserData()
        .then((account) => {
            setUser(account)
            if(account) {
                window.location.href = '/admin'
            }  
        })
        .catch((e) => {
            alert(e)
        })
        
        
    })

     
    return (
        <section className="AdminLoginPage">
            <div className="AdminLogin-flexbox">
                <div className="AdminLogin-left-side">
                    <img className="LogoAdmin" src={window.location.origin + "/static/media/logolaris.png"} />
                    <div className="AdminLogin-top">
                        <h2>Entrar</h2>
                        <p>Seja bem-vindo(a)! Insira seus dados para continuar</p>
                    </div>
                    <div className="AdminLogin-middle">
                        <div className="AdminLogin-input-box">
                            <p>Email</p>
                            <input
                                onChange={
                                    (e) => {
                                        setEmail(e.target.value)
                                    }
                                } />
                        </div>
                        <div className="AdminLogin-input-box">
                            <p>Senha</p>
                            <input
                                onChange={
                                    (e) => {
                                        setPassword(e.target.value)
                                    }
                                } />
                        </div>
                    </div>
                    <div className="AdminLogin-bottom">
                        <button onClick={signIn}>Entrar</button>
                    </div>
                </div>
                <div className="AdminLogin-right-side">
                    <img src={window.location.origin + "/static/media/admin-images/AdminLogin-fileright-afjeht1ht14ty4y4.webp"} />
                </div>
            </div>
        </section>
    )
}