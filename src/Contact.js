import styled from "styled-components";

const Contact = () => {
  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

  return (
    <Wrapper>
      <h2 className="common-heading">Contact Us</h2>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.4646836467996!2d77.29292317537809!3d28.555805825706727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce40e467fb8e5%3A0xd264f17227d96eb7!2sAbul%20Fazal%20Enclave%20Part%201%2C%20Part%201%20Abul%20Fazal%20Enclave%2C%20Block%20K%2C%20Jamia%20Nagar%2C%20Okhla%2C%20New%20Delhi%2C%20Delhi%20110025!5e0!3m2!1sen!2sin!4v1690016228528!5m2!1sen!2sin" 
      width="100%" 
      height="400" 
      style={{border:0}} 
      allowFullScreen="" 
      loading="lazy" 
      referrerPolicy="no-referrer-when-downgrade">
      </iframe>

      <div className="container ">
        <div className="contact-form">
          <form action="https://formspree.io/f/xoqovkqz" method="POST" className="contact-inputs">

            <input type="text" placeholder="username" required autoComplete="off" name="username"></input>

            <input type="email" placeholder="Email" required autoComplete="off" name="Email"></input>

            <textarea name="Message" required autoComplete="off" placeholder="Enter your message" cols="30" rows="10"></textarea>

            <input type="submit" value="Send"></input>
          </form>
        </div>
      </div>
    </Wrapper>
  )
};

export default Contact;
