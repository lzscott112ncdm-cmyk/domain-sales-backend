
import { Router, Request, Response } from 'express';
import { prisma } from '../utils/db';

const router = Router();

/**
 * GET /api/domains
 * Returns all active domains
 */
router.get('/domains', async (req: Request, res: Response) => {
  try {
    const domains = await prisma.domain.findMany({
      where: { active: true },
      orderBy: { created_at: 'desc' },
    });

    res.json(domains);
  } catch (error) {
    console.error('Error fetching domains:', error);
    res.status(500).json({ error: 'Failed to fetch domains' });
  }
});

/**
 * GET /api/domain/:domain
 * Returns a single domain by domain_name
 */
router.get('/domain/:domain', async (req: Request, res: Response) => {
  try {
    const { domain } = req.params;

    const domainRecord = await prisma.domain.findFirst({
      where: {
        domain_name: domain,
        active: true,
      },
    });

    if (!domainRecord) {
      return res.status(404).json({ error: 'Domain not found' });
    }

    res.json(domainRecord);
  } catch (error) {
    console.error('Error fetching domain:', error);
    res.status(500).json({ error: 'Failed to fetch domain' });
  }
});

export default router;
