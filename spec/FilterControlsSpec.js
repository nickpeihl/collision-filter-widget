define([
    'app/config',
    'app/FilterControls',

    'dojo/dom-construct',
    'dojo/Stateful',
    'dojo/topic'    
], function(
    config,
    WidgetUnderTest,

    domConstruct,
    Stateful,
    topic
) {
    describe('FilterControls', function() {
        var widget;
        var destroy = function (widget) {
            if (widget && widget.destroyRecursive) {
                widget.destroyRecursive();
                widget = null;
            }
        };

        beforeEach(function() {
            widget = new WidgetUnderTest(null, domConstruct.create('div', null, document.body));
        });

        afterEach(function() {
            destroy(widget);
        });

        describe('Sanity', function() {
            it('should create a FilterControls', function() {
                expect(widget).toEqual(jasmine.any(WidgetUnderTest));
            });
        });
        describe('should build definition queries', function() {
            it('returns empty if no criteria', function() {
                var actual = widget._buildDefinitionQueryFromObject({});
                expect(actual).toEqual('');
            });
            describe('island criteria', function() {
                it('creates definition query for one island', function() {
                    var criteria = {
                        islands: ['Orcas']
                    };

                    var actual = widget._buildDefinitionQueryFromObject(criteria);
                    expect(actual).toEqual('Island IN (\'Orcas\')');
                });
                it('creates definition query for multiple islands', function() {
                    var criteria = {
                        islands: ['San Juan','Orcas']
                    };

                    var actual = widget._buildDefinitionQueryFromObject(criteria);
                    expect(actual).toEqual('Island IN (\'San Juan\',\'Orcas\')');
                });
            });
            describe('collision type criteria', function() {
                it('creates definition query for one collision type', function() {
                    var criteria = {
                        severity: ['1']
                    };

                    var actual = widget._buildDefinitionQueryFromObject(criteria);
                    expect(actual).toEqual('Sev_ IN (\'1\')');
                });
                it('creates definition query for multiple collision types', function(){
                    var criteria = {
                        severity: ['1','3']
                    };

                    var actual = widget._buildDefinitionQueryFromObject(criteria);
                    expect(actual).toEqual('Sev_ IN (\'1\',\'3\')');
                });
            });
            describe('multiple columns of criteria', function() {
                it('creates definition query for multiple columns of single type', function() {
                    var criteria = {
                        islands: ['Orcas'],
                        severity: ['3']
                    };

                    var actual = widget._buildDefinitionQueryFromObject(criteria);
                    expect(actual).toEqual('Island IN (\'Orcas\') AND Sev_ IN (\'3\')');
                });
                it('creates definition query for multiple columns of multiple types', function(){
                    var criteria = {
                        islands: ['Lopez', 'San Juan'],
                        severity: ['2','3']
                    };

                    var actual = widget._buildDefinitionQueryFromObject(criteria);
                    expect(actual).toEqual('Island IN (\'Lopez\',\'San Juan\') AND Sev_ IN (\'2\',\'3\')');
                });
            });
        });
        describe('Data gathering', function() {
            it('gathers data from the child widgets', function() {
                widget.childWidgets = [
                    new Stateful({
                        data: {
                            a: 1
                        }
                    }),
                    new Stateful({
                        data: {
                            b: 2
                        }
                    }),
                    new Stateful({
                        data: {
                            c: 3
                        }
                    })
                ];

                var actual = widget._getFilterCriteria();
                expect(actual).toEqual({
                    a: 1,
                    b: 2,
                    c: 3
                });
            });            
        });
        describe('filter topics', function(){
            var topicSpies, results;
            beforeEach(function(){
                widget.childWidgets = [
                    new Stateful({
                        data: {
                            a: 1
                        }
                    }),
                    new Stateful({
                        data: {
                            b: 2
                        }
                    }),
                    new Stateful({
                        data: {
                            c: 3
                        }
                    })
                ];

                topicSpies = {
                    filterCompleted: function(e){
                        results = e.arguments;
                    }
                };

                spyOn(topicSpies, 'filterCompleted');
                topic.subscribe(config.topics.search.filter, topicSpies.filterCompleted);
            });
            it('should publish a filter topic', function(){
                pending();
            });
        });
        describe('reset button', function(){
            it('should publish a reset topic', function(){
                pending();
            });
        });
    });
});
