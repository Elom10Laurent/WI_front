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
// import User from "./pages/User";



function App() {

  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Messagerie />} />
            <Route path="messagerie/create" element={<MessagerieCreateForm />} />
            <Route path="messagerie/:id/update" element={<MessagerieUpdateForm />} />
            <Route path="notification" element={<Notification />} />
            <Route path="notification/create" element={<NotificationCreateForm />} />
            <Route path="notification/update" element={<NotificationUpdateForm />} />
            <Route path="publication/:id" element={<MyMessagerie />} />
            <Route path="user" element={<UserList />} />
            <Route path="user/:id" element={<MyProfile />} />
          </Route>
        </Routes>
      </UserProvider>
    </Router>)
}

export default App