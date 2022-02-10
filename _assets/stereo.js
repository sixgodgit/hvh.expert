"use strict";
jQuery(function($) {
	
	var $Body = $('body'),
		$Window = $(window),
		$Document = $(document),
		$Page = $('#Page'),
		$TheList = $('#TheList'),
		$TheListList = $('#TheList__List');
		
	
	
	$Window.on('load', function() {
		$Body.addClass('Loaded');
		setTimeout(function() { $('#Preloader').remove(); }, 2000);
	});
	
	_TheList();
	_Cursor();
	_Subpage();
	
	function _Subpage() {
		var $Subpage = $('#Subpage');
		
		if (!$Subpage.length) return false;
		
		var $Wrapper = $Subpage.children('.Subpage__Wrapper');
		
		$Window.on('resize rotate scroll', _TheEvents);
		_TheEvents();
		_AppendTitleShadow();
		_AppendImageShadow();
		_Reveal();
		_Video();
		window.requestAnimationFrame(_AnimFrame);
		setInterval(_setScroll, 10);
		var CurrentScroll = -document.scrollingElement.scrollTop,
			TargetScroll = -document.scrollingElement.scrollTop,
			Delta = 0;

		function _Reveal() {
			inView('.Subpage p, .Subpage__Image')
			.on('enter', function(Element) {
				$(Element).addClass('Visible');
			});
		}

		function _TheEvents() {
			var Height = $Wrapper.outerHeight(),
				PageHeight = $Page.height();

			if (PageHeight != Height) { $Page.height($Subpage.height()); }
			
			TargetScroll = -document.scrollingElement.scrollTop;

		}
	
		function _setScroll() {
			CurrentScroll = CurrentScroll - (CurrentScroll - TargetScroll) / 30;
			Delta = -(CurrentScroll - TargetScroll) / 10;
			if (Delta < -1 || Delta > 1) {
				$Subpage.addClass('IsScrolling');
			} else {
				$Subpage.removeClass('IsScrolling');
			}
		}

		function _AnimFrame() {	
			$Wrapper.css('transform','translate3d(0,' + CurrentScroll + 'px,0) skewY('+(Delta/20)+'deg)');
			$Subpage.find('h1 > i, h2 > i').css('transform','translate3d(0,' + Delta + 'px,0)');
			$Subpage.find('.Subpage__Image > div:nth-child(2)').css('transform','translate3d(0,' + Delta + 'px,0)');
			window.requestAnimationFrame(_AnimFrame);
		}
		
		function _AppendTitleShadow() {
			$('.Subpage h1, .Subpage h2').each(function() {
				$(this).append('<i>'+$(this).html()+'</i>');
			});
		}
		function _AppendImageShadow() {
			$('.Subpage img').each(function() {
				$(this).replaceWith('<div class="Subpage__Image"><div><img src="'+$(this).attr('src')+'" alt="" /></div><div><img src="'+$(this).attr('src')+'" alt="" /></div></div>');
			});
		}
		function _Video() {
			$('.Subpage__Video').each(function() {
				var $Element = $(this);
				
				var $Img = $Element.find('.Subpage__Image'),
					$Video = $Element.find('video');
					
				var Video = $Video[0];
				
				$Element.click(function() {
					if (Video.paused == true) {
						Video.play();
						$Element.addClass('Played');
					} else {
						Video.pause();
					}
					if (Video.paused == true) { 
						$('.Cursor__Text').html('Play');
					} else {
						$('.Cursor__Text').html('Pause');
					}
				});
			});
		}
		
	}
	
	function _Cursor() {
		var $Cursor = $('#Cursor');
		var $CursorFirst = $('#Cursor > .First');
		var $CursorShadow = $('#Cursor > .Second');
		var CurrentX = 0, CurrentY = 0;
		var ShadowX = 0, ShadowY = 0;
		var IsHover = false;
		var $Text = $Cursor.find('.Cursor__Text')
		var $Hover = $('a, button');
		var $Video = $('.Subpage__Video');
		$Body.on('mousemove', function() { $Body.addClass('MouseMove'); });
		
		setInterval(_setShadow, 10);
		window.requestAnimationFrame(_AnimFrame);
		
		function _AnimFrame() {	
			$CursorFirst.css('transform','translate3d('+CurrentX+'px,'+CurrentY+'px,0px)');
			$CursorShadow.css('transform','translate3d('+ShadowX+'px,'+ShadowY+'px,0px)');	
			
			window.requestAnimationFrame(_AnimFrame);
		}
		
		function _setShadow() {		
			ShadowX = ShadowX - (ShadowX - (CurrentX)) / 5;
			ShadowY = ShadowY - (ShadowY - (CurrentY)) / 5;
		}
		
		$(document).on('mousemove', function (e) {
			CurrentX = e.pageX - 15;
			CurrentY = e.pageY - 15 - $Window.scrollTop();
		});
		
		$Hover.on('mouseenter', function () {
		   $Body.addClass('Hover');
		   IsHover = true;;
		});

		$Hover.on('mouseleave', function () {
		   $Body.removeClass('Hover');
		   IsHover = false;
		});
		
		$Video.on('mouseenter mousemove', function () {
		   $Body.addClass('TextHover');
		   if ($(this).find('video')[0].paused == true) { 
			$Text.html('Play');
		   } else {
			$Text.html('Pause');
		   }
		   IsHover = true;
		});

		$Video.on('mouseleave', function () {
		   $Body.removeClass('TextHover');
		   IsHover = false;
		});
	}

	function _TheList() {
		$Window.on('resize rotate scroll', _TheEvents);
		_TheEvents();
		_AppendTitleShadow();
		_Reveal();
		window.requestAnimationFrame(_AnimFrame);
		setInterval(_setScroll, 10);
		var CurrentScroll = -document.scrollingElement.scrollTop,
			TargetScroll = -document.scrollingElement.scrollTop,
			Delta = 0;
		
		function _Reveal() {
			inView('.TheList li')
			.on('enter', function(Element) {
				$(Element).addClass('Visible');
			});
		}

		function _AppendTitleShadow() {
			$('.TheList__Title').each(function() {
				$(this).append('<i>'+$(this).html()+'</i>');
			});
		}
		function _TheEvents() {
			var ListHeight = $TheList.outerHeight(),
				PageHeight = $Page.height();

			if (PageHeight != ListHeight) { $Page.height($TheList.height()); }
			
			TargetScroll = -document.scrollingElement.scrollTop;

		}
	
		function _setScroll() {
			CurrentScroll = CurrentScroll - (CurrentScroll - TargetScroll) / 30;
			Delta = -(CurrentScroll - TargetScroll) / 10;

		}

		function _AnimFrame() {	
			$TheListList.css('transform','translate3d(0,' + CurrentScroll + 'px,0) skewY('+(Delta/7)+'deg)');
			$TheListList.find('.TheList__Title > i').css('transform','translate3d(0,' + Delta + 'px,0)');
			window.requestAnimationFrame(_AnimFrame);
		}
	}

});