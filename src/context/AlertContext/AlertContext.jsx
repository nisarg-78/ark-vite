import { createContext, useState } from 'react';

const initialState = {
  text: '',
  type: '',
};

const AlertContext = createContext({
  ...initialState,
  setAlert: () => {},
});

export const AlertProvider = ({ children }) => {
  const [text, setText] = useState('');
  const [type, setType] = useState('');
  const [show, setShow] = useState(false)

  const setAlert = (text, type) => {
    setText(text);
    setType(type);
    setShow(true)
    
    setTimeout(() => {
      setText('');
      setType('');
      setShow(false)
    }, 5000);
  };

  return (
    <AlertContext.Provider
      value={{
        text,
        type,
        setAlert,
      }}
      show={show}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;