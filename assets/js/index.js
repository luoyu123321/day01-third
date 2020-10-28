$(function() {
    getUserInfo()
})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            console.log(res);
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(res) {
    var name = res.nickname || res.username
    $('.welcome').html('欢迎&nbsp;&nbsp;' + res.username)
    if (res.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', res.user_pic)
        $('.user-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.user-avatar').show().html(text)
    }
}