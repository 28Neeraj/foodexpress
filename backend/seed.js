require("dotenv").config();
const mongoose = require("mongoose");
const Restaurant = require("./models/Restaurant");

const foodImages = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900",
  "https://images.unsplash.com/photo-1547592180-85f173990554?w=900",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900",
  "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=900",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900",
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=900",
  "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=900",
  "https://images.unsplash.com/photo-1630383249896-424e482df921?w=900",
  "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=900"
];

const dishImages = {
  pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900",
  biryani: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=900",
  momo: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=900",
  thukpa: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900",
  noodle: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=900",
  dosa: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=900",
  idli: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=900",
  pasta: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=900",
  sandwich: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=900",
  fries: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=900",
  salad: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900",
  bowl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900",
  paneer: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=900",
  chicken: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=900",
  mutton: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=900",
  kebab: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=900",
  naan: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=900",
  rice: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900",
  coffee: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900",
  chai: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=900",
  shake: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=900",
  smoothie: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=900",
  brownie: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=900",
  cheesecake: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=900",
  soup: "https://images.unsplash.com/photo-1547592180-85f173990554?w=900"
};

function foodImageFor(name, fallbackIndex) {
  const normalizedName = name.toLowerCase();
  const matchingKey = Object.keys(dishImages).find((key) => normalizedName.includes(key));
  return matchingKey ? dishImages[matchingKey] : foodImages[fallbackIndex % foodImages.length];
}

const menus = {
  burger: ["Classic Veg Burger", "Crispy Chicken Burger", "Paneer Grill Burger", "BBQ Chicken Burger", "Double Cheese Burger", "Spicy Bean Burger", "Peri Peri Fries", "Loaded Cheese Fries", "Onion Rings", "Chicken Nuggets", "Veggie Wrap", "Chicken Wrap", "Mexican Burger", "Mushroom Melt Burger", "Coleslaw", "Chocolate Shake", "Oreo Shake", "Cold Coffee", "Lemon Iced Tea", "Chocolate Brownie"],
  pizza: ["Margherita Pizza", "Farmhouse Pizza", "Tandoori Paneer Pizza", "Veggie Supreme Pizza", "Pepperoni Pizza", "BBQ Chicken Pizza", "Chicken Sausage Pizza", "Garlic Bread", "Stuffed Garlic Bread", "Cheesy Dip", "Jalapeno Poppers", "Potato Wedges", "Pasta Arrabbiata", "Pasta Alfredo", "Choco Lava Cake", "Chocolate Brownie", "Cold Coffee", "Virgin Mojito", "Pepsi", "Cheese Burst Pizza"],
  northIndian: ["Dal Makhani", "Paneer Butter Masala", "Paneer Tikka Masala", "Kadai Paneer", "Palak Paneer", "Vegetable Biryani", "Chicken Biryani", "Butter Chicken", "Chicken Tikka Masala", "Murgh Malai Tikka", "Tandoori Chicken", "Seekh Kebab", "Jeera Rice", "Veg Pulao", "Butter Naan", "Garlic Naan", "Tandoori Roti", "Gulab Jamun", "Lassi", "Masala Chaas"],
  tibetan: ["Veg Momos", "Chicken Momos", "Paneer Chilli Momos", "Chicken Kurkure Momos", "Veg Thukpa", "Chicken Thukpa", "Veg Chowmein", "Chicken Chowmein", "Chilli Paneer", "Chilli Chicken", "Veg Manchurian", "Chicken Manchurian", "American Chop Suey", "Fried Rice", "Chicken Fried Rice", "Spring Rolls", "Honey Chilli Potato", "Hot and Sour Soup", "Mango Slush", "Green Apple Mojito"],
  cafe: ["Pesto Penne Pasta", "Alfredo Pasta", "Margherita Pizza", "Grilled Chicken Sandwich", "Veg Club Sandwich", "Cheese Chilli Toast", "Nachos Supreme", "Crispy Chicken Wings", "French Fries", "Loaded Fries", "Veggie Burger", "Chicken Burger", "Chocolate Brownie", "New York Cheesecake", "Tiramisu", "Cappuccino", "Cafe Latte", "Cold Coffee", "Virgin Mojito", "Iced Tea"],
  southIndian: ["Plain Dosa", "Masala Dosa", "Mysore Masala Dosa", "Rava Dosa", "Onion Uttapam", "Tomato Uttapam", "Idli Sambhar", "Medu Vada", "Mini Idli", "Pongal", "Lemon Rice", "Curd Rice", "Veg Biryani", "South Indian Thali", "Filter Coffee", "Masala Chai", "Butter Milk", "Kesari", "Mysore Pak", "Payasam"],
  healthy: ["Avocado Salad", "Quinoa Salad", "Paneer Protein Bowl", "Chicken Protein Bowl", "Tofu Buddha Bowl", "Veggie Wrap", "Grilled Chicken Wrap", "Hummus Pita Plate", "Roasted Makhana", "Fruit Bowl", "Greek Yogurt Bowl", "Peanut Butter Toast", "Oats Smoothie", "Green Detox Juice", "Berry Smoothie", "Cold Coffee", "Lemonade", "Chia Pudding", "Dark Chocolate Brownie", "Trail Mix"],
  mughlai: ["Mutton Korma", "Chicken Korma", "Chicken Biryani", "Mutton Biryani", "Butter Chicken", "Chicken Changezi", "Nihari", "Chicken Seekh Kebab", "Mutton Seekh Kebab", "Chicken Tikka", "Paneer Makhani", "Dal Makhani", "Shahi Paneer", "Rumali Roti", "Butter Naan", "Khamiri Roti", "Jeera Rice", "Phirni", "Shahi Tukda", "Sweet Lassi"]
};

