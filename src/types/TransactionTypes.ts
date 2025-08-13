type TransactionInput = {
  amount: number;
  currency: string;
  type: "income" | "expense";
  status: string;
  userId: number;
};

type TransactionResponse = {
  id: string;
  amount: number;
  currency: string;
  type: "income" | "expense";
  status: string;
  createdAt: string;
  userId: number;
};

export type { TransactionInput, TransactionResponse };