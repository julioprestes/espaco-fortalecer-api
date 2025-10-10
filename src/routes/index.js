import atividadeRoute from "./atividadeRoute.js";
import criancaRoute from "./criancaRoute.js";
import configuracaoRoute from "./configuracaoRoute.js";
import pictogramaRoute from "./pictogramaRoute.js";
import progressoRoute from "./progressoRoute.js";

function Routes(app) {
    atividadeRoute(app);
    criancaRoute(app);
    configuracaoRoute(app);
    pictogramaRoute(app);
    progressoRoute(app);
}

export default Routes;