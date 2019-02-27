require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var navSide = require('page/common/nav-side/index.js');
var templateBanner = require('./banner.string');
var _hm = require('util/hm.js');

$(function () {
    // 渲染Banner的Html
    var bannerHtml = _hm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 初始化Banner
    var $slider = $('.banner').unslider({
        dots: true
    });
    // 前后操作按钮事件绑定
    $('.banner-con .banner-arrow').click(function () {
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});