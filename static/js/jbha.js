function arrow_down_right(id)
{
	var is_vis = Element.visible(id);
	if (false) {
		if (is_vis) { $(id).hide(); } else { $(id).show(); }
		$(id + "_img").src = (is_vis) ? "/images/small-right.gif" : "/images/small-down.gif";
	} else {
		var args = arguments[1] || {duration: 0.25};
		if (is_vis) {
			args.afterFinish = function () { $(id + "_img").src = "/images/small-right.gif"; }
		} else {
			args.afterFinish = function () { $(id + "_img").src = "/images/small-down.gif"; }
		}
		new Effect[is_vis ? 'BlindUp' : 'BlindDown'](id, args);
	}
}

var geocoder;
var map;
var dirObj;

function requestdirections2(mapobj,toaddr,fromaddr)
{
	if( typeof(dirObj) != 'undefined')
	{
		dirObj.clear();
	}
	mapobj.clearOverlays();
	$('directions').innerHTML = "";
	dirObj = new GDirections(mapobj,document.getElementById("directions"));
	dirObj.load('from:'+fromaddr+' to: '+toaddr);
	return false;
}

function showAddress(address) {
	map = new GMap2(document.getElementById("map"));
	geocoder = new GClientGeocoder();

	geocoder.getLatLng(
		address,
		function(point) {
			if (!point) {
				alert(address + " not found");
			} else {
				map.addControl(new GSmallMapControl());
				map.setCenter(point, 14);
				var marker = new GMarker(point);
				map.addOverlay(marker);
				marker.openInfoWindowHtml(building_name+"<br />"+address+"<br />"+building_phone);
			}
		}
	);
}


function loadMap()
{
	if(GBrowserIsCompatible())
	{
		$('directions').innerHTML = "";
		showAddress(building_address);
	}
}

function calendar_print()
{
	if (typeof window.print == 'function') {
		window.print();
	} else {
		$('calendar_print').value='1';
		$('page_form').submit();
	}
}

function calendar_close()
{
	jQuery('#calendar-tooltip').hide();
}

function calendar_tooltip()
{
	var bodyoffset= jQuery('#cont').offset();
	var offset = jQuery(this).offset();
	jQuery('#calendar-tooltip').animate({left: offset.left - bodyoffset.left, top: offset.top - bodyoffset.top},0).hide();
	jQuery('#calendar-tooltip-content').html('<div class="cal-spinner"><img src="/images/calendar/cal-spinner.gif" /></div>');
	jQuery('#calendar-tooltip').show();
	var sep = (this.href.indexOf('&') < 0) ? "?" : "&";
	jQuery.get(this.href + sep + 'summary=1', function (html) { jQuery('#calendar-tooltip-content').html(html); jQuery('#calendar-tooltip').show() });
	return false;
}

function course_tab_click(a)
{
	var $=jQuery;
	$('#tab-cont a.active').removeClass('active');
	$(a).addClass('active');
	$('.tab-content-cont').hide();
	$($(a).attr('href')).show();
}

function student_change()
{
	var $=jQuery;
	$('#student-change').slideUp();
	$('#view-homework').slideUp();
	$('#student-parent-email').slideDown();
}

function email_append(aelement, email)
{
	var e = email.value.trim();
	if (e.substr(0,1) !== "<") {
		e = e.split("@")[0];
		aelement.href += e;
	}
	return true;
}