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
	wrapAround: 5000,
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

const textBlocks = document.querySelectorAll('#descriptionProduct, #nameProduct');

function truncateText() {
    textBlocks.forEach(textBlock => {
    	const availableHeight = textBlock.clientHeight;
    	const originalText = textBlock.innerHTML;

		if (textBlock.scrollHeight > availableHeight) {
			let truncatedText = originalText;
			while (textBlock.scrollHeight > availableHeight && truncatedText.length > 0) {
				truncatedText = truncatedText.slice(0, -1);
				textBlock.innerHTML = truncatedText + '...';
			}
		}
  	});
}

truncateText();

const popupOverlay = document.getElementById("popup-overlay");
const popup = document.getElementById("popup");

function showPopup(element) {
	document.body.classList.add('popup-open');

    const nameProduct = element.querySelector('h3').innerText;
    const descriptionProduct = element.querySelector('p').innerText;
    const srcImageProduct = element.querySelector('img').getAttribute('src');

    const image = document.createElement('img');
    image.src = srcImageProduct;

    const name = document.createElement('h3');
    name.textContent = nameProduct;

    const description = document.createElement('p');
    description.textContent = descriptionProduct;

    popup.innerHTML = '';
    popup.appendChild(image);
    popup.appendChild(name);
    popup.appendChild(description);

    popupOverlay.classList.add('show');
	popupOverlay.style.display = "block";
}

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