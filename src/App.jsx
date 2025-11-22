import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";

// 🔥 NOTE: Global Header हटा दिया गया है। अब प्रत्येक पेज (Home, Courses, आदि)
// अपने हेडर को अपने कंपोनेंट के अंदर रेंडर करेगा।
// Header का नाम HomeHeader.jsx रखा गया था, इसलिए उसे यहां 'Header' के रूप में इम्पोर्ट करना भ्रमित करने वाला हो सकता है।

// 💡 हम मान रहे हैं कि आपने HomeHeader.jsx का नाम बदलकर Header.jsx कर दिया है
// या आप इसे 'HomeHeader' नाम से ही इम्पोर्ट कर रहे हैं जैसा कि आपकी Home.jsx फाइल में है।
// इस कोड में, मैं इसे पूरी तरह से हटा रहा हूँ क्योंकि इसे अब पेज लेवल पर संभाला जाएगा।
// import Header from "./components/HomeHeader"; // 🔥 REMOVED from global layout

import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Internships from "./pages/Internships";
import Tools from "./pages/Tools";
import Contact from "./pages/Contact";
import Login from "./pages/Login"; 

export default function App() {
  return (
    <BrowserRouter>
      {/* 🛑 Header को यहां से हटा दिया गया है। 
          यह प्रत्येक पेज के अंदर रेंडर होगा, जिससे Home पेज पर transparent overlay और
          अन्य पेजों पर sticky header स्टाइल लागू हो सके। 
      */}
      <Routes>
        {/* Home: यह HomeHeader को isOverlay={true} के साथ रेंडर करेगा */}
        <Route path="/" element={<Home />} /> 
        
        {/* अन्य पेज: ये HomeHeader को बिना किसी prop के रेंडर करेंगे (जो डिफ़ॉल्ट रूप से sticky/neo-header होगा) */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}