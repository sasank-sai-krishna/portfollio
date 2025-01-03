import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  padding : 60px;
  margin-bottom: 40px; /* Space between the card and footer */
  @media (max-width: 960px) {
    padding: opx 0px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 1350px;
  gap: 24px;
  @media (max-width: 960px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-align: center;
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
`;

const MessageContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -10%);
  background-color: ${({ success }) => (success ? 'lightgreen' : 'lightcoral')};
  padding: 12px 16px;
  border-radius: 12px;
  text-align: center;
  font-size: 16px;
  color: #fff;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 10px;
  display: ${({ show }) => (show ? 'block' : 'none')};
`;

const Contact = () => {
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_9lxhl9q', 'template_n52tp6b', form.current, 'Bk7ZtCqcXj1KBQE1X')
      .then(
        () => {
          setMessage('Email sent successfully!');
          setIsSuccess(true);
          setShowMessage(true);
          form.current.reset();
          setTimeout(() => setShowMessage(false), 1000); // Hide message after 1 second
        },
        () => {
          setMessage('Failed to send email. Please try again.');
          setIsSuccess(false);
          setShowMessage(true);
          setTimeout(() => setShowMessage(false), 1000); // Hide message after 1 second
        }
      );
  };

  return (
    <Container>
      <Wrapper>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput placeholder="Your Email" name="from_email" required />
          <ContactInput placeholder="Your Name" name="from_name" required />
          <ContactInput placeholder="Subject" name="subject" required />
          <ContactInputMessage placeholder="Message" rows="4" name="message" required />
          <ContactButton type="submit" value="Send" />
        </ContactForm>
      </Wrapper>
      <MessageContainer show={showMessage} success={isSuccess}>
        {message}
      </MessageContainer>
    </Container>
  );
};

export default Contact;
