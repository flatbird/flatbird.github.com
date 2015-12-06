// Ref - https://github.com/nickdesaulniers/where-is-firefox-os/
// Codes - http://jvectormap.com/maps/world/world/
var COUNTRIES = [
    { code: "es", name: "Spain", date: "2013/07/02", carrier: "Telefónica" },
    { code: "pl", name: "Poland", date: "2013/07/11", carrier: "Deutsche Telekom" },
    { code: "co", name: "Colombia", date: "2013/08/01", carrier: "Telefónica (Movistar)" },
    { code: "ve", name: "Venezuela", date: "2013/08/01", carrier: "Telefónica (Movistar)" },
    { code: "de", name: "Germany", date: "2013/10/15", carrier: "Deutsche Telekom (Congstar)" },
    { code: "br", name: "Brazil", date: "2013/10/22", carrier: "Telefónica (Vivo)" },
    { code: "mx", name: "Mexico", date: "2013/10/31", carrier: "Telefónica" },
    { code: "pe", name: "Peru", date: "2013/10/31", carrier: "Telefónica" },
    { code: "uy", name: "Uruguay", date: "2013/10/31", carrier: "Telefónica" },
    { code: "hu", name: "Hungary", date: "2013/11/13", carrier: "Telenor" },
    { code: "rs", name: "Serbia", date: "2013/11/13", carrier: "Telenor" },
    { code: "me", name: "Montenegro", date: "2013/11/13", carrier: "Telenor" },
    { code: "gr", name: "Greece", date: "2013/11/14", carrier: "Deutsche Telekom (COSMOTE)" }, 
    { code: "it", name: "Italy", date: "2013/12/06", carrier: "Telecom Italia" }, 
    { code: "cl", name: "Chile", date: "2014/02/20", carrier: "Telefónica (Movistar)" }, 
    // don't add the same country twice
    // { code: "mx", name: "Mexico", date: "2014/05/13", carrier: "América Móvil" },
    // from where-is-firefox-os - late July, https://blog.mozilla.org/press-fr/2014/07/17/firefox-os-debarque-en-france-et-continue-son-expansion-sur-dautres-appareils-et-marches/
    { code: "fr", name: "France", date: "2014/07/31", carrier: "E.Leclerc" }, 
    // from where-is-firefox-os - between 7/17 and 9/16, ALCATEL ONETOUCH Fire C, http://blog.mozilla.org/press-uk/2014/10/09/firefox-os-shows-continued-global-growth/
    { code: "mk", name: "Macedonia", date: "2014/08/14", carrier: "Deutsche Telekom" },
    { code: "sv", name: "El Salvador", date: "2014/08/15", carrier: "Telefónica (Movistar)" },
    // from where-is-firefox-os - between 7/17 and 9/16, ALCATEL ONETOUCH Fire E, http://blog.mozilla.org/press-uk/2014/10/09/firefox-os-shows-continued-global-growth/
    { code: "cz", name: "Czech Republic", date: "2014/08/21", carrier: "Deutsche Telekom" },
    // http://blog.mozilla.org/press/2014/08/firefox-os-arrives-in-panama/
    { code: "pa", name: "Panama", date: "2014/08/28", carrier: "Telefónica (Movistar)" },
    // https://blog.mozilla.org/press/2014/08/firefox-os-smartphones-change-the-mobile-landscape-across-india/
    { code: "in", name: "India", date: "2014/08/29", carrier: "Intex Technologies" },
    // http://blog.mozilla.org/press/2014/09/firefox-os-expands-throughout-central-america/
    { code: "ni", name: "Nicaragua", date: "2014/09/10", carrier: "Telefónica (Movistar)" },
    // Bangladesh, GoFox 15, 23 markets, as of  today http://blog.mozilla.org/press/2014/09/expanding-reach-in-asia-telenor-group-brings-firefox-os-smartphones-to-bangladesh/
    { code: "bd", name: "Bangladesh", date: "2014/09/16", carrier: "Telenor (Grameenphone)" },
    // https://blog.mozilla.org/press/2014/09/firefox-os-now-available-in-guatemala/
    { code: "gt", name: "Guatemala", date: "2014/09/18", carrier: "Telefónica (Movistar)" },
    // from where-is-firefox-os - http://ausdroid.net/2014/10/04/firefoxos-toting-zte-open-c-arrives-australia/, http://www.gizmodo.com.au/2014/10/jb-hi-fi-is-now-selling-australias-first-firefox-os-phone/
    { code: "au", name: "Australia", date: "2014/10/01", carrier: "JB Hi-Fi" },
    // http://omgdgt.com/2014/11/megafon-has-launched-russias-first-smartphone-based-on-firefox-os/
    { code: "ru", name: "Russia", date: "2014/11/13", carrier: "Megafon" },
    // from where-is-firefox-os - https://blog.mozilla.org/blog/2014/11/13/first-firefox-os-smartphones-available-in-the-philippines/
    { code: "ph", name: "Philippines", date: "2014/11/15", carrier: "Cherry Mobile" },
    // https://blog.mozilla.org/press-latam/2014/12/05/con-el-lanzamiento-en-costa-rica-firefox-os-ya-esta-disponible-en-todo-centroamerica/
    { code: "cr", name: "Costa Rica", date: "2014/12/15", carrier: "Telefónica (Movistar)" },
    // http://blog.mozilla.org/press/2014/12/mozilla-and-kddi-launch-first-firefox-os-smartphone-in-japan-4/
    { code: "jp", name: "Japan", date: "2014/12/25", carrier: "KDDI (au)" },
    { code: 'ar', name: 'Argentina', date: '2015/03/16', carrier: 'Telefónica (Movistar)' },
    // https://blog.mozilla.org/blog/2015/04/02/firefox-os-arrives-in-south-africa/
    // http://www.techweez.com/2015/04/08/mtn-beats-orange-to-market-with-first-firefox-os-smartphone-in-africa/
    { code: 'za', name: 'South Africa', date: '2015/04/02', carrier: 'MTN' },
    // https://blog.mozilla.org/blog/2015/05/08/orange-launches-first-firefox-os-smartphones-in-africa/
    { code: 'mg', name: 'Madagascar', date: '2015/05/06', carrier: 'Orange' },
    { code: 'sn', name: 'Senegal', date: '2015/05/07', carrier: 'Orange' },
    { code: 'tn', name: 'Tunisia', date: '2015/05/15', carrier: 'Orange' },
    // https://africa.mozilla.community/en/orange-klif-phone-tour-in-botswana/
    { code: 'bw', name: 'Botswana', date: '2015/05/16', carrier: 'Orange' },
    { code: 'cm', name: 'Cameroon', date: '2015/05/21', carrier: 'Orange' },
    { code: 'mr', name: 'Mauritius', date: '2015/05/28', carrier: 'Orange' },
    // https://firefoxoscentral.wordpress.com/2015/08/25/orange-telkom-launches-orange-klif-in-armenia/?utm_source=dlvr.it&utm_medium=twitter
    { code: 'ne', name: 'Niger', date: '2015/06/04', carrier: 'Orange' },
    // http://firefoxosguide.com/firefox-os/cherry-mobile-ace-launched-myanmar-ks-35000-price-tag.html/
    { code: 'mm', name: 'Myanmar', date: '2015/06/09', carrier: 'Cherry Mobile' },
    // http://firefoxoscentral.com/2015/05/mali-and-guinea-bissau-get-firefox-os/
    { code: 'ml', name: 'Mali', date: '2015/06/13', carrier: 'Orange' },
    { code: 'ci', name: 'Côte d\'Ivoire', date: '2015/06/16', carrier: 'Orange' },
    // https://firefoxoscentral.wordpress.com/2015/06/24/orange-klif-launched-in-kenya/
    { code: 'ke', name: 'Kenya', date: '2015/06/18', carrier: 'Orange' },
    { code: 'gw', name: 'Guinea Bissau', date: '2015/06/23', carrier: 'Orange' },
    // https://africa.mozilla.community/en/firefox-os-quick-round-up-9/
    { code: 'cf', name: 'Central Africa Republic', date: '2015/07/06', carrier: 'Orange' },
    // http://firefoxoscentral.com/2015/08/orange-klif-launched-in-vanuatu/
    { code: 'vu', name: 'Vanuatu', date: '2015/07/15', carrier: 'Orange' },
    { code: 'eg', name: 'Egypt ', date: '2015/07/21', carrier: 'Orange' },
    // https://firefoxoscentral.wordpress.com/2015/08/25/orange-telkom-launches-orange-klif-in-armenia/?utm_source=dlvr.it&utm_medium=twitter
    { code: 'am', name: 'Armenia', date: '2015/08/22', carrier: 'Orange' },
    // https://africa.mozilla.community/en/firefox-os-quick-round-up-9/
    { code: 'gn', name: 'Guinea', date: '2015/08/01', carrier: 'Orange' },
    { code: 'ro', name: 'Romania', date: '2015/09/14', carrier: 'Orange' },
    // http://firefoxoscentral.com/2015/10/orange-klif-launched-in-dr-congo/
    { code: 'cd', name: 'Democratic Republic of the Congo', date: '2015/10/09', carrier: 'Orange' },
    // http://www.orange.com/en/Press-and-medias/press-releases-2015/Orange-launches-breakthrough-all-inclusive-digital-offer-to-deliver-mobile-internet-to-millions-more-across-Africa-and-the-Middle-East
    // http://www.itmedia.co.jp/mobile/articles/1505/11/news054.html
    { code: 'jo', name: 'Jordan', date: '2015/11/18', carrier: 'Orange?' },
];