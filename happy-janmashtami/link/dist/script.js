const handi = document.getElementById('handi');
const brokenHandi = document.getElementById('brokenHandi');
const potPieces = document.querySelectorAll('.pot-piece');
const curdDrops = document.querySelectorAll('.curd-drop');
const janmashtamiText = document.getElementById('janmashtamiText');
const cursorArea = document.getElementById('cursor-area');

cursorArea.addEventListener('click', breakHandi);

function breakHandi() {
  handi.classList.add('handi-break');
  brokenHandi.classList.add('show-broken-handi');
  potPieces.forEach((piece) => piece.classList.add('piecefall'));
  curdDrops.forEach((drop) => drop.classList.add('curdfall'));
  setTimeout(function () {
    cursorArea.style.display = 'none';
  }, 1000);

  janmashtamiText.classList.add('textAnimate');
}