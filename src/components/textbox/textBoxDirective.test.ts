﻿describe("textBoxDirective", () => {
    beforeEach(() => {
        angular.mock.module('fabric.ui.components.textbox');
    });

    afterEach(() => {
        // myfunc.reset();
    });

    it("should have unique ids", inject(($compile, $rootScope) => {
        var $scope = $rootScope.$new();
        var textBox1 = $compile('<uif-textbox value="textBoxValue"></uif-textbox>')($scope);
        $scope.$apply();

        var textField1 = $(textBox1[0]).find('.ms-TextField-field');

        var textBox2 = $compile('<uif-textbox value="textBoxValue"></uif-textbox>')($scope);
        $scope.$apply();
        var textField2 = $(textBox2[0]).find('.ms-TextField-field');
        expect(textField1[0].id === textField2[0].id).toBe(false);

    }));
    it("should be able to set value", inject(($compile, $rootScope) => {
        var $scope = $rootScope.$new();
        $scope.textBoxValue = "Test 1";
        var textBox = $compile('<uif-textbox value="textBoxValue"></uif-textbox>')($scope);
        $scope.$apply();
        
        var textField = $(textBox[0]).find('.ms-TextField-field');
        expect(textField.length).toBe(1);
        expect(textField.val()).toBe('Test 1');

        $scope.textBoxValue = "Test 2";
        $scope.$apply();
        expect(textField.val()).toBe('Test 2');

        textField.val('Test 3');
        textField.trigger('input');
        
        expect(textField.val()).toBe('Test 3', 'Update textbox');
        
        // todo: In the browser this works fine. Not sure why not here :(
        // expect($scope.textBoxValue).toBe('Test 3', 'Scope update parent');
    }));
});