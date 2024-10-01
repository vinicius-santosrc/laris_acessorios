/**
 * Creation Date: 09/01/2024
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

import { Ring } from "@uiball/loaders";

export default function Loading() {
    return (
        <div className="loading">
            
            <div className="loadinginner">
                <Ring
                    size={60}
                    lineWeight={5}
                    speed={2}
                    color="#EF59A0"
                />
            </div>

        </div>
    )
}