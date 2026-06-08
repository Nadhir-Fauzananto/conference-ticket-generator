import React from "react";

const logoMark = import.meta.env.BASE_URL + "images/logo-mark.svg";
const iconGithub = import.meta.env.BASE_URL + "images/icon-github.svg";

export default function Ticket({ticketData}) {

    const ticketId = React.useMemo(() => 
        Math.floor(Math.random() * (99999 - 10000 + 1) + 10000), 
    [])

    const avatarURL = React.useMemo(() => {
        return URL.createObjectURL(ticketData.avatar);
    }, [ticketData.avatar]);

    React.useEffect(() => {
        return () => {
            URL.revokeObjectURL(avatarURL);
        };
    }, [avatarURL]);

    return (
        <section className="ticket" aria-label={`Ticket for ${ticketData.name}`}>
            <div className="header">
                <h1>Congrats, <span>{ticketData.name}!</span> Your ticket is ready.</h1>
                <p>We've emailed your ticket to <span>{ticketData.email}</span> and will send updates in the run up to the event.</p>
            </div>
            <div className="ticket-info-container">
                <div className="ticket-info">
                    <div className="conf-info">
                        <div className="logo-mark-container">
                            <img src={logoMark} alt="Logo of the Conference." className="logo-mark"></img>
                            <h2>Coding Conf</h2>
                        </div>
                        <p>Jan 31, 2025 / Austin, TX</p>
                    </div>
                    <div className="personal-info">
                        <img src={avatarURL} alt={`${ticketData.name}'s avatar`} className="avatar"></img>
                        <div className="personal-details">
                            <p className="full-name">{ticketData.name}</p>
                            <p className="github-username"><img src={iconGithub} alt="GitHub:" className="icon-github"></img>{ticketData.ghUsername}</p>
                        </div>
                    </div>
                </div>
                <div className="random-id">
                    <p>#{ticketId}</p>
                </div>
            </div>
        </section>
    )
}