require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _hm = require('util/hm.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');

// page逻辑部分
var page = {
    data: {
        orderNumber: _hm.getUrlParam('orderNumber')
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
        // 加载detail数据
        this.loadDetail();
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click', '.order-cancel', function () {
            if (window.confirm('真的要取消该订单吗？')) {
                _order.cancelOrder(_this.data.orderNumber, function (res) {
                    _hm.successTips('订单取消成功');
                    _this.loadDetail()
                }, function (errMsg) {
                    _hm.errorTips(errMsg);
                });
            }
        });
    },
    // 加载订单列表
    loadDetail: function () {
        var _this = this,
            orderDetailHtml = '',
            $content = $('.content');
        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(this.data.orderNumber, function (res) {
            _this.dataFilter(res);
            // 渲染Html
            orderDetailHtml = _hm.renderHtml(templateIndex, res);
            $content.html(orderDetailHtml);
        }, function (errMsg) {
            $content.html('<p class="err-tip">' + errMsg + '</p>')
        });
    },
    // 数据的适配
    dataFilter: function (data) {
        data.needPay = data.status == 10;
        data.isCancelable = data.status == 10;
    }
};
$(function () {
    page.init();
});