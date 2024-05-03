"use strict";
const container = document.querySelector(".container");
const sourceText = document.querySelector(".text");
for (var i = 0; i < 12; i++) {
    const cloneText = sourceText.cloneNode(true);
    container.appendChild(cloneText);
}
const elementArray = [...document.querySelectorAll(".text")];
elementArray.forEach((el, index) => {
    el.setAttribute("data-scale", index);
});
function frame() {
    elementArray.sort((a, b) => {
        const scaleA = Number(a.dataset.scale);
        const scaleB = Number(b.dataset.scale);
        return scaleB - scaleA;
    });
    elementArray.forEach((el, index) => {
        let scale = Number(el.dataset.scale);
        if (scale >= elementArray.length) {
            el.dataset.scale = "0";
        }
        scale = Number(el.dataset.scale);
        scale += scale > 3 ? 0.025 : 0.01;
        el.dataset.scale = scale;
        el.style.transform = `scale(${scale})`;
        el.style.zIndex = index;
    });
    requestAnimationFrame(frame);
}
frame();