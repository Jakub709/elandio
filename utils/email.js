//test nodemaileru
const emailList = ["tereza.gabajova@smarty.cz"];

const textEmail = `<b>Pěkný den,</b> <br><br> 
jmenuji se Jakub Solnička a jsem začínající programátor. Vaši firmu jsem nalezl na StartUpJobs a chtěl bych vás tímto emailem poprosit o zpětnou vazbu na projekt <a href=https://ilandio.cz>ilandio.cz</a> týkající se vzdělávání lidí v IT. Bylo by možné, aby se programátoři ve vaší firmě o mé stránce dozvěděli a poskytli mi kratičký feedback (ať už k technickému zpracování či k samotné myšlence)? 
<br><br> 
Středobodem iLandia jsou příspěvky ve formě nabídek a poptávek, v níž můžete nabízet (respektive poptávat) konzultace, skupinové kurzy, pomoc s kódováním, zkrátka cokoliv vás jenom napadne. Prostředkem směny mezi uživateli však nejsou skutečné peníze, nýbrž virtuální měna Educoin, kterou si lze vydělat pouze od ostatních uživatelů. Ekonomika iLandia funguje jako kterákoliv jiná, na základě nabídky a poptávky. Nikdo příspěvky nefiltruje a neschvaluje. Do začátku každý získá 500 Educoinů, aby se trh mohl pořádně rozeběhnout. V iLandiu tak vytvářím uzavřenou vzdělávací ekonomiku pro programátory a datové analytiky. Web je prozatím v testovací verzi, můžete se na něj přihlásit pod uživatelským jménem honza, heslo zní 123456. 
<br><br> 
Pokud vás stránky zaujaly, rád bych vás požádal o vyplnění níže uvedeného dotazníku (naleznete jej též na webu). Nebojte, je velice krátký, obsahuje pouze dotaz na email a prostor pro váš komentář. 
<br><br> 
<a href=https://docs.google.com/forms/d/e/1FAIpQLSd3IjrhuoJS2I7jZD2_lHlwn1z82QShke_zZQV21zlSotaawQ/viewform>https://docs.google.com/forms/d/e/1FAIpQLSd3IjrhuoJS2I7jZD2_lHlwn1z82QShke_zZQV21zlSotaawQ/viewform</a> 
<br><br> 
Předem moc děkuji za podporu. 
<br><br> 
S pozdravem <br><br> <b>Jakub Solnička</b>
<br>`;

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  //host: "smtp.seznam.cz",
  service: "gmail",
  auth: {
    user: "solnickajakub@gmail.com",
    pass: process.env.PASSWORDGMAIL,
  },
});

for (let rep = 0; rep <= 0; rep++) {
  const mailOptions = {
    from: "solnickajakub@gmail.com",
    to: emailList[rep],
    subject: "Prosba o zpětnou vazbu od programátorů",
    html: textEmail,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
