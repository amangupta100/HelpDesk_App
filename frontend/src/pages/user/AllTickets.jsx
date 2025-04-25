import React, { useEffect, useState } from 'react';
import { getAllTickets } from '../../libs/Ticket';
import { Oval } from 'react-loader-spinner';
import { NavLink } from 'react-router-dom';

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMenuId, setShowMenuId] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
console.log(tickets)
  const toggleMenu = (id) => {
    setShowMenuId(showMenuId === id ? null : id);
  };
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const response = await getAllTickets(user.id);
        setTickets(response.tickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval
          height={60}
          width={60}
          color="#4f46e5"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#c7d2fe"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      
      <div className="w-full border-[1.6px] border-zinc-300 px-2 py-5">
        <h1 className='font-semibold text-xl'> Your Profile </h1>
        <h1 className='mt-2'>Name : {user.name} </h1>
        <h1> Total Tickets : {tickets.length} </h1> 
      </div>

      <h2 className="text-2xl font-bold my-4">Your Tickets</h2>
      {tickets.length === 0 ? (
        <p className="text-gray-500">No tickets found.</p>
      ) : (
        <ul className="space-y-4">
          {tickets.map((ticket) => (
            <li key={ticket._id} className="border-[1.6px] border-zinc-300 px-2 py-6 rounded shadow relative">
             
            <NavLink to= {`/user/dashboard/addNote/${ticket._id}`} className="px-4 absolute top-2 right-2 rounded-lg py-3 text-sm bg-gray-200 hover:bg-gray-400">
                      Add Note
                    </NavLink>

              <h3 className="text-xl font-semibold">{ticket.title}</h3>
              <p className="text-gray-700">{ticket.description}</p>
              <p className="text-sm text-gray-500">Status: {ticket.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllTickets;
