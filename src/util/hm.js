var Hogan = require('hogan.js');
var conf = {
    serverHost: ''
};
var _hm = {
    // 网络请求
    request: function (param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                // 请求成功
                if (0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 未登录状态，需要登录
                else if (10 === res.status) {
                    _this.doLogin();
                }
                // 请求数据错误
                else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    // 获取服务器地址
    getServerUrl: function (path) {
        return conf.serverHost + path;
    },
    // 获取URL参数
    getUrlParam: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
            result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 渲染HTML模板
    renderHtml: function (htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    // 成功提示
    successTips: function (msg) {
        alert(msg || '操作成功');
    },
    // 错误提示
    errorTips: function (msg) {
        alert(msg || '好像有什么地方出了点问题呢');
    },
    // 验证字段：是否为空，手机，邮箱验证
    validate: function (value, type) {
        value = $.trim(value);
        // 非空验证
        if ('require' === type) {
            return !!value;
        }
        // 手机验证
        if ('phone' === type) {
            return /^1\d{10}$/.test(value);
        }
        // 邮箱验证
        if ('email' === type) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    // 登录处理
    doLogin: function () {
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    // 返回主页
    goHome: function () {
        window.location.href = './index.html';
    }
};

module.exports = _hm;