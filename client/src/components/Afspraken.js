import React, { useEffect, useRef, useState } from "react";
import { Field, Form, Formik, useFormik } from "formik";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt";
import { getUsersAppointment } from "../services/Auth";
import UpdateAppointment from "./UpdateAppointment";
import NewAppointment from "./NewAppointment";
import DeleteAppointment from "./DeleteAppointment";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoutAppointment from "./LogoutAppointment";

const Afspraken = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalusers, setTotalUsers] = useState(0);
  const [userId, setUserId] = useState(null);
  const [selecteduserId, setSelectedUserId] = useState(null);
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const { UserLogout } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const tableRef = useRef(null);
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  const fetchUsers = async () => {
    setLoading(true);

    try {
      // alert("okkkkkk")
      const getUsers = await getUsersAppointment();
      //  alert("gone")
      // alert(JSON.stringify(getUsers.data))
      if (getUsers?.success) {
        // console.log("getUsers",getUsers)
        setUsers(getUsers.data);
        setTotalUsers(getUsers.totalUsers);
        // Removed the toast.success line here
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
  }, []);

  useEffect(() => {
    // console.log("empty table",emptyTable)
    if (users.length > 0) {
      const table = $(tableRef.current).DataTable({
        paging: users.length > 8,
        pagingType: "full_numbers",
        pageLength: 8,
        responsive: true,
        searching: true,
        ordering: true,
        info: false,
        paginate: true,
        lengthChange: false,
        filter: false,
        language: {
          emptyTable: "Sorry, er staat geen afspraak in deze tabel...!",
          search: "Zoekopdracht :", // Remove the search box label
          zeroRecords: "Sorry, er is geen gebruiker van dit detail..!",
          paginate: {
            // first: '1',
            // last: 'Last',
            next: "Next",
            previous: "Previous",
          },
        },
      });

      return () => {
        if (table) {
          table.destroy();
        }
      };
    }
  }, [users]);

  const handleDelete = (deletedUserId) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== deletedUserId)
    );
    // toast.success("Appointment deleted successfully");
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
  };

  const handleDataFromChild = (childData) => {
    setData(childData);
  };
  useEffect(() => {
    fetchUsers();
    // alert("dcjskdbkbv");
  }, [data]);

  const handleActiveLink = (link) => {
    setActiveLink(link); // Update the active link when clicked
  };
  return (
    <>
      <Helmet>
        <title>Afspraken</title>
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
              <li className="active">
                <li className={activeLink === "/afspraken" ? "active" : ""}>
                  <Link
                    to="/afspraken"
                    onClick={() => handleActiveLink("/afspraken")}
                  >
                    Afspraken
                  </Link>
                </li>
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
            <img
              src="/images/Kim.jpg"
              alt="Profile"
              style={{
                borderRadius: "50%",
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>
        </div>
      </header>
      {/* Conditionally render profile and logout buttons only if the dialog is not open */}
      {/* Under Navbar code */}
      <div className="afspra-banner">
        <div className="tab-content">
          <div className="tab-content-top">
            <div className="tab-title">
              <h4>Alle afspraken</h4>
            </div>
            <div className="tab-button">
              <button
                type="button"
                className="let-op-btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Nieuwe afpraak
              </button>
            </div>
          </div>
          <div className="tab-content-bottom">
            <h5>
              {users.length} afspraken uit {users.length}
            </h5>
            <table
              ref={tableRef}
              id="example"
              className="display"
              cellspacing="0"
              width="100%"
            >
              <thead>
                <tr className="table-heading">
                  <th>Naam</th>
                  <th>Telefoonnummer</th>
                  <th>E-mailadres</th>
                  <th>Afspraak op</th>
                  <th>Tijd</th>
                  <th>Behandeling</th>
                  <th></th> {/* Added a header for the action buttons */}
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  <>
                    {users.map((user) => (
                      <tr key={user.id}>
                        {" "}
                        {/* Use the unique user ID as the key */}
                        <td>
                          {user.name[0].toUpperCase() + user.name.slice(1)}
                        </td>
                        <td>{user.phone_number}</td>
                        <td>{user.email}</td>
                        <td>{user.appointment_on}</td>
                        <td>{user.time}</td>
                        <td>{user.treatment}</td>
                        <td>
                          <img
                            src="/images/edit-icon.png"
                            alt="Edit"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal-1"
                            onClick={() => setUserId(user.id)}
                            style={{ cursor: "pointer" }}
                          />
                          &nbsp;
                          <img
                            src="/images/delete-icon.png"
                            alt="Delete"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal-2"
                            onClick={() => setSelectedUserId(user.id)}
                            style={{ cursor: "pointer" }}
                          />
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    <td colSpan="7" className="text-center">
                      Geen gegevens gevonden
                    </td>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* popup for add customer */}
      <NewAppointment onDataPass={handleDataFromChild} />
      {/* popup for edit customer details */}
      <UpdateAppointment userid={userId} onDataPass={handleDataFromChild} />
      {/* {Delete popup} */}
      <DeleteAppointment
        id={selecteduserId}
        onClose={handleCloseModal}
        onDataPass={handleDataFromChild}
        onDelete={handleDelete}
      ></DeleteAppointment>
      {/* {Logout popup} */}
      <LogoutAppointment
        id={selecteduserId}
        onClose={handleCloseModal}
      ></LogoutAppointment>
      <footer>
        <p>© 2025 UpNailz. Alle rechten voorbehouden </p>
      </footer>
    </>
  );
};

export default Afspraken;
