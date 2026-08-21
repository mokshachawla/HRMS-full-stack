import "../../styles/modal.css";

import DepartmentForm from "./DepartmentForm";

function DepartmentModal({

                             show,

                             department,

                             onClose

                         }) {

    if (!show) return null;

    return (

        <div className="modal-overlay">

            <div className="modal-box">

                <div className="modal-header">

                    <h2>

                        {

                            department

                                ? "Edit Department"

                                : "Add Department"

                        }

                    </h2>

                    <button

                        className="btn btn-danger"

                        onClick={onClose}

                    >

                        X

                    </button>

                </div>

                <DepartmentForm

                    department={department}

                    onSuccess={onClose}

                />

            </div>

        </div>

    );

}

export default DepartmentModal;