// Div Contenedores
let divPreguntasDinamicas = document.querySelector(".preguntas-dinamicas");
let welcome = document.querySelector(".welcome");
// let divBienvenida = document.querySelector(".bienvenida");
// Formularios
let formCategorias = document.querySelector("#categoria");
//formulario abuelo
let formPreguntasDinamicas = document.querySelector("#preguntas-dinamicas");
let divPuntaje = document.querySelector(".puntaje");
let divReloj = document.querySelector(".reloj");


let limpiarTodo = false;
let respuestaSeleccionada = {
  a : "",
  b : "",
  c : ""
} ;

let ke = [];
let respCorr = [];
let cont = 0;
let puntaje = 0;
let usuarioNuevo ="";
let id ; 
let tiempoReloj = 30;

rellenarSelectCategorias();

function validarDatosBienvenida(categoriaSeleccionada){
  if(usuarioNuevo == ""){
    alert("Debes ingresar tu nombre")
    return false
  }
  if(categoriaSeleccionada == ""){
    alert("Debes seleccionar una categoría")
    return false
  }
  return true;
}

function opcionesSeleccionadas(){

  let a = ke[0];
  let b = ke[1];
  let c = ke[2];

  respuestaSeleccionada.a = document.querySelector(`input[name=${a}]:checked`) ?document.querySelector(`input[name=${a}]:checked`).value : "";

  respuestaSeleccionada.b = document.querySelector(`input[name=${b}]:checked`) ?document.querySelector(`input[name=${b}]:checked`).value : "";

  respuestaSeleccionada.c = document.querySelector(`input[name=${c}]:checked`) ?document.querySelector(`input[name=${c}]:checked`).value : "";

  console.log(respuestaSeleccionada);
  console.log("opciones seleccioanadas")
  console.log(respuestaSeleccionada);
  for (const property in respuestaSeleccionada) {
    if(respuestaSeleccionada[property] == ""){
      return false
      }
  }
  return true
}

function rellenarSelectCategorias(){
  tiempoReloj = 30;
  let divRadioButton = document.createElement("div");
  
  let innerHtml = "";
  let button = `<input type="button" id="empezar" value="Empezar">`
    categorias.forEach(e => {
      innerHtml += ` 
          <label>
              <input type="radio" name="nombre" value=${e.nombre}> ${e.nombre}
          </label><br><br>
          `
      divRadioButton.innerHTML = innerHtml + button;
      formCategorias.appendChild(divRadioButton);
    })

  //Escuchamos el evento click del botón empezar
  document.querySelector("#empezar").addEventListener('click', evt => {
      
      limpiarReloj();
      tiempoReloj = 30;
      
      //Mostramos el div de las preguntas dinamicas
      divPreguntasDinamicas.classList.remove("habilitado")
      //Capturamos el valor del input
      usuarioNuevo = document.querySelector("#usuario").value;
      //Capturamos el valor del radio button de la categoria
      let categoriaSeleccionada = document.categoria.nombre.value;
      //validar que ingreso nombre y selecciono categoria
      let validacionDatosCompletos = validarDatosBienvenida(categoriaSeleccionada);

      if(validacionDatosCompletos){
         //funcion pinte las preguntas
        mostrarPreguntas(usuarioNuevo, categoriaSeleccionada);
        // mostramos reloj
        contarTiempo();
      }
     
      limpiarTodo = true;
    })
}

