// COLORFUL, SIMPLE, DARK
const COLORFUL = 0, SIMPLE = 1, DARK = 2,CODING_SRC_FREFIX = 'https://bfdz.coding.net/api/share/download/',
    ANIMATIONS = ['a8cd8332-8ace-4867-8259-f2a4f38ecdd8','01ec0f58-99ed-49fa-8733-14ed24ab5670',
                  'c1d3fbcd-c6ac-4718-9456-4e26910460a3','aff76b4f-724e-42e7-97a7-edeb836f359a',
                  'b1179d05-79fd-4416-a3d9-de572a02caa3','90266133-9778-458f-9b78-4aef51d42949',
                  '30dc5583-e634-4beb-b8fd-2283d634a62c','fcd62f71-398e-4077-8f11-be35d1c62520'],
    // https://www.materialui.co/flatuicolors
    COLORS = ["#1abc9c","#f39c12","#16a085","#f1c40f","#27ae60","#d35400",
              "#3498db","#e74c3c","#2980b9","#c0392b","#bdc3c7","#8e44ad",
              "#2c3e50","#9b59b6","#34495e","#95a5a6","#7f8c8d"];
let colorMode = COLORFUL;
let headerHeight, sidebarWidth;

let isMobileUA = function () {
    let ua = navigator.userAgent;
    let pa = /iPad|iPhone|Android|Opera Mini|BlackBerry|webOS|UCWEB|Blazer|PSP|IEMobile|Symbian/g;
    return pa.test(ua);
}
let isDarkMode = function(){
    return window.matchMedia('(prefers-color-scheme:dark)').matches;
}

/**
 * Dynamic Css color
 */
let colorOld;
let getColor = function(){
    if (isDarkMode() || colorMode === DARK) return "#dddddd";
    if (colorMode === SIMPLE) return "#555555";
    let color = COLORS[~~(COLORS.length*Math.random())];
    if (color === colorOld){
        return getColor();
    }
    colorOld = color;
    return color;
}
let refreshDynamicColor = function(){
    let style = document.documentElement.style;
    const color = getColor();
    style.setProperty("--dynamic-color",color);
    style.setProperty("--dynamic-color-40",color + "40");
    setTimeout(refreshDynamicColor, 3000);
}
setTimeout(refreshDynamicColor);

/**
 * enable DarkMode
 */
function enableDarkMode(darkmode){
    let style = document.documentElement.style;
    if (darkmode === true){
        style.setProperty("--major-color","#ddd");
        style.setProperty("--major-color-40","#555");
        style.setProperty("--header-bg-color","#3a3a3aa0");
        style.setProperty("--body-bg-color", "#282828");
        style.setProperty("--content-bg-color", "#333");
        style.setProperty("--card-bg-color", "#333");
        style.setProperty("--text-color", "#ccc");
        style.setProperty("--blockquote-color", "#bbb");
        style.setProperty("--link-color", "#ccc");
        style.setProperty("--link-hover-color", "#eee");
        style.setProperty("--brand-color", "#ddd");
        style.setProperty("--brand-hover-color", "#ddd");
        style.setProperty("--table-row-odd-bg-color", "#282828");
        style.setProperty("--table-row-hover-bg-color", "#363636");
        style.setProperty("--menu-item-bg-color", "#555");
        style.setProperty("--btn-default-bg", "#555");
        style.setProperty("--btn-default-color", "#ccc");
        style.setProperty("--btn-default-border-color", "#555");
        style.setProperty("--btn-default-hover-bg", "#666");
        style.setProperty("--btn-default-hover-color", "#ccc");
        style.setProperty("--btn-default-hover-border-color", "#666");
        style.setProperty("--highlight-background", "#282c34");
        style.setProperty("--highlight-foreground", "#abb2bf");
        style.setProperty("--highlight-gutter-background", "#353941");
        style.setProperty("--highlight-gutter-foreground", "#9da4b1");
        document.querySelector(".sidebar").style.setProperty("background-image","unset");
    } else {
        style.removeProperty("--major-color");
        style.removeProperty("--major-color-40");
        style.removeProperty("--header-bg-color");
        style.removeProperty("--body-bg-color");
        style.removeProperty("--content-bg-color");
        style.removeProperty("--card-bg-color");
        style.removeProperty("--text-color");
        style.removeProperty("--blockquote-color");
        style.removeProperty("--link-color");
        style.removeProperty("--link-hover-color");
        style.removeProperty("--brand-color");
        style.removeProperty("--brand-hover-color");
        style.removeProperty("--table-row-odd-bg-color");
        style.removeProperty("--table-row-hover-bg-color");
        style.removeProperty("--menu-item-bg-color");
        style.removeProperty("--btn-default-bg");
        style.removeProperty("--btn-default-color");
        style.removeProperty("--btn-default-border-color");
        style.removeProperty("--btn-default-hover-bg");
        style.removeProperty("--btn-default-hover-color");
        style.removeProperty("--btn-default-hover-border-color");
        style.removeProperty("--highlight-background");
        style.removeProperty("--highlight-foreground");
        style.removeProperty("--highlight-gutter-background");
        style.removeProperty("--highlight-gutter-foreground");
        document.querySelector(".sidebar").style.removeProperty("background-image");
    }
    elementDynamicColorRender();
}

/**
 * element dynamic color rander
 */
