const codigoFuente = document.querySelector('#inputText');
const btnAnalizar = document.querySelector('#btnAnalizar');
const tbody = document.querySelector('#tablaTokens tbody');
let listaTokens = [];


btnAnalizar.addEventListener('click', () => {
    analizar();
    codigoFuente.value = "";
});

function analizar() {
    let i = 0;
    let resultado = null;
    while( i < codigoFuente.value.length) { 
        
        if( codigoFuente.value[i] === ' ' || codigoFuente.value[i] === '\n' || codigoFuente.value[i] === '\t') {
            i++;
            continue; 
        }
        
        resultado = extraerEntero(i); 
        if (resultado) {
            listaTokens.push({
                tipo: "NUMERO",
                valor: resultado.valor,
                posicion: i
            });
            i = resultado.fin;
        }

        resultado = extraerIdentificador(i); 
        if (resultado) {
            listaTokens.push({
                tipo: "IDENTIFICADOR",
                valor: resultado.valor,
                posicion: i
            });
            i = resultado.fin;
        }

        resultado = extraerOperadorAritmetico(i); 
        if (resultado) {
            listaTokens.push({
                tipo: "OPERADOR ARITMETICO",
                valor: resultado.valor,
                posicion: i
            });
            i = resultado.fin;
        }

        resultado = extraerOperadorLogico(i); 
        if (resultado) {
            listaTokens.push({
                tipo: "OPERADOR LOGICO",
                valor: resultado.valor,
                posicion: i
            });
            i = resultado.fin;
        }

        resultado = extraerOperadorAsignacion(i); 
        if (resultado) {
            listaTokens.push({
                tipo: "OPERADOR ASIGNACION",
                valor: resultado.valor,
                posicion: i
            });
            i = resultado.fin;
        }

        resultado = extraerOperadorIncrementoDecremento(i); 
        if (resultado) {
            listaTokens.push({
                tipo: "OPERADOR INCREMENTO/DECREMENTO",
                valor: resultado.valor,
                posicion: i
            });
            i = resultado.fin;
        }

        resultado = extraerParentesis(i); 
        if (resultado) {
            listaTokens.push({
                tipo: "PARÉNTESIS",
                valor: resultado.valor,
                posicion: i
            });
            i = resultado.fin;
        }

        resultado = extraerLlaves(i); 
        if (resultado) {
            listaTokens.push({
                tipo: "LLAVE",
                valor: resultado.valor,
                posicion: i
            });
            i = resultado.fin;
        }

        resultado = extraerComa(i); 
        if (resultado) {
            listaTokens.push({
                tipo: "COMA",
                valor: resultado.valor,
                posicion: i
            });
            i = resultado.fin;
        }

        resultado = extraerCadenaCaracteres(i); 
        if (resultado) {
            listaTokens.push({
                tipo: "CADENA DE CARACTERES",
                valor: resultado.valor,
                posicion: i
            });
            i = resultado.fin;
        }

        resultado = extraerComentarios(i); 
        if (resultado) {
            listaTokens.push({
                tipo: "COMENTARIO",
                valor: resultado.valor,
                posicion: i
            });
            i = resultado.fin;
        }




        
        
    }

    mostrarTokens();
    listaTokens = []; 

}


function extraerEntero(i) {
    if( codigoFuente.value[i] >= '0' && codigoFuente.value[i] <= '9') {
        let entero = '';
        while(i < codigoFuente.value.length && codigoFuente.value[i] >= '0' && codigoFuente.value[i] <= '9') {
            entero += codigoFuente.value[i];
            i++;
        }   
        return {valor: entero, fin: i}
    }
}

function extraerIdentificador(i) {
    if( (codigoFuente.value[i] >= 'a' && codigoFuente.value[i] <= 'z') || (codigoFuente.value[i] >= 'A' && codigoFuente.value[i] <= 'Z') || codigoFuente.value[i] === '_') {
        let identificador = '';
        while(i < codigoFuente.value.length && ((codigoFuente.value[i] >= 'a' && codigoFuente.value[i] <= 'z') || (codigoFuente.value[i] >= 'A' && codigoFuente.value[i] <= 'Z') || (codigoFuente.value[i] >= '0' && codigoFuente.value[i] <= '9') || codigoFuente.value[i] === '_')) {
            identificador += codigoFuente.value[i];
            i++;
        }   
        return {valor: identificador, fin: i}
    }
}

