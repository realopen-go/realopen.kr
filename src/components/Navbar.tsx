import React from "react";
import BootstrapNavbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <BootstrapNavbar bg="dark" variant="dark">
      <Link to="/">
        <BootstrapNavbar.Brand>REAL OPEN</BootstrapNavbar.Brand>
      </Link>
      <BootstrapNavbar.Toggle />
      <BootstrapNavbar.Collapse className="justify-content-end">
        <BootstrapNavbar.Text>
          <Link to="/login">로그인</Link>
        </BootstrapNavbar.Text>
        <BootstrapNavbar.Text>
          <Link to="/my/bills">내 청구건 조회</Link>
        </BootstrapNavbar.Text>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
