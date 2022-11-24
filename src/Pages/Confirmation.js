// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./styles.css";
import SpinnerIcon from "@rsuite/icons/legacy/Spinner";
import DoneAll from "@mui/icons-material/DoneAll";

const Confirmation = () => {
  const [load, setLoad] = useState(true);
  setTimeout(() => {
    setLoad(false);
  }, 3500);
  return (
    <>
      {load ? (
        <div className="mainLoad">
          <SpinnerIcon className="loadIcon" pulse style={{ fontSize: "2em" }} />
          <h2>Loading...</h2>
        </div>
      ) : (
        <div className="Confirmation">
          <DoneAll className="checkIcon" sx={{ fontSize: 100 }} />
          <h5>
            Ваша транзакция завершена, мы отправим вам квитанцию ​​​​об оплате
            по электронной почте
          </h5>
        </div>
      )}
    </>
  );
};

export default Confirmation;
