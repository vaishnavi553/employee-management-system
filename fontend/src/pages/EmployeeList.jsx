import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "./EmployeeList.css";

function EmployeeList() {

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await API.get("/employee");
    setEmployees(res.data);
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    await API.delete(`/employee/${selectedId}`);
    setShowModal(false);
    fetchEmployees();
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.employee_id.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase()) ||
    emp.designation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">

      <div className="topbar">

        <h2>Employee</h2>

        <div className="actions">

          <input
            type="text"
            placeholder="Search"
            className="searchInput"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="addBtn"
            onClick={() => navigate("/add")}
          >
            + Add New Employee
          </button>

        </div>

      </div>

      <div className="tableCard">

        <table className="employeeTable">

          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Employee ID</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Project</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty">
                  No records found
                </td>
              </tr>
            ) : (

              filteredEmployees.map(emp => (

                <tr key={emp.id}>

                  <td className="employeeCell">

                    <img
                      src={`http://localhost:5000/uploads/${emp.image}`}
                      alt="profile"
                    />

                    {emp.name}

                  </td>

                  <td>{emp.employee_id}</td>
                  <td>{emp.department}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.project}</td>
                  <td>{emp.type}</td>
                  <td>{emp.status}</td>

                  <td>

                    <FaEye
                      className="icon"
                      onClick={() => navigate(`/view/${emp.id}`)}
                    />

                    <FaEdit
                      className="icon"
                      onClick={() => navigate(`/edit/${emp.id}`)}
                    />

                    <FaTrash
                      className="icon deleteIcon"
                      onClick={() => handleDeleteClick(emp.id)}
                    />

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>


      {showModal && (
        <div className="modalOverlay">

          <div className="modalBox">

            <div className="modalIcon">🗑️</div>

            <p>Are you sure you want to Delete?</p>

            <div className="modalButtons">

              <button
                className="cancelBtn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="confirmBtn"
                onClick={confirmDelete}
              >
                Yes
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default EmployeeList;