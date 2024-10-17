import React from "react";
export default function DefaultPage(): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 text-center">
        <div className="spinner mx-auto mb-4"> </div>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Cargando...
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Por favor, espere mientras procesamos su solicitud.
        </p>
      </div>
    </div>
  );
}
