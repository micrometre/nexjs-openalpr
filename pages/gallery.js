"use client";
import React from "react";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion'
import Layout from '@/components/layout'


const items = () => {
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
        <h2>{item.id}</h2>
        <h2>{item.plate}</h2>
        <p>{item.img}</p>
        <p>{item.created_on}</p>


        <motion.div className="thumbnail">
          <motion.div className="frame">
            <a href={item.img} target="_blank"
              rel="noopener noreferrer"
            >
              <motion.img
                src={item.img}
                alt="The " />
            </a>
          </motion.div>
        </motion.div>

      </div>
    );
  });

  return (
    <Layout>

      <div
        className="grid grid-cols-3 gap-3"
      >
        {collection} {/* Render the collection of items */}
      </div>
    </Layout>
  );
};

export default items;