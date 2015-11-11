describe("personaDirective", () => {
    beforeEach(() => {
        angular.mock.module('fabric.ui.components.persona');
    });

    afterEach(() => {
        // myfunc.reset();
    });

    it("should be able to set labels", inject(($compile, $rootScope) => {
        var $scope = $rootScope.$new();

        $scope.p = {
            primary: 'this is primary text',
            secondary: 'this is secondary text',
            tertiary: 'this is tertiary text',
            optional: '01:02:03',
            image: '/images/hello.jpg'
        };

        var persona = $compile('<uif-persona primary="{{p.primary}}" secondary="{{p.secondary}}" tertiary="{{p.tertiary}}" optional="{{p.optional}}" image="{{p.image}}"></uif-persona>')($scope);
        $scope.$apply();

        var primary = $(persona[0]).find('.ms-Persona-primaryText');
        var secondary = $(persona[0]).find('.ms-Persona-secondaryText');
        var tertiary = $(persona[0]).find('.ms-Persona-tertiaryText');
        var optional = $(persona[0]).find('.ms-Persona-optionalText');

        expect(primary.html()).toBe($scope.p.primary);
        expect(secondary.html()).toBe($scope.p.secondary);
        expect(tertiary.html()).toBe($scope.p.tertiary);
        expect(optional.html()).toBe($scope.p.optional);
    }));

});
