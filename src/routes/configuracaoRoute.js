import configuracaoController from "../controllers/configuracaoController.js";

export default (app) => {
    app.get('/configuracao', configuracaoController.get);
    app.get('/configuracao/:id', configuracaoController.get);
    app.post('/configuracao', configuracaoController.persist);
    app.patch('/configuracao/:id', configuracaoController.persist);
    app.delete('/configuracao/:id', configuracaoController.destroy);
}
