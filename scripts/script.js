const form = document.getElementById('converterForm');
const valorInput = document.getElementById('valor');
const categoriaSelect = document.getElementById('categoria');
const unidadeOrigemSelect = document.getElementById('unidadeOrigem');
const unidadeDestinoSelect = document.getElementById('unidadeDestino');
const resultadoValor = document.getElementById('resultadoValor');

const unidades = {
    comprimento: ['metros', 'centimetros', 'polegadas'],
    peso: ['quilogramas', 'gramas', 'libras'],
    temperatura: ['Celsius', 'Fahrenheit', 'Kelvin']
};

// Preenche as opções de unidades de medida de acordo com a categoria selecionada
categoriaSelect.addEventListener('change', (e) => {
    const categoriaSelecionada = e.target.value;
    const unidadesSelecionadas = unidades[categoriaSelecionada];

    // Limpa as opções existentes
    unidadeOrigemSelect.innerHTML = '';
    unidadeDestinoSelect.innerHTML = '';

    // Adiciona as novas opções
    unidadesSelecionadas.forEach((unidade) => {
        const optionOrigem = document.createElement('option');
        optionOrigem.textContent = unidade;
        unidadeOrigemSelect.appendChild(optionOrigem);

        const optionDestino = document.createElement('option');
        optionDestino.textContent = unidade;
        unidadeDestinoSelect.appendChild(optionDestino);
    });
});

// Função para realizar a conversão
function converterMedida() {
    const valor = parseFloat(valorInput.value);
    const categoria = categoriaSelect.value;
    const unidadeOrigem = unidadeOrigemSelect.value;
    const unidadeDestino = unidadeDestinoSelect.value;

    if (isNaN(valor)) {
        resultadoValor.textContent = 'Insira um valor numérico.';
        return;
    }

    let resultado;

    // Realiza a conversão de acordo com a categoria selecionada
    switch (categoria) {
        case 'comprimento':
            resultado = converterComprimento(valor, unidadeOrigem, unidadeDestino);
            break;
        case 'peso':
            resultado = converterPeso(valor, unidadeOrigem, unidadeDestino);
            break;
        case 'temperatura':
            resultado = converterTemperatura(valor, unidadeOrigem, unidadeDestino);
            break;
        default:
            resultado = 'Selecione uma categoria válida.';
    }

    resultadoValor.textContent = `Resultado: ${resultado}`;
}

// Funções de conversão para cada categoria
function converterComprimento(valor, origem, destino) {
    const fatores = {
        metros: 1,
        centimetros: 100,
        polegadas: 39.3701
    };

    return valor * (fatores[destino] / fatores[origem]);
}

function converterPeso(valor, origem, destino) {
    const fatores = {
        quilogramas: 1,
        gramas: 1000,
        libras: 2.20462
    };

    return valor * (fatores[destino] / fatores[origem]);
}

function converterTemperatura(valor, origem, destino) {
    const celsiusToFahrenheit = (celsius) => (celsius * 9 / 5) + 32;
    const celsiusToKelvin = (celsius) => celsius + 273.15;

    const fatores = {
        Celsius: 1,
        Fahrenheit: celsiusToFahrenheit,
        Kelvin: celsiusToKelvin
    };

    const valorCelsius = origem === 'Celsius' ? valor : fatores[origem](valor);
    return destino === 'Celsius' ? valorCelsius : fatores[destino](valorCelsius);
}

// Evento de submit do formulário para a primeira conversão
form.addEventListener('submit', (e) => {
    e.preventDefault();
    converterMedida();
});

// Evento onchange para converter os valores automaticamente após a primeira vez
valorInput.addEventListener('change', () => {
    if (resultadoValor.textContent !== '-' && unidadeDestinoSelect.value !== '') {
        converterMedida();
    }
});

unidadeDestinoSelect.addEventListener('change', () => {
    if (resultadoValor.textContent !== '-' && unidadeDestinoSelect.value !== '') {
        converterMedida();
    }
});
