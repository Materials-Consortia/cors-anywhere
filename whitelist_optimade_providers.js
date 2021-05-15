#!/usr/bin/env node
//
// This script retrieves all the domains to be whitelisted in the CORS-proxy, as a single string.
// Simply copy and paste its output into the *now.json* env *CORSANYWHERE_WHITELIST_TARGETS*
//
const opt = require('optimade'),
    url = require('url');

const optimade = new opt.Optimade({
    providersUrl: 'https://providers.optimade.org/providers.json'
});

let providers_urls = [];

optimade.getProviders().then(() => {

    optimade.reqStack.forEach((item) => {
        providers_urls.push(url.parse(item).host);
    });

    providers_urls = Array.from(new Set(providers_urls));
    console.log(providers_urls.join(','));
});
