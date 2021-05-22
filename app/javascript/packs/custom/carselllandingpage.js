(this.__LOADABLE_LOADED_CHUNKS__ = this.__LOADABLE_LOADED_CHUNKS__ || []).push([
    [10], {
        316: function (e, t, a) {
            "use strict";
            a.r(t), a.d(t, "CarsSellLandingPageContainer", (function () {
                return B
            }));
            var n = a(206),
                r = a(0),
                i = a.n(r),
                s = a(69),
                o = a(6),
                c = a(25),
                l = a(697),
                d = a(212),
                u = a(102),
                m = a(698),
                p = i.a.createElement(i.a.Fragment, null, i.a.createElement("path", {
                    d: "M37.692 29.5755L35.3265 35.433C34.128 38.283 31.437 40.29 28.3245 40.335L4.89001 40.341L9.23701 29.5755H37.692Z",
                    fill: "#313C53"
                }), i.a.createElement("path", {
                    d: "M43.8135 14.4195L20.379 14.4225C17.2665 14.469 14.577 16.4745 13.377 19.323L11.0115 25.1835H39.4665L43.8135 14.4195Z",
                    fill: "#FF4436"
                })),
                g = "/sell-my-car/images/static/RenaultGrandScenic@1x.png",
                h = "/sell-my-car/images/static/RenaultGrandScenic@1.5x.png",
                f = "/sell-my-car/images/static/RenaultGrandScenic@2x.png",
                v = "atds-value-proposition",
                y = {
                    additionalClass: "sell-car__value-proposition",
                    headline: "With Auto Trader, it's simple",
                    importCSS: !1,
                    animateMedia: !1,
                    staticMediaData: {
                        sm: g,
                        md: h,
                        lg: f,
                        title: ""
                    },
                    carouselData: [{
                        title: "Advertise to millions",
                        intro: "With the UK's largest audience of car buyers, it's highly likely someone is currently searching our website for the car that's sat on your driveway. If you have a popular model, it can sell within 24 hours!",
                        bgIMG: {
                            hex: "#222B5E",
                            img: ""
                        },
                        VehicleIMGComponent: function () {
                            return i.a.createElement("div", {
                                className: "".concat(v, "-media-bg__component")
                            }, i.a.createElement("p", {
                                className: "atds-type-cherokee ".concat(v, "-media-bg__component__title")
                            }, "51", i.a.createElement("br", null), i.a.createElement("span", null, "million")), i.a.createElement("p", {
                                className: "atds-type-toledo ".concat(v, "-media-bg__component__text")
                            }, "The number of cross-platform visits to our website each month**"))
                        },
                        vehicleIMG: {
                            sm: g,
                            md: h,
                            lg: f,
                            title: ""
                        }
                    }, {
                        title: "Free online valuation",
                        intro: "Our powerful valuation tool helps you to price your car competitively so you can make sure you're getting a fair price. We'll guide you through creating your advert and give helpful tips to make it stand out.",
                        bgIMG: {
                            hex: "#222B5E",
                            img: ""
                        },
                        VehicleIMGComponent: function () {
                            return i.a.createElement("div", {
                                className: "".concat(v, "-media-bg__component")
                            }, i.a.createElement(o.h, {
                                svgContent: p,
                                width: "48",
                                height: "54",
                                title: ""
                            }), i.a.createElement("p", {
                                className: "atds-type-phantom ".concat(v, "-media-bg__component__title ").concat(v, "-media-bg__component__title--blue")
                            }, "Used Car Valuations", i.a.createElement("br", null), "Provider of the Year"), i.a.createElement("p", {
                                className: "atds-type-fiesta ".concat(v, "-media-bg__component__text")
                            }, "As voted for by Car Dealer Power 2019"))
                        },
                        vehicleIMG: {
                            sm: g,
                            md: h,
                            lg: f,
                            title: ""
                        }
                    }]
                },
                b = (a(742), function (e) {
                    var t = e.button,
                        a = e.heading,
                        n = e.listCopy,
                        r = e.text,
                        s = e.imgSrc;
                    return i.a.createElement("div", {
                        className: "content-blocks-item"
                    }, s && i.a.createElement("div", {
                        className: "content-blocks-item__image"
                    }, i.a.createElement(o.e, {
                        src: s
                    })), i.a.createElement("section", {
                        className: "content-blocks-item__content"
                    }, i.a.createElement("h3", {
                        className: "atds-type-picanto content-blocks-item__heading"
                    }, a), i.a.createElement("p", {
                        className: "content-blocks-item__text"
                    }, r), i.a.createElement("div", {
                        className: "content-blocks-item__usps"
                    }, i.a.createElement(o.l, n)), i.a.createElement("div", {
                        className: "content-blocks-item__cta"
                    }, i.a.createElement(o.c, Object.assign({}, t, {
                        fullWidth: !0,
                        additionalClass: "content-block-item__cta"
                    })))))
                }),
                _ = function (e) {
                    var t = e.items;
                    return i.a.createElement("section", {
                        className: "atds-container atds-container--constrained content-blocks"
                    }, i.a.createElement("div", {
                        className: "content-blocks__items"
                    }, t.map((function (e, t) {
                        return i.a.createElement(b, Object.assign({
                            key: t
                        }, e))
                    }))))
                },
                E = a(680),
                w = a(121);

            function k() {
                var e = Object(E.a)(["\n    query FaqsQuery($path: String!) {\n        content {\n            faqs(path: $path) {\n                size\n                faqs {\n                    question\n                    answer\n                }\n            }\n        }\n    }\n"]);
                return k = function () {
                    return e
                }, e
            }
            var x = a.n(w)()(k()),
                N = a(153),
                A = function (e) {
                    var t = e.schema;
                    if (!t) return null;
                    var a = '<script type="application/ld+json">'.concat(JSON.stringify(t), "<\/script>");
                    return i.a.createElement("div", {
                        dangerouslySetInnerHTML: {
                            __html: a
                        }
                    })
                },
                C = a(9),
                O = (a(743), function (e) {
                    return {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: e.map((function (e) {
                            return {
                                "@type": "Question",
                                name: e.question,
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text: e.answer
                                }
                            }
                        }))
                    }
                }),
                j = function (e) {
                    var t = e.heading,
                        a = e.path,
                        r = Object(C.useTrackingContext)().fireTrackingEvent,
                        s = Object(N.useQuery)(x, {
                            variables: {
                                path: a
                            }
                        }),
                        o = s.data,
                        l = s.error,
                        d = s.loading;
                    return l || d ? i.a.createElement(i.a.Fragment, null) : i.a.createElement(i.a.Fragment, null, o && o.content.faqs && o.content.faqs.faqs && i.a.createElement("section", {
                        className: "atds-container atds-container--constrained"
                    }, i.a.createElement("header", {
                        className: "atds-section-title"
                    }, i.a.createElement("h2", {
                        className: "atds-type-phantom"
                    }, t)), i.a.createElement(A, {
                        schema: O(o.content.faqs.faqs)
                    }), i.a.createElement(c.b, {
                        items: o.content.faqs.faqs,
                        additionalClass: "faqs-list",
                        onInteraction: function (e) {
                            var t = e.rowIndex,
                                a = e.isExpanded;
                            r({
                                label: "seo faq ".concat(t, " ").concat(a ? "expand" : "collapse")
                            })
                        },
                        attributes: Object(n.a)({}, u.dataAttrGUI, "sell-car-faqs")
                    })))
                },
                I = a(729),
                S = a(719),
                T = (a(744), function (e) {
                    var t = e.channel,
                        a = Object(N.useQuery)(S.a, {
                            variables: {
                                channel: t
                            }
                        }),
                        r = a.data,
                        o = a.error,
                        c = a.loading;
                    return o || c ? i.a.createElement(i.a.Fragment, null) : i.a.createElement(i.a.Fragment, null, r && r.consumerReviews.feedback.trustpilot && r.consumerReviews.feedback.trustpilot.reviews && i.a.createElement(d.d, {
                        title: "",
                        content: r.consumerReviews.feedback.trustpilot.reviews,
                        signpostData: {
                            text: "Read more Trust Pilot reviews",
                            url: "https://uk.trustpilot.com/review/www.autotrader.co.uk",
                            attributes: {
                                target: "_blank"
                            },
                            onInteraction: function () {
                                Object(s.trackEvent)({
                                    label: "read trustpilot reviews"
                                })
                            }
                        },
                        attributes: Object(n.a)({}, u.dataAttrGUI, "trustpilot-reviews")
                    }))
                }),
                q = a(207),
                G = {
                    text: "See advertising prices",
                    url: "/sell-my-car/advertising-prices",
                    additionalClass: "atds-hero__prices",
                    attributes: Object(n.a)({}, u.dataAttrGUI, "advertising-prices")
                },
                L = [{
                    heading: "Take great photos",
                    text: "It may sound obvious - but taking good-quality photos can have a huge impact on the time it takes to sell your car. Adverts with good photos sell 3x faster",
                    imgSrc: "/sell-my-car/images/static/take-great-photos.svg"
                }, {
                    heading: "Keep it snappy",
                    text: "Keep your vehicle description short and simple. Call out optional extras that other similar cars may not have. And don't forget to mention full-service history if you have it.",
                    imgSrc: "/sell-my-car/images/static/keep-it-snappy.svg"
                }, {
                    heading: "Be honest",
                    text: "It's important that your vehicle description is accurate. If your car has a small scratch on it - be honest about it. It'll save time with needless viewings if buyers are aware of any faults from the get-go.",
                    imgSrc: "/sell-my-car/images/static/be-honest.svg"
                }],
                D = [{
                    heading: "Preparing your car",
                    text: "From keeping it clean to sorting repairs, here's how to get your car ready for sale.",
                    imgSrc: "/sell-my-car/images/static/preparing-your-car.svg",
                    url: "/sell-my-car/advice/getting-your-car-ready-to-sell",
                    attributes: Object(n.a)({}, u.dataAttrGUI, "guides-prep-car")
                }, {
                    heading: "Creating your advert",
                    text: "Good-quality adverts lead to a fast sale. Read our tips to create an effective advert.",
                    imgSrc: "/sell-my-car/images/static/creating-your-advert.svg",
                    url: "/sell-my-car/advice/advertising-your-car",
                    attributes: Object(n.a)({}, u.dataAttrGUI, "guides-create-ad")
                }, {
                    heading: "Taking payment",
                    text: "Cash, bank transfer, cheque? Learn the best way to accept payment and keep yourself secure.",
                    imgSrc: "/sell-my-car/images/static/taking-payment.svg",
                    url: "/sell-my-car/advice/selling-a-car-receiving-payment",
                    attributes: Object(n.a)({}, u.dataAttrGUI, "guides-payment")
                }, {
                    heading: "Avoiding scams",
                    text: "Learn how to stay safe online and protect yourself from fraud.",
                    imgSrc: "/sell-my-car/images/static/avoiding-scams.svg",
                    url: "/safety_and_security_centre",
                    attributes: Object(n.a)({}, u.dataAttrGUI, "guides-avoid-scams")
                }],
                U = "Helping people sell cars since 1977",
                F = "From humble beginnings as a local classified magazine, to the UK\u2019s largest digital automotive marketplace \u2013 we\u2019ve helped millions of people sell their car with ease.",
                M = ["*Based on a survey of 5,949 people who have sold cars in the past two years, of which 2,734 people sold via Auto Trader or Webuyanycar.com which are the relevant channels for the purpose of this claim. Car buying sites are online providers of 'convenience car sales' methods who will provide an instant online quote for your vehicle and will purchase cars of any age, make or model, without the seller being required to advertise the vehicle through classified advertising channels.", "The difference between what each car was sold at and the actual valuation of the car at the time of sale is calculated by comparing the difference between the stated sold price of each car in the survey and the Auto Trader Guide Valuation for each car at the time of sale. The average difference is then calculated for each of (1) all cars in the survey sold via Auto Trader, and (2) all cars in the survey sold via Webuyanycar.com, and compared to produce the figure quoted. All sellers of cars up to 15 years old giving information required for Auto Trader Guide Valuation. Auto Trader's Guide Valuation is an award winning service providing an accurate reflection of the live retail market. Our valuations are based on over 1.9 million vehicles each day, including 90,000 vehicle updates and an average of 19,000 vehicles added or removed from Auto Trader. Coupled with data from circa 450,000 trade used car listings every day, as well as additional dealer forecourt and website data.", "**Google Analytics data, monthly average from April - Sept 2019"],
                R = {
                    items: [{
                        imgSrc: "/sell-my-car/images/static/icon-car-price-tag.svg",
                        heading: "Get an instant offer",
                        text: "Tell us more about your car to get an instant offer, valid for 7 days",
                        listCopy: {
                            content: [{
                                text: "Sell your car quickly for cash"
                            }, {
                                text: "Home collection"
                            }, {
                                text: "No haggling on your price"
                            }]
                        },
                        button: {
                            text: "Get your offer",
                            url: "/instant-offer",
                            attributes: {
                                "data-gui": "instant-offer"
                            },
                            trackingData: {
                                label: "instant-offer"
                            }
                        }
                    }, {
                        imgSrc: "/sell-my-car/images/static/keep-it-snappy.svg",
                        heading: "Place an advert on Auto Trader",
                        text: "3 simple steps to your advert online",
                        listCopy: {
                            content: [{
                                text: "Free, instant online valuation"
                            }, {
                                text: "Advertise to millions"
                            }, {
                                text: "Dedicated support team"
                            }]
                        },
                        button: {
                            text: "Create your advert",
                            url: "".concat(Object(q.a)(), "/find-car"),
                            attributes: {
                                "data-gui": "create-advert"
                            },
                            trackingData: {
                                label: "create your ad"
                            }
                        }
                    }]
                };
            a(745);
            var B = function () {
                return Object(r.useEffect)((function () {
                    ! function () {
                        var e = document.createElement("script");
                        e.type = "text/javascript", e.innerHTML = "var _vwo_code=function(){\nvar account_id=71793,\nsettings_tolerance=2000,\nlibrary_tolerance=2500,\nuse_existing_jquery=false,\nis_spa = 1,\n/* DO NOT EDIT BELOW THIS LINE */\nf=false,d=document;return{use_existing_jquery:function(){return use_existing_jquery;},library_tolerance:function(){return library_tolerance;},finish:function(){if(!f){f=true;var a=d.getElementById('_vis_opt_path_hides');if(a)a.parentNode.removeChild(a);}},finished:function(){return f;},load:function(a){var b=d.createElement('script');b.src=a;b.type='text/javascript';b.innerText;b.onerror=function(){_vwo_code.finish();};d.getElementsByTagName('head')[0].appendChild(b);},init:function(){settings_timer=setTimeout('_vwo_code.finish()',settings_tolerance);var a=d.createElement('style'),b='body{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;}',h=d.getElementsByTagName('head')[0];a.setAttribute('id','_vis_opt_path_hides');a.setAttribute('type','text/css');if(a.styleSheet)a.styleSheet.cssText=b;else a.appendChild(d.createTextNode(b));h.appendChild(a);this.load('//dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(d.URL)+'&f='+(+is_spa)+'&r='+Math.random());return settings_timer;}};}();_vwo_settings_timer=_vwo_code.init();", document.head.appendChild(e)
                    }()
                }), []), i.a.createElement("article", {
                    className: "sell-car-landing-page"
                }, i.a.createElement("header", {
                    className: "atds-masthead"
                }, i.a.createElement("h1", {
                    className: "atds-type-picanto atds-masthead__heading"
                }, "Sell your car"), i.a.createElement("h2", {
                    className: "atds-type-insignia atds-masthead__tagline"
                }, "You're", " in control, choose how you want to sell your car")), i.a.createElement(_, R), i.a.createElement("div", {
                    className: "atds-container sell-car-landing-page__signpost"
                }, i.a.createElement(o.j, Object.assign({}, G, {
                    onInteraction: function () {
                        Object(s.trackEvent)({
                            label: "advertising prices"
                        })
                    }
                }))), i.a.createElement("section", {
                    className: "atds-container atds-container--constrained sell-car__trustpilot-rating"
                }, i.a.createElement("header", {
                    className: "atds-section-title"
                }, i.a.createElement("h2", {
                    className: "atds-type-phantom"
                }, "Join thousands of happy sellers")), i.a.createElement(I.a, {
                    channel: "car",
                    trackingLabel: "view Trustpilot rating",
                    additionalClass: "atds-trustpilot--grouped"
                }), i.a.createElement(T, {
                    channel: "Car"
                })), i.a.createElement(l.a, Object.assign({}, y, {
                    attributes: Object(n.a)({}, u.dataAttrGUI, "sell-car-value-proposition"),
                    onInteraction: function (e) {
                        Object(s.trackEvent)({
                            label: "value proposition: slide ".concat(e, " triggered")
                        })
                    }
                })), i.a.createElement(d.a, {
                    title: "How to sell your car, fast",
                    content: L
                }), i.a.createElement(d.b, {
                    title: "Guides to selling your car",
                    content: D,
                    trackingData: {
                        label: "guides: selling"
                    }
                }), i.a.createElement(j, {
                    heading: "Your questions answered",
                    path: "sell-my-car"
                }), i.a.createElement(c.a, {
                    heading: U,
                    content: F
                }, i.a.createElement(I.a, {
                    channel: "car",
                    trackingLabel: "view Trustpilot rating about us"
                })), i.a.createElement(m.a, {
                    pageJourney: "sell_my_car_newsletter"
                }), i.a.createElement("div", {
                    className: "atds-container atds-container--constrained"
                }, M && M.length > 0 && M.map((function (e, t) {
                    return i.a.createElement("small", {
                        className: "atds-type-smart small-print",
                        key: t
                    }, e)
                }))))
            };
            t.default = B
        },
        719: function (e, t, a) {
            "use strict";
            a.d(t, "a", (function () {
                return s
            }));
            var n = a(680),
                r = a(121);

            function i() {
                var e = Object(n.a)(["\n    query TrustpilotQuery($channel: String!) {\n        consumerReviews {\n            feedback {\n                trustpilot(channel: $channel) {\n                    overall {\n                        count\n                        trustScore\n                        stars\n                        description\n                    }\n                    reviews {\n                        rating\n                        title\n                        rating\n                        body\n                        isVerified\n                        timePostedDisplayString\n                        reviewer {\n                            displayName\n                            displayLocation\n                        }\n                    }\n                }\n            }\n        }\n    }\n"]);
                return i = function () {
                    return e
                }, e
            }
            var s = a.n(r)()(i())
        },
        729: function (e, t, a) {
            "use strict";
            a.d(t, "a", (function () {
                return u
            }));
            var n = a(206),
                r = a(0),
                i = a.n(r),
                s = a(69),
                o = a(719),
                c = a(153),
                l = a(102),
                d = a(25),
                u = (a(730), function (e) {
                    var t = e.channel,
                        a = e.trackingLabel,
                        r = e.additionalClass,
                        u = void 0 === r ? "" : r,
                        m = Object(c.useQuery)(o.a, {
                            variables: {
                                channel: t
                            }
                        }),
                        p = m.data,
                        g = m.error,
                        h = m.loading;
                    return g || h ? i.a.createElement(i.a.Fragment, null) : i.a.createElement(i.a.Fragment, null, p && p.consumerReviews.feedback.trustpilot && i.a.createElement(d.i, {
                        score: p.consumerReviews.feedback.trustpilot.overall,
                        onInteraction: function () {
                            Object(s.trackEvent)({
                                label: a
                            })
                        },
                        additionalClass: u,
                        attributes: Object(n.a)({}, l.dataAttrGUI, "trustpilot-rating")
                    }))
                })
        },
        730: function (e, t, a) {},
        742: function (e, t, a) {},
        743: function (e, t, a) {},
        744: function (e, t, a) {},
        745: function (e, t, a) {}
    }
]);
//# sourceMappingURL=SellLandingPage.8618c40a.chunk.js.map