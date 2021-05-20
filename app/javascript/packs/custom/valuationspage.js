(this.__LOADABLE_LOADED_CHUNKS__ = this.__LOADABLE_LOADED_CHUNKS__ || []).push([
  [27],
  {
    355: function (e, a, t) {
      "use strict";
      t.r(a);
      var n = t(99),
        i = t(0),
        r = t.n(i),
        o = t(21),
        s = t(9),
        l = t(10),
        c = t(26),
        u = t(762),
        d = t(754),
        m = t(755),
        g =
          (t(829),
          function (e) {
            var a = e.title,
              t = e.description,
              i = e.data,
              s = e.imgSrc,
              l = e.shortName;
            return r.a.createElement(
              "div",
              { className: "factors-summary" },
              r.a.createElement(
                "div",
                { className: "factors-summary__highlight" },
                r.a.createElement(
                  "p",
                  {
                    className: "factors-summary__description atds-type-toledo",
                  },
                  t
                ),
                r.a.createElement(
                  "picture",
                  null,
                  r.a.createElement("source", {
                    srcSet: ""
                      .concat(s, "@2x.png 2x, ")
                      .concat(s, "@1.5x.png 1.5x"),
                  }),
                  r.a.createElement("img", {
                    className: "factors-summary__image",
                    src: "".concat(s, "@1x.png"),
                    alt: "",
                    loading: "lazy",
                    decoding: "async",
                  })
                )
              ),
              r.a.createElement(
                "h4",
                { className: "factors-summary__heading atds-type-insignia" },
                a
              ),
              r.a.createElement(c.b, {
                items: i,
                additionalClass: "factors-summary__accordion",
                attributes: Object(n.a)(
                  {},
                  o.dataAttrGUI,
                  "factors ".concat(l)
                ),
                trackingData: { label: "factors ".concat(l) },
              })
            );
          }),
        h = t(753),
        v =
          (t(830),
          function (e) {
            var a = e.label,
              t = e.variant,
              n = e.svgContent;
            return r.a.createElement(
              "div",
              { className: "key-spec-tag" },
              r.a.createElement(l.d, {
                name: t,
                size: "small",
                additionalClass: "".concat("key-spec-tag", "__icon"),
                svgContent: n,
              }),
              r.a.createElement(
                "span",
                {
                  className: "".concat(
                    "key-spec-tag",
                    "__label atds-type-prius"
                  ),
                },
                a
              )
            );
          }),
        p = t(757),
        f = t(249),
        y = t(123),
        L = t(5),
        C =
          (t(831),
          function (e) {
            var a = e.reg,
              t = void 0 === a ? "" : a,
              n = e.mileage,
              o = void 0 === n ? "" : n,
              s = e.wrapperClass,
              l = e.additionalClass,
              c = e.requiredFields,
              u = e.attributes,
              d = Object(L.conditionalClassList)("valuations-form", !!l && l),
              m = Object(i.useState)(t),
              g = Object(p.a)(m, 2),
              h = g[0],
              v = g[1],
              C = Object(i.useState)(o),
              w = Object(p.a)(C, 2),
              b = w[0],
              E = w[1],
              V = c && c.replace(" ", "").split(",");
            return r.a.createElement(
              "div",
              Object.assign({ className: s }, u),
              r.a.createElement(
                "form",
                {
                  className: d,
                  action: "/car-valuation/vrm-lookup",
                  method: "post",
                },
                r.a.createElement(
                  "div",
                  { className: "valuations-form__fields" },
                  r.a.createElement(y.a, {
                    id: "valuations-reg",
                    fieldType: "text",
                    name: "vrn",
                    label: "Registration",
                    required: !!(V && V.indexOf("vrn") >= 0),
                    attributes: {
                      value: h,
                      placeholder: "e.g. AB12 CDE",
                      maxLength: 9,
                      onChange: function (e) {
                        return v(e.target.value);
                      },
                    },
                  }),
                  r.a.createElement(y.a, {
                    id: "valuations-mileage",
                    fieldType: "number",
                    name: "mileage",
                    label: "Current mileage",
                    required: !!(V && V.indexOf("mileage") >= 0),
                    attributes: {
                      value: b,
                      placeholder: "e.g. 10000",
                      min: 0,
                      max: 999999,
                      onChange: function (e) {
                        return E(e.target.value);
                      },
                    },
                  }),
                  r.a.createElement(
                    "div",
                    { className: "valuations__btn-container atds-field" },
                    r.a.createElement(f.a, {
                      displayType: "primary",
                      type: "submit",
                      text: "Get a valuation",
                      trackingData: { label: "get instant offer initiation" },
                      additionalClass: "valuations-form__button",
                    })
                  )
                )
              )
            );
          }),
        w = [
          {
            question: "Modifications",
            answer:
              "Any post-factory features that you\u2019ve added to the car that make it stand out, e.g. alloy wheels, multimedia systems, etc.",
          },
          {
            question: "Full service history",
            answer:
              "A car with a complete record of all services can be worth more than one that has gaps in the service history.",
          },
          {
            question: "Desirable colour",
            answer:
              "Some colours are more popular than others, so a car in a sought-after colour can be worth more.",
          },
          {
            question: "No damage",
            answer:
              "Our valuations are based on the car being in good condition for its age \u2013 so it could have some minor wear and tear. If it\u2019s in an excellent condition with no damage at all, then it&apos;s likely to be worth more than our guide price.",
          },
        ],
        b = [
          {
            question: "Significant wear and tear",
            answer:
              "Our valuations assume the car has some minor damage, like a small stain on the seat or a scratch on the bumper. If the damage is any more significant than this, it&apos;s likely to reduce the value of the car.",
          },
          {
            question: "Parts not working",
            answer:
              "If anything needs fixing, e.g. a seat warmer or electric window that doesn&apos;t work, the car may be worth less.",
          },
          {
            question: "Lots of previous owners",
            answer:
              "Usually, the fewer owners the more a car is worth. So, if a car has been sold many times before it can reduce the value.",
          },
          {
            question: "Gaps in service history and/or no MOT",
            answer:
              "Our valuations assume a car is in good working order. If there isn&amp;t a current MOT, or significant gaps in the service records, it can reduce the value.",
          },
        ],
        E = {
          heading: "Free car valuations",
          tagline: "See how much your car is worth in seconds",
          benefits: [
            {
              heading: "If you\u2019re selling a car",
              text: 'We\u2019ll give you two valuations: the first will show how much you could get if you <a class="atds-link" href="/sell-my-car">sell your car privately</a>, the second will show how much you may be offered if you <a class="atds-link" href="/part-exchange">part exchange</a>. That way, you can compare your options and make an informed decision.',
              imgSrc: "/valuations/images/static/pictograms/selling-car.svg",
            },
            {
              heading: "If you\u2019re buying a car",
              text: "We'll give you a guide price as to what you can expect to pay if you bought from a dealer or a private seller. Our valuation will help you decide who to buy from, and if the vehicle\u2019s condition and features are worth what the seller is asking for.",
              imgSrc: "/valuations/images/static/pictograms/buying-car.svg",
            },
          ],
        },
        V = {
          heading: "Over 40 years of experience buying and selling cars",
          content:
            "We\u2019ve been helping people buy and sell cars since 1977. Over that time, we\u2019ve valued millions (maybe even billions!) of vehicles so you can trust us to give you a pretty good idea of what it\u2019s worth.",
        },
        _ = {
          airConditioning: r.a.createElement("path", {
            d: "M7.34219 -0.000244141V2.39876L5.61019 0.666756L4.66719 1.60876L7.34219 4.28576V6.83976L5.10619 5.54776L4.13219 1.91776L2.84519 2.26276L3.47319 4.60476L1.40919 3.41476L0.743193 4.56876L2.82019 5.76976L0.454193 6.40376L0.799193 7.69076L4.45419 6.71176L6.66619 7.98876L4.43019 9.28176L0.799193 8.30876L0.454193 9.59676L2.79719 10.2238L0.734193 11.4158L1.40019 12.5688L3.47819 11.3708L2.84519 13.7378L4.13219 14.0818L5.11119 10.4268L7.34219 9.13876V11.7148L4.66719 14.3908L5.61019 15.3328L7.34219 13.6008V15.9998H8.67619V13.6188L10.3902 15.3328L11.3332 14.3908L8.67619 11.7318V9.14876L10.8892 10.4278L11.8682 14.0818L13.1552 13.7378L12.5222 11.3708L14.6002 12.5688L15.2662 11.4158L13.2032 10.2238L15.5462 9.59676L15.2012 8.30876L11.5702 9.28176L9.33419 7.98876L11.5462 6.71176L15.2012 7.69076L15.5462 6.40376L13.1792 5.76976L15.2572 4.56876L14.5912 3.41476L12.5272 4.60476L13.1552 2.26276L11.8682 1.91776L10.8942 5.54776L8.67619 6.82976V4.26776L11.3332 1.60876L10.3902 0.666756L8.67619 2.38176V-0.000244141H7.34219Z",
          }),
          calendar: r.a.createElement("path", {
            fillRule: "evenodd",
            d: "M3.333 2.667V4H4.667V2.667H11.333V4H12.667V2.667H14.667V6H1.333V2.667H3.333ZM1.333 14.667H14.667V7.333H1.333V14.667ZM14.667 1.333H12.667V0H11.333V1.333H4.667V0H3.333V1.333H1.333C0.599 1.333 0 1.932 0 2.667V14.667C0 15.401 0.599 16 1.333 16H14.667C15.401 16 16 15.401 16 14.667V2.667C16 1.932 15.401 1.333 14.667 1.333Z",
            clipRule: "evenodd",
          }),
          fuel: r.a.createElement("path", {
            fillRule: "evenodd",
            d: "M3.99999 7.333H7.33299V6H3.99999V7.333ZM2.66699 14.667H8.66699V1.333H2.66699V14.667ZM15.138 2.195L12.942 0L12 0.942L14 2.942V12.667H12.667V7.333C12.667 6.599 12.068 6 11.333 6H9.99999V1.333C9.99999 0.599 9.40099 0 8.66699 0H2.66699C1.93199 0 1.33299 0.599 1.33299 1.333V14.667H0.666992V16H10.667V14.667H9.99999V7.333H11.333V12.667C11.333 13.401 11.932 14 12.667 14H14C14.735 14 15.333 13.401 15.333 12.667V2.667C15.333 2.482 15.259 2.315 15.138 2.195Z",
            clipRule: "evenodd",
          }),
          speedometer: r.a.createElement("path", {
            d: "M7.42294 7.66696L7.43194 7.67196C7.37494 7.77096 7.33294 7.87796 7.33294 7.99996C7.33294 8.36796 7.63194 8.66696 7.99994 8.66696C8.24594 8.66696 8.45294 8.52596 8.56894 8.32796L8.57694 8.33296L10.9109 4.29196L9.75594 3.62496L7.42294 7.66696ZM13.6572 2.34276C12.0952 0.780756 10.0472 -0.000244141 8.00024 -0.000244141C5.95324 -0.000244141 3.90524 0.780756 2.34324 2.34276C-0.780756 5.46776 -0.780756 10.5318 2.34324 13.6568C2.50224 13.8168 2.67024 13.9618 2.83824 14.1048L3.28624 13.6568L3.78024 13.1618L4.70024 12.2428L3.75724 11.2998L2.83924 12.2188C1.98624 11.1778 1.49724 9.93776 1.37124 8.66676H2.66724V7.33276H1.37124C1.49724 6.06276 1.98624 4.82176 2.83924 3.78076L3.75724 4.69976L4.70024 3.75676L3.78024 2.83776C4.79724 2.00376 6.02424 1.49476 7.33324 1.36576V2.66676H8.66724V1.36576C9.97524 1.49476 11.2032 2.00376 12.2202 2.83776L11.3002 3.75676L12.2432 4.69976L13.1612 3.78076C14.0132 4.82176 14.5032 6.06276 14.6292 7.33276H13.3332V8.66676H14.6292C14.5032 9.93776 14.0132 11.1778 13.1612 12.2188L12.2432 11.2998L11.3002 12.2428L12.2202 13.1618L12.7142 13.6568L13.1622 14.1048C13.3302 13.9618 13.4982 13.8168 13.6572 13.6568C16.7812 10.5318 16.7812 5.46776 13.6572 2.34276Z",
          }),
          wheel: r.a.createElement("path", {
            d: "M8 14.667C4.324 14.667 1.333 11.676 1.333 8C1.333 4.324 4.324 1.333 8 1.333C11.676 1.333 14.667 4.324 14.667 8C14.667 11.676 11.676 14.667 8 14.667ZM8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8C16 3.582 12.418 0 8 0ZM8.667 11.9395V9.8775C9.032 9.7475 9.347 9.5155 9.579 9.2135L11.542 9.8515C10.972 10.9385 9.917 11.7285 8.667 11.9395ZM4.458 9.8515L6.421 9.2135C6.653 9.5155 6.968 9.7475 7.333 9.8775V11.9395C6.083 11.7285 5.028 10.9385 4.458 9.8515ZM5.145 5.2045L6.354 6.8675C6.141 7.1755 6.016 7.5465 6.005 7.9475L4.048 8.5835C4.02 8.3925 4 8.1985 4 8.0005C4 6.9125 4.438 5.9255 5.145 5.2045ZM9.776 4.4205L8.563 6.0905C8.384 6.0375 8.197 6.0005 8 6.0005C7.803 6.0005 7.616 6.0375 7.437 6.0905L6.224 4.4205C6.76 4.1545 7.361 4.0005 8 4.0005C8.639 4.0005 9.24 4.1545 9.776 4.4205ZM12 8.0005C12 8.1985 11.98 8.3925 11.952 8.5835L9.995 7.9475C9.984 7.5465 9.859 7.1755 9.646 6.8675L10.855 5.2045C11.563 5.9255 12 6.9125 12 8.0005ZM8 2.6675C5.055 2.6675 2.667 5.0545 2.667 8.0005C2.667 10.9455 5.055 13.3335 8 13.3335C10.945 13.3335 13.333 10.9455 13.333 8.0005C13.333 5.0545 10.945 2.6675 8 2.6675Z",
          }),
        };
      t(832),
        (a.default = function () {
          var e = Object(s.useTrackingContext)().fireTrackingEvent;
          return r.a.createElement(
            "article",
            { className: "valuations-landing-page" },
            r.a.createElement(
              c.g,
              { additionalClass: "valuations-hero" },
              r.a.createElement(
                "div",
                { className: "valuations-hero-ctas" },
                E.heading &&
                  r.a.createElement(
                    "h1",
                    {
                      id: "fake-legend",
                      className:
                        "valuations-hero-ctas__title atds-type-picanto",
                    },
                    E.heading
                  ),
                E.tagline &&
                  r.a.createElement(
                    "p",
                    {
                      className:
                        "valuations-hero-ctas__tagline atds-type-insignia",
                    },
                    E.tagline
                  ),
                r.a.createElement(C, { requiredFields: "vrn, mileage" }),
                r.a.createElement(
                  l.g,
                  {
                    href: "/car-valuation/find-vehicle?content=make-model-lookup",
                    routerLink: !1,
                    attributes: Object(n.a)({}, o.dataAttrGUI, "unknown-reg"),
                    onInteraction: function () {
                      e({ label: "unknown reg" });
                    },
                  },
                  "I don't know the reg"
                )
              )
            ),
            r.a.createElement(
              u.b,
              {
                title: "Award-winning valuations you can trust",
                copy: "<p>Our valuations are powered by data from millions of vehicles each day, so you get an accurate price that reflects the current market. It\u2019s completely free and can be done online in minutes.</p> <p>They are 100% data-driven using a smart, innovative algorithm that considers numerous factors such as the vehicle\u2019s age, mileage, spec and optional extras. Awarded Used Car Valuations Provider of the Year in 2019, you can rely on us to give you an accurate valuation you can trust.</p>",
                additionalClass: "award-winning-valuations",
                image: "/valuations/images/static/ford-s-max",
              },
              r.a.createElement(
                "div",
                { className: "spec-tags" },
                r.a.createElement(v, {
                  label: "Make",
                  variant: "wheel",
                  svgContent: _.wheel,
                }),
                r.a.createElement(v, {
                  label: "Model",
                  variant: "wheel",
                  svgContent: _.wheel,
                }),
                r.a.createElement(v, {
                  label: "Mileage",
                  variant: "speedometer",
                  svgContent: _.speedometer,
                }),
                r.a.createElement(v, {
                  label: "Age",
                  variant: "calendar",
                  svgContent: _.calendar,
                }),
                r.a.createElement(v, {
                  label: "Optional extras",
                  variant: "air-conditioning",
                  svgContent: _.airConditioning,
                }),
                r.a.createElement(v, {
                  label: "Fuel type",
                  variant: "fuel",
                  svgContent: _.fuel,
                })
              )
            ),
            r.a.createElement(u.a, {
              title: "How our car valuations can help you",
              content: E.benefits,
            }),
            r.a.createElement(
              "div",
              { className: "atds-container atds-container--constrained" },
              r.a.createElement(
                "section",
                { className: "valuations-factors" },
                r.a.createElement(
                  "h2",
                  { className: "valuations-factors__title atds-type-phantom" },
                  "Factors that can affect a car\u2019s value"
                ),
                r.a.createElement(
                  "p",
                  {
                    className: "valuations-factors__sub-title atds-type-toledo",
                  },
                  r.a.createElement(
                    "span",
                    null,
                    "The following factors are not included in our valuations but can increase or \n                            decrease the car\u2019s value."
                  )
                ),
                r.a.createElement(g, {
                  title: "Things that can increase a car\u2019s value",
                  description:
                    "Adding post-factory features like alloy wheels can add to a vehicles' value",
                  data: w,
                  imgSrc: "/valuations/images/static/toyota-corolla-red",
                  shortName: "increase value",
                }),
                r.a.createElement(g, {
                  title: "Things that can decrease a car\u2019s value",
                  description:
                    "Vehicles with lots of past owners are likely to have lower\xa0valuations",
                  data: b,
                  imgSrc: "/valuations/images/static/toyota-corolla-blue",
                  shortName: "decrease value",
                })
              )
            ),
            r.a.createElement(u.b, {
              additionalClass: "improve-car-value",
              featureLayout: !0,
              title: "Improving your car\u2019s value",
              copy: "There are a few things you can do to help make sure you get the most money for your car. From doing minor repairs, to ensuring it\u2019s clean and tidy, a little effort can go a long way to avoid any haggling.",
              backgroundImage: "/valuations/images/static/car-wash.jpg",
              buttonText: "Getting ready to sell",
              url: "/content/advice/getting-your-car-ready-to-sell",
              attributes: Object(n.a)({}, o.dataAttrGUI, "improve-car-value"),
              onInteraction: function () {
                e({ label: "improve car value" });
              },
            }),
            r.a.createElement(d.a, {
              heading: "Your questions answered",
              path: "car-valuation",
              attributes: Object(n.a)({}, o.dataAttrGUI, "car-valuation-faqs"),
              trackingData: { label: "seo-faq car-valuation-faqs" },
            }),
            r.a.createElement(
              c.a,
              V,
              r.a.createElement(m.a, {
                channel: "car",
                handleEvent: function () {
                  e({ label: "view Trustpilot rating" });
                },
              })
            ),
            r.a.createElement(h.a, {
              pageJourney: "cars_valuation",
              additionalClass: "valuation-newsletter-signup",
            })
          );
        });
    },
    829: function (e, a, t) {},
    830: function (e, a, t) {},
    831: function (e, a, t) {},
    832: function (e, a, t) {},
  },
]);
//# sourceMappingURL=ValuationsPage.45f3fc89.chunk.js.map
