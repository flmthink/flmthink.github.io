$(function () {
    $('#container').fullpage({
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        navigation: true,
        verticalCentered: false,
        //滚动到某一屏后的回调函数
        afterLoad: function (link, index) {
            $('.section').eq(index - 1).addClass('now');
            //如果是第八页,则隐藏more按钮
            if (index === 8) {
                $('.more').css('opacity', 0);
            } else {
                $('.more').css('opacity', 1);
            }
        },
        //
        //页面结构生成后的回调函数
        afterRender: function () {
            $('.more').on('click', function () {
                $.fn.fullpage.moveSectionDown();
            });
            $('.screen04 .cart').on('transitionend', function () {
                $('.screen04').addClass('show');
            });
            $('.screen08').on('mousemove', function (e) {
                $('.hand08').css({
                    left: e.clientX - 60,
                    top: e.clientY + 10
                })
            }).find('.again').on('click', function () {
                //将所有添加了类的删除
                $('.now,.show,.leaved').removeClass('now').removeClass('show').removeClass('leaved');
                // //添加css属性,获取进行fadeIn() fadeOut() 都是添加了style的属性
                $('.content [style]').removeAttr('style');
                $.fn.fullpage.moveTo(1)  //移到第一页
            })
        },
        //
        //离开当前页触发的回调函数
        onLeave: function (index, nextIndex, direction) {
            if (index === 2 && nextIndex === 3) {
                $('.screen02').addClass('leaved');
                // console.log(1);
            } else if (index === 3 && nextIndex === 4) {
                $('.screen03').addClass('leaved')
            } else if (index === 5 && nextIndex === 6) {
                $('.screen05').addClass('leaved');
                $('.screen06').addClass('show');
            }
            else if (index === 6 && nextIndex === 7) {
                //方法一------设置animate 通过回调函数,还有函数法人自调用
                // function abc(){
                //     console.log(1);
                //     $(this).next().animate({opacity:1},500,abc)
                // }
                // // $('.screen07 .star img').animate({opacity:1},1000)
                // $('.screen07 .star img:first-child').animate({opacity:1},500,abc)

                //方法二------each方法,为每个元素添加不同的延迟
                //此时必须搭配css 里 display:none;  opacity不行
                $('.screen07 .star img').each(function (i, ele) {
                    $(ele).delay(i * 500).fadeIn();
                })

                // //方法三------用jq操作css3属性,transition-delay,css里设置一个c3动画,下面为每个元素设置不同的延迟
                // $('.screen07').addClass('show');
                // $('.screen07 .star img').each(function(i,ele){
                //     $(ele).css('transition',i*0.25+'s')
                // })
            }
        },
        scrollingSpeed: 1000
    });
});