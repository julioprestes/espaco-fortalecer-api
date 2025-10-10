import Cliente from "./ClienteModel.js";
import Emprestimo from "./EmprestimoModel.js";
import Usuario from "./UsuarioModel.js";
import Crianca from "./CriancaModel.js";
import Atividade from "./AtividadeModel.js";
import Progresso from "./ProgressoModel.js";
import Pictograma from "./PictogramaModel.js";
import Configuracao from "./ConfiguracaoModel.js";

(async () => {
    // Sincroniza modelos existentes. force:true usado apenas para desenvolvimento/exemplos
    await Usuario.sync({ force: true });
    await Crianca.sync({ force: true });
    await Atividade.sync({ force: true });
    await Progresso.sync({ force: true });
    await Pictograma.sync({ force: true });
    await Configuracao.sync({ force: true });
})();