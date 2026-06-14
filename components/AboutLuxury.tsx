"use client";
import { motion } from "framer-motion";

export default function AboutLuxury() {
  return (
    <section className="section bg-white">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl font-bold text-center">Crafted for Every Bride</h2>
        <p className="text-center max-w-3xl mx-auto mt-6">
          We specialize in premium bridal collections, designer blouses, maggam work and luxury lehengas.
        </p>
      </motion.div>
    </section>
  );
}
