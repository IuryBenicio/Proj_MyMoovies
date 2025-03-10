const User = require("../models/User");
const MoovieList = require("../models/UserMoovies");

module.exports = class MoovieListController {
  // Adiciona lista a um usuário
  static async addListToUser(req, res) {
    const { name, userId } = req.body;
    var { description } = req.body;

    // validações
    if (!name || !userId) {
      return res.status(400).json({ message: "Faltam informações" });
    }

    if (!description) {
      const stringVazia = "...";
      description = stringVazia;
    }

    const user = await User.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const newList = new MoovieList({
      userId: userId,
      description: description,
      name: name,
    });

    const listMoviesExist = await MoovieList.findOne({
      name: newList.name,
    }).where({ userId: userId });

    if (listMoviesExist) {
      return res
        .status(400)
        .json({ message: "Já existe uma lista com esse nome" });
    }

    try {
      await newList.save();
      const idList = newList._id;
      await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            moovieLists: {
              _id: idList._id,
              name: newList.name,
              description: newList.description,
            },
          },
        },
        { new: true }
      );
      return res.json({ message: "Lista de filmes adicionada com sucesso" });
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
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Faltam informações" });
    }

    const user = await User.findById({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    try {
      res.json({ data: user.moovieLists });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar listas de filmes" + e.message });
    }
  }

  // Restorna lista do banco de dados da lista
  static async returnLists(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Faltam informações" });
    }

    const lists = [];

    try {
      await lists.push(MoovieList.find({ userId: id }));
      return res.status(200).json({
        data: lists,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar listas de filmes" + err.message });
    }
  }

  // Adiciona filme a uma lista de um usuário
  static async addMoovieToList(req, res) {
    const { listId, moovieId, moovieName, poster_path } = req.body;

    if (!listId || !moovieId || !moovieName || !poster_path) {
      return res.status(400).json({ message: "Faltam informações" });
    }

    const list = await MoovieList.findById(listId);

    if (!list) {
      return res
        .status(404)
        .json({ message: "Lista de filmes não encontrada" });
    }

    const movie = list.moovieList.filter((item) => item.movieId === moovieId);

    if (movie.length > 0) {
      return res
        .status(404)
        .json({ message: "Filme já pertence a esta lista" });
    }

    const newMovie = {
      movieId: moovieId,
      title: moovieName,
      poster_path: `https://image.tmdb.org/t/p/w500${poster_path}`,
    };

    list.moovieList.push(newMovie);

    try {
      await list.save();
      return res.json({
        message: "Filme adicionado à lista de filmes com sucesso",
      });
    } catch (e) {
      return res.status(500).json({
        message: "Erro ao adicionar filme à lista de filmes " + e.message,
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
