import React from "react";
import { NavLink } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="alert alert-warning m-3 p-4 text-center">
      <h3>Oops! Something went wrong.</h3>
      <p>
        Back to <NavLink to="/">Home Page</NavLink> here.
      </p>
    </div>
  );
};

export default NotFound;
