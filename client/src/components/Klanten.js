import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import $ from 'jquery';
import "datatables.net";
import "datatables.net-dt";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUsersAppointment } from "../services/Auth";
import { toast } from "react-toastify";
import UpdateAppointment from "./UpdateAppointment";
import DeleteAppointment from "./DeleteAppointment";
import LogoutAppointment from "./LogoutAppointment";

const Klanten = () => {
    const tableRef = useRef(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState(null);
    const [selecteduserId, setSelectedUserId] = useState(null);
    const [totalusers, setTotalUsers] = useState(0);
    const [data, setData] = useState("");
    const [activeLink, setActiveLink] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const getUsers = await getUsersAppointment();

            if (getUsers?.data && getUsers.data.length > 0) {
                // Use getUsers.data instead of getUsers
                const uniqueUsers = getUsers.data.reduce((Users, user) => {
                    if (!Users.some((u) => u.email === user.email)) {
                        Users.push(user);
                    }
                    return Users;
                }, []);

                setUsers(uniqueUsers);
                setTotalUsers(getUsers.totalUsers); // Assuming totalUsers is returned correctly from the backend


            } else {
                // toast.info("No appointments found.");
            }
        } catch (error) {
            // toast.error("Failed to fetch appointments. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []); // Empty dependency array to only run on component mount

    // Handle DataTable setup
    useEffect(() => {
        if (users.length > 0) {
            const table = $(tableRef.current).DataTable({
                paging: users.length > 8,
                pagingType: 'full_numbers',
                pageLength: 8,
                responsive: true,
                searching: true,
                ordering: true,
                info: false,
                paginate: true,
                lengthChange: false,
                filter: false,
                columnDefs: [
                    { orderable: false, targets: 0 } // Disable sorting on the checkbox column
                ],
                language: {
                    emptyTable: "Sorry, er staat geen afspraak in deze tabel...!",
                    search: "Zoekopdracht :", // Remove the search box label
                    zeroRecords: "Sorry, er is geen gebruiker van dit detail..!",
                    paginate: {
                        // first: '1',
                        // last: 'Last',
                        next: 'Next',
                        previous: 'Previous',

                    }
                }
            });

            return () => {
                if (table) {
                    table.destroy();
                }
            };
        }
    }, [users]);

    const handleDelete = (deletedUserId) => {
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== deletedUserId));
    };

    const handleCloseModal = () => {
        setSelectedUserId(null);
    };

    const handleDataFromChild = (childData) => {
        setData(childData);
    };

    useEffect(() => {
        fetchUsers();
    }, [data]);

    const handleActiveLink = (link) => {
        setActiveLink(link); // Update the active link when clicked
    };
    // Update active link on route change
    useEffect(() => {
        setActiveLink(location.pathname); // Set active link when route changes
    }, [location]);


    const handleCheckboxChange = (event, userId) => {
        if (event.target.checked) {
            setSelectedUsers((prev) => [...prev, userId]);
        } else {
            setSelectedUsers((prev) => prev.filter((id) => id !== userId));
        }
    };

    // Handle "Select All" checkbox
    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const allUserIds = users.map(user => user.id);
            setSelectedUsers(allUserIds);
        } else {
            setSelectedUsers([]);
        }
    };

    const goToPromoties = () => {
        if (selectedUsers.length === 0) {
            toast.warn("Select at least one user.");
            return;
        }
        navigate("/promoties", { state: { selectedUsers } });
    };

    return (
        <>
            <Helmet>
                <title>Klanten</title>
            </Helmet>
            <header className="afspra-header">
                <div className="logo-section">
                    <Link to="/afspraken">
                        <img src="/images/logo.png" alt="Logo" />
                    </Link>
                </div>
                <div className="right-section">
                    <div className="tab-section">
                        <ul>
                            <li className={activeLink === "/afspraken" ? "active" : ""}>
                                <Link
                                    to="/afspraken"
                                    onClick={() => handleActiveLink("/afspraken")}
                                >
                                    Afspraken
                                </Link>
                            </li>
                            <li className={activeLink === "/klanten" ? "active" : ""}>
                                <Link
                                    to="/klanten"
                                    onClick={() => handleActiveLink("/klanten")}
                                >
                                    Klanten
                                </Link>
                            </li>
                            <li className={activeLink === "/promoties" ? "active" : ""}>
                                <Link
                                    to="/promoties"
                                    onClick={() => handleActiveLink("/promoties")}
                                >
                                    Promoties
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="img-section">
                        <img src="/images/Kim.jpg"
                            alt="Profile"
                            style={{
                                borderRadius: '50%', display: 'block', margin: '0 auto',
                            }} />

                        {!isDialogOpen && (
                            <div className="profile-info">
                                <button data-bs-toggle="modal" data-bs-target="#exampleModal-55" style={{ cursor: 'pointer' }}>Uitloggen</button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="afspra-banner">
                <div className="tab-content">
                    <div className="tab-content-top">
                        <div className="tab-title">
                            <h4>Alle klanten</h4>
                        </div>
                        <button onClick={goToPromoties} className="let-op-btn no-icon">Bericht verzenden</button>
                    </div>
                    <div className="tab-content-bottom">
                        <h5>{users.length} afspraken uit {users.length}</h5>

                        <div className="display">
                            <table
                                ref={tableRef}
                                id="example"
                                className="display"
                                cellSpacing="0" width="100%">
                                <thead>
                                    <tr className="table-heading">
                                        <th>
                                            {users.length > 0 && (
                                                <input
                                                    type="checkbox"
                                                    onChange={handleSelectAll}
                                                    checked={selectedUsers.length === users.length}
                                                />
                                            )}
                                        </th>

                                        <th>Naam</th>
                                        <th>Telefoonnummer</th>
                                        <th>E-mailadres</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0
                                        ? <>
                                            {users.map((user) => (
                                                <tr key={user.id}>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            className="rowCheckbox"
                                                            checked={selectedUsers.includes(user.id)}
                                                            onChange={(e) => handleCheckboxChange(e, user.id)}
                                                        />
                                                    </td>
                                                    <td>{user.name[0].toUpperCase() + user.name.slice(1)}</td>
                                                    <td>{user.phone_number}</td>
                                                    <td>{user.email}</td>
                                                    <td>
                                                        <img
                                                            src="/images/edit-icon.png"
                                                            alt="Edit"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#exampleModal-1"
                                                            onClick={() => setUserId(user.id)}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                        &nbsp;
                                                        <img
                                                            src="/images/delete-icon.png"
                                                            alt="Delete"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#exampleModal-2"
                                                            onClick={() => setSelectedUserId(user.id)}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </> : <>
                                            <td colSpan="7" className="text-center">Geen gegevens gevonden</td>
                                        </>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

            {/* Update Pop-up */}
            <UpdateAppointment userid={userId} onDataPass={handleDataFromChild} ></UpdateAppointment>

            {/* Delete pop-up */}
            <DeleteAppointment
                id={selecteduserId}
                onClose={handleCloseModal}
                onDataPass={handleDataFromChild}
                onDelete={handleDelete}
            ></DeleteAppointment>

            {/* Logout Pop-up */}
            <LogoutAppointment
                id={selecteduserId}
                onClose={handleCloseModal}
            ></LogoutAppointment>

            <footer>
                <p>© 2025 UpNailz. Alle rechten voorbehouden</p>
            </footer>
        </>
    );
};

export default Klanten;
