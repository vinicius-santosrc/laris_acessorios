export default function AdminLogin() {
    return (
        <section class="AdminLoginPage">
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
                            <input />
                        </div>
                        <div className="AdminLogin-input-box">
                            <p>Senha</p>
                            <input />
                        </div>
                    </div>
                    <div className="AdminLogin-bottom">
                        <button>Entrar</button>
                    </div>
                </div>
                <div className="AdminLogin-right-side">
                    <img src={window.location.origin + "/static/media/admin-images/AdminLogin-fileright-afjeht1ht14ty4y4.webp"} />
                </div>
            </div>
        </section>
    )
}