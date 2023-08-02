$(function(){
	
	/* СМЕНА АКТИВНОГО ТАБА В НАВИГАЦИИ */
	
	$(".navigation__bttn").on("click", function(){
		$(this).toggleClass("navigation__bttn--active");
		$(this).parent().siblings(".navigation__item").find(".navigation__bttn").each(function() {
			if ($(this).hasClass("navigation__bttn--active")) {
				$(this).toggleClass("navigation__bttn--active");
			}
		});
	});
	
	
	
	/* РАЗВЁРТЫВАНИЕ / СВОРАЧИВАНИЕ КОРЗИНЫ ПРИ КЛИКЕ ПО ЗАГОЛОВКУ */
	
	$(".cart-title__box").on("click", function() {
		$(this).parent().toggleClass("cart--active");
	});
	
	
	
	/* РАЗВЁРТЫВАНИЕ КОРЗИНЫ ПРИ КЛИКЕ ПО КНОПКЕ "СВЕРНУТЬ" */
	
	$(".cart-minimize").on("click", function() {
		$(this).parents(".cart").toggleClass("cart--active");
	});
	
	
	
	/* ОПРЕДЕЛЕНИЕ НАПОЛНЕННОСТИ КОРЗИНЫ */
	
	var cartContent = $.trim($(".cart-content__item-name").html()).length;
//	console.log(cartContent);
//	console.log(typeof cartContent);
	
	if (cartContent !== 0) {
		$(".cart-content__empty-line").toggle();
		console.log("Корзина не пуста");
	} else {
		$(".cart-content__full").toggle();
		console.log("Корзина пуста");
	}
	
	
	
	/* ПЕРЕКЛЮЧЕНИЕ КАТАЛОГА */
	
	$(".navigation__bttn").on("click", function(){
		var dataButtonContent = $(".navigation__bttn--active").attr("data-button");
//		console.log(dataButtonContent);
//		console.log(typeof dataButtonContent);
		
		$(".catalog-content--active").toggleClass("catalog-content--active");
			
		$(".catalog-content").each(function() {			
			var dataCatalog = $(this).attr("id");
//			console.log(dataCatalog);
//			console.log(typeof dataCatalog);
			
			if (dataCatalog == dataButtonContent) {
				$(this).toggleClass("catalog-content--active");
//				console.log(true);
			} else {
//				console.log(false);
			}
		});
	});
	
	
	
	/* МОДАЛЬНОЕ ОКНО ПРОДУКТА --- MARGIN-BOTTOM ЭЛ-ТА ПЕРЕД КНОПКОЙ "ДОБАВИТЬ" */
	
	var viewportWidth = $(window).width();
//	console.log("viewportWidth is " + viewportWidth + "px");
	
	var viewportHeight = $(window).height();
//	console.log("viewportHeight is " + viewportHeight + "px");
	
	var modalMainHeight = $(".modal__main").outerHeight();
//	console.log("modalMainHeight is " + modalMainHeight + "px");
	
	if (viewportWidth < 768 && modalMainHeight > viewportHeight) {
		$(".modal__top").css("margin-bottom" , "20px");
	}
	

	
	
	/* ПОКАЗ СЕКЦИИ ДОСТАВКИ В ФОРМЕ МОДАЛЬНОГО ОКНА */
	
	$(".modal__form-label").on("click", function() {
		var dataLabel = $(this).attr("data-label");
//		console.log(dataLabel);
		
		var deliveryCourierChecked = $(this).find(".modal__form-input").prop("checked");
//		console.log(deliveryCourierChecked);
		
		if ($(this).find(".modal__form-input").prop("checked") && dataLabel == "courier") {
			$(this).parent().siblings(".modal__form-fieldset--address").css("visibility", "visible");
			$(this).parent().siblings(".modal__form-fieldset--address").find("[name='address']").prop("required", true);
		} else {
			$(this).parent().siblings(".modal__form-fieldset--address").css("visibility", "hidden");
			$(this).parent().siblings(".modal__form-fieldset--address").find("[name='address']").prop("required", false);
		}
	});
	
	
	
	/* ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА */
	
		/* ПРИ КЛИКЕ ПО КНОПКЕ "X" */
	
		$(".modal__close").on("click", function() {
			$(".modal").css("display", "none");
			
			/* ПЕРЕСОЗДАНИЕ СЧЁТЧИКА */
			
			$(".modal__counter").remove();
			$('<div class="modal__counter"><button class="modal__counter-bttn modal__counter--minus" title="Уменьшить количество товаров">-</button><input class="modal__counter-counter-num" type="number" min="1" max="100" step="1" value="1" readonly><button class="modal__counter-bttn modal__counter--plus" title="Увеличить количество товаров">+</button></div>').insertAfter(".modal__button");
				
			
			/* ИЗМЕНЕНИЕ КОЛИЧЕСТВА ТОВАРА В МОДАЛЬНОМ ОКНЕ (копия скрипта для обнуления счётчика) */

			$('.modal__counter').each(function() {
			  var spinner = $(this),
				input = spinner.find('input[type="number"]'),
				btnUp = spinner.find('.modal__counter--plus'),
				btnDown = spinner.find('.modal__counter--minus'),
				min = input.attr('min'),
				max = input.attr('max');

			  btnUp.click(function() {
				var oldValue = parseFloat(input.val());
				if (oldValue >= max) {
				  var newVal = oldValue;
				} else {
				  var newVal = oldValue + 1;
				}
				spinner.find("input").val(newVal);
				spinner.find("input").trigger("change");
			  });

			  btnDown.click(function() {
				var oldValue = parseFloat(input.val());
				if (oldValue <= min) {
				  var newVal = oldValue;
				} else {
				  var newVal = oldValue - 1;
				}
				spinner.find("input").val(newVal);
				spinner.find("input").trigger("change");
			  });
			});
		});

	
		/* ПРИ КЛИКЕ ВНЕ МОДАЛЬНОГО ОКНА */
	
		$(".modal").click(function (click) {
			if ($(click.target).closest(".modal__main").length) {
			// клик внутри элемента
				return;
			}
			// клик снаружи элемента
			$(".modal__main").fadeOut();
			$(".modal").css("position", "static");
			
			
			/* ПЕРЕСОЗДАНИЕ СЧЁТЧИКА */
			
			$(".modal__counter").remove();
			$('<div class="modal__counter"><button class="modal__counter-bttn modal__counter--minus" title="Уменьшить количество товаров">-</button><input class="modal__counter-counter-num" type="number" min="1" max="100" step="1" value="1" readonly><button class="modal__counter-bttn modal__counter--plus" title="Увеличить количество товаров">+</button></div>').insertAfter(".modal__button");
			
			/* ИЗМЕНЕНИЕ КОЛИЧЕСТВА ТОВАРА В МОДАЛЬНОМ ОКНЕ (копия скрипта для обнуления счётчика) */

			$('.modal__counter').each(function() {
			  var spinner = $(this),
				input = spinner.find('input[type="number"]'),
				btnUp = spinner.find('.modal__counter--plus'),
				btnDown = spinner.find('.modal__counter--minus'),
				min = input.attr('min'),
				max = input.attr('max');

			  btnUp.click(function() {
				var oldValue = parseFloat(input.val());
				if (oldValue >= max) {
				  var newVal = oldValue;
				} else {
				  var newVal = oldValue + 1;
				}
				spinner.find("input").val(newVal);
				spinner.find("input").trigger("change");
			  });

			  btnDown.click(function() {
				var oldValue = parseFloat(input.val());
				if (oldValue <= min) {
				  var newVal = oldValue;
				} else {
				  var newVal = oldValue - 1;
				}
				spinner.find("input").val(newVal);
				spinner.find("input").trigger("change");
			  });
			});
		});
	

		/* ПРИ НАЖАТИИ НА ESC */
	
		$(document).on('keyup', function(pressKey) {
			if (pressKey.key == "Escape" ) {
				$(".modal__main" ).hide();
				$(".modal").css("position", "static");
			}
			
			/* ПЕРЕСОЗДАНИЕ СЧЁТЧИКА */
			
			$(".modal__counter").remove();
			$('<div class="modal__counter"><button class="modal__counter-bttn modal__counter--minus" title="Уменьшить количество товаров">-</button><input class="modal__counter-counter-num" type="number" min="1" max="100" step="1" value="1" readonly><button class="modal__counter-bttn modal__counter--plus" title="Увеличить количество товаров">+</button></div>').insertAfter(".modal__button");

			/* ИЗМЕНЕНИЕ КОЛИЧЕСТВА ТОВАРА В МОДАЛЬНОМ ОКНЕ (копия скрипта для обнуления счётчика) */

			$('.modal__counter').each(function() {
				  var spinner = $(this),
					input = spinner.find('input[type="number"]'),
					btnUp = spinner.find('.modal__counter--plus'),
					btnDown = spinner.find('.modal__counter--minus'),
					min = input.attr('min'),
					max = input.attr('max');

				  btnUp.click(function() {
					var oldValue = parseFloat(input.val());
					if (oldValue >= max) {
					  var newVal = oldValue;
					} else {
					  var newVal = oldValue + 1;
					}
					spinner.find("input").val(newVal);
					spinner.find("input").trigger("change");
				  });

				  btnDown.click(function() {
					var oldValue = parseFloat(input.val());
					if (oldValue <= min) {
					  var newVal = oldValue;
					} else {
					  var newVal = oldValue - 1;
					}
					spinner.find("input").val(newVal);
					spinner.find("input").trigger("change");
				  });
				});
		});
		
	
	
	/* ВЫЗОВ МОДАЛЬНОГО ОКНА ФОРМЫ ЗАКАЗА */
	
	$(".cart-content__button-order").on("click", function() {
		$(".modal").css("position", "fixed");
		$(".modal--delivery").css("display", "flex");
		$(".modal--product").css("display", "none");
		$(".modal__main").css("display", "flex");
	});
		
	
	
	/* ВЫЗОВ МОДАЛЬНОГО ОКНА ДОБАВЛЕНИЯ ТОВАРА */
	
	$(".catalog-content__item-image, 										          .catalog-content__item-name,												      .catalog-content__item-button").on("click", function() {
		$(".modal").css("position", "fixed");
		$(".modal--product").css("display", "flex");
		$(".modal--delivery").css("display", "none");
		$(".modal__main").css("display", "flex");
		
//		$(".modal__counter").attr("value", "1");
	});
	
	
	
	/* ПЕРЕДАЧА ЗНАЧЕНИЙ В МОДАЛЬНОЕ ОКНО */
	
	$(".catalog-content__item-image, 										          .catalog-content__item-name,												      .catalog-content__item-button").on("click", function() {
		
		/* СЧИТЫВАНИЕ ЗНАЧЕНИЙ */
		
		var headerText = $.trim($(this).parents(".catalog-content__item").find(".catalog-content__item-name").html());
//		console.log("\n");
//		console.log("Name is " + headerText);
		
		var imageLink = $.trim($(this).parents(".catalog-content__item").find(".catalog-content__item-image").attr("src"));
//		console.log(imageLink);
		
		var productDescription = $.trim($(this).parents(".catalog-content__item").find(".catalog-content__item-description").html());
//		console.log("Description is... " + productDescription);
		
		var productWeightNum = $.trim($(this).parents(".catalog-content__item").find(".catalog-content__item-weight-num").html());
//		console.log("Weight is " + productWeightNum);
				
		var productCaloriesNum = $.trim($(this).parents(".catalog-content__item").find(".catalog-content__item-calories-num").html());
//		console.log("Calories is " + productCaloriesNum);
		
		var productPriceNum = $.trim($(this).parents(".catalog-content__item").find(".catalog-content__item-price-num").html());
//		console.log("Price is " + productPriceNum);
		
		
		/* ЗАПИСЬ В МОДАЛЬНОЕ ОКНО */
		
		$(".modal--product .modal__title").text(headerText);
		$(".modal__content-image").attr("src" , imageLink);
		$(".modal__content-text").text(productDescription);
		$(".modal__content-constitution-weight-num").text(productWeightNum);
		$(".modal__content-constitution-calories-num").text(productCaloriesNum);
		$(".modal__price-num").text(productPriceNum);
		
	});
	
	
	
	/* ИЗМЕНЕНИЕ КОЛИЧЕСТВА ТОВАРА В МОДАЛЬНОМ ОКНЕ */
	
	$('.modal__counter').each(function() {
	  var spinner = $(this),
		input = spinner.find('input[type="number"]'),
		btnUp = spinner.find('.modal__counter--plus'),
		btnDown = spinner.find('.modal__counter--minus'),
		min = input.attr('min'),
		max = input.attr('max');

	  btnUp.click(function() {
		var oldValue = parseFloat(input.val());
		if (oldValue >= max) {
		  var newVal = oldValue;
		} else {
		  var newVal = oldValue + 1;
		}
		spinner.find("input").val(newVal);
		spinner.find("input").trigger("change");
	  });

	  btnDown.click(function() {
		var oldValue = parseFloat(input.val());
		if (oldValue <= min) {
		  var newVal = oldValue;
		} else {
		  var newVal = oldValue - 1;
		}
		spinner.find("input").val(newVal);
		spinner.find("input").trigger("change");
	  });
	});
	

	
	/* ИЗМЕНЕНИЕ КОЛИЧЕСТВА ТОВАРА В КОРЗИНЕ */
	
	$('.cart-content__item-counter').each(function() {
	  var spinner = $(this),
		input = spinner.find('input[type="number"]'),
		btnUp = spinner.find('.cart-content__item-counter-bttn--plus'),
		btnDown = spinner.find('.cart-content__item-counter-bttn--minus'),
		min = input.attr('min'),
		max = input.attr('max');

	  btnUp.click(function() {
		var oldValue = parseFloat(input.val());
		if (oldValue >= max) {
		  var newVal = oldValue;
		} else {
		  var newVal = oldValue + 1;
		}
		spinner.find("input").val(newVal);
		spinner.find("input").trigger("change");
	  });

	  btnDown.click(function() {
		var oldValue = parseFloat(input.val());
		if (oldValue <= min) {
		  var newVal = oldValue;
		} else {
		  var newVal = oldValue - 1;
		}
		spinner.find("input").val(newVal);
		spinner.find("input").trigger("change");
	  });
	});
		
	
	
	/* ПОДСЧЁТ КОЛИЧЕСТВА ТОВАРОВ И СУММЫ В МОДАЛЬНОМ ОКНЕ */
	
	$(".catalog-content__item-image, 										          .catalog-content__item-name,												      .catalog-content__item-button").on("click", function() {
			
		var currentPrice = $.trim($(".modal__price-num").html());
		console.log(currentPrice);
		
		$(".modal__counter-bttn").on("click", function() {
			var currentCount = $(".modal__counter-counter-num").prop("value");
			console.log(currentCount);
			
			var totalSum = currentPrice * currentCount;
			console.log(totalSum);
			
			$(".modal__price-num").html(totalSum);
		});
	});
	
	
	
	/* ПОДСЧЁТ КОЛИЧЕСТВА ТОВАРОВ В КОРЗИНЕ */
	
	$(".cart-content__item-counter-bttn").on("click", function() {
		
		var totalCount = 0;
		
		$(".cart-content__item").each(function() {
			var count = parseInt($(this).find(".cart-content__item-counter-num").prop("value"));
//			console.log("count is " + count);
//			console.log(typeof count);
			
			totalCount = totalCount + count;
//			console.log("totalCount is " + totalCount);
//			console.log(typeof totalCount);
		});
		
		
//		console.log("totalCount is " + totalCount);
//		console.log(typeof totalCount);
		
		$(".cart-title__box-total-count").html(totalCount);
	});
	
	
	
	
	
		
	$(".modal__button").on("click", function() {
		
		var productName = $.trim($(".modal--product .modal__title").html());
		console.log(productName);
		
		var productWeight = $.trim($(".modal__content-constitution-weight-num").html());
		console.log(productWeight);
		
		var productCount = $.trim($(".modal__counter-counter-num").prop("value"));
		console.log(productCount);					  
		
		var productPrice = $.trim($(".modal__price-num").html());
		console.log(productPrice);
		
		var productImageLink = $(".modal__content-image").attr("src");
		console.log(productImageLink);
								  
								  
	
		$('<div class="cart-content__item"><img class="cart-content__item-image" src="' + productImageLink + '" alt=""><div class="cart-content__item-box"><div class="cart-content__item-name">' + productName + '</div><div class="cart-content__item-weight"><span class="cart-content__item-weight-num">' + productWeight + '</span><span class="cart-content__item-weight-measure">г</span></div><div class="cart-content__item-price"><span class="cart-content__item-price-num">' + productPrice / productCount + '</span><span class="cart-content__item-price-currency">₽</span></div></div><div class="cart-content__item-counter"><button class="cart-content__item-counter-bttn cart-content__item-counter-bttn--minus" title="Уменьшить количество товаров">-</button><input class="cart-content__item-counter-num" type="number" min="1" max="100" step="1" value="' + productCount + '" tabindex="-1" readonly=""><button class="cart-content__item-counter-bttn cart-content__item-counter-bttn--plus" title="Увеличить количество товаров">+</button></div><div class="cart-content__item-close" title="Убрать товар из корзины">×</div></div>').prependTo(".cart-content__full");
		
		
		/* УДАЛЕНИЕ ПРОДУКТА ИЗ КОРЗИНЫ */
		
		$(".cart-content__item-close").on("click", function() {
			$(this).parents(".cart-content__item").remove();
		});
	
	});
	

	
	
	
	/* УДАЛЕНИЕ ПРОДУКТА ИЗ КОРЗИНЫ */
	
	$(".cart-content__item-close").on("click", function() {
		$(this).parents(".cart-content__item").remove();
	});
	
	
});