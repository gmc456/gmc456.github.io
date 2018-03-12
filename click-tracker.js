/*
Declaramos un array asociativo observedElements que funciona como un Mapa.
Las claves son los identificadores de los elementos que observamos y el valor
es el número de clics realizado sobre dicho elemento (inicializado a cero).
*/
var observedElements = {
  'web-ual': 0,
  'web-informatica': 0,
  'web-negocio': 0,
  'button-login': 0,
  'tema-nfc': 0,
  'tema-bitcoin': 0,
  'tema-seo': 0,
  'fuente-nfc': 0,
  'fuente-bitcoin': 0,
  'fuente-seo': 0,
  'rrss-twitter': 0,
  'rrss-facebook': 0,
  'rrss-instagram': 0
};

/*
La función obtiene el elemento sobre el que se ha hecho clic y, si su
identificador está en observedElements, incrementa su contador.
*/
document.onclick = function (e) {
  var clickedElement = (window.event) ?
    window.event.srcElement :
    e.target,
    tags = document.getElementsByTagName(clickedElement.tagName);

  var elementId = clickedElement.id;

  if (elementId in observedElements) {
    observedElements[elementId]++;

    // Línea para comprobar correcto funcionamiento
    // alert(elementId + " clicks: " + observedElements[elementId]);
  }
};

/*
Función ejecutada cuando el usuario cierra la página. Su objetivo es 'parsear'
la información sobre los clicks (además de la url y la fecha actuales) en
formato JSON y enviarlo al servidor mediante un POST request.
*/
window.onbeforeunload = function () {
  var data = '{' +
    '"url" : ' + window.location.href + ',' +
    '"fecha" : ' + new Date().toLocaleDateString() + ',' +
    '"datos" : ' + JSON.stringify(observedElements) +
    '}';

  // Sending and receiving data in JSON format using POST method
  var xhr = new XMLHttpRequest();
  var url = "https://requestb.in/1nt5x141";
  // http://83.57.160.179:5010";

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");

  xhr.send(data);
};
