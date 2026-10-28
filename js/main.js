/* ============================================================
   蜀韵.成都 - 首页交互脚本
   功能：轮播图自动播放、手动切换、指示点、移动端菜单
   ============================================================ */

// ---------- 轮播图逻辑 ----------
(function () {
    'use strict';

    // 获取 DOM 元素
    var track = document.getElementById('carouselTrack');
    var slides = track ? track.querySelectorAll('.carousel-slide') : [];
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var dotsContainer = document.getElementById('carouselDots');

    if (!slides.length) return; // 无轮播图则退出

    var current = 0;          // 当前显示的索引
    var total = slides.length; // 轮播图总数
    var timer = null;         // 自动播放定时器
    var interval = 5000;      // 自动播放间隔（毫秒）

    // 生成底部指示点
    function buildDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        for (var i = 0; i < total; i++) {
            var dot = document.createElement('span');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', function () {
                var idx = parseInt(this.getAttribute('data-index'), 10);
                goTo(idx);
                resetTimer();
            });
            dotsContainer.appendChild(dot);
        }
    }

    // 切换到指定索引
    function goTo(index) {
        // 边界处理：循环
        if (index < 0) index = total - 1;
        if (index >= total) index = 0;

        // 移除当前激活状态
        slides[current].classList.remove('active');
        var dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
        if (dots[current]) dots[current].classList.remove('active');

        // 设置新的激活状态
        current = index;
        slides[current].classList.add('active');
        if (dots[current]) dots[current].classList.add('active');
    }

    // 下一张
    function next() { goTo(current + 1); }

    // 上一张
    function prev() { goTo(current - 1); }

    // 启动自动播放
    function startTimer() {
        stopTimer();
        timer = setInterval(next, interval);
    }

    // 停止自动播放
    function stopTimer() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    // 重置定时器（手动操作后）
    function resetTimer() {
        stopTimer();
        startTimer();
    }

    // 绑定按钮事件
    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            prev();
            resetTimer();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            next();
            resetTimer();
        });
    }

    // 鼠标悬停暂停自动播放
    var carousel = document.getElementById('carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopTimer);
        carousel.addEventListener('mouseleave', startTimer);
    }

    // 键盘左右键切换
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { prev(); resetTimer(); }
        else if (e.key === 'ArrowRight') { next(); resetTimer(); }
    });

    // 初始化
    buildDots();
    startTimer();
})();

// ---------- 页头滚动阴影 & 移动端菜单 ----------
(function () {
    'use strict';

    var header = document.getElementById('siteHeader');
    var menuToggle = document.getElementById('menuToggle');
    var siteNav = document.getElementById('siteNav');

    // 滚动时给页头添加阴影
    function onScroll() {
        if (!header) return;
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();

    // 移动端汉堡菜单切换
    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', function () {
            siteNav.classList.toggle('open');
        });

        // 点击导航链接后收起菜单
        var links = siteNav.querySelectorAll('a');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function () {
                siteNav.classList.remove('open');
            });
        }
    }
})();
