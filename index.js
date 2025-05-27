const codigoFuente = document.querySelector('#inputText');
const btnAnalizar = document.querySelector('#btnAnalizar');
const tbody = document.querySelector('#tablaTokens tbody');
const overlay = document.getElementById('loader-overlay');
let listaTokens = [];
const palabrasReservadas = ["func", "var", "if", "else", "for", "while", "int", "package", "import"];

// Clase Token que representa un token con su tipo, valor y posición en el código fuente
class Token {
    constructor(tipo, valor, posicion) {
    this.tipo = tipo;
    this.valor = valor;
    this.posicion = posicion;
    }
}

// Evento para el botón de analizar
btnAnalizar.addEventListener('click', () => {
    analizar();
    codigoFuente.value = "";
});


function analizar() {
    let i = 0;
    let resultado = null;
    while( i < codigoFuente.value.length) { 
        
        // Ignorar espacios en blanco, saltos de línea y tabulaciones
        if( codigoFuente.value[i] === ' ' || codigoFuente.value[i] === '\n' || codigoFuente.value[i] === '\t') {
            i++;
            continue; 
        }
        
        // Llamada a la función extraerNumeroReal, para verificar si el caracter actual es un número real.
        // La función retorna un objeto con la información del token encontrado o null si no se encontró un número real.
        resultado = extraerNumeroReal(i);
        if (resultado) {
            listaTokens.push(new Token("NUMERO REAL", resultado.valor, i));
            i = resultado.fin;
            continue;
        }
        
        // Llamada a  la función extraerEntero, para verificar si el caracter actual es un número entero.
        // La función retorna un objeto con la información del token encontrado o null si no se encontró un número entero.
        resultado = extraerEntero(i); 
        if (resultado) {  
            listaTokens.push(new Token("NUMERO", resultado.valor, i));
            i = resultado.fin;
            continue;
        }
        
        // Llamada a la función extraerPalabrasReservadas, para verificar si el caracter actual es una palabra reservada.
        // La función retorna un objeto con la información del token encontrado o null si no se encontró una palabra reservada.
        resultado = extraerPalabrasReservadas(i);
        if (resultado) {
            listaTokens.push(new Token("PALABRA RESERVADA", resultado.valor, i));
            i = resultado.fin;
            continue;
        }

        // Llamada a la función extraerComentarios, para verificar si el caracter actual es un comentario.
        // La función retorna un objeto con la información del token encontrado o null si no se encontró un comentario.
        resultado = extraerComentarios(i); 
        if (resultado) {
            listaTokens.push(new Token("COMENTARIO", resultado.valor, i));
            i = resultado.fin;
            continue
        }

        // Llamada a la función extraerIdentificador, para verificar si el caracter actual es un identificador.
        // La función retorna un objeto con la información del token encontrado o null si no se encontró un identificador.
        resultado = extraerIdentificador(i); 
        if (resultado) {
            listaTokens.push(new Token("IDENTIFICADOR", resultado.valor, i));
            i = resultado.fin;
            continue;
        }

        // Llamada a la función extraerOperadorIncrementoDecremento, para verificar si el caracter actual es un operador de incremento o decremento.
        // La función retorna un objeto con la información del token encontrado o null si no se encontró un operador de incremento o decremento.
        resultado = extraerOperadorIncrementoDecremento(i); 
        if (resultado) {
            listaTokens.push(new Token("OPERADOR INCREMENTO/DECREMENTO", resultado.valor, i));
            i = resultado.fin;
            continue;
        }

        // Llamada a la funcion extraerOperadorAsignacion, para verificar si el caracter actual es un operador de asignación.
        // La función retorna un objeto con la información del token encontrado o null si no se encontró un operador de asignación.
        resultado = extraerOperadorAsignacion(i); 
        if (resultado) {
            listaTokens.push(new Token("OPERADOR ASIGNACIÓN", resultado.valor, i));
            i = resultado.fin;
            continue
        }

        // Llamada a la función extraerOperadorAritmetico, para verificar si el caracter actual es un operador aritmético.
        // La función retorna un objeto con la información del token encontrado o null si no se encontró un operador aritmético.
        resultado = extraerOperadorAritmetico(i); 
        if (resultado) {
            listaTokens.push(new Token("OPERADOR ARITMÉTICO", resultado.valor, i));
            i = resultado.fin;
            continue;
        }

        // Llamada a la función extraerOperadorComparacion, para verificar si el caracter actual es un operador de comparación.
        // La función retorna un objeto con la información del token encontrado o null si no se encontró un operador de comparación.
        resultado = extraerOperadorComparacion(i);
        if (resultado) {
            listaTokens.push(new Token("OPERADOR COMPARACIÓN", resultado.valor, i));
            i = resultado.fin;
            continue;
        }

        // Llamada a la función extraerOperadorLogico, para verificar si el caracter actual es un operador lógico.
        // La función retorna un objeto con la información del token encontrado o null si no se encontró un operador lógico.
        resultado = extraerOperadorLogico(i); 
        if (resultado) {
            listaTokens.push(new Token("OPERADOR LÓGICO", resultado.valor, i));
            i = resultado.fin;
            continue;
        }

        // Llamada a la función extraerParentesis, para verificar si el caracter actual es un paréntesis.
        // La función retorna un objeto con la información del token encontrado o null si no se encontró un paréntesis.
        resultado = extraerParentesis(i); 
        if (resultado) {
            listaTokens.push(new Token("PARENTESIS", resultado.valor, i));
            i = resultado.fin;
            continue;
        }

        // Llamada a la función extraerLlaves, para verificar si el caracter actual es una llave.
        // La función retorna un objeto con la información del token encontrado o null si no se encontró una llave.
        resultado = extraerLlaves(i); 
        if (resultado) {
            listaTokens.push(new Token("LLAVE", resultado.valor, i));
            i = resultado.fin;
            continue
        }

        // Llamada a la función extraerComa, para verificar si el caracter actual es una coma.
        // La función retorna un objeto con la información del token encontrado o null si no se encontró una coma.
        resultado = extraerComa(i); 
        if (resultado) {
            listaTokens.push(new Token("COMA", resultado.valor, i));
            i = resultado.fin;
            continue; 
        }

        // Llamada a la función extraerCadenaCaracteres, para verificar si el caracter actual es una cadena de caracteres.
        // La función retorna un objeto con la información del token encontrado o null si no se encontró una cadena de caracteres.
        resultado = extraerCadenaCaracteres(i); 
        if (resultado) {
            listaTokens.push(new Token("CADENA DE CARACTERES", resultado.valor, i));
            i = resultado.fin;
            continue;
        }

        //token no reconocido
        listaTokens.push(new Token("NO RECONOCIDO", codigoFuente.value[i], i));
        i++;
    }

    // Mostrar los tokens en la tabla
    tbody.innerHTML = "";
    overlay.style.display = 'block';
    setTimeout(() => {
        overlay.style.display = 'none';
        mostrarTokens();
        listaTokens = []; 

    }, 2000);
    
}

