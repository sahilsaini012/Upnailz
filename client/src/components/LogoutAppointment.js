import React, { useEffect, useState } from "react";
import { deleteAppointment, getUsersAppointment } from "../services/Auth";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const LogoutAppointment = ({ onClose }) => {

  const [loading, setLoading] = useState(false);
  const { UserLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
        UserLogout();  
        // navigate("/login");
        // toast.success("Uitloggen succesvol (Logout successfully)");
        setTimeout(() => {
          window.location.reload();    
        }, 1000);
      } catch (error) {
        toast.error("Logout Failed", error);
      } finally {
        setLoading(false);
      }
  }


  return (
    <div className="modal fade afpraak verwij" id="exampleModal-55" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header annuler-header">
            <h4 id="exampleModalLabel">Bevestig alstublieft</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Weet u zeker dat u wilt uitloggen?</p>
            <div className="annuleren-button">
              <a href="javascript:void(0)" className="button-annule let-op-btn" data-bs-dismiss="modal">annuleren</a>
              <a href="javascript:void(0)" className="let-op-btn" onClick={() => { handleLogout(); }} >
                {loading ? "Bevestig...het" : "Bevestigen"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutAppointment;
