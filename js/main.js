function g(props){
	// let els = document.querySelectorAll(props);
	// return els.length < 2 ? els[0] : els
	return document.querySelectorAll(props);
}

const body = g('body')[0];

// Плавная прокрутка
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
	smoothLink.addEventListener('click', function (e) {
		e.preventDefault();
		const id = smoothLink.getAttribute('href');

		document.querySelector(id).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	});
};

// Forms2
// function postReq(data, callback) {
// 	var xhr = new XMLHttpRequest();
// 		xhr.open('POST', '/b');
// 		xhr.onload = function () {
// 			callback(null, xhr.response);
// 		};
// 		xhr.onerror = function () {
// 			callback(xhr.response);
// 		};
// 		xhr.send(data);
// }

// function form_validate(errors, form, e){
// 	e.preventDefault();

// 	form.querySelectorAll('.input_txt').forEach(function(el){
// 		el.classList.remove('-err');
// 	})
// 	if(errors.length > 0){
// 		errors.forEach(function(err){
// 			err.element.classList.add('-err');
// 		})
		
// 	} else {
// 		var data = new FormData(form);
// 		postReq(data, function (err, datums) {
// 			if (err) { throw err; } else {
// 				console.info(datums);
// 			}
// 		});
// 	}
// }
// \\ Forms2

// Selecter
const selectSingle = document.querySelectorAll('.__select');
if(selectSingle[0]){
	selectSingle.forEach(function(selecter){
		// Запрещаем всплытие клика для сворачивания селекта
		selecter.parentNode.addEventListener('click', function(e){
			e.stopPropagation();
		})

		const selectSingle_title = selecter.querySelector('.__select__title');
		const selectSingle_labels = selecter.querySelectorAll('.__select__label');

		// Toggle menu
		selectSingle_title.addEventListener('click', () => {
			if ('active' === selecter.getAttribute('data-state')) {
				selecter.setAttribute('data-state', '');
			} else {
				selecter.setAttribute('data-state', 'active');
			}
		});

		// Close when click to option
		for (let i = 0; i < selectSingle_labels.length; i++) {
			selectSingle_labels[i].addEventListener('click', (evt) => {
				selectSingle_title.innerHTML = evt.target.innerHTML;
				selecter.setAttribute('data-state', '');
			});
		}
	})

	document.addEventListener('click', function(){
		selectSingle.forEach(function(selecter){
			selecter.setAttribute('data-state', '');
		})
	})
}
// \\Selecter


// TABS
var tabsContainer = document.querySelector('.tabs');
if (tabsContainer){
	var tabsLinks = tabsContainer.querySelectorAll('.tabs__link'),
		tabsContents = document.querySelectorAll('.tabs-text__item');

	// спрятать все таб контенты кроме первого
	document.querySelectorAll('.tabs-text__item:not(:first-child)').forEach(function(tabContent) {
		tabContent.style.display = 'none';
	});

	// к каждому таб линку и таб контенту добавить одинаковый дата аттрибут
	for (var i = 0; i < tabsLinks.length; i++) {
		if(tabsLinks[i] && tabsContents[i]) {
			tabsLinks[i].setAttribute('data-tab', i);
			tabsContents[i].setAttribute('data-tab', i);
		} else {
			console.error('TABS ERROR!!')
		}
	}

	// клик на табе
	tabsContainer.onclick = function(e) {
		e.preventDefault();
		if (!e.target.classList.contains('tabs__link')) return;

		// удалить со всех класс активного элемента
		tabsLinks.forEach(function(link) {
			link.classList.remove('tabs__link--active');
		});

		// пометить элемент как активный
		e.target.classList.add('tabs__link--active');

		// скрыть все таб контенты
		tabsContents.forEach(function(tabContent) {
			tabContent.style.display = 'none';
		});

		// сверить дата атрибуты, показать подходящий таб контент
		tabsContents.forEach(function(tabContent) {
			if (tabContent.dataset.tab === e.target.dataset.tab) {
				tabContent.style.display = 'block';

				let tabSliderEl = tabContent.querySelector('.js_carousel');
				if(tabSliderEl){
					console.log(tabSliderEl)
					let tabSlider = new Flickity(tabSliderEl);
						tabSlider.resize();
				}
			}
		});
	};
}
// \\TABS


