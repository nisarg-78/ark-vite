//TODO: this is porbably broken, check this and the App component and the Router

import Unauthorized from "../../pages/Unauthorized/Unauthorized"

function Protected({ isSignedIn, children }) {
  console.log(isSignedIn)
  if (!isSignedIn) {
    return <Unauthorized />
  }
  return children
}

export default Protected;
