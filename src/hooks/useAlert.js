import { useContext } from 'react';
import AlertContext from '../context/AlertContext/AlertContext';

const useAlert = () => useContext(AlertContext);

export default useAlert;