// Función para reconocer un token como un entero
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

// Función para reconocer un token como un número real
function extraerNumeroReal(i) {

    // Verifica si el número real comienza con un signo negativo
    if( codigoFuente.value[i] === '-') {
       let numeroReal = '-';
        i++;
       if( codigoFuente.value[i] >= '0' && codigoFuente.value[i] <= '9') {
            while(i < codigoFuente.value.length && codigoFuente.value[i] >= '0' && codigoFuente.value[i] <= '9') {
                numeroReal += codigoFuente.value[i];
                i++;
            }   
            if (codigoFuente.value[i] === '.') {
                numeroReal += codigoFuente.value[i];
                i++;
                while(i < codigoFuente.value.length && codigoFuente.value[i] >= '0' && codigoFuente.value[i] <= '9') {
                    numeroReal += codigoFuente.value[i];
                    i++;
                }
            }
            return {valor: numeroReal, fin: i}
        }
    }else{
        if( codigoFuente.value[i] >= '0' && codigoFuente.value[i] <= '9') {
            let numeroReal = '';
            while(i < codigoFuente.value.length && codigoFuente.value[i] >= '0' && codigoFuente.value[i] <= '9') {
                numeroReal += codigoFuente.value[i];
                i++;
            }   
            if (codigoFuente.value[i] === '.') {
                numeroReal += codigoFuente.value[i];
                i++;
                while(i < codigoFuente.value.length && codigoFuente.value[i] >= '0' && codigoFuente.value[i] <= '9') {
                    numeroReal += codigoFuente.value[i];
                    i++;
                }
            }
            return {valor: numeroReal, fin: i}
        }
    }
}

