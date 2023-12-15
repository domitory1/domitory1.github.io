tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

var slider = new Flickity('.slider',{
	freeScroll: true,
	contain: true,
	cellAlign: 'center',
	dragThreshold: 10,
	prevNextButtons: false,
	pageDots: false,
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
			if(slider.selectedIndex != i) {
				let current = $(this).attr('id');
				$('.slider a').each(function() {
					$(this).removeClass('active');
				})
				$('.slider a[href="#'+current+'"]').addClass('active');
				slider.select(i);
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

function showPopup(){
	var popup = document.getElementById('popup');

	var cardProduct = document.querySelector('.cardProduct');
	var nameProduct = cardProduct.querySelector('#nameProduct').innerText;
	var descriptionProduct = cardProduct.querySelector('#descriptionProduct').innerText;
	var srcImageProduct = cardProduct.querySelector('img').getAttribute('src');

	var popup = document.createElement('div');  
	popup.classList.add('popup');

	var image = document.createElement('img');
	image.src = srcImageProduct;  
	popup.appendChild(image);

	var name = document.createElement('h3');
	name.textContent = nameProduct;  
	popup.appendChild(name);

	var description = document.createElement('p');
	description.textContent = descriptionProduct;  
	popup.appendChild(description);

	document.body.appendChild(popup);

	var elementsToBlur = document.querySelectorAll('body > *:not(.popup)');
	elementsToBlur.forEach(function(element){
		element.style.filter = 'blur(3px)';
	});

}
document.body.addEventListener('click', function(event){
	
	var popup = document.querySelector('.popup');
	
	if (popup && !popup.contains(event.target)){
		
		popup.remove();

		var elementsToBlur = document.querySelectorAll('body > *:not(.popup)');
		elementsToBlur.forEach(function(element){
			element.style.filter = 'none';
		});
	}
});
/*
document.body.addEventListener('click', function(event){
	console.log('event есть')
	var popup = document.querySelector('.popup');
	
	if (popup && !popup.contains(event.target)){
		console.log('if выполняется')
		popup.remove;

		var elementsToBlur = document.querySelectorAll('body > *:not(.popup)');
		elementsToBlur.forEach(function(element){
			element.style.filter = 'none';
		});
	}
});*/