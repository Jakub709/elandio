const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../../schemas/UserSchema");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

app.use(bodyParser.urlencoded({ extended: false }));

// Stránka s registrací
router.get("/", async (req, res, next) => {
  res.status(200).render("register", {
    errorMessage: "",
    name: "",
    username: "",
    email: "",
    github: "",
  });
});

// Registrace
router.post("/", async (req, res, next) => {
  try {
    // Potřebné proměnné
    const username = req.body.username.trim();
    const email = req.body.email.trim();
    // const emailDomena = email.split("@").pop();
    // const seznamDomen = [
    //   "seznam.cz",
    //   "mail.muni.cz",
    //   "gmail.com",
    //   "ilandio.cz",
    // ];
    const password = req.body.password;
    const passwordConf = req.body.passwordConf;
    const passwordLength = password.length;
    const payload = req.body;
    payload.counter = "";

    // Validace hesla
    if ((password === passwordConf) & (passwordLength >= 6)) {
      // Zjištění již existujícího uživatele
      const user = await User.findOne({
        $or: [{ username: username }, { email: email }],
      }).catch((error) => {
        payload.errormessage = "⚠ Něco se pokazilo :-(. Zkuste to znovu :-).";
        res.status(200).render("register", payload);
      });

      if (user == null) {
        // Uživatel nenalezen
        const data = req.body;
        data.password = await bcrypt.hash(password, 10);

        // Uživatel vytvořen
        User.create(data).then((user) => {
          req.session.user = user;
          //const id = req.session.user._id;

          // Potvrzovací email
          const emailText = `<b>iLandio Tě vítá!</b> <br><br> Pevně věřím, že ti projekt pomůže na tvé programátorské cestě a získáš díky němu nejen mnoho užitečných informací, ale i přátel. <br><br>
          Budeš-li něco potřebovat, můžeš mě kdykoliv kontaktovat buď skrze iLandio chat nebo přes email: info@ilandio.cz. Jakmile tvůj účet ověřím (do 24 hodin), budeš jej moci plně využívat (prozatím nemůžeš zasílat Educoiny a vytvářet příspěvky). Užij si svět sdíleného vzdělávání a těším se na viděnou :-).
          <br><br>Krásný den přeje <br> <b>Jakub</b>`;

          // const emailText = `<b>iLandio Tě vítá!</b> <br><br> Stačí kliknout na tento <a href=https://ilandio.cz/account-confirmed/${id}> odkaz</a> a tvůj účet bude aktivován. <br><br>Krásný den přeje <br> <b>Jakub</b>`;

          require("dotenv").config();
          const transporter = nodemailer.createTransport({
            host: "smtp.seznam.cz",
            auth: {
              user: "info@ilandio.cz",
              pass: process.env.PASSWORD,
            },
          });

          const mailOptions = {
            from: "info@ilandio.cz",
            to: email,
            subject: "Vítej v iLandiu ",
            html: emailText,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });

          // Email pro mě, pokud nový účet
          const nameUser = req.session.user.name;
          const idUser = req.session.user._id;
          const githubUser = req.session.user.github;
          const emailUser = req.session.user.email;

          const emailTextAdmin = `<b>V iLandiu je nový uživatel :-)</b> <br><br> Jméno a Příjmení: ${nameUser} <br>Profil: <a href=https://ilandio.cz/user-profile/${idUser}>${idUser}</a>  <br>GitHub:  <a href=https://github.com/${githubUser}>${githubUser}</a><br>Email: ${emailUser}<br>Aktivace účtu: <a href=https://ilandio.cz/account-confirmed/${idUser}>aktivovat</a> <br><br>Měj krásný den, <br> <b>Jakube :-)</b>`;

          const transporterAdmin = nodemailer.createTransport({
            host: "smtp.seznam.cz",
            auth: {
              user: "info@ilandio.cz",
              pass: process.env.PASSWORD,
            },
          });

          const mailOptionsAdmin = {
            from: "info@ilandio.cz",
            to: "uctyilandio@seznam.cz",
            subject: "Hurá, nový uživatel :-)",
            html: emailTextAdmin,
          };

          transporterAdmin.sendMail(mailOptionsAdmin, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
          return res.redirect("/after-reg");
        });
      } else {
        // Uživatel nalezen
        const email = req.body.email.trim();
        let errorMessage;
        if (email == user.email) {
          payload.errorMessage = "⚠ Email se již používá";
        } else {
          payload.errorMessage = "⚠ Uživatelské jméno se již používá";
        }
        res.status(200).render("register", payload);
      }

      // if (seznamDomen.includes(emailDomena)) {
      //   if (user == null) {
      //     // Uživatel nenalezen
      //     const data = req.body;
      //     data.password = await bcrypt.hash(password, 10);

      //     // Uživatel vytvořen
      //     User.create(data).then((user) => {
      //       req.session.user = user;
      //       const id = req.session.user._id;

      //       // Potvrzovací email
      //       const emailText = `<b>iLandio Tě vítá!</b> <br><br> Stačí kliknout na tento <a href=https://ilandio.cz/account-confirmed/${id}> odkaz</a> a tvůj účet bude aktivován. <br><br>Krásný den přeje <br> <b>Jakub</b>`;

      //       require("dotenv").config();
      //       const transporter = nodemailer.createTransport({
      //         host: "smtp.seznam.cz",
      //         auth: {
      //           user: "info@ilandio.cz",
      //           pass: process.env.PASSWORD,
      //         },
      //       });

      //       const mailOptions = {
      //         from: "info@ilandio.cz",
      //         to: email,
      //         subject: "Vítej v iLandiu ",
      //         html: emailText,
      //       };

      //       transporter.sendMail(mailOptions, function (error, info) {
      //         if (error) {
      //           console.log(error);
      //         } else {
      //           console.log("Email sent: " + info.response);
      //         }
      //       });
      //       return res.redirect("/after-reg");
      //     });
      //   } else {
      //     // Uživatel nalezen
      //     const email = req.body.email.trim();
      //     let errorMessage;
      //     if (email == user.email) {
      //       payload.errorMessage = "⚠ Email se již používá";
      //     } else {
      //       payload.errorMessage = "⚠ Uživatelské jméno se již používá";
      //     }
      //     res.status(200).render("register", payload);
      //   }
      // } else {
      //   payload.errorMessage =
      //     "⚠ Uveď prosím email instituce, která je do iLandia zapojena.";
      //   res.status(200).render("register", payload);
      // }
    } else {
      payload.errorMessage = "⚠ Hesla se musí shodovat a mít minimálně 6 znaků";
      res.status(200).render("register", payload);
    }
  } catch (err) {
    res.status(404).render("error");
  }
});
module.exports = router;
