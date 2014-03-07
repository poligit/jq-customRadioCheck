/*
 * customRadioCheck: jQuery plguin for checkbox and radio replacement
 * Usage: $('input[type=checkbox], input[type=radio]').customRadioCheck();
 * Author: Cedric Ruiz
 * License: MIT
 */
;
(function () {
    $.fn.customRadioCheck = function () {

        return this.each(function () {

            var $this = $(this);
            var $span = $('<span/>');

            $span.addClass('custom-' + ($this.is(':checkbox') ? 'check' : 'radio'));
            $this.is(':checked') && $span.addClass('checked'); // init
            $span.insertAfter($this);


            if ($this.attr('disabled') && $this.attr('checked'))
                $span.addClass('disabled-checked');
            else if ($this.attr('disabled'))
                $span.addClass('disabled');


            $this.parent('label').addClass('custom-label').attr('onclick', ''); // Fix clicking label in iOS
            // hide by shifting left
            $this.css({ position: 'absolute', left: '-9999px' });

            // Events old style for jQuery 1.3.2
            $(this).change(function () {
                if ($this.is(':radio')) {
                    $this.parent().siblings('label').find('.custom-radio').removeClass('checked');
                }
                $span.toggleClass('checked', $this.is(':checked'));
            });

            $(this).focus(function () {
                $span.addClass('focus');
            });

            $(this).blur(function () {
                $span.removeClass('focus');
            });

            // Events with on() ab jQuery 1.7
            /*
            $this.on({
            change: function() {
            if ($this.is(':radio')) {
            $this.parent().siblings('label')
            .find('.custom-radio').removeClass('checked');
            }
            $span.toggleClass('checked', $this.is(':checked'));
            },
            focus: function() { $span.addClass('focus'); },
            blur: function() { $span.removeClass('focus'); }
            });
            */
        });
    };
}());

