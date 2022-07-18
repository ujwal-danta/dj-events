
const { events } = require('./data.json')

export default function handler(req, res) {
    const evt = events.filter((evt) => evt.slug === req.query.slug)
    if (req.method === 'GET')
        return res.status(200).json(evt)
    else {
        return res.status(401).send(`Method ${req.method} not allowed`)
    }
}
