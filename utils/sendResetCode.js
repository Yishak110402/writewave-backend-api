const nodemailer = require("nodemailer");

exports.sendEmail = async (options) => {
    const tempTransport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "9a18ce9582707b",
          pass: "47e9006524ec36"
        }
      });

      const gmailTransport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: "writewave.et@gmail.com",
          pass: "smjm vujd layn qlug",
        },
      });
    
  const mailOptions = {
    from: "WriteWave <writewave.et@gmail.com>",
    to: options.email,
    html: `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification</title>
        <style>
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                color: #5d4cff;
            }
            body{
                width:100vw;
                height: 100vh;
                background-color:#f7f7f7;
                padding: 0rem 4rem;
            }
            header h1{
               font-size: 3rem;
               font-family: cursive;
               color: #5d4cff;
            }
            main{
                padding-top: 3rem;
            }
            main h2{
                font-size: 3.5rem;
                font-family: "Helvetica";
                margin-bottom: 1.5rem;
            }
            main .code{
                font-size: 2rem;
                margin-bottom: 1rem;
            }
            main .notice{
                font-size: 0.9rem;
                font-style: italic;
            }
            @media(max-width: 1050px){
                main h2{
                    font-size: 2.5rem;
                }
            }
            @media(max-width:800px){
                body{
                    padding: 0rem 1rem ;
                }
                main h2{
                    font-size: 1.7rem;
                }
                .code{
                    font-size: 1.3rem;
                }
            }
            @media(max-width:500px){
                header h1{
                    font-size: 2rem;
                }
                main h2{
                    font-size: 1.2rem;
                }
                .code{
                    font-size: 1rem;
                }
            }
        </style>
    </head>
    <body>
        <header>
            <h1>Write Wave</h1>
        </header>
        <main>
            <h2>Hello, ${options.name}</h2>
            <p class="code">${options.verificationCode} is your password reset code </p>
            <p class="notice">If you didnt ask for a code please ignore this email</p>
        </main>
    </body>
    </html>`,
  };

  try {
    await gmailTransport.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
