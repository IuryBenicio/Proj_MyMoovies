const User = require("../models/User");
const MoovieList = require("../models/UserMoovies");

module.exports = class MoovieListController {
  // Adiciona lista a um usuário
  static async addListToUser(req, res) {
    const { name, userId } = req.body;

    // validações
    if (!name || !userId) {
      return res.status(400).json({ message: "Faltam informações" });
    }

    const user = await User.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const newList = new MoovieList({ userId: userId, name: name });

    const listMoviesExist = await MoovieList.findOne({
      name: newList.name,
    }).where({ userId: userId });

    if (listMoviesExist) {
      return res
        .status(400)
        .json({ message: "Já existe uma lista com esse nome" });
    }

    try {
      newList.save();
      await User.findByIdAndUpdate(
        userId,
        { $push: { moovieLists: newList } },
        { new: true }
      );
      res.json({ message: "Lista de filmes adicionada com sucesso" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Erro ao adicionar lista de filmes ao usuário" });
    }
  }

  // Remove lista de um usuário
  static async removeListfromUser(req, res) {
    const { listId, userId } = req.body;

    // validações
    if (!listId || !userId) {
      return res.status(400).json({ message: "Faltam informações" });
    }

    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // const list = MoovieList.findById({ _id: listId });

    try {
      User.findByIdAndUpdate(
        userId,
        { $pull: { moovieLists: listId } }, // apagar lista
        { new: true, useFindAndModify: false }
      );
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao remover lista de filmes do usuário" });
    }
  }

  // Retorna todas as listas de um usuário
  static async returnAllLists(req, res) {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Faltam informações" });
    }

    const user = await User.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    try {
      res.json(user.moovieLists);
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar listas de filmes" + e.message });
    }
  }

  // Adiciona filme a uma lista de um usuário
  static async addMoovieToList(req, res) {
    const { listId, moovieId } = req.body;

    if (!listId || !moovieId) {
      return res.status(400).json({ message: "Faltam informações" });
    }

    const list = await MoovieList.findById(moovieId);

    if (!list) {
      return res
        .status(404)
        .json({ message: "Lista de filmes não encontrada" });
    }

    try {
      await list.findByIdAndUpdate(
        moovieId,
        { $push: { movies: moovieId } },
        { new: true }
      );
    } catch (e) {
      return res.status(500).json({
        message: "Erro ao adicionar filme à lista de filmes" + e.message,
      });
    }
  }

  // Remove filme de uma lista de um usuário
  static async removeMoovieFromList(req, res) {
    const { listId, moovieId, userId } = req.body;

    if (!listId || !moovieId) {
      return res.status(400).json({ message: "Faltam informações" });
    }

    const list = await MoovieList.findById(listId);

    if (!list) {
      return res
        .status(404)
        .json({ message: "Lista de filmes não encontrada" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    try {
      await list.findByIdAndUpdate(
        listId,
        { $pull: { movies: moovieId } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        userId,
        { $pull: { moovieLists: { movies: moovieId } } },
        { new: true, useFindAndModify: false }
      );
    } catch (err) {
      return res.status(500).json({
        message: "Erro ao remover filme da lista de filmes" + err.message,
      });
    }
  }
};
