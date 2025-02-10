import React, { useRef, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    emailjs.init("Ww-9tqzP0NYe0PdWC");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(formRef.current);
    if(!formData.get("Message")){
      formData.set("Message", "Sem informações adicionais");
    }
    const name = formData.get("Name");
    const email = formData.get("Email");
    


    const serviceId = "service_v824h0j";
    const templateId = "template_5l45qfb";

    

      setTimeout(() => {
        const destinations = [
          { resultado: "Fernando de Noronha", message: "Perfeito para amantes da natureza e praias paradisíacas!" },
          { resultado: "Gramado", message: "Ideal para quem busca clima frio e experiências gastronômicas." },
          { resultado: "Chapada Diamantina", message: "Ótimo para aventuras e trilhas incríveis!" },
        ];

        const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];
        setResult({
          destination: randomDestination.resultado,
          message: randomDestination.message,
        });

       

        emailjs
          .send(serviceId, templateId, {
            nome: name,
            email: email,
            resultado: randomDestination.resultado,
            message: randomDestination.message,
          })
          .then((response) => {
            console.log("Email enviado com sucesso", response);
          })
          .catch((error) => {
            console.error("Erro ao enviar o e-mail", error);
          });

        setIsLoading(false);
      }, 2000);

    fetch("https://script.google.com/macros/s/AKfycbz4QRXqy8XeeQWLchJpI-YfWoLYL1NXKdvo5goed8_5Xf7XvGEmNTQFYqyz-1GF_bwFzQ/exec", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert(`\nFoi enviado um email com informações do resultado!`);

        if (data.result === "success") {
          formRef.current.reset(); // Limpa o formulário após o envio bem-sucedido
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Ocorreu um erro ao enviar o formulário.");
      })
      .finally(() => {
        setIsLoading(false);
      });

    

  };

  return (
    <Container>
      <iframe
        src="https://gifer.com/embed/6Ur9"
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "-1",
        }}
        allowFullScreen
      ></iframe>
      <div
        style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(100, 100, 100, 0.5)", backdropFilter: "blur(3px)", zIndex: "-1"}}
      ></div>

      <Container style={{ zIndex: "1", width: "50%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
       
        <Form style={{ textAlign: "left", backgroundColor: "#f8f9fa", padding: "5%", borderRadius: "15px", width: "100%" }} ref={formRef} onSubmit={handleSubmit}>
        { !result && (
        <>
          <h3>Calculadora de viagem</h3>
          <strong>Sobre a você :</strong>
          <Form.Group className="mb-2" controlId="formName">
            <Form.Control type="text" placeholder="Seu nome..." name="Name" required />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Seu email..." name="Email" required />
            <Form.Text className="text-muted">Nunca compartilharemos seu e-mail com mais ninguém.</Form.Text>
          </Form.Group>
          <Form.Group className="mb-2" controlId="formAge">        
            <Form.Control type="number" placeholder="Sua idade" name="Age" required />
          </Form.Group>
          
          <Form.Group className="mb-2">
            <Form.Label><strong>Sobre a viagem: </strong></Form.Label>
            <Form.Select >
              <option value="">Tipo de Viagem</option>
              <option value="aventura">Aventura</option>
              <option value="relaxamento">Relaxamento</option>
              <option value="cultural">Cultural</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
           
            <Form.Select>
              <option value="">Clima Preferido</option>
              <option value="quente">Quente</option>
              <option value="frio">Frio</option>
              <option value="temperado">Temperado</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
           
            <Form.Control type="number" placeholder="Orçamento Disponível (R$)" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Description">
            <Form.Label>Informações adicionais?</Form.Label>
            <Form.Control as="textarea" rows={1} name="Message" />
          </Form.Group>
          <Button type="submit" disabled={isLoading} style={{ backgroundColor: "black", border: "0px" }}>
            {isLoading ? <Spinner animation="border" size="sm" /> : "Calcular Viagem"}
          </Button>
          </>
        )}
       
       { result && (
              <div className="result mt-4">
                <h1 className="text-center">Sua Viagem dos Sonhos: </h1>
                <p>
                  <strong>Destino:</strong> {result.destination} <br></br>
                  <i>{result.message}</i> 
                </p>
                <Button type="submit" variant="success" onClick={() => window.open("https://docs.google.com/spreadsheets/d/19MgCMesK40Htch6vewBV5kldKYOPKi7TMz3pBsQbSKA/edit?usp=sharing", "_blank")}>
                  Arquivo SpreadSheet
                </Button>
              </div>
            )
            }
             </Form>
      </Container>

    </Container>

  );
};

export default ContactForm;
