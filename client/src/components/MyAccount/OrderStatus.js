const OrderStatus = ({ state }) => {

    return (
        <section className="Order-Status-Box">
            <div className="Order-Status-State" id={state === "PREPARANDO" ? 'selected' : ""}>
                <i className="fa-solid fa-box"></i>
                <h2>Preparando</h2>
            </div>
            <div className="Order-Status-State" id={state === "ENTREGA" ? 'selected' : ""}>
                <i className="fa-solid fa-truck-fast"></i>
                <h2>Entrega</h2>
            </div>
            <div className="Order-Status-State" id={state === "FINALIZADO" ? 'selected' : ""}>
                <i className="fa-solid fa-circle-check"></i>
                <h2>Finalizado</h2>
            </div>
        </section>
    )
}

export default OrderStatus