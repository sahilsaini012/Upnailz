import React, { useEffect, useState } from "react";
import { deleteAppointment, getUsersAppointment } from "../services/Auth";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import { toast } from "react-toastify";

const DeleteAppointment = ({ id, onClose, onDelete }) => {

  const [loading, setLoading] = useState(false);
  // const { id } = useParams();
  // const userId = userid || id;
  const pageReload = () => {
    window.location.reload();
  }


  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await deleteAppointment(id);
      // console.log(response.message); // Display message or handle as needed
      if (!toast.isActive('appointments-toast')) {
        toast.success("Appointment Deleted Successfully", {
          toastId: "appointments-toast",
        });
      }
    } catch (error) {
      toast.error("Failed to delete appointment:", error);
      alert("Failed to delete appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade afpraak verwij" id="exampleModal-2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header annuler-header">
            <h4 id="exampleModalLabel">Afspraak verwijderen</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Weet je zeker dat je deze afspraak wilt verwijderen? 
            Deze actie kan niet ongedaan worden gemaakt.</p>
            <div className="annuleren-button">
              <a href="javascript:void(0)" className="button-annule let-op-btn" data-bs-dismiss="modal">Annuleren</a>
              <a
                href="javascript:void(0)"
                className="let-op-btn"
                onClick={() => {
                  handleDelete(id);
                  pageReload();
                }}
              >
                {loading ? "Om te verwijderen..." : "Verwijderen"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAppointment;