function elementDynamicColorRender(){
    document.querySelectorAll(".site-nav .menu-item a").forEach(item => {
        let color = getColor(), badge = item.querySelector(".badge");
        item.style.color = color;
        if (badge)
            badge.style.color = isDarkMode() || colorMode === DARK ? "" : color;
    })
    document.querySelectorAll(".index .post-header .post-title a").forEach(item => {
        item.style.color = getColor();
    })
    document.querySelectorAll(".archive .post-header time,.archive .post-header a," 
                            + ".category .post-header time,.category .post-header a,"
                            + ".tag .post-header time,.tag .post-header a").forEach(item => {
        item.style.color = getColor();
    })
    document.querySelectorAll(".page .category-all .category-list-item a").forEach(item => {
        let color = getColor();
        item.style.color = color;
        item.style.borderColor = color;
    })
    document.querySelectorAll(".page .tag-cloud-tags a").forEach(item => {
        item.style.color = getColor();
    })
    let article = document.querySelector(".post article");
    if (article){
        let h2Color = getColor(), h3Color = getColor(), h4Color = getColor(), 
            h5Color = getColor(), h6Color = getColor();
        article.querySelectorAll("h2,h3,h4,h5,h6").forEach( item =>{ 
            switch (item.nodeName){
                case "H2": item.style.color = h2Color; break;
                case "H3": item.style.color = h3Color; break;
                case "H4": item.style.color = h4Color; break;
                case "H5": item.style.color = h5Color; break;
                case "H6": item.style.color = h6Color; break;
            }
        });
    }
}

/**
 * Wait Executor：
 * give a query selector expression, will call target method when has been selected a vaild element in delay time, otherwise to return
 * @param {*} selector 
 * @param {*} method 
 * @param {*} delay 
 */
function WaitExecutor(selector,method,delay){
    this.startTime = new Date();
    this.selector = selector;
    this.method = method;
    this.delay = delay;
    this.exec = () => {
        let threshold = this.delay ? this.delay : 20000,
            elements = new Array();
        if (new Date() - this.startTime > threshold || !this.method) 
            return;
    
        if (selector instanceof Array)
            selector.forEach(item => {
                document.querySelectorAll(item).forEach(elem => {elements.push(elem)});
            })
        else
            document.querySelectorAll(selector).forEach(elem => {elements.push(elem)});

        if (elements.length > 0){
            elements.forEach(item => {this.method(item)});
        } else {
            setTimeout(this.exec,100);
        }
    }
    setTimeout(this.exec);
}

/**
 * Variable Initialize
 */
new WaitExecutor([".sidebar",".header-inner"], function(elem){
    if ("sidebar" === elem.className)
        sidebarWidth = elem.clientWidth;
    if ("header-inner" === elem.className)
        headerHeight = elem.clientHeight;
})

/**
 * Local Search Style Setting
 */
function searchPopupRender (val){
	let winHeight = window.innerHeight;
    document.querySelector(".search-pop-overlay").setAttribute("style","height:" + winHeight + "px");
    let	popupHeight = (winHeight - winHeight * 0.2) + "px",
        popupTop = winHeight * 0.1 + "px",
        target = document.querySelector(".search-popup");
		popupLfetDef = (window.innerWidth - target.clientHeight)/2 + "px",
		popupLfet = popupLfetDef;
    
        if (val == "mobile"){
		popupHeight = winHeight + "px";
		popupTop = popupLfet = "0px";
	}
	target.setAttribute("style","left:" + popupLfet + ",height:" + popupHeight + ",top:" + popupTop);
}

/**
 * Mobile header Setting
 */
let mobileSiteNavClose = function(event){
    if (!isMobileUA()) return;
    const siteNav = document.querySelector(".site-nav"),
          open = document.querySelector(".site-nav-on");
    if (!siteNav || !open) return;
    if (event.changedTouches[0].clientY < headerHeight) return;
    const animateAction = siteNav.classList.contains("site-nav-on");
    const height = NexT.utils.getComputedStyle(siteNav);
    siteNav.style.height = animateAction ? height : 0;
    const toggle = () => siteNav.classList.toggle("site-nav-on");
    const begin = () => {
        siteNav.style.overflow = "hidden";
    };
    const complete = () => {
        siteNav.style.overflow = "";
        siteNav.style.height = "";
        document.querySelector(".site-nav-toggle .toggle").classList.toggle("toggle-close");
    };
    window.anime(Object.assign({
        targets : siteNav,
        duration: 200,
        height  : animateAction ? [height, 0] : [0, height],
        easing  : "linear"
    }, animateAction ? {
        begin,
        complete: () => {
            complete();
            toggle();
        }
    } : {
        begin: () => {
            begin();
            toggle();
        },
    complete}));
}

/**
 * Search Popup
 */
let registerSearchMenuListener = function(){
    let searchMenu = $(".menu-item-search");
	if (isMobileUA()) {
		searchMenu = $(".popup-trigger");
	}
	searchMenu.click(function(){
		if (isMobileUA()) { 
			searchPopupRender("mobile");
			return; 
		}
		searchPopupRender("searchBtn");
	});
}

$(window).resize(function(){
    if (isMobileUA()) {
        searchPopupRender("mobile");
    } else {
        searchPopupRender();
    }
});

/**
 * Mouse Ckick Event
 */
let mousePos = {};
$(window).mousedown(function(event){
    mousePos.X = event.pageX;
    mousePos.Y = event.pageY;
});
$(window).mouseup(function(event){
    if (isMobileUA()) { return; }
    let deltaX = event.pageX - mousePos.X;
    let deltaY = event.pageY - mousePos.Y;
    let clickingBlankPart = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY)) < 20 && event.target.matches(".main");
    if (clickingBlankPart) {
        searchPopupRender();
    }
});

/**
 * Aplayer PJAX compatible
 */
