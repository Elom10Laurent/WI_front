import Layout from "./components/layout/Dashboard";
import MessagerieCreateForm from "./components/messagerie/form-create";
import MessagerieUpdateForm from "./components/messagerie/form-update";
import NotificationCreateForm from "./components/notification/form-create";
import NotificationUpdateForm from "./components/notification/from-update";
import { UserProvider } from "./lib/userContext";
import Home from "./pages/Home"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notification from "./pages/Notification";
import Messagerie from "./pages/Messagerie";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MyMessagerie from "./components/MyMessagerie";
import UserList from "./components/UserList";
import MyProfile from "./pages/MyProfile";
import { ProtectedRoute } from "./lib/ProtectedRoute";
import Unauthorized from "./lib/Unauthorized";
// import User from "./pages/User";



function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />


          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['admin', 'user', 'writer']} />}>
            <Route path="" element={<Layout />}>
              <Route index element={<Messagerie />} />
              <Route path="messagerie/create" element={<ProtectedRoute allowedRoles={['admin', 'writer']} ><MessagerieCreateForm /></ProtectedRoute>} />
              <Route path="messagerie/:id/update" element={<MessagerieUpdateForm />} />
              <Route path="notification" element={<Notification />} />
              <Route path="notification/create" element={<ProtectedRoute allowedRoles={['admin', 'writer']} ><NotificationCreateForm /></ProtectedRoute>} />
              <Route path="notification/update" element={<NotificationUpdateForm />} />
              <Route path="publication/:id" element={<ProtectedRoute allowedRoles={['admin', 'writer']} ><MyMessagerie /></ProtectedRoute>} />
              <Route path="user" element={<ProtectedRoute allowedRoles={['admin']} ><UserList /></ProtectedRoute>} />
              <Route path="user/:id" element={<MyProfile />} />
            </Route>
          </Route>
        </Routes>
      </UserProvider>
    </Router>)
}

export default App