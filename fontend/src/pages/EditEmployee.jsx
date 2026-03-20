import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./EditEmployee.css";

function EditEmployee() {

  const { id } = useParams();
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

  useEffect(() => {

    API.get(`/employee/${id}`).then(res => {

      const emp = res.data;

      setForm({
        name: emp.name || "",
        employee_id: emp.employee_id || "",
        department: emp.department || "",
        designation: emp.designation || "",
        project: emp.project || "",
        type: emp.type || "",
        status: emp.status || ""
      });

      setPreview(`http://localhost:5000/uploads/${emp.image}`);

    });

  }, [id]);

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

  const handleUpdate = async (e) => {

    e.preventDefault();

    const data = new FormData();

    Object.keys(form).forEach(key => {
      data.append(key, form[key]);
    });

    if (image) {
      data.append("image", image);
    }

    try {

      await API.put(`/employee/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Employee updated successfully");

      navigate("/");

    } catch (err) {
      console.error(err);
    }

  };

  return (

    <div className="page">

      <h2>Edit Employee Details</h2>

      <form className="employeeForm" onSubmit={handleUpdate}>


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
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange}/>
          </div>

          <div className="formGroup">
            <label>Employee ID</label>
            <input name="employee_id" value={form.employee_id} onChange={handleChange}/>
          </div>

          <div className="formGroup">
            <label>Department</label>
            <select name="department" value={form.department} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Design">Design</option>
              <option value="Development">Development</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
            </select>
          </div>

          <div className="formGroup">
            <label>Designation</label>
            <select name="designation" value={form.designation} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Design Lead">Design Lead</option>
              <option value="Developer">Developer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <div className="formGroup">
            <label>Project</label>
            <input name="project" value={form.project} onChange={handleChange}/>
          </div>

          <div className="formGroup">
            <label>Type</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Office">Office</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="formGroup">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="">Select</option>
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
            Update
          </button>

        </div>

      </form>

    </div>

  );

}

export default EditEmployee;