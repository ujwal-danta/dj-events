
const { events } = require('./data.json')

export default function handler(req, res) {
    if (req.method === 'GET')
        return res.status(200).json(events)
    else {
        return res.status(401).send(`Method ${req.method} not allowed`)
    }
}