let aplayerPjaxCompatible = function(option) {
    let currentPlayers = document.querySelectorAll("div.aplayer");
    if (!currentPlayers) return;
    if (option === "backup"){
        // Backup Playing player options
        let apb = window.aplayersPlayingBack;
        if (!apb) apb = window.aplayersPlayingBack = [];
        currentPlayers.forEach((aplayer)=>{
            apb.forEach(exists=>{
                if (exists.id === aplayer.id){
                    apb.splice(apb.indexOf(exists),1);
                }
            })
            window.aplayers.forEach(item => {
                if (item.container.id === aplayer.id){
                    apb.push({
                        id: item.container.id,
                        paused: item.paused,
                        audio: {
                            currentTime: item.audio.currentTime
                        },
                        list: {
                            index: item.list.index
                        }
                    });
                    item.destroy();
                }
            });
        })
    } else {
        let apb = window.aplayersPlayingBack;
        if (!apb) apb = window.aplayersPlayingBack = [];
        // Recreate new player
        loadMeting.prototype.constructor();
        // Waiting player initialize done & Recover player status.
        let waitAplayer = function(){
            let done = false;
            window.aplayers.forEach((current) => {
                apb.forEach((backup) => {
                    if (current.container.id == backup.id){
                        let waitPlay = function() {
                            let ret = true, condition = false;
                            // Switch to target song in the list
                            condition = current.list.index == backup.list.index;
                            if (!condition) current.list.switch(backup.list.index);
                            ret = ret && condition;
                            // Resume playback progress
                            condition = current.audio.currentTime >= backup.audio.currentTime;
                            if (!condition) current.seek(backup.audio.currentTime);
                            ret = ret && condition;
                            if (ret) return;
                            setTimeout(waitPlay,200);
                        }
                        setTimeout(waitPlay,200);
                        if (!backup.paused) current.play();
                        done = true;
                    }
                });
            });
            if (done) return;
            setTimeout(waitAplayer, 200);
        };
        setTimeout(waitAplayer, 200);
    }
}

/**
 * Right toggle
 */
