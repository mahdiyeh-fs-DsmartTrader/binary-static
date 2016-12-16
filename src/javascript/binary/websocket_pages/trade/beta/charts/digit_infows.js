var Symbols = require('../../symbols').Symbols;
var MenuContent = require('../../../../base/menu_content').MenuContent;
var template = require('../../../../base/utility').template;
var text = require('../../../../base/localize').text;
require('../../../../../lib/highstock/highstock.js');
require('../../../../../lib/highstock/highstock-exporting.js');
require('../../../../../lib/highstock/export-csv.js');

var DigitInfoWS_Beta = function() {
    this.chart_config = {
        chart: {
            renderTo           : 'last_digit_histo',
            defaultSeriesType  : 'column',
            backgroundColor    : '#eee',
            borderWidth        : 1,
            borderColor        : '#ccc',
            plotBackgroundColor: '#fff',
            plotBorderWidth    : 1,
            plotBorderColor    : '#ccc',
            height             : 250, // This is "unresponsive", but so is leaving it empty where it goes to 400px.
        },
        title    : { text: '' },
        credits  : { enabled: false },
        exporting: { enabled: false },
        legend   : {
            enabled: false,
        },
        tooltip: {
            borderWidth: 1,
            formatter  : function() {
                var that       = this,
                    total      = $("select[name='tick_count']").val(),
                    percentage = (that.y / total) * 100;
                return '<b>Digit:</b> ' + that.x + '<br/>' +
                       '<b>Percentage:</b> ' + percentage.toFixed(1) + ' %';
            },
        },
        plotOptions: {
            column: {
                shadow      : false,
                borderWidth : 0.5,
                borderColor : '#666',
                pointPadding: 0,
                groupPadding: 0.0,
                color       : '#e1f0fb',
            },
            series: {
                dataLabels: {
                    enabled     : true,
                    allowOverlap: true,
                    style       : {
                        textShadow: false,
                        fontSize  : '10px',
                    },
                    formatter: function() {
                        var total = $("select[name='tick_count']").val();
                        var percentage = (this.point.y / total) * 100;
                        return percentage.toFixed(2) + ' %';
                    },
                },
            },
        },
        xAxis: {
            categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            lineWidth : 0,
            lineColor : '#999',
            tickLength: 10,
            tickColor : '#ccc',
        },
        yAxis: {
            title        : { text: '' },
            maxPadding   : 0,
            gridLineColor: '#e9e9e9',
            tickWidth    : 1,
            tickLength   : 3,
            tickColor    : '#ccc',
            lineColor    : '#ccc',
            endOnTick    : true,
            opposite     : false,

            labels: {
                align    : 'left',
                x        : 0,
                enabled  : false,
                formatter: function() {
                    var total = $("select[name='tick_count']").val(),
                        percentage = parseInt((this.value / total) * 100);
                    return percentage + ' %';
                },
            },
        },
    };

    this.spots = [];
    this.stream_id = null;
    // To avoid too many greens and reds
    this.prev_min_index = -1;
    this.prev_max_index = -1;
};

