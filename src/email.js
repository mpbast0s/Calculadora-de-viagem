//import "./App.css";
import { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

export default function App() {
  const nameRef = useRef();
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => emailjs.init("Ww-9tqzP0NYe0PdWC"), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceId = "service_v824h0j";
    const templateId = "template_5l45qfb";
    try {
      setLoading(true);
      await emailjs.send(serviceId, templateId, {
        nome: nameRef.current.value,
        email: emailRef.current.value, 
        message: "Hello",
        resultado: "success",
      });
      alert("email successfully sent check inbox");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <aside></aside>
      <form className="for" onSubmit={handleSubmit}>
        <div className="form_group">
          <label htmlFor="">name</label>
          <input ref={nameRef} placeholder="enter your name" />
        </div>
        <div className="form_group">
          <label htmlFor="">email</label>
          <input ref={emailRef} type="email" placeholder="enter your email" />
        </div>
        <button className="btn" disabled={loading}>
          subscribe
        </button>
      </form>
    </section>
  );
}