var topMenu = g('.section-menu')[0];
document.addEventListener('scroll', function(e){
	if(!body.classList.contains('-menuShown') && !g('body.page-schema')[0]){
		if(window.scrollY > 100){
		// if(window.scrollY > 100 && window.innerWidth > 1200){
			topMenu.classList.add('-scroll')
		} else {
			topMenu.classList.remove('-scroll')
		}
	}
})


document.addEventListener('DOMContentLoaded', function() {

if(g('body')[0].classList.contains('-preloading')){
	g('body')[0].classList.remove('-preloading');
}

g('.section-menu .itm_cont').forEach(function(el){
	el.onclick = function(e){
		e.stopPropagation();

		if(el.querySelector('.submenu.-shown')){
			g('.section-menu')[0].classList.remove('-submenu_shown');
			el.querySelector('.submenu').classList.remove('-shown');
		} else {
			g('.section-menu')[0].classList.add('-submenu_shown');
			g('.section-menu .itm_cont .submenu').forEach(function(sm){
				sm.classList.remove('-shown');
			})
			el.querySelector('.submenu').classList.add('-shown');
		}
	}
})
document.onclick = function(){
	if(g('.section-menu.-submenu_shown')[0]){
		g('.section-menu')[0].classList.remove('-submenu_shown');
		g('.section-menu .itm_cont .submenu.-shown')[0].classList.remove('-shown');
	}
}

// == menuMob
body.scrollPos = 0;
g('.js_menuSwitcher').forEach(function(el){
	el.onclick = function(){
		if(!body.classList.contains('-menuShown')){
			body.scrollPos = window.scrollY;
			body.classList.add('-menuShown');
		} else {
			body.classList.remove('-menuShown');
			window.scrollTo(0, body.scrollPos);
			body.scrollPos = 0;
		}
		g('#menuMob')[0].classList.toggle('-shown');
	}
})

g('.js_searchToggler').forEach(function(el){
	el.onclick = function(){
		let isactive = this.classList.contains('-active') ? true : false;
		
		g('.js_searchToggler, .js_searchField').forEach(function(ell){
			if(!isactive) {
				ell.classList.add('-active')
			} else {
				ell.classList.remove('-active')
			}
		})
	}
})


// == popUp
document.querySelectorAll('.popUp').forEach(function(el){
	el.onclick = function(e){e.stopPropagation()}
})
document.querySelectorAll('.popUpCont').forEach(function(el){
	el.onclick = function(){
		el.classList.remove('-shown');
		document.querySelector('html').classList.remove('-modal');
	}
})
document.querySelectorAll('.popUp_close').forEach(function(el){
	el.onclick = function(){
		el.closest('.popUpCont').classList.remove('-shown');
		document.querySelector('html').classList.remove('-modal');
	}
})


// == PopUp Open
document.querySelectorAll('.js_popUp_open').forEach(function(el){
	el.onclick = function(e){
		e.preventDefault();
		document.querySelector('#popUp-'+el.getAttribute('for')).classList.add('-shown');
		document.querySelector('html').classList.add('-modal');
	}
})


// Slider-top
if(g('.js_sliderTop')[0]){
	var sliderTop = new Flickity(document.querySelector('.js_sliderTop'), {
		draggable: false,
		wrapAround: true,
		// pageDots: false,
		// prevNextButtons: false,
		fade: true,
		// autoPlay: 5000,
		pauseAutoPlayOnHover: false,
	});
	document.querySelectorAll('.js_sliderTop.carousel .sliderButtons .prev').forEach(function(el){
		el.onclick = function(){
			sliderTop.previous();
		}
	})
	document.querySelectorAll('.js_sliderTop.carousel .sliderButtons .next').forEach(function(el){
		el.onclick = function(){
			sliderTop.next();
		}
	})
}


function onResize(){
	var screenWidth = window.screen.width;
	console.log()

	if(g('.js_sliderTop')[0]){
		sliderTop.destroy();
		g('.js_sliderTop')[0].style.height = window.innerHeight;
		sliderTop = new Flickity('.js_sliderTop');
	}

	if(g('body.page-contacts')[0]){
		setTimeout(function(){
			setMapSize(screenWidth);
		},100)
	}

	if(g('body.page-about')[0]){
		let wideScreen = screenWidth > 700;
		let infoSliders = g('.js_infoSlider');
		if(infoSliders[0]){infoSliders.forEach(function(slider){
			let fslider = new Flickity(slider);
			if(wideScreen) {fslider.destroy()}
		})}
	}

	if(g('body.page-rink')[0]){
		// let wideScreen = screenWidth > 1200;
		// let days_slider = new Flickity(g('.days_cont .days')[0], {
		// 	// freeScroll: true,
		// 	// wrapAround: true
		// });
		// console.log(days_slider)
		// days_slider.select(5)
		// if(!wideScreen){
		// 	days_slider.destroy();
		// }
		
	}

	// if (matchMedia('screen and (max-width: 770px)').matches) {
	// 	sliders.forEach(function(slider){
	// 		var fslider = new Flickity(slider, {
	// 			wrapAround: false,
	// 		});
	// 	})
	// }
}
window.addEventListener('resize', function() {
	onResize()
}, true);
onResize();


var sliders = g('.js_carousel');
if(sliders[0]){sliders.forEach(function(slider){
	var fslider = new Flickity(slider, {
		// wrapAround: true,
		contain: true,
		cellAlign: 'left',
		// lazyLoad: 2,
	});
})}



// PAGE Contacts
function setMapSize(screenWidth){
	// не только карту
	let wideScreen = screenWidth > 760;
	let infoSliders = g('.js_infoSlider');
	if(infoSliders[0]){infoSliders.forEach(function(slider){
		let fslider = new Flickity(slider);
		if(wideScreen) {fslider.destroy()}
	})}

	// myMap.setBounds(myMap.geoObjects.getBounds());
	if(screenWidth < 1200) {
		myMap.setBounds(myMap.geoObjects.getBounds());
	}

	if(screenWidth < 500) {
		myMap.setCenter([55.756, 37.710]);
	}
}


if(g('body.page-contacts')[0]){
	ymaps.ready(initMapLocation);
	function initMapLocation() {
		var myMap = new ymaps.Map("map", {
			center: [55.7496, 37.715],
			zoom: 16,
			controls: []
		}, {suppressMapOpenBlock: true}
		);
		window.myMap = myMap;
		
		myMap.behaviors.disable('scrollZoom');

		let logo = new ymaps.Placemark([55.7468, 37.705], {}, {
			iconLayout: 'default#imageWithContent',
			iconContentLayout: ymaps.templateLayoutFactory.createClass(
				'<div class="mapLogo"><img src="img/logo.svg"</div>'
			),
			iconImageOffset: [-90, -75],
			iconImageHref: ''
		});

		let safeFrame = new ymaps.Polyline([
			[55.752684, 37.720120],
			[55.745571, 37.703657],
		], {}, {
			strokeColor: "#fff0",
		});

		

		let pathBus = new ymaps.Polyline([
			[55.751367, 37.715778],
			[55.748667, 37.701535],
			[55.748336, 37.701734],
			[55.748763, 37.704038],
			[55.747896, 37.704487],
			[55.747966, 37.704996],
		], {}, {
			strokeColor: "#ee712f",
			strokeWidth: 3,
		});

		let pathCar = new ymaps.Polyline([
			[55.751367, 37.715778],
			[55.748522, 37.701383],
			[55.748341, 37.700079],
			[55.748313, 37.699312],
			[55.748195, 37.698231],
			[55.748203, 37.697673],
			[55.748451, 37.697297],
			[55.748958, 37.697722],
			[55.749017, 37.698029],
			[55.748833, 37.698601],
			[55.748264, 37.698992],
			[55.748012, 37.699036],
			[55.747045, 37.699426],
			[55.746873, 37.699416],
			[55.746806, 37.699205],
			[55.746894, 37.698968],
			[55.747547, 37.698710],
			[55.747768, 37.698813],
			[55.748024, 37.699437],
			[55.748736, 37.703141],
			[55.748739, 37.703568],
			[55.748701, 37.703738],
			[55.748564, 37.703945],
			[55.746922, 37.704824],
			[55.747021, 37.705128],
		], {}, {
			strokeColor: "#ee712f",
			strokeWidth: 3,
		});

		let pathWalk = new ymaps.Polyline([
			[55.751367, 37.715778],
			[55.751276, 37.716668],
			[55.750149, 37.711176],
			[55.750126, 37.710589],
			[55.748801, 37.704074],
			[55.748070, 37.704410],
		], {}, {
			strokeColor: "#ee712f",
			strokeWidth: 3,
		});
		

		let pathBus_info = new ymaps.Placemark([55.751367, 37.715778], {}, {
			iconLayout: 'default#imageWithContent',
			iconContentLayout: ymaps.templateLayoutFactory.createClass(
				`<div class="pathInfo -bus -selected">
					<div class="labelTitle">Метро | Выход №5</div>
					<div class="ttl">Авиамоторная</div>
					<div class="itms">
						<div class="itm">
							<div class="img"><img src="img/ico_tram.png" /></div>
							<div class="labelTitle">Метро | Выход №5</div>
							<div class="value">12, 38, 46 </div>
						</div>
						<div class="itm">
						<div class="img"><img src="img/ico_bus.png" /></div>
							<div class="labelTitle">Маршрутное такси</div>
							<div class="value">Город – Авиамоторная</div>
						</div>
						<div class="itm">
						<div class="img"><img src="img/ico_bus.png" /></div>
							<div class="labelTitle">Автобус</div>
							<div class="value">8056, н4, т53</div>
						</div>
					</div>
				</div>`
			),
			iconImageHref: ''
			// iconImageOffset: [0, 0],
		});

		myMap.geoObjects
			.add(logo)
			.add(safeFrame)
			.add(pathBus)
			.add(pathCar)
			.add(pathWalk)
			.add(pathBus_info)
			;

		setMapSize(window.screen.width);

		myMap.routes = [];
		myMap.routes.bus = pathBus;
		myMap.routes.car = pathCar;
		myMap.routes.walk = pathWalk;

		routeSet('bus');
	}

	function routeSet(routeId){
		// переключаем пути
		for(let el in myMap.routes){
			myMap.routes[el].options.set('visible', false);
		}
		if(myMap.routes[routeId]){
			myMap.routes[routeId].options.set('visible', true);
		}
	}

	// переключение маршрутов
	function changeRoute(routeId){
		let mapButtons = g('.section-map .overlay_buttons .button');
		let curButton = g('.section-map .overlay_buttons')[0].querySelector('.-' + routeId);

		// переключаем кнопки
		mapButtons.forEach(function(el){
			el.classList.remove('-selected');
		})
		curButton.classList.add('-selected')

		// переключаем информацию
		g('.section-map .pathInfo').forEach(function(el){
			el.classList.remove('-selected');
		})
		let info_el = g('.section-map .pathInfo.-' + routeId)[0];
		if(info_el){
			info_el.classList.add('-selected');
		}

		// переключаем мобильный селектер
		g('.section-map .selecter .__select__label.-' + routeId)[0].click();
		
		// переключаем пути
		routeSet(routeId);
	}

	// вешаем онклик на кнопки и мобильный список
	let pathSelrs = g('.section-map .overlay_buttons .button, .section-map .selecter .__select__label');
	if(pathSelrs[0]){pathSelrs.forEach(function(el){
		el.addEventListener('click', function(){
			changeRoute(el.getAttribute('target'));
		})
	})}
}
// \\ КАРТА



// СХЕМА
// function throttle(callback, wait) {
// 	var timeout
// 	return function(e) {
// 		if (timeout) return;
// 		timeout = setTimeout(() => (callback(e), timeout=undefined), wait)
// 	}
// }

if(g('body.page-schema')[0]){
	// var curPlan = g('.js_planCont svg')[0];

	// Управление картой
	function getCoords(plan) {
		var zoom = window.getComputedStyle(plan).transform.slice(7,-1).split(', ')[0];
		let box = plan.getBoundingClientRect();
		let menuTop = g('.section-schemaMenu')[0].getBoundingClientRect().top;
		let zoomk_x = (box.width - box.width/zoom) /2;
		let zoomk_y = (box.height - box.height/zoom) /2;
		return {
			top: box.top + zoomk_y + pageYOffset,
			left: box.left + zoomk_x + pageXOffset,
			width: box.width,
			height: box.height,

			Xmin: -box.width/2,
			Xmax: window.innerWidth/2 + zoomk_x,
			Ymin: window.innerHeight*.1 + menuTop - box.height*.8  + zoomk_y,
			Ymax: window.innerHeight/2 + zoomk_y,
		};
	}

	// Перетаскивание
	function pan(plan){
		var coords = shiftX = shiftY = '';

		// Мышь
		plan.addEventListener('mousedown', function(e){
			g('.js_bubble')[0].classList.remove('-shown');

			coords = getCoords(plan);
			shiftX = e.pageX - coords.left;
			shiftY = e.pageY - coords.top;
			moveAt(e);
	
			function moveAt(e) {
				let targetX = e.pageX - shiftX;
				let targetY = e.pageY - shiftY;
				if(targetX > coords.Xmin && targetX < coords.Xmax) {
					plan.style.left = targetX + 'px';
				}
				if(targetY > coords.Ymin && targetY < coords.Ymax) {
					plan.style.top = targetY + 'px';
				}
			}

			document.onmousemove = function(e) {
				moveAt(e);
			}
	
			document.onmouseup = function() {
				document.onmousemove = null;
				plan.onmouseup = null;
			}
		})

		// Тач
		function getPos(e){
			return {
				x: e.changedTouches[0].clientX,
				y: e.changedTouches[0].clientY
			}
		}
		plan.addEventListener('touchstart', function(e){
			e.preventDefault();
			e.stopPropagation();

			g('.js_bubble')[0].classList.remove('-shown');

			coords = getCoords(plan);
			shiftX = getPos(e).x - coords.left;
			shiftY = getPos(e).y - coords.top;
		})

		plan.addEventListener('touchmove', function(e){
			e.preventDefault();
			e.stopPropagation();

			g('.js_bubble')[0].classList.remove('-shown');

			let targetX = getPos(e).x - shiftX;
			let targetY = getPos(e).y - shiftY;

// console.log(coords.Xmin+ ' > '+ targetX + ' < ' + coords.Xmax)
// console.log(coords.Ymin+ ' > '+ targetY + ' < ' + coords.Ymax)

			if(targetX > coords.Xmin && targetX < coords.Xmax) {
				plan.style.left = targetX + 'px';
			}
			if(targetY > coords.Ymin && targetY < coords.Ymax) {
				plan.style.top = targetY + 'px';
			}
		})
	}
	

	// Zoom
	function zoom(plan){
		var zoomStep = .3;
		function planZoom(to){
			let planPos = window.getComputedStyle(plan).transform.slice(7,-1).split(', ');
			let zoom_cur = planPos[0];
			let zoom = zoom_cur;
			if(to > 0 && zoom_cur < 2) {
				zoom = planPos[0]*1+zoomStep;
			} else if(to < 0 && zoom_cur > .8){
				zoom = planPos[0]*1-zoomStep
			}

			plan.style.transform = 'scale('+ zoom +')';
		}
		g('.js_zoom').forEach(function(el){
			el.addEventListener('click', function(){
				let zoomTo = el.classList.contains('-plus') ? 1 : -1;
				planZoom(zoomTo)
			})
		})
		document.addEventListener('wheel', function(e) {
			let delta = e.deltaY || e.detail || e.wheelDelta;
			planZoom(-delta)
		})
	}


	// Заполнение схемы
	let data = JSON.parse(g('.js_json')[0].innerHTML);

	function bubble_show(roomId){
		let shopInData = '';
		for(let shopId in data){
			if(data[shopId].ids[0] === roomId){
				shopInData = data[shopId];
			}
		}

		if(shopInData){
			let bubble = g('.js_bubble')[0];
				bubble.setAttribute('href', '/shop/id'+ shopInData.ids[0]);
			g('.js_bubble .shopCat')[0].innerHTML = shopInData.category;
			g('.js_bubble .shopName')[0].innerHTML = shopInData.name;

			let shopInPlan = document.getElementById(shopInData.ids[0])
			let shopSizes = shopInPlan.getBoundingClientRect();
				bubble.style.cssText = 'top:'+ shopSizes.top +'px; left:'+ (shopSizes.left + shopSizes.width/2) + 'px;'

			setTimeout(function(){
				bubble.classList.add('-shown');
			}, 100);
		}
	}

	// Выделение магазина
	function roomClick(roomId){
		g('#shops .-selected').forEach(function(sh){
			sh.classList.remove('-selected');
		})
		g('.js_bubble')[0].classList.remove('-shown');

		if(roomId && g('#'+ roomId)[0].classList.contains('shop')){
			g('#'+ roomId)[0].classList.add('-selected');
			bubble_show(roomId);
		}
	}

	// Клик по схеме
	function planClick(plan){
		// Мышь
		plan.addEventListener('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			
			g('.js_byName .results')[0].classList.remove('-shown');
			roomClick(e.target.id);
		})
		// Тач
		plan.addEventListener('touchstart', function(e){
			e.preventDefault();
			e.stopPropagation();

			if(e.targetTouches.length > 0){
				plan.tshopClick = {
					time: (new Date()).getTime(),
					roomId: e.targetTouches[0].target.id
				}
			}
		})
		plan.addEventListener('touchend', function(e){
			e.preventDefault();
			e.stopPropagation();

			let click_duration = (new Date()).getTime() - plan.tshopClick.time;
			if(click_duration < 300){
				// собыитя клика
				roomClick(plan.tshopClick.roomId)
			} else {
				plan.tshopClick = null;
			}
		})
	}
	// \\ клик по магазину

	// Перебераем json и вешаем значения на магазины
	function shopsInit(plan){
		for(let shopId in data){
			let shopInData = data[shopId];
			let sh = g('#'+shopInData.ids[0])[0];	// пока только первый id
				// Поставим классы для всех магазинов из json
				sh.classList.add('shop');
				// Добавим магазинам категории
				// sh.setAttribute('cat', shopInData.categoryId);
		}
	}

	// Клик в пустоту сбрасывает выделение магазинов
	document.addEventListener('click', function(){
		roomClick();

		// и поиск по магазинам
		g('.js_byName .results')[0].classList.remove('-shown');
	})

	// Выбор магазинов по категории (в json)
	function byCategory_whipe(){
		console.log(g('.js_byCategory #singleSelect0')[0])
		g('.js_byCategory #singleSelect0')[0].click();
	}
	g('.js_byCategory .__select__label').forEach(function(label){
		label.addEventListener('click', function(){
			let tcat = label.getAttribute('cat');

			g('#shops .-selectedSpec').forEach(function(sh){
				// Убираем предыдущее выделение по категории
				sh.classList.remove('-selectedSpec');
				// И по названию
				byName_whipe();
			})
			for(let shopId in data){
				if(data[shopId].categoryId === tcat){
					g('#'+ data[shopId].ids[0])[0].classList.add('-selectedSpec');
				}
			}
		})
	})

	// Поиск по названию (в json)
	function byName_whipe(){
		g('.js_byName input')[0].value = null;
		g('.js_byName .results')[0].classList.remove('-shown');
	}
	g('.js_byName input')[0].addEventListener('input', function(){
		byCategory_whipe();
		let results = g('.js_byName .results')[0];
			results.innerHTML = '';
		let res_itms = '';

		for(let sh in data){
			let shop_p = g('#'+data[sh].ids[0])[0];

			if(this.value.length > 2 && data[sh].name.indexOf(this.value) >= 0){
				shop_p.classList.add('-selectedSpec');

				// Формируем выпадающий список
				res_itms += '<a class="itm" href="#'+ data[sh].ids[0] +'">'+ data[sh].name +'</a>';
			} else {
				shop_p.classList.remove('-selectedSpec')
			}
		}

		results.innerHTML = res_itms;
		results.classList.add('-shown');

		// Показываем магаз при клике
		g('.results .itm').forEach(function(itm){
			itm.addEventListener('click', function(e){
				e.preventDefault();
				e.stopPropagation();

				roomClick(itm.getAttribute('href').split('#')[1])
			})
		})
	})


	// Переключение этажей
	let lvls = g('.js_levelSelecter .lvl');
	lvls.forEach(function(el){
		el.addEventListener('click', function(){
			// Переключатели
			lvls.forEach(function(l){
				l.classList.remove('-selected');
			})
			this.classList.add('-selected');

			// Переключение
			let tLvl = this.getAttribute('lvl');

			// ajax({
			// 	url: someURL,
			// 	type: 'post',
			// 	contentType: 'application/json; charset=utf-8',
			// 	data: JSON.stringify({
			// 		something: something,
			// 		anotherthing: anotherthing
			// 	})
			// }).then(
			// 	function fulfillHandler(data) {
			// 	  // ...
			// 	},
			// 	function rejectHandler(jqXHR, textStatus, errorThrown) {
			// 	  // ...
			// 	}
			// ).catch(function errorHandler(error) {
			// 	// ...
			// });

			console.log(plan)

			// planInit(js_planCont);
		})
	})

	function planInit(plan){
		pan(plan);
		zoom(plan);
		shopsInit(plan);
		planClick(plan);
	}
	planInit(g('.js_planCont svg')[0]);

	// Показ комнаты по url
	if(document.location.hash){
		roomClick(document.location.hash.split('#')[1])
	}
}


if(g('body.page-about')[0]){
	let menuPage_itms = g('.js_pageMenu .itm');
	menuPage_itms.forEach(function(itm){
		itm.onclick = function(){
			menuPage_itms.forEach(function(el){
				el.classList.remove('-selected');
			})
			itm.classList.add('-selected');
		}
	})

	// При прокрутке обратно вверх выбираем первый пункт
	document.addEventListener('scroll', function(e){
		if(window.scrollY < 300){
			menuPage_itms.forEach(function(el){
				el.classList.remove('-selected');
			})
			menuPage_itms[0].classList.add('-selected');
		}
	})

	let menuForms_itms = g('.js_menuForms .itm');
	menuForms_itms.forEach(function(itm){
		itm.onclick = function(){
			let selClass = itm.getAttribute('for');
			menuForms_itms.forEach(function(el){
				el.classList.remove('-selected');
			})
			itm.classList.add('-selected');

			g('.section-rent .row').forEach(function(r){
				r.classList.remove('-selected');
			})
			g('.section-rent .row.' + selClass)[0].classList.add('-selected');
		}
	})
}


if(g('body.page-rink')[0]){
	var d = new Date();
	var n = d.getDay();
	g('.days .day')[n-1].classList.add('-today');

	// Центрируем текущий день
	let dayCurPar = g('.days_cont .day.-today')[0].getBoundingClientRect();
	g('.days_cont')[0].scrollLeft = dayCurPar.left - (window.innerWidth - dayCurPar.width) / 2;
}



// Forms1
// g('.form').forEach(function(form,i){
// 	let input_name = form.querySelector('.input_txt[name="name"]'),
// 		input_phone = form.querySelector('.input_txt[name="phone"]');

// 	let maskN = IMask(input_name, {mask: /^[А-яA-z0-9 ]+$/});
// 	let maskP = IMask(input_phone, {mask: '+{7} (000) 000-00-00'});

// 	let validator = new FormValidator(form, [{
// 		name: 'name',
// 		rules: 'required|min_length[2]',
// 	},{
// 		name: 'phone',
// 		rules: 'required|min_length[18]',
// 	}], function(errors, e) {
// 		form_validate(errors, form, e);
// 	});

// 	let button = form.querySelector('.button');
// 	if(button.nodeName != 'BUTTON'){
// 		button.onclick = function(){
// 			form.requestSubmit()
// 		}
// 	}
// })
// \\ Forms1






}, false);