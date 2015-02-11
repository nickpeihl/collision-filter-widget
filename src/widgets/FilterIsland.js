define([
    'dojo/text!./templates/FilterIsland.html',

    'dojo/_base/declare',

    'widgets/FilterCriteria'
], function(
    template,

    declare,

    FilterCriteria
) {
    return declare([FilterCriteria], {
        // description:
        //    Filter data based on island

        templateString: template,
        baseClass: 'filter-criteria',

        // Properties to be sent into constructor
        dataName: 'islands',

        postCreate: function() {
            // summary:
            //    Overrides method of same name in dijit._Widget.
            // tags:
            //    private
            console.log('src.app.FilterIsland::postCreate', arguments);

            this.inherited(arguments);
        },
        _setData: function(ingredients) {
            // summary:
            //    sets the criteria object from the data
            //    ingredients

            this.set('data', {
                islands: ingredients
            });
        }
    });
});
