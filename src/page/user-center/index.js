require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _hm = require('util/hm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

// page逻辑部分
var page = {
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    // 加载用户信息
    loadUserInfo: function () {
        var userHtml = '';
        _user.getUserInfo(function (res) {
            userHtml = _hm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function (errMsg) {
            _hm.errorTips(errMsg);
        });
    }
};
$(function () {
    page.init();
});