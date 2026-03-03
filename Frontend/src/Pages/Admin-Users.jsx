import { useAuth } from "../Store/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const { authorizationToken, API} = useAuth();

    // ✅ Get all users
    const getAllUsersData = async () => {
        try {
            const response = await fetch(
                `${API}/api/admin/users`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: authorizationToken,
                    },
                }
            );

            if (!response.ok) {
                console.error("Failed to fetch users");
                return;
            }

            const data = await response.json();
            setUsers(data.users || data);
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    // ✅ Delete user
    const deleteUser = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );
        if (!confirmDelete) return;

        try {
            const response = await fetch(
                `${API}/api/admin/users/delete/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: authorizationToken,
                    },
                }
            );
            toast.success('Deleted Successfully!');
            if (!response.ok) {
                console.error("Delete failed");
                return;
            }

            await response.json();
            getAllUsersData();
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    useEffect(() => {
        getAllUsersData();
    }, [authorizationToken]); 

    return (
        <section className="admin-section">
            <div className="container">
                <h1 className="admin-heading m-3 p-3 ml-90 text-2xl underline">Admin Users Data</h1>
            </div>

            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center" }}>
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            users.map((curUser) => (
                                <tr key={curUser._id}>
                                    <td>{curUser.username}</td>
                                    <td>{curUser.email}</td>
                                    <td>{curUser.phone}</td>
                                    <td>
                                        <Link to={`/admin/users/${curUser._id}/edit`}>
                                            <button className="btn-update">Edit</button>
                                        </Link>

                                    </td>
                                    <td>
                                        <button
                                            className="btn-delete"
                                            onClick={() => deleteUser(curUser._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AdminUsers;
