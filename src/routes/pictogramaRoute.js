import pictogramaController from "../controllers/pictogramaController.js";

export default (app) => {
    app.get('/pictograma', pictogramaController.get);
    app.get('/pictograma/:id', pictogramaController.get);
    app.post('/pictograma', pictogramaController.persist);
    app.patch('/pictograma/:id', pictogramaController.persist);
    app.delete('/pictograma/:id', pictogramaController.destroy);
}