function sidebarButtonRender() {
    let sidevarToggle = document.querySelector('.toggle.sidebar-toggle');
    let customSidebarToggle = document.createElement('div');
    customSidebarToggle.className = 'custom-toggle animated fadeIn';
    customSidebarToggle.innerHTML = 
        "<btn id='switch-color-mode'>" + 
        "  <i class='fa fa-sun'></i>" +
        "</btn>" +
        "<btn id='mouse-heart'>" + 
        "  <i class='fa fa-heart'></i>" +
        "</btn>" +
        "<btn id='cherry-blossoms'>" + 
        "  <i class='iconfont icon-yihangyinghualogo'></i>" +
        "</btn>" +
        "<btn id='live2d' class='live2d'>" + 
        "  <i class='fa fa-cat'></i>" +
        "</btn>" +
        "<div class='sidebar-btn-container mobile-hidden'>" + 
        "  <btn id='bg-video-switch'>" + 
        "    <i class='fas fa-forward'></i>" +
        "  </btn>" +
        "  <btn id='bg-video-volume'>" + 
        "    <i class='fas fa-volume-off'></i>" +
        "  </btn>" +
        "  <btn id='bg-video-contril'>" + 
        "    <i class='fab fa-youtube'></i>" +
        "  </btn> " +
        "</div>" +
        "<div class='sidebar-btn-container'>" + 
        "  <btn id='scroll-up'>" + 
        "    <i class='fa fa-arrow-up'></i>" +
        "  </btn> " +
        "  <btn id='scroll-down'>" + 
        "    <i class='fa fa-arrow-down'></i>" +
        "  </btn>" +
        "</div>";
    sidevarToggle.parentNode.appendChild(customSidebarToggle);
    customSidebarToggle.appendChild(sidevarToggle);
    // BackGround video animations
    let bgVideoControl = customSidebarToggle.querySelector("#bg-video-contril"),
        bgVideoSwitch = customSidebarToggle.querySelector('#bg-video-switch'),
        bgVideoVolume = customSidebarToggle.querySelector('#bg-video-volume');
    bgVideoControl.addEventListener('click', () => {
        videoElem = document.querySelector('video.bg-video-animation');
        // Create Element
        if (!videoElem){
            sendMessage("背景动画加载中...");
            bgVideoControl.querySelector('i').className = 'fas loading';
            let video = document.createElement('video');
            video.className = 'bg-video-animation';
            video.type = 'video/mp4';
            video.autoplay = 'true';
            video.preload = 'true';
            video.loop = 'true';
            video.volume = 0;
            video.disablePictureInPicture = 'true';
            video.src = CODING_SRC_FREFIX + ANIMATIONS[~~(ANIMATIONS.length*Math.random())];
            video.havedown
            video.addEventListener('playing', (event) => {
                if (video.done) return;
                video.done = true;
                video.style.opacity = 0.05;
                bgVideoControl.className = 'toggle-enable';
                bgVideoSwitch.style.display = 'flex';
                bgVideoVolume.style.display = 'flex';
                bgVideoControl.querySelector('i').className = 'fab fa-youtube';
                sendMessage("背景加载完成");
            });
            document.querySelector('body').appendChild(video);
            return;
        }
        // Pause & Play
        let opacity = parseFloat(videoElem.style.opacity);
        opacity = opacity === 0 ? 0.05 : (opacity * 2) % 0.8;
        videoElem.style.opacity = opacity;
        if (opacity === 0){
            bgVideoControl.classList.remove('toggle-enable');
            bgVideoSwitch.style.display = 'none';
            bgVideoVolume.style.display = 'none';
            videoElem.pause();
            sendMessage("暂停播放");
        } else {
            bgVideoControl.classList.add('toggle-enable');
            bgVideoSwitch.style.display = 'flex';
            bgVideoVolume.style.display = 'flex';
            videoElem.play();
            sendMessage("设置背景透明度：" + ~~(opacity * 100) + '%');
        }
    })
    bgVideoSwitch.addEventListener('click', function(){
        sendMessage("切换背景动画中...");
        bgVideoSwitch.querySelector('i').className = 'fas loading';
        let videoElem = document.querySelector('video.bg-video-animation');
        let newVideoElem = document.createElement('video');
        newVideoElem.className = 'bg-video-animation';
        newVideoElem.type = 'video/mp4';
        newVideoElem.autoplay = 'true';
        newVideoElem.preload = 'true';
        newVideoElem.loop = 'true';
        newVideoElem.volume = 0;
        newVideoElem.disablePictureInPicture = 'true';
        newVideoElem.src = CODING_SRC_FREFIX + ANIMATIONS[~~(ANIMATIONS.length*Math.random())];
        newVideoElem.addEventListener('playing', (event) => {
            if (newVideoElem.done) return;
            newVideoElem.done = true;
            newVideoElem.volume = videoElem.volume;
            newVideoElem.style.opacity = videoElem.style.opacity;
            videoElem.remove();
            bgVideoSwitch.querySelector('i').className = 'fas fa-forward';
            sendMessage("背景切换完成");
        });
        document.querySelector('body').appendChild(newVideoElem);
    })
    bgVideoVolume.addEventListener('click', function(){
        videoElem = document.querySelector('video.bg-video-animation');
        videoElem.volume = (videoElem.volume + 0.2) % 1;
        if (videoElem.volume === 0){
            bgVideoVolume.classList.remove('toggle-enable');
            bgVideoVolume.querySelector('i').className = 'fas fa-volume-off';
            sendMessage("关闭背景动画声音");
        } else {
            bgVideoVolume.classList.add('toggle-enable');
            bgVideoVolume.querySelector('i').className = videoElem.volume < 0.5 ?
            'fas fa-volume-down' : 'fas fa-volume-up';
            sendMessage("设置背景音量：" + ~~(videoElem.volume * 100) + '%');
        }
    })
    // Scroll to top or bottom
	$(".sidebar-btn-container>#scroll-up").click(function(){
		let top;
		if ($(".content-wrap .post").length > 0){
			top = $(".post .post-header").offset().top - $(".header").height() - 20;
		} else {
			top = 0;
		}
		$("html,body").animate({scrollTop: top + "px"}, 500);
	});
	$(".sidebar-btn-container>#scroll-down").click(function(){
		let top;
		if ($(".content-wrap .post").length > 0){
			top = $(".post-copyright").offset().top - $(".header").height() - 20;
		} else {
			top = $(".footer").offset().top + $(".footer").height();
		}
		$("html,body").animate({scrollTop: top + "px"}, 500);
    });
    // Mouse heart animation
    let heartCtrl = customSidebarToggle.querySelector('#mouse-heart');
    heartCtrl.addEventListener('click',function(){
        if (heartCtrl.classList.contains('toggle-enable')){
            moushHeartDisable();
            heartCtrl.classList.remove('toggle-enable');
            sendMessage("关闭了爱心效果");
        } else {
            moushHeartEnable();
            heartCtrl.classList.add('toggle-enable');
            sendMessage("点击会出现爱心哦");
        }
    })
    // Sakura falling animation
	let blossoms = customSidebarToggle.querySelector("#cherry-blossoms");
	blossoms.addEventListener('click' ,function(){
        let sakura = document.querySelector("#canvas_sakura");
		if (blossoms.classList.contains('toggle-enable')){
			sakura.remove();
            blossoms.classList.remove('toggle-enable');
            sendMessage("好的，咱不看樱花了");
		} else {
			startSakura();
            blossoms.classList.add('toggle-enable');
            sendMessage("看，樱花飘落");
		}
    });
    // Switch live2d display mode
    let live2d = customSidebarToggle.querySelector('#live2d');
    live2d.addEventListener('click',function(){
        let elem = document.querySelector('.live2d-widget-container');
        if (elem.className.indexOf('animated') === -1) {
            elem.classList.add('animated');
            elem.classList.add('fadeIn');
        }
		if (elem.classList.contains('fadeIn')){
            elem.classList.replace('fadeIn','fadeOut');
            live2d.style.color = '#fff';
            sendMessage("小猫咪很伤心，呜...");
        } else if (elem.classList.contains('fadeOut')){
            elem.classList.replace('fadeOut','fadeIn');
            live2d.style.color = 'var(--major-color)';
            sendMessage("小猫咪又出现了，喵喵喵～");
		}
    })
    // Switch color mode
    document.getElementById('switch-color-mode').addEventListener('click', target => {
        colorMode = (colorMode + 1) % 3;
        switch(colorMode){
            case 2:
                enableDarkMode(true);
                target.currentTarget.innerHTML = '<i class="fa fa-moon"></i>';
                sendMessage("切换到暗色模式");
                break;
            case 1:
                enableDarkMode(false);
                sendMessage("关闭动态色彩");
                target.currentTarget.innerHTML = '<i class="fa fa-adjust"></i>';
                break;
            default: 
                enableDarkMode(false);
                target.currentTarget.innerHTML = '<i class="fa fa-sun"></i>';
                sendMessage("切换到亮色模式");
        }
    })
    // Mobile
    if (isMobileUA()){
        customSidebarToggle.className = 'custom-toggle';
        let customSidebarToggleCtl = document.createElement('btn');
        customSidebarToggleCtl.className = 'custom-toggle-ctl';
        customSidebarToggleCtl.innerHTML = '<i class="fa fa-plus"></i>';
        let customSidebarToggleContainer = document.createElement('div');
        customSidebarToggle.parentNode.appendChild(customSidebarToggleContainer);
        customSidebarToggleContainer.className = 'custom-toggle';
        customSidebarToggle.id = 'custom-toggle-body';
        customSidebarToggleContainer.appendChild(customSidebarToggle);
        customSidebarToggleContainer.appendChild(customSidebarToggleCtl);
        customSidebarToggleCtl.addEventListener('click', function(){
            let container = customSidebarToggleContainer.querySelector('#custom-toggle-body');
            if (!container.classList.contains('fadeInUp')){
                container.style.display = 'block';
                container.className = 'animated fadeInUp';
                customSidebarToggleCtl.innerHTML = '<i class="fa fa-minus"></i>';
            } else if (!container.classList.contains('fadeOutDown')){
                container.className = 'animated fadeOutDown';
                setTimeout(function(){container.style.display = 'none';},500);
                customSidebarToggleCtl.innerHTML = '<i class="fa fa-plus"></i>';
            }
        });
    }
}

