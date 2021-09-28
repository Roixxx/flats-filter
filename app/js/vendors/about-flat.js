
let aboutFlatHtmlStart = `

<td class="about-flat">

	<div class="about-flat__lables-holder">
		<div class="about-flat__lable green-lable">Скидка 2% <img src="./assets/images/green-label.svg" alt="?"></div>
		<div class="about-flat__lable orange-lable">Материнский капитал<img src="./assets/images/orange-label.svg" alt="?"></div>
		<div class="about-flat__lable violet-lable">Ипотека от 0,1 %</div>
	</div>

	<div class="about-flat__main">
		<div class="about-flat__img-holder">
			<img src="./assets/images/flat.jpg" alt="flat">
		</div>

		<div class="about-flat__info-holder">
`

let aboutFlatHtmlEnd = `

			<a class="about-flat__link" href="#">Подробное описание<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd"
					d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L5.70711 4.29289C6.09763 4.68342 6.09763 5.31658 5.70711 5.70711L1.70711 9.70711C1.31658 10.0976 0.683417 10.0976 0.292893 9.70711C-0.0976311 9.31658 -0.0976311 8.68342 0.292893 8.29289L3.58579 5L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
					fill="#367EE7" />
			</svg></a>
		</div>
	</div>

	<div class="feedback">
		<p class="feedback__title">Хотите записаться на просмотр объекта?</p>
		<p>Оставьте свои данные, и мы организуем просмотр в удобное для вас время.</p>

		<form class="feedback__form" action="#" method="post">
			<div>
				<label class="feedback__label" for="name">Имя</label>
				<input class="feedback__input" placeholder="Введите имя" type="text" name="name" id="name">
			</div>
			<div>
				<label class="feedback__label" for="tel">Телефон</label>
				<input class="feedback__input" placeholder="+7" type="text" name="tel" id="tel">
			</div>
			<div>
				<input class="feedback__btn" type="submit" value="Оставить заявку">
			</div>
		</form>

		<p class="feedback__privacy">
			Оставляя заявку вы соглашаетесь с <a href="#">политикой конфидециальности</a>
		</p>
	</div>

</td>
`