import { useState, useEffect } from "react";

function PolicyModal({

    show,
    onClose,
    policy,
    onSave

}) {

    const [formData, setFormData] = useState({

        policyCode: "",
        title: "",
        category: "",
        version: "",
        active: true

    });

    useEffect(() => {

        if (policy) {

            setFormData(policy);

        } else {

            setFormData({

                policyCode: "",
                title: "",
                category: "",
                version: "",
                active: true

            });

        }

    }, [policy]);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({

            ...formData,
            [name]: value

        });

    };

    const handleSubmit = (event) => {

        event.preventDefault();

        onSave(formData);

    };

    if (!show) {

        return null;

    }

    return (

        <div className="modal d-block">

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">

                            {policy
                                ? "Edit Policy"
                                : "Add Policy"}

                        </h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            <div className="mb-3">

                                <label className="form-label">

                                    Policy Code

                                </label>

                                <input
                                    type="text"
                                    name="policyCode"
                                    className="form-control"
                                    value={formData.policyCode}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Title

                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Category

                                </label>

                                <input
                                    type="text"
                                    name="category"
                                    className="form-control"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Version

                                </label>

                                <input
                                    type="text"
                                    name="version"
                                    className="form-control"
                                    value={formData.version}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Save
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default PolicyModal;