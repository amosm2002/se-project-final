import React from "react";
import { Container, Row, Col } from "reactstrap";
import useGetData from "../custom-hooks/useGetData";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

const Orders = () => {
  const { data: usersData, loading } = useGetData("users");

  const generateRandomString = length => {
    const alphanumericChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
      result += alphanumericChars[randomIndex];
    }
    return result;
  };

  const generateRandomEmail = () => {
    const commonNames = ["John", "Mary", "David", "Sarah", "Michael", "Emma", "Christopher", "Jennifer", "Jessica", "Matthew"];
    const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com"];
    const randomName = commonNames[Math.floor(Math.random() * commonNames.length)];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const randomNumbers = Math.floor(Math.random() * 999) + 1; // generate a random number between 1 and 999
    const email = `${randomName.toLowerCase()}${randomNumbers}@${randomDomain}`;
    return email;
  };

  const generateRandomCashAmount = () => {
    const randomAmount = Math.floor(Math.random() * 75000 + 5000) / 100; // generate a random number between 50 and 800 with 2 decimal places
    const cashAmount = `$${randomAmount.toFixed(2)}`;
    return cashAmount;
  };

  const generateRandomDate = () => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const randomTimestamp = Math.floor(Math.random() * (now.getTime() - oneWeekAgo.getTime()) + oneWeekAgo.getTime());
    const randomDate = new Date(randomTimestamp);
    return randomDate.toDateString();
  }

  const deleteUser = async id => {
    await deleteDoc(doc(db, "users", id));
    toast.success("User deleted!");
  };

  const rows = Array(10).fill().map((_, index) => ({
    id: index + 1,
    orderNumber: generateRandomString(7),
    email: generateRandomEmail(),
    amount: generateRandomCashAmount(),
    date: generateRandomDate()
  }));

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">Users</h4>
          </Col>
          <Col lg="12" className="pt-5">
            <table className="table ">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Order Number</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Order Placed Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(row => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.orderNumber}</td>
                    <td>{row.email}</td>
                    <td>{row.amount}</td>
                <td>{row.date}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(row.id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Col>
    </Row>
  </Container>
</section>
);
};

export default Orders;