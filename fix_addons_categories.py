import re

with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update addons state
addons_search = """  const [addons, setAddons] = useState({
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
    appPush: { category: 'app', selected: false, price: 2000000, fakePrice: "3.000.000 ₫", name: "Tích hợp Push Notification" },
    appMaintenance: { category: 'app', selected: false, price: 2000000, fakePrice: "3.000.000 ₫", name: "Bảo trì App (1 tháng)" },
    // CRM
    crmServer: { category: 'crm', selected: false, price: 3000000, fakePrice: "5.000.000 ₫", name: "Server riêng biệt (1 năm)" },
    crmTraining: { category: 'crm', selected: false, price: 2000000, fakePrice: "3.000.000 ₫", name: "Đào tạo sử dụng tận nơi" },
    crmMaintenance: { category: 'crm', selected: false, price: 3000000, fakePrice: "5.000.000 ₫", name: "Bảo trì hệ thống (1 tháng)" }
  });"""

addons_replace = """  const [addons, setAddons] = useState({
    // Platform
    listing: { categories: ['platform'], selected: false, price: 1500000, fakePrice: "2.000.000 ₫", name: "Tối ưu Store Listing" },
    reject: { categories: ['platform'], selected: false, price: 1000000, fakePrice: "1.500.000 ₫", name: "Hỗ trợ gỡ Reject" },
    androidTester: { categories: ['platform'], selected: false, price: 500000, fakePrice: "600.000 ₫", name: "Cung cấp 20 Tester (14 ngày)" },
    maintenance: { categories: ['platform'], selected: false, price: 1500000, fakePrice: "2.000.000 ₫", name: "Bảo trì 1 tháng" },
    // Web & CRM Common
    cloudHosting: { categories: ['web', 'crm'], selected: false, price: 3850000, fakePrice: "5.000.000 ₫", name: "Hạ tầng Cloud Hosting Tốc Độ Cao (1 Năm)", desc: "Băng thông rộng, lưu trữ mã nguồn Website, CRM, tự động backup dữ liệu" },
    internationalDomain: { categories: ['web', 'crm'], selected: false, price: 1100000, fakePrice: "1.500.000 ₫", name: "Tên miền Quốc Tế (.com / .net) 1 Năm", desc: "Hỗ trợ trỏ DNS, cài đặt cấu hình chứng chỉ bảo mật SSL miễn phí" },
    // Web Only
    webSEO: { categories: ['web'], selected: false, price: 2000000, fakePrice: "3.000.000 ₫", name: "Tối ưu SEO Onpage" },
    webMaintenance: { categories: ['web'], selected: false, price: 1000000, fakePrice: "1.500.000 ₫", name: "Bảo trì & Cập nhật nội dung (1 tháng)" },
    // App
    appPush: { categories: ['app'], selected: false, price: 2000000, fakePrice: "3.000.000 ₫", name: "Tích hợp Push Notification" },
    appMaintenance: { categories: ['app'], selected: false, price: 2000000, fakePrice: "3.000.000 ₫", name: "Bảo trì App (1 tháng)" },
    // CRM Only
    crmTraining: { categories: ['crm'], selected: false, price: 2000000, fakePrice: "3.000.000 ₫", name: "Đào tạo sử dụng tận nơi" },
    crmMaintenance: { categories: ['crm'], selected: false, price: 3000000, fakePrice: "5.000.000 ₫", name: "Bảo trì hệ thống (1 tháng)" }
  });"""

content = content.replace(addons_search, addons_replace)

# 2. Update filter category to categories.includes
filter_search = ".filter(([_, addon]) => addon.category === activeTab)"
filter_replace = ".filter(([_, addon]) => addon.categories?.includes(activeTab))"
content = content.replace(filter_search, filter_replace)

# 3. Add desc rendering
desc_search = """                          <div className="text-[17px] font-medium text-[#1d1d1f] tracking-tight">{lang === 'vi' ? addon.name : (t as any)[`addon_${key === 'androidTester' ? 'tester' : key === 'maintenance' ? 'maint' : key}`]}</div>
                          <div className="flex items-center gap-2 justify-end">"""

desc_replace = """                          <div>
                            <div className="text-[17px] font-medium text-[#1d1d1f] tracking-tight">{lang === 'vi' ? addon.name : (t as any)[`addon_${key === 'androidTester' ? 'tester' : key === 'maintenance' ? 'maint' : key}`] || addon.name}</div>
                            {(addon as any).desc && (
                              <div className="text-[13px] text-[#86868b] mt-1">{(addon as any).desc}</div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 justify-end">"""

content = content.replace(desc_search, desc_replace)

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

