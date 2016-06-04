import { Router } from 'express';
import mediainfo from './mediainfo.js';

export default function () {
    var api = Router();

    api.get('/', (req, res) => {
        var url = req.query.url;

        if (url && url != ''){
            mediainfo(url, function(err, mediaResult) {
                if (err) {
                    res.json({
                        error:err
                    })
                }
                res.json(mediaResult);
            });

        }
        else{
            res.json({
                error:'url not provided.'
            })
        }

    });
    return api;
}

