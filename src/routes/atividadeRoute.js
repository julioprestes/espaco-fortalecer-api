import atividadeController from "../controllers/atividadeController.js";

export default (app) => {
    app.get('/atividade', atividadeController.get);
    app.get('/atividade/:id', atividadeController.get);
    app.post('/atividade', atividadeController.persist);
    app.patch('/atividade/:id', atividadeController.persist);
    app.delete('/atividade/:id', atividadeController.destroy);
}
