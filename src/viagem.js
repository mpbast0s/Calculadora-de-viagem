import React, { useEffect, useRef, useState } from "react";
import { Container, Form, Button, Card, Spinner } from "react-bootstrap";
import emailjs from "@emailjs/browser";

const TravelCalculator = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [name, setName] = useState("");  // Definido o estado para 'name'
  const [email, setEmail] = useState(""); // Definido o estado para 'email'
  const formRef = useRef(null);

  useEffect(() => {
    emailjs.init("Ww-9tqzP0NYe0PdWC");
  }, []);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(formRef.current);
    console.log(formData);

    try {
      fetch("https://script.google.com/macros/s/AKfycbz4QRXqy8XeeQWLchJpI-YfWoLYL1NXKdvo5goed8_5Xf7XvGEmNTQFYqyz-1GF_bwFzQ/exec", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          alert(data.msg);
          if (data.result === "success") {
            formRef.current.reset();
          }
        })
        .catch((err) => {
          console.error(err);
          alert("Ocorreu um erro ao enviar o formulário.");
        });

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

        const serviceId = "service_v824h0j";
        const templateId = "template_5l45qfb";

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
    } catch (err) {
      console.error(err);
      alert("Ocorreu um erro ao enviar o formulário.");
      setIsLoading(false);
    }
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

      {/* Camada de blur */}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(5px)",
          zIndex: "0",
        }}
      ></div>

      <Container
        className="travel-calculator"
        style={{
          zIndex: "1",
          width: "50%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card className="form-card" style={{ border: "0px solid black", zIndex: "1" }}>
          <Card.Body>
            <h2 className="text-center mb-3">Calculador de Viagem dos Sonhos</h2>

            {step === 1 && (
              <>
                <Form ref={formRef} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Digite seu nome"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      name="Name"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Idade</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Digite sua idade"
                      required
                      name="Age"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email (obrigatório)</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Digite seu email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="Email"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="Description">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" rows={3} name="Message" required />
                          </Form.Group>
                  <Button onClick={handleNextStep} style={{ backgroundColor: "purple", border: "0px" }} className="w-100">
                    Próximo
                  </Button>
                </Form>
              </>
            )}

            {step === 2 && (
              <>
                <Form ref={formRef} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tipo de Viagem</Form.Label>
                    <Form.Select required >
                      <option value="">Selecione</option>
                      <option value="aventura">Aventura</option>
                      <option value="relaxamento">Relaxamento</option>
                      <option value="cultural">Cultural</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Clima Preferido</Form.Label>
                    <Form.Select required>
                      <option value="">Selecione</option>
                      <option value="quente">Quente</option>
                      <option value="frio">Frio</option>
                      <option value="temperado">Temperado</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Orçamento Disponível (R$)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Digite seu orçamento"
                      required
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between">
                    <Button onClick={handlePreviousStep} style={{ backgroundColor: "black", border: "0px" }}>
                      Voltar
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? <Spinner animation="border" size="sm" /> : "Calcular Viagem"}
                    </Button>
                  </div>
                </Form>
              </>
            )}

            {result && (
              <div className="result mt-4">
                <h3 className="text-center">Sua Viagem dos Sonhos!</h3>
                <p>
                  <strong>Destino:</strong> {result.destination}
                </p>
                <p>
                  <strong>Mensagem:</strong> {result.message}
                </p>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
};

export default TravelCalculator;
