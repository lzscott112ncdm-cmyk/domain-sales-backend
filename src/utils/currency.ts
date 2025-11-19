import axios from "axios";

// src/utils/currency.ts
export const USD_TO_BRL = 5.5; // master conversion rate

export async function convertToBRL(amountUSD: number): Promise<number> {
  const response = await axios.get("https://api.exchangerate.host/convert", {
    params: { from: "USD", to: "BRL", amount: amountUSD },
  });

  // Tell TypeScript what the API returns
  const data = response.data as {
    result: number;
  };

  return data.result;
}

export async function convertToUSD(amountBRL: number): Promise<number> {
  const response = await axios.get("https://api.exchangerate.host/convert", {
    params: { from: "BRL", to: "USD", amount: amountBRL },
  });

  const data = response.data as {
    result: number;
  };

  return data.result;
}
