$(document).ready(function() {
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
		'<div class="col-md-3 qty">' +
		'<input type="number" name="quantity" class="qty-field" value=0>' +
		'</div>' +
		'<div class="col-md-3 calc-price"></div>' +
		'</div>';
	// find last element in rowItem, append
	$('.item-list').append(newItem);
	});

	$('button.calculate-price').on('click', function () { // update all subtotals simultaneously
		var prices = $('.price'); // returns list of dom elements class .price
		// console.log(Number(prices.eq(0).children('p').text().replace('$','')));
		var quantities = $('.qty'); // returns list of dom elements 
		// console.log(Number(quantities.eq(0).children('input').val()));
		var calcPrice = $('.calc-price');
		console.log(calcPrice.eq(0));
		for (var i=0; i < prices.length; i++) {
			var price  = Number(prices.eq(i).children('p').text().replace('$',''));
			var quantity = Number(quantities.eq(i).children('input').val());
			var subtotal = price * quantity;
			// console.log(subtotal);
			calcPrice.eq(i).empty(); // remove previously calculated values
			calcPrice.eq(i).append('<h5>$ ' + subtotal.toFixed(2) + '</h5>');
			console.log(calcPrice.eq(i));
		}
	});
});