import Alert from "react-bootstrap/Alert";

import React from "react";

export default function BootstrapAlert() {
  const [alertType, setAlertType] = useState("success");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState("jfdkaslfjdaskl;");
  const [alertTime, setAlertTime] = useState(0);

  // const bootstrapAlert = (type, msg, time = 4000) => {
  //   setAlertType(type);
  //   setAlertMsg(msg);
  //   setAlertVisible(true);
  //   setTimeout(() => {
  //     setAlertType("");
  //     setAlertMsg("");
  //     setAlertVisible(false);
  //   }, time);
  // };

  return (
    <Alert
      className="bootstrapAlert position-fixed position-absolute bottom-0 start-50 translate-middle"
      variant={alertType}
      show={alertVisible}
    >
      {alertMsg}
    </Alert>
  );
}
