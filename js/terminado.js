var Terminado = {
  preload: function () {
    //cargar los elementos
    juego.load.image("nave", "img/nave.png");
    juego.load.image("bala", "img/bala.png");
    juego.load.image("malo", "img/malo.png");
    juego.load.image("fondo", "img/fondo.png");
  },
  create: function () {
    //color pantalla termino
    juego.add.text(40, 230, "GAME OVER ", { font: "50px Arial", fill: "#FFF" });
    juego.state.backgroundColor = "#962813";
    if (confirm("¿Desea continuar el juego?")) {
      juego.state.start("Iniciar");
    }
  },
};
