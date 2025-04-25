import {Routes,Route, Navigate} from 'react-router-dom'
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/SignUp';
import CustomerDashboard from './pages/user/Dashboard';
import CreateTicket from './pages/user/CreateTicket';
import AllTickets from './pages/user/AllTickets';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './libs/ProctectedRoute';
import {AllTicketsAdmin} from './pages/admin/AllTickets'
import { CreateAgent } from './pages/admin/CreateAgent';
import AllAgents from './pages/admin/AllAgents';
import EditStatus from './pages/admin/EditStatus';
import { AddNote } from './pages/admin/AddNote';
import AgentDashboard from './pages/agent/AgentDashboard';
import CustomerTicket from './pages/agent/Customer&Ticket';
import { AddNoteUser } from './pages/user/AddNote';

export const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/user/dashboard" : "/login"} />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/user/dashboard" />} />

        <Route path="/register" element={!user ? <Register /> : <Navigate to="/user/dashboard" />} />
        <Route path="/user/dashboard" element={
          <ProtectedRoute>
            <CustomerDashboard />
          </ProtectedRoute>
        } >
          <Route path='create-ticket' element={<CreateTicket/>}/>
          <Route path='Profile&allTicket' element={<AllTickets/>}/>
          <Route path='addNote/:ticketId' element={<AddNoteUser/>}/>
        </Route>

        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>} >
          <Route path='create-agent' element={<CreateAgent/>}/>
          <Route path='allAgents' element={<AllAgents/>}/>
          <Route path='allTicket' element={<AllTicketsAdmin/>}/>
          <Route path='editStatus/:ticketId' element={<EditStatus/>}/>
          <Route path='addNote/:ticketId' element={<AddNote/>}/>
        </Route>

        <Route path="/agent/dashboard" element={<ProtectedRoute><AgentDashboard/></ProtectedRoute>} >
        <Route path='customer&ticket' element={<CustomerTicket/>}/>
        <Route path='addNote/:ticketId' element={<AddNote/>}/>
        </Route>
      </Routes>
    </div>
  );
};