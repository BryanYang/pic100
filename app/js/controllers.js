'use strict';

/* Controllers */

var picControllers = angular.module('picControllers', []);

picControllers.controller('homeCtrl', ['$scope',
    function($scope) {
        $scope.pre = function() {
            var left = Number($('ul.lunbo').css('left').replace('px', ''));
            $('a.lunbo_right').css('opacity', 1);
            if (left < 0) {
                left += 1000;
                left = left - left % 1000;
                jQuery('ul.lunbo').css('left', left);
                if (left == 0) {
                    $('a.lunbo_left').css('opacity', 0);
                }
            }
        }

        $scope.next = function() {
            var left = Number($('ul.lunbo').css('left').replace('px', ''));
            $('a.lunbo_left').css('opacity', 1);
            if (left > -4000) {
                left -= 1000;
                left = left - left % 1000;
                jQuery('ul.lunbo').css('left', left);
                if (left == -4000) {
                    $('a.lunbo_right').css('opacity', 0);
                }
            }
        }
    }
]);


picControllers.controller('artCtrl', ['$scope', 'Art',
    function($scope, Art) {
        $scope.currentPage = 1;
        $scope.totalPage = 1;
        $scope.pageSize = 9;
        $scope.pages = [];
        $scope.endPage = 1;
        $scope.arts = [];
        $scope.artsTotal = [];
        //获取总
        Art.total().success(function(data) {
            $scope.artsTotal = data;
            //获取总页数
            $scope.totalPage = Math.ceil($scope.artsTotal.length / $scope.pageSize);

            $scope.endPage = $scope.totalPage;
            $scope.loadPage(1);
        });

        $scope.load = function() {
            $scope.arts = $scope.artsTotal.slice(($scope.currentPage - 1) * $scope.pageSize).slice(0, $scope.pageSize);
            //生成数字链接
            if ($scope.currentPage > 1 && $scope.currentPage < $scope.totalPage) {
                $scope.pages = [
                    $scope.currentPage - 1,
                    $scope.currentPage,
                    $scope.currentPage + 1
                ];
            } else if ($scope.currentPage == 1 && $scope.totalPage > 1) {
                $scope.pages = [
                    $scope.currentPage,
                    $scope.currentPage + 1
                ];
            } else if ($scope.currentPage == $scope.totalPage && $scope.totalPage > 1) {
                $scope.pages = [
                    $scope.currentPage - 1,
                    $scope.currentPage
                ];
            }

        };

        $scope.next = function() {
            if ($scope.currentPage < $scope.totalPage) {
                $scope.currentPage++;
                $scope.load();
            }
        };

        $scope.prev = function() {
            if ($scope.currentPage > 1) {
                $scope.currentPage--;
                $scope.load();
            }
        };

        $scope.loadPage = function(page) {
            $scope.currentPage = page;
            $scope.load();
        };

    }

]);


picControllers.controller('artDetailCtrl', ['$scope', '$routeParams', 'ArtDetail',
    function($scope, $routeParams, ArtDetail) {
        $scope.art = {};
        var _width = 0;
        ArtDetail.detail($routeParams.id).success(function(data) {
            $scope.art = data;
            _width = $scope.art.drawSteps.length * 155;
        });

        $scope.pre = function() {
            var left = Number($('ul.lunbo2').css('left').replace('px', ''));
            $('a.lunbo_right2').css('opacity', 1);
            if (left < 0) {
                left = left + 250 > 0 ? 0 : left + 250;
                jQuery('ul.lunbo2').css('left', left);
                if (left == 0) {
                    $('a.lunbo_left2').css('opacity', 0);
                }
            }
        }

        $scope.next = function() {
            var left = Number($('ul.lunbo2').css('left').replace('px', ''));
            $('a.lunbo_left2').css('opacity', 1);
            if (left - 900 + _width > 0) {
                left = left - 250 < 900 - _width ? 900 - _width : left - 250;

                console.log(_width);
                jQuery('ul.lunbo2').css('left', left);
                if (left - 900 + _width == 0) {
                    $('a.lunbo_right2').css('opacity', 0);
                }
            }
        }


    }
])

picControllers.controller('cartCtrl', ['$scope', 'Cart',
    function($scope, Cart) {
        $scope.orders = [];
        Cart.get().success(function(data) {
            $scope.orders = data;
        });

    }
])

picControllers.controller('customOrderCtrl', ['$scope', 'CustomOrder', 'Upload',
    function($scope, CustomOrder, Upload) {
        $scope.current = 'checkOut';
        $scope.styles = $scope.sizes = $scope.frames = [];
        $scope.selectedStyle = $scope.selectedSize = $scope.selectedFrame = {};
        $scope.picFile = null;

        $scope.$watch('files', function(files) {
            $scope.formUpload = false;
            if (files != null && files.length != 0) {
                upload(files[0])
            }
        });

        $scope.uploadPic = function(files) {
            console.log(files)
            $scope.formUpload = true;
            if (files != null) {
                upload(files[0])
            }
        };

        function upload(file) {
            uploadUsingUpload(file);
        }

        function uploadUsingUpload(file) {
            file.upload = Upload.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                method: 'POST',
                headers: {
                    'my-header': 'my-header-value'
                },
                fields: {
                    username: $scope.username
                },
                file: file,
                fileFormDataName: 'myFile'
            });

            file.upload.then(function(response) {
                $timeout(function() {
                    file.result = response.data;
                });
            }, function(response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            });

            file.upload.progress(function(evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });

            file.upload.xhr(function(xhr) {
                // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
            });
        }






        CustomOrder.getStyles().success(function(data) {
            $scope.styles = data;
        })

        CustomOrder.getSizes().success(function(data) {
            $scope.sizes = data;
        })

        CustomOrder.getFrames().success(function(data) {
            $scope.frames = data;
        })

        $scope.setCurrent = function(cur) {
            $scope.current = cur;
        }

        $scope.selectStyle = function(s) {
            $scope.selectedStyle = s;
        }

        $scope.selectSize = function(s) {
            $scope.selectedSize = s;
        }

        $scope.selectFrame = function(f) {
            $scope.selectedFrame = f;
        }

    }
])

picControllers.controller('orderCompleteCtrl', ['$scope', 'CustomOrder',
    function($scope,CustomOrder) {
        $scope.order = {};
        CustomOrder.getOrder().success(function(data){
            $scope.order = data;
        })
    }
])