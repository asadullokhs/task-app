const main = {
  home: async (req, res) => {
    const locals = {
      title: "NodeJS task | app",
      description: "Free NodeJS Task App",
    };

    res.render("index", { locals, layout: "../views/layouts/front-page" });
  },
  about: async (req, res) => {
    const locals = {
      title: "About NodeJS task | app",
      description: "Free NodeJS Task App",
    };

    res.render("about", { locals });
  },
  contact: async (req, res) => {
    const locals = {
      title: "Contact NodeJS task | app",
      description: "Free NodeJS Task App",
    };

    res.render("contact", { locals });
  },
  error: async (req, res) => {
    const locals = {
      title: "Error page task | app",
      description: "Free NodeJS Task App",
    };

    res.render("404", { locals });
  },
  sendMail: async (req, res) => {
    const { name, company, email, phone, message } = req.body;
    try {
      const config = {
        service: "gmail",
        auth: {
          user: "uzbdevit@gmail.com",
          pass: process.env.PASSWORD,
        },
      };

      let transporter = nodemailer.createTransport(config);

      const ouput = `
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${name}</li>
        <li>Company: ${company}</li>
        <li>Email: ${email}</li>
        <li>Phone: ${phone}</li>
        <li>Message: ${message}</li>
      </ul>
      `;

      const msg = {
        to: ["muhammadbilol1011@gmail.com", "faxrillo67@gmail.com"],
        from: "uzbdevit@gmail.com",
        subject: "Contact Request",
        text: "Mail is sent by Sendgrid App",
        html: ouput,
      };

      transporter.sendMail(msg);
      res.render("status");
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = main;