function mostrarPreguntas(u, c){
  //ocultamos el div de ventana de inicio
  welcome.classList.add("habilitado");

  //creamos un div que es el hijo del formulario. Tiene 2 hijos.
  let divHijoFomularioPreguntasDimicas = document.createElement("div");
  // creamos div de bienvenida con  nombre de usuario. Nieto 1 del formulario
  let divBienvenida = document.createElement('div')
  // creamos un div que contiene las preguntas. Nieto 2 del formulario
  let divPreguntasCategoria = document.createElement('div');

  //h1 y h2 para darle la bienvenida al usuario y mostrar la seleccion de su categoria
  let h1 = document.createElement("h1");
      h1.textContent = `Bienvenid@ ${u}`;
  let h2 = document.createElement("h2");
      h2.innerHTML = `Seleccionaste la Categoría: "${c}"`;

  //agregamos el h1 y h2 
      divBienvenida.appendChild(h1)
      divBienvenida.appendChild(h2)  

  //div del fomulario de las preguntas dinamicas
  let innerHtml="";
  let button = `<input type="button" id="finalizar" value="Finalizar">`

  //iterar en las categorias y pintarlas en index.html
  categorias.forEach(categoria =>{
      //validamos la categoria seleccionada
      if (categoria.nombre == c){
          //iterar en las preguntas y pintarlas en index.html
          categoria.preguntas.forEach(pregunta => {
              console.log(pregunta.question)
                //concatenar las preguntas
              innerHtml += ` 
                <fieldset>
                  <legend>${pregunta.question}</legend>
                `
              //array con los key de las preguntas
              ke.push(pregunta.key);

              //array con las respuestas correctas
              respCorr.push(pregunta.respuesta);

              //iterar en las opciones y pintarlas en index.html
              pregunta.opciones.forEach(opcion => {
                //concateno las opciones
                innerHtml += ` 
                  <br>
                  <label>
                      <input type="radio" name=${pregunta.key} value=${opcion.id}> ${opcion.description}
                  </label><br>
                  `
                  console.log(opcion.description)
              })
                  innerHtml += ` 
                  <br>
                  </fieldset>`
          }) 
         
        //agregamos con innerHtml las iteraciones y el botom de Finalizar
        divPreguntasCategoria.innerHTML = innerHtml + button;
        //agregamos los dos nietos al padre
        divHijoFomularioPreguntasDimicas.appendChild(divBienvenida);
        divHijoFomularioPreguntasDimicas.appendChild(divPreguntasCategoria);
        //agregamos el padre al abuelo
        formPreguntasDinamicas.appendChild(divHijoFomularioPreguntasDimicas);
      }
  })

  //Escuchar el evento click del botón finalizar
  //# para el id de las etiquetas i el . es para la clase
    document.querySelector("#finalizar").addEventListener("click", e => {
        let validacionOpciones;
        validacionOpciones = opcionesSeleccionadas();
        console.log("validacion de opciones:" , validacionOpciones)
         
        cont = 0;

        //Validacion para jugar de nuevo. 
        divPuntaje.classList.contains("habilitado") ? divPuntaje.classList.remove("habilitado") : limpiarTodo = true; 

        
         if(tiempoReloj >= 0 && validacionOpciones){
           if(divReloj.firstChild){
                divReloj.removeChild(divReloj.firstChild);
            } 
                  //aun tienes tiempo y seleccionaste todas las opciones
            tiempoReloj = 0;
            clearInterval(id);
            //validacion de respuestas
            validarRptas();

            //imprimir puntaje y total de respuestas correctas
            mostrarPuntaje();

            //agrgamos una clase que oculte div de Preguntas Dinamicas
            divPreguntasDinamicas.classList.add("habilitado")
            return;
         }
         if(tiempoReloj >= 0 && !validacionOpciones){
           alert("Debes de escoger las opciones");

           return
         } 


        
    })

}

function validarRptas(){
      if(respuestaSeleccionada.a == respCorr[0]){
        cont++;
      }
      if (respuestaSeleccionada.b == respCorr[1]){
        cont++;
      }
      if (respuestaSeleccionada.c == respCorr[2]){
        cont++;
      }
      console.log(cont);
      puntaje = 10*cont;
      console.log(puntaje);
      return cont
}

