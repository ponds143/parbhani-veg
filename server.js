const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DATA_FILE = path.join(__dirname, 'items.json');
const ORDERS_FILE = path.join(__dirname, 'orders.json');
const UPI_ID = "9767509494@ybl";
const PAYMENT_RECEIVER_NAME = "Priyanka Pandurang Shinde";
const GOOGLEPAY_PACKAGE_ID = "com.google.android.apps.nbu.paisa.user";

const fullItems = [
  // --- भाज्या (Vegetables - 37+ Items) ---
  { id: 1, name: 'टोमॅटो (Tomato)', price: 30, unit: 'किलो', category: 'veg', available: true },
  { id: 2, name: 'कांदा (Onion)', price: 25, unit: 'किलो', category: 'veg', available: true },
  { id: 3, name: 'बटाटा (Potato)', price: 30, unit: 'किलो', category: 'veg', available: true },
  { id: 4, name: 'वांगी (Brinjal)', price: 40, unit: 'किलो', category: 'veg', available: true },
  { id: 5, name: 'भेंडी (Lady Finger)', price: 40, unit: 'किलो', category: 'veg', available: true },
  { id: 6, name: 'गवार (Cluster Beans)', price: 50, unit: 'किलो', category: 'veg', available: true },
  { id: 7, name: 'फ्लॉवर (Cauliflower)', price: 40, unit: 'किलो', category: 'veg', available: true },
  { id: 8, name: 'पत्ताकोबी (Cabbage)', price: 30, unit: 'किलो', category: 'veg', available: true },
  { id: 9, name: 'मेथी (Methi)', price: 15, unit: 'जुडी', category: 'veg', available: true },
  { id: 10, name: 'कोथिंबीर (Coriander)', price: 10, unit: 'जुडी', category: 'veg', available: true },
  { id: 11, name: 'पालक (Spinach)', price: 15, unit: 'जुडी', category: 'veg', available: true },
  { id: 12, name: 'लसूण (Garlic)', price: 200, unit: 'किलो', category: 'veg', available: true },
  { id: 13, name: 'आले (Ginger)', price: 120, unit: 'किलो', category: 'veg', available: true },
  { id: 14, name: 'हिरवी मिरची (Green Chilli)', price: 50, unit: 'किलो', category: 'veg', available: true },
  { id: 15, name: 'शेवगा (Drumstick)', price: 60, unit: 'किलो', category: 'veg', available: true },
  { id: 16, name: 'दुधी भोपळा (Bottle Gourd)', price: 30, unit: 'किलो', category: 'veg', available: true },
  { id: 17, name: 'कारले (Bitter Gourd)', price: 50, unit: 'किलो', category: 'veg', available: true },
  { id: 18, name: 'काकडी (Cucumber)', price: 40, unit: 'किलो', category: 'veg', available: true },
  { id: 19, name: 'गाजर (Carrot)', price: 40, unit: 'किलो', category: 'veg', available: true },
  { id: 20, name: 'लिंबू (Lemon)', price: 20, unit: 'पावशेर', category: 'veg', available: true },
  { id: 21, name: 'बिट (Beetroot)', price: 40, unit: 'किलो', category: 'veg', available: true },
  { id: 22, name: 'मुळा (Radish)', price: 30, unit: 'किलो', category: 'veg', available: true },
  { id: 23, name: 'शिमला मिरची (Capsicum)', price: 60, unit: 'किलो', category: 'veg', available: true },
  { id: 24, name: 'पावटा (Green Peas)', price: 80, unit: 'किलो', category: 'veg', available: true },
  { id: 25, name: 'फरसबी (French Beans)', price: 60, unit: 'किलो', category: 'veg', available: true },
  { id: 26, name: 'पडवळ (Snake Gourd)', price: 40, unit: 'किलो', category: 'veg', available: true },
  { id: 27, name: 'घेवडा (Broad Beans)', price: 50, unit: 'किलो', category: 'veg', available: true },
  { id: 28, name: 'घोसावळी (Ridge Gourd)', price: 40, unit: 'किलो', category: 'veg', available: true },
  { id: 29, name: 'कच्चा केळी (Raw Banana)', price: 40, unit: 'डझन', category: 'veg', available: true },
  { id: 30, name: 'रताळे (Sweet Potato)', price: 50, unit: 'किलो', category: 'veg', available: true },
  { id: 31, name: 'सुरण (Elephant Foot Yam)', price: 60, unit: 'किलो', category: 'veg', available: true },
  { id: 32, name: 'अळू पाने (Colocasia Leaves)', price: 20, unit: 'जुडी', category: 'veg', available: true },
  { id: 33, name: 'पुदिना (Mint Leaves)', price: 10, unit: 'जुडी', category: 'veg', available: true },
  { id: 34, name: 'कढीपत्त्याची पाने (Curry Leaves)', price: 10, unit: 'जुडी', category: 'veg', available: true },
  { id: 35, name: 'लाल भोपळा (Pumpkin)', price: 30, unit: 'किलो', category: 'veg', available: true },
  { id: 36, name: 'कोंवळी चवळी (Chawli Beans)', price: 50, unit: 'किलो', category: 'veg', available: true },
  { id: 37, name: 'मटार दाणे (Green Peas Peeled)', price: 100, unit: 'किलो', category: 'veg', available: true },

  // --- फळे (Fruits - 20 Items) ---
  { id: 101, name: '🍎 सफरचंद (Apple)', price: 160, unit: 'किलो', category: 'fruit', available: true },
  { id: 102, name: '🍌 केळी (Banana)', price: 50, unit: 'डझन', category: 'fruit', available: true },
  { id: 103, name: '🍊 संत्री (Orange)', price: 80, unit: 'किलो', category: 'fruit', available: true },
  { id: 104, name: '🍈 मोसंबी (Sweet Lime)', price: 90, unit: 'किलो', category: 'fruit', available: true },
  { id: 105, name: '🍇 द्राक्षे (Grapes)', price: 100, unit: 'किलो', category: 'fruit', available: true },
  { id: 106, name: '🍉 टरबूज (Watermelon)', price: 40, unit: 'किलो', category: 'fruit', available: true },
  { id: 107, name: '🍈 खरबूज (Muskmelon)', price: 50, unit: 'किलो', category: 'fruit', available: true },
  { id: 108, name: '🥭 आंबा (Mango)', price: 300, unit: 'डझन', category: 'fruit', available: true },
  { id: 109, name: '🍍 अननस (Pineapple)', price: 60, unit: 'नग', category: 'fruit', available: true },
  { id: 110, name: '🥭 पपई (Papaya)', price: 40, unit: 'किलो', category: 'fruit', available: true },
  { id: 111, name: '🟤 चिकू (Chiku)', price: 60, unit: 'किलो', category: 'fruit', available: true },
  { id: 112, name: '🔴 डाळिंब (Pomegranate)', price: 140, unit: 'किलो', category: 'fruit', available: true },
  { id: 113, name: '🍏 पेरू (Guava)', price: 60, unit: 'किलो', category: 'fruit', available: true },
  { id: 114, name: '🥝 किवी (Kiwi)', price: 100, unit: 'पॅक', category: 'fruit', available: true },
  { id: 115, name: '🍓 स्ट्रॉबेरी (Strawberry)', price: 80, unit: 'बॉक्स', category: 'fruit', available: true },
  { id: 116, name: '🟡 सीताफळ (Custard Apple)', price: 100, unit: 'किलो', category: 'fruit', available: true },
  { id: 117, name: '🥥 नारळ (Coconut)', price: 30, unit: 'नग', category: 'fruit', available: true },
  { id: 118, name: '🍒 जांभूळ (Jamun)', price: 120, unit: 'किलो', category: 'fruit', available: true },
  { id: 119, name: '🍑 अंजीर (Fig)', price: 150, unit: 'किलो', category: 'fruit', available: true },
  { id: 120, name: '🍒 बोरं (Ber)', price: 40, unit: 'किलो', category: 'fruit', available: true }
];

