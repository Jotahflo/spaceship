var nave;
var balas;
var malos;
var timer = 0;
var delay = 400;
var aparecer;
var fondoJuego;
var puntos;
var vidas;
var txtPuntos;
var txtVidas;

var Iniciar = {
  preload: function () {
    //cargar los elementos
    juego.load.image("nave", "img/nave.png");
    juego.load.image("bala", "img/bala.png");
    juego.load.image("malo", "img/malo.png");
    juego.load.image("fondo", "img/fondo.png");
  },
  create: function () {
    //mostrar en pantalla
    fondoJuego = juego.add.tileSprite(0, 0, 400, 540, "fondo");
    //Agregar al canvas la nave
    nave = juego.add.sprite(40, juego.height / 2, "nave");
    //Punto de apoyo centralizado
    nave.anchor.setTo(0.5);
    //Agregar funciones al juego de fisica de tipo ARCADE
    juego.physics.startSystem(Phaser.Physics.ARCADE);
    //Activar fisica para la nave
    juego.physics.arcade.enable(nave, true);
    //Limitar el giro de la nave
    nave.body.allowRotation = false;
    //Crear balas
    balas = juego.add.group();
    balas.enableBody = true;
    balas.setBodyType = Phaser.Physics.ARCADE;
    balas.createMultiple(1, "bala");
    balas.setAll("anchor.x", 0.5);
    balas.setAll("anchor.y", 1);
    balas.setAll("checkWorldBounds", true);
    balas.setAll("outOfBoundsKill", true);
    //Crear enemigos
    malos = juego.add.group();
    malos.enableBody = true;
    malos.setBodyType = Phaser.Physics.ARCADE;
    malos.createMultiple(20, "malo");
    malos.setAll("anchor.x", 0.5);
    malos.setAll("anchor.y", 1);
    malos.setAll("checkWorldBounds", true);
    malos.setAll("outOfBoundsKill", true);
    //ciclo de enemigos
    //loop(time,functionloop)
    aparecer = juego.time.events.loop(1500, this.crearEnemigo, this);
    //Logica de puntaje y vidas
    puntos = 0;
    juego.add.text(20, 20, "Puntos", { font: "14px Arial", fill: "#FFF" });
    txtPuntos = juego.add.text(70, 20, "0", {
      font: "14px Arial",
      fill: "#FFF",
    });
    vidas = 5;
    juego.add.text(116, 20, "Vidas", { font: "14px Arial", fill: "#FFF" });
    txtVidas = juego.add.text(156, 20, "5", {
      font: "14px Arial",
      fill: "#FFF",
    });
  },
  update: function () {
    //Animar juego
    fondoJuego.tilePosition.x -= 2;
    nave.rotation = juego.physics.arcade.angleToPointer(nave);
    //Mover nave
    if (juego.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      nave.y -= 4;
    }
    if (juego.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      nave.y += 4;
    }
    //Disparar balas
    if (juego.input.activePointer.isDown) {
      this.disparar();
    }
    //colision de rocas y balas
    juego.physics.arcade.overlap(balas, malos, this.colision, null, this);
    //Colision que quita vidas
    malos.forEachAlive(function (n) {
      if (n.position.x > 10 && n.position.x < 12) {
        console.log(vidas);
        vidas -= 1;
        txtVidas.text = vidas;
      }
    });
    //Logica de GAME OVER
    if (vidas == 0) {
      juego.state.start("Terminado");
    }
  },
  //Funcion disparar una sola bala
  disparar: function () {
    timer = juego.time.now + delay;
    var bala = balas.getFirstDead();
    console.log(balas.countDead());
    if (juego.time.now < timer && balas.countDead() > 0) {
      bala.anchor.setTo(0.5);
      bala.reset(nave.x, nave.y);
      bala.rotation = juego.physics.arcade.angleToPointer(bala);
      juego.physics.arcade.moveToPointer(bala, 300);
    }
  },
  crearEnemigo: function () {
    var enem = malos.getFirstDead();
    var num = Math.floor(Math.random() * 10 + 1);
    enem.reset(400, num * 55);
    enem.anchor.setTo(0.5);
    enem.body.velocity.x = -200;
    enem.checkWorldBounds = true;
    enem.outOfBoundsKill = true;
  },
  colision: function (bala, malo) {
    //funcion colision de enemigos y balas
    bala.kill();
    malo.kill();
    puntos++;
    txtPuntos.text = puntos;
  },
};