DigitInfoWS_Beta.prototype = {
    add_content: function(underlying) {
        var domain = document.domain.split('.').slice(-2).join('.'),
            underlyings = [];
        var symbols = Symbols.getAllSymbols();
        Object.keys(symbols).forEach(function(key) {
            if (/^(R_|RD)/.test(key)) {
                underlyings.push(key);
            }
        });
        underlyings = underlyings.sort();
        var elem = '<select class="smallfont" name="underlying">';
        for (var i = 0; i < underlyings.length; i++) {
            elem = elem + '<option value="' + underlyings[i] + '">' + text.localize(symbols[underlyings[i]]) + '</option>';
        }
        elem += '</select>';
        var contentId = document.getElementById('tab_last_digit-content'),
            content = '<div class="gr-parent">' +
                        '<div id="last_digit_histo_form" class="gr-12 gr-12-m gr-centered">' +
                        '<form class="smallfont gr-row" action="#" method="post">' +
                        '<div class="gr-6 gr-12-m center-text"><div class="gr-padding-10">' + text.localize('Select market') + ':</div>' + elem + ' </div>' +
                        '<div class="gr-6 gr-12-m center-text"><div class="gr-padding-10">' + text.localize('Number of ticks') + ':</div><select class="smallfont" name="tick_count"><option value="25">25</option><option value="50">50</option><option selected="selected" value="100">100</option><option value="500">500</option><option value="1000">1000</option></select></div>' +
                        '</form>' +
                        '</div>' +
                        '<div id="last_digit_histo" class="gr-12 gr-12-m gr-centered"></div>' +
                        '<div id="last_digit_title" class="gr-hide">' + (domain.charAt(0).toUpperCase() + domain.slice(1)) + ' - ' + text.localize('Last digit stats for the latest [_1] ticks on [_2]') + '</div>' +
                        '</div>';
        contentId.innerHTML = content;
        $('[name=underlying]').val(underlying);
    },
    on_latest: function() {
        var that = this;
        var tab = $('#tab_last_digit-content');
        var form = tab.find('form:first');
        form.on('submit', function(event) {
            event.preventDefault();
            return false;
        }).addClass('unbind_later');

        var get_latest = function() {
            var symbol = $('[name=underlying] option:selected').val();
            var request = {
                ticks_history: symbol,
                end          : 'latest',
                count        : $('[name=tick_count]', form).val(),
                req_id       : 2 };
            if (that.chart.series[0].name !== symbol) {
                if ($('#underlying option:selected').val() !== $('[name=underlying]', form).val()) {
                    request.subscribe = 1;
                    request.style = 'ticks';
                }
                if (that.stream_id !== null) {
                    BinarySocket.send({ forget: that.stream_id });
                    that.stream_id = null;
                }
            }
            BinarySocket.send(request);
        };
        $('[name=underlying]', form).on('change', get_latest).addClass('unbind_later');
        $('[name=tick_count]', form).on('change', get_latest).addClass('unbind_later');
    },
    show_chart: function(underlying, spots) {
        if (typeof spots === 'undefined' || spots.length <= 0) {
            console.log('Unexpected error occured in the charts.');
            return;
        }
        var dec = spots[0].split('.')[1].length;
        for (var i = 0; i < spots.length; i++) {
            var val = parseFloat(spots[i]).toFixed(dec);
            spots[i] = val.substr(val.length - 1);
        }
        this.spots = spots;
        if (this.chart && $('#last_digit_histo').html()) {
            this.chart.xAxis[0].update({ title: get_title() }, true);
            this.chart.series[0].name = underlying;
        } else {
            this.add_content(underlying); // this creates #last_digit_title
            this.chart_config.xAxis.title = get_title();
            this.chart = new Highcharts.Chart(this.chart_config);
            this.chart.addSeries({ name: underlying, data: [] });
            this.on_latest();
            this.stream_id = null;
        }
        this.update();

        function get_title() {
            return {
                text: template($('#last_digit_title').html(), [spots.length, $('[name=underlying] option:selected').text()]),
            };
        }
    },
    update: function(symbol, latest_spot) {
        if (typeof this.chart === 'undefined') {
            return null;
        }

        var series = this.chart.series[0]; // Where we put the final data.
        if (series.name !== symbol) {
            latest_spot = undefined; // This simplifies the logic a bit later.
        }

        if (typeof latest_spot !== 'undefined') { // This is a bit later. :D
            this.spots.unshift(latest_spot.slice(-1)); // Only last digit matters
            this.spots.pop();
        }

        // Always recompute and draw, even if theres no new data.
        // This is especially useful on first reuqest, but maybe in other ways.
        var filtered_spots = [],
            digit = 10,
            filterFunc = function (el) { return +el === digit; },
            min_max_counter = [];
        while (digit--) {
            var val = this.spots.filter(filterFunc).length;
            filtered_spots[digit] = val;
            if (typeof min_max_counter[val] === 'undefined') {
                min_max_counter[val] = 0;
            }
            min_max_counter[val]++;
        }
        var min = Math.min.apply(null, filtered_spots);
        var max = Math.max.apply(null, filtered_spots);
        var min_index = filtered_spots.indexOf(min);
        var max_index = filtered_spots.indexOf(max);
        // changing color
        if (min_max_counter[min] >= 1) {
            filtered_spots[min_index] = { y: min, color: '#CC0000' };
            if (this.prev_min_index === -1) {
                this.prev_min_index = min_index;
            } else if (this.prev_min_index !== min_index) {
                if (typeof filtered_spots[this.prev_min_index] === 'object') {
                    filtered_spots[this.prev_min_index] = { y: filtered_spots[this.prev_min_index].y, color: '#e1f0fb' };
                } else {
                    filtered_spots[this.prev_min_index] = { y: filtered_spots[this.prev_min_index], color: '#e1f0fb' };
                }
                this.prev_min_index = min_index;
            }
        }

        if (min_max_counter[max] >= 1) {
            filtered_spots[max_index] = { y: max, color: '#2E8836' };
            if (this.prev_max_index === -1) {
                this.prev_max_index = max_index;
            } else if (this.prev_max_index !== max_index) {
                if (typeof filtered_spots[this.prev_max_index] === 'object') {
                    filtered_spots[this.prev_max_index] = { y: filtered_spots[this.prev_max_index].y, color: '#e1f0fb' };
                } else {
                    filtered_spots[this.prev_max_index] = { y: filtered_spots[this.prev_max_index], color: '#e1f0fb' };
                }
                this.prev_max_index = max_index;
            }
        }
        return series.setData(filtered_spots);
    },
    show_tab: function() {
        var tab_last_digit = $('#tab_last_digit');
        MenuContent.show_tab(tab_last_digit);
        var saved_anaysis_tab = SessionStore.get('bet_page.selected_analysis_tab');
        if (saved_anaysis_tab === 'tab_last_digit') {
            MenuContent.trigger({
                tab_id: saved_anaysis_tab,
            });
        }
    },
    hide_tab: function() {
        var tab_last_digit = $('#tab_last_digit');
        MenuContent.hide_tab(tab_last_digit);
        if (typeof this.chart !== 'undefined') {
            this.chart.destroy();
        }
        this.chart = undefined;
        this.spots = [];
    },
    update_chart: function(tick) {
        if (tick.req_id === 2) {
            if (this.chart.series[0].name === tick.tick.symbol) {
                this.stream_id = tick.tick.id || null;
                this.update(tick.tick.symbol, tick.tick.quote);
            } else {
                BinarySocket.send({ forget: tick.tick.id + '' });
            }
        } else if (!this.stream_id) {
            this.update(tick.tick.symbol, tick.tick.quote);
        }
    },
};

module.exports = {
    DigitInfoWS_Beta: DigitInfoWS_Beta,
};