// जुनी फाईल जबरदस्ती ओव्हरराईट करून नवीन संपूर्ण लिस्ट लिहिणे
fs.writeFileSync(DATA_FILE, JSON.stringify(fullItems, null, 2));
if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));

function getItems() { return JSON.parse(fs.readFileSync(DATA_FILE)); }
function getOrders() { return JSON.parse(fs.readFileSync(ORDERS_FILE)); }
function saveOrder(order) {
  const orders = getOrders();
  orders.push(order);
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

app.get('/api/items', (req, res) => res.json(getItems()));

app.post('/api/order', (req, res) => {
  const newOrder = {
    id: Date.now(),
    date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    ...req.body
  };
  saveOrder(newOrder);
  res.json({ success: true, orderId: newOrder.id });
});

app.get('/api/orders', (req, res) => res.json(getOrders()));

app.get('/admin', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="mr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ॲडमिन पॅनल - ऑर्डर्स डेटाबेस</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f0f2f5; padding: 15px; margin: 0; }
    h1 { color: #1565c0; text-align: center; }
    .order-card { background: white; border-radius: 8px; padding: 15px; margin-bottom: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .order-header { font-weight: bold; font-size: 16px; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 8px; color: #2e7d32; }
    .paid-badge { background: #2e7d32; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px; float: right; }
    .item-list { font-size: 14px; margin: 8px 0; color: #444; }
  </style>
</head>
<body>
  <h1>📊 सर्व ऑर्डर्सचा डेटाबेस (Admin)</h1>
  <div id="orders-list">लोड होत आहे...</div>

  <script>
    fetch('/api/orders')
      .then(res => res.json())
      .then(orders => {
        const container = document.getElementById('orders-list');
        if (orders.length === 0) {
          container.innerHTML = '<h3>अजून कोणतीही ऑर्डर आलेली नाही.</h3>';
          return;
        }
        container.innerHTML = '';
        orders.reverse().forEach(o => {
          let itemsHtml = '';
          o.items.forEach(i => { itemsHtml += '<div>• ' + i.name + ' - ' + i.qty + ' ' + i.unit + '</div>'; });
          
          const html = '<div class="order-card">' +
            '<div class="order-header">ऑर्डर ID: #' + o.id + ' <span class="paid-badge">PAID</span></div>' +
            '<div><b>तारीख:</b> ' + o.date + '</div>' +
            '<div><b>नाव:</b> ' + o.name + '</div>' +
            '<div><b>मोबाईल:</b> ' + o.mobile + '</div>' +
            '<div><b>पत्ता:</b> ' + o.address + '</div>' +
            '<div><b>UTR / Trans ID:</b> <code style="color:blue;">' + (o.utr || 'N/A') + '</code></div>' +
            '<div class="item-list"><b>वस्तू:</b><br>' + itemsHtml + '</div>' +
            '<div style="font-size:16px; color:#d32f2f; font-weight:bold; margin-top:5px;">एकूण बिल: ₹' + o.total + '</div>' +
          '</div>';
          container.innerHTML += html;
        });
      });
  </script>
</body>
</html>
  `);
});

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="mr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>परभणी ताजी भाजी व फळे</title>
  <style>
    body { font-family: Arial, sans-serif; background: #eef2f5; margin: 0; padding: 12px; }
    h1 { text-align: center; color: #2e7d32; margin: 5px 0; }
    .search-box { width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #ccc; font-size: 16px; box-sizing: border-box; margin-bottom: 10px; }
    .tabs { display: flex; gap: 8px; margin-bottom: 15px; }
    .tab-btn { flex: 1; padding: 10px; border: none; border-radius: 6px; font-weight: bold; background: #ddd; cursor: pointer; }
    .tab-btn.active { background: #2e7d32; color: white; }
    .card { background: white; border-radius: 8px; padding: 12px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .veg-info { font-size: 16px; font-weight: bold; }
    .veg-price { color: #e65100; font-size: 14px; }
    .btn-group { display: flex; align-items: center; gap: 8px; }
    .btn { background: #2e7d32; color: white; border: none; width: 30px; height: 30px; font-size: 16px; border-radius: 5px; cursor: pointer; }
    .btn-minus { background: #c62828; }
    .qty { font-weight: bold; min-width: 18px; text-align: center; }
    .form-section { background: white; border-radius: 8px; padding: 12px; margin-top: 15px; }
    input, textarea { width: 100%; padding: 10px; margin: 6px 0; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box; }
    .pay-btn { background: #1976d2; color: white; font-size: 16px; font-weight: bold; padding: 10px; border: none; border-radius: 5px; width: 100%; cursor: pointer; margin: 8px 0; }
    .submit-btn { background: #25D366; color: white; font-size: 18px; font-weight: bold; padding: 12px; border: none; border-radius: 5px; width: 100%; cursor: pointer; margin-top: 8px; }
    .pay-box { background: #e3f2fd; border: 1px dashed #1976d2; padding: 10px; border-radius: 8px; margin: 10px 0; text-align: center; }
  </style>
</head>
<body>
  <h1>🥦 परभणी भाजीपाला व फळे 🍎</h1>
  <input type="text" id="search" class="search-box" placeholder="🔍 भाजी किंवा फळ शोधा..." onkeyup="render()">
  
  <div class="tabs">
    <button class="tab-btn active" id="tab-all" onclick="setCategory('all')">सर्व</button>
    <button class="tab-btn" id="tab-veg" onclick="setCategory('veg')">🥦 भाज्या</button>
    <button class="tab-btn" id="tab-fruit" onclick="setCategory('fruit')">🍎 फळे</button>
  </div>

  <div id="container"></div>

  <div class="form-section">
    <h3>ऑर्डर व ऑनलाइन पेमेंट</h3>
    <input type="text" id="name" placeholder="तुमचे नाव" required>
    <input type="tel" id="mobile" placeholder="मोबाईल नंबर" required>
    <textarea id="address" placeholder="संपूर्ण पत्ता" rows="2" required></textarea>
    
    <h3 style="color:#2e7d32; margin-bottom: 5px;">एकूण बिल: ₹<span id="total-price">0</span></h3>

    <div class="pay-box">
      <div style="font-weight:bold; color:#0d47a1;">पेमेंट केल्याशिवाय ऑर्डर स्वीकारली जाणार नाही</div>
      <button class="pay-btn" onclick="payNow()">💳 ₹<span id="pay-amt">0</span> ऑनलाईन भरण्यासाठी इथे क्लिक करा</button>
      <input type="text" id="utr" placeholder="पेमेंट केल्यावर मिळणारा UTR / Trans ID टाका" required>
    </div>

    <button class="submit-btn" onclick="submitOrder()">WhatsApp वर ऑर्डर लॉक करा</button>
  </div>

  <script>
    let items = [];
    let cart = {};
    let currentCat = 'all';
    const upiId = "${UPI_ID}";
    const paymentReceiverName = "${PAYMENT_RECEIVER_NAME}";
    const googlePayPackageId = "${GOOGLEPAY_PACKAGE_ID}";

    function buildPhonePeLink(amount) {
      return "phonepe://pay?pa=" + upiId
        + "&pn=" + encodeURIComponent(paymentReceiverName)
        + "&am=" + encodeURIComponent(amount)
        + "&cu=INR"
        + "&mode=02";
    }

    function buildGPayIntentLink(amount) {
      return "intent://pay?pa=" + upiId
        + "&pn=" + encodeURIComponent(paymentReceiverName)
        + "&am=" + encodeURIComponent(amount)
        + "&cu=INR"
        + "#Intent;scheme=upi;package=" + googlePayPackageId + ";end";
    }

    function launchWithFallback({
      primaryLink,
      fallbackLink,
      fallbackDelayMs = 1400
    }) {
      let fallbackTimer = null;
      const clearFallback = () => {
        if (fallbackTimer) {
          clearTimeout(fallbackTimer);
          fallbackTimer = null;
        }
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') clearFallback();
      };
      fallbackTimer = setTimeout(() => {
        if (document.visibilityState === 'visible') {
          window.location.href = fallbackLink;
        }
        clearFallback();
      }, fallbackDelayMs);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.location.href = primaryLink;
    }

    function loadItems() {
      fetch('/api/items')
        .then(res => res.json())
        .then(data => { items = data; render(); });
    }

    function setCategory(cat) {
      currentCat = cat;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.getElementById('tab-' + cat).classList.add('active');
      render();
    }

    function render() {
      const q = document.getElementById('search').value.toLowerCase();
      const container = document.getElementById('container');
      container.innerHTML = '';

      items.filter(i => {
        const matchCat = currentCat === 'all' || i.category === currentCat;
        const matchSearch = i.name.toLowerCase().includes(q);
        return matchCat && matchSearch;
      }).forEach(item => {
        cart[item.id] = cart[item.id] || 0;
        const html = '<div class="card">' +
          '<div>' +
            '<div class="veg-info">' + item.name + '</div>' +
            '<div class="veg-price">₹' + item.price + ' / ' + item.unit + '</div>' +
          '</div>' +
          '<div class="btn-group">' +
            '<button class="btn btn-minus" onclick="changeQty(' + item.id + ', -1)">-</button>' +
            '<span class="qty" id="qty-' + item.id + '">' + cart[item.id] + '</span>' +
            '<button class="btn" onclick="changeQty(' + item.id + ', 1)">+</button>' +
          '</div>' +
        '</div>';
        container.innerHTML += html;
      });
    }

    function changeQty(id, delta) {
      cart[id] = Math.max(0, (cart[id] || 0) + delta);
      document.getElementById('qty-' + id).innerText = cart[id];
      calculateTotal();
    }

    function calculateTotal() {
      let total = 0;
      items.forEach(i => { total += (cart[i.id] || 0) * i.price; });
      document.getElementById('total-price').innerText = total;
      document.getElementById('pay-amt').innerText = total;
    }

    function payNow() {
      const total = document.getElementById('total-price').innerText;
      if (total == 0) return alert('कृपया किमान एक भाजी/फळ निवडा!');
      const phonepeLink = buildPhonePeLink(total);
      const gpayLink = buildGPayIntentLink(total);
      launchWithFallback({
        primaryLink: phonepeLink,
        fallbackLink: gpayLink
      });
    }

    function submitOrder() {
      const name = document.getElementById('name').value;
      const mobile = document.getElementById('mobile').value;
      const address = document.getElementById('address').value;
      const utr = document.getElementById('utr').value;
      const total = document.getElementById('total-price').innerText;

      if (!name || !mobile || !address) return alert('नाव, मोबाईल आणि पत्ता भरा!');
      if (!utr) return alert('कृपया आधी ऑनलाईन पेमेंट करा आणि UTR / Trans ID टाका!');

      let orderItems = [];
      let itemsMsg = '';
      items.forEach(i => {
        if (cart[i.id] > 0) {
          orderItems.push({ name: i.name, qty: cart[i.id], unit: i.unit, price: i.price });
          itemsMsg += '• ' + i.name + ' - ' + cart[i.id] + ' ' + i.unit + '%0A';
        }
      });

      if (orderItems.length === 0) return alert('किमान एक वस्तू निवडा!');

      fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, mobile, address, utr, total, items: orderItems })
      }).then(() => {
        const text = "*नवीन कन्फर्म ऑर्डर (PAID ONLINE)*%0A%0A" +
                     "*नाव:* " + encodeURIComponent(name) + "%0A" +
                     "*मोबाईल:* " + encodeURIComponent(mobile) + "%0A" +
                     "*पत्ता:* " + encodeURIComponent(address) + "%0A" +
                     "*UTR / Trans ID:* " + encodeURIComponent(utr) + "%0A%0A" +
                     "*मागवलेली यादी:*%0A" + itemsMsg + "%0A" +
                     "*एकूण भरलेले बिल:* ₹" + total + "%0A" +
                     "*पेमेंट स्टेटस:* ✅ PAID";
        window.open("https://wa.me/919767509494?text=" + text, "_blank");
      });
    }

    loadItems();
  </script>
</body>
</html>
  `);
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
