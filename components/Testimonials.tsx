const testimonials = [
  { name: "Priya", review: "Beautiful bridal collection and amazing service." },
  { name: "Anusha", review: "Best maggam work designs in town." },
  { name: "Sneha", review: "Loved my wedding lehenga." },
];

export default function Testimonials() {
  return (
    <section className="section bg-white">
      <h2 className="text-5xl text-center mb-10">Happy Customers</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {testimonials.map((item) => (
          <div key={item.name} className="border rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-lg">{item.name}</h3>
            <p className="mt-4 text-gray-600">"{item.review}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}
