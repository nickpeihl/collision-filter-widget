define([
    'dojo/text!./templates/FilterSeverity.html',

    'dojo/_base/declare',

    'app/FilterCriteria'
], function(
    template,

    declare,

    FilterCriteria
) {
    return declare([FilterCriteria], {
        // description:
        //    Filter data based on crash severity

        templateString: template,
        baseClass: 'filter-severity',

        // Properties to be sent into constructor
        dataName: 'severity',

        postCreate: function() {
            // summary:
            //    Overrides method of same name in dijit._Widget.
            // tags:
            //    private
            console.log('src.app.FilterSeverity::postCreate', arguments);

            this.inherited(arguments);
        }
    });
});
