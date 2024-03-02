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
};

module.exports = main;
