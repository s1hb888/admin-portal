import React from "react";
import { Link } from "react-router-dom";

function Terms() {
  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-3" style={{ color: "#EF3349" }}>
          Admin Portal - Terms & Conditions
        </h2>
        <p>
          Welcome to the Admin Portal. By accessing and using this application,
          you agree to the following terms and conditions:
        </p>
        <ul>
          <li>
            Admins must provide accurate and up-to-date information while
            creating or managing accounts.
          </li>
          <li>
            Admin login credentials are strictly confidential and must not be
            shared with unauthorized users.
          </li>
          <li>
            Admins are responsible for managing parent accounts, including
            activation, deactivation, and updates when required.
          </li>
          <li>
            Admins are authorized to manage and update platform content, quizzes,
            and other learning materials responsibly.
          </li>
          <li>
            Misuse of admin privileges, such as unauthorized modifications or data
            manipulation, is strictly prohibited.
          </li>
        </ul>
        <p>
          By clicking <b>"I accept"</b>, you confirm that you have read,
          understood, and agreed to these terms and conditions.
        </p>

        <div className="text-end mt-3">
          <Link to="/admin/login" className="btn btn-success">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Terms;
