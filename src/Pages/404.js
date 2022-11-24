import React from "react";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

const ErrorPage = () => {
  return (
    <div className="error404">
      <ReportGmailerrorredIcon sx={{ fontSize: 100 }} />
      <h1>Oops! Кажется, вы потеряли.</h1>
    </div>
  );
};
export default ErrorPage;
