const popupOverlay = document.getElementById("popup-overlay");
const popup = document.getElementById("popup");
const btnSpace = document.querySelector(".btnSpace");

function showPopup(element) {
    document.body.classList.add('popup-open');

    const idProduct = parseInt(element.id.replace(/\D/g, ''));
    const srcImageProduct = element.querySelector('img').getAttribute('src');
    const contentBtnSpace = element.querySelector('.btn-space').innerHTML;

    const image = document.createElement('img');
    image.src = srcImageProduct;
    const name = document.createElement('h3');
    name.textContent = originalNames[idProduct];
    const description = document.createElement('p');
    description.textContent = originalDescriptions[idProduct];
    
    popup.appendChild(image);
    popup.appendChild(name);
    popup.appendChild(description);

    btnSpace.innerHTML = contentBtnSpace;
    popupOverlay.appendChild(btnSpace);

    popupOverlay.classList.add('active');
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
    while (btnSpace.firstChild) {
        btnSpace.removeChild(btnSpace.firstChild);
    }

   var popupOverlay = document.getElementById('popup-overlay');
    popupOverlay.classList.remove('active');
    document.body.classList.remove('popup-open');
}

popupOverlay.addEventListener("click", hidePopup);
popup.addEventListener("click", hidePopup);
popup.addEventListener("click", (event) => event.stopPropagation());