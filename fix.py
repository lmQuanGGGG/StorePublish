import re

with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. State variables
content = content.replace(
"""  const [basePrice, setBasePrice] = useState(1200000);
  const [baseName, setBaseName] = useState("Basic Android");
  const [baseType, setBaseType] = useState("android");""",
"""  const [basePrice, setBasePrice] = useState(1200000);
  const [baseName, setBaseName] = useState("Basic Android");
  const [baseType, setBaseType] = useState("android");

  const [devServices, setDevServices] = useState({
    'web-landing': { category: 'web', selected: false, price: 2000000, fakePrice: "3.500.000 ₫", name: "Landing Page Bán Hàng", desc: "1 trang, tối ưu chuyển đổi, UX/UI cơ bản" },
    'web-company': { category: 'web', selected: false, price: 5000000, fakePrice: "8.000.000 ₫", name: "Web Doanh Nghiệp", desc: "Tối đa 5 trang, chuẩn SEO, có Admin cơ bản" },
    'web-ecommerce': { category: 'web', selected: false, price: 12000000, fakePrice: "18.000.000 ₫", name: "Web Thương Mại Điện Tử", desc: "Giỏ hàng, thanh toán online, quản lý kho" },
    'web-custom': { category: 'web', selected: false, price: 20000000, fakePrice: "30.000.000 ₫", name: "Web Hệ Thống Custom", desc: "Code tay hoàn toàn theo yêu cầu đặc thù" },
    'app-basic': { category: 'app', selected: false, price: 15000000, fakePrice: "25.000.000 ₫", name: "App Bán Hàng/Booking Cơ Bản", desc: "Flutter/React Native, Android & iOS" },
    'app-social': { category: 'app', selected: false, price: 30000000, fakePrice: "45.000.000 ₫", name: "App Mạng Xã Hội/Ví Điện Tử", desc: "Real-time chat, payment gateway, bảo mật cao" },
    'app-enterprise': { category: 'app', selected: false, price: 25000000, fakePrice: "35.000.000 ₫", name: "App Quản Trị Nội Bộ", desc: "Kết nối API nội bộ, quản lý nhân sự/dự án" },
    'crm-sales': { category: 'crm', selected: false, price: 12000000, fakePrice: "20.000.000 ₫", name: "CRM Quản Lý Bán Hàng", desc: "Quản lý lead, khách hàng, báo cáo doanh thu" },
    'crm-full': { category: 'crm', selected: false, price: 35000000, fakePrice: "50.000.000 ₫", name: "ERP Mini Đa Nền Tảng", desc: "Tích hợp Web + App, quản lý kho/vận chuyển/nhân sự" }
  });"""
)

# 2. Logic
content = content.replace(
"""  const addonsTotal = Object.entries(addons).reduce(
    (sum, [key, addon]) => {
      if (key === "androidTester" && baseType === "ios") return sum;
      return addon.selected ? sum + addon.price : sum;
    },
    0
  );

  const activeAddons = Object.entries(addons)
    .filter(([key, addon]) => addon.selected && !(key === "androidTester" && baseType === "ios"))
    .map(([_, addon]) => addon);

  const total = basePrice + addonsTotal;""",
"""  const toggleDevService = (type: keyof typeof devServices) => {
    setDevServices(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        selected: !prev[type].selected
      }
    }));
  };

  const addonsTotal = Object.entries(addons).reduce(
    (sum, [key, addon]) => {
      if (key === "androidTester" && baseType === "ios") return sum;
      return addon.selected ? sum + addon.price : sum;
    },
    0
  );

  const activeAddons = Object.entries(addons)
    .filter(([key, addon]) => addon.selected && !(key === "androidTester" && baseType === "ios"))
    .map(([_, addon]) => addon);

  const devTotal = Object.values(devServices).reduce((sum, s) => s.selected ? sum + s.price : sum, 0);
  const activeDevServices = Object.values(devServices).filter(s => s.selected);

  const total = basePrice + addonsTotal + devTotal;"""
)