/**
 * pop-ups tips
 */
function sendMessage(msg, time){
    if (!msg) return;
    let timestamp = new Date().getTime(), delay = time ? time * 1000 : 2000;
        tip = document.createElement("div"), body = document.querySelector("body");
    tip.innerText = msg;
    tip.id = timestamp;
    if (isMobileUA()){
        tip.className = 'float-tips animated fadeInUp';
    } else {
        tip.className = 'float-tips animated fadeInRight';
        document.querySelectorAll('.float-tips').forEach(item => {
            item.style.top = item.offsetTop + item.clientHeight + 20 + 'px';
        });
    }
    body.append(tip);

    switch(colorMode){
        case DARK:
            tip.style = 'background:#222;color:#ccc;border-color:#ccc';
            break;
        case SIMPLE:
            tip.style = 'background:#222;color:white;border-color:#222';
            break;
        default:
            let color = getColor();
            tip.style = 'background:' + color + ';color:white;border-color:' + color;
    }

    setTimeout(function(){
        let item = document.getElementById(timestamp);
        if (isMobileUA())
            item.classList.replace("fadeInUp","fadeOutDown");
        else
            item.classList.replace("fadeInRight","fadeOutRight");
        setTimeout(function(){item.remove();},400)
    },delay);
}

/**
 * Scroll To HiddenHeader
 */
let previousTop = 0;
function scrollToHiddenHeader() {
    let headerClass = document.querySelector(".header-inner").classList;
    if (isMobileUA()){
        if (window.scrollY > 40 && window.scrollY > previousTop)
            headerClass.add("header-dis-visible");
        if (window.scrollY < 40 || window.scrollY - previousTop < -10)
            headerClass.remove("header-dis-visible");
    } else {
        if (window.scrollY > 60 && window.scrollY > previousTop)
            headerClass.add("header-dis-visible");
        if (window.scrollY < 60 || window.scrollY - previousTop < -10)
            headerClass.remove("header-dis-visible");
    }   
    previousTop = window.scrollY;
}

/**
 * Scroll To resetStyle
 */
let lastScrollTime;
function resetSidebarButtonOffset(){
    let footer = document.querySelector(".footer"),
        customToggle = document.querySelector(".custom-toggle"),
        live2d = document.getElementById("live2d-widget");
    if (isMobileUA() || !footer || !customToggle || !live2d) return;
    let viewBottom = window.scrollY + window.innerHeight - 60;
    let footerTop = footer.offsetTop;

    if (viewBottom < footerTop + 18) {
        customToggle.style = "bottom: 30px";
        live2d.style.bottom = "-50px";
    } else {
        customToggle.style = "bottom:" + (viewBottom - footerTop + 12) + "px";
        live2d.style.bottom = (viewBottom - footerTop - 68) + "px";
    }
};

/**
 * Sidebar .post-toc-wrap .site-overview-wrap max-height Setting
 */
sidebarPanel = {
    count: 0,
    append: false,
    render: function(){
        if (++ sidebarPanel.count > 150){ 
            sidebarPane.count = 0;
            return;
        }
        let sidebar = document.querySelector(".sidebar"),
            tip = sidebar ? sidebar.querySelector("#tip") : null;
        if (!sidebar){
            setTimeout(sidebarPanel.render,200);
        }
        else if (!tip){
            if (!sidebarPanel.append){
                let elem = document.createElement("div");
                elem.id = "tip";
                elem.innerHTML='<img class="emoji" draggable="false" alt="🌟" src="/images/favicon.png"> 右侧按钮可以开关canvas动画，页面卡顿建议关闭；<br><img class="emoji" draggable="false" alt="🌟" src="/images/favicon.png"> 站点支持桌面和手机设备，桌面端体验更好。推荐使用 Chrome、FireFox、Safair、新版 Edge 进行浏览。';
                sidebar.append(elem);
                sidebarPanel.append = true;
            }
            setTimeout(sidebarPanel.render,200);
        }
        else {
            tip.style.display = "block";
            let maxHeight = window.innerHeight - tip.clientHeight - 70,
                navHeight = sidebar.querySelector(".sidebar-nav").clientHeight;
                
            maxHeight = navHeight === 0 ? maxHeight - 18 : maxHeight - navHeight - 20;
            
            if (maxHeight < 0) {
                maxHeight = maxHeight + tip.clientHeight + 30;
                tip.style.display = "none";
            }
            if (maxHeight < 0) maxHeight = 0;

            sidebar.querySelectorAll(".sidebar-panel").forEach(elem => {
                elem.style = "max-height:" + maxHeight + "px";
            })
        }
        sidebarPanel.count = 0;
    }
}
$(window).resize(sidebarPanel.render);