//Función para reconocer un token como un identificador
function extraerIdentificador(i) {
    if( (codigoFuente.value[i] >= 'a' && codigoFuente.value[i] <= 'z') || (codigoFuente.value[i] >= 'A' && codigoFuente.value[i] <= 'Z') || codigoFuente.value[i] === '_') {
        let identificador = '';
        while(i < codigoFuente.value.length && ((codigoFuente.value[i] >= 'a' && codigoFuente.value[i] <= 'z') || (codigoFuente.value[i] >= 'A' && codigoFuente.value[i] <= 'Z') || (codigoFuente.value[i] >= '0' && codigoFuente.value[i] <= '9') || codigoFuente.value[i] === '_')) {
            if(i > 10) { 
                break;
            }
            identificador += codigoFuente.value[i];
            i++;
        }   
        return {valor: identificador, fin: i}
    }
}
//Función para reconocer un token como un operador aritmético
function extraerOperadorAritmetico(i) {
    if( codigoFuente.value[i] === '+' || codigoFuente.value[i] === '-' || codigoFuente.value[i] === '*' || codigoFuente.value[i] === '/') {
        let operador = codigoFuente.value[i];
        i++;
        return {valor: operador, fin: i}
    }
}
// Función para reconocer un token como un operador logico
function extraerOperadorLogico(i) {
    if( codigoFuente.value[i] === '!' || codigoFuente.value[i] === '&' && codigoFuente.value[i+1] === '&' || codigoFuente.value[i] === '||') {
        let operador = codigoFuente.value[i];
        i++;
        if (codigoFuente.value[i] === operador) { 
            operador += codigoFuente.value[i];
            i++;
        }
        return {valor: operador, fin: i}
    }
}
// Función para reconocer un token como un operador de asignación
function extraerOperadorAsignacion(i) {
    if( codigoFuente.value[i] === '=' && codigoFuente.value[i+1] != '=') {
        let operador = codigoFuente.value[i];
        i++;
        return {valor: operador, fin: i}
    }
    if( codigoFuente.value[i] === '+' && codigoFuente.value[i + 1] === '=') {
        let operador = '+=';
        i += 2; 
        return {valor: operador, fin: i}
    }
    if( codigoFuente.value[i] === '-' && codigoFuente.value[i + 1] === '=') {
        let operador = '-=';
        i += 2; 
        return {valor: operador, fin: i}
    }
    if( codigoFuente.value[i] === '*' && codigoFuente.value[i + 1] === '=') {
        let operador = '*=';
        i += 2; 
        return {valor: operador, fin: i}
    }
    if( codigoFuente.value[i] === '/' && codigoFuente.value[i + 1] === '=') {
        let operador = '/=';
        i += 2; 
        return {valor: operador, fin: i}
    }
}
// Función para reconocer un token como un operador de comparación
function extraerOperadorComparacion(i) {
    if( codigoFuente.value[i] === '=' && codigoFuente.value[i + 1] === '=') {
        let operador = '==';
        i += 2; 
        return {valor: operador, fin: i}
    }
    if( codigoFuente.value[i] === '!' && codigoFuente.value[i + 1] === '=') {
        let operador = '!=';
        i += 2; 
        return {valor: operador, fin: i}
    }
    if( codigoFuente.value[i] === '<' || codigoFuente.value[i] === '>' || codigoFuente.value[i] === '<=' || codigoFuente.value[i] === '>=') {
        let operador = codigoFuente.value[i];
        i++;
        if (codigoFuente.value[i] === '=') { 
            operador += codigoFuente.value[i];
            i++;
        }
        return {valor: operador, fin: i}
    }
}
// Función para reconocer un token como un operador de incremento o decremento
function extraerOperadorIncrementoDecremento(i) {
    if( codigoFuente.value[i] === '+' && codigoFuente.value[i+1] === '+' || codigoFuente.value[i] === '-' && codigoFuente.value[i+1] === '-') {
        let operador = codigoFuente.value[i] + codigoFuente.value[i + 1];
        i += 2; 
        return {valor: operador, fin: i}
    }
}
// Función para reconocer un token como un paréntesis o llave
function extraerParentesis(i) {
    if( codigoFuente.value[i] === '(' || codigoFuente.value[i] === ')') {
        let parentesis = codigoFuente.value[i];
        i++;
        return {valor: parentesis, fin: i}
    }
}
// Función para reconocer un token como una llave
function extraerLlaves(i) {
    if( codigoFuente.value[i] === '{' || codigoFuente.value[i] === '}') {
        let llave = codigoFuente.value[i];
        i++;
        return {valor: llave, fin: i}
    }
}
// Función para reconocer un token como una coma
function extraerComa(i) {
    if( codigoFuente.value[i] === ',') {
        let coma = codigoFuente.value[i];
        i++;
        return {valor: coma, fin: i}
    }
}
// Función para reconocer un token como una cadena de caracteres
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
            return {valor: '"' + cadena  + '"', fin: i}
        }
    }
}
// Función para reconocer un token como un comentario
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
// Función para reconocer un token como una palabra reservada
function extraerPalabrasReservadas(i) {
    if( (codigoFuente.value[i] >= 'a' && codigoFuente.value[i] <= 'z') || (codigoFuente.value[i] >= 'A' && codigoFuente.value[i] <= 'Z') || codigoFuente.value[i] === '_') {
        let keyword = '';
        while(i < codigoFuente.value.length && ((codigoFuente.value[i] >= 'a' && codigoFuente.value[i] <= 'z') || (codigoFuente.value[i] >= 'A' && codigoFuente.value[i] <= 'Z') || (codigoFuente.value[i] >= '0' && codigoFuente.value[i] <= '9') || codigoFuente.value[i] === '_')) {
            keyword += codigoFuente.value[i];
            i++;
        }   
        if (palabrasReservadas.includes(keyword)) {
            return {valor: keyword, fin: i}
        }
    }
    
}

// Función para mostrar los tokens en la tabla
function mostrarTokens() {
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