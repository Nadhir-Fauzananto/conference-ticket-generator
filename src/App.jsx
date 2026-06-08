import React from 'react';
import Form from './components/Form.jsx';
import Ticket from './components/Ticket.jsx';

const logoFull = import.meta.env.BASE_URL + "images/logo-full.svg";

export default function App() {
  const [ticketData, setTicketData] = React.useState(null);

  function handleFormCompleted (data) {
    setTicketData(data);
  }

  return (
    <main>
      <img src={logoFull} alt="Logo of the Conference." className="logo-full-icon"></img>
      {ticketData ? <Ticket ticketData={ticketData} /> : <Form handleFormCompleted={handleFormCompleted} />}
    </main>
  )
}
