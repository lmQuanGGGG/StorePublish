import re

with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update addons state
addons_search = """  const [addons, setAddons] = useState({
    listing: {
      selected: false,
      price: 1500000,
      fakePrice: "2.000.000 ₫",
      name: "Tối ưu Store Listing",
    },
    reject: {
      selected: false,
      price: 1000000,
      fakePrice: "1.500.000 ₫",
      name: "Hỗ trợ gỡ Reject",
    },
    androidTester: {
      selected: false,
      price: 500000,
      fakePrice: "600.000 ₫",
      name: "Cung cấp 20 Tester (14 ngày)",
    },
    maintenance: {
      selected: false,
      price: 1500000,
      fakePrice: "2.000.000 ₫",
      name: "Bảo trì 1 tháng",
    },
  });"""

addons_replace = """  const [addons, setAddons] = useState({
    // Platform
    listing: { category: 'platform', selected: false, price: 1500000, fakePrice: "2.000.000 ₫", name: "Tối ưu Store Listing" },
    reject: { category: 'platform', selected: false, price: 1000000, fakePrice: "1.500.000 ₫", name: "Hỗ trợ gỡ Reject" },
    androidTester: { category: 'platform', selected: false, price: 500000, fakePrice: "600.000 ₫", name: "Cung cấp 20 Tester (14 ngày)" },
    maintenance: { category: 'platform', selected: false, price: 1500000, fakePrice: "2.000.000 ₫", name: "Bảo trì 1 tháng" },
    // Web
    webDomain: { category: 'web', selected: false, price: 1500000, fakePrice: "2.000.000 ₫", name: "Tên miền & Hosting (1 năm)" },
    webSSL: { category: 'web', selected: false, price: 500000, fakePrice: "800.000 ₫", name: "Chứng chỉ bảo mật SSL" },
    webSEO: { category: 'web', selected: false, price: 2000000, fakePrice: "3.000.000 ₫", name: "Tối ưu SEO Onpage" },
    webMaintenance: { category: 'web', selected: false, price: 1000000, fakePrice: "1.500.000 ₫", name: "Bảo trì & Cập nhật nội dung (1 tháng)" },
    // App
    appDevAcc: { category: 'app', selected: false, price: 1000000, fakePrice: "1.500.000 ₫", name: "Đăng ký Apple/Google Developer" },
    appPush: { category: 'app', selected: false, price: 2000000, fakePrice: "3.000.000 ₫", name: "Tích hợp Push Notification" },
    appMaintenance: { category: 'app', selected: false, price: 2000000, fakePrice: "3.000.000 ₫", name: "Bảo trì App (1 tháng)" },
    // CRM
    crmServer: { category: 'crm', selected: false, price: 3000000, fakePrice: "5.000.000 ₫", name: "Server riêng biệt (1 năm)" },
    crmTraining: { category: 'crm', selected: false, price: 2000000, fakePrice: "3.000.000 ₫", name: "Đào tạo sử dụng tận nơi" },
    crmMaintenance: { category: 'crm', selected: false, price: 3000000, fakePrice: "5.000.000 ₫", name: "Bảo trì hệ thống (1 tháng)" }
  });"""

content = content.replace(addons_search, addons_replace)

# 2. Update Add-ons rendering filter
render_search = """              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8">
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-6 tracking-tight">{lang === 'vi' ? 'Tiện ích bổ sung (Áp dụng chung)' : 'Add-ons (Apply to all)'}</h3>
                <div className="space-y-4">
                  {Object.entries(addons).map(([key, addon]) => {"""

render_replace = """              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8">
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-6 tracking-tight">{lang === 'vi' ? 'Tiện ích bổ sung (Dịch vụ đi kèm)' : 'Add-ons (Accompanied Services)'}</h3>
                <div className="space-y-4">
                  {Object.entries(addons)
                    .filter(([_, addon]) => addon.category === activeTab)
                    .map(([key, addon]) => {"""

content = content.replace(render_search, render_replace)

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