# 2b. URL logic
content = content.replace(
"""Tam ung StorePublish ${baseName}""",
"""Tam ung StorePublish"""
)

# 3. Message Template
content = content.replace(
"""    if (activeAddons.length > 0) {
      text += lang === 'vi' ? `\\n[2] TIỆN ÍCH BỔ SUNG\\n` : `\\n[2] ADD-ONS\\n`;
      activeAddons.forEach((addon) => {
        const addonName = lang === 'vi' ? addon.name : (t as any)[`addon_${addon.name.includes('Store') ? 'listing' : addon.name.includes('Reject') ? 'reject' : addon.name.includes('Tester') ? 'tester' : 'maint'}`];
        text += `- ${addonName}: +${formatMoney(addon.price)}\\n`;
      });
    }

    text += lang === 'vi' ? `\\n[3] TỔNG QUAN CHI PHÍ\\n` : `\\n[3] COST OVERVIEW\\n`;""",
"""    if (activeDevServices.length > 0) {
      text += lang === 'vi' ? `\\n[2] DỊCH VỤ LẬP TRÌNH\\n` : `\\n[2] DEVELOPMENT SERVICES\\n`;
      activeDevServices.forEach((s) => {
        const sName = lang === 'vi' ? s.name : s.name.replace('Lập trình ', 'Dev ').replace('Hệ thống ', 'System ');
        text += `- ${sName}: +${formatMoney(s.price)}\\n`;
      });
    }

    if (activeAddons.length > 0) {
      text += lang === 'vi' ? `\\n[3] TIỆN ÍCH BỔ SUNG\\n` : `\\n[3] ADD-ONS\\n`;
      activeAddons.forEach((addon) => {
        const addonName = lang === 'vi' ? addon.name : (t as any)[`addon_${addon.name.includes('Store') ? 'listing' : addon.name.includes('Reject') ? 'reject' : addon.name.includes('Tester') ? 'tester' : 'maint'}`];
        text += `- ${addonName}: +${formatMoney(addon.price)}\\n`;
      });
    }

    text += lang === 'vi' ? `\\n[4] TỔNG QUAN CHI PHÍ\\n` : `\\n[4] COST OVERVIEW\\n`;"""
)

content = content.replace(
"""    text += lang === 'vi' ? `[4] CHI TIẾT HỖ TRỢ BAO GỒM\\n` : `[4] SUPPORT DETAILS INCLUDE\\n`;""",
"""    text += lang === 'vi' ? `[5] CHI TIẾT HỖ TRỢ BAO GỒM\\n` : `[5] SUPPORT DETAILS INCLUDE\\n`;"""
)
content = content.replace(
"""    text += lang === 'vi' ? `[5] THÔNG TIN THANH TOÁN & LIÊN HỆ\\n` : `[5] PAYMENT & CONTACT INFO\\n`;""",
"""    text += lang === 'vi' ? `[6] THÔNG TIN THANH TOÁN & LIÊN HỆ\\n` : `[6] PAYMENT & CONTACT INFO\\n`;"""
)
content = content.replace(
"""  }, [baseName, basePrice, activeAddons, total, profile, qrUrl, lang]);""",
"""  }, [baseName, basePrice, activeAddons, activeDevServices, total, profile, qrUrl, lang]);"""
)

