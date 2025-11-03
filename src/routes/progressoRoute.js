import progressoController from "../controllers/progressoController.js";

export default (app) => {
    app.get('/progresso', progressoController.get);
    app.get('/progresso/crianca/:idCrianca', progressoController.getProgressoPorCrianca);
    app.get('/progresso/:id', progressoController.get);
    app.post('/progresso', progressoController.persist);
    app.patch('/progresso/:id', progressoController.persist);
    app.delete('/progresso/:id', progressoController.destroy);
}
