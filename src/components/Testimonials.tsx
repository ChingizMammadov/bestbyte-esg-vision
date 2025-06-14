
import React from "react";

export const Testimonials = () => (
  <section className="py-20 bg-gradient-to-br from-white via-teal-50 to-green-100 border-b border-gray-100">
    <div className="container mx-auto max-w-5xl text-center">
      <h3 className="text-2xl md:text-3xl font-bold mb-8">What Our Clients Say</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-white border px-8 py-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-lg text-gray-700 italic">
            “With BestByte, our carbon reporting went from weeks to hours. The insights have guided our sustainability road map!”
          </p>
          <div className="mt-6 font-semibold text-primary">— Sarah K., Head of ESG, GreenGrowth Corp</div>
        </div>
        <div className="bg-white border px-8 py-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-lg text-gray-700 italic">
            “The predictive analytics blew us away. We cut energy waste by 15% this quarter alone.”
          </p>
          <div className="mt-6 font-semibold text-primary">— Daniel M., COO, NovaTech</div>
        </div>
        <div className="bg-white border px-8 py-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-lg text-gray-700 italic">
            “BestByte’s carbon calculator is so intuitive. Our compliance team actually likes reporting now!”
          </p>
          <div className="mt-6 font-semibold text-primary">— Jessica F., Compliance Lead, EcoElements</div>
        </div>
      </div>
    </div>
  </section>
);
