const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");

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

  //logout
  static async logoutUser(req, res) {
    req.logout((err) => {
      if (err) return next(err);
      req.session.destroy((err) => {
        if (err) return next(err);
        res.clearCookie("connect.sid"); // clear session cookie

        return res.json({ message: "Deslogado com sucesso" });
      });
    });
  }

  //Confirmar senha
  static async confirmPassword(req, res) {
    const id = req.params.id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Precisamos do campo senha",
      });
    }

    const user = await User.findById(id);

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return res.status(400).json({
        message: "Senha inválida",
      });
    }

    return res.status(200).json({ message: "Senha confere com o usuário" });
  }

  //Edita usuário
  static async editUser(req, res) {
    const { id } = req.params;
    const { name, email, userName } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "não conseguimos achar o id",
      });
    }

    // validações

    const user = await User.findById({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const userData = {
      userName: userName || user.userName,
      name: name || user.name,
      email: email || user.email,
    };

    try {
      return await User.findOneAndUpdate(
        { _id: userId },
        { $set: userData },
        { new: true }
      );
    } catch (err) {
      return res.status(500).json({ message: "Erro ao editar usuário" });
    }
  }

  //edita senha
  static async editPassword(req, res) {
    const { id } = req.params;
    const { password } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const samePassword = await bcrypt.compare(password, user.password);

    if (samePassword) {
      return res
        .status(400)
        .json({ message: "Senha não pode ser igual à atual" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      password: hashedPassword,
    };

    try {
      return await User.findOneAndUpdate(
        { _id: userId },
        { $set: userData },
        { new: true }
      );
    } catch (e) {
      return res.status(500).json({ message: "Erro ao editar senha" });
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;

    try {
      await User.findByIdAndDelete(id);
      return res.status(200).json({ message: "Conta deletada com sucesso" });
    } catch (error) {
      console.error(error);
      return false;
    }
  }
};
