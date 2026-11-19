# Thiệp cưới Hiếu & Quế

Trang mời cưới của Trần Trung Hiếu và Tướng Thị Quế, dựng bằng Next.js.

## Chạy trang

```bash
npm install
npm run dev
```

Mở http://localhost:3000

## Bổ sung thông tin

Sửa file `src/lib/wedding.ts`:

- `dateISO`: ngày giờ, ví dụ `"2026-12-20T10:00:00+07:00"`
- `dateLabel`, `lunarLabel`, `weddingPlace`
- `groom.parents`, `bride.parents`
- `events`: giờ, địa điểm, địa chỉ từng lễ
- `timeline`: các mốc trong ngày
- `contact`: số điện thoại để hiện nút Zalo
- `gift.enabled`: bật khi đã có số tài khoản mừng cưới
- `siteUrl`: tên miền sau khi đăng web

Ảnh nằm trong `public/photos`, đã nén từ album `AB` và một phần `File le`.
