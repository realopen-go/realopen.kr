import React from "react";
import BootstrapNavbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <BootstrapNavbar bg="dark" variant="dark">
      <Link to="/">
        <BootstrapNavbar.Brand>REAL OPEN</BootstrapNavbar.Brand>
      </Link>
    </BootstrapNavbar>
  );
};

export default Navbar;
