import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AllTickets } from '../../libs/admin/Tickets'
import { Oval } from 'react-loader-spinner';
import { FiMoreVertical } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const Customer_Ticket = () => {
  const [tickets,setTickets] = useState([])
  const [loading,setLoading] = useState(false)
  const [showMenuId, setShowMenuId] = useState(null);

  const toggleMenu = (id) => {
    setShowMenuId(showMenuId === id ? null : id);
  };

  useEffect(()=>{
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await AllTickets()
      setTickets(response)
    }
  catch (error) {
    console.error("Error fetching users:", error)
  } finally {
    setLoading(false)
  }
  }
  fetchUsers()
  },[])

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
    <div className="py-4 px-2">
      <h2 className="text-2xl font-bold mb-4">All Tickets</h2>
      {tickets && tickets.length === 0 ? (
        <p className="text-gray-500">No tickets found.</p>
      ) : (
        <ul className="space-y-4">
          {tickets.map((ticket) => (
            <li key={ticket._id} className="border p-4 rounded shadow relative">
              {/* Three dots menu */}
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => toggleMenu(ticket._id)}
                  className="text-gray-500 hover:text-black"
                >
                  <FiMoreVertical size={20} />
                </button>
                {showMenuId === ticket._id && (
                  <div className="absolute right-0 mt-2 w-44 flex flex-col gap-2 rounded-lg bg-white border shadow-md p-2 z-10">
                    
                    <NavLink to= {`/agent/dashboard/addNote/${ticket._id}`} className="block px-4 rounded-lg py-2 text-sm bg-gray-200 hover:bg-gray-400 w-full text-left">
                      Add Note
                    </NavLink>

                  </div>
                )}
              </div>

              <h3 className="text-lg font-semibold">Customer Name : {ticket.customer.name}</h3>
              <h3 className="text-lg font-semibold">Customer Email : {ticket.customer.email}</h3>
              <h3 className="text-xl font-semibold">Title : {ticket.title}</h3>
              <div className="flex">
                <h1 className="font-semibold">Description :</h1>
                <h1 className="text-gray-500 ml-2">{ticket.description}</h1>
              </div>
              <div className="flex">
                <h1 className="font-semibold">Created At :</h1>
                <p className="text-gray-500 ml-2">{new Date(ticket.createdAt).toLocaleString()} </p>
              </div>
              <div className="flex">
                <h1>Status :</h1>
                <h1 className="text-gray-500 ml-1">{ticket.status}</h1>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default Customer_Ticket
