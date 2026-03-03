import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HeaderUp from "./components/HeaderUp/HeaderUp";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
import TopProducts from "./components/TopProducts/TopProducts";
import Banner from "./components/Banner/Banner";
import Subscribe from "./components/Subscribe/Subscribe";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import Popup from "./components/Popup/Popup";
import Promotion from "./components/Navbar/Promotion";
import Brand from "./components/Footer/Brand";
import BoxtoBox from "./components/BoxtoBox/BoxtoBox";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Error from "./Pages/Error";
import Contact from "./Pages/Contact";
import Logout from "./Pages/Logout";
import AdminLayout from "./components/Layouts/Admin-Layout";
import AdminUsers from "./Pages/Admin-Users";
import AdminContacts from "./Pages/Admin-Contacts";
import AdminUpdate from "./Pages/Admin-Update";

import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import NewProducts from "./Pages/NewProducts";
import Process from "./Pages/Process";
import Electronics from "./Pages/Electronic";
import Service from "./Pages/Service";
import Cart from "./Pages/Cart";
import Cloths from "./Pages/Cloths";
import Mens from "./Pages/Mens";
import Girls from "./Pages/Girls";
import ClaimNow from "./Pages/ClaimNow";


const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200  sm:max-w-full">
      <HeaderUp />
      <Navbar />

      {/* Routes START */}
      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />

              <Products />
              <TopProducts />
              <Banner />
              <Subscribe />
              <BoxtoBox />
              <Testimonials />
              <Promotion />

            </>
          }
        />

        {/* Login Page */}
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/products" element={<NewProducts />} />
        <Route path="/process" element={<Process />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/cart" element={<Cart />} /> 
        <Route path="/cloths" element={<Cloths />} />
        <Route path="/mens" element={<Mens />} />
        <Route path="/girls" element={<Girls />} />
        <Route path="/claim-now" element={<ClaimNow />} />

        <Route path="*" element={<Error />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="users/:id/edit" element={<AdminUpdate />} />
        </Route>

      </Routes>

      {/* Routes END */}
      <Brand />
      <Footer />
      <Popup />
    </div>
  );
};

export default App;
