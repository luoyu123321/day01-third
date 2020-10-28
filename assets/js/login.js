$(function() {
    $('#go-reg').on('click', function(e) {
        e.preventDefault()
        $('#form-login').hide()
        $('#form-reg').show()
    })

    $('#go-login').on('click', function(e) {
        e.preventDefault()
        $('#form-login').show()
        $('#form-reg').hide()
    })

})

var form = layui.form
form.verify({
    pwd: [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    repwd: function(value) {
        var pwd = $('#form-reg input[name=password]').val()
        if (value !== pwd) {
            return '两次密码输入不一致'
        }
    }
})

$('#form-reg').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
        type: 'POST',
        data: $(this).serialize(),
        url: 'http://ajax.frontend.itheima.net/api/reguser',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            layui.layer.msg(res.message)
            $('#go-login').click()
        }
    })
})

$('#form-login').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
        type: 'POST',
        url: 'http://ajax.frontend.itheima.net/api/login',
        data: $(this).serialize(),
        success: function(res) {
            console.log(res);
            if (res.status !== 0) { return layui.layer.msg(res.message) }
            layui.layer.msg('登陆成功!')
            localStorage.setItem('token', res.token)
            location.href = '/index.html'
        }
    })
})