# 4. Packages Section addition
content = content.replace(
"""              <button
                onClick={() => selectPackage("pro", 6500000, "Pro Full Support")}
                className="w-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] py-3 rounded-full text-[15px] font-medium transition-colors"
              >
                {t.btn_select}
              </button>
            </div>
          </div>
        </div>
      </section>""",
"""              <button
                onClick={() => selectPackage("pro", 6500000, "Pro Full Support")}
                className="w-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] py-3 rounded-full text-[15px] font-medium transition-colors"
              >
                {t.btn_select}
              </button>
            </div>
          </div>

          <div className="text-center mt-24 mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight bg-gradient-to-r from-[#022640] to-[#5786AB] bg-clip-text text-transparent inline-block pb-1 mb-4">
              {lang === 'vi' ? 'Dịch Vụ Phát Triển' : 'Development Services'}
            </h2>
            <p className="text-xl text-[#86868b] font-medium tracking-tight">
              {lang === 'vi' ? 'Bên cạnh xuất bản App, chúng tôi cung cấp dịch vụ Lập trình phần mềm toàn diện.' : 'Besides App Publishing, we provide full software development services.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-[24px] p-8 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div>
                <h3 className="text-[28px] font-semibold tracking-tight text-[#1d1d1f] mb-1">Website</h3>
                <p className="text-[15px] text-[#86868b] font-medium mb-8">{lang === 'vi' ? 'Thiết kế hiện đại' : 'Modern Design'}</p>
                <div className="flex items-end gap-2 mb-8">
                  <div className="text-3xl font-semibold text-[#1d1d1f] tracking-tight">{lang === 'vi' ? 'Từ 2.0M' : 'From $83'}</div>
                </div>
                <ul className="space-y-4 mb-8 text-[15px] text-[#1d1d1f]">
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'Landing Page Bán Hàng' : 'Landing Page'}</li>
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'Web Doanh Nghiệp (SEO)' : 'Corporate Web (SEO)'}</li>
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'Web Thương Mại Điện Tử' : 'E-commerce Web'}</li>
                </ul>
              </div>
              <button
                onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] py-3 rounded-full text-[15px] font-medium transition-colors"
              >
                {t.btn_select}
              </button>
            </div>

            <div className="bg-white rounded-[24px] p-8 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div>
                <h3 className="text-[28px] font-semibold tracking-tight text-[#1d1d1f] mb-1">Mobile App</h3>
                <p className="text-[15px] text-[#86868b] font-medium mb-8">{lang === 'vi' ? 'iOS & Android' : 'iOS & Android'}</p>
                <div className="flex items-end gap-2 mb-8">
                  <div className="text-3xl font-semibold text-[#1d1d1f] tracking-tight">{lang === 'vi' ? 'Từ 15.0M' : 'From $625'}</div>
                </div>
                <ul className="space-y-4 mb-8 text-[15px] text-[#1d1d1f]">
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'App Bán Hàng/Booking' : 'Shopping/Booking App'}</li>
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'App Mạng Xã Hội/Ví' : 'Social/Wallet App'}</li>
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'App Quản Trị Nội Bộ' : 'Enterprise Mgmt App'}</li>
                </ul>
              </div>
              <button
                onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] py-3 rounded-full text-[15px] font-medium transition-colors"
              >
                {t.btn_select}
              </button>
            </div>

            <div className="bg-[#1d1d1f] rounded-[24px] p-8 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.08)] relative">
              <div className="absolute top-6 right-8 text-[#f5f5f7] text-[11px] font-semibold px-2 py-1 bg-white/10 rounded-full tracking-wide uppercase">
                {lang === 'vi' ? 'DOANH NGHIỆP' : 'ENTERPRISE'}
              </div>
              <div>
                <h3 className="text-[28px] font-semibold tracking-tight text-[#f5f5f7] mb-1">CRM Custom</h3>
                <p className="text-[15px] text-[#86868b] font-medium mb-8">{lang === 'vi' ? 'Hệ thống Quản trị' : 'Management System'}</p>
                <div className="flex items-end gap-2 mb-8">
                  <div className="text-3xl font-semibold text-[#f5f5f7] tracking-tight">{lang === 'vi' ? 'Từ 12.0M' : 'From $500'}</div>
                </div>
                <ul className="space-y-4 mb-8 text-[15px] text-[#f5f5f7]">
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'CRM Quản Lý Bán Hàng' : 'Sales CRM'}</li>
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'ERP Mini Đa Nền Tảng' : 'Multi-platform Mini ERP'}</li>
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'Tính năng code tay đặc thù' : 'Custom hand-coded features'}</li>
                </ul>
              </div>
              <button
                onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full bg-[#f5f5f7] hover:bg-white text-[#1d1d1f] py-3 rounded-full text-[15px] font-medium transition-colors"
              >
                {t.btn_select}
              </button>
            </div>
          </div>
        </div>
      </section>"""
)

