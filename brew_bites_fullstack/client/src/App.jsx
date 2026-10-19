import { useEffect, useMemo, useState } from "react";
import "./styles.css";

const API =
  import.meta.env.VITE_API_URL || "/api";

const fallbackMenu = [
  {
    _id: "demo1",
    name: "Classic Masala Fries",
    category: "Spicy",
    price: 89,
    description: "Golden, crunchy fries tossed in our lively house masala.",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Crispy & bold",
  },
  {
    _id: "demo2",
    name: "Chilli Cheese Toast",
    category: "Spicy",
    price: 119,
    description: "Toasty, cheesy and gently fiery.",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Little kick",
  },
  {
    _id: "demo3",
    name: "Velvet Cappuccino",
    category: "Coffee",
    price: 129,
    description: "Rich espresso, silky milk and cloud-like foam.",
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Bestseller",
  },
  {
    _id: "demo4",
    name: "Mango Mint Cooler",
    category: "Ice & Juice",
    price: 139,
    description: "Juicy mango meets fresh mint for a refreshing lift.",
    image:
      "https://images.unsplash.com/photo-1513558161293-cfaf765edfd7?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Cool & sunny",
  },
  {
    _id: "demo5",
    name: "Iced Caramel Latte",
    category: "Ice & Juice",
    price: 159,
    description: "Chilled espresso, smooth milk and a caramel swirl.",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Cool favourite",
  },
  {
    _id: "demo6",
    name: "Garden Club Sandwich",
    category: "Combos",
    price: 179,
    description: "Fresh greens, ripe tomato and house sauce in golden toast.",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Fresh pick",
  },
  {
    _id: "demo7",
    name: "Chocolate Cloud Cake",
    category: "Sweet",
    price: 189,
    description: "Soft, rich chocolate layers for a happy sweet tooth.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Sweet escape",
  },
  {
    _id: "demo8",
    name: "Berry Cheesecake",
    category: "Sweet",
    price: 199,
    description: "Creamy cheesecake finished with berry brightness.",
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Staff favourite",
  },
  {
    _id: "demo9",
    name: "Creamy White Pasta",
    category: "Combos",
    price: 219,
    description: "Creamy herb sauce, parmesan and comforting flavours.",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Comfort food",
  },
  {
    _id: "demo10",
    name: "Classic Veggie Burger Combo",
    category: "Combos",
    price: 249,
    description: "A veggie patty, crisp lettuce, tangy sauce and fries.",
    image:
      "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "100% veg favourite",
  },
  {
    _id: "demo11",
    name: "Choco-Coffee Happy Deal",
    category: "Offers",
    price: 269,
    description: "Pair a coffee with a chocolatey treat.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Happy deal",
  },
  {
    _id: "demo12",
    name: "Friends' Snack Combo",
    category: "Offers",
    price: 299,
    description: "A shareable mix of café favourites for friends.",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Share the joy",
  },
  {
    _id: "demo13",
    name: "Peri-Peri Rainbow Fries",
    category: "Spicy",
    price: 99,
    description: "Crispy fries dusted with zesty peri-peri seasoning.",
    image:
      "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Spicy bestseller",
  },
  {
    _id: "demo14",
    name: "Cheesy Corn Pops",
    category: "Spicy",
    price: 129,
    description: "Crunchy bites filled with sweet corn, herbs and cheese.",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Crunchy & cheesy",
  },
  {
    _id: "demo15",
    name: "Masala Dosa Delight",
    category: "Combos",
    price: 149,
    description: "Golden dosa with potato masala, chutney and sambar.",
    image:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "South Indian classic",
  },
  {
    _id: "demo16",
    name: "Paneer Tikka Wrap",
    category: "Combos",
    price: 179,
    description: "Smoky paneer tikka, crunchy veggies and mint sauce.",
    image:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Protein-packed",
  },
  {
    _id: "demo17",
    name: "Garden Veggie Pizza",
    category: "Combos",
    price: 229,
    description: "Peppers, olives, sweet corn and melty cheese.",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Cheesy goodness",
  },
  {
    _id: "demo18",
    name: "Strawberry Dream Smoothie",
    category: "Ice & Juice",
    price: 149,
    description: "A cool, creamy strawberry blend with a fruity finish.",
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Berry refreshing",
  },
  {
    _id: "demo19",
    name: "Purple Berry Fizz",
    category: "Ice & Juice",
    price: 159,
    description: "A sparkling berry cooler with a citrus twist.",
    image:
      "https://images.unsplash.com/photo-1513558161293-cfaf765edfd7?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Colour-pop cooler",
  },
  {
    _id: "demo20",
    name: "Fudgy Choco Brownie",
    category: "Sweet",
    price: 119,
    description: "A rich, fudgy chocolate brownie with a crackly top.",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Chocolate lover",
  },
  {
    _id: "demo21",
    name: "Pistachio Rose Cupcake",
    category: "Sweet",
    price: 139,
    description: "Vanilla sponge with rose notes and pistachio crunch.",
    image:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Pretty & delicious",
  },
  {
    _id: "demo22",
    name: "Lavender Berry Shake",
    category: "Ice & Juice",
    price: 179,
    description: "A creamy berry shake with a dreamy lilac look.",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80",
    vegetarian: true,
    tag: "Lilac special",
  },
];

