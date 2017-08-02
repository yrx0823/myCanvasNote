;(function($){
		$.fn.bannerT = function(option){
			var defaults = {
				deg:10
			};
			
			var opt = $.extend({},defaults,option);
			console.log(this);
			return $.each(this,function(i,ele){
				rotateAni(ele);
			});
			
			function rotateAni(ele){
				$(ele).on("mousemove",function(e){
					//容器内的坐标
					var xWrap = e.pageX - $(ele).offset().left;
					var yWrap = e.pageY - $(ele).offset().top;
					var centerX = $(ele).outerWidth()/2;
					var centerY = $(ele).outerHeight()/2;
					var disX = xWrap - centerX;
					var disY = yWrap - centerY;
					var percentX = disX / centerX;
					var percentY = disY / centerY;
					var deg = 10;//旋转深度
					$(ele).css({
						transform:'rotateX(' + -deg*percentY + 'deg)' +'rotateY(' + deg*percentX +'deg)'
					});
				});
				$(ele).on("mouseleave",function(e){
					$(ele).css({
						transform:""
					});
				})
			}
		}
	
})(jQuery);
