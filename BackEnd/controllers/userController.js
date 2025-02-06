const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

module.exports = class UserController {
  //register
  static async registerUser(req, res) {
    const { name, userName, email, password } = req.body;

    //VALIDAÇÕES

    if (!userName || !name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos precisam ser preenchidos" });
    }

    const userNameExists = await User.findOne({ userName: userName });

    if (userNameExists) {
      return res.status(400).json({ message: "Nome de usuário já existe" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "E-mail já cadastrado" });
    }

    // encriptar senha

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    //Salvar usuário

    const user = new User({ name, userName, email, password: hashedPassword });

    try {
      await user.save();
      res.status(201).json({
        message: "Usuário criado com sucesso",
        data: user,
      });
    } catch (e) {
      console.error(error);
      return res.status(400).json({ message: "falha ao registrar" });
    }
  }
  //login
  static async loginUser(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return res.status(500).json({ message: "Erro interno no servidor" });
      }
      if (!user) {
        return res
          .status(401)
          .json({ message: info.message || "Usuário ou senha inválidos" });
      }

      // Faz login do usuário e cria a sessão
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Falha ao iniciar sessão" });
        }

        // Remove informações sensíveis antes de enviar ao frontend
        const { password, ...userData } = user.toObject();

        return res.json({
          message: "Login realizado com sucesso",
          data: userData,
        });
      });
    })(req, res, next);
  }

  static async logout() {
    req.logout();
    res.status(400).json({ message: "Deslogado com sucesso" });
  }
};
