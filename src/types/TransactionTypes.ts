type TransactionInput = {
  name: string | null;
  amount: number;
  currency: string;
  type: string;
  status: string;
  userId: string;
};

type TransactionResponse = {
  id: string;
  name: string | null;
  amount: number;
  currency: string;
  type: string;
  status: string;
  createdAt: Date | string;
  userId: string;
};

export type { TransactionInput, TransactionResponse };