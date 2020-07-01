#!/usr/bin/env node
const posters = require('/home/hayashis/git/ohbm2020-posters/posters.json');
const posters_overrides = require('/home/hayashis/git/ohbm2020-posters/posters-overrides.json');
const async = require('async');
const axios = require('axios');
const fs = require('fs');

//apply overrides
posters_overrides.posters.forEach(po=>{
    let p = posters.posters.find(p=>p.number == po.number);
    Object.assign(p, po);
});

async.eachSeries(posters.posters, (poster, next_poster)=>{
    if(!poster.pdf) return next_poster();
    let path = __dirname+"/../posters/"+poster.number+".pdf";
    if(fs.existsSync(path)) return next_poster();
    console.dir(poster);

    axios({
        method: 'get',
        url: encodeURI(poster.pdf),
        responseType: 'stream',
    }).then(res=>{
        let outstream = fs.createWriteStream(path);
        res.data.pipe(outstream).on('finish', next_poster);
    }).catch(err=>{
        console.error(err);
        next_poster();
    });
}, err=>{
    if(err) throw err;
});

//find posters that are too samll
//find . -type f -size -100k
