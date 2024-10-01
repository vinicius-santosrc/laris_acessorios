import React from "react";

export default function AlertComponent({message, type, close}) {
    return (
        <React.Fragment>
            <section className={ type != "error" ? "alertComponent" : "alertComponentError"}>
                {type == "success" ?
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.55156 18.0001L3.85156 12.3001L5.27656 10.8751L9.55156 15.1501L18.7266 5.9751L20.1516 7.4001L9.55156 18.0001Z" fill="#FD3A98" />
                    </svg>
                    :
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="white" />
                    </svg>
                }
                <p style={type == "error" ? {color: "white"} : {color: "black"}}>{message}</p>
            </section>
            <section className="alertComponentBackGround" onClick={close} />
        </React.Fragment>
    )
}