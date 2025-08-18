type TransactionInput = {
  name: string;
  amount: number;
  currency: string;
  type: "income" | "expense";
  status: string;
  userId: string;
};

type TransactionResponse = {
  id: string;
  name: string;
  amount: number;
  currency: string;
  type: "income" | "expense";
  status: string;
  createdAt: string;
  userId: string;
};

export type { TransactionInput, TransactionResponse };