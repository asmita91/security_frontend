// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SingleProduct from './components/User/SingleProduct';
import HomePage from './components/User/HomePage';
import Login from './components/Auth/Login';

import { AuthProvider } from './utils/authContext';
import { RequireAuth } from './utils/RequireAuth';
import { PurchaseProvider } from './utils/purchaseContext';
import { UserProvider } from './utils/userContext';
import Signup from './components/Auth/Signup';
import { Contact } from './components/Guest/Contact';
import { About } from './components/Guest/About';
import LandingPage from './components/Guest/LandingPage';
import { ErrorPage } from './components/Error/ErrorPage';
import { PurchaseCart } from './components/User/PurchaseCart';
import { Profile } from './components/User/Profile';
import { ChangePassword } from './components/User/ChangePassword';
import { PurchaseHistory } from './components/User/PurchaseHistory';
import { AddProduct } from './components/Admin/AddProduct';
import { ViewAllProducts } from './components/Admin/ViewAllProducts';
import { EditProduct } from './components/Admin/EditProduct';
import PasswordResetRequest from './components/User/Forgotpassword';

import AdminLogs from './components/Admin/AdminLogs';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <AuthProvider>
        <UserProvider>
          <PurchaseProvider>
            <Routes>
              <Route path='/' element={<LandingPage />}></Route>
              <Route path='/contact' element={<Contact />}></Route>
              <Route path='/about' element={<About />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/signup' element={<Signup />}></Route>
              <Route path='/singleProduct/:productId' element={<SingleProduct />}></Route>
              <Route path='/home' element={<RequireAuth> <HomePage /> </RequireAuth>}></Route>
              <Route path='/purchaseCart' element={<RequireAuth> <PurchaseCart /> </RequireAuth>}></Route>
              <Route path='/addProduct' element={<RequireAuth> <AddProduct /> </RequireAuth>}></Route>
              <Route path='/editProduct/:productId' element={<RequireAuth> <EditProduct /> </RequireAuth>}></Route>
              <Route path='/viewAllProducts' element={<RequireAuth> <ViewAllProducts /> </RequireAuth>}></Route>
              <Route path='/profile' element={<RequireAuth> <Profile /> </RequireAuth>}></Route>
              <Route path='/purchaseHistory' element={<RequireAuth> <PurchaseHistory /> </RequireAuth>}></Route>
              <Route path='/changePassword' element={<RequireAuth> <ChangePassword /> </RequireAuth>}></Route>
              <Route path='/forgotPassword' element={ <PasswordResetRequest /> }></Route>
              <Route path="/logs" element={<AdminLogs/>} />
              <Route path='*' element={<ErrorPage />}></Route>
            </Routes>
          </PurchaseProvider>
        </UserProvider>
      </AuthProvider>


    </div>
  );
}

export default App;