# 5. Calculator UI Dev additions
content = content.replace(
"""              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8">
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-6 tracking-tight">{lang === 'vi' ? '2. Tiện ích bổ sung' : '2. Add-ons'}</h3>
                <div className="space-y-4">
                  {Object.entries(addons).map(([key, addon]) => {""",
"""              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8">
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-6 tracking-tight">{lang === 'vi' ? '2. Dịch vụ Lập trình Website' : '2. Website Development'}</h3>
                <div className="space-y-4">
                  {Object.entries(devServices).filter(([_, s]) => s.category === 'web').map(([key, service]) => (
                    <label
                      key={key}
                      className={`flex items-center p-5 rounded-[16px] cursor-pointer transition-all border ${
                        service.selected ? "border-[#0071e3] ring-1 ring-[#0071e3] bg-[#0071e3]/5" : "border-[#d2d2d7] hover:border-[#86868b]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={service.selected}
                        onChange={() => toggleDevService(key as keyof typeof devServices)}
                        className="h-5 w-5 accent-[#0071e3] rounded-[4px] border-[#d2d2d7]"
                      />
                      <div className="ml-4 flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                        <div>
                          <div className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">{lang === 'vi' ? service.name : service.name.replace('Lập trình ', 'Dev ').replace('Hệ thống ', 'System ')}</div>
                          <div className="text-[13px] text-[#86868b] mt-1">{service.desc}</div>
                        </div>
                        <div className="flex items-center gap-2 justify-end">
                          <div className="text-[13px] font-medium text-[#86868b] line-through">{lang === 'vi' ? service.fakePrice : `$${Math.round(parseInt(service.fakePrice.replace(/\\D/g, '')) / 24000)}`}</div>
                          <div className="text-[17px] font-semibold text-[#1d1d1f]">{new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'vi-VN', {style: 'currency', currency: lang === 'en' ? 'USD' : 'VND', maximumFractionDigits: 0}).format(lang === 'en' ? service.price / 24000 : service.price)}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8">
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-6 tracking-tight">{lang === 'vi' ? '3. Dịch vụ Lập trình Mobile App' : '3. Mobile App Development'}</h3>
                <div className="space-y-4">
                  {Object.entries(devServices).filter(([_, s]) => s.category === 'app').map(([key, service]) => (
                    <label
                      key={key}
                      className={`flex items-center p-5 rounded-[16px] cursor-pointer transition-all border ${
                        service.selected ? "border-[#0071e3] ring-1 ring-[#0071e3] bg-[#0071e3]/5" : "border-[#d2d2d7] hover:border-[#86868b]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={service.selected}
                        onChange={() => toggleDevService(key as keyof typeof devServices)}
                        className="h-5 w-5 accent-[#0071e3] rounded-[4px] border-[#d2d2d7]"
                      />
                      <div className="ml-4 flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                        <div>
                          <div className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">{lang === 'vi' ? service.name : service.name.replace('Lập trình ', 'Dev ').replace('Hệ thống ', 'System ')}</div>
                          <div className="text-[13px] text-[#86868b] mt-1">{service.desc}</div>
                        </div>
                        <div className="flex items-center gap-2 justify-end">
                          <div className="text-[13px] font-medium text-[#86868b] line-through">{lang === 'vi' ? service.fakePrice : `$${Math.round(parseInt(service.fakePrice.replace(/\\D/g, '')) / 24000)}`}</div>
                          <div className="text-[17px] font-semibold text-[#1d1d1f]">{new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'vi-VN', {style: 'currency', currency: lang === 'en' ? 'USD' : 'VND', maximumFractionDigits: 0}).format(lang === 'en' ? service.price / 24000 : service.price)}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8">
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-6 tracking-tight">{lang === 'vi' ? '4. Hệ thống CRM Custom' : '4. Custom CRM System'}</h3>
                <div className="space-y-4">
                  {Object.entries(devServices).filter(([_, s]) => s.category === 'crm').map(([key, service]) => (
                    <label
                      key={key}
                      className={`flex items-center p-5 rounded-[16px] cursor-pointer transition-all border ${
                        service.selected ? "border-[#0071e3] ring-1 ring-[#0071e3] bg-[#0071e3]/5" : "border-[#d2d2d7] hover:border-[#86868b]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={service.selected}
                        onChange={() => toggleDevService(key as keyof typeof devServices)}
                        className="h-5 w-5 accent-[#0071e3] rounded-[4px] border-[#d2d2d7]"
                      />
                      <div className="ml-4 flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                        <div>
                          <div className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">{lang === 'vi' ? service.name : service.name.replace('Lập trình ', 'Dev ').replace('Hệ thống ', 'System ')}</div>
                          <div className="text-[13px] text-[#86868b] mt-1">{service.desc}</div>
                        </div>
                        <div className="flex items-center gap-2 justify-end">
                          <div className="text-[13px] font-medium text-[#86868b] line-through">{lang === 'vi' ? service.fakePrice : `$${Math.round(parseInt(service.fakePrice.replace(/\\D/g, '')) / 24000)}`}</div>
                          <div className="text-[17px] font-semibold text-[#1d1d1f]">{new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'vi-VN', {style: 'currency', currency: lang === 'en' ? 'USD' : 'VND', maximumFractionDigits: 0}).format(lang === 'en' ? service.price / 24000 : service.price)}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8">
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-6 tracking-tight">{lang === 'vi' ? '5. Tiện ích bổ sung' : '5. Add-ons'}</h3>
                <div className="space-y-4">
                  {Object.entries(addons).map(([key, addon]) => {"""
)

