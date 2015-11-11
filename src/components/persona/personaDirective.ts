/*
Usage:
<uif-toggle labelOn="{string}" labelOff="{string}" desc="{string}" toggled="property" />

*/

class PersonaDirective implements ng.IDirective {

    template =
        '<div ng-class="classes">' +
            '<div class="ms-Persona-imageArea" ng-hide="isTiny">' +
                '<i class="ms-Persona-placeholder ms-Icon ms-Icon--person"></i>' +
                '<img class="ms-Persona-image" src="{{image}}" ng-show={{image}}>' +
            '</div>' +
           '<div class="ms-Persona-presence"></div>' +
              '<div class="ms-Persona-details">' +
                   '<div class="ms-Persona-primaryText">{{primary}}</div>' +
                   '<div class="ms-Persona-secondaryText">{{secondary}}</div>' +
                   '<div class="ms-Persona-tertiaryText">{{tertiary}}</div>' +
                   '<div class="ms-Persona-optionalText">{{optional}}</div>' +
               '</div>' +
           '</div>' +
       '</div>';

    constructor() {
    }

    restrict = 'E';
    uniqueId = 1;
    scope = {
        primary: '@',
        secondary: '@',
        tertiary: '@',
        optional: '@',
        image: '@'
    }

    link(scope, elem, attrs) {
        if (!this.uniqueId)
            this.uniqueId = 1;
        scope.uniqueId = this.uniqueId++;

        scope.classes = ['ms-Persona']

        if (attrs.hasOwnProperty('tiny'))  { scope.classes.push('ms-Persona--tiny'); scope.isTiny = true; }
        if (attrs.hasOwnProperty('extraSmall'))  { scope.classes.push('ms-Persona--xs'); }
        if (attrs.hasOwnProperty('small')) { scope.classes.push('ms-Persona--sm'); }
        if (attrs.hasOwnProperty('large')) { scope.classes.push('ms-Persona--lg'); }
        if (attrs.hasOwnProperty('extraLarge')) { scope.classes.push('ms-Persona--xl'); }

        if (attrs.hasOwnProperty('available'))  { scope.classes.push('ms-Persona--available'); }
        if (attrs.hasOwnProperty('away'))  { scope.classes.push('ms-Persona--away'); }
        if (attrs.hasOwnProperty('blocked')) { scope.classes.push('ms-Persona--blocked'); }
        if (attrs.hasOwnProperty('busy')) { scope.classes.push('ms-Persona--busy'); }
        if (attrs.hasOwnProperty('dnd')) { scope.classes.push('ms-Persona--dnd'); }
        if (attrs.hasOwnProperty('offline')) { scope.classes.push('ms-Persona--offline'); }

        if (attrs.hasOwnProperty('square')) { scope.classes.push('ms-Persona--square'); }
    }

    static factory(): ng.IDirectiveFactory {
        const directive = () => new PersonaDirective();

        return directive;
    }
}


angular.module("fabric.ui.components.persona", ['fabric.ui.components'])
    .directive("uifPersona", PersonaDirective.factory());
