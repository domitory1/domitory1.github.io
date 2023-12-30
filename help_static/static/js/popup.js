const popupOverlay = document.getElementById("popup-overlay");
const popup = document.querySelector(".popup");
/*const btnSpace = document.querySelector(".btn-space");*/

const showPopup = (element) => {
    document.body.classList.add('popup-open');

    const idProduct = element.id.replace(/\D/g, '');
    const srcImageProduct = element.querySelector('img').getAttribute('src');
    /*const contentBtnSpace = element.querySelector('.btn-space').innerHTML;*/

    const image = new Image();
    image.src = srcImageProduct;
    const name = document.createElement('h3');
    name.textContent = originalNames[idProduct];
    const description = document.createElement('p');
    description.textContent = originalDescriptions[idProduct];
    console.log(description);

    popup.innerHTML = '';
    popup.appendChild(image);
    popup.appendChild(name);
    popup.appendChild(description);

    /*btnSpace.innerHTML = contentBtnSpace;
    popupOverlay.appendChild(btnSpace);*/

    popupOverlay.classList.add('active');
};

document.querySelectorAll('.cardProduct').forEach(item => {
    item.addEventListener('click', (event) => {
        if (event.target.closest('.btnEnable') && document.body.classList != "popup-open") {
            showPopup(item);
        }
    });
});

const hidePopup = () => {
    popup.innerHTML = '';
    /*btnSpace.innerHTML = '';*/
    popupOverlay.classList.remove('active');
    document.body.classList.remove('popup-open');
};

popupOverlay.addEventListener("click", hidePopup);

popup.addEventListener("click", hidePopup);
popup.addEventListener("click", (event) => event.stopPropagation());