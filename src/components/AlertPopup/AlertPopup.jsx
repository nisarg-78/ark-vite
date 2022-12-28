import "./AlertPopup.css";
import { Alert } from "react-bootstrap";
import useAlert from "../../hooks/useAlert";

const AlertPopup = () => {
  const { text, type } = useAlert();

  if (text && type) {
    return (
      <Alert
        className="bootstrapAlert position-fixed position-absolute bottom-0 start-50 translate-middle"
        variant={type}
      >
        {text}
      </Alert>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;
