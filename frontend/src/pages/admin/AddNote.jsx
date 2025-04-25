import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ErrorToast, SuccessToast } from '../../Toast/AllToast';
import { Oval } from 'react-loader-spinner';

export const AddNote = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addNote, setAddNote] = useState(false); // ✅ moved inside the component

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/ticket/detailTicket/${ticketId}`);
        setTicket(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ticket:', error);
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId,addNote]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">Loading ticket details...</div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="p-6">
        <p className="text-red-500">Ticket not found.</p>
      </div>
    );
  }
  console.log(ticket)

  return (
    <div className="max-w-8xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      {addNote && <AddNoteForm onClose={() => setAddNote(false)} />} {/* ✅ pass close handler */}
      
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Ticket Details</h2>
        <button
          onClick={() => setAddNote(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Add Note
        </button>
      </div>

      <div className="mb-4">
        <p><span className="font-semibold">Title:</span> {ticket.title}</p>
        <p><span className="font-semibold">Description:</span> {ticket.description}</p>
        {ticket.attachment && (
          <div className="mt-2">
            <span className="font-semibold">Attachment:</span><br />
            <img src={ticket.attachment} alt="attachment" className="w-40 mt-1 rounded-md shadow" />
          </div>
        )}
        <p className="text-sm text-gray-500 mt-2">Created: {new Date(ticket.createdAt).toLocaleString()}</p>
        <p className="text-sm text-gray-500">Updated: {new Date(ticket.lastUpdated).toLocaleString()}</p>
        <p className="mt-2"><span className="font-semibold">Raised by:</span> {ticket.customer?.name} ({ticket.customer?.email})</p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Notes</h3>
        {ticket.notes && ticket.notes.length > 0 ? (
          <ul className="list-disc list-inside">
            {ticket.notes.map((note, index) => (
              <div key={index} className='flex flex-col justify-center pt-2'>
                {
                  note.authorRole ? <div className="flex">
                    <h1 className='font-semibold'>Created By :</h1>
                    <h1> {note.authorRole == "Agent" ? "Agent": note.authorRole == "User" ? "User":"Admin"} </h1>
                  </div> : null
                }
                <h1 className='font-bold text-lg'>Title: {note.title} </h1>
                <h1> description : {note.description} </h1>
                <div className="flex">
                <h1 className='font-semibold'>Created At :</h1>
                <h1> {new Date(note.timestamp).toLocaleString()} </h1>
                </div>
                <img className='mt-3' src={note?.attachment} alt="" />
            <hr className='mt-2 border-[1.2px] border-gray-400 '/>
              </div>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No notes yet.</p>
        )}
      </div>
    </div>
  );
};

export const AddNoteForm = ({ onClose }) => {
 const [form, setForm] = useState({ title: '', description: '', attachment: null });
const [inputKey, setInputKey] = useState(Date.now()); // unique key to reset file input
const [loading, setLoading] = useState(false);
const {ticketId} = useParams() // get ticketId from URL params
 
const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'attachment') {
          setForm({ ...form, attachment: files[0] });
        } else {
          setForm({ ...form, [name]: value });
        }
      };
const handleSubmit = async (e) => {
    e.preventDefault()

  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("description", form.description);
  formData.append("ticketId", ticketId); // Assuming you have ticketId in scope
  if (form.attachment) {
    formData.append("attachment", form.attachment);
  }
  if( JSON.parse(localStorage.getItem('user'))?.role){
    formData.append("role",JSON.parse(localStorage.getItem('user')).role)
  }
  else formData.append("role","Admin")
  try{
    setLoading(true)
    const req = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/ticket/addNote`, // replace with your backend URL
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
    setLoading(false)
    const {success,message} = req.data
    if(success){
      SuccessToast(message)
      onClose()
    }else ErrorToast(message)
  }catch(err){
    ErrorToast("Error submitting note: " + err.message);
  }
  }

  return (
    <div className='w-full h-screen bg-black/50 backdrop-blur-md fixed top-0 left-0 z-10 flex items-center justify-center'>
      <div className="w-[65%] min-h-[65%] lm:min-h-fit lm:w-[80%] bg-white p-6 rounded shadow relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-3xl text-gray-500 hover:text-gray-800"
        >
          ×
        </button>
        <h2 className="text-lg font-semibold mb-4">Add a New Note</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    required
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
        
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    required
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows="4"
                  ></textarea>
                </div>
        
                <div>
                  <label className="block text-sm font-medium text-gray-700">Attachment (optional)</label>
                  <input
                    key={inputKey}
                    type="file"
                    name="attachment"
                    onChange={handleChange}
                    className="mt-1 block w-full text-sm text-gray-500"
                  />
                </div>
        
                <button
                  type="submit"
                  disabled={loading}
                  className={`${loading ? "bg-blue-200 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} flex items-center justify-center w-full py-2 rounded-xl text-white font-semibold transition duration-200`}
                >
                  {
                  loading ? 
              <Oval visible={true} height="30" width="30" color="#FFFFFF"/> : "Submit"
        }
                </button>
              </form>
      </div>
    </div>
  );
};
