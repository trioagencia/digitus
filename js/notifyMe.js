/*
 notifyMe jQuery Plugin v1.0.0
 Copyright (c)2014 Sergey Serafimovich
 Licensed under The MIT License.
*/
(function(e) {
    e.fn.notifyMe = function(t) {
        var r = e(this);
        var i = e(this).find("input[name=email]");
        var s = e(this).attr("action");
        var o = e(this).find(".note");
        e(this).on("submit", function(t) {
            t.preventDefault();
            var h = i.val();
            var p = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (p.test(h)) {
                $(".message").removeClass("error bad-email success-full");
                $(".message").hide().html('').fadeIn();
                $(".fa-spinner").addClass("fa-spin").removeClass("opacity-0");
                o.show();
                e.ajax({
                    type: "POST",
                    url: s,
                    data: {
                        email: h
                    },
                    dataType: "json",
                    error: function(e) {
                        o.hide();
                        $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
                        $(".block-message").addClass("show-block-error").removeClass("show-block-valid");
                        if (e.status == 404) {
                            $(".message").html('<p class="notify-valid">O serviço não esta on-line no momento.<br>Por favor, verifique sua conesão com a internet e tente novamente.</p>').fadeIn();
                        } else {
                            $(".message").html('<p class="notify-valid">Oops. Alguma coisa esta errada.<br>Por favor, tente novamente mais tarde.</p>').fadeIn();
                        }
                    }
                }).done(function(e) {
                    o.hide();
                    if (e.status == "success") {
                        $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
                        $(".message").removeClass("bad-email").addClass("success-full");
                        $(".block-message").addClass("show-block-valid").removeClass("show-block-error");
                        $(".message").html('<p class="notify-valid">Parabéns! Você esta na lista.<br>Em breve entraremos em contato.</p>').fadeIn();
                    } else {
                        if (e.type == "ValidationError") {
                            $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
                            $(".message").html('<p class="notify-valid">Este e-mail parece fake ou inválido.<br>Por favor, entre com um e-mail válido.</p>').fadeIn();
                        } else {
                            $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
                            $(".message").html('<p class="notify-valid">Oops. Alguma coisa esta errada.<br>Por favor, tente novamente mais tarde.</p>').fadeIn();
                        }
                    }
                })
            } else {
                $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
                $(".message").addClass("bad-email").removeClass("success-full");
                $(".block-message").addClass("show-block-error").removeClass("show-block-valid");
                $(".message").html('<p class="notify-valid">Seu e-mail esta incorreto.<br>Por favor, verifique e tente novamente.</p>').fadeIn();
                o.hide();
            }

            // Reset and hide all messages on .keyup()
            $("#notifyMe input").keyup(function() {
                $(".block-message").addClass("").removeClass("show-block-valid show-block-error");
                $(".message").fadeOut();
            });
        })
    }

    

})(jQuery)