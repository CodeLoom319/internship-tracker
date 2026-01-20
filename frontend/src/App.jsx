import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  // Form input states
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  // Internship data fetched from backend
  const [internships, setInternships] = useState([]);

  // User feedback message
  const [message, setMessage] = useState("");

  // Fetch all internships from backend API
  const fetchInternships = async () => {
    const res = await fetch("http://127.0.0.1:8000/internships");
    const data = await res.json();
    setInternships(data);
  };

  // ✅ FIXED: Add a new internship with validation
  const addInternship = async () => {
    // 🔴 VALIDATION CHECK
    if (!companyName || !role || !status) {
      setMessage("All fields are required");
      return;
    }

    await fetch(
      `http://127.0.0.1:8000/internships?company_name=${companyName}&role=${role}&status=${status}`,
      { method: "POST" }
    );

    setCompanyName("");
    setRole("");
    setStatus("");
    setMessage("Internship added successfully");
  };

  // Delete an internship by ID
  const deleteInternship = async (id) => {
    const res = await fetch(`http://127.0.0.1:8000/internships/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    setMessage(data.message);
    fetchInternships();
  };

  return (
    <div className="app-container">
      {page === "home" && (
        <>
          <h1>Internship Tracker</h1>

          <div className="button-group">
            <button
              onClick={() => {
                setMessage("");
                setPage("add");
              }}
            >
              Add
            </button>

            <button
              onClick={() => {
                setMessage("");
                fetchInternships();
                setPage("view");
              }}
            >
              View
            </button>

            <button
              onClick={() => {
                setMessage("");
                fetchInternships();
                setPage("delete");
              }}
            >
              Delete
            </button>
          </div>
        </>
      )}

      {/* Add internship page */}
      {page === "add" && (
        <>
          <h2>Add Internship</h2>

          <input
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <input
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <input
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          <button onClick={addInternship}>Add Internship</button>
          <button
            className="secondary"
            onClick={() => {
              setMessage("");
              setPage("home");
            }}
          >
            Back
          </button>

          {message && <p>{message}</p>}
        </>
      )}

      {/* View internships page */}
      {page === "view" && (
        <>
          <h2>View Internships</h2>

          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {internships.map((item) => (
                <tr key={item.id}>
                  <td>{item.company_name}</td>
                  <td>{item.role}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="secondary"
            onClick={() => {
              setMessage("");
              setPage("home");
            }}
          >
            Back
          </button>
        </>
      )}

      {/* Delete internships page */}
      {page === "delete" && (
        <>
          <h2>Delete Internship</h2>

          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {internships.map((item) => (
                <tr key={item.id}>
                  <td>{item.company_name}</td>
                  <td>{item.role}</td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      className="danger"
                      onClick={() => deleteInternship(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {message && <p>{message}</p>}

          <button
            className="secondary"
            onClick={() => {
              setMessage("");
              setPage("home");
            }}
          >
            Back
          </button>
        </>
      )}
    </div>
  );
}

export default App;
