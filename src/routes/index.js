import atividadeRoute from "./atividadeRoute.js";
import criancaRoute from "./criancaRoute.js";
import configuracaoRoute from "./configuracaoRoute.js";
import pictogramaRoute from "./pictogramaRoute.js";
import progressoRoute from "./progressoRoute.js";

function Routes(app) {
    // Rota de teste/health check
    app.get('/health', (req, res) => {
        res.status(200).json({
            status: 'OK',
            message: 'API está funcionando!',
            timestamp: new Date().toISOString()
        });
    });

    atividadeRoute(app);
    criancaRoute(app);
    configuracaoRoute(app);
    pictogramaRoute(app);
    progressoRoute(app);
}

export default Routes;