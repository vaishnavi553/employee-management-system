import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./AddEmployee.css";

function AddEmployee() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    employee_id: "",
    department: "",
    designation: "",
    project: "",
    type: "",
    status: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleImage = (e) => {

    const file = e.target.files[0];

    setImage(file);
    setPreview(URL.createObjectURL(file));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();

    Object.keys(form).forEach(key => {
      data.append(key, form[key]);
    });

    if (image) {
      data.append("image", image);
    }

    try {

      await API.post("/employee", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Employee added successfully");

      navigate("/");

    } catch (err) {
      console.error(err);
    }

  };

  return (

    <div className="page">

      <h2 className="title">Add New Employee</h2>

      <form className="employeeForm" onSubmit={handleSubmit}>


        <div className="imageSection">

          <label htmlFor="imageUpload">

            <div>

              {preview ? (
                <img src={preview} className="imageBox" alt="profile"/>
              ) : (
                <span>Upload</span>
              )}

            </div>

          </label>

          <input
            id="imageUpload"
            type="file"
            hidden
            onChange={handleImage}
          />

        </div>

        <div className="formGrid">

          <div className="formGroup">
            <label>Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter Name"
            />
          </div>

          <div className="formGroup">
            <label>Employee ID *</label>
            <input
              name="employee_id"
              value={form.employee_id}
              onChange={handleChange}
              required
              placeholder="Enter Employee ID"
            />
          </div>

          <div className="formGroup">
            <label>Department *</label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="Design">Design</option>
              <option value="Development">Development</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
            </select>
          </div>

          <div className="formGroup">
            <label>Designation *</label>
            <select
              name="designation"
              value={form.designation}
              onChange={handleChange}
              required
            >
              <option value="">Select Designation</option>
              <option value="Trainee">Trainee</option>
              <option value="Lead Developer">Lead Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior">Senior</option>
              <option value="Associate">Associate</option>
              <option value="Lead Designer">Lead Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <div className="formGroup">
            <label>Project</label>
            <input
              name="project"
              value={form.project}
              onChange={handleChange}
              placeholder="Enter Project"
            />
          </div>

          <div className="formGroup">
            <label>Type *</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="Office">Office</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="formGroup">
            <label>Status *</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Permanent">Permanent</option>
              <option value="Contract">Contract</option>
              <option value="Intern">Intern</option>
            </select>
          </div>

        </div>

        <div className="formButtons">

          <button
            type="button"
            className="cancelBtn"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>

          <button type="submit" className="confirmBtn">
            Confirm
          </button>

        </div>

      </form>

    </div>

  );

}

export default AddEmployee;