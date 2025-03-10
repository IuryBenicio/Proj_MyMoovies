const router = require("express").Router();

const MooviesController = require("../controllers/mooviesController");

router.post("/addlist", MooviesController.addListToUser);
router.post("/removelist", MooviesController.removeListfromUser);
router.get("/lists/:id", MooviesController.returnAllLists);
router.get("/alllists", MooviesController.returnLists);
router.post("/addmovie", MooviesController.addMoovieToList);
router.post("/removemovie", MooviesController.removeMoovieFromList);

module.exports = router;
