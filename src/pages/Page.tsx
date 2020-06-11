import React from "react";

import Navbar from "../components/Navbar";

const Page: React.FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Page;