function mostrarPuntaje(){
  // crear el boton Jugar de Nuevo
  let button = document.createElement('button')
      button.textContent = "Volver a Jugar"
      button.setAttribute("id", "volverJugar");

  //creando el div hijo de divPuntaje
  let divMostrarPuntaje = document.createElement("div");

  //creamos un elemento parrafo para mostrar el puntaje
  let p = document.createElement("p");
      p.innerHTML = `!!! HAZ TERMINADO EL RETO !!! <br><br>
        Tienes ${cont} respuestas correctas <br> 
        Tu puntaje es de ${puntaje} puntos !!!<br><br> 
        `;
  //agregamos la etiqueta p al div hijo de puntaje
  divMostrarPuntaje.appendChild(p);

  //agregar el boton Jugar de Nuevo div hijo de puntaje
  divMostrarPuntaje.appendChild(button)

  //agregamos hijo divMostrarPuntaje en padre divPuntaje
  divPuntaje.appendChild(divMostrarPuntaje);

  // escuhamos el evento click del button Volver a Jugar para volver a empezar
  document.querySelector("#volverJugar").addEventListener('click', evt => {
  
      //elimino el div de inicial: usiario y categorias
      limpiarCategoria();

      //eliminar todos los hijos de preguntas y puntaje
      limpiarTodoHijos();
      
      //Mostramos u ocultamos las clases 
      mostrarContenido();
  })
}

//elimino el div de inicial: usiario y categorias
function limpiarCategoria(){
  //para volver a jugar elimino todo el div inicial generado previamente
  while(formCategorias.firstChild){
    formCategorias.removeChild(formCategorias.firstChild);
  }
}

// elimino el div de preguntas y puntaje
function limpiarTodoHijos(){
  limpiarPreguntas();
  limpiarPuntaje();
 
}

function limpiarPreguntas(){
  //eliminar el div de preguntas dinamicas generado previamente
  while(formPreguntasDinamicas.firstChild){
    formPreguntasDinamicas.removeChild(formPreguntasDinamicas.firstChild);
  }
}
function limpiarReloj(){

  //
  console.log("Limpiando reloj")
  while(divReloj.firstChild){
    divReloj.removeChild(divReloj.firstChild);
  }
}

function limpiarPuntaje(){
   //eliminar el div de puntaje generado previamente
  while(divPuntaje.firstChild){
    divPuntaje.removeChild(divPuntaje.firstChild);
  }
}

function mostrarContenido() {

  //resetear los valores originales
  ke = [];
  respuestaSeleccionada = {
      a : "",
      b : "",
      c : ""
    } ;
   respCorr= [];
   document.querySelector("#usuario").value = "";
  
  //mostramos la vista incial
   welcome.classList.remove("habilitado");

   //ocultamos el div de preguntas dinamicas
   divPreguntasDinamicas.classList.add("habilitado")

   //ocultamos el div de puntaje 
   divPuntaje.classList.add("habilitado");

  //llamamos a la funcion incial para comenzar a jugar   
   rellenarSelectCategorias();
    
}

function mostrarReloj(){
  let divChilreloj = document.createElement('div');
  let p = document.createElement('p');
  let span = document.createElement('span');
  p.textContent = tiempoReloj;
  span.textContent = "s"
  p.appendChild(span);
  divChilreloj.appendChild(p);
  divReloj.appendChild(divChilreloj);  
}

function contarTiempo(){
  mostrarReloj();
  id = setInterval(() =>{ 
   
    
    if(divReloj.firstChild){
      divReloj.removeChild(divReloj.firstChild);
    }
    if(tiempoReloj === 0 ){
      limpiarTodoHijos();
      welcome.classList.remove("habilitado");
      limpiarCategoria();
      rellenarSelectCategorias();
      document.querySelector("#usuario").value="";
      limpiarReloj();
      clearInterval(id);
    }
    
    mostrarReloj();
    
    tiempoReloj--;
   
    console.log(tiempoReloj);
    ////
    }, 1000);
   
}












