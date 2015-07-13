define(['directives/module'], function (directives) {
    'use strict';

    directives.directive('ngInfiniteScroll', function ($rootScope, $window, $timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var onScrollHandler, scrollDistance;
                $window = angular.element($window);
                // By default scrollDistance is 2
                scrollDistance = 2;
                if (attrs.scrollDistance != null) {
                    scope.$watch(attrs.scrollDistance, function(value) {
                        return scrollDistance = parseInt(value, 10);
                    });
                }
                onScrollHandler = function() {
                    var elementBottom, remaining, shouldScroll, windowBottom;

                    windowBottom = $window.height() + $window.scrollTop();
                    elementBottom = element.offset().top + element.height();
                    remaining = elementBottom - windowBottom;
                    shouldScroll = remaining <= ($window.height() * scrollDistance);

                    if (shouldScroll && attrs.infiniteScrollCallback !== null) {
                        if ($rootScope.$$phase) {
                            return scope.$eval(attrs.infiniteScrollCallback);
                        } else {
                            return scope.$apply(attrs.infiniteScrollCallback);
                        }
                    }
                };

                $window.on('scroll', onScrollHandler);
                scope.$on('$destroy', function() {
                    return $window.off('scroll', onScrollHandler);
                });

                return $timeout((function() {
                    return onScrollHandler();
                }), 0);
            }
        };
    });
});