/**
 * Fix anchor css offset
 */
AnchorRender = {
    valineVcard: function(elem){
        if (!elem.id){ return; }
        let anchor =  document.createElement("anchor"),
            style = "position:relative;top:-" + (headerHeight + 20) + "px;display:block;";
        anchor.setAttribute("style", style);
        anchor.setAttribute("id",elem.getAttribute("id"));
        elem.removeAttribute("id");
        elem.parentNode.insertBefore(anchor, elem);
    },
    postHeader: function(elem){
        if (!elem.id){ return; }
        let anchor =  document.createElement("anchor"), a = document.createElement('a');
            offset = headerHeight - elem.clientHeight + 60;
            style = "position:relative;top:-" + offset + "px;display:block;";
        anchor.setAttribute("id",elem.getAttribute("id"));
        anchor.setAttribute("class",elem.querySelector("a").getAttribute("class"));
        anchor.setAttribute("style", style);
        elem.removeAttribute("id");
        elem.parentNode.insertBefore(anchor, elem);
    },
    postMoreBtn: function(elem){
        let anchor =  document.createElement("anchor"),
            offset = headerHeight - elem.clientHeight + 20;
            style = document.querySelector("a#more + hr") ?
                "position:relative;top:-" + (offset - 20) + "px;display:block;" : 
                "position:relative;top:-" + offset + "px;";
        anchor.setAttribute("id","more");
        anchor.setAttribute("style", style);
        elem.removeAttribute("id");
        elem.parentNode.insertBefore(anchor, elem);
    },
    postFootnoteRef: function(elem){
        let a = elem.querySelector("a");
        if (!a || !a.id){ return; }
        let offset = headerHeight - elem.clientHeight + 40,
            anchor =  document.createElement("anchor"),
            style = "position:relative;top:-" + offset + "px;display:inline-block;";
        anchor.setAttribute("id",a.id);
        anchor.setAttribute("style", style);
        a.removeAttribute("id");
        elem.parentNode.insertBefore(anchor, elem);
    },
    postFootnoteItem: function(elem){
        if (!elem.id){ return; }
        let offset = headerHeight - elem.clientHeight + 40,
            anchor =  document.createElement("anchor"),
            style = "position:relative;top:-" + offset + "px;display:block;";
        anchor.setAttribute("id",elem.id);
        anchor.setAttribute("style", style);
        elem.removeAttribute("id");
        elem.parentNode.insertBefore(anchor, elem);
        elem.querySelectorAll("a").forEach(item => {
            item.setAttribute("style","margin-right:5px");
            elem.appendChild(item);
        })
        elem.querySelector("p").remove();
    }
}

function anchorRenderPost (){
    let article = document.querySelector(".post-body");
    if (!article) return;
    article.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach(AnchorRender.postHeader);
    setTimeout(NexT.utils.registerSidebarTOC);
    article.querySelectorAll("a#more").forEach(AnchorRender.postMoreBtn);
    article.querySelectorAll("sup.footnote-ref").forEach(AnchorRender.postFootnoteRef);
    article.querySelectorAll(".footnotes-list li.footnote-item").forEach(AnchorRender.postFootnoteItem);
}

/**
 * Valine comments
 */
valineComments = {
    count: 0,
    render: function(){
        if (++ valineComments.count > 150){ 
            valineComments.count = 0;
            return;
        }
        let valine = document.querySelector("#valine-comments .vpanel .vwrap"),
            tip = valine ? valine.querySelector(".vrow .vcol.vcol-30") : null,
            nick = valine ? valine.querySelector(".vheader .vnick") : null,
            mail = valine ? valine.querySelector(".vheader .vmail") : null,
            link = valine ? valine.querySelector(".vheader .vlink") : null,
            svg = document.querySelector("valine-comments .vcol.vcol-30 svg");
        if (tip && mail && nick && link){
            tip.innerHTML = '<a href="https://segmentfault.com/markdown" target="_blank" class="ignore-href">MarkDown</a> is support.';
            nick.placeholder = "昵称（QQ 号自动获取头像）";
            mail.placeholder = "邮箱（保密，用于接收通知）";
            link.placeholder = "网站、空间地址";
            let page = document.querySelector(".content.page");
            if (page){
                page.style = "width:inherit;position:inherit;left:unset";
            }
            if (svg){
                svg.style = "display:none";
            }
            valineComments.count = 0;
        } else {
            setTimeout(valineComments.render, 200);
        }
    }
}

/**
 * comments component 
 */
let commentsInputVwrap, vwrapControl;
let commentsComponentHandler = function(){
    commentsElem = document.querySelector('.comments');
    // valine commen component control
    if (!commentsElem){
        setTimeout(commentsComponentHandler, 300);
        return;
    }
    commentsInputVpanel = commentsElem.querySelector('.vpanel');
    if (!commentsInputVpanel){
        setTimeout(commentsComponentHandler, 300);
        return;
    }
    commentsInputVwrap = commentsInputVpanel.querySelector('.vwrap');
    commentsInputVwrap.style.display = 'none';
    commentsInputVwrap.classList.add('animated');
    commentsInputVwrap.classList.add('fadeIn');
    commentsInputVwrap.querySelector('.cancel-reply').addEventListener('click', function(){
        commentsInputVwrap.style.display = 'none';
        vwrapControl.classList.remove('disabled');
        vwrapControl.style.cursor = 'unset';
    })
    // add button
    if (!commentsElem.querySelector('.vwrap-control-container')){
        vwrapControlContainer = document.createElement('div');
        vwrapControlContainer.className = 'vwrap-control-container';
        commentsInputVpanel.insertBefore(vwrapControlContainer,commentsInputVwrap);

        vwrapControl = document.createElement('button');
        vwrapControl.className = 'vwrap-control';
        vwrapControl.innerText = '举手发言';
        vwrapControl.addEventListener('click',function(){
            if (vwrapControl.classList.contains('disabled'))
                return;
            if(vwrapControl.name.length === 0) {
                commentsInputVwrap.style.display = 'block';
                vwrapControl.name = 'close';
                vwrapControl.innerText = '取消发言';
            } else {
                commentsInputVwrap.style.display = 'none';
                vwrapControl.name = '';
                vwrapControl.innerText = '举手发言';
            }
        })
        vwrapControlContainer.appendChild(vwrapControl);
    }
}

