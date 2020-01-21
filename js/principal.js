var juego = new Phaser.Game(400, 540, Phaser.CANVAS, "bloqueJuego");
juego.state.add("Iniciar", Iniciar);
juego.state.add("Terminado", Terminado);
juego.state.start("Iniciar");
