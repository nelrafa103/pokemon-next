"use client";
import LogRocket from "logrocket";
import React, { useEffect } from "react";
export default function LogRocketProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  useEffect(() => {
    LogRocket.init("zhlemy/pokemon");

    // This is an example script - don't forget to change it!
    LogRocket.identify("Nelcido", {
      name: "James Morrison",
      email: "jamesmorrison@example.com",

      // Add your own custom user variables here, ie:
      subscriptionType: "pro",
    });
  });

  return <>{children}</>;
}
