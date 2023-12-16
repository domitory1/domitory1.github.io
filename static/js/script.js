tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

var sliderCategory = new Flickity('.sliderCategory',{
	freeScroll: true,
	contain: true,
	cellAlign: 'center',
	dragThreshold: 10,
	prevNextButtons: false,
	pageDots: false,
});

var sliderSale = new Flickity('.sliderSale',{
	autoPlay: 5000,
	wrapAround: true,
	fade: true,
	cellAlign: 'center',
	dragThreshold: 10,
	prevNextButtons: false,
});

function getActiveICatalogNav(target) {
	let w = $(window);
	let t = $(target);
	let wt = w.scrollTop();
	let wh = w.height()- tg.viewportHeight / 2;
	let eh = t.outerHeight();
	let et = t.offset().top;
	if (wt + wh >= et && wt + wh - eh * 2 <= et + (wh - eh)){
		return true;
	} else {
		return false;
	}
}

$('body').on('click', '[href*="#"]', function(e){
	e.preventDefault();
	e.stopImmediatePropagation();
	$('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - 100 }, 200);
});

$(window).scroll(function(){
	$('.categoryElem').each(function(i) {
		if(getActiveICatalogNav('#'+$(this).attr('id'))) {
			if(sliderCategory.selectedIndex != i) {
				let current = $(this).attr('id');
				$('.sliderCategory a').each(function() {
					$(this).removeClass('active');
				})
				$('.sliderCategory a[href="#'+current+'"]').addClass('active');
				sliderCategory.select(i);
			}
		}
	});
});

const descriptions = document.querySelectorAll('#descriptionProduct');
const names = document.querySelectorAll('#nameProduct');
const popupOverlay = document.getElementById("popup-overlay");
const popup = document.getElementById("popup");
const originalDescriptions = Array.from(descriptions).map(description => description.textContent);
const originalNames = Array.from(names).map(name => name.textContent);


function showPopup(element) {
    document.body.classList.add('popup-open');

    var idElement = parseInt(element.id.replace(/\D/g, ''));
    const srcImageProduct = element.querySelector('img').getAttribute('src');

    const image = document.createElement('img');
    image.src = srcImageProduct;

    const name = document.createElement('h3');
	console.log(originalNames[0]);
    name.textContent = originalNames[idElement - 1]; // Полный текст

    const description = document.createElement('p');
	console.log(originalDescriptions[0]);
    description.textContent = originalDescriptions[idElement - 1]; // Полный текст

    popup.innerHTML = '';
    popup.appendChild(image);
    popup.appendChild(name);
    popup.appendChild(description);

    popupOverlay.classList.add('show');
    popupOverlay.style.display = "block";
}

function truncateText(elements) {
    elements.forEach(element => {
        const availableHeight = element.clientHeight;
        const originalText = element.textContent; // Используем textContent вместо innerHTML
  
        if (element.scrollHeight > availableHeight) {
            let truncatedText = originalText;
            while (element.scrollHeight > availableHeight && truncatedText.length > 0) {
                truncatedText = truncatedText.slice(0, -1);
                element.textContent = truncatedText + '...'; // Используем textContent вместо innerHTML
            }
        }
    });
}

// Добавляем обработчики событий для карточек
const cards = document.querySelectorAll('.cardProduct');
cards.forEach(card => {
    card.addEventListener('click', function() {
        showPopup(this);
    });
});

// Вызываем функцию обрезания текста для карточек
truncateText(descriptions);
truncateText(names);

function hidePopup() {
	while (popup.firstChild) {
    	popup.removeChild(popup.firstChild);
  	}

  	popupOverlay.classList.remove('show');
  	popupOverlay.style.display = "none";
    document.body.classList.remove('popup-open');
}

popupOverlay.addEventListener("click", hidePopup);
popup.addEventListener("click", hidePopup);
popup.addEventListener("click", (event) => event.stopPropagation());