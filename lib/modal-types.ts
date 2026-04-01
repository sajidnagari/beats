export type ModalType = "trial" | "demo" | "plan" | "contact" | "get-started";

export type ModalState = {
  open: boolean;
  type: ModalType | null;
  planName?: string;
};

export const initialModalState: ModalState = {
  open: false,
  type: null,
};