/**
 * new vcard element handler
 */
function newValineVcardElementHandler(){
    let target = event.target, classList = target.classList;
    if (classList && classList.toString() === "vcard"){
        // Add anchor for Vcard
        AnchorRender.valineVcard(target);
        // add click listener for vat element
        target.querySelector('.vat').addEventListener('click',function(){
            commentsInputVwrap.style.display = 'block';
            vwrapControl.classList.add('disabled');
            vwrapControl.style.cursor = 'not-allowed';
            vwrapControl.name = '';
            vwrapControl.innerText = '举手发言';
        });
    }
}

/**
 * Browsers Url update
 */
let updateAnchorRecord = [];
var updateAnchor = new IntersectionObserver((items, observe) => {
	items.forEach((item) => {
		let elem = item.target, 
			anchor = elem.id !== "" && elem.id !== "null" ? "#" + elem.id : "",
  		    offset =item.boundingClientRect.top;
		if (offset > 0 || anchor === ""){
			let index = updateAnchorRecord.indexOf(anchor),
				r_len = updateAnchorRecord.length;
				elem = null;
			if (r_len > 0) {
				if (updateAnchorRecord[r_len-1].indexOf("#") !== -1)
					elem = document.querySelector(updateAnchorRecord[r_len-1]);
			}
			if (index > 0 && anchor !== "") {
				anchor = updateAnchorRecord[index-1];
			} else if (elem && item.target.offsetTop > elem.offsetTop && offset > 0){
				anchor = updateAnchorRecord[r_len-1];
			} else {
				let hash = window.location.hash,
					path = hash.substring(0,hash.lastIndexOf("#"));
				anchor = window.location.pathname + path;
			}
		}
  		history.replaceState(null, "anchor", anchor);
		if (updateAnchorRecord.indexOf(anchor) === -1) {
			updateAnchorRecord.push(anchor);
		}
	})
},{
  	rootMargin: "99999px 0px -100% 0px",
  	threshold : 0
});

function browserUrlRefreshForPost () {
    updateAnchorRecord = [];
    document.querySelectorAll("anchor.header-anchor").forEach(item => {
        if (item.id.length > 0){
            updateAnchor.observe(item);
        }
    });
    let copypight = document.querySelector(".post article .post-copyright");
    if (copypight) {
        updateAnchor.observe(copypight);
    }
}

/**
 * Loading goto anchor
 */
const initUrl = decodeURI(window.location.href), index = initUrl.lastIndexOf("#") + 1;
let gotoAnchorLoop = 0, anchorIndex = index == 0 ? null : initUrl.substring(index);
let gotoAnchor = function(){
    if (!anchorIndex || ++ gotoAnchorLoop > 100) { 
        gotoAnchorLoop = 0;
        return;
    }
    let target = document.getElementById(anchorIndex);
    if (!target || target.nodeName !== "ANCHOR"){
        setTimeout(gotoAnchor, 300);
    } else{
        gotoAnchorLoop = 0;
        let top = target ? target.getBoundingClientRect().top + window.scrollY : 0;
        if (top === 0) return;
        window.anime({
            targets  : document.scrollingElement,
            duration : 100,
            easing   : "linear",
            scrollTop: top + 10
        });
        setTimeout(function(){
            document.querySelector(".header-inner").classList.remove("header-dis-visible");
        },600);
    }
}

/**
 * Add Header Listener
 */
function headerListenerForAnchor(){
    // header
    document.querySelectorAll("a.header-anchor").forEach(elem => {
        elem.addEventListener("click", event => {
            const offset = elem.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.anime({
                targets  : document.scrollingElement,
                duration : 0,
                easing   : "linear",
                scrollTop: offset - 10
            });
        })
    })
}

/**
 * header visible set
 */
function registerLinkClickListener(){
    document.querySelectorAll('.sidebar .post-toc a').forEach(elem => {
        elem.addEventListener('click',function(){
            setTimeout(function(){
                document.querySelector(".header-inner").classList.remove("header-dis-visible");
            },550);
        });
    });
    document.querySelectorAll('.content .post-body a.header-anchor').forEach(elem => {
        elem.addEventListener('click',function(){
            setTimeout(function(){
                document.querySelector(".header-inner").classList.remove("header-dis-visible");
            },50);
        });
    });
    document.querySelectorAll('.content .post-body a:not(.header-anchor)').forEach(elem => {
        elem.addEventListener('click',function(){
            setTimeout(function(){
                document.querySelector(".header-inner").classList.remove("header-dis-visible");
            },600);
        });
    });
}

/**
 * footer Love icon add link
 */
function footerWithLove(){
    let link = document.createElement('a'),
        span = document.querySelector(".footer-inner .with-love");
    if (!span) return;
    link.href = "/more/love.html";
    link.className = span.className;
    link.append(span.querySelector('i'));
    span.replaceWith(link);
};

/**
 * Hidein comment count in the postmeta
 */
