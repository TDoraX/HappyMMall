require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _hm = require('util/hm.js');
var _order = require('service/order-service.js');
var Pagination = require('util/pagination/index.js');
var templateIndex = require('./index.string');

// page逻辑部分
var page = {
    data: {
        listParam: {
            pageNum: 1,
            pageSize: 10
        }
    },
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        this.loadOrderList();
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
    },
    // 加载订单列表
    loadOrderList: function () {
        var _this = this,
            orderListHtml = '',
            $listCon = $('.order-list-con');
        $listCon.html('<div class="loading"></div>');
        _order.getOrderList(this.data.listParam, function (res) {
            // 渲染Html
            orderListHtml = _hm.renderHtml(templateIndex, res);
            $listCon.html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            });
        }, function (errMsg) {
            $listCon.html('<p class="err-tip">加载订单失败，请刷新试试哦</p>')
        });
    },
    loadPagination: function (pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function (pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
};
$(function () {
    page.init();
});