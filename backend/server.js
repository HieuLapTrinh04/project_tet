const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middleware/authMiddleware");
const isAdmin = require("./middleware/isAdmin");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1204",
  database: "ecommerce_db",
});

db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("MySQL connected");
  }
});

// Thêm sản phẩm
app.post("/products", verifyToken, isAdmin, (req, res) => {
  const { name, description, price, stock, image } = req.body;
  // Validate input
  if (!name || !description || !price || !stock || !image) {
    return res.status(400).send("Missing required fields");
  }
  const query =
    "INSERT INTO Products (name, description, price, stock, image) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [name, description, price, stock, image], (err, result) => {
    console.log(req.body);
    if (err) return res.status(500).send("Lỗi khi thêm sản phẩm", err.message);
    res.status(201).send("Thêm sản phẩm thành công!");
  });
});

// Xem danh sách sản phẩm
app.get("/products", (req, res) => {
  const query = "SELECT * FROM Products";
  db.query(query, (err, results) => {
    if (err) return res.status(500).send("Lỗi khi lấy danh sách sản phẩm");
    res.json(results);
  });
});

app.get("/admin/products", verifyToken, isAdmin, (req, res) => {
  const query = "SELECT * FROM Products";
  db.query(query, (err, results) => {
    if (err) return res.status(500).send("Lỗi khi lấy danh sách sản phẩm");
    res.json(results);
  });
});

// Lấy danh sách sản phẩm trang 1 (sản phẩm có chữ "áo dài")
app.get("/products/pageFashion", (req, res) => {
  const query = 'SELECT * FROM Products WHERE name LIKE "%áo dài%"';
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", err);
      return res.status(500).send("Lỗi khi lấy danh sách sản phẩm");
    }
    res.json(results);
  });
});

// Lấy danh sách sản phẩm trang 2 (sản phẩm có chữ "Giày")
app.get("/products/pageGiay", (req, res) => {
  const query = 'SELECT * FROM Products WHERE name LIKE "%Giày%"';
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", err);
      return res.status(500).send("Lỗi khi lấy danh sách sản phẩm");
    }
    res.json(results);
  });
});

// Lấy danh sách sản phẩm trang 3 (sản phẩm có chữ "Quà")
app.get("/products/pageQuaTet", (req, res) => {
  const query = 'SELECT * FROM Products WHERE name LIKE "%Quà%"';
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", err);
      return res.status(500).send("Lỗi khi lấy danh sách sản phẩm");
    }
    res.json(results);
  });
});

// Xóa sản phẩm
app.delete("/products/:id", verifyToken, isAdmin, (req, res) => {
  const productId = req.params.id; // Lấy ID từ tham số URL

  const query = "DELETE FROM Products WHERE id = ?";
  db.query(query, [productId], (err, result) => {
    if (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
      return res.status(500).send("Lỗi khi xóa sản phẩm");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("Sản phẩm không tồn tại");
    }

    res.status(200).send("Xóa sản phẩm thành công!");
  });
});

// API thanh toán
app.post("/checkout", verifyToken, (req, res) => {
  let { cartId, totalPrice } = req.body;
  const userId = req.user.id; // ✅ QUAN TRỌNG

  console.log("Dữ liệu nhận được:", req.body, "User:", userId);

  if (!Array.isArray(cartId)) {
    cartId = [cartId];
  }

  if (!cartId.length || !totalPrice || totalPrice <= 0) {
    return res.status(400).json({ message: "Dữ liệu không hợp lệ!" });
  }

  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi transaction!" });
    }

    const insertOrderQuery = `
      INSERT INTO orders (user_id, cart_id, total_price, created_at)
      VALUES (?, ?, ?, NOW())
    `;

    db.query(
      insertOrderQuery,
      [userId, cartId.join(","), totalPrice], // ✅ ĐÚNG 3 GIÁ TRỊ
      (err, result) => {
        if (err) {
          console.error("Lỗi insert orders:", err);
          return db.rollback(() =>
            res.status(500).json({ message: "Lỗi khi thêm đơn hàng!" })
          );
        }

        const userId = req.user.id;

        const deleteCartQuery = "DELETE FROM Cart WHERE user_id = ?";

        db.query(deleteCartQuery, [userId], (err, result) => {
          if (err) {
            console.error("Lỗi khi xóa giỏ hàng:", err);
            return db.rollback(() => {
              res.status(500).json({ message: "Lỗi khi xóa giỏ hàng!" });
            });
          }

          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                res.status(500).json({ message: "Lỗi commit!" });
              });
            }
            res.status(200).json({ message: "Thanh toán thành công!" });
          });
        });
      }
    );
  });
});

