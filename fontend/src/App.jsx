import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import ViewEmployee from "./pages/ViewEmployee";

function App() {
  return (
    <BrowserRouter>

      <Sidebar />
      <Header />

      <div>


        <Routes className="crudFrame" style={{ marginLeft: "40px", backgroundColor: 'lightblue', marginTop: "0px", padding: "30px" }}>

          <Route path="/" element={<EmployeeList />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/edit/:id" element={<EditEmployee />} />
          <Route path="/view/:id" element={<ViewEmployee />} />

        </Routes>
      </div>


    </BrowserRouter>
  );
}

export default App;