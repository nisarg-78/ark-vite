import "./Error.css";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="d-flex min-vh-100 align-items-center text-center justify-content-center">
      <div className="errorDiv">
        <p>
          Error Occured 😞
          <br />
          (What a dissapointemt this guy is)
        </p>
        
            <Link to={`/`}>
                <Button variant="dark">
                    Home
                </Button>
            </Link>
            {" "}
            <Link to={`/login`}>
                <Button variant="dark">
                    Login
                </Button>
            </Link>
        
          
      </div>
    </div>
  );
}

export default Error;
