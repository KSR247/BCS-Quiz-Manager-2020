import React from "react";
import { Table } from "react-bootstrap";

export default function About() {
  return (
    <div>
      <h1>About Project</h1>
      <p>
        This quiz manager was built by Kasir Abbas as BCS project.
        <br />
        Thank you for reviewing my project. Please share you feedback :D
      </p>

      <p>
        I have been tasked with designing, building and testing a new
        database-driven website. This website will be used to manage quizzes,
        each consisting of a set of multiple-choice questions and their
        associated answers. The website’s capabilities will only be accessible
        to known users. There will be different users, each with their own
        permissions level. A restricted user will have access to view quizzes,
        while an view user will have permission to view and see answers and an
        edit user has permissions delete, edit and to add quizzes.
      </p>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Role </th>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Retricted</td>
            <td>basicUser</td>
            <td>123</td>
          </tr>
          <tr>
            <td>Viewer</td>
            <td>viewer</td>
            <td>123</td>
          </tr>
          <tr>
            <td>Editor</td>
            <td>admin</td>
            <td>123</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
