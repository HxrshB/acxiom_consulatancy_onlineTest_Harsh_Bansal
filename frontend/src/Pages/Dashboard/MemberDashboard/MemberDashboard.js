import React, { useContext, useEffect, useState } from "react";
import "../AdminDashboard/AdminDashboard.css";
import "./MemberDashboard.css";

import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BookIcon from "@material-ui/icons/Book";
import HistoryIcon from "@material-ui/icons/History";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import CloseIcon from "@material-ui/icons/Close";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { IconButton } from "@material-ui/core";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import moment from "moment";

function MemberDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [membershipData, setMembershipData] = useState({
    status: "",
    membershipType: "",
    from: "",
    to: "",
    updateMembership: "",
  });

  // Handle update button click
  const handleUpdateClick = (data) => {
    setMembershipData(data);
    setIsModalOpen(true);
  };

  // Handle modal form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send updated data to backend
    const response = await fetch("http://localhost:5000/membership", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(membershipData),
    });

    if (response.ok) {
      alert("Data updated successfully!");
      setIsModalOpen(false); // Close the modal
    } else {
      alert("Error updating data.");
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMembershipData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [active, setActive] = useState("profile");
  const [sidebar, setSidebar] = useState(false);

  const API_URL = "http://localhost:5000/";
  const { user } = useContext(AuthContext);
  const [memberDetails, setMemberDetails] = useState(null);

  useEffect(() => {
    const getMemberDetails = async () => {
      try {
        const response = await axios.get(
          API_URL + "api/users/getuser/" + user._id
        );
        setMemberDetails(response.data);
      } catch (err) {
        console.log("Error in fetching the member details");
      }
    };
    getMemberDetails();
  }, [API_URL, user]);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <div className="sidebar-toggler" onClick={() => setSidebar(!sidebar)}>
          <IconButton>
            {sidebar ? (
              <CloseIcon style={{ fontSize: 25, color: "rgb(234, 68, 74)" }} />
            ) : (
              <DoubleArrowIcon
                style={{ fontSize: 25, color: "rgb(234, 68, 74)" }}
              />
            )}
          </IconButton>
        </div>
        <div
          className={sidebar ? "dashboard-options active" : "dashboard-options"}
        >
          <div className="dashboard-logo">
            <LibraryBooksIcon style={{ fontSize: 50 }} />
            <p className="logo-name">LCMS</p>
          </div>
          <a
            href="#profile@member"
            className={`dashboard-option ${
              active === "profile" ? "clicked" : ""
            }`}
            onClick={() => {
              setActive("profile");
              setSidebar(false);
            }}
          >
            <AccountCircleIcon className="dashboard-option-icon" /> Profile
          </a>
          <a
            href="#activebooks@member"
            className={`dashboard-option ${
              active === "active" ? "clicked" : ""
            }`}
            onClick={() => {
              setActive("active");
              setSidebar(false);
            }}
          >
            <LocalLibraryIcon className="dashboard-option-icon" /> Active
          </a>
          <a
            href="#reservedbook@member"
            className={`dashboard-option ${
              active === "reserved" ? "clicked" : ""
            }`}
            onClick={() => {
              setActive("reserved");
              setSidebar(false);
            }}
          >
            <BookIcon className="dashboard-option-icon" /> Reserved
          </a>
          <a
            href="#history@member"
            className={`dashboard-option ${
              active === "history" ? "clicked" : ""
            }`}
            onClick={() => {
              setActive("history");
              setSidebar(false);
            }}
          >
            <HistoryIcon className="dashboard-option-icon" /> History
          </a>
          <a
            href="#membershiphistory@member"
            className={`dashboard-option ${
              active === "history" ? "clicked" : ""
            }`}
            onClick={() => {
              setActive("history");
              setSidebar(false);
            }}
          >
            <HistoryIcon className="dashboard-option-icon" /> Membership History
          </a>
          <a
            href="#profile@member"
            className={`dashboard-option ${
              active === "logout" ? "clicked" : ""
            }`}
            onClick={() => {
              logout();
              setSidebar(false);
            }}
          >
            <PowerSettingsNewIcon className="dashboard-option-icon" /> Log out{" "}
          </a>
        </div>

        <div className="dashboard-option-content">
          <div className="member-profile-content" id="profile@member">
            <div className="user-details-topbar">
              <img
                className="user-profileimage"
                src="./assets/images/Profile.png"
                alt=""
              ></img>
              <div className="user-info">
                <p className="user-name">{memberDetails?.userFullName}</p>
                <p className="user-id">
                  {memberDetails?.userType === "Student"
                    ? memberDetails?.admissionId
                    : memberDetails?.employeeId}
                </p>
                <p className="user-email">{memberDetails?.email}</p>
                <p className="user-phone">{memberDetails?.mobileNumber}</p>
              </div>
            </div>
            <div className="user-details-specific">
              <div className="specific-left">
                <div className="specific-left-top">
                  <p className="specific-left-topic">
                    <span style={{ fontSize: "18px" }}>
                      <b>Age</b>
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {memberDetails?.age}
                    </span>
                  </p>
                  <p className="specific-left-topic">
                    <span style={{ fontSize: "18px" }}>
                      <b>Gender</b>
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {memberDetails?.gender}
                    </span>
                  </p>
                </div>
                <div className="specific-left-bottom">
                  <p className="specific-left-topic">
                    <span style={{ fontSize: "18px" }}>
                      <b>DOB</b>
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {memberDetails?.dob}
                    </span>
                  </p>
                  <p className="specific-left-topic">
                    <span style={{ fontSize: "18px" }}>
                      <b>Address</b>
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {memberDetails?.address}
                    </span>
                  </p>
                </div>
              </div>
              <div className="specific-right">
                <div className="specific-right-top">
                  <p className="specific-right-topic">
                    <b>Points</b>
                  </p>
                  <p
                    style={{
                      fontSize: "25px",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "15px",
                    }}
                  >
                    540
                  </p>
                </div>
                <div className="dashboard-title-line"></div>
                <div className="specific-right-bottom">
                  <p className="specific-right-topic">
                    <b>Rank</b>
                  </p>
                  <p
                    style={{
                      fontSize: "25px",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "15px",
                    }}
                  >
                    {memberDetails?.points}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="member-activebooks-content" id="activebooks@member">
            <p className="member-dashboard-heading">Issued</p>
            <table className="activebooks-table">
              <tr>
                <th>S.No</th>
                <th>Book-Name</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Fine</th>
              </tr>
              {memberDetails?.activeTransactions
                ?.filter((data) => {
                  return data.transactionType === "Issued";
                })
                .map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.bookName}</td>
                      <td>{data.fromDate}</td>
                      <td>{data.toDate}</td>
                      <td>
                        {Math.floor(
                          (Date.parse(moment(new Date()).format("MM/DD/YYYY")) -
                            Date.parse(data.toDate)) /
                            86400000
                        ) <= 0
                          ? 0
                          : Math.floor(
                              (Date.parse(
                                moment(new Date()).format("MM/DD/YYYY")
                              ) -
                                Date.parse(data.toDate)) /
                                86400000
                            ) * 10}
                      </td>
                    </tr>
                  );
                })}
            </table>
          </div>

          <div
            className="member-reservedbooks-content"
            id="reservedbooks@member"
          >
            <p className="member-dashboard-heading">Reserved</p>
            <table className="activebooks-table">
              <tr>
                <th>S.No</th>
                <th>Book-Name</th>
                <th>From</th>
                <th>To</th>
              </tr>
              {memberDetails?.activeTransactions
                ?.filter((data) => {
                  return data.transactionType === "Reserved";
                })
                .map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.bookName}</td>
                      <td>{data.fromDate}</td>
                      <td>{data.toDate}</td>
                    </tr>
                  );
                })}
            </table>
          </div>
          <div className="member-history-content" id="history@member">
            <p className="member-dashboard-heading">History</p>
            <table className="activebooks-table">
              <tr>
                <th>S.No</th>
                <th>Book Name</th>
                <th>From</th>
                <th>To</th>
                <th>Return date</th>
              </tr>
              {memberDetails?.prevTransactions?.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.bookName}</td>
                    <td>{data.fromDate}</td>
                    <td>{data.toDate}</td>
                    <td>{data.returnDate}</td>
                  </tr>
                );
              })}
            </table>
          </div>
          <div className="member-history-content" id="membership@member">
            <p className="member-dashboard-heading">Membership</p>
            <div>
      {/* Membership Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          margin: "20px auto",
          fontFamily: "Arial, sans-serif",
          fontSize: "16px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#18213e",
              color: "#ffffff",
              textAlign: "center",
              height: "50px",
            }}
          >
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Status</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Membership Type</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>From</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>To</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Update Membership</th>
          </tr>
        </thead>
        <tbody>
          {memberships.length > 0 ? (
            memberships.map((membership, index) => (
              <tr
                key={index}
                style={{
                  textAlign: "center",
                  backgroundColor: "#f9f9f9",
                  transition: "background-color 0.3s ease",
                }}
              >
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>{membership.status}</td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>{membership.membershipType}</td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>{membership.from}</td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>{membership.to}</td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  <button
                    style={{
                      backgroundColor: "#2a67c6",
                      color: "#ffffff",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                    }}
                    onClick={() => handleUpdateClick(membership)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
                No membership data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for updating membership */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
            }}
          >
            <h3>Update Membership</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Status:
                <input
                  type="text"
                  name="status"
                  value={membershipData.status}
                  onChange={handleInputChange}
                  required
                  style={{ width: "100%", padding: "8px", margin: "10px 0" }}
                />
              </label>
              <br />
              <label>
                Membership Type:
                <input
                  type="text"
                  name="membershipType"
                  value={membershipData.membershipType}
                  onChange={handleInputChange}
                  required
                  style={{ width: "100%", padding: "8px", margin: "10px 0" }}
                />
              </label>
              <br />
              <label>
                From:
                <input
                  type="date"
                  name="from"
                  value={membershipData.from}
                  onChange={handleInputChange}
                  required
                  style={{ width: "100%", padding: "8px", margin: "10px 0" }}
                />
              </label>
              <br />
              <label>
                To:
                <input
                  type="date"
                  name="to"
                  value={membershipData.to}
                  onChange={handleInputChange}
                  required
                  style={{ width: "100%", padding: "8px", margin: "10px 0" }}
                />
              </label>
              <br />
              <label>
                Update Membership:
                <input
                  type="text"
                  name="updateMembership"
                  value={membershipData.updateMembership}
                  onChange={handleInputChange}
                  required
                  style={{ width: "100%", padding: "8px", margin: "10px 0" }}
                />
              </label>
              <br />
              <button
                type="submit"
                style={{
                  backgroundColor: "#2a67c6",
                  color: "#ffffff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  marginTop: "10px",
                }}
              >
                Save Changes
              </button>
            </form>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                backgroundColor: "red",
                color: "#ffffff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                marginTop: "10px",
                width: "100%",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;
