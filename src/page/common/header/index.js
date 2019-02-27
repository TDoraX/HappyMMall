require('./index.css');
var _hm = require('util/hm.js');
// 通用页面头部
var header = {
    init: function () {
        this.bindEvent();
        this.onLoad();
    },
    onLoad: function () {
        var keyword = _hm.getUrlParam('keyword');
        // keyword存在则回填输入框
        if (keyword) {
            $('#search-input').val(keyword);
        }
    },
    bindEvent: function () {
        var _this = this;
        // 点击搜索按钮后做搜索提交
        $('#search-btn').click(function () {
            _this.searchSubmit();
        });
        // 点击回车后做搜索提交
        $('#search-input').keyup(function (e) {
            // KeyCode(Enter): 13
            if (e.keyCode === 13) {
                _this.searchSubmit();
            }
        })
    },
    // 搜索提交
    searchSubmit: function () {
        var keyword = $.trim($('#search-input').val());
        // 有关键词跳转到list页，若关键词为空则返回首页
        if (keyword) {
            window.location.href = './list.html?keyword=' + keyword;
        } else {
            _hm.goHome();
        }
    }
};

header.init();