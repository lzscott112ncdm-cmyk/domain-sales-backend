
import { Router, Request, Response } from 'express';
import { prisma } from '../utils/db';
import { validateAdminToken } from '../middleware/auth';
// Simple fixed conversion rate for USD → BRL.
// You can adjust this any time you want to update your pricing baseline.
const USD_TO_BRL = 5.5; // <- pick the rate you want to use today

import { validateCreateDomain, validateUpdateDomain } from '../utils/validation';

const router = Router();

// Apply admin authentication to all routes
router.use(validateAdminToken);

/**
 * POST /api/admin/domain
 * Creates a new domain
 */
router.post('/domain', async (req: Request, res: Response) => {
  try {
    const validation = validateCreateDomain(req.body);
    
    if (!validation.valid) {
      return res.status(400).json({ error: 'Validation failed', details: validation.errors });
    }

   const { domain_name, price_usd, price_brl, whatsapp_number, afternic_url, active } = req.body;

// Auto-convert USD to BRL ONCE using a fixed rate if BRL was not provided
const finalPriceBRL =
  price_brl !== undefined && price_brl !== null
    ? price_brl
    : Math.round(Number(price_usd) * USD_TO_BRL * 100) / 100; // 2 decimal places

const domain = await prisma.domain.create({
  data: {
    domain_name,
    price_usd,
    price_brl: finalPriceBRL,
    whatsapp_number,
    afternic_url,
    active: active !== undefined ? active : true,
  },
});

    res.status(201).json(domain);
  } catch (error: any) {
    console.error('Error creating domain:', error);
    
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Domain already exists' });
    }
    
    res.status(500).json({ error: 'Failed to create domain' });
  }
});

/**
 * PUT /api/admin/domain/:id
 * Updates a domain
 */
router.put('/domain/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid domain ID' });
    }

    const validation = validateUpdateDomain(req.body);
    
    if (!validation.valid) {
      return res.status(400).json({ error: 'Validation failed', details: validation.errors });
    }

    const updateData: any = { ...req.body };

    // If price_usd is updated but price_brl is not provided, auto-convert
const USD_TO_BRL = 5.5;
if (updateData.price_usd && !updateData.price_brl) {
  updateData.price_brl =
    Math.round(Number(updateData.price_usd) * USD_TO_BRL * 100) / 100;
}


    const domain = await prisma.domain.update({
      where: { id },
      data: updateData,
    });

    res.json(domain);
  } catch (error: any) {
    console.error('Error updating domain:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Domain not found' });
    }
    
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Domain name already exists' });
    }
    
    res.status(500).json({ error: 'Failed to update domain' });
  }
});

/**
 * DELETE /api/admin/domain/:id
 * Deactivates a domain (soft delete)
 */
router.delete('/domain/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid domain ID' });
    }

    const domain = await prisma.domain.update({
      where: { id },
      data: { active: false },
    });

    res.json({ message: 'Domain deactivated successfully', domain });
  } catch (error: any) {
    console.error('Error deactivating domain:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Domain not found' });
    }
    
    res.status(500).json({ error: 'Failed to deactivate domain' });
  }
});

export default router;
