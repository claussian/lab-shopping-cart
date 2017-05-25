$(document).ready(function () {
	console.log("D'onc Emmanuel!");

	function calculateSubtotal (price, quantity) { // pass in the class divs
		var newPrice = Number(price.children('p').text().replace('$',''));
		var newQuantity = Number(quantity.children('input').val());
		return newPrice * newQuantity;
	}

	function appendTotal (total, domElement, tag) {
		domElement.empty();
		domElement.append('<' + tag + '>$ ' + total.toFixed(2) + '</' + tag + '>');
	}

	function gracefulRemove (domElement) {
		domElement.fadeOut(800, function () {
			this.remove();
		});
	}

	// Add event listeners

	// Add new items
	$('button.add-item').on('click', function () {
		var name = $('#name-field').val();
		var price = Number($('#price-field').val()).toFixed(2);

		var newItem = '<div class="row row-item">' +
		'<div class="col-md-3 name">' + 
		'<p>' + name + '</p>' +
		'</div>' +
		'<div class="col-md-3 price">' +
		'<p>' + '$ ' + price + '</p>' +
		'</div>' +
		'<div class="col-md-2 qty">' +
		'<input type="number" name="quantity" class="qty-field" value="0" min="0">' +
		'</div>' +
		'<div class="col-md-3 calc-price"></div>' +
		'<div class="col-md-1 remove">' +
		'<button class="btn btn-danger btn-remove">&#10005;</button>' +
		'</div>' +
		'</div'

	$('.item-list').append(newItem);
	});

	// Listen in to entire cart
	// $('input.qty-field').on('keyup', function (e) {
	$('.item-list').on('keyup scroll change', function (e) {
		var row = $(e.target).closest('.row-item');
		var price = row.children('.price');
		var quantity = row.children('.qty');
		var calcPrice = row.children('.calc-price');
		var subtotal = calculateSubtotal(price, quantity);
		// console.log(calcPrice);
		appendTotal(subtotal, calcPrice, 'h5');
	});

	// Calculate subtotal prices and total price
	$('button.calculate-price').on('click', function () { // update all subtotals simultaneously
		var prices = $('.price'); // returns list of dom elements of class .price
		var quantities = $('.qty'); // returns list of dom elements of class .qty
		var calcPrices = $('.calc-price');
		var totalPriceArray = [];

		for (var i=0; i < prices.length; i++) { // replace dom elements using jQuery array index method
			var subtotal = calculateSubtotal(prices.eq(i), quantities.eq(i));
			totalPriceArray.push(subtotal);
			appendTotal(subtotal, calcPrices.eq(i), 'h5');
		}

		var totalPrice = totalPriceArray.reduce(function (acc, val) {
			return acc + val;
		}, 0);

		appendTotal(totalPrice, $('.total-price'), 'h2');
		// console.log(totalPrice);
	});

	// remove entire row
	$('.item-list').on('click', 'button.btn-remove', function (e) {
		var row = $(e.target).parents('.row-item');
		console.log(row);
		var message = '<div class="row-warning"><h3>Removing from cart</h3></div>' ;
		row.append(message);

		gracefulRemove(row);

	})
});

//$(document).ready(refreshEventlistener());