(function($) {
    'use strict';

    var jModal = {};

    jModal = (function() {

        function jModal(element, settings) {
            var _ = this, dataSettings;

            _.defaults = {
                title : null,
                target : null,
                closeBtn : '.jModal-close',
                closeOnClick : true
            };

            _.$plugin = $(element);

            dataSettings = $(element).data('plugin') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.init(true);
        }

        return jModal;

    }());

    jModal.prototype.dialog = function(element, container) {

        var _ = this,
            content = '',
            button = _.$plugin.find('.modal-button').html();

        if(!_.options.target) {
            content = _.$plugin.find('.modal-content').html();
        } else {
            content = $(_.options.target).html();
        }

        container = '';
        container += '<div class="jModal fade">';
        container += '<div class="jModal-dialog">';
        container += '<div class="jModal-content">';
        // header
        container += '<div class="jModal-header">';
        container += '<button type="button" class="close jModal-close" data-dismiss="modal" aria-hidden="true">×</button>';
        container += '</div>';
        // content
        if(content) {
            container += '<div class="jModal-body">' + content + '</div>';
        }
        // button
        if(button) {
            container += '<div class="jModal-footer">' + button + '</div>';
        }
        container += '<div class="jModal-backdrop">';
        container += '</div></div></div></div>';

        $('body').append(container);

    };

    jModal.prototype.header = function(element) {

        var _ = this,
            header = '';

        header += '<h4 class="jModal-title">';

        if(_.options.title) {
            header +=  _.options.title;
        } else {
            header += '&nbsp;'
        }

        header += '</h4>';

        $('.jModal-header').append(header);

    };

    jModal.prototype.build = function(element) {

        var _ = this;

        _.dialog();

        if(_.options.closeOnClick == true) {
            $('.jModal-backdrop').addClass('jModal-close');
        }

        _.header();
        _.modalClose();

        $('.jModal').css('display', 'block').addClass('in');

    };

    jModal.prototype.handler = function(element) {

        var _ = this;

        _.$plugin.on('click', function() {
            $('.jModal').remove();
            _.build();
        });
    };

    jModal.prototype.modalClose = function() {

        var _ = this;

        $(_.options.closeBtn).on('click', function() {
            $('.jModal, .jModal-backdrop').remove();
        });

    };

    jModal.prototype.init = function() {

        var _ = this;

        _.handler();
        _.modalClose();

    };

    $.fn.jModal = function() {

        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].plugin = new jModal(_[i], opt);
            else
                ret = _[i].plugin[opt].apply(_[i].plugin, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;

    };

})(jQuery);

var modals = $('.modal'),
    totalModals = modals.length;

if (modals.length) {
    for (var i = 0; i < totalModals; i++) {
        modal = $(modals[i]);

        modal.jModal ({
            title : modal.data("title"),
            target : modal.data("target"),
            closeOnClick : modal.data("close")
        });

    }
}
