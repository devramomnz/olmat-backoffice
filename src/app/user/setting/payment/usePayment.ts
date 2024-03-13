import { useState } from "react";

export function usePayment() {
  const [isEdit, setIsEdit] = useState(false);

  //   function

  return { isEdit, setIsEdit };
}
