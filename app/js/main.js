
//контейнеры 
const resultContainer = document.querySelector('.result');
const flatsContainer = document.getElementById('flats-container');

//кнопки и инпуты
const showFlatsBtn = document.getElementById('showFlatsBtn');
const filterBtnsArr = document.querySelectorAll('.filter__btn');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');
const filterFromToInputArr = document.querySelectorAll('.filter__from-to-input-inner');

//секции и заголовки
const noResultSection = document.querySelector('.no-result');
const aboutFlatSection = document.querySelectorAll('.about-flat');
const flatsFoundTitle = document.getElementById('flatsFoundTitle');


class Flats {

	constructor() {
		this.flats = "";
	}

	//получить список квартир
	getFlats() {
		return new Promise((resolve, reject) => {
			fetch('./assets/data/flats.json')
				.then(res => res.json())
				.then(data => this.flats = data.flats)
				.then(() => resolve())
				.catch(err => reject(err));
		});
	}

	//всего найдено квартир
	countTotalFlats() {
		this.flats.length;
	}

	//фильтр квартир
	filterFlats() {
		// записываем введеные значения для фильтра
		const rooms = [...document.querySelectorAll('.filter__btn.active')].map(el => el.dataset.value);

		const priceMin = document.querySelector('#priceMin').value;
		const priceMax = document.querySelector('#priceMax').value;

		const spaceMin = document.querySelector('#spaceMin').value;
		const spaceMax = document.querySelector('#spaceMax').value;

		let filtredFlats = [];

		filtredFlats = flats.flats.filter(flat => (

			//Фильтр цены
			(!priceMin || priceMin <= flat.price) && (!priceMax || priceMax >= flat.price)
			//Фильтр площади
			&& (!spaceMin || spaceMin <= flat.space) && (!spaceMax || spaceMax >= flat.space)
			//Фильтр комнат
			&& (rooms.includes(flat.rooms) || rooms[0] == undefined)
		));

		showFlatsBtn.innerHTML = `Показать ${filtredFlats.length} квартир`;
		setMinMaxPlaceholders(filtredFlats);

		return filtredFlats;
	}

	//рендер квартир
	renderFlats(flats) {

		let tableHead = `<tr class="result__row">
				<th class="result__cell">Тип</th>
				<th class="result__cell">Этаж</th>
				<th class="result__cell">Срок сдачи</th>
				<th class="result__cell">Площадь</th>
				<th class="result__cell">Стоимость</th>
				<th class="result__cell result__buttons-cell"></th>
			</tr>`;
		let tableBody = '';

		flats.forEach(({ rooms, floor, term, space, price, finishing, building}) => {

			tableBody += `
				<tr class="result__row">
					<td class="result__cell">${rooms}</td>
					<td class="result__cell">${floor}</td>
					<td class="result__cell">${term}</td>
					<td class="result__cell">${space} м²</td>
					<td class="result__cell result__price">${numberWithSpaces(price)} ₽</td>
					<td class="result__cell result__buttons-cell">
						<button class="result__favour"><img src="./assets/images/heart-icon.svg" alt="favourites"></button>
						<button class="result__show-item"><img src="./assets/images/arrow-icon.svg" alt="arrow"></button>
					</td>

					${aboutFlatHtmlStart}

					<p class="about-flat__title">${rooms}</p>
					<p class="about-flat__price">${numberWithSpaces(price)} ₽</p>
					<p class="about-flat__space">${space} м²</p>

					<div class="about-flat__middle-row">
						<div class="about-flat__col">
							<p class="about-flat__property">Цена за м²</p>
							<p>${numberWithSpaces( Math.round(price/space) )} ₽</p>
						</div>
						<div class="about-flat__col">
							<p class="about-flat__property">Отделка</p>
							<p>${finishing}</p>
						</div>
						<div class="about-flat__col">
							<p class="about-flat__property">Корпус</p>
							<p>${building}</p>
						</div>
					</div>

					${aboutFlatHtmlEnd}
				</tr>
			`;

		});

		flatsContainer.innerHTML = tableHead + tableBody;
		flatsFoundTitle.innerHTML = `Найдено ${flats.length} квартир`;
		setAboutItemToggler();
		setMinMaxPlaceholders(flats);
	}

	//рендер ничего не найдено
	renderNoFlats() {
		noResultSection.classList.add('active');
		resultContainer.classList.add('active');
	}

}

let flats = new Flats();

// После загрузки сайта 
flats.getFlats().then( () => {

	flats.renderFlats(flats.flats);
	flatsFoundTitle.innerHTML = `Найдено ${flats.flats.length} квартир`;
	showFlatsBtn.innerHTML = `Показать ${flats.flats.length} квартир`;

});

// Кнопки фильтра по комнатам
filterBtnsArr.forEach((btn) => {

	btn.addEventListener('click', (e) => {

		e.target.classList.toggle('active');
		flats.filterFlats(e.target);
	});
})

// Инпуты фильтра "от x до x"
filterFromToInputArr.forEach((input) => {
	input.addEventListener('keyup', flats.filterFlats);
})

// Кнопка показать найденые квартиры
showFlatsBtn.onclick = () => {
	let filteredFlats = flats.filterFlats();

	if (filteredFlats.length > 0) {

		flats.renderFlats(filteredFlats);
		noResultSection.classList.remove('active');
		resultContainer.classList.remove('active');

	} else {
		flats.renderNoFlats();
	}
};

// Кнопка сброса фильтров
resetFiltersBtn.onclick = () => {

	noResultSection.classList.remove('active');
	resultContainer.classList.remove('active');

	filterBtnsArr.forEach(el => {
		el.classList.remove('active');
	})

	filterFromToInputArr.forEach(el => {
		el.value = '';
	})

	flats.renderFlats(flats.filterFlats());
}


// Раскрывает информацию о квартире
function setAboutItemToggler() {
	
	const showItemBtns = document.querySelectorAll('.result__show-item');

	showItemBtns.forEach((el) => {

		el.addEventListener('click', () => {
			
			let rowHolder = el.parentElement.parentElement;
			let aboutHolder = rowHolder.querySelector('.about-flat');
			
			el.classList.toggle('active');
			rowHolder.classList.toggle('active');
			aboutHolder.classList.toggle('active');
		});
	})
}

// Устанавливает Placeholder на инпуты 
function setMinMaxPlaceholders(flats) {
	if (flats.length == 0) return false;

	let minPrice = flats[0].price;
	let maxPrice = flats[0].price;
	
	let minSpace = flats[0].space;
	let maxSpace = flats[0].space;


	flats.forEach((el) => {
		el.price < minPrice ? minPrice = el.price : false;
		el.price > maxPrice ? maxPrice = el.price : false;

		el.space < minSpace ? minSpace = el.space : false;
		el.space > maxSpace ? maxSpace = el.space : false;
	})
	
	priceMin.placeholder = numberWithSpaces(minPrice);
	priceMax.placeholder = numberWithSpaces(maxPrice);

	spaceMin.placeholder = minSpace;
	spaceMax.placeholder = maxSpace;
}

// Форматирует цену 
function numberWithSpaces(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}




