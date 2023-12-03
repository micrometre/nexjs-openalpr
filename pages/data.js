"use client";
import { useState, useEffect } from "react";
import Layout from '@/components/layout'


export default function DataTable() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("/api/alpr-sql", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const collection = items.map((item) => {
    return (
      <div key={item.id} id={item.id} xs={3}>
        <div className="mt-6 flow-root">
          <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
              <table className="hidden min-w-full text-gray-900 md:table">
                <tbody className="bg-white">
                  <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                    <td>{item.id}</td>
                    <td>{item.plate}</td>
                    <td>{item.uuid}</td>
                    <td>{item.img}</td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    );
  });

  return (

    <Layout>
      {collection} {/* Render the collection of items */}
    </Layout>
  );
}
