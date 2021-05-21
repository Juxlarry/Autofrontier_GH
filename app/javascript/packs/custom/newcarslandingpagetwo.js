(this.__LOADABLE_LOADED_CHUNKS__=this.__LOADABLE_LOADED_CHUNKS__||[]).push([[3],{674:function(e,t,n){"use strict";var a,r,i,c,o,l;n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return l})),function(e){e.at_bikes="at_bikes",e.at_caravans="at_caravans",e.at_cars="at_cars",e.at_farm="at_farm",e.at_lease_new_car="at_lease_new_car",e.at_lease_virtual_car="at_lease_virtual_car",e.at_motorhomes="at_motorhomes",e.at_new_cars="at_new_cars",e.at_new_cars_migration="at_new_cars_migration",e.at_plants="at_plants",e.at_profile_bikes="at_profile_bikes",e.at_profile_caravans="at_profile_caravans",e.at_profile_cars="at_profile_cars",e.at_profile_motorhomes="at_profile_motorhomes",e.at_profile_vans="at_profile_vans",e.at_trucks="at_trucks",e.at_vans="at_vans"}(a||(a={})),function(e){e.advice="advice",e.bestOf="bestOf",e.expertReview="expertReview",e.feature="feature",e.firstDrive="firstDrive",e.guide="guide",e.iBoughtOne="iBoughtOne",e.longTermReview="longTermReview",e.news="news",e.securityAlert="securityAlert"}(r||(r={})),function(e){e.NEARLY_NEW="NEARLY_NEW",e.NEW="NEW",e.USED="USED",e.VIRTUAL="VIRTUAL"}(i||(i={})),function(e){e.exclude="exclude",e.include="include",e.only="only"}(c||(c={})),function(e){e.PROMOTED="PROMOTED",e.SPECIAL="SPECIAL"}(o||(o={})),function(e){e.bike="bike",e.car="car",e.caravan="caravan",e.crossover="crossover",e.farm="farm",e.motorhome="motorhome",e.plant="plant",e.truck="truck",e.van="van"}(l||(l={}))},675:function(e,t,n){"use strict";n.d(t,"a",(function(){return g}));var a=n(210),r=n(0),i=n.n(r),c=n(44),o=n(211),l=n(18),s=n(8),_=n(662),u=n(37);function v(){var e=Object(_.a)(["\n    query VehicleReviewSummaryQuery($vehicleType: VehicleType, $collectionId: String) {\n        content {\n            articleList(vehicleType: $vehicleType, type: expertReview, limit: 4, collectionId: $collectionId) {\n                articles {\n                    pageTitle\n                    summary\n                    strapLine\n                    seoIdentifier\n                    link\n                    images(limit: 1) {\n                        templated\n                        url\n                    }\n                    videoReference\n                    ... on ExpertReview {\n                        overallRating\n                        generation {\n                            review {\n                                ownerReviewsSummary {\n                                    aggregatedRating\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n        }\n    }\n"]);return v=function(){return e},e}var f=n.n(u)()(v()),m=n(660),p=n(664),g=function(e){var t,n=e.channel,r=e.collectionId,_=e.title,u=e.tagline,v=e.linkText,g=e.linkUrl,d=e.onInteraction,E=e.trackingData,h=Object(s.useTrackingContext)().fireTrackingEvent,w=Object(c.useQuery)(f,{variables:{vehicleType:n,collectionId:r}}),b=w.data,O=w.error,k=w.loading;if(O)return i.a.createElement(i.a.Fragment,null);if(k)return i.a.createElement(i.a.Fragment,null);var R=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return e.map((function(e){var t=e.images||[],n=Object(p.a)(t,1)[0];return Object(m.a)(Object(m.a)({},e),{},{strapline:e.strapLine,backgroundImage:n})}))}(((null===b||void 0===b||null===(t=b.content)||void 0===t?void 0:t.articleList)||{articles:[]}).articles);return i.a.createElement(o.h,{reviews:R,signpostProps:{text:v,url:g,onInteraction:function(){d&&d(),E&&h(E)},attributes:Object(a.a)({},l.dataAttrGUI,"see-more-reviews-signpost")},tagline:u,title:_})}}}]);