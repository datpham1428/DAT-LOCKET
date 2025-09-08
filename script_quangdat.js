// =================== LOGIC CHÍNH CỦA SCRIPT ===================
// Mục đích: Giả mạo trạng thái đăng ký trả phí của ứng dụng.

// Định nghĩa thông tin giả mạo.
// expires_date được đặt tới năm 2099 để làm cho gói đăng ký có hiệu lực dài hạn.
var fakeSubscription = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  original_purchase_date: "2024-07-28T01:04:18Z",
  purchase_date: "2024-07-28T01:04:17Z",
  store: "app_store",
};

// Định nghĩa gói sản phẩm giả mạo.
var fakeEntitlement = {
  grace_period_expires_date: null,
  purchase_date: "2024-07-28T01:04:17Z",
  product_identifier: "com.ohoang7.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z",
};

try {
  // Lấy dữ liệu phản hồi từ máy chủ.
  var obj = JSON.parse($response.body);

  // Thêm gói đăng ký và quyền lợi giả mạo vào phản hồi.
  // Điều này làm cho ứng dụng tin rằng người dùng đã đăng ký thành công.
  obj.subscriber.subscriptions["com.ohoang7.premium.yearly"] = fakeSubscription;
  obj.subscriber.entitlements.pro = fakeEntitlement;

  // Thêm một thông báo tùy chỉnh.
  obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

  // Hoàn tất và gửi phản hồi đã chỉnh sửa về ứng dụng.
  $done({ body: JSON.stringify(obj) });
} catch (e) {
  // Nếu có lỗi, trả về phản hồi gốc.
  $done({ body: $response.body });
}