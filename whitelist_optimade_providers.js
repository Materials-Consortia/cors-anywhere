#!/usr/bin/env node

var http = require('http'),
    https = require('https'),
    url = require('url');


var args = process.argv.slice(2);
if (!args.length) throw new Error('Usage: script optimade_providers_json_url \n\n');

var addr = url.parse(args[0]),
    net = (addr.protocol == 'https:') ? https : http;

net.request({
    host: addr.host,
    path: addr.path
}, function(response){

    var result = '',
        providers_urls = ['providers.optimade.science', 'providers.optimade.org']; // two default supported providers

    response.on('data', function(chunk){
        result += chunk;
    });
    response.on('end', function(){
        try {
            result = JSON.parse(result);
        } catch (e){
            return console.log('Critical error: ' + e);
        }
        result.data.forEach(function(item){
            if (!item.attributes.base_url || item.attributes.base_url.indexOf('example') !== -1) return;
            providers_urls.push(url.parse(item.attributes.base_url).host);
        });
        providers_urls = Array.from(new Set(providers_urls));

        console.log(providers_urls.join(','));
    });

}).on('error', function(){
    console.log('Network error!');
}).end();