function extraerOperadorAritmetico(i) {
    if( codigoFuente.value[i] === '+' || codigoFuente.value[i] === '-' || codigoFuente.value[i] === '*' || codigoFuente.value[i] === '/') {
        let operador = codigoFuente.value[i];
        i++;
        return {valor: operador, fin: i}
    }
}

function extraerOperadorLogico(i) {
    if( codigoFuente.value[i] === '!' || codigoFuente.value[i] === '&' || codigoFuente.value[i] === '|') {
        let operador = codigoFuente.value[i];
        i++;
        if (codigoFuente.value[i] === operador) { // Verifica si es un operador lógico de dos caracteres
            operador += codigoFuente.value[i];
            i++;
        }
        return {valor: operador, fin: i}
    }
}

function extraerOperadorAsignacion(i) {
    if( codigoFuente.value[i] === '=') {
        let operador = codigoFuente.value[i];
        i++;
        return {valor: operador, fin: i}
    }
}

function extraerOperadorIncrementoDecremento(i) {
    if( codigoFuente.value[i] === '++' || codigoFuente.value[i] === '--') {
        let operador = codigoFuente.value[i];
        i++;
        return {valor: operador, fin: i}
    }
}

function extraerParentesis(i) {
    if( codigoFuente.value[i] === '(' || codigoFuente.value[i] === ')') {
        let parentesis = codigoFuente.value[i];
        i++;
        return {valor: parentesis, fin: i}
    }
}

function extraerLlaves(i) {
    if( codigoFuente.value[i] === '{' || codigoFuente.value[i] === '}') {
        let llave = codigoFuente.value[i];
        i++;
        return {valor: llave, fin: i}
    }
}

function extraerComa(i) {
    if( codigoFuente.value[i] === ',') {
        let coma = codigoFuente.value[i];
        i++;
        return {valor: coma, fin: i}
    }
}

function extraerCadenaCaracteres(i) {
    if( codigoFuente.value[i] === '"') {
        let cadena = '';
        i++; // Saltar el primer "
        while(i < codigoFuente.value.length && codigoFuente.value[i] !== '"') {
            cadena += codigoFuente.value[i];
            i++;
        }
        if (i < codigoFuente.value.length && codigoFuente.value[i] === '"') { // Verifica si se encontró el cierre de la cadena
            i++; // Saltar el último "
            return {valor: cadena, fin: i}
        }
    }
}

function extraerComentarios(i) {
    if( codigoFuente.value[i] === '/' && codigoFuente.value[i + 1] === '/') {
        let comentario = '';
        i += 2; // Saltar los dos primeros caracteres //
        while(i < codigoFuente.value.length && codigoFuente.value[i] !== '\n') {
            comentario += codigoFuente.value[i];
            i++;
        }
        return {valor: comentario, fin: i}
    } else if (codigoFuente.value[i] === '/' && codigoFuente.value[i + 1] === '*') {
        let comentario = '';
        i += 2; // Saltar los dos primeros caracteres /*
        while(i < codigoFuente.value.length && !(codigoFuente.value[i] === '*' && codigoFuente.value[i + 1] === '/')) {
            comentario += codigoFuente.value[i];
            i++;
        }
        if (i < codigoFuente.value.length) { // Verifica si se encontró el cierre del comentario
            i += 2; // Saltar los dos últimos caracteres */
            return {valor: comentario, fin: i}
        }
    }
}


function mostrarTokens() {
    tbody.innerHTML = "";

    listaTokens.forEach(token => {
      const fila = document.createElement('tr');

      const tdTipo = document.createElement('td');
      tdTipo.textContent = token.tipo;

      const tdValor = document.createElement('td');
      tdValor.textContent = token.valor;

      const tdPosicion = document.createElement('td');
      tdPosicion.textContent = token.posicion;

      fila.appendChild(tdTipo);
      fila.appendChild(tdValor);
      fila.appendChild(tdPosicion);

      tbody.appendChild(fila);
    });
}