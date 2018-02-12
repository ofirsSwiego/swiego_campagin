angular.module('App', ['angular-loading-bar','ui.router'])
    .config(['cfpLoadingBarProvider','$stateProvider','$urlRouterProvider','$locationProvider', function(cfpLoadingBarProvider,$stateProvider,$urlRouterProvider,$locationProvider) {

        cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
        cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Custom Loading Message...</div>';

        $urlRouterProvider.otherwise('/');
        $stateProvider
        // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
                url: '/',
                templateUrl: 'partials/partial-home.html',
                controller: 'mainController'
            })

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }])
    .controller('mainController', function($scope,cfpLoadingBar) {
        $scope.loading_page = false;

        cfpLoadingBar.start();

        var tl = new TimelineLite();
        tl.staggerFrom(".topics", 3, {
            css:{transform:"scale(0)",top:"60%",left:"50%"},ease:Elastic.easeOut
        }, 0.3);


        var js = document.getElementById("js");
        var sass = document.getElementById("sass");
        var php = document.getElementById("php");
        var css3 = document.getElementById("css3");
        var hmtl5 = document.getElementById("html5");
        var topics = document.getElementsByClassName("topics");

        cfpLoadingBar.inc();

        js.addEventListener("mouseover",jsretina,false);
        js.addEventListener("touchstart",jsretina,false);
        hmtl5.addEventListener("mouseover",html5retina,false);
        hmtl5.addEventListener("touchstart",html5retina,false);
        sass.addEventListener("mouseover",sassretina,false);
        sass.addEventListener("touchstart",sassretina,false);
        php.addEventListener("mouseover",phpretina,false);
        php.addEventListener("touchstart",phpretina,false);
        css3.addEventListener("mouseover",css3retina,false);
        css3.addEventListener("touchstart",css3retina,false);



        function jsretina(event) {
            TweenMax.to("#retina", 0.2, {left:"51%",top:"59.5%"});
        }

        function html5retina(event) {
            TweenMax.to("#retina", 0.2, {left:"49%",top:"59.5%"});
        }

        function css3retina(event) {
            TweenMax.to("#retina", 0.2, {left:"49%",top:"60.5%"});
        }

        function phpretina(event) {
            TweenMax.to("#retina", 0.2, {left:"51%",top:"60.5%"});
        }

        function sassretina(event) {
            TweenMax.to("#retina", 0.2, {left:"50%",top:"59%"});
        }


        for(var i=0; i< topics.length; i++){
            topics[i].addEventListener("mouseout",retinaout);
        }
        function retinaout(event) {
            TweenMax.to("#retina", 0.2, {left:"50%",top:"60%"});
        }


        // MIT license
// By @nodws with github.com/greensock/GreenSock-JS, see more examples at greensock.com/examples-showcases
        (function() {
            var lastTime = 0;
            var vendors = ['ms', 'moz', 'webkit', 'o'];
            for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                    || window[vendors[x]+'CancelRequestAnimationFrame'];
            }

            if (!window.requestAnimationFrame)
                window.requestAnimationFrame = function(callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                        timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };

            if (!window.cancelAnimationFrame)
                window.cancelAnimationFrame = function(id) {
                    clearTimeout(id);
                };
        }());


        (function() {

            var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

            // Main
            initHeader();
            initAnimation();
            addListeners();

            function initHeader() {
                width = window.innerWidth;
                height = window.innerHeight;
                target = {x: width/2, y: height/2};

                //largeHeader = document.getElementById('large-header');
                //console.log(largeHeader)
               // largeHeader.style.height = height+'px';

                //canvas = document.getElementById('x-canvas');
                //canvas.width = width;
                //canvas.height = height;
                //ctx = canvas.getContext('2d');

                // create points
                points = [];
                var puntitos=20;
                for(var x = 0; x < width; x = x + width/puntitos) {
                    for(var y = 0; y < height; y = y + height/puntitos) {
                        var px = x + Math.random()*width/puntitos;
                        var py = y + Math.random()*height/puntitos;
                        var p = {x: px, originX: px, y: py, originY: py };
                        points.push(p);
                    }
                }

                // for each point find the 5 closest points
                for(var i = 0; i < points.length; i++) {
                    var closest = [];
                    var p1 = points[i];
                    for(var j = 0; j < points.length; j++) {
                        var p2 = points[j]
                        if(!(p1 == p2)) {
                            var placed = false;
                            for(var k = 0; k < 5; k++) {
                                if(!placed) {
                                    if(closest[k] == undefined) {
                                        closest[k] = p2;
                                        placed = true;
                                    }
                                }
                            }

                            for(var k = 0; k < 5; k++) {
                                if(!placed) {
                                    if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                        closest[k] = p2;
                                        placed = true;
                                    }
                                }
                            }
                        }
                    }
                    p1.closest = closest;
                }

                // assign a circle to each point
                for(var i in points) {
                    var c = new Circle(points[i], 2+Math.random()*2, 'rgba(200,200,255,255)');
                    points[i].circle = c;
                }
            }
            cfpLoadingBar.set(0.3) // Set the loading bar to 30%
            cfpLoadingBar.status() // Returns the loading bar's progress.
// -> 0.3
            // Event handling
            function addListeners() {
                if(!('ontouchstart' in window)) {
                    window.addEventListener('mousemove', mouseMove);
                }
                window.addEventListener('scroll', scrollCheck);
                window.addEventListener('resize', resize);
            }

            function mouseMove(e) {
                var posx = posy = 0;
                if (e.pageX || e.pageY) {
                    posx = e.pageX;
                    posy = e.pageY;
                }
                else if (e.clientX || e.clientY)    {
                    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                }
                target.x = posx;
                target.y = posy;
            }

            function scrollCheck() {
                if(document.body.scrollTop > height) animateHeader = false;
                else animateHeader = true;
            }

            function resize() {
                width = window.innerWidth;
                height = window.innerHeight;
                //largeHeader.style.height = height+'px';
                canvas.width = width;
                canvas.height = height;
            }

            // animation
            function initAnimation() {
                animate();
                for(var i in points) {
                    shiftPoint(points[i]);
                }
            }

            function animate() {
                if(animateHeader) {
                    //ctx.clearRect(0,0,width,height);
                    for(var i in points) {
                        // detect points in range
                        if(Math.abs(getDistance(target, points[i])) < 4000) {
                            points[i].active = 0.3;
                            points[i].circle.active = 0.6;
                        } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                            points[i].active = 0.1;
                            points[i].circle.active = 0.3;
                        } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                            points[i].active = 0.02;
                            points[i].circle.active = 0.1;
                        } else {
                            points[i].active = 0;
                            points[i].circle.active = 0;
                        }

                        drawLines(points[i]);
                        points[i].circle.draw();
                    }
                }
                requestAnimationFrame(animate);
            }

            function shiftPoint(p) {
                TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*50,
                    y: p.originY-50+Math.random()*50, ease:Circ.easeInOut,
                    onComplete: function() {
                        shiftPoint(p);
                    }});
            }

            // Canvas manipulation
            function drawLines(p) {
                if(!p.active) return;
                // for(var i in p.closest) {
                //     ctx.beginPath();
                //     ctx.moveTo(p.x, p.y);
                //     ctx.lineTo(p.closest[i].x, p.closest[i].y);
                //     ctx.strokeStyle = 'rgba(95,205,255,'+ p.active+')';
                //     ctx.stroke();
                // }
            }

            function Circle(pos,rad,color) {
                var _this = this;

                // constructor
                (function() {
                    _this.pos = pos || null;
                    _this.radius = rad || null;
                    _this.color = color || null;
                })();

                this.draw = function() {
                    if(!_this.active) return;
                    // ctx.beginPath();
                    // ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
                    // ctx.fillStyle = 'rgba(95,205,255,'+ _this.active+')';
                    // ctx.fill();
                };
            }

            // Util
            function getDistance(p1, p2) {
                return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
            }

            $('#contact_form').find('input, textarea').on('keyup blur focus', function (e) {
                var $this = $(this),
                    label = $this.prev('label');
                if (e.type === 'keyup') {
                    if ($this.val() === '') {
                        label.removeClass('active highlight');
                    } else {
                        $this.css('border','1px solid #1ab188');
                        label.addClass('active highlight');
                    }
                } else if (e.type === 'blur') {
                    if( $this.val() === '' ) {
                        label.removeClass('active highlight');
                    } else {
                        label.removeClass('highlight');
                    }
                } else if (e.type === 'focus') {

                    if( $this.val() === '' ) {
                        label.removeClass('highlight');
                    }
                    else if( $this.val() !== '' ) {
                        label.addClass('highlight');
                    }
                }
            });


        })();



        $scope.scroll_to = function (type) {
            if(type == 1){
                ga('send', 'event', 'outsourcing' ,'scroll');

                // hitType: 'event',
                //     eventCategory: 'scroll to outsourcing',
                //     eventAction: 'outsourcing',
                //     eventLabel: 'click outsourcing'
                $("html, body").animate({ scrollTop: $('#about').offset().top }, 1000);
            }
            if(type == 2){
                $("html, body").animate({ scrollTop: $('#features').offset().top }, 1000);
            }
            if(type == 3){
                $("html, body").animate({ scrollTop: $('#contact').offset().top }, 1000);
            }
            if(type == 4){
                $("html, body").animate({ scrollTop: $('header').offset().top }, 1000);
            }
        }

        $scope.user = {};
        $scope.onSubmit = function(){
            if($scope.user.phone && $scope.user.email && $scope.user.name){
                var validate = validateEmail($scope.user.email);

                if(validate){
                    $scope.user.site = 4;
                    var url = window.location.href+'/server/index.php';


                    $.ajax({
                        type: 'POST',
                        url: url,
                        data: {action: 'sendData', data: JSON.stringify($scope.user)},
                        dataType: 'json',
                        beforeSend: function () {

                        },
                        success: function (data) {
                            //alert(data.result);
                            console.log(data.result)
                            //if(data.result.status == 103){
                                ga('send', {
                                    hitType: 'event',
                                    eventCategory: 'Contact Us',
                                    eventAction: 'Send lead',
                                    eventLabel: 'Dedicated team Campaign'
                                });
                                $('.loader__result').toggleClass('loader__result--is-complete');
                            //}else {
                             //   alert(22222);
                            //    console.log('error server');
                           // }
                        }
                    });
                }else {
                    $('#email').css('border','1px solid red');
                }
            }else {
                if(!$scope.user.phone){
                    $('#phone').css('border','1px solid red');
                }if(!$scope.user.name){
                    $('#name').css('border','1px solid red');
                }if(!$scope.user.email){
                    $('#email').css('border','1px solid red');
                }
            }
        }



        $.fn.extend({

            // Define the threeBarToggle function by extending the jQuery object
            threeBarToggle: function(options){

                // Set the default options
                var defaults = {
                    color: 'black',
                    width: 30,
                    height: 25,
                    speed: 400,
                    animate: true
                }
                var options = $.extend(defaults, options);

                return this.each(function(){

                    $(this).empty().css({'width': options.width, 'height': options.height, 'background': 'transparent'});
                    $(this).addClass('tb-menu-toggle');
                    $(this).prepend('<i></i><i></i><i></i>').on('click', function(event) {
                        event.preventDefault();
                        $(this).toggleClass('tb-active-toggle');
                        if (options.animate) { $(this).toggleClass('tb-animate-toggle'); }
                        $('.tb-mobile-menu').slideToggle(options.speed);
                    });
                    $(this).children().css('background', options.color);
                });
            },

            // Define the accordionMenu() function that adds the sliding functionality
            accordionMenu: function(options){

                // Set the default options
                var defaults = {
                    speed: 400
                }
                var options =  $.extend(defaults, options);

                return this.each(function(){

                    $(this).addClass('tb-mobile-menu');
                    var menuItems = $(this).children('li');
                    menuItems.find('.sub-menu').parent().addClass('tb-parent');
                    $('.tb-parent ul').hide();
                    $('.tb-parent > a').on('click', function(event) {
                        event.stopPropagation();
                        event.preventDefault();
                        $(this).siblings().slideToggle(options.speed);
                    });

                });
            }
        });

// Convert any element into a three bar toggle
// Optional arguments are 'speed' (number in ms, 'slow' or 'fast') and 'animation' (true or false) to disable the animation on the toggle
        $('#menu-toggle').threeBarToggle({color: '#fff', width: 30, height: 25});

// Make any nested ul-based menu mobile
// Optional arguments are 'speed' and 'accordion' (true or false) to disable the behavior of closing other sub
        $('#menu').accordionMenu();



        /* Brings in Navigation on Scroll*/
        $(window).scroll(function() {
            var distance = $('#about').offset().top - 400,
                $window = $(window);

            if ($window.scrollTop() >= distance) {
                $('.navbar-nav, .scroll-top').addClass('block');

            } else {
                $('.navbar-nav, .scroll-top').removeClass('block');

            };
        });

        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        cfpLoadingBar.complete();
        setTimeout(function(){
            $('.loading_page').hide().addClass('animated fadeOut');
            $('.page').show().addClass('animated fadeIn');
        },2100);

    })


.directive('onlyDigits', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined) return '';
                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if (transformedInput !== inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    };
});

