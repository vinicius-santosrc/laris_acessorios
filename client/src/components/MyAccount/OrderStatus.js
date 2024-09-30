/**
 * Creation Date: 08/09/2023
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/
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