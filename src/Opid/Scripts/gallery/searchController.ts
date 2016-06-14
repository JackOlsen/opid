/// <reference path="../../typings/browser.d.ts" />

namespace opid.gallery {
    class SearchController {

        constructor(public user: shared.IUser) { }
    }

    angular.module('opidApp').controller('searchController', SearchController);
}