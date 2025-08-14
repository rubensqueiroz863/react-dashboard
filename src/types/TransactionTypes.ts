type TransactionInput = {
  amount: number;
  currency: string;
  type: "income" | "expense";
  status: string;
  userId: string;
};

type TransactionResponse = {
  id: string;
  amount: number;
  currency: string;
  type: "income" | "expense";
  status: string;
  createdAt: string;
  userId: string;
};

export type { TransactionInput, TransactionResponse };