$(document).ready(function() {
/*
	function toggleFeed(event,add) {
		var currentLink = $(event).attr('href');
		if (currentLink.split("/").pop() === "feed") {
			if (add) {
				var newLink = currentLink;
			} else {
				var newLink = currentLink.slice(0,-4);
			}
		} else {
			if (add) {
				var newLink = currentLink + "feed";
			} else {
				var newLink = currentLink;
			}
		}
		event.attr('href',newLink);
	}*/

	$('#viewAllThemes').click( function() {
		$('body').removeClass('scrolly');
	});

	$('#blankType').html($('#viewAll').html());

	$('li.event-type').click( function() {

		//if active
		if ($(this).hasClass('active')) {

			//not mobie
			if ($(window).width() > 650) {
				$('a.theme-holder').removeClass('goAway');
				$('footer').removeClass('fix');
				$('#triangle').css('left','-200%');
				$(this).removeClass('active');

			//mobile
			} else {
				if ($('.directive ul').hasClass('open')) {
					$('.directive ul').removeClass('open');
					$('body').removeClass('fix');
				} else {
					$('.directive ul').addClass('open');
					$('body').addClass('fix');
				}
			}

		//if not active
 		} else {
			$(this).siblings('li').removeClass('active');
			$(this).addClass('active');
			
			//click blank
			if ($(this).attr('id')==='blankType') {

			} else {

				//view all
				if ($(this).attr('id')==='viewAll') {
					$('a.theme-holder').removeClass('goAway');
					$('footer').removeClass('fix');
					$('.directive ul').removeClass('open');
					$('body').removeClass('fix');

				//not view all
				} else {
					var type = $(this).attr('id');
					$('.wrap a.theme-holder').addClass('goAway');
					$('.wrap').find('a.'+type).removeClass('goAway');

					//if livefeed
					/*if (type === 'streams') {
						toggleFeed($('.wrap a.theme-holder.streams.posts'),true);
					}
					if (type === 'posts') {
						toggleFeed($('.wrap a.theme-holder.streams.posts'),false);
					}*/

					//not dropdown
					if ($(window).width() > 650) {
						var offset = $(this).offset().left;
						$('#triangle').css('left',offset + 10);

					//dropdown
					} else {
						$('.directive ul').removeClass('open');
						$('body').removeClass('fix');
					}
				}
			}
		}
		$('#blankType').html($('.directive ul li.active').html());
		var pageHeight = $(window).height();
		var bodyHeight = $('body').innerHeight();
		if ( bodyHeight < pageHeight ) {
			$('footer').addClass('fix');
		} else {
			$('footer').removeClass('fix');
		}

	});


	$('#demoButton').click( function() {
		$('#demoForm').addClass('active');
		$('body').addClass('fix');
	});

	$('#cancelDemo').click( function() {
		$('#demoForm').removeClass('active');
		$('body').removeClass('fix');
	});

});