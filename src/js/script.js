

$(document).ready(function () {

	//загразка страницы"ожидание" анимация
	$(window).on('load', function () {
		$('body').addClass('loaded_hiding');
		window.setTimeout(function () {
			$('body').addClass('loaded');
			$('body').removeClass('loaded_hiding');
		}, 500);
	});


	//слайдеры
	$('.works__wrapper').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		centerMode: true,
		variableWidth: true
	});

	$('.promo__wrapper').slick({
		infinite: true,
		speed: 300,
		easing: 'ease',
		autoplay: true,
		autoplaySpeed: 2500,

	});

	$('.reviews__wrapper').slick({
		dots: true,
		infinite: true,
		speed: 300,
		variableWidth: true
	});

	$('.partners__wrapper').slick({
		arrows: false,
		easing: 'ease',
		autoplay: true,
		autoplaySpeed: 1500,
		dots: true,
		infinite: true,
		speed: 300,
		variableWidth: true
	});

	$('.sale__wrapper').slick({
		dots: true,
		infinite: false,
		speed: 300,
		variableWidth: true
	});


	// //меню делаем активным при нажатии
	// $('.nav__list').find('.nav__item').on('click', function () {
	// 	if ($(this).hasClass('nav__item_active')) {
	// 		return;
	// 	}
	// 	$('.nav__list').find('.nav__item_active').removeClass('nav__item_active');
	// 	$(this).addClass('nav__item_active');
	// });



	var topMenu = jQuery(".nav__item"),
		offset = 40,
		topMenuHeight = topMenu.outerHeight() + offset,
		// All list items
		menuItems = topMenu.find('a[href*="#"]'),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function () {
			var href = jQuery(this).attr("href"),
				id = href.substring(href.indexOf('#')),
				item = jQuery(id);
			//console.log(item)
			if (item.length) { return item; }
		});
	// so we can get a fancy scroll animation
	menuItems.click(function (e) {
		var href = jQuery(this).attr("href"),
			id = href.substring(href.indexOf('#'));
		offsetTop = href === "#" ? 0 : jQuery(id).offset().top - topMenuHeight + 1;
		jQuery('html, body').stop().animate({
			scrollTop: offsetTop
		}, 300);
		e.preventDefault();
	});
	// Bind to scroll
	jQuery(window).scroll(function () {
		// Get container scroll position
		var fromTop = jQuery(this).scrollTop() + topMenuHeight;
		// Get id of current scroll item
		var cur = scrollItems.map(function () {
			if (jQuery(this).offset().top < fromTop)
				return this;
		});
		// Get the id of the current element
		cur = cur[cur.length - 1];
		var id = cur && cur.length ? cur[0].id : "";
		menuItems.parent().removeClass("nav__item_active");
		if (id) {
			menuItems.parent().end().filter("[href*='#" + id + "']").parent().addClass("nav__item_active");
		}
	})


	//маска для input номера телефона
	$('input[name=phone]').mask("+7 (999) 999-99-99");


	//модальное всплывающие окна
	$('[data-modal=order]').on('click', function () {
		$('.overlay, #order').fadeIn('slow');
	});

	$('[data-modal=call]').on('click', function () {
		$('.overlay, #call').fadeIn('slow');
	});

	//крестик "назад"
	$('.modal__close').on('click', function () {
		$('.overlay, #order, #call, #thanks').fadeOut('slow');
	});

});





//фиксация навигации
const navbar = document.getElementById('nav').classList
const active_class = "nav_scrolled"

//Слушаем событие прокрутки
window.addEventListener('scroll', e => {
	if (scrollY > 100) navbar.add(active_class)
	else navbar.remove(active_class)
});






//Карты
const center = [54.60454092820396, 39.724797003318756];

function init() {
	const map = new ymaps.Map('contacts__map', {
		center: center,
		zoom: 17
	});

	const placemark = new ymaps.Placemark([54.604553384942975, 39.72329496627042], {

		balloonContent: `

		<div class="balloon">
			<div class="balloon__title">«Окна РЕХАУ»</div>
			<div class="balloon__address">г. Рязань, ул. Гоголя, 16</div>
			<div class="balloon__contacts">
				<a href="tel:79156261240">+7 (915) 626-12-40</a>
			</div>
		</div>
	`

	}, {
		iconLayout: 'default#image',
		iconImageHref: '../icons/location-icon.svg',
		iconImageSize: [93, 65],
		iconImageOffset: [-70, -62]
	});

	map.controls.remove('geolocationControl'); // удаляем геолокацию
	map.controls.remove('searchControl'); // удаляем поиск
	map.controls.remove('trafficControl'); // удаляем контроль трафика
	map.controls.remove('typeSelector'); // удаляем тип
	map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
	// map.controls.remove('zoomControl'); // удаляем контрол зуммирования
	map.controls.remove('rulerControl'); // удаляем контрол правил
	map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

	map.geoObjects.add(placemark);
}
ymaps.ready(init);
