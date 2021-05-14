#!/usr/bin/env node
//
// This script retrieves all the domains to be whitelisted in the CORS-proxy, as a single string.
// Simply copy and paste its output into the *now.json* env *CORSANYWHERE_WHITELIST_TARGETS*
//
import { Optimade } from 'optimade';
import url from 'url';

const optimade = new Optimade({
    providersUrl: 'https://providers.optimade.org/providers.json'
});

let providers_urls = ['providers.optimade.science', 'providers.optimade.org']; // two default providers

optimade.getProviders().then(() => {

    for (let key in optimade.providers){
        if (!optimade.providers[key].attributes.base_url || optimade.providers[key].attributes.base_url.indexOf('example') !== -1)
            return;
        providers_urls.push(url.parse(optimade.providers[key].attributes.base_url).host);
    }

    providers_urls = Array.from(new Set(providers_urls));
    console.log(providers_urls.join(','));
});