//Lấy đơn hàng
app.get("/orders", verifyToken, (req, res) => {
  // chỉ admin được xem
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Không có quyền truy cập" });
  }

  const sql = `
    SELECT 
      o.id,
      u.username AS user,
      o.total_price AS total
    FROM orders o
    JOIN users u ON o.user_id = u.id
    ORDER BY o.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Lỗi lấy orders:", err);
      return res.status(500).json({ message: "Lỗi server" });
    }

    res.json(results);
  });
});

// Lấy danh sách sản phẩm trong giỏ hàng
app.get("/cart", verifyToken, (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT * FROM Cart WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi lấy giỏ hàng" });
      }
      res.json(results);
    }
  );
});


// Thêm sản phẩm vào cart
app.post("/cart", verifyToken, (req, res) => {
  const { product_id, name, price, image, quantity } = req.body;
  const userId = req.user.id; // 👈 LẤY USER ĐANG ĐĂNG NHẬP

  // 1️⃣ Kiểm tra sản phẩm có tồn tại không
  const checkProductQuery = "SELECT id FROM Products WHERE id = ?";
  db.query(checkProductQuery, [product_id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi kiểm tra sản phẩm" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Sản phẩm không tồn tại" });
    }

    // 2️⃣ Kiểm tra sản phẩm đã có trong giỏ hàng của USER CHƯA
    const checkCartQuery =
      "SELECT id, quantity FROM Cart WHERE product_id = ? AND user_id = ?";
    db.query(checkCartQuery, [product_id, userId], (err, cartResults) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi kiểm tra giỏ hàng" });
      }

      if (cartResults.length > 0) {
        // 3️⃣ Nếu đã có → cộng số lượng
        const updateQuery =
          "UPDATE Cart SET quantity = quantity + ? WHERE product_id = ? AND user_id = ?";
        db.query(updateQuery, [quantity, product_id, userId], (err) => {
          if (err) {
            return res.status(500).json({ message: "Lỗi cập nhật giỏ hàng" });
          }
          res.json({ message: "Cập nhật số lượng thành công!" });
        });
      } else {
        // 4️⃣ Nếu chưa có → thêm mới
        const insertQuery = `
          INSERT INTO Cart (user_id, product_id, name, price, image, quantity)
          VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(
          insertQuery,
          [userId, product_id, name, price, image, quantity],
          (err) => {
            if (err) {
              return res.status(500).json({ message: "Lỗi thêm vào giỏ hàng" });
            }
            res.status(201).json({ message: "Thêm vào giỏ hàng thành công!" });
          }
        );
      }
    });
  });
});

// Xóa sản phẩm khỏi giỏ hàng
app.delete("/cart/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  const deleteQuery = "DELETE FROM Cart WHERE id = ?";
  db.query(deleteQuery, [id], (err) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi xóa sản phẩm!", error: err });
    }
    res.json({ message: "Xóa sản phẩm thành công!" });
  });
});

// Cập nhật số lượng sản phẩm
app.put("/cart/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const updateQuery = "UPDATE Cart SET quantity = ? WHERE id = ?";
  db.query(updateQuery, [quantity, id], (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Lỗi cập nhật số lượng!", error: err });
    }
    res.json({ message: "Cập nhật số lượng thành công!" });
  });
});

// Đăng ký
app.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const query =
    "INSERT INTO Users (username, email, password, role) VALUES (?, ?, ?, ?)";
  db.query(query, [username, email, hashedPassword, role || "user"], (err) => {
    if (err) return res.status(500).send("Lỗi");
    res.send("OK");
  });
});

// Đăng nhập
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM Users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Lỗi server:", err);
      return res
        .status(500)
        .json({ message: "Lỗi server, vui lòng thử lại sau" });
    }

    // Trường hợp email không tồn tại
    if (results.length === 0) {
      console.log("Email không tồn tại:", email);
      return res.status(401).json({ message: "Email không tồn tại" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    // Trường hợp mật khẩu sai
    if (!isMatch) {
      console.log("Sai mật khẩu cho email:", email);
      return res.status(401).json({ message: "Sai mật khẩu" });
    }

    // Trả về token khi thông tin chính xác
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role, // 👈 THÊM ROLE
      },
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    console.log("Đăng nhập thành công:", email);
    return res
      .status(200)
      .json({ token, role: user.role, message: "Đăng nhập thành công" });
  });
});

app.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Đã đăng nhập",
    user: req.user,
  });
});

app.get("/admin/dashboard", verifyToken, isAdmin, (req, res) => {
  res.json({
    message: "Chào admin",
  });
});

app.get("/users", (req, res) => {
  db.query("SELECT id,username,email,role FROM users", (err, rs) => {
    if (err) return res.sendStatus(500);
    res.json(rs);
  });
});

// Sửa sản phẩm (ADMIN)
app.put("/products/:id", verifyToken, isAdmin, (req, res) => {
  const { name, description, price, stock, image } = req.body;
  const { id } = req.params;

  const sql = `
    UPDATE Products 
    SET name=?, description=?, price=?, stock=?, image=?
    WHERE id=?
  `;

  db.query(sql, [name, description, price, stock, image, id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Lỗi sửa sản phẩm" });
    }
    res.json({ message: "Cập nhật sản phẩm thành công" });
  });
});


app.put("/users/:id/role", verifyToken, isAdmin,(req, res) => {
  db.query(
    "UPDATE users SET role = ? WHERE id = ?",
    [req.body.role, req.params.id],
    (err) => {
      if (err) return res.sendStatus(500);
      res.send("Updated");
    }
  );
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM Products WHERE id = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).send("Lỗi server");
      if (results.length === 0)
        return res.status(404).send("Không tìm thấy sản phẩm");

      res.json(results[0]);
    }
  );
});

app.get("/products/search", (req, res) => {
  const { q } = req.query;

  db.query(
    "SELECT * FROM Products WHERE name LIKE ?",
    [`%${q}%`],
    (err, results) => {
      if (err) return res.status(500).send("Lỗi tìm kiếm");
      res.json(results);
    }
  );
});


app.get("/admin/stats", verifyToken, isAdmin, (req, res) => {
  const stats = {};

  db.query("SELECT COUNT(*) totalUsers FROM users", (err, rs1) => {
    stats.users = rs1[0].totalUsers;

    db.query("SELECT COUNT(*) totalOrders FROM orders", (err, rs2) => {
      stats.orders = rs2[0].totalOrders;

      db.query("SELECT SUM(total_price) revenue FROM orders", (err, rs3) => {
        stats.revenue = rs3[0].revenue || 0;
        res.json(stats);
      });
    });
  });
});

// Chạy server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
