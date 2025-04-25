import React, { useState } from 'react';
import { ErrorToast, SuccessToast } from '../../Toast/AllToast';
import { RegisterTicket } from '../../libs/Ticket';
import { Oval } from 'react-loader-spinner';

const CreateTicket = () => {
  const [form, setForm] = useState({ title: '', description: '', attachment: null });
  const [inputKey, setInputKey] = useState(Date.now()); // unique key to reset file input
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'attachment') {
      setForm({ ...form, attachment: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    
  const user = JSON.parse(localStorage.getItem("user"));
  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("description", form.description);
  formData.append("userId", user.id);
  if (form.attachment) {
    formData.append("attachment", form.attachment);
  }

  try{
    setLoading(true)
    const response = await RegisterTicket(formData)
    setLoading(false)
    const { success, message } = response
    if (success) {
      SuccessToast(message);
    } else {
      ErrorToast(message);
    }

  }catch (err) {
    ErrorToast("Error submitting ticket: " + err.message);
  }

    console.log('Form submitted:', form);
    setForm({ title: '', description: '', attachment: null });
    setInputKey(Date.now()); // force re-render file input
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Create New Ticket</h2>
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
  );
};

export default CreateTicket;