function postMetaValine(){
    let postMetas = document.querySelectorAll('.post-header .post-meta-item');
    postMetas.forEach(elem =>{
        let valine = elem.querySelector('.post-meta-item-text');
        if (valine && valine.innerHTML.indexOf('Valine') != -1){
            elem.remove();
        }
    })
}

// Load video
function initializeVideoJS(){
	document.querySelectorAll("video.video-js").forEach((item)=>{
		videojs(item);
    });
}

/**
 * Filter and handle after trends page loaded
 */
function postHeaderFilter(){
    // index page
    let postHeaders = document.querySelectorAll('.index article');
    postHeaders.forEach(headerItem => {
        let postTitle = headerItem.querySelector('.post-title > a'),
            postMetas = headerItem.querySelectorAll('.post-meta-item');
        postMetas.forEach( metaItem => {
            if (!metaItem.querySelector('.post-meta-item-icon .fa-folder'))
                return;
            metaItem.querySelectorAll('span a').forEach(item => {
                if (item.textContent.indexOf('动态') > -1){
                    postTitle.style.display = 'none';
                }
            })
        })  
    })
}

/**
 * rewrite pjaxSelectors
 */
function rewritePjaxSelectors(){
     pjax = new Pjax({
            selectors: ['head title','.page-configurations','.main-inner','.post-toc-wrap','.languages','.pjax'],
            analytics: false,
            cacheBust: false,
            scrollTo : !CONFIG.bookmark.enable
        });
}

/**
 * add star to site-title 
 */
function siteTitleRender(){
    let title = document.querySelector('.site-title'),
        star = '<img class="emoji animated fadeIn" draggable="false" alt="🌟" src="/images/favicon.png">';
    if (title){
        title.innerHTML = star + ' ' + title.innerHTML + ' ' + star;
    }
}

/**
 * note style color render
 */
function noteStyleRender(){
    document.querySelectorAll('.note.default').forEach(item => {
        let color = getColor();
        item.style.background = color + '15';
        item.style.borderLeftColor = color;
        item.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(item => {
            item.style.color = color;
        })
    })
}

/**
 * Calculate date deviation
 */
function calculateDateDeviation(begin){
    let now = new Date();
    if (now - begin < 0){
        console.error('Start date must before current.');
        return { yearOffset: NaN, dayOffset: NaN }
    }
    let oneDay = 24*60*60*1000,
        thisYear = now.getFullYear(),
        isLeapYear = (thisYear % 4 === 0 && thisYear%100 != 0) || thisYear % 400 === 0;
        daysOfYear = isLeapYear ? 366 : 365,
        offset = isLeapYear? new Date(now - begin - oneDay) : new Date(now - begin),
        yearOffset = offset.getFullYear() - 1970,
        previous = new Date(begin.getTime());
    previous.setFullYear(now.getFullYear() - 1);
    if (now - previous > daysOfYear * oneDay){
        previous.setFullYear(now.getFullYear());
    }
    let dayOffset = ((now - previous)/oneDay).toFixed(2).replace(daysOfYear, 0);
    return { yearOffset: yearOffset, dayOffset: dayOffset }
}

/******************************************************************
 * Event Listeners
 *****************************************************************/

window.onscroll = function(){
    scrollToHiddenHeader();
    resetSidebarButtonOffset();
}

document.addEventListener("touchend",mobileSiteNavClose,false);

document.addEventListener("pjax:send", function () {
    aplayerPjaxCompatible("backup");
    updateAnchor.disconnect();
})

document.addEventListener("DOMNodeInserted", function(event){
    // new vcard element handler
    newValineVcardElementHandler();
})

document.addEventListener("pjax:success", function () {
    // Fix anchor css offset
    anchorRenderPost();
    // Header visible set
    registerLinkClickListener();
    // Browsers URL update
    browserUrlRefreshForPost();
    // recover aplayer data
    aplayerPjaxCompatible("recover");
    // Valine comments
    setTimeout(valineComments.render,100);
    // tags color render
    elementDynamicColorRender();
    // Load video
    initializeVideoJS();
    // Hidein comment count in the postmeta
    postMetaValine();
    // comments component 
    commentsInputVwrap = undefined;
    vwrapControl = undefined;
    commentsComponentHandler();
    // Filter and handle after trends page loaded
    postHeaderFilter();
    // footer Love icon add link
    footerWithLove();
    // rewrite pjaxSelectors
    rewritePjaxSelectors();
    // note background color render
    noteStyleRender();
});

document.addEventListener("DOMContentLoaded", function(event){
    let exec = function() {
        if (headerHeight === undefined){
            setTimeout(exec,200);
            return;
        }
        // add star to site-title
        siteTitleRender(); 
        // add Sidebar Button
        sidebarButtonRender();
        // Sidebar .post-toc-wrap .site-overview-wrap max-height Setting
        sidebarPanel.render();
        // Fix anchor css offset
        anchorRenderPost();
        // Header visible set
        registerLinkClickListener();
        // Browsers URL update
        browserUrlRefreshForPost();
        // Goto Anchor
        gotoAnchor();
        // Add anchor click listener
        headerListenerForAnchor();
        // Valine comments
        valineComments.render();
        // tags color render
        elementDynamicColorRender();
        // Local Search Style Setting
        searchPopupRender();
        // footer Love icon add link
        footerWithLove();
        // Search Popup
        registerSearchMenuListener();
        // Load video
        initializeVideoJS();
        // Hidein comment count in the postmeta
        postMetaValine();
        // comments component 
        commentsComponentHandler();
        // Filter and handle after trends page loaded
        postHeaderFilter();
        // rewrite pjaxSelectors
        rewritePjaxSelectors();
        // note background color render
        noteStyleRender();
    };
    exec();
})