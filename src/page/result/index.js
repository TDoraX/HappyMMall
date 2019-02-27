require('./index.css');
require('page/common/nav-simple/index.js');
var _hm = require('util/hm.js');

$(function () {
    var type = _hm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    if (type === 'payment') {
        var orderNumber = _hm.getUrlParam('orderNumber');
            $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
    }
    // 显示对应的提示信息
    $element.show();
});