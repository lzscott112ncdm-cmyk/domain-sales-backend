
/**
 * Fetches the current USD to BRL exchange rate
 */
export async function getUsdToBrlRate(): Promise<number> {
  try {
    const response = await fetch(
      'https://api.exchangerate.host/latest?base=USD&symbols=BRL'
    );
    
    if (!response.ok) {
      throw new Error('Exchange rate API request failed');
    }
    
    const data = await response.json();
    
    if (data.rates && data.rates.BRL) {
      return data.rates.BRL;
    }
    
    throw new Error('BRL rate not found in response');
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    // Fallback rate if API fails
    return 5.5;
  }
}

/**
 * Converts USD to BRL using current exchange rate
 */
export async function convertUsdToBrl(usdAmount: number): Promise<number> {
  const rate = await getUsdToBrlRate();
  return Number((usdAmount * rate).toFixed(2));
}
