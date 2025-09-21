/* ==========================
   VARIABLES PRINCIPALES
   ========================== */
   const body = document.body;
   let petalInterval; // Intervalo de creación de pétalos
   let currentLine = 0;
   let isTyping = false;
   let typingTimeout;
   let fullText = "";
   
   // Elementos DOM
   const dialogText = document.getElementById('dialog-text');
   const characterImage = document.getElementById('first-step-character');
   const nextIndicator = document.getElementById('next-indicator');
   const gameContainer = document.getElementById('game-container');
   const giftContainer = document.getElementById('gift-container');
   const giftObject = document.getElementById('gift-object');
   const hud = document.getElementById('hud');
   const hudImage = document.querySelector('#hud img');
   const sceneOverlay = document.getElementById("scene-transition");
   
   // 🎵 Música
   const song1 = new Audio("music/song1.mp3");
   const song2 = new Audio("music/song2.mp3");
   song1.loop = true;
   song1.volume = 0.5;
   song2.loop = true;
   song2.volume = 0.5;
   
   // 🔊 Sonido de tipeo
   const typingSound = new Audio("music/typing.mp3");
   typingSound.volume = 0.2;
   typingSound.preload = "auto";
   
   // Botones de música
   const btn1 = document.getElementById("music-btn-1");
   const btn2 = document.getElementById("music-btn-2");
   
   /* ==========================
      SCRIPT DEL DIÁLOGO
      ========================== */
      const script = [{
        text: '[Un día 21 de septiembre, te encuentras en la escuela sentada en tu pupitre, revisando tus apuntes notas que alguien se acerca a tí]',
        img: './img/nothing.png',
        align: 'center'
      },
      {
        text: '[Es el chico callado del salón, Joe Goldberg. Siempre lo habías visto desde lejos, pero nunca habías tenido una conversación con él.]',
        img: './img/nothing.png',
        align: 'center'
      }, {
        text: 'Joe: Disculpa... ¿puedo hablar contigo un momento?, soy Joe.',
        img: './img/joe.png',
        align: 'center'
      }, {
        text: '[Levantas la mirada y lo ves, un poco sorprendida. Tiene una expresión seria pero amable.]',
        img: './img/joe.png',
        align: 'center'
      }, {
        text: 'Joe : Sé que esto va a sonar extraño, pero... te he estado observando.  ',
        img: './img/joe.png',
        align: 'center'
      }, {
        text: '[si no me dices no me doy cuenta es lo que pasa por tu mente]',
        img: './img/joe.png',
        align: 'center'
      }, {
        text: 'Joe: No de una manera rara!. Solo... me di cuenta de lo fascinante que eres. La forma en que te concentras en las clases, la pasión con la que lees tus novelas... sonará todo raro esto pero, no sabes cuánto deseo ser libro',
        img: './img/joe.png',
        align: 'center'
      }, {
        text: '[comienzas a recoger tus cosas para irte]',
        img: './img/joe.png',
        align: 'center'
      }, {
        text: 'Joe: Espera, por favor. No te vayas. Solo quería decirte que tengo un presente para tí, ya sabes, por la fecha. Algo pequeño, pero hecho con mucho...',
        img: './img/joe.png',
        align: 'center'
      }, {
        text: '[De pronto, una sombra se proyecta sobre la entrada del salón. Es tu amigo de toda la vida, con su piel pálida brillando sutilmente a la luz del sol que entra por la ventana. Parece serio, casi molesto.]',
        img: './img/joe.png',
        align: 'center'
      }, {
        text: 'Edward: No la toques...',
        img: './img/ed.png',
        align: 'center'
      }, {
        text: '[Joe se sorprende y se aleja un paso. Ed se coloca frente a tu pupitre, ignorando por completo a Joe.]',
        img: './img/joe.png',
        align: 'left'
      }, {
        text: 'Edward: Vine porque no te ví en el comedor y escuché todo, Joe. Y debo decir que tu forma de ver las cosas es... perturbadora sabes?. No puedes simplemente "observar" a alguien y decidir que te interesa.',
        img: './img/ed.png',
        align: 'center'
      }, {
        text: '[Miras de reojo a la ventana sabiendo que Ed ha hecho lo mismo, pero no dices nada.]',
        img: './img/ed.png',
        align: 'center'
      },
      {
        text: 'Edward: Es un proceso, algo mucho más profundo que se desarrolla a través del tiempo.... y yo tengo tiempo de sobra',
        img: './img/ed.png',
        align: 'center'
      }, {
        text: 'Joe: pálido amigo, tú no sabes nada de mí. Y mucho menos de mi conexión con...',
        img: './img/joe.png',
        align: 'left'
      }, {
        text: 'Edward: No creo que un mortal como tú pueda entender la verdadera conexión. he visto a la humanidad cometer los mismos errores una y otra vez. Te aseguro que tu "interés" no es más que una simple obsesión. Ella merece a alguien que ...',
        img: './img/ed.png',
        align: 'center'
      }, {
        text: '[Sigues sin decir nada, solo esperas que algo pase y termine esta situación incómoda]',
        img: './img/ed.png',
        align: 'center'
      }, {
        text: '[Mientras Joe y Edward se tiran comentarios de odio y racismo, notas que en la ventana del pasillo se acerca tu ex, el ser mas chacal que puede existir, ah roto su uniforme, se acerca a ti y te guiña un ojo.]',
        img: './img/nothing.png',
        align: 'center'
      }, {
        text: 'C.R.O.: Hola mami, Pensé que era el salón de química, no un circo de celos. Deja que te saque de este bardo.',
        img: './img/cro.png',
        align: 'right'
      }, {
        text: '[Intenta tomarte de la mano, pero Edward lo detiene con una velocidad casi imperceptible.]',
        img: './img/cro.png',
        align: 'right'
      }, {
        text: 'Edward Cullen: No la toques...',
        img: './img/ed.png',
        align: 'center'
      }, {
        text: 'Joe: Lo mismo me dijo.',
        img: './img/joe.png',
        align: 'left'
      }, {
        text: 'C.R.O.: ¿Qué te pasa boludo? Bajá un cambio. Vos sos el que está re quemado, te dió la pálida o qué?',
        img: './img/cro.png',
        align: 'right'
      }, {
        text: 'Edward Cullen: No entenderías. Mi condición es un don. No una debilidad. [Comienza a brillar cual foco]',
        img: './img/ed.png',
        align: 'center'
      }, {
        text: 'C.R.O.: Tú necesitas la luz para brillar. A mí me basta con mi flow. Y ese otro boludo... [señalando a Joe] ... se nota a leguas lo re friki que es, que acaso coleccionas gente en frascos también?',
        img: './img/cro.png',
        align: 'right'
      }, {
        text: 'Joe Goldberg: [Se queda callado unos segundos] ejem... me dedico a proteger a la gente que me importa de los peligros de la vida. haría lo que fuera para asegurarme de que la persona que amo esté a salvo.',
        img: './img/joe.png',
        align: 'left'
      }, {
        text: 'C.R.O.: ¿Protegerla?, si estás re chiflado. La Reina necesita a alguien que la haga bailar, que la haga sentir viva. Yo no te voy a andar espiando. El amor que yo siento es libre, sin jaulas.',
        img: './img/cro.png',
        align: 'right'
      }, {
        text: '[Suena la campana. Los tres se detienen y se miran. La tensión es palpable y solo quieres ir a comer una torta de milanesa.]',
        img: './img/nothing.png',
        align: 'center'
      }, {
        text: 'C.R.O.: Bueno mi vida, me tengo que ir. Me quedaría a espantar estos bichos pero estoy a nada de que me expulsen. Nos vemos en la azotea al terminar clases, tengo algo para vos.',
        img: './img/cro.png',
        align: 'right'
      }, {
        text: '[Sale del salón, no sin antes guiñarte un ojo. Edward se acerca un poco más, su mirada es intensa y protectora.]',
        img: './img/nothing.png',
        align: 'center'
      }, {
        text: 'Edward Cullen: No vayas con él. Se nota que te quiere por puro interés. yo de igual forma tengo algo para ti, es por todos estos años que tenemos de conocernos, te veo en la azotea después de clases.',
        img: './img/ed.png',
        align: 'right'
      }, {
        text: '[Se va con la misma velocidad con la que apareció. Joe se queda parado, viéndote a los ojos, con una mezcla de desesperación y resignación.]',
        img: './img/nothing.png',
        align: 'center'
      }, {
        text: 'Joe: Prometo que soy mejor que ellos y lucharé para demostrártelo. así que... nos vemos en la azotea. te alcanzaré después de clases, tengo que ir al comedor a buscar algo rápido.',
        img: './img/joe.png',
        align: 'left',
      }, {
        text: '[Pasaste el resto del día en un estado de confusión y anticipación. Finalmente, la campana suena y te diriges a la azotea, por la anecdota dices]',
        img: './img/nothing.png',
        align: 'center',
        special: true
      },
      ]
   
   /* ==========================
      FUNCIONES DE PÉTALOS Y ESTRELLAS
      ========================== */
   function createPetal() {
     const petal = document.createElement('div');
     petal.className = 'petal';
   
     const startX = Math.random() * 100;
     petal.style.left = `${startX}vw`;
   
     const size = Math.random() * 15 + 15;
     petal.style.width = `${size}px`;
     petal.style.height = `${size}px`;
   
     const duration = Math.random() * 8 + 5;
     const delay = Math.random() * 2;
     petal.style.animation = `fall-spin ${duration}s linear ${delay}s forwards`;
   
     body.appendChild(petal);
   
     petal.addEventListener('animationend', () => petal.remove());
   }
   
   function createStars(count = 100) {
     for (let i = 0; i < count; i++) {
       const star = document.createElement("div");
       star.className = "star";
   
       const size = Math.random() * 2 + 1;
       star.style.width = `${size}px`;
       star.style.height = `${size}px`;
   
       star.style.top = `${Math.random() * 100}vh`;
       star.style.left = `${Math.random() * 100}vw`;
   
       const duration = Math.random() * 3 + 2;
       star.style.animationDuration = `${duration}s`;
   
       document.body.appendChild(star);
     }
   }
   
   /* ==========================
      TIPADO DE TEXTO
      ========================== */
   function typeText(text, speed = 40) {
     isTyping = true;
     dialogText.innerHTML = "";
     fullText = text;
     let i = 0;
   
     function type() {
       if (i < text.length) {
         dialogText.innerHTML += text.charAt(i);
   
         try {
           typingSound.currentTime = 0.07;
           typingSound.play();
         } catch (err) { }
   
         i++;
         typingTimeout = setTimeout(type, speed);
       } else {
         isTyping = false;
         try { typingSound.pause(); } catch (err) { }
         nextIndicator.style.display = "block";
       }
     }
   
     type();
   }
   
   /* ==========================
      CONTROL DE LÍNEAS DE DIÁLOGO
      ========================== */
   function showLine(line) {
     const data = script[line];
     characterImage.src = data.img;
     characterImage.className = data.align + " character-image";
     nextIndicator.style.display = "none";
     typeText(data.text);
   
     if (data.special) {
       setTimeout(() => {
         document.getElementById("dialog-box").addEventListener("click", () => {
           if (!isTyping) {
             changeScene(() => {
               giftContainer.style.display = "block";
               gameContainer.style.display = "none";
             });
           }
         }, { once: true });
       }, 1000);
     }
   }
   
   /* ==========================
      EVENTOS DE INTERACCIÓN
      ========================== */
   // Avanzar diálogo al hacer click
   document.getElementById('dialog-box').addEventListener('click', () => {
     if (isTyping) {
       clearTimeout(typingTimeout);
       dialogText.textContent = fullText;
       isTyping = false;
       nextIndicator.style.display = "block";
     } else {
       if (currentLine < script.length) {
         showLine(currentLine);
         currentLine++;
       }
     }
   });
   
   // HUD y objeto flotante
   giftObject.addEventListener('click', () => {
     hud.style.display = "block";
     giftObject.style.display = "none";
   });
   
   function dropAction() {
     if (hud.style.display === "block") {
       hudImage.classList.add('hud-throw-out');
       hudImage.addEventListener('animationend', () => {
         giftObject.style.display = "block";
         hud.style.display = "none";
         hudImage.classList.remove('hud-throw-out');
       }, { once: true });
     }
   }
   hudImage.addEventListener("click", dropAction);
   
   /* ==========================
      TRANSICIÓN DE ESCENAS
      ========================== */
   function changeScene(callback) {
     sceneOverlay.classList.add("active");
   
     setTimeout(() => {
       body.style.background = "radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)";
       if (!song1.paused) { song1.pause(); song2.play(); }
       if (callback) callback();
   
       setTimeout(() => {
         sceneOverlay.classList.remove("active");
         petalInterval = setInterval(createPetal, 500);
       }, 800);
     }, 1000);
   }
   
   /* ==========================
      BOTONES DE MÚSICA
      ========================== */
   function toggleMusic(song, button, otherSong, otherButton) {
     if (song.paused) {
       song.play();
       button.textContent = "🔊";
       otherSong.pause();
       otherButton.textContent = "🔇";
     } else {
       song.pause();
       button.textContent = "🔇";
     }
   }
   
   btn1.addEventListener("click", () => toggleMusic(song1, btn1, song2, btn2));
   btn2.addEventListener("click", () => toggleMusic(song2, btn2, song1, btn1));
   
   /* ==========================
      INICIALIZACIÓN
      ========================== */
   showLine(currentLine);
   currentLine++;
   createStars(300);
