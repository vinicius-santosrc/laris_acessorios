/**
 * Creation Date: 05/09/2023
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

export default function Notification_Top() {
    return (
        <section className='notification-top'>
            <p>CONFIRA NOSSA NOVA NOVIDADE: &nbsp;</p>
            <a href={window.location.origin + '/pratas'}>PRATAS 925&nbsp;</a>
            <i className="fas fa-chevron-right"></i>
        </section>
    )
}