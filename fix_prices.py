with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
"""  const [devServices, setDevServices] = useState({
    'web-landing': { category: 'web', selected: false, price: 2000000, fakePrice: "3.500.000 ₫", name: "Landing Page Bán Hàng", desc: "1 trang, tối ưu chuyển đổi, UX/UI cơ bản" },
    'web-company': { category: 'web', selected: false, price: 5000000, fakePrice: "8.000.000 ₫", name: "Web Doanh Nghiệp", desc: "Tối đa 5 trang, chuẩn SEO, có Admin cơ bản" },
    'web-ecommerce': { category: 'web', selected: false, price: 12000000, fakePrice: "18.000.000 ₫", name: "Web Thương Mại Điện Tử", desc: "Giỏ hàng, thanh toán online, quản lý kho" },
    'web-custom': { category: 'web', selected: false, price: 20000000, fakePrice: "30.000.000 ₫", name: "Web Hệ Thống Custom", desc: "Code tay hoàn toàn theo yêu cầu đặc thù" },
    'app-basic': { category: 'app', selected: false, price: 15000000, fakePrice: "25.000.000 ₫", name: "App Bán Hàng/Booking Cơ Bản", desc: "Flutter/React Native, Android & iOS" },
    'app-social': { category: 'app', selected: false, price: 30000000, fakePrice: "45.000.000 ₫", name: "App Mạng Xã Hội/Ví Điện Tử", desc: "Real-time chat, payment gateway, bảo mật cao" },
    'app-enterprise': { category: 'app', selected: false, price: 25000000, fakePrice: "35.000.000 ₫", name: "App Quản Trị Nội Bộ", desc: "Kết nối API nội bộ, quản lý nhân sự/dự án" },
    'crm-sales': { category: 'crm', selected: false, price: 12000000, fakePrice: "20.000.000 ₫", name: "CRM Quản Lý Bán Hàng", desc: "Quản lý lead, khách hàng, báo cáo doanh thu" },
    'crm-full': { category: 'crm', selected: false, price: 35000000, fakePrice: "50.000.000 ₫", name: "ERP Mini Đa Nền Tảng", desc: "Tích hợp Web + App, quản lý kho/vận chuyển/nhân sự" }
  });""",
"""  const [devServices, setDevServices] = useState({
    'web-landing': { category: 'web', selected: false, price: 2500000, fakePrice: "5.500.000 ₫", name: "Landing Page Bán Hàng", desc: "1 trang, tối ưu chuyển đổi, UX/UI cơ bản" },
    'web-company': { category: 'web', selected: false, price: 8000000, fakePrice: "12.000.000 ₫", name: "Web Doanh Nghiệp", desc: "Tối đa 5 trang, chuẩn SEO, có Admin cơ bản" },
    'web-ecommerce': { category: 'web', selected: false, price: 18000000, fakePrice: "25.000.000 ₫", name: "Web Thương Mại Điện Tử", desc: "Giỏ hàng, thanh toán online, quản lý kho" },
    'web-custom': { category: 'web', selected: false, price: 30000000, fakePrice: "50.000.000 ₫", name: "Web Hệ Thống Custom", desc: "Code tay hoàn toàn theo yêu cầu đặc thù" },
    'app-basic': { category: 'app', selected: false, price: 20000000, fakePrice: "35.000.000 ₫", name: "App Bán Hàng/Booking Cơ Bản", desc: "Flutter/React Native, Android & iOS" },
    'app-social': { category: 'app', selected: false, price: 40000000, fakePrice: "60.000.000 ₫", name: "App Mạng Xã Hội/Ví Điện Tử", desc: "Real-time chat, payment gateway, bảo mật cao" },
    'app-enterprise': { category: 'app', selected: false, price: 30000000, fakePrice: "45.000.000 ₫", name: "App Quản Trị Nội Bộ", desc: "Kết nối API nội bộ, quản lý nhân sự/dự án" },
    'crm-sales': { category: 'crm', selected: false, price: 15000000, fakePrice: "25.000.000 ₫", name: "CRM Quản Lý Bán Hàng", desc: "Quản lý lead, khách hàng, báo cáo doanh thu" },
    'crm-full': { category: 'crm', selected: false, price: 45000000, fakePrice: "70.000.000 ₫", name: "ERP Mini Đa Nền Tảng", desc: "Tích hợp Web + App, quản lý kho/vận chuyển/nhân sự" }
  });"""
)

# Also update the display in the dev cards section to reflect the new starting prices
content = content.replace("{lang === 'vi' ? 'Từ 2.0M' : 'From $83'}", "{lang === 'vi' ? 'Từ 2.5M' : 'From $104'}")
content = content.replace("{lang === 'vi' ? 'Từ 15.0M' : 'From $625'}", "{lang === 'vi' ? 'Từ 20.0M' : 'From $833'}")
content = content.replace("{lang === 'vi' ? 'Từ 12.0M' : 'From $500'}", "{lang === 'vi' ? 'Từ 15.0M' : 'From $625'}")

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
