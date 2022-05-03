let Preguntas_Azar = true;
let Juego_Finalizado = true;
let Reiniciar_Puntaje_Alcomienzo = true;

window.onload = function () {
  base_preguntas = readText('./quiz.json');
  interprete_bp = JSON.parse(base_preguntas);
  seleccionar_pregunta_azar();
};

let pregunta;
let respuestas_posibles;
btn_correspondiente = [
  select_id('btn1'),
  select_id('btn2'),
  select_id('btn3'),
  select_id('btn4'),
];
let npreguntas = [];

let preguntas_realizadas = 0;
let preguntas_correctas = 0;

function seleccionar_pregunta_azar() {
  let n;
  if (Preguntas_Azar) {
    n = Math.floor(Math.random() * interprete_bp.length);
  } else {
    n = 0;
  }

  while (npreguntas.includes(n)) {
    n++;
    if (n >= interprete_bp.length) {
      n = 0;
    }
    if (npreguntas.length == interprete_bp.length) {
      if (Juego_Finalizado) {
        swal.fire({
          title: 'Juego finalizado',
          text:
            'Puntuación: ' +
            preguntas_correctas +
            '/' +
            (preguntas_realizadas - 1),
          icon: 'success',
        });
      }
      if (Reiniciar_Puntaje_Alcomienzo) {
        preguntas_correctas = 0;
        preguntas_realizadas = 0;
      }
      npreguntas = [];
    }
  }
  npreguntas.push(n);
  preguntas_realizadas++;

  escogerPregunta(n);
}

function escogerPregunta(n) {
  pregunta = interprete_bp[n];
  select_id('categoria').innerHTML = pregunta.answer;
  select_id('pregunta').innerHTML = pregunta.question;
  select_id('numero').innerHTML = n;
  let pc = preguntas_correctas;
  if (preguntas_realizadas > 1) {
    select_id('puntaje').innerHTML = pc + '/' + (preguntas_realizadas - 1);
  } else {
    select_id('puntaje').innerHTML = '';
  }
  desordenarRespuestas(pregunta);
}
function desordenarRespuestas(pregunta) {
  respuestas_posibles = [
    pregunta.answers[0],
    pregunta.answers[1],
    pregunta.answers[2],
    pregunta.answers[3],
    pregunta.correct,
  ];

  select_id('btn1').innerHTML = respuestas_posibles[0];
  select_id('btn2').innerHTML = respuestas_posibles[1];
  select_id('btn3').innerHTML = respuestas_posibles[2];
  select_id('btn4').innerHTML = respuestas_posibles[3];
  select_id('categoria').innerHTML = respuestas_posibles[4];
}

let suspender_botones = false;

function oprimir_btn(i) {
  if (suspender_botones) {
    return;
  }
  suspender_botones = true;
  if (respuestas_posibles[i] === respuestas_posibles[4]) {
    preguntas_correctas++;
    btn_correspondiente[i].style.background = 'rgb(0,250,154)';
  } else {
    btn_correspondiente[i].style.background = 'rgb(235, 38, 81)';
  }
  for (let j = 0; j < 4; j++) {
    if (respuestas_posibles[j] == respuestas_posibles[4]) {
      btn_correspondiente[j].style.background = 'rgb(0,250,154)';
      break;
    }
  }
  setTimeout(() => {
    reiniciar();
    suspender_botones = false;
  }, 500);
}

function reiniciar() {
  for (const btn of btn_correspondiente) {
    btn.style.background = 'white';
  }
  seleccionar_pregunta_azar();
}

function select_id(id) {
  return document.getElementById(id);
}

function style(id) {
  return select_id(id).style;
}

function readText(ruta_local) {
  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', ruta_local, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    texto = xmlhttp.responseText;
  }
  return texto;
}
