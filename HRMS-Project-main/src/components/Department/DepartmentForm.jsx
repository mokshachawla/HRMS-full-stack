import { useState, useEffect } from "react";

import {

    createDepartment,
    updateDepartment

} from "../../services/departmentService";

function DepartmentForm({

                            department: selectedDepartment,

                            onSuccess

                        }) {

    const [department, setDepartment] = useState({

        name: "",

        description: ""

    });

    useEffect(() => {

        if (selectedDepartment) {

            setDepartment({

                name: selectedDepartment.name,

                description: selectedDepartment.description

            });

        }

    }, [selectedDepartment]);

    const handleChange = (e) => {

        setDepartment({

            ...department,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (selectedDepartment) {

                await updateDepartment(

                    selectedDepartment.id,

                    department

                );

                alert("Department Updated");

            }

            else {

                await createDepartment(department);

                alert("Department Created");

            }

            onSuccess();

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <div className="mb-3">

                <label>Name</label>

                <input

                    type="text"

                    name="name"

                    className="form-control"

                    value={department.name}

                    onChange={handleChange}

                />

            </div>

            <div className="mb-3">

                <label>Description</label>

                <textarea

                    name="description"

                    className="form-control"

                    value={department.description}

                    onChange={handleChange}

                />

            </div>

            <button

                className="btn btn-success"

            >

                {

                    selectedDepartment

                        ? "Update Department"

                        : "Save Department"

                }

            </button>

        </form>

    );

}

export default DepartmentForm;