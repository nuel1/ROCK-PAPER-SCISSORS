!(function () {
  "use strict";

  function playersId(object) {
    const playerOne = {
      id: "sprite-one--selected",
      name: "Elliot",
      "img-src": "img/elliot.png",
    };
    const playerTwo = {
      id: "sprite-two--selected",
      name: "Jenny",
      "img-src": "img/jenny.png",
    };

    object.push(playerOne, playerTwo);

    return object;
  }

  const credentials = {
    img_Containers: [
      document.querySelector(".card--player-one img"),
      document.querySelector(".card--player-two img"),
    ],
    playername_Headers: [
      document.querySelector(".card--player-one h3"),
      document.querySelector(".card--player-two h3"),
    ],
  };

  function setupPlayers(setup, n) {
    return function (player_id) {
      setup.img_Containers[n].setAttribute("src", player_id["img-src"]);
      setup.playername_Headers[n].textContent = `${player_id["name"]}`;
    };
  }

  const USER = setupPlayers(credentials, 0);
  const COMPUTER = setupPlayers(credentials, 1);

  function event__selected_player() {
    const player_selection_box = document.querySelector(".intro-container");
    const model__selected_players = document.querySelector(".model-box");
    const cards = [...document.querySelectorAll(".card--js")];
    const spin_box = document.querySelector(".model-box p");

    player_selection_box.classList.add("d--none");
    model__selected_players.classList.remove("d--none");

    cards.forEach((card, index) => {
      setTimeout(() => {
        if (card.classList.contains("card-one--hidden")) {
          card.classList.replace("card-one--hidden", "card--active");
        } else {
          card.classList.replace("card-two--hidden", "card--active");
        }
      }, index * 100);
    });

    setTimeout(function () {
      spin_box.classList.replace("fadeOut--spin-box", "fadeIn--spin-box");
    }, 50);

    (function () {
      setTimeout(function () {
        spin_box.classList.remove("fadeIn--spin-box");
      }, 230);
    })();
  }

  function showGame() {
    const game_box = document.querySelector(".play-box");
    const model__selected_players = document.querySelector(".model-box");

    setTimeout(() => {
      model__selected_players.classList.add("fadeOut--model-box");
    }, 2000);

    setTimeout(function () {
      model__selected_players.classList.add("d--none");
      game_box.classList.remove("d--none");
    }, 3500);
  }

  function playerSelected(e) {
    playersId([]).forEach(item => {
      if (e.target.parentNode.getAttribute("id") === item.id) {
        USER(item);
      } else {
        COMPUTER(item);
      }
    });

    event__selected_player();
    showGame();
  }

  // Select player Event button;
  // *****
  // ***
  // **
  // *
  const select_player_btns = [...document.querySelectorAll(".btn--select")];
  select_player_btns.forEach(btn => {
    btn.addEventListener("click", e => {
      playerSelected(e);
    });
  });
  // *
  // **
  // ***
  // ****

  function scores(count) {
    return () => count++;
  }

  let userScoreCount = scores(1);
  let computerScoreCount = scores(1);

  function computerSelect(e) {
    const selectableBoxes = [...document.querySelectorAll("#img")];
    const filterdBoxes = selectableBoxes.filter(img => e !== img);
    const randomSelection = Math.floor(Math.random() * filterdBoxes.length);

    if (randomSelection < 0) {
      let selected = filterdBoxes[0];
      return selected;
    } else {
      let selected = filterdBoxes[randomSelection];
      return selected;
    }
  }

  // ******************
  // ****************
  // *************
  // *********
  // All animations and transition effect goes here...

  function animation__smoothScoreDrop(index) {
    const list = [...document.querySelectorAll(".counter-box")];

    return function (score) {
      const li = document.createElement("li");
      const liClasses = ["counter", "inside"];
      const scores = score();

      li.setAttribute("class", "");

      liClasses.forEach(c => li.classList.add(`${c}`));

      scores < 10
        ? (li.textContent = `0${scores}`)
        : (li.textContent = `${scores}`);

      if (list[index].children.length) {
        list[index].appendChild(li);
        list[index].children[0].classList.add("roll-down");
        setTimeout(function () {
          li.classList.replace("inside", "show");
          list[index].children[0].remove();
        }, 450);
      }
    };
  }

  const userScore = animation__smoothScoreDrop(0);
  const computerScore = animation__smoothScoreDrop(1);

  function animation__smoothImgDrop() {
    const selectableBoxes = [...document.querySelectorAll(".selectable--true")];
    const boxes = {
      imgBox_one: selectableBoxes[0],
      imgBox_two: selectableBoxes[1],
      imgBox_three: selectableBoxes[2],
    };
    const moves = {
      computer: {
        classes: {
          move__right: "right--computerMove",
          move__middle: "middle--computerMove",
          move__left: "left--computerMove",
        },
      },
      user: {
        classes: {
          move__right: "right--userMove",
          move__middle: "middle--userMove",
          move__left: "left--userMove",
        },
      },
    };

    function move(css_class, selected) {
      selected.classList.add(`${css_class}`);
    }

    const sides = {
      userSelect: {
        classToggle: {
          moveRight() {
            move(moves.user.classes.move__right, boxes.imgBox_one);
          },
          moveMiddle() {
            move(moves.user.classes.move__middle, boxes.imgBox_two);
          },
          moveLeft() {
            move(moves.user.classes.move__left, boxes.imgBox_three);
          },
        },
      },
      computerSelect: {
        classToggle: {
          moveRight() {
            move(moves.computer.classes.move__right, boxes.imgBox_one);
          },
          moveMiddle() {
            move(moves.computer.classes.move__middle, boxes.imgBox_two);
          },
          moveLeft() {
            move(moves.computer.classes.move__left, boxes.imgBox_three);
          },
        },
      },
    };

    return sides;
  }

  // ********
  // **********
  // *************
  // ****************
  // end....

  function compareSelectedBoxes(user_select, computer_select) {
    const entities = [
      {
        rock: {
          scissors: true,
          paper: false,
        },
        paper: {
          rock: true,
          scissors: false,
        },
        scissors: {
          rock: false,
          paper: true,
        },
      },
    ];

    function s(p) {
      const img = p.nextElementSibling;
      return img.getAttribute("id");
    }

    function checkSelectedBoxes(array) {
      array[0][s(user_select)][s(computer_select)]
        ? userScore(userScoreCount)
        : computerScore(computerScoreCount);
    }
    checkSelectedBoxes(entities);
  }

  function userMove(selected) {
    const boxes = [...document.querySelectorAll("#img")];

    if (selected === boxes[0])
      animation__smoothImgDrop().userSelect.classToggle.moveRight();
    if (selected === boxes[1])
      animation__smoothImgDrop().userSelect.classToggle.moveMiddle();
    if (selected === boxes[2])
      animation__smoothImgDrop().userSelect.classToggle.moveLeft();
  }
  function computerMove(selected) {
    const boxes = [...document.querySelectorAll("#img")];

    if (selected === boxes[0])
      animation__smoothImgDrop().computerSelect.classToggle.moveRight();
    if (selected === boxes[1])
      animation__smoothImgDrop().computerSelect.classToggle.moveMiddle();
    if (selected === boxes[2])
      animation__smoothImgDrop().computerSelect.classToggle.moveLeft();
  }

  function reset() {
    function scoreReset() {
      userScoreCount = scores(0);
      computerScoreCount = scores(0);
    }
    scoreReset();
  }

  function resetMoves() {
    const moves = [
      "right--computerMove",
      "middle--computerMove",
      "left--computerMove",
      "right--userMove",
      "middle--userMove",
      "left--userMove",
    ];

    const movableBoxes = [...document.querySelectorAll(".selectable--true")];
    movableBoxes.forEach(box => {
      moves.forEach(cls => {
        if (box.classList.contains(cls)) box.classList.remove(cls);
      });
    });
  }

  function userSelect(e) {
    return e.target;
  }

  function runGame(...arg) {
    const userChosenBox = arg[1];
    userMove(userChosenBox);
    setTimeout(() => {
      const computerChosenBox = computerSelect(arg[0]);
      computerMove(computerChosenBox);
      compareSelectedBoxes(userChosenBox, computerChosenBox);
    }, 500);
    setTimeout(function () {
      resetMoves();
    }, 2000);
  }

  function startGame() {
    const selectableBoxes = [...document.querySelectorAll("#img")];
    selectableBoxes.forEach(el => {
      el.addEventListener("click", e => {
        runGame(e.target, userSelect(e));
      });
    });
  }

  startGame();
})();
