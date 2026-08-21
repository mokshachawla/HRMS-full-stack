import "../../styles/modal.css";
import EmployeeForm from "./EmployeeForm";

function EmployeeModal({

                           show,

                           employee,

                           onClose

                       }) {

    if (!show) return null;

    return (

        <div className="modal-overlay">

            <div className="modal-box">

                <div className="modal-header">

                    <h2>
                        {employee ? "Edit Employee" : "Add Employee"}
                    </h2>

                    <button
                        className="btn btn-danger"
                        onClick={onClose}
                    >
                        X
                    </button>

                </div>

                <EmployeeForm
                    employee={employee}
                    onSuccess={onClose}
                />

            </div>

        </div>

    );

}

export default EmployeeModal;