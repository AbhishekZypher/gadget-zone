import { BrowserRouter } from "react-router-dom";
import Navi from "./Nav";
import Footer from "./Footer";
import PageRoutes from "./PageRoutes";
function Menu() {
  return (
    <BrowserRouter>
      <Navi />
      <PageRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default Menu;
