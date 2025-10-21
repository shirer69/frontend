import { Route, Routes } from 'react-router-dom';
import LoginScreen from './screen/login';
import CodeVerifyScreen from './screen/verify_code';
import PasswordScreen from './screen/password';
import SetEnable2fa from './screen/set_fa_enable';


function App() {
  return (
    <div style={{ 
      backgroundColor: "#212121", 
      minHeight: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%"
    }}>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/verification" element={<CodeVerifyScreen/>} />
        <Route path="/verification-password" element={<PasswordScreen />} />
        <Route path="/2fa-enable" element={<SetEnable2fa />} />


      </Routes>

      
    </div>
  );
}

export default App;
