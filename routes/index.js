// Création d'un router
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// page accueil
router.get("/", (req, res) => {
  res.render("pages/index.ejs");
});

// Route pour la page portfolio
router.get('/portfolio', (req, res) => {
  res.render('portfolio', { projects });
});

// Liste des projets avec leurs informations
const projects = [
  {
    id: 1,
    title: "Jeu de mémoire - JavaScript/HTML/CSS",
    image: "/images/memoire_index.png",
    video: "/images/memory.webm",
    description: "Jeu de mémoire programmé en JavaScript/HTML/CSS",
    descriptionId: "Le jeu de mémoire est un jeu basé sur le html5 et qui peut être joué sur n'importe quel appareil doté d'un navigateur web. Il utilise javascript et css3 pour créer une expérience amusante et divertissante. L'utilisateur choisi sont nombre de paires et le but du jeu est de faire correspondre ses paires de cartes. Si vous trouvez toutes les paires dans le temps alloué, vous gagnez la partie. Si le temps est écoulé et qu'il reste des cartes à découvrir, vous perdez la partie."
  },
  {
    id: 2,
    title: "Site web catalogue de film",
    image: "/images/projet2.png",
    video: "/images/projet2.webm",
    description: "Site simple pour consulter des films",
    descriptionId:"Découvrez un site web simple et convivial pour consulter un catalogue de films. Facilement navigable grâce à une structure HTML claire, vous trouverez rapidement le film que vous recherchez."
  },
  {
    id: 3,
    title: "Site Web : Voyage au Japon",
    image: "/images/projet3.png",
    video: "/images/projet3.webm",
    description: "Site simple pour consulter un voyage",
    descriptionId:"Un simple site web d'un voyage au Japon pour consulter les parcours et les destinations de départ. Il permet aussi d'envoyer un formulaire pour contacter les organisateurs du voyage."
  },
  {
    id: 4,
    title: "Croquis desing web - Figma",
    image: "/images/projet4.png",
    video: "/images/projet4.webm",
    description: "Maquette graphique d'un site web e-commerce",
    descriptionId:"Une maquette graphique est une étape essentielle dans la création d'un site e-commerce, car elle permet de visualiser en détail l'apparence et l'interface du site. Découvrez comment créer une maquette graphique efficace pour votre site e-commerce."
  }
];

// Route pour la page détails d'un projet
router.get('/portfolio/:id', (req, res) => {
  const id = req.params.id;
  var project = projects.find(p => p.id == id);
  res.render("pages/project", { project });
});


// page contact
router.get("/contact", (req, res) => {
  res.render("pages/contact.ejs");
});




/* A post request to the contact page. */
router.post("/contact",  (req, res) => {

  const name = req.body.name
  const email = req.body.email  
  const message = req.body.message


  /* Creating a transport object that will be used to send the email. */
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c7650186882a06",
      pass: "d8ad4d3a6f88e0"
    }
  })
  
  /* Creating an object with the email details. */
  var mailOptions = {
    
    from: req.body.email, 
    to: 'recipient-email@gmail.com',
    subject: 'Demande de support',
    text: req.body.message, 
    html: `Demande de soutien : <br><br> 
    <strong><u>Email :</u></strong> ${email}<br>
    <strong><u>Name :</u></strong> ${name}<br>
    <strong><u>Message :</u></strong><br> ${message}<br>`,
  }

  transport.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.status(500).send("Erreur lors du transfert du formulaire");
    }else{
      console.log('Formulaire envoyé: ' + info.response);
      res.render("pages/confirm")
    }
  })
})

exports.routes = router;