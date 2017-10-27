import { config } from '../config'

export const ensureInternal = () => (req, res, next) => {
    const authHeader = req.get('authorization')
    if (authHeader) {
        if (authHeader.substring('Bearer '.length) === config.internalToken) {
            return next()
        }
    }
    res.status(403).json({ error: 'Forbidden' })
}
