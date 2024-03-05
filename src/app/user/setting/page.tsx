"use client";

import React, { useEffect } from "react";
import DegreeSetting from "./components/DegreeSetting";
import useSecurePage from "@/hooks/useSecurePage";

export default function Setting() {
  const { securePage } = useSecurePage(2);
  useEffect(() => {
    securePage();
  }, []);
  return (
    <div>
      <DegreeSetting />
    </div>
  );
}
