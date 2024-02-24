import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import withTokenExpirationCheck from "./withTokenExpirationCheck";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  const submitForm = async () => {
    try {
      await fetch("https://whattocook2-4e261a72626f.herokuapp.com/contactus", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          name,
          email,
          subject,
          text,
        }),
      });

      alert("Sent successfully!");
    } catch (error) {
      console.error("Error Sending:", error);
      alert("Error Sending. Please try again later.");
    }
  };

  return (
    <div style={{ backgroundColor: "tan" }}>
      <Header />
      <div>
        <h1> Contact Us!</h1>
        <form>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />

          <label htmlFor="text">Message:</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="4"
            required
          ></textarea>

          <button type="button" onClick={submitForm}>
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

// function Contact() {
//     return(
//         <div style={{textAlign:'center', font:'cursive'}}>
//         <Header/>
//             <h1 style={{fontSize:'35px'}}> Let's Talk</h1>
//             <h2>Email us at </h2>
//             <h2 style={{fontSize:'30px'}}> <Link to="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSHwCsBHCNkLDWHFHhbgzTLvtCxtfnMlMKnbPhsGbRqxLTMDqqgDMvGjjHrPPtcwgrkpSGKn"> systembreakersusc@gmail.com</Link></h2>
//         <Footer/>
//         </div>
//     );
// }

export default withTokenExpirationCheck(Contact);
