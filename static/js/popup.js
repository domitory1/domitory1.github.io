// Получаем элементы по селекторам
const popupOverlay = document.getElementById("popup-overlay");
const popup = document.getElementById("popup");

// Функция для отображения всплывающего окна

function showPopup(element) {
    document.body.classList.add('popup-open');

    const idElement = parseInt(element.id.replace(/\D/g, ''));
    const srcImageProduct = element.querySelector('img').getAttribute('src');

    const image = document.createElement('img');
    image.src = srcImageProduct;

    const name = document.createElement('h3');
    name.textContent = originalNames[idElement];

    const description = document.createElement('p');
    description.textContent = originalDescriptions[idElement];

    popup.innerHTML = '';
    popup.appendChild(image);
    popup.appendChild(name);
    popup.appendChild(description);

    var popupOverlay = document.getElementById('popup-overlay');
    popupOverlay.classList.add('active');
}

// Добавляем обработчики событий для карточек
const cards = document.querySelectorAll('.cardProduct');
cards.forEach(card => {
    card.addEventListener('click', function() {
        showPopup(this);
    });
});

// Функция для скрытия всплывающего окна
function hidePopup() {
    while (popup.firstChild) {
        popup.removeChild(popup.firstChild);
    }

    var popupOverlay = document.getElementById('popup-overlay');
    popupOverlay.classList.remove('active');

    document.body.classList.remove('popup-open');
}

// Добавляем обработчики событий для скрытия всплывающего окна
popupOverlay.addEventListener("click", hidePopup);
popup.addEventListener("click", hidePopup);
popup.addEventListener("click", (event) => event.stopPropagation());