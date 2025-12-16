const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kết nối MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Minhhieu11012004",
  database: "ecommerce_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database");
});

// Secret Key for JWT
const SECRET_KEY = "your_secret_key";

// Thêm sản phẩm
app.post("/products", (req, res) => {
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
app.delete("/products/:id", (req, res) => {
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
app.post('/checkout', (req, res) => {
    let { cartId, totalPrice } = req.body;
    
    console.log('Dữ liệu nhận được:', req.body); // Log để debug
    
    // Chuyển cartId thành array nếu là số đơn
    if (!Array.isArray(cartId)) {
        cartId = [cartId];
    }
    
    // Validate dữ liệu
    if (!cartId || cartId.length === 0 || !totalPrice || totalPrice <= 0) {
        return res.status(400).json({ message: 'Dữ liệu không hợp lệ!' });
    }

    db.beginTransaction((err) => {
        if (err) {
            console.error('Lỗi khi bắt đầu giao dịch:', err);
            return res.status(500).json({ message: 'Lỗi khi xử lý thanh toán!' });
        }

        // Lưu thông tin thanh toán vào bảng Orders
        const insertOrderQuery = 'INSERT INTO Orders (cart_id, total_price, created_at) VALUES (?, ?, NOW())';
        db.query(insertOrderQuery, [cartId.join(','), totalPrice], (err, result) => {
            if (err) {
                console.error('Lỗi khi thêm đơn hàng:', err);
                return db.rollback(() => {
                    res.status(500).json({ message: 'Lỗi khi thêm đơn hàng!' });
                });
            }

            // Xóa giỏ hàng sau khi thanh toán
            const deleteALLQuery = `DELETE FROM Cart WHERE id IN (${cartId.map(() => '?').join(',')})`;
            db.query(deleteALLQuery, cartId, (err, result) => {
                if (err) {
                    console.error('Lỗi khi xóa giỏ hàng:', err);
                    return db.rollback(() => {
                        res.status(500).json({ message: 'Lỗi khi xóa giỏ hàng!' });
                    });
                }

                if (result.affectedRows === 0) {
                    console.error('Giỏ hàng không tồn tại:', cartId);
                    return db.rollback(() => {
                        res.status(400).json({ message: 'Giỏ hàng không tồn tại!' });
                    });
                }

                // Hoàn tất giao dịch
                db.commit((err) => {
                    if (err) {
                        console.error('Lỗi khi commit giao dịch:', err);
                        return db.rollback(() => {
                            res.status(500).json({ message: 'Lỗi khi hoàn tất giao dịch!' });
                        });
                    }
                    res.status(200).json({ message: 'Thanh toán thành công!' });
                });
            });
        });
    });
});

// Lấy danh sách sản phẩm trong giỏ hàng
app.get("/cart", (req, res) => {
  const query = "SELECT * FROM Cart";
  db.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Lỗi lấy danh sách sản phẩm!", error: err });
    }
    res.json(results);
  });
});

app.post("/cart", (req, res) => {
  const { product_id, name, price, image, quantity } = req.body;

  // Kiểm tra xem product_id có tồn tại trong bảng Products
  const checkProductQuery = "SELECT * FROM Products WHERE id = ?";
  db.query(checkProductQuery, [product_id], (err, results) => {
    if (err) {
      console.error("Lỗi kiểm tra sản phẩm trong bảng Products:", err);
      return res
        .status(500)
        .json({ message: "Lỗi kiểm tra sản phẩm!", error: err });
    }

    if (results.length === 0) {
      // Nếu product_id không tồn tại
      return res
        .status(400)
        .json({ message: "Sản phẩm không tồn tại trong hệ thống!" });
    }

    // Nếu product_id tồn tại, tiếp tục kiểm tra trong bảng Cart
    const checkCartQuery = "SELECT * FROM Cart WHERE product_id = ?";
    db.query(checkCartQuery, [product_id], (err, cartResults) => {
      if (err) {
        console.error("Lỗi kiểm tra sản phẩm trong giỏ hàng:", err);
        return res
          .status(500)
          .json({ message: "Lỗi kiểm tra giỏ hàng!", error: err });
      }

      if (cartResults.length > 0) {
        // Nếu sản phẩm đã có trong giỏ hàng -> Cập nhật số lượng
        const updateQuery =
          "UPDATE Cart SET quantity = quantity + ? WHERE product_id = ?";
        db.query(updateQuery, [quantity, product_id], (err) => {
          if (err) {
            console.error("Lỗi cập nhật sản phẩm trong giỏ hàng:", err);
            return res
              .status(500)
              .json({ message: "Lỗi cập nhật giỏ hàng!", error: err });
          }
          res.json({ message: "Cập nhật số lượng sản phẩm thành công!" });
        });
      } else {
        // Nếu sản phẩm chưa có trong giỏ hàng -> Thêm mới
        const insertQuery =
          "INSERT INTO Cart (product_id, name, price, image, quantity) VALUES (?, ?, ?, ?, ?)";
        db.query(
          insertQuery,
          [product_id, name, price, image, quantity],
          (err) => {
            if (err) {
              console.error("Lỗi thêm sản phẩm vào giỏ hàng:", err);
              return res
                .status(500)
                .json({ message: "Lỗi thêm sản phẩm!", error: err });
            }
            res
              .status(201)
              .json({ message: "Thêm sản phẩm vào giỏ hàng thành công!" });
          }
        );
      }
    });
  });
});

// Xóa sản phẩm khỏi giỏ hàng
app.delete("/cart/:id", (req, res) => {
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
app.put("/cart/:id", (req, res) => {
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
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query =
    "INSERT INTO Users (username, email, password) VALUES (?, ?, ?)";
  db.query(query, [username, email, hashedPassword], (err, result) => {
    if (err) {
      console.error("Lỗi khi đăng ký người dùng:", err);
      return res.status(500).send("Lỗi khi đăng ký người dùng");
    }
    res.status(201).send("Đăng ký thành công!");
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
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    console.log("Đăng nhập thành công:", email);
    return res.status(200).json({ token, message: "Đăng nhập thành công" });
  });
});

// Chạy server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
