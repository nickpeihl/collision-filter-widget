define([
    'app/config',
    'dojo/text!./templates/FilterControls.html',

    'dojo/_base/array',
    'dojo/_base/declare',
    'dojo/_base/lang',    

    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/topic'
], function(
    config,
    template,

    array,
    declare,
    lang,

    _WidgetBase,
    _TemplatedMixin,
    topic
) {
    return declare([_WidgetBase, _TemplatedMixin], {
        // description:
        //    Filter controller for features in FeatureLayer

        templateString: template,
        baseClass: 'filter-controls',

        // Properties to be sent into constructor

        postCreate: function() {
            // summary:
            //    Overrides method of same name in dijit._Widget.
            // tags:
            //    private
            console.log('viewer.js.gis.dijit.FilterControls::postCreate', arguments);

            this.setupConnections();

            this.inherited(arguments);
        },
        setupConnections: function() {
            // summary:
            //    wire events, and such
            //
            console.log('viewer.js.gis.dijit.FilterControls::setupConnections', arguments);

        },
        filter: function() {
            // summary:
            //     gathers the filter criteria and sends the request
            //
            console.log('viewer.js.gis.dijit.FilterControls::filter', arguments);

            var ingredients = this._getFilterCriteria();
            var baked_goods = this._buildDefinitionQueryFromObject(ingredients);
            console.log(baked_goods);

            topic.publish(config.topics.search.filter, baked_goods);
        },
        reset: function() {
            // summary:
            //     resets the filters and definition query on feature layer
            //
            console.log('viewer.js.gis.dijit.FilterControls::reset', arguments);

            topic.publish(config.topics.search.filter, '');
            topic.publish(config.topics.search.reset, {});
        },
        _getFilterCriteria: function() {
            // summary:
            //    gets the filter criteria from the childWidgets array
            //
            console.log('viewer.js.gis.dijit.FilterControls::_getFilterCriteria', arguments);

            var criteria = {};

            array.forEach(this.childWidgets, function mixinCriteria(widget){
                lang.mixin(criteria, widget.get('data'));
            }, this);

            console.log(criteria);

            return criteria;
        },
        _buildDefinitionQueryFromObject: function(criteria){
            // summary:
            //    get the filter criteria and build a definition query
            //
            console.log('viewer.js.gis.dijit.FilterControls::_buildDefinitionQueryFromObject', arguments);

            var filters = [];

            if (criteria.islands) {
                var filter = this._formSqlInQueryFromArray(criteria.islands);
                filters.push("Island IN (" + filter + ")");
            }
            if (criteria.severity) {
                var filter = this._formSqlInQueryFromArray(criteria.severity);
                filters.push("Sev_ IN (" + filter + ")");
            }
            return filters.join(' AND ');
        },
        _formSqlInQueryFromArray: function(itemArray) {
            // summary:
            //     forma a SQL IN query from an array of strings
            //
            console.log('viewer.js.gis.dijit.FilterControls::_formSqlInQueryFromArray', arguments);

            var itemFilter = [];
            array.map(itemArray, function(item) {
                itemFilter.push("'" + item + "'");
            });
            return itemFilter;
        }
    });
});