const menuFor = (theme) => menus[theme].map((name, index) => ({
  name,
  category: theme === "tibetan" ? "Asian & Tibetan" : theme === "southIndian" ? "South Indian" : theme === "cafe" ? "Cafe Favourites" : theme === "healthy" ? "Healthy Eats" : theme === "pizza" ? "Pizza & Sides" : theme === "burger" ? "Burgers & Sides" : theme === "mughlai" ? "Mughlai" : "North Indian",
  description: `Freshly prepared ${name.toLowerCase()} made with quality ingredients.`,
  price: 99 + index * 20,
  image: foodImageFor(name, index),
  isVeg: !/(Chicken|Mutton|Pepperoni|Seekh|Nihari|Tandoori Chicken|BBQ)/i.test(name),
  isAvailable: true
}));

const restaurants = [
  ["Burger House", "Rajpur Road, Dehradun", "burger"], ["Pizza Hub", "GMS Road, Dehradun", "pizza"], ["KFC", "Pacific Mall, Rajpur Road, Dehradun", "burger"], ["Biryani Point", "Karanpur, Dehradun", "mughlai"], ["Healthy Bowl", "Ballupur, Dehradun", "healthy"], ["Domino's", "Jakhan, Rajpur Road, Dehradun", "pizza"],
  ["Kalsang Cafe & Restaurant", "Hathibarkala Salwala, Rajpur Road, Dehradun", "tibetan"], ["Karigari - By Chef Harpal Singh Sokhi", "Rajpur Road, Dehradun", "northIndian"], ["Tapri - The Teafe", "MJ Tower, Rajpur Road, Dehradun", "cafe"], ["Rasam - The Taste of South", "Rajpur Road, Dehradun", "southIndian"], ["Burgrill - The OG's of Grilled Burgers", "Rajpur Road, Dehradun", "burger"], ["Foresta Cafe", "Rajpur Road, Dehradun", "cafe"],
  ["Black Pepper Restaurant", "Rajpur Road, Dehradun", "northIndian"], ["Cafe De Piccolo", "Near Sai Mandir, Rajpur, Dehradun", "cafe"], ["The Orchard", "Rajpur, Dehradun", "tibetan"], ["Kumar Foods", "Rajpur Road, Dehradun", "northIndian"], ["Ellora's Melting Moments", "Rajpur Road, Dehradun", "cafe"],
  ["Indian Accent", "The Lodhi, Lodhi Road, New Delhi", "northIndian"], ["Bukhara", "ITC Maurya, Chanakyapuri, New Delhi", "northIndian"], ["Karim's", "Jama Masjid, Old Delhi", "mughlai"], ["Saravana Bhavan", "Janpath, Connaught Place, New Delhi", "southIndian"], ["The Big Chill Cafe", "Khan Market, New Delhi", "cafe"], ["Mamagoto", "Khan Market, New Delhi", "tibetan"], ["Social", "Connaught Place, New Delhi", "cafe"], ["Daryaganj", "Connaught Place, New Delhi", "northIndian"]
];

const catalogue = restaurants.map(([name, address, theme], index) => ({
  name,
  image: foodImages[(index + 2) % foodImages.length],
  description: `Popular ${theme === "tibetan" ? "Asian and Tibetan" : theme === "cafe" ? "cafe" : theme === "southIndian" ? "South Indian" : theme === "mughlai" ? "Mughlai" : theme} favourites for delivery.`,
  rating: Number((4.1 + (index % 8) / 10).toFixed(1)),
  delivery: `${20 + (index % 3) * 5}-${30 + (index % 3) * 5} min`,
  deliveryFee: 25 + (index % 3) * 10,
  offer: index % 2 ? "20% OFF above Rs.499" : "Free delivery above Rs.399",
  address,
  menu: menuFor(theme)
}));

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Promise.all(catalogue.map((restaurant) => Restaurant.updateOne(
      { name: restaurant.name },
      { $set: restaurant },
      { upsert: true, runValidators: true }
    )));
    console.log(`Synced ${catalogue.length} restaurants with ${catalogue.length * 20} menu items.`);
  } catch (error) {
    console.error("Catalogue sync failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

seed();