const money = (n) =>
  "₹" + Number(n || 0).toLocaleString("en-IN");

const categoryCopy = {
  All: {
    title: "Every craving, covered.",
    text: "Explore our full café menu, from bold little bites to cool sips and sweet endings.",
  },
  Spicy: {
    title: "A little heat. A lot of flavour.",
    text: "Crunchy, cheesy and full of character. These spicy favourites bring the kick.",
  },
  Sweet: {
    title: "Save room for a happy ending.",
    text: "Soft cakes, creamy treats and berry-bright bites.",
  },
  "Ice & Juice": {
    title: "Sip cool. Feel refreshed.",
    text: "Fresh, fruity and wonderfully chilled drinks for your day.",
  },
  Combos: {
    title: "Your favourites, better together.",
    text: "Filling café pairings for lunch breaks, study sessions and catch-ups.",
  },
  Offers: {
    title: "Good deals. Great café moments.",
    text: "Wallet-friendly pairings and shareable picks.",
  },
  Coffee: {
    title: "A good day starts with a good brew.",
    text: "Smooth, rich coffee from the first morning sip to your afternoon pause.",
  },
};

async function api(path, options = {}) {
  const { token, ...fetchOptions } = options;

  const response = await fetch(`${API}${path}`, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...fetchOptions.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Request failed (${response.status})`);
  }

  return data;
}

export default function App() {
  const [menu, setMenu] = useState(fallbackMenu);
  const [apiStatus, setApiStatus] = useState("connecting");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState("");
  const [orderForm, setOrderForm] = useState({
    customerName: "",
    phone: "",
    notes: "",
  });
  const [adminToken, setAdminToken] = useState(
    sessionStorage.getItem("bb-token") || ""
  );
  const [admin, setAdmin] = useState(
    JSON.parse(sessionStorage.getItem("bb-admin") || "null")
  );
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState("");
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api("/menu")
      .then((items) => {
        if (Array.isArray(items)) {
          setMenu(items);
          setApiStatus("connected");
        } else {
          throw new Error("Unexpected menu response");
        }
      })
      .catch((error) => {
        console.error("Menu loading failed:", error);
        setApiStatus("offline");
      });
  }, []);

  useEffect(() => {
    if (!adminToken) {
      setOrders([]);
      return;
    }

    let cancelled = false;
    setOrdersLoading(true);
    setOrdersError("");
    api("/admin/orders", { token: adminToken })
      .then((result) => {
        if (!Array.isArray(result)) {
          throw new Error("Unexpected orders response.");
        }
        if (!cancelled) setOrders(result);
      })
      .catch((error) => {
        if (!cancelled) setOrdersError(error.message || "Could not load orders.");
      })
      .finally(() => {
        if (!cancelled) setOrdersLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [adminToken]);

  const filtered = useMemo(
    () =>
      menu
        .filter(
          (item) =>
            (category === "All" || item.category === category) &&
            `${item.name} ${item.description || ""} ${item.category}`
              .toLowerCase()
              .includes(search.toLowerCase())
        )
        .sort((a, b) => Number(a.price) - Number(b.price)),
    [menu, category, search]
  );

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, quantity]) => ({
          item: menu.find((item) => item._id === id),
          quantity,
        }))
        .filter((entry) => entry.item),
    [cart, menu]
  );

  const cartCount = cartItems.reduce(
    (total, entry) => total + entry.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, entry) =>
      total + Number(entry.item.price) * entry.quantity,
    0
  );

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 3000);
  }

  function addToCart(item) {
    setCart((current) => ({
      ...current,
      [item._id]: (current[item._id] || 0) + 1,
    }));
    showToast(`${item.name} added to your bag`);
  }

  function changeQuantity(id, amount) {
    setCart((current) => {
      const updated = { ...current };
      updated[id] = (updated[id] || 0) + amount;

      if (updated[id] <= 0) {
        delete updated[id];
      }

      return updated;
    });
  }

  async function submitOrder(event) {
    event.preventDefault();

    if (!cartItems.length) {
      showToast("Your bag is empty.");
      return;
    }

    if (apiStatus !== "connected") {
      showToast("The backend is offline. Please try again.");
      return;
    }

    if (cartItems.some(({ item }) => String(item._id).startsWith("demo"))) {
      showToast("Demo items cannot be ordered. Refresh the menu.");
      return;
    }

    setBusy(true);

    try {
      const result = await api("/orders", {
        method: "POST",
        body: JSON.stringify({
          ...orderForm,
          items: cartItems.map(({ item, quantity }) => ({
            menuItem: item._id,
            quantity,
          })),
        }),
      });

      setCart({});
      setCartOpen(false);
      setModal("");
      setOrderForm({ customerName: "", phone: "", notes: "" });
      showToast(result.message || "Order request submitted!");
    } catch (error) {
      showToast(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function login(event) {
    event.preventDefault();
    setBusy(true);

    try {
      const result = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify(loginForm),
      });

      sessionStorage.setItem("bb-token", result.token);
      sessionStorage.setItem("bb-admin", JSON.stringify(result.admin));
      setAdminToken(result.token);
      setAdmin(result.admin);
      setModal("");
      setLoginForm({ email: "", password: "" });
      showToast("Admin login successful.");
    } catch (error) {
      showToast(error.message || "Login failed.");
    } finally {
      setBusy(false);
    }
  }

  async function refreshOrders() {
    if (!adminToken) return;
    setOrdersLoading(true);
    setOrdersError("");
    try {
      const result = await api("/admin/orders", { token: adminToken });
      if (!Array.isArray(result)) {
        throw new Error("Unexpected orders response.");
      }
      setOrders(result);
    } catch (error) {
      setOrdersError(error.message || "Could not load orders.");
    } finally {
      setOrdersLoading(false);
    }
  }

  async function updateOrderStatus(orderId, status) {
    setUpdatingOrderId(orderId);
    try {
      const updatedOrder = await api(`/admin/orders/${orderId}/status`, {
        method: "PATCH",
        token: adminToken,
        body: JSON.stringify({ status }),
      });
      setOrders((current) =>
        current.map((order) => order._id === orderId ? updatedOrder : order)
      );
      showToast(`Order status updated to ${status}.`);
    } catch (error) {
      showToast(error.message || "Could not update order status.");
      refreshOrders();
    } finally {
      setUpdatingOrderId("");
    }
  }

  function logout() {
    sessionStorage.removeItem("bb-token");
    sessionStorage.removeItem("bb-admin");
    setAdminToken("");
    setAdmin(null);
    setOrders([]);
    showToast("Signed out.");
  }

  return (
    <div className="app-shell">
      <div className="announcement">
        ✨ Freshly brewed happiness, served daily ✨
        {" · "}100% PURE VEGETARIAN
      </div>

      <header className="header">
        <a className="brand" href="#home">
          ☕ Brew <em>&</em> Bites
          <small>CAFÉ · GOOD FOOD, GOOD MOOD</small>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#menu">Our Menu</a>
          <a href="#story">Our Story</a>
          <a href="#visit">Visit Us</a>
        </nav>

        <div className="header-actions">
          <button
            className="bag-button"
            onClick={() => setCartOpen((open) => !open)}
          >
            Your bag ({cartCount})
          </button>

          <button
            className="admin-button"
            onClick={() => setModal("login")}
          >
            Admin
          </button>
        </div>
      </header>

      {admin ? (
        <section className="admin-page">
          <div className="admin-heading">
            <div>
              <p className="eyebrow">CAFÉ MANAGEMENT</p>
              <h1>Welcome, {admin.name || "Admin"}!</h1>
              <p>You are signed in to the Brew & Bites admin account.</p>
            </div>
            <div className="header-actions">
              <button className="button button-outline" type="button" onClick={refreshOrders} disabled={ordersLoading}>
                {ordersLoading ? "Refreshing..." : "Refresh orders"}
              </button>
              <button className="button button-dark" type="button" onClick={logout}>
                Sign out
              </button>
            </div>
          </div>

          <section className="admin-panel-card">
            <div className="panel-title">
              <div>
                <h2>Customer orders</h2>
                <p>Recent orders with their items, quantities and current status.</p>
              </div>
              <span className="count-pill">{orders.length} orders</span>
            </div>
            {ordersError && <div className="notice error" role="alert">{ordersError}</div>}
            {ordersLoading && orders.length === 0 ? (
              <div className="empty-admin">Loading customer orders...</div>
            ) : orders.length === 0 && !ordersError ? (
              <div className="empty-admin">No customer orders yet. New orders will appear here.</div>
            ) : (
              <div className="admin-list">
                {orders.map((order) => (
                  <article className="record-row" key={order._id}>
                    <div className="record-main">
                      <div className="record-heading">
                        <div>
                          <strong>{order.customerName}</strong>
                          <span>{order.phone}</span>
                        </div>
                        <span className={`status-pill status-${String(order.status).toLowerCase()}`}>
                          {order.status}
                        </span>
                      </div>
                      <ul className="order-item-list">
                        {order.items.map((item, index) => (
                          <li key={`${order._id}-${item.menuItem || item.name}-${index}`}>
                            <span>{item.name} × {item.quantity}</span>
                            <strong>{money(Number(item.price) * Number(item.quantity))}</strong>
                          </li>
                        ))}
                      </ul>
                      {order.notes && <p className="order-notes">Note: {order.notes}</p>}
                      <div className="record-meta">
                        <span>{order.createdAt ? new Date(order.createdAt).toLocaleString() : "Date unavailable"}</span>
                        <strong>Total: {money(order.total)}</strong>
                      </div>
                    </div>
                    <label className="order-status-control">
                      Update status
                      <select
                        value={order.status}
                        disabled={updatingOrderId === order._id}
                        onChange={(event) => updateOrderStatus(order._id, event.target.value)}
                      >
                        {["Pending", "Preparing", "Ready", "Completed", "Cancelled"].map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </label>
                  </article>
                ))}
              </div>
            )}
          </section>
        </section>
      ) : (
        <main>
          <section className="hero" id="home">
            <div className="hero-copy">
              <div className="pure-veg-pill">
                🟢 100% PURE VEGETARIAN
              </div>
              <p className="eyebrow">YOUR NEIGHBOURHOOD HAPPY PLACE</p>
              <h1>
                Good coffee.
                <br />
                <i>Great company.</i>
                <br />
                Lovely little bites.
              </h1>
              <p>
                Colourful cravings, feel-good vegetarian bites and happy
                sips — served with a little extra joy.
              </p>
              <a className="button button-dark" href="#menu">
                Explore the menu ↗
              </a>
            </div>
            <div className="hero-visual">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85"
                alt="Freshly prepared coffee and café treats"
              />
              <div className="floating-card">
                <span>✦</span>
                <div>
                  <strong>Made fresh, made with love</strong>
                  <small>Your happy place, every day</small>
                </div>
              </div>
            </div>
          </section>

          <div className="trust-strip">
            <span>100% VEGETARIAN</span>
            <span>FRESHLY PREPARED</span>
            <span>COFFEE, BITES & GOOD VIBES</span>
          </div>

          <section className="menu-section section-pad" id="menu">
            <div className="section-heading">
              <div>
                <p className="eyebrow"><i className="eyebrow-line" /> MADE FOR YOUR CRAVINGS</p>
                <h2>{categoryCopy[category].title}</h2>
              </div>
              <p>{categoryCopy[category].text}</p>
            </div>

            <div className="menu-tools">
              <div className="filters" aria-label="Filter menu by category">
                {Object.keys(categoryCopy).map((name) => (
                  <button
                    key={name}
                    type="button"
                    className={category === name ? "filter active" : "filter"}
                    onClick={() => setCategory(name)}
                  >
                    {name === "All" ? "All items" : name}
                  </button>
                ))}
              </div>
              <label className="search-box">
                <span aria-hidden="true">⌕</span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Find your craving..."
                  aria-label="Search menu"
                />
              </label>
            </div>

            {apiStatus !== "connected" && (
              <div className={apiStatus === "offline" ? "notice error" : "notice"} role="status">
                {apiStatus === "offline"
                  ? "The backend is unavailable. Showing sample menu items; ordering is disabled."
                  : "Connecting to the café menu..."}
              </div>
            )}

            <div className="menu-grid">
              {filtered.map((item) => (
                <article className="food-card" key={item._id}>
                  <div className="food-image-wrap">
                    <img src={item.image} alt={item.name} loading="lazy" />
                    <span className="food-tag">
                      {item.vegetarian && <span className="veg-dot" />}
                      {item.tag || "Fresh pick"}
                    </span>
                  </div>
                  <div className="food-info">
                    <div className="food-meta">
                      <h3>{item.name}</h3>
                      <strong>{money(item.price)}</strong>
                    </div>
                    <p>{item.description}</p>
                    <div className="food-bottom">
                      <span className="rating">★ 4.8 <small>· {item.category}</small></span>
                      <button
                        className="add-button"
                        type="button"
                        onClick={() => addToCart(item)}
                        aria-label={`Add ${item.name} to your bag`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="empty-state">No menu items match your search.</div>
            )}
            <div className="menu-bottom">
              <p>Good food tastes even better together.</p>
              <span className="fine-print">
                {apiStatus === "connected" ? `${menu.length} items from our menu` : "Sample menu"}
              </span>
            </div>
          </section>

          <section className="story-section section-pad" id="story">
            <div className="story-mark" aria-hidden="true">☕</div>
            <div className="story-copy">
              <p className="eyebrow"><i className="eyebrow-line" /> A LITTLE ABOUT US</p>
              <h2>Good food. Good mood. Good company.</h2>
              <p>
                Brew & Bites is your neighbourhood spot for freshly brewed coffee,
                feel-good vegetarian food and the little moments worth slowing down for.
              </p>
            </div>
            <div className="story-stats">
              <strong>Fresh, every day</strong>
              <span>Thoughtful bites and happy sips, made for sharing.</span>
            </div>
          </section>

          <section className="visit-section section-pad" id="visit">
            <div className="visit-copy">
              <p className="eyebrow"><i className="eyebrow-line" /> COME SAY HELLO</p>
              <h2>Your next happy place is right here.</h2>
              <p>Drop by for a coffee, a quick bite or a catch-up with your favourite people.</p>
            </div>
            <div className="visit-details">
              <strong>Brew & Bites Café</strong>
              <span>Open daily · 9:00 AM – 10:00 PM</span>
              <span>Fresh coffee, vegetarian bites and a warm welcome.</span>
            </div>
          </section>
        </main>
      )}

      {cartOpen && <button className="overlay" aria-label="Close bag" onClick={() => setCartOpen(false)} />}
      <aside className={cartOpen ? "cart-drawer open" : "cart-drawer"} aria-label="Shopping bag">
        <div className="drawer-head">
          <h2>Your bag ({cartCount})</h2>
          <button className="modal-close" type="button" onClick={() => setCartOpen(false)} aria-label="Close bag">×</button>
        </div>
        {cartItems.length ? (
          <>
            <div className="cart-list">
              {cartItems.map(({ item, quantity }) => (
                <div className="cart-row" key={item._id}>
                  <img src={item.image} alt="" />
                  <div>
                    <strong>{item.name}</strong>
                    <small>{money(item.price)} each</small>
                    <div className="quantity">
                      <button type="button" onClick={() => changeQuantity(item._id, -1)} aria-label={`Remove one ${item.name}`}>−</button>
                      <span>{quantity}</span>
                      <button type="button" onClick={() => changeQuantity(item._id, 1)} aria-label={`Add one ${item.name}`}>+</button>
                    </div>
                  </div>
                  <b>{money(Number(item.price) * quantity)}</b>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <div className="order-total"><span>Subtotal</span><strong>{money(cartTotal)}</strong></div>
              <p className="fine-print">Payment is not collected online.</p>
              <button
                className="button button-dark full-button"
                type="button"
                disabled={apiStatus !== "connected"}
                onClick={() => { setCartOpen(false); setModal("order"); }}
              >
                Continue to order
              </button>
            </div>
          </>
        ) : (
          <div className="cart-empty"><p>Your bag is empty.</p><button className="text-link" type="button" onClick={() => setCartOpen(false)}>Explore the menu</button></div>
        )}
      </aside>

      {modal && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setModal(""); }}>
          <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close" type="button" onClick={() => setModal("")} aria-label="Close dialog">×</button>
            {modal === "order" ? (
              <>
                <div className="form-top">
                  <span className="brand-icon" aria-hidden="true">☕</span>
                  <div>
                    <p className="eyebrow">ONE LAST THING</p>
                    <h2 id="modal-title">Your order details</h2>
                  </div>
                </div>
                <form className="admin-form" onSubmit={submitOrder}>
                  <label>Name
                    <input required minLength="2" value={orderForm.customerName} onChange={(event) => setOrderForm({ ...orderForm, customerName: event.target.value })} />
                  </label>
                  <label>Phone
                    <input required type="tel" value={orderForm.phone} onChange={(event) => setOrderForm({ ...orderForm, phone: event.target.value })} />
                  </label>
                  <label>Note for the café (optional)
                    <textarea value={orderForm.notes} onChange={(event) => setOrderForm({ ...orderForm, notes: event.target.value })} />
                  </label>
                  <div className="order-total"><span>Order total</span><strong>{money(cartTotal)}</strong></div>
                  <p className="fine-print">This sends an order request to the café. No online payment is taken.</p>
                  <button className="button button-dark full-button" disabled={busy || apiStatus !== "connected"}>
                    {busy ? "Sending request..." : "Send order request"}
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="form-top">
                  <span className="brand-icon" aria-hidden="true">☕</span>
                  <div>
                    <p className="eyebrow">TEAM ACCESS</p>
                    <h2 id="modal-title">Admin sign in</h2>
                  </div>
                </div>
                <form className="admin-form" onSubmit={login}>
                  <label>Email
                    <input type="email" autoComplete="username" required value={loginForm.email} onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })} />
                  </label>
                  <label>Password
                    <input type="password" autoComplete="current-password" required value={loginForm.password} onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })} />
                  </label>
                  <button className="button button-dark full-button" disabled={busy}>
                    {busy ? "Signing in..." : "Sign in"}
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
      )}

      <footer className="footer-brand">
        <a className="brand" href="#home">☕ Brew <em>&</em> Bites</a>
        <span>Good food, good mood — made fresh every day.</span>
        <a href="#menu">Back to menu ↑</a>
      </footer>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}