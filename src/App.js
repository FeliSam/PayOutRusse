import "./styles.css";
import React from "react";
import Form from "./component/Form";
import NaVBar from "./component/Navigation";
// import { usePaymentInputs } from "react-payment-inputs";
import { Routes, Route } from "react-router-dom";
import Validation from "./Pages/Validation";
import Confirmation from "./Pages/Confirmation";
import ErrorPage from "./Pages/404";

export default function App() {
  return (
    <div className="App">
      <NaVBar />
      <div className="container">{/* <Form /> */}</div>
      <Routes>
        <Route path="/:type/:id/:livraison/:montant" element={<Form />} />
        <Route path="/Confirmation" element={<Confirmation />} />
        <Route path="/Validation" element={<Validation />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
