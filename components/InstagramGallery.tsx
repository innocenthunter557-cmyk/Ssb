const images = [
  "/instagram/1.jpg",
  "/instagram/2.jpg",
  "/instagram/3.jpg",
  "/instagram/4.jpg",
  "/instagram/5.jpg",
  "/instagram/6.jpg",
];

export default function InstagramGallery() {
  return (
    <section className="section">
      <h2 className="text-5xl text-center mb-10">Instagram Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {images.map((img) => (
          <div key={img} className="bg-gray-200 rounded-xl h-64 flex items-center justify-center text-gray-400">
            Image Placeholder
          </div>
        ))}
      </div>
    </section>
  );
}
