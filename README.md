# Forest Guardian

**Forest Guardian** là một game 2D pixel action platformer kết hợp mô phỏng nông trại và giáo dục môi trường, được xây dựng bằng **React** và **Phaser 3**.

---

## Mô tả ngắn

Người chơi vào vai Forest Guardian - người bảo vệ rừng, phiêu lưu qua các khu vực bị suy thoái, chiến đấu với quái vật ô nhiễm và trồng cây để phục hồi hệ sinh thái.

---

## Mục lục

* [Tính năng chính](#tính-năng-chính)
* [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
* [Cài đặt & chạy](#cài-đặt--chạy)
* [Cách chơi](#cách-chơi)
* [Hệ thống môi trường](#hệ-thống-môi-trường)
* [Công thức tăng trưởng](#công-thức-tăng-trưởng)
* [Cấu trúc project](#cấu-trúc-project)
* [Assets](#assets)
* [Lưu trữ](#lưu-trữ)
* [Phát triển](#phát-triển)
* [License](#license)
* [Đóng góp](#đóng-góp)

---

## Tính năng chính

* Trồng và chăm sóc cây: trồng, tưới nước, bón phân.
* Mô phỏng môi trường: nhiệt độ, độ ẩm, pH đất, chất lượng không khí.
* Hệ thống Carbon: theo dõi CO2 hấp thụ và Carbon Credits.
* Bản đồ 62x62 tiles để khám phá và phục hồi khu vực.
* Hệ thống thời gian: cây tăng trưởng theo thời gian thực.

---

## Yêu cầu hệ thống

* Node.js v14+
* npm hoặc yarn

---

## Cài đặt & chạy

1. Clone project:

```bash
git clone <repository-url>
cd afforestation-game
```

2. Cài dependencies:

```bash
npm install
# hoặc
# yarn
```

3. Chạy game:

```bash
npm start
```

4. Mở trình duyệt và truy cập:

```
http://localhost:3000
```

---

## Cách chơi

### Điều khiển

* WASD hoặc Arrow Keys: di chuyển
* Mouse Click: trồng cây / tưới nước / bón phân
* 1, 2, 3: chuyển công cụ (Plant, Water, Fertilize)
* ESC: tạm dừng

### Mục tiêu

1. Trồng cây trên ô đất (màu nâu).
2. Tưới nước và bón phân để cây tăng trưởng.
3. Thu thập Carbon Credits khi cây trưởng thành.
4. Phục hồi sức khỏe khu vực bằng cách hấp thụ CO2.

### Tài nguyên

* Energy Orbs: mua hạt giống (10), tưới (5), bón phân (15)
* Carbon Credits: thu được khi cây trưởng thành
* CO2 Absorbed: tổng CO2 đã hấp thụ

---

## Hệ thống môi trường

Các yếu tố:

* Nhiệt độ: ảnh hưởng tốc độ tăng trưởng
* Độ ẩm: ảnh hưởng sức khỏe cây
* pH đất: ảnh hưởng khả năng hấp thụ dinh dưỡng
* Chất lượng không khí: phản ánh mức độ ô nhiễm

---

## Công thức tăng trưởng

```text
GrowthIncrement = (Delta t / MaxGrowthTime) x f(T, H, pH)
CarbonSequestered = CarbonRate x GrowthIncrement
```

Trong đó `f(T, H, pH)` là một hàm trọng số (0..1) biểu diễn điều kiện môi trường phù hợp.

---

## Cấu trúc project (tổng quan)

```
src/
├── components/          # React components
│   ├── GameScene.js     # Phaser game container
│   ├── HUD.js           # Game interface
│   └── MainMenu.js      # Main menu
├── game/                # Phaser game logic
│   ├── ForestScene.js   # Main game scene
│   ├── Player.js        # Player character
│   ├── Plant.js         # Plant system
│   ├── Environment.js   # Environmental simulation
│   ├── TileGenerator.js # Map generation
│   └── GameState.js     # Save/load system
└── App.js               # Main React app
```

---

## Assets & graphics

Hiện tại dùng các placeholder (colored rectangles). Màu chính:

* Đất: `#8B4513`
* Cỏ: `#228B22`
* Đá: `#696969`
* Cây: từ nâu -> xanh đậm theo giai đoạn
* Nhân vật: `#00FF00`

> Ghi chú: dễ dàng thay bằng sprite sheet khi có assets mới.

---

## Lưu trữ

Dữ liệu lưu vào `localStorage`:

* Carbon Credits
* Energy Orbs
* CO2 absorbed
* Sức khỏe khu vực
* Thời gian lưu

---

## Phát triển

### Thêm tính năng nhanh

1. Tạo component React mới trong `src/components/`.
2. Thêm logic game trong `src/game/`.
3. Cập nhật `ForestScene.js` để tích hợp.

### Tùy chỉnh môi trường

* Sửa `Environment.js` để thay đổi chu kỳ nhiệt độ, tần suất thời tiết, mức ô nhiễm.

---

## License

Project này được tạo cho mục đích giáo dục và demo. (Thêm file `LICENSE` nếu cần quyền sử dụng cụ thể.)

---

## Đóng góp

Mọi đóng góp đều được hoan nghênh! Vui lòng tạo issue hoặc pull request để cải thiện game.

---

Forest Guardian - Bảo vệ môi trường, trồng cây gây rừng!
