const FALLBACK_IMAGES = {
  restaurant: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80",
  food: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
};

function ImageWithFallback({ src, alt, type = "food", className = "" }) {
  const fallback = FALLBACK_IMAGES[type];
  return <img src={src?.trim() || fallback} alt={alt} className={className} onError={(event) => {
    if (event.currentTarget.src !== fallback) event.currentTarget.src = fallback;
  }} />;
}

export default ImageWithFallback;
