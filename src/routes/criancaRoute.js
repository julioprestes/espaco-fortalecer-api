import criancaController from "../controllers/criancaController.js";

export default (app) => {
    app.get('/crianca', criancaController.get);
    app.get('/crianca/:id', criancaController.get);
    app.post('/crianca', criancaController.persist);
    app.patch('/crianca/:id', criancaController.persist);
    app.delete('/crianca/:id', criancaController.destroy);
}
