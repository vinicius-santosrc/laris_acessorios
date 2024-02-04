import { useEffect, useState } from "react";
import { CheckIfUserIsLogged, CreateNewAccount, auth, loginIn } from "../../lib/firebase";
import { GetUserAtual } from "../../lib/database";

const LoginForm = () => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [cpf, setCPF] = useState(null);
    const [password, setPassword] = useState(null);

    const [ErrorMessage, setErrorMessage] = useState(false);

    async function loginAccount() {
        const User = {
            email: email,
            password: password
        }
        if (User.email && User.password) {
            await loginIn(User)
                .catch((error) => {
                    setTimeout(() => {
                        setErrorMessage(true)
                    }, 5000);
                    setErrorMessage(false)
                    console.log('ERRO:', error)
                })
        }
        else {
            console.log("ERRO AO CRIAR O USUÁRIO: DADOS INCOMPLETOS");
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user && user.uid) {
                const u = await GetUserAtual(user.uid);
            if (u) {
                if (CheckIfUserIsLogged()) {
                    window.location.href = window.location.origin;
                }
            }
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="AccountsRegisterForm__Content">
            <div className="logoUpLogin">
                <img src={window.location.origin + "/static/media/logolaris.png"} />
            </div>
            <h2>Realize seu login</h2>
            <p>Efetue seu login para continuar</p>
            {ErrorMessage &&
                <div className="ErrorMessageBox">
                    <h1>ERRO!</h1>
                    <p>Verifique todos os dados e tente novamente.</p>
                </div>}
            <div className="AccountsInputs-Content">
                <div className="Account-Box-Input-Show">
                    <p><label htmlFor="name">Endereço de e-mail *</label></p>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        required
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                </div>
                <div className="Account-Box-Input-Show">
                    <p><label htmlFor="name">Senha de acesso *</label></p>
                    <input
                        type="text"
                        id="senha"
                        name="senha"
                        value={password}
                        required
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </div>
            </div>
            <div className="ButtonsAction">
                <button onClick={loginAccount} className="Button-Wrapper-Content">
                    <span>ENTRAR</span>
                </button>
                <div className="already-account-box">
                    <p>Ainda não possui uma conta cadastrada em nosso site?</p>
                    <a href={window.location.origin + "/accounts/register"}>Faça o registro</a>
                </div>
            </div>
        </div>
    )
}

export default LoginForm