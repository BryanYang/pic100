var picServices = angular.module('picServices', []);

picServices.factory('Art', ['$http', function($http) {
    var list = function(page, size) {
        return $http({
            params: {
                page: page,
                size: size
            },
            url: '/merchants/business/list'
        });
    };

    var total = function() {
        return $http.get('datas/arts.json');
    };

    var post = function(business) {
        return $http.post('/merchants/business/post', business);
    };

    return {
        list: function(page, size) {
            return list(page, size);
        },
        total: function() {
            return total();
        },
        post: function(business) {
            return post(business);
        }
    };
}]);


picServices.factory('ArtDetail', ['$http', function($http) {
    var detail = function(id) {
        return $http.get('datas/art' + id + '.json');
    };


    return {
        "detail": detail
    };
}]);


picServices.factory('Cart', ['$http', function($http) {
    var get = function() {
        return $http.get('datas/cart.json');
    };
    return {
        "get": get
    };
}]);

picServices.factory('CustomOrder', ['$http', function($http) {
    var getStyles = function() {
        return $http.get('datas/customStyles.json');
    };

    var getSizes = function() {
        return $http.get('datas/customSizes.json');
    }

    var getFrames = function() {
        return $http.get('datas/customFrames.json');
    }

    var getOrder = function(){
        return $http.get('datas/order.json');
    }


    return {
        "getStyles": getStyles,
        "getSizes": getSizes,
        "getFrames": getFrames,
        "getOrder":getOrder
    };

}]);
