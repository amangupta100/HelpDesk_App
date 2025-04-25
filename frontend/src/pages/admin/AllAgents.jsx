import React, { useEffect, useState } from 'react';
import { getAllTickets } from '../../libs/Ticket';
import { Oval } from 'react-loader-spinner';
import { FaInfoCircle, FaEdit } from 'react-icons/fa';
import { GetAllAgentsFetch } from '../../libs/admin/AgentFetch';
import { NavLink } from 'react-router-dom';

const AllAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const response = await GetAllAgentsFetch()
        setAgents(response.agents);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  console.log(agents)

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
    <div className="p-4">
      
      <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold mb-4">All Agents</h2>
      <NavLink to="/admin/dashboard/create-agent" className='p-3 bg-blue-400 rounded-lg hover:bg-blue-600 transition-all duration-300 text-white'>Create Agent</NavLink>
      </div>

      {agents.length === 0 ? (
        <p className="text-gray-500">No agents found.</p>
      ) : (
        <ul className="space-y-4 mt-5">
          {agents.map((ticket) => (
            <li key={ticket._id} className="border p-4 rounded shadow relative">
              <h3 className="text-xl font-semibold">{ticket.name}</h3>
              <p className='text-gray-400 text-sm'> {ticket.email} </p>
              <div className='flex items-center'>
                <h1 className='text-base font-bold'>Created At:</h1>
                <h1 className='text-base ml-2 text-gray-500'> {new Date(ticket.createdAt).toLocaleString()} </h1>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllAgents;
