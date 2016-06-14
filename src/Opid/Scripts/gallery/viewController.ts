/// <reference path="../../typings/browser.d.ts" />

namespace opid.gallery {
    class ViewController {

        constructor(public user: shared.IUser) { }
    }

    angular.module('opidApp').controller('viewController', ViewController);
}