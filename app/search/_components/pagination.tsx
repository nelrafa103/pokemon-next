"use client";
import React from "react";
import { Pagination } from "@nextui-org/react";

export default function PaginationComponent(): React.ReactElement {
  return (
    <div className="w-full flex justify-center items-center">
      {" "}
      <Pagination total={10} initialPage={1} />{" "}
    </div>
  );
}
