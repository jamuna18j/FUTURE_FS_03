import bcrypt from "bcryptjs";
import { Admin, MenuItem } from "./models.js";

const starterMenu = [
  {
    name: "Classic Masala Fries",
    category: "Spicy",
    price: 89,
    description: "Golden, crunchy fries tossed in our lively house masala.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Crispy & bold"
  },
  {
    name: "Peri-Peri Rainbow Fries",
    category: "Spicy",
    price: 99,
    description: "Crispy golden fries dusted with zesty peri-peri seasoning.",
    image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Spicy bestseller"
  },
  {
    name: "Chilli Cheese Toast",
    category: "Spicy",
    price: 119,
    description: "Toasty, cheesy and gently fiery.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Little kick"
  },
  {
    name: "Cheesy Corn Pops",
    category: "Spicy",
    price: 129,
    description: "Crunchy bites filled with sweet corn, herbs and cheese.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Crunchy & cheesy"
  },
  {
    name: "Velvet Cappuccino",
    category: "Coffee",
    price: 129,
    description: "Rich espresso, silky milk and cloud-like foam.",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Bestseller"
  },
  {
    name: "Mango Mint Cooler",
    category: "Ice & Juice",
    price: 139,
    description: "Juicy mango meets fresh mint for a refreshing lift.",
    image: "https://images.unsplash.com/photo-1513558161293-cfaf765edfd7?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Cool & sunny"
  },
  {
    name: "Strawberry Dream Smoothie",
    category: "Ice & Juice",
    price: 149,
    description: "A cool, creamy strawberry blend with a fruity finish.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Berry refreshing"
  },
  {
    name: "Iced Caramel Latte",
    category: "Ice & Juice",
    price: 159,
    description: "Chilled espresso, smooth milk and a caramel swirl.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Cool favourite"
  },
  {
    name: "Purple Berry Fizz",
    category: "Ice & Juice",
    price: 159,
    description: "A sparkling berry cooler with a citrus twist.",
    image: "https://images.unsplash.com/photo-1513558161293-cfaf765edfd7?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Colour-pop cooler"
  },
  {
    name: "Garden Club Sandwich",
    category: "Combos",
    price: 179,
    description: "Fresh greens, tomato and house sauce tucked into golden toast.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Fresh pick"
  },
  {
    name: "Masala Dosa Delight",
    category: "Combos",
    price: 149,
    description: "A crisp golden dosa with potato masala, chutney and sambar.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "South Indian classic"
  },
  {
    name: "Paneer Tikka Wrap",
    category: "Combos",
    price: 179,
    description: "Smoky paneer tikka, crunchy veggies and minty sauce in a wrap.",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Protein-packed"
  },
  {
    name: "Creamy White Pasta",
    category: "Combos",
    price: 219,
    description: "Creamy herb sauce, pasta and a sprinkle of parmesan.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Comfort food"
  },
  {
    name: "Garden Veggie Pizza",
    category: "Combos",
    price: 229,
    description: "Peppers, olives, sweet corn and cheese on a crisp base.",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Cheesy goodness"
  },
  {
    name: "Classic Veggie Burger Combo",
    category: "Combos",
    price: 249,
    description: "A veggie patty, crisp lettuce, tangy sauce and golden fries.",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "100% veg favourite"
  },
  {
    name: "Fudgy Choco Brownie",
    category: "Sweet",
    price: 119,
    description: "A rich, fudgy chocolate brownie with a delicate crackly top.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Chocolate lover"
  },
  {
    name: "Pistachio Rose Cupcake",
    category: "Sweet",
    price: 139,
    description: "Soft vanilla sponge with rose notes and pistachio crunch.",
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Pretty & delicious"
  },
  {
    name: "Chocolate Cloud Cake",
    category: "Sweet",
    price: 189,
    description: "Soft, rich chocolate layers for a happy sweet tooth.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Sweet escape"
  },
  {
    name: "Berry Cheesecake",
    category: "Sweet",
    price: 199,
    description: "Creamy cheesecake finished with bright berry flavours.",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Staff favourite"
  },
  {
    name: "Choco-Coffee Happy Deal",
    category: "Offers",
    price: 269,
    description: "Pair a coffee with a chocolatey treat for a special break.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Happy deal"
  },
  {
    name: "Friends' Snack Combo",
    category: "Offers",
    price: 299,
    description: "A shareable mix of café favourites made for good company.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Share the joy"
  },
  {
    name: "Lavender Berry Shake",
    category: "Ice & Juice",
    price: 179,
    description: "A creamy berry shake with a dreamy lilac look.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Lilac special"
  }
];

export async function seedInitialData() {
  const email = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD || "";

  if (!email || !password || password.length < 10) {
    throw new Error(
      "Set ADMIN_EMAIL and an ADMIN_PASSWORD of at least 10 characters in server/.env."
    );
  }

  const existingAdmin = await Admin.findOne({ email });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(password, 12);

    await Admin.create({
      name: process.env.ADMIN_NAME || "Cafe Admin",
      email,
      passwordHash
    });

    console.log("Initial admin account created.");
  } else {
    console.log("Admin account already exists; existing password retained.");
  }

  // Rename the previous demo burger without deleting existing orders.
  await MenuItem.updateOne(
    { name: "Classic Cheeseburger Combo" },
    {
      $set: {
        name: "Classic Veggie Burger Combo",
        vegetarian: true,
        description: "A veggie patty, crisp lettuce, tangy sauce and golden fries.",
        image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=700&q=80",
        tag: "100% veg favourite"
      }
    }
  );

  let added = 0;

  for (const item of starterMenu) {
    const result = await MenuItem.updateOne(
      { name: item.name },
      { $setOnInsert: item },
      { upsert: true }
    );

    if (result.upsertedCount) {
      added += 1;
    }
  }

  if (added > 0) {
    console.log(`Added ${added} new vegetarian menu items.`);
  }
}