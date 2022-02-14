// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Failed, Success } from '../../models/Generic'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Success | Failed>
) {
    if (req.method === 'POST' && req.body) {
        res.status(200).json({ msg: 'Successfully added plant' })
    }
    else {
        res.status(400).json({ error: 'Invalid request', errorCode: '400' })
    }
}
