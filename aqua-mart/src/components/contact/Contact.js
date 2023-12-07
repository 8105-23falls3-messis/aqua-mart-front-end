import React from "react";
import "../contact/contact.css";

function Contact() {

  
  const storedUserDataString = localStorage.getItem("user");
  const userInfo = JSON.parse(storedUserDataString);
  
 const whatsappphonenumber = 16399972605;
 const urlencodedtext = `Hi, this is ${userInfo.firstName}`;

  return (
    <div className="contact">
      <h2>Contact Us:</h2>
      <h3>Address:</h3>
      <p>
        Avalon place, <br />
        Kitchener, Ontario, Canada. <br />
        Postal Code: N2M XXX <br />
        Contact: 1-555-666-9999 <br />
        Email: Support@AuqaMart.com
        <a href={`https://wa.me/${whatsappphonenumber}?text=${encodeURIComponent(urlencodedtext)}`}>WhatsApp</a>

      </p>
    </div>
  );
}

export default Contact;
