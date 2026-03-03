import { Navigate, NavLink, Outlet } from "react-router-dom";
import { ImUsers } from "react-icons/im";
import { IoIosContacts } from "react-icons/io";
import { MdHomeRepairService } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { useAuth } from "../../Store/auth";

const AdminLayout = () => {
    const { user, isLoading } = useAuth();
    console.log("Admin Layout:", user);

  
    if (isLoading) {
        return <h1>Loading...</h1>;
    }

   
    if (!user || !user.isAdmin) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <header>
                <div className="container container-fluid">
                    <nav>
                        <ul className="admin-nav">

                            <li>
                                <NavLink to="/admin/users">
                                    <ImUsers /> Users
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/admin/contacts">
                                    <IoIosContacts /> Contacts
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/service">
                                    <MdHomeRepairService /> Services
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/">
                                    <AiFillHome /> Home
                                </NavLink>
                            </li>

                        </ul>
                    </nav>
                </div>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    );
};

export default AdminLayout;
