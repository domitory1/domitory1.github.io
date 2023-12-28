const popupOverlay = document.getElementById("popup-overlay");
const popup = document.getElementById("popup");

function showPopup(element) {
    document.body.classList.add('popup-open');

    const idProduct = parseInt(element.id.replace(/\D/g, ''));
    const srcImageProduct = element.querySelector('img').getAttribute('src');
    const priceProduct = element.querySelector('.buttonAddToBasket').textContent.replace(/\D/g, '');

    const image = document.createElement('img');
    image.src = srcImageProduct;
    const name = document.createElement('h3');
    name.textContent = originalNames[idProduct];
    const description = document.createElement('p');
    description.textContent = originalDescriptions[idProduct];

    const btnSpace = document.createElement('div');
    btnSpace.classList.add('btnSpace')
    const button = document.createElement('button');
    button.classList.add('buttonAddToBasket');
    button.innerHTML = priceProduct;

    popup.innerHTML = '';
    popup.appendChild(image);
    popup.appendChild(name);
    popup.appendChild(description);
    popupOverlay.classList.add('active');
    btnSpace.appendChild(button);
    popupOverlay.appendChild(btnSpace);
}

document.querySelectorAll('.cardProduct').forEach(item => {
    item.addEventListener('click', function(event) {
      if (!event.target.closest('.btnEnable')) {
            showPopup(this);
        }
    });
});

function hidePopup() {
    while (popup.firstChild) {
        popup.removeChild(popup.firstChild);
    }

    var popupOverlay = document.getElementById('popup-overlay');
    popupOverlay.classList.remove('active');
    document.body.classList.remove('popup-open');
}

popupOverlay.addEventListener("click", hidePopup);
popup.addEventListener("click", hidePopup);
popup.addEventListener("click", (event) => event.stopPropagation());