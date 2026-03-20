import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./ViewEmployee.css";

function ViewEmployee() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [emp, setEmp] = useState({
    name: "",
    employee_id: "",
    department: "",
    designation: "",
    project: "",
    type: "",
    status: "",
    image: ""
  });

  useEffect(() => {

    API.get(`/employee/${id}`).then(res => {

      const data = res.data;

      setEmp({
        name: data.name || "",
        employee_id: data.employee_id || "",
        department: data.department || "",
        designation: data.designation || "",
        project: data.project || "",
        type: data.type || "",
        status: data.status || "",
        image: data.image || ""
      });

    });

  }, [id]);

  return (

    <div className="page">

      <h2>View Employee Details</h2>

      <div className="employeeForm">

        {/* Profile Image */}

        <div className="imageSection">

          <div>

            {emp.image && (
              <img
                src={`http://localhost:5000/uploads/${emp.image}`}
                alt="profile"
                className="imageBox"
              />
            )}

          </div>

        </div>

        <div className="formGrid">

          <div className="formGroup">
            <label>Name</label>
            <input value={emp.name} readOnly />
          </div>

          <div className="formGroup">
            <label>Employee ID</label>
            <input value={emp.employee_id} readOnly />
          </div>

          <div className="formGroup">
            <label>Department</label>
            <input value={emp.department} readOnly />
          </div>

          <div className="formGroup">
            <label>Designation</label>
            <input value={emp.designation} readOnly />
          </div>

          <div className="formGroup">
            <label>Project</label>
            <input value={emp.project} readOnly />
          </div>

          <div className="formGroup">
            <label>Type</label>
            <input value={emp.type} readOnly />
          </div>

          <div className="formGroup">
            <label>Status</label>
            <input value={emp.status} readOnly />
          </div>

        </div>

        <div className="formButtons">

          <button
            className="cancelBtn"
            onClick={() => navigate("/")}
          >
            Back
          </button>

        </div>

      </div>

    </div>

  );
}

export default ViewEmployee;