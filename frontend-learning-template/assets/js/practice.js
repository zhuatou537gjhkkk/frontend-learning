$(function () {
    $('.bili-video-container').each(function () {

        var $container = $(this);
        var $cover = $container.find('.video-cover');
        var $playerWrapper = $container.find('.video-player-wrapper');
        var $iframe = $playerWrapper.find('iframe');
        var playerUrl = $iframe.data('player-url');

        var hoverTimer = null;
        var isPlayerReady = false;

        // 将 iframe 加载完成后的操作提取为一个独立的函数
        var onIframeLoad = function () {
            isPlayerReady = true;
            // 再次确认鼠标是否真的还在容器上，防止意外触发
            if ($container.is(':hover')) {
                $cover.stop(true, true).animate({ opacity: 0 }, 200);
                $playerWrapper.stop(true, true).animate({ opacity: 1 }, 200);
            }
        };

        $container.hover(
            // === 鼠标进入时 (mouseenter) ===
            function () {
                clearTimeout(hoverTimer);

                if ($iframe.attr('src') !== playerUrl) {
                    isPlayerReady = false;
                    // 先解绑任何可能残留的 load 事件，再绑定新的
                    $iframe.off('load').one('load', onIframeLoad);
                    $iframe.attr('src', playerUrl);
                }
                else if (isPlayerReady) {
                    $cover.stop(true, true).animate({ opacity: 0 }, 200);
                    $playerWrapper.stop(true, true).animate({ opacity: 1 }, 200);
                }
            },
            // === 鼠标离开时 (mouseleave) ===
            function () {
                // 如果播放器还没有加载完成 (isPlayerReady 是 false)，
                // 那么就立即解绑 'load' 事件，取消那个“预约”。
                if (!isPlayerReady) {
                    $iframe.off('load');
                }

                // 恢复显示封面
                $cover.stop(true, true).animate({ opacity: 1 }, 300);
                $playerWrapper.stop(true, true).animate({ opacity: 0 }, 300);

                // 延时清空 src
                hoverTimer = setTimeout(function () {
                    $iframe.attr('src', '');
                    isPlayerReady = false;
                }, 350);
            }
        );
    });
});

// --- Image Carousel Logic ---
var $carousel = $('.carousel-container');
if ($carousel.length) {
    var $slides = $carousel.find('.carousel-slide');
    var $dotsContainer = $carousel.find('.carousel-dots');
    var slideCount = $slides.length;
    var currentIndex = 0;

    // 1. 动态创建导航点
    for (var i = 0; i < slideCount; i++) {
        $dotsContainer.append('<span class="dot" data-index="' + i + '"></span>');
    }
    var $dots = $dotsContainer.find('.dot');

    // 2. 定义一个函数来切换到指定的幻灯片
    function showSlide(index) {
        if (index === currentIndex && $slides.filter(':visible').length) return;

        $slides.filter(':visible').stop().fadeOut(500); // 淡出当前可见的
        $slides.eq(index).stop().fadeIn(500); // 淡入指定的

        $dots.removeClass('active');
        $dots.eq(index).addClass('active');
        currentIndex = index;
    }

    // 3. 初始化：显示第一张幻灯片
    showSlide(0);

    // 4. 设置定时器，实现自动轮播
    var slideInterval = setInterval(function () {
        var nextIndex = (currentIndex + 1) % slideCount; // 计算下一张的索引
        showSlide(nextIndex);
    }, 2000); // 每4秒切换一次

    // 5. (可选) 为导航点添加点击事件
    $dots.on('click', function () {
        var newIndex = $(this).data('index');

        // 重置并重启定时器，避免手动切换后立即自动切换
        clearInterval(slideInterval);
        showSlide(newIndex);
        slideInterval = setInterval(function () {
            var nextIndex = (currentIndex + 1) % slideCount;
            showSlide(nextIndex);
        }, 2000);
    });
}