import { Link } from "react-router-dom"

const NavigationBarLeft = () => {
    return (
        <div className="navigation-my-account">
            <nav className="nav-bar-left">
                <div className="option-nav-bar">
                    <Link to={window.location.origin + "/accounts/myaccount"}>Dados pessoais</Link>
                </div>
                <div className="option-nav-bar">
                    <Link to={window.location.origin + "/accounts/myaccount/orders"}>Meus pedidos</Link>
                </div>
                <div className="option-nav-bar">
                    <Link to={window.location.origin + "/accounts/myaccount/cupons"}>Cupons</Link>
                </div>
                <div className="option-nav-bar">
                    <Link to={window.location.origin + "/accounts/myaccount/favorites"}>Favoritos</Link>
                </div>
                <div className="option-nav-bar">
                    <Link to={window.location.origin + "/accounts/myaccount/help"}>Ajuda</Link>
                </div>
            </nav>
        </div>
    )
}

export default NavigationBarLeft