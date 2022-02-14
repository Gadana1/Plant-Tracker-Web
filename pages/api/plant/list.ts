// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PlantList } from '../../../models/Plant'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlantList>
) {
  const page = req.query['page'] || 0;
  const limit = req.query['limit'] || 0;

  setTimeout(() => {

    res.status(200).json({
      data: [
        {
          id: 1,
          name: 'Okra',
          species: 'A. esculentus',
          instructions: "*2 Times* a day with *12 hours* intervals",
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Hong_Kong_Okra_Aug_25_2012.JPG/330px-Hong_Kong_Okra_Aug_25_2012.JPG'
        },
        {
          id: 2,
          name: 'Cauliflower',
          species: 'Brassica oleracea',
          instructions: "*3 Times* a day with *8 hours* intervals",
          image: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Cauliflower.JPG'
        },
        {
          id: 3,
          name: 'Pumpkin',
          species: 'Atlantic Giant',
          instructions: "*4 Times* a day with *6 hours* intervals",
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/FrenchMarketPumpkinsB.jpg/525px-FrenchMarketPumpkinsB.jpg'
        }
      ],
      current_page: Number(page),
      per_page: Number(limit),
      last_page: 19,
      total: 100
    })
  }, 1000);

}
