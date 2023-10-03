import {Route , Routes} from "react-router-dom";
import LoginPage from "./Login";
import SignupPage from "./Signup";
import AllProducts from './allProducts';
import OTPPage from './emailVerification';
import LaptopsPage from './Laptops';
import PhonesPage from './Phones';
import ResetPasswordPage from './resetPassword'
import ForgetPassword from "./forgetPassword";
import ProductPage from "./product";
import AboutUs from "./AboutUs";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Payment from "./Payment";
import Paypay from "./paypay";
import OrderPlaced from "./OrderPlaced";
import AdminHome from "./AdminHome";
import AdminUserDetails from "./AdminUserDetails.js";
import AdminProductsDetails from "./AdminProductsDetails.js";
import EditProducts from "./editProducts.js";
import AddProducts from "./AdminProductsAdd";
import AdminOrderDetails from "./AdminOrderDetails";



function PageRoutes(){

    return(
        <Routes>
            <Route path='/' element={<AllProducts/>}></Route>
            <Route path='/login' element={<LoginPage/>}></Route>
            <Route path='/signup' element={<SignupPage/>}></Route>
            <Route path='/allProducts' element={<AllProducts/>}></Route>
            <Route path='/about' element={<AboutUs/>}></Route>
            <Route path='/laptops' element={<LaptopsPage/>}></Route>
            <Route path='/product' element={<ProductPage/>}></Route>
            <Route path='/phones' element={<PhonesPage/>}></Route>
            <Route path='/emailVerification' element={<OTPPage/>}></Route>
            <Route path='/resetPassword' element={<ResetPasswordPage/>}></Route>
            <Route path='/forgetPassword' element={<ForgetPassword/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='/checkout' element={<Checkout/>}></Route>
            <Route path='/payment' element={<Payment/>}></Route>
            <Route path='/paypay' element={<Paypay/>}></Route>
            <Route path='/OrderPlaced' element={<OrderPlaced/>}></Route>
            <Route path='/adminHome' element={<AdminHome/>}></Route>
            <Route path='/adminUser' element={<AdminUserDetails/>}></Route>
            <Route path='/adminProducts' element={<AdminProductsDetails/>}></Route>
            <Route path='/editProducts' element={<EditProducts/>}></Route>
            <Route path='/addProducts' element={<AddProducts/>}></Route>
            <Route path='/adminOrders' element={<AdminOrderDetails/>}></Route>
        </Routes>
    )
}

export default PageRoutes;