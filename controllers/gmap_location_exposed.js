const router = require('express').Router();
const Request = require('request');

router.get('/:loc', (req, res) => {
    let APIkey = process.env.GMAP;
    let BaseURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
    // let lat = req.params.lat;
    // let long = req.params.long;
    // let location = `${lat},${long}`;
    let location = req.params.loc;
    let url = `${BaseURL}?location=${location}&radius=1609&type=convenience_store|department_store|drugstore|gas_station|grocery_or_supermarket|hardware_store|home_goods_store|pharmacy|shopping_mall|store|supermarket&key=${APIkey}`;

    // return res.status(200).json({ "loc": location })
    let options = {
        'method': 'GET',
        'url': url,
        'headers': {
            'Content-Type': 'application/json'
        }
    };
    if (location !== '' || location !== undefined) {
        Request(options, function (error, response) {
            if (error) throw new Error(error);
            return res.status(200).json(response.body);

        })
        // .then(loc => res.status(200).json({}))
    } else {
        return res.status(500).json({ message: "Need lat and long" });
    }

})
/*
* 404 Catch All
*/
// router.get(['*', '/'], (req, res) => {
//     res.status(404).send("*ex Location page does exist.");
// })

/*
* router export
*/
module.exports = router;