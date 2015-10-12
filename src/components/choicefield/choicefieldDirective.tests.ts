﻿describe("choicefieldDirective", () => {
    beforeEach(() => {
        angular.mock.module('fabric.ui.components.choicefield');
    });

    afterEach(() => {
        // myfunc.reset();
    });

    it("should have unique ids", inject(($compile, $rootScope) => {
        var $scope = $rootScope.$new();
        $scope["value"] = "test";
        var choiceField1 = $compile(
            '<uif-choicefield-group ng-model="value">' +
            '<uif-choicefield value="Test1"><a href="#">Test 1</a></uif-choicefield>' +
            '<uif-choicefield value="Test2"><a href="#">Test 2</a></uif-choicefield>' +
            '<uif-choicefield value="Test3"><a href="#">Test 3</a></uif-choicefield>' +
            '</uif-choicefield-group>'
        )($scope);
        $scope.$digest();
        
        var input1 = $(choiceField1[0]).find('.ms-ChoiceField-input');
        var id1 = input1[0].id;
        
        var choiceField2 = $compile(
            '<uif-choicefield-group ng-model="value">' +
            '<uif-choicefield value="Test1"><a href="#">Test 1</a></uif-choicefield>' +
            '<uif-choicefield value="Test2"><a href="#">Test 2</a></uif-choicefield>' +
            '<uif-choicefield value="Test3"><a href="#">Test 3</a></uif-choicefield>' +
            '</uif-choicefield-group>'
        )($scope);
        $scope.$digest();

        var input2 = $(choiceField2[0]).find('.ms-ChoiceField-input');
        var id2 = input2[0].id;
        
        expect(id1 === id2).toBe(false);

    }));
    it("should be able to set value", inject(($compile, $rootScope) => {
        
        var $scope = $rootScope.$new();
        $scope.value = "Test1";
        var choiceField = $compile(
            '<uif-choicefield-group ng-model="value">' +
            '<uif-choicefield value="Test1"><a href="#">Test 1</a></uif-choicefield>' +
            '<uif-choicefield value="Test2"><a href="#">Test 2</a></uif-choicefield>' +
            '<uif-choicefield value="Test3"><a href="#">Test 3</a></uif-choicefield>' +
            '</uif-choicefield-group>'
        )($scope);
        $scope.$digest();
        var inputs = $(choiceField[0]).find('.ms-ChoiceField-input');
        var input = $(inputs[0]);
        expect(input.prop("checked")).toBe(true);

        $scope.value = "Test2";
        $scope.$digest();

        expect(input.prop("checked")).toBe(false);
        

    }));

    it("should be able to set HTML as the label", inject(($compile, $rootScope) => {
        
        var $scope = $rootScope.$new();
        $scope.checked = true;
        var choiceField = $compile(
            '<uif-choicefield-group ng-model="value">' +
            '<uif-choicefield value="Test1"><a href="#">Test 1</a></uif-choicefield>' +
            '<uif-choicefield value="Test2"><a href="#">Test 2</a></uif-choicefield>' +
            '<uif-choicefield value="Test3"><a href="#">Test 3</a></uif-choicefield>' +
            '</uif-choicefield-group>'
        )($scope);
        $scope.$digest();
        var labels = $(choiceField[0]).find('.ms-Label a');
        var label = $(labels[2]);
        expect(label.html()).toBe("Test 3");
        
    }));
});