# 6. Total Summary addition
content = content.replace(
"""                  <div className="flex justify-between items-start">
                    <span className="text-[#f5f5f7]/80">{baseName}</span>
                    <span className="font-semibold">{formatMoney(basePrice)}</span>
                  </div>
                  {activeAddons.map((addon, idx) => (""",
"""                  <div className="flex justify-between items-start">
                    <span className="text-[#f5f5f7]/80">{baseName}</span>
                    <span className="font-semibold">{formatMoney(basePrice)}</span>
                  </div>
                  {activeDevServices.map((s, idx) => (
                    <div key={`dev-${idx}`} className="flex justify-between items-start">
                       <span className="text-[#f5f5f7]/80">{lang === 'vi' ? s.name : s.name.replace('Lập trình ', 'Dev ').replace('Hệ thống ', 'System ')}</span>
                      <span className="font-semibold">+{formatMoney(s.price)}</span>
                    </div>
                  ))}
                  {activeAddons.map((addon, idx) => ("""
)

# 7. Add px-4 to containers
content = content.replace(
"""        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">""",
"""        <div className="max-w-6xl mx-auto px-4 md:px-6 h-12 flex items-center justify-between">"""
)
content = content.replace(
"""        <div className="w-full max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">""",
"""        <div className="w-full max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10 flex flex-col items-center">"""
)
content = content.replace(
"""      <section id="packages" className="py-20 scroll-mt-12 relative z-10">
        <div className="max-w-6xl mx-auto px-6">""",
"""      <section id="packages" className="py-20 scroll-mt-12 relative z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6">"""
)
content = content.replace(
"""      <section id="calculator" className="mb-20 relative z-10 border-t border-[#d2d2d7]/50 pt-20">
        <div className="max-w-6xl mx-auto px-6">""",
"""      <section id="calculator" className="mb-20 relative z-10 border-t border-[#d2d2d7]/50 pt-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">"""
)
content = content.replace(
"""      <section id="services" className="py-20 border-t border-[#d2d2d7]/50">
        <div className="max-w-6xl mx-auto px-6">""",
"""      <section id="services" className="py-20 border-t border-[#d2d2d7]/50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">"""
)
content = content.replace(
"""      <section className="py-20 border-t border-[#d2d2d7]/50 bg-white">
        <div className="max-w-6xl mx-auto px-6">""",
"""      <section className="py-20 border-t border-[#d2d2d7]/50 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">"""
)

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

