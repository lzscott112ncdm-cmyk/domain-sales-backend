
export interface CreateDomainInput {
  domain_name: string;
  price_usd: number;
  price_brl?: number;
  whatsapp_number: string;
  afternic_url: string;
  active?: boolean;
}

export interface UpdateDomainInput {
  domain_name?: string;
  price_usd?: number;
  price_brl?: number;
  whatsapp_number?: string;
  afternic_url?: string;
  active?: boolean;
}

export function validateCreateDomain(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.domain_name || typeof data.domain_name !== 'string') {
    errors.push('domain_name is required and must be a string');
  }

  if (typeof data.price_usd !== 'number' || data.price_usd <= 0) {
    errors.push('price_usd is required and must be a positive number');
  }

  if (!data.whatsapp_number || typeof data.whatsapp_number !== 'string') {
    errors.push('whatsapp_number is required and must be a string');
  }

  if (!data.afternic_url || typeof data.afternic_url !== 'string') {
    errors.push('afternic_url is required and must be a string');
  }

  return { valid: errors.length === 0, errors };
}

export function validateUpdateDomain(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (data.domain_name !== undefined && typeof data.domain_name !== 'string') {
    errors.push('domain_name must be a string');
  }

  if (data.price_usd !== undefined && (typeof data.price_usd !== 'number' || data.price_usd <= 0)) {
    errors.push('price_usd must be a positive number');
  }

  if (data.whatsapp_number !== undefined && typeof data.whatsapp_number !== 'string') {
    errors.push('whatsapp_number must be a string');
  }

  if (data.afternic_url !== undefined && typeof data.afternic_url !== 'string') {
    errors.push('afternic_url must be a string');
  }

  if (data.active !== undefined && typeof data.active !== 'boolean') {
    errors.push('active must be a boolean');
  }

  return { valid: errors.length === 0, errors };
}
