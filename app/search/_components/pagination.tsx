"use client";
import React from "react";
import { Pagination } from "@nextui-org/react";

export default function PaginationComponent({
  total,
  onClick
}: {
  total: number;
  onClick: (num: number) => void
}): React.ReactElement {
  return (
    <div className="w-full flex justify-center items-center">
      <Pagination total={total} onChange={(num) => onClick(num)} initialPage={1} />{" "}
    </div>
  );
}
