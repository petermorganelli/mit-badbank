
import { Outlet, } from "react-router-dom";
import MyNavbar from './components/MyNavbar';
// import { BankProvider } from './utils/BankContext';




function App() {
  return (
    // <BankProvider>
      <div>
        <MyNavbar />
        <Outlet />
      </div>
    // </BankProvider>
  );
}

export default App;
