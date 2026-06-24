"use client";

import { useState, useEffect } from "react";
import {
  Smartphone,
  Check,
  Plus,
  Copy,
  MessageSquare,
  ArrowRight,
  Menu,
  X,
  Globe,
  Mail,
  MapPin
} from "lucide-react";
import { translations } from "./translations";

export default function Home() {
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const t = translations[lang];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('platform');
  const [basePrice, setBasePrice] = useState(1200000);
  const [baseName, setBaseName] = useState("Basic Android");
  const [baseType, setBaseType] = useState("android");
  const [multiplier, setMultiplier] = useState(1.0);
  const [multiplierMode, setMultiplierMode] = useState<'student'|'freelancer'|'agency'|'custom'>('student');

  const [devServices, setDevServices] = useState({
    'web-landing': { category: 'web', selected: false, price: 2500000, fakePrice: "5.500.000 ₫", name: "Landing Page Bán Hàng", enName: "Sales Landing Page", desc: "1 trang, tối ưu chuyển đổi, UX/UI cơ bản", enDesc: "1 page, conversion optimized, basic UX/UI" },
    'web-company': { category: 'web', selected: false, price: 7000000, fakePrice: "12.000.000 ₫", name: "Web Doanh Nghiệp", enName: "Corporate Website", desc: "Tối đa 5 trang, chuẩn SEO, có Admin cơ bản", enDesc: "Up to 5 pages, SEO standard, basic Admin" },
    'web-ecommerce': { category: 'web', selected: false, price: 18000000, fakePrice: "25.000.000 ₫", name: "Web Thương Mại Điện Tử", enName: "E-commerce Website", desc: "Giỏ hàng, thanh toán online, quản lý kho", enDesc: "Shopping cart, online payment, inventory management" },
    'web-custom': { category: 'web', selected: false, price: 30000000, fakePrice: "50.000.000 ₫", name: "Web Hệ Thống Custom", enName: "Custom Web System", desc: "Code tay hoàn toàn theo yêu cầu đặc thù", enDesc: "Fully custom coded based on specific requirements" },
    'app-basic': { category: 'app', selected: false, price: 20000000, fakePrice: "35.000.000 ₫", name: "App Bán Hàng/Booking Cơ Bản", enName: "Basic Sales/Booking App", desc: "Flutter/React Native, Android & iOS", enDesc: "Flutter/React Native, Android & iOS" },
    'app-social': { category: 'app', selected: false, price: 40000000, fakePrice: "60.000.000 ₫", name: "App Mạng Xã Hội/Ví Điện Tử", enName: "Social/Wallet App", desc: "Real-time chat, payment gateway, bảo mật cao", enDesc: "Real-time chat, payment gateway, high security" },
    'app-enterprise': { category: 'app', selected: false, price: 30000000, fakePrice: "45.000.000 ₫", name: "App Quản Trị Nội Bộ", enName: "Internal Management App", desc: "Kết nối API nội bộ, quản lý nhân sự/dự án", enDesc: "Internal API integration, HR/project management" },
    'crm-sales': { category: 'crm', selected: false, price: 15000000, fakePrice: "25.000.000 ₫", name: "CRM Quản Lý Bán Hàng", enName: "Sales Management CRM", desc: "Quản lý lead, khách hàng, báo cáo doanh thu", enDesc: "Lead & customer management, revenue reports" },
    'crm-full': { category: 'crm', selected: false, price: 35000000, fakePrice: "70.000.000 ₫", name: "ERP Mini Đa Nền Tảng", enName: "Multi-platform Mini ERP", desc: "Tích hợp Web + App, quản lý kho/vận chuyển/nhân sự", enDesc: "Web + App integration, inventory/shipping/HR management" }
  });

  const [addons, setAddons] = useState({
    // Platform
    listing: { categories: ['platform'], selected: false, price: 1500000, fakePrice: "2.000.000 ₫", name: "Tối ưu Store Listing", enName: "Store Listing Optimization" },
    reject: { categories: ['platform'], selected: false, price: 1000000, fakePrice: "1.500.000 ₫", name: "Hỗ trợ gỡ Reject", enName: "App Rejection Support" },
    androidTester: { categories: ['platform'], selected: false, price: 500000, fakePrice: "600.000 ₫", name: "Cung cấp 20 Tester (14 ngày)", enName: "Provide 20 Testers (14 days)" },
    maintenance: { categories: ['platform'], selected: false, price: 1500000, fakePrice: "2.000.000 ₫", name: "Bảo trì 1 tháng", enName: "1-Month Maintenance" },
    // Web & CRM Common
    cloudHosting: { categories: ['web', 'crm'], selected: false, price: 3850000, fakePrice: "5.000.000 ₫", name: "Hạ tầng Cloud Hosting Tốc Độ Cao (1 Năm)", enName: "High-Speed Cloud Hosting (1 Year)", desc: "Băng thông rộng, lưu trữ mã nguồn Website, CRM, tự động backup dữ liệu", enDesc: "Broadband, source code storage for Web/CRM, automated data backups" },
    vietnamDomain: { categories: ['web', 'crm'], selected: false, price: 900000, fakePrice: "1.200.000 ₫", name: "Tên miền Việt Nam (.vn) 1 Năm", enName: "Vietnam Domain (.vn) 1 Year", desc: "Hỗ trợ trỏ DNS, cài đặt cấu hình chứng chỉ bảo mật SSL miễn phí", enDesc: "DNS setup support, free SSL certificate installation" },
    // Web Only
    webSEO: { categories: ['web'], selected: false, price: 2000000, fakePrice: "3.000.000 ₫", name: "Tối ưu SEO Onpage", enName: "On-page SEO Optimization" },
    webMaintenance: { categories: ['web'], selected: false, price: 1000000, fakePrice: "1.500.000 ₫", name: "Bảo trì & Cập nhật nội dung (1 tháng)", enName: "Content Update & Maintenance (1 month)" },
    // App
    appPush: { categories: ['app'], selected: false, price: 2000000, fakePrice: "3.000.000 ₫", name: "Tích hợp Push Notification", enName: "Push Notification Integration" },
    appMaintenance: { categories: ['app'], selected: false, price: 2000000, fakePrice: "3.000.000 ₫", name: "Bảo trì App (1 tháng)", enName: "App Maintenance (1 month)" },
    // CRM Only
    crmTraining: { categories: ['crm'], selected: false, price: 2000000, fakePrice: "3.000.000 ₫", name: "Đào tạo sử dụng tận nơi", enName: "On-site Training" },
    crmMaintenance: { categories: ['crm'], selected: false, price: 3000000, fakePrice: "5.000.000 ₫", name: "Bảo trì hệ thống (1 tháng)", enName: "System Maintenance (1 month)" }
  });

  // Hardcoded profile info - Edit this directly in the code
  const profile = {
    name: "Lê Minh Quang",
    phone: "0387412607",
    zalo: "https://zalo.me/0387412607",
    email: "lmquang.devops@gmail.com",
    bank: "TPBank - 10387412607 - LÊ MINH QUANG",
  };

  const [quoteTemplate, setQuoteTemplate] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const formatMoney = (amount: number) => {
    if (lang === 'en') {
      const usdAmount = amount / 24000;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      }).format(usdAmount);
    }
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const selectCalcBase = (type: string, price: number, name: string) => {
    if (baseType === type) {
      setBasePrice(0);
      setBaseName("");
      setBaseType("");
    } else {
      setBasePrice(price);
      setBaseName(name);
      setBaseType(type);
    }
  };

  const selectPackage = (type: string, price: number, name: string) => {
    selectCalcBase(type, price, name);
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleAddon = (type: keyof typeof addons) => {
    setAddons((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        selected: !prev[type].selected,
      },
    }));
  };

  const toggleDevService = (type: keyof typeof devServices) => {
    setDevServices(prev => {
      const next = { ...prev };
      const isSelecting = !prev[type].selected;
      
      if (isSelecting) {
        if (type === 'web-company' || type === 'web-custom') {
          next['web-landing'] = { ...next['web-landing'], selected: false };
          next['web-ecommerce'] = { ...next['web-ecommerce'], selected: false };
          if (type === 'web-company') next['web-custom'] = { ...next['web-custom'], selected: false };
          if (type === 'web-custom') next['web-company'] = { ...next['web-company'], selected: false };
        } else if (type === 'web-landing' || type === 'web-ecommerce') {
          next['web-company'] = { ...next['web-company'], selected: false };
          next['web-custom'] = { ...next['web-custom'], selected: false };
        }
      }

      next[type] = {
        ...next[type],
        selected: isSelecting
      };
      
      return next;
    });
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

  const rawTotal = basePrice + addonsTotal + devTotal;
  const total = Math.round(rawTotal * multiplier);

  const qrUrl = `https://img.vietqr.io/image/tpbank-10387412607-compact2.png?amount=${total / 2}&accountName=LE%20MINH%20QUANG&addInfo=${encodeURIComponent(`Tam ung StorePublish`)}`;

  useEffect(() => {
    let text = lang === 'vi' 
      ? `Kính gửi Anh/Chị,\n\nEm xin gửi thông tin báo giá chi tiết dịch vụ hỗ trợ đưa ứng dụng lên Store (thương hiệu StorePublish) cho dự án của mình:\n\n`
      : `Dear Sir/Madam,\n\nI am sending you the detailed service quote for publishing your application to the Store (StorePublish brand):\n\n`;
    
    text += lang === 'vi' ? `[1] GÓI DỊCH VỤ CHÍNH\n` : `[1] MAIN SERVICE PACKAGE\n`;
    text += lang === 'vi' ? `- Tên gói: ${baseName}\n` : `- Package name: ${baseName}\n`;
    text += lang === 'vi' ? `- Chi phí: ${formatMoney(basePrice)}\n` : `- Cost: ${formatMoney(basePrice)}\n`;

    if (activeDevServices.length > 0) {
      text += lang === 'vi' ? `\n[2] DỊCH VỤ LẬP TRÌNH\n` : `\n[2] DEVELOPMENT SERVICES\n`;
      activeDevServices.forEach((s) => {
        const sName = lang === 'vi' ? s.name : s.name.replace('Lập trình ', 'Dev ').replace('Hệ thống ', 'System ');
        text += `- ${sName}: +${formatMoney(s.price)}\n`;
      });
    }

    if (activeAddons.length > 0) {
      text += lang === 'vi' ? `\n[3] TIỆN ÍCH BỔ SUNG\n` : `\n[3] ADD-ONS\n`;
      activeAddons.forEach((addon) => {
        const addonName = lang === 'vi' ? addon.name : (t as any)[`addon_${addon.name.includes('Store') ? 'listing' : addon.name.includes('Reject') ? 'reject' : addon.name.includes('Tester') ? 'tester' : 'maint'}`];
        text += `- ${addonName}: +${formatMoney(addon.price)}\n`;
      });
    }

    text += lang === 'vi' ? `\n[4] TỔNG QUAN CHI PHÍ\n` : `\n[4] COST OVERVIEW\n`;
    text += lang === 'vi' ? `- TỔNG CHI PHÍ DỰ KIẾN: ${formatMoney(total)}\n` : `- ESTIMATED TOTAL COST: ${formatMoney(total)}\n`;
    text += lang === 'vi' ? `- SỐ TIỀN TẠM ỨNG (50%): ${formatMoney(total / 2)}\n\n` : `- ADVANCE DEPOSIT (50%): ${formatMoney(total / 2)}\n\n`;

    text += lang === 'vi' ? `[5] CHI TIẾT HỖ TRỢ BAO GỒM\n` : `[5] SUPPORT DETAILS INCLUDE\n`;
    text += lang === 'vi' ? `- Build file release tối ưu hoàn chỉnh\n` : `- Build fully optimized release file\n`;
    text += lang === 'vi' ? `- Kiểm tra & cấu hình các thông số Store Listing\n` : `- Check & configure Store Listing parameters\n`;
    text += lang === 'vi' ? `- Khai báo các quyền riêng tư & thông tin an toàn dữ liệu\n` : `- Declare privacy rights & data safety information\n`;
    text += lang === 'vi' ? `- Đồng hành và giải trình xử lý phản hồi với Reviewer từ A-Z\n\n` : `- Accompany and explain feedback with Reviewer from A-Z\n\n`;

    text += lang === 'vi' 
      ? `* Lưu ý: Giá trên chưa bao gồm phí khởi tạo tài khoản Apple/Google và các chỉnh sửa cấu trúc lớn trong code gốc của ứng dụng.\n\n`
      : `* Note: The above price does not include Apple/Google account registration fees and major structural changes in the app's source code.\n\n`;

    text += lang === 'vi' ? `[6] THÔNG TIN THANH TOÁN & LIÊN HỆ\n` : `[6] PAYMENT & CONTACT INFO\n`;
    text += lang === 'vi' ? `- Người phụ trách: Lê Minh Quang\n` : `- Contact Person: Le Minh Quang\n`;
    text += `- Hotline/Zalo: ${profile.phone}\n`;
    text += `- Email: ${profile.email}\n`;
    text += lang === 'vi' ? `- Ngân hàng: ${profile.bank}\n` : `- Bank: TPBank - 10387412607 - LE MINH QUANG\n`;
    text += lang === 'vi' ? `- Nội dung chuyển khoản: Tam ung StorePublish\n` : `- Transfer Memo: Deposit StorePublish ${baseName}\n`;
    
    text += lang === 'vi' 
      ? `\nRất mong có cơ hội được đồng hành và hợp tác cùng Anh/Chị!\n\n`
      : `\nLooking forward to the opportunity to accompany and cooperate with you!\n\n`;
    text += lang === 'vi' 
      ? `Trân trọng,\nLê Minh Quang - StorePublish`
      : `Best regards,\nLe Minh Quang - StorePublish`;

    setQuoteTemplate(text);
  }, [baseName, basePrice, activeAddons, activeDevServices, total, profile, qrUrl, lang]);

  const copyFormQuote = async () => {
    try {
      const htmlQuote = quoteTemplate.replace(/\n/g, '<br/>') + `<br/><br/><p><strong>Mã QR Tạm ứng:</strong></p><img src="${qrUrl}" width="200" height="200" alt="QR Code" />`;
      
      const textBlob = new Blob([quoteTemplate + `\n\nLink QR Thanh toán: ${qrUrl}`], { type: 'text/plain' });
      const htmlBlob = new Blob([htmlQuote], { type: 'text/html' });
      
      const clipboardItem = new ClipboardItem({
        'text/plain': textBlob,
        'text/html': htmlBlob,
      });
      
      await navigator.clipboard.write([clipboardItem]);
    } catch (err) {
      navigator.clipboard.writeText(quoteTemplate + `\n\nLink QR Thanh toán: ${qrUrl}`);
    }
    
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleZaloClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // 1. Thử gọi Deep Link để ép mở App Zalo trên máy tính/điện thoại
    window.location.href = 'zalo://conversation?phone=0387412607';
    
    // 2. Nếu sau 500ms mà không mở được App (trình duyệt không bị blur), sẽ tự động nhảy sang Zalo Web
    setTimeout(() => {
      window.open('https://zalo.me/0387412607', '_blank');
    }, 500);
  };

  const sendEmail = async () => {
    if (!clientEmail) {
      alert(lang === 'vi' ? "Vui lòng nhập địa chỉ email của bạn!" : t.alert_email_req);
      return;
    }
    
    setIsSending(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: clientEmail, quoteText: quoteTemplate, qrUrl }),
      });
      
      if (res.ok) {
        alert(lang === 'vi' ? "Đã gửi báo giá thành công vào email của bạn!" : t.alert_success);
        setClientEmail("");
      } else {
        const data = await res.json();
        alert(data.error || (lang === 'vi' ? "Có lỗi xảy ra, vui lòng thử lại." : t.alert_error));
      }
    } catch (error) {
      alert(lang === 'vi' ? "Không thể kết nối đến máy chủ." : t.alert_network);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans selection:bg-[#0071e3] selection:text-white relative">
      {/* Header */}
      <header className="bg-white sticky top-0 w-full z-50 border-b border-[#1d1d1f]/10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/iconwebb.png" alt="StorePublish" className="w-6 h-6 object-contain" />
            <span className="font-semibold text-xs tracking-tight">StorePublish</span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 text-xs font-medium text-[#1d1d1f]/80">
            <a href="#packages" className="hover:text-[#1d1d1f] transition-colors">{t.nav_pricing}</a>
            <a href="#calculator" className="hover:text-[#1d1d1f] transition-colors">{t.nav_calc}</a>
            <a href="#services" className="hover:text-[#1d1d1f] transition-colors">{t.nav_services}</a>
            <a href="#about" className="hover:text-[#1d1d1f] transition-colors">{t.nav_about}</a>
            <a href="#contact" className="hover:text-[#1d1d1f] transition-colors">{t.nav_contact}</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-[#f5f5f7] rounded-full p-0.5">
              <button
                onClick={() => setLang('vi')}
                className={`flex items-center gap-1 justify-center text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full transition-all duration-200 ${
                  lang === 'vi' 
                    ? 'bg-white text-[#1d1d1f] shadow-[0_1px_2px_rgba(0,0,0,0.05),0_0_1px_rgba(0,0,0,0.1)]' 
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                VI
              </button>
              <button
                onClick={() => setLang('en')}
                className={`flex items-center gap-1 justify-center text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full transition-all duration-200 ${
                  lang === 'en' 
                    ? 'bg-white text-[#1d1d1f] shadow-[0_1px_2px_rgba(0,0,0,0.05),0_0_1px_rgba(0,0,0,0.1)]' 
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                EN
              </button>
            </div>
            <a
              href="#calculator"
              className="hidden md:flex text-xs font-medium text-[#0071e3] hover:text-[#0077ed] items-center gap-1.5"
            >
              {t.nav_create_quote}
            </a>
            <button 
              className="md:hidden text-[#1d1d1f]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-12 left-0 w-full bg-white/95 backdrop-blur-md border-b border-[#1d1d1f]/10 shadow-lg py-4 px-4 flex flex-col gap-4">
            <a href="#packages" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-[#1d1d1f]">{t.nav_pricing}</a>
            <a href="#calculator" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-[#1d1d1f]">{t.nav_calc}</a>
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-[#1d1d1f]">{t.nav_services}</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-[#1d1d1f]">{t.nav_about}</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-[#1d1d1f]">{t.nav_contact}</a>
            <a href="#calculator" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-[#0071e3]">{t.nav_create_quote}</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden flex flex-col justify-center items-center min-h-screen">
        {/* Background specific to Hero - 100% Crisp as requested */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{ backgroundImage: `url('/apple-announces-rcs-support-for-ios-what-does-this-mean-for_dk9e.2496.webp')` }}
        />
        
        <div className="w-full max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10 flex flex-col items-center">
          {/* Glassmorphism Container to separate text from busy background */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-10 md:p-14 rounded-[3rem] shadow-2xl w-full max-w-2xl mx-auto">
            
            <div className="flex justify-center mb-10">
              {/* Image with removed background and fade-out mask at the bottom */}
              <div className="p-2 drop-shadow-2xl">
                <img 
                  src="/tai-ung-dung-mien-phi-1-transparent-v2.png" 
                  alt="Tải ứng dụng miễn phí" 
                  className="h-36 md:h-48 object-contain hover:scale-105 transition-transform duration-700 ease-out drop-shadow-2xl" 
                  style={{ 
                    WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                  }}
                />
              </div>
            </div>

            <h1 
              className="text-5xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent inline-block pb-1 mb-6 drop-shadow-md"
              style={{ backgroundImage: 'linear-gradient(90deg, #007AFF, #A855F7, #EC4899, #F97316)' }}
            >
              {t.hero_title_1}<br />{t.hero_title_2}
            </h1>
            <p className="text-lg md:text-xl font-medium text-white/90 tracking-tight mb-10 max-w-xl mx-auto">
              {t.hero_desc}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
              <a
                href="#packages"
                className="bg-white hover:bg-[#f5f5f7] px-8 h-[54px] rounded-full text-[15px] font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg w-full sm:w-[220px] border border-transparent"
              >
                <span className="bg-gradient-to-r from-[#022640] to-[#5786AB] bg-clip-text text-transparent pb-[2px]">
                  {t.hero_btn_pricing}
                </span>
              </a>
              <a
                href="#calculator"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-[15px] font-medium px-8 h-[54px] rounded-full transition-colors flex items-center justify-center gap-2 w-full sm:w-[220px]"
              >
                {t.hero_btn_calc} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section id="packages" className="py-20 scroll-mt-12 relative z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-semibold tracking-tight bg-gradient-to-r from-[#022640] to-[#5786AB] bg-clip-text text-transparent inline-block pb-1 mb-4"
            >{t.pricing_title}</h2>
            <p className="text-xl text-[#86868b] font-medium tracking-tight">{t.pricing_desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-[24px] p-8 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div>
                <h3 className="text-[28px] font-semibold tracking-tight text-[#1d1d1f] mb-1">Android</h3>
                <p className="text-[15px] text-[#86868b] font-medium mb-8">Basic</p>
                <div className="flex items-end gap-2 mb-8">
                  <div className="text-3xl font-semibold text-[#1d1d1f] tracking-tight">{lang === 'vi' ? '1.2M' : '$50'}</div>
                  <div className="text-[17px] font-medium text-[#86868b] line-through mb-1">{lang === 'vi' ? '1.5M' : '$62'}</div>
                </div>
                <ul className="space-y-4 mb-8 text-[15px] text-[#1d1d1f]">
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'Build file .aab' : 'Build .aab file'}</li>
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'Kiểm tra cấu hình' : 'Check configuration'}</li>
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'Upload Google Play' : 'Upload to Google Play'}</li>
                </ul>
              </div>
              <button
                onClick={() => selectPackage("android", 1200000, "Basic Android")}
                className="w-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] py-3 rounded-full text-[15px] font-medium transition-colors"
              >
                {t.btn_select}
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-[24px] p-8 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div>
                <h3 className="text-[28px] font-semibold tracking-tight text-[#1d1d1f] mb-1">iOS</h3>
                <p className="text-[15px] text-[#86868b] font-medium mb-8">Basic</p>
                <div className="flex items-end gap-2 mb-8">
                  <div className="text-3xl font-semibold text-[#1d1d1f] tracking-tight">{lang === 'vi' ? '2.5M' : '$104'}</div>
                  <div className="text-[17px] font-medium text-[#86868b] line-through mb-1">{lang === 'vi' ? '3.0M' : '$125'}</div>
                </div>
                <ul className="space-y-4 mb-8 text-[15px] text-[#1d1d1f]">
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'Build file .ipa' : 'Build .ipa file'}</li>
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'Cấu hình Profile' : 'Profile configuration'}</li>
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'Upload App Store' : 'Upload to App Store'}</li>
                </ul>
              </div>
              <button
                onClick={() => selectPackage("ios", 2500000, "Basic iOS")}
                className="w-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] py-3 rounded-full text-[15px] font-medium transition-colors"
              >
                {t.btn_select}
              </button>
            </div>

            {/* Card 3 - Highlighted */}
            <div className="bg-[#1d1d1f] rounded-[24px] p-8 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.08)] relative">
              <div className="absolute top-6 right-8 text-[#f5f5f7] text-[11px] font-semibold px-2 py-1 bg-white/10 rounded-full tracking-wide uppercase">
                {t.price_popular}
              </div>
              <div>
                <h3 className="text-[28px] font-semibold tracking-tight text-[#f5f5f7] mb-1">Combo</h3>
                <p className="text-[15px] text-[#86868b] font-medium mb-8">Dual Store</p>
                <div className="flex items-end gap-2 mb-8">
                  <div className="text-3xl font-semibold text-[#f5f5f7] tracking-tight">{lang === 'vi' ? '4.0M' : '$166'}</div>
                  <div className="text-[17px] font-medium text-[#86868b] line-through mb-1">{lang === 'vi' ? '5.5M' : '$229'}</div>
                </div>
                <ul className="space-y-4 mb-8 text-[15px] text-[#f5f5f7]">
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'Quyền lợi Android + iOS' : 'Android + iOS benefits'}</li>
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'Tối ưu Store Listing' : 'ASO Optimization'}</li>
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'Hỗ trợ lỗi submit' : 'Submission error support'}</li>
                </ul>
              </div>
              <button
                onClick={() => selectPackage("combo", 4000000, "Combo Dual Store")}
                className="w-full bg-[#f5f5f7] hover:bg-white text-[#1d1d1f] py-3 rounded-full text-[15px] font-medium transition-colors"
              >
                {t.btn_select}
              </button>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-[24px] p-8 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div>
                <h3 className="text-[28px] font-semibold tracking-tight text-[#1d1d1f] mb-1">Pro</h3>
                <p className="text-[15px] text-[#86868b] font-medium mb-8">Full Support</p>
                <div className="flex items-end gap-2 mb-8">
                  <div className="text-3xl font-semibold text-[#1d1d1f] tracking-tight">{lang === 'vi' ? '6.5M' : '$270'}</div>
                  <div className="text-[17px] font-medium text-[#86868b] line-through mb-1">{lang === 'vi' ? '8.5M' : '$354'}</div>
                </div>
                <ul className="space-y-4 mb-8 text-[15px] text-[#1d1d1f]">
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'App có Login, Social' : 'App with Login, Social'}</li>
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'Soát lỗi chuyên sâu' : 'Deep bug inspection'}</li>
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'Bao xử lý reject 3 vòng' : 'Covers up to 3 rejections'}</li>
                </ul>
              </div>
              <button
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
                <h3 className="text-[28px] font-semibold tracking-tight text-[#1d1d1f] mb-1">{lang === 'vi' ? 'Website' : 'Web App'}</h3>
                <p className="text-[15px] text-[#86868b] font-medium mb-8">{lang === 'vi' ? 'Thiết kế hiện đại' : 'Modern Design'}</p>
                <div className="flex items-end gap-2 mb-8">
                  <div className="text-3xl font-semibold text-[#1d1d1f] tracking-tight">{lang === 'vi' ? 'Từ 2.5M' : '$104 – $229'}</div>
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
                <h3 className="text-[28px] font-semibold tracking-tight text-[#1d1d1f] mb-1">{lang === 'vi' ? 'Mobile App' : 'Mobile App'}</h3>
                <p className="text-[15px] text-[#86868b] font-medium mb-8">{lang === 'vi' ? 'iOS & Android' : 'iOS & Android'}</p>
                <div className="flex items-end gap-2 mb-8">
                  <div className="text-3xl font-semibold text-[#1d1d1f] tracking-tight">{lang === 'vi' ? 'Từ 20.0M' : '$833 – $1,458'}</div>
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
                <h3 className="text-[28px] font-semibold tracking-tight text-[#f5f5f7] mb-1">{lang === 'vi' ? 'CRM Custom' : 'Custom CRM'}</h3>
                <p className="text-[15px] text-[#86868b] font-medium mb-8">{lang === 'vi' ? 'Hệ thống Quản trị' : 'Management System'}</p>
                <div className="flex items-end gap-2 mb-8">
                  <div className="text-3xl font-semibold text-[#f5f5f7] tracking-tight">{lang === 'vi' ? 'Từ 15.0M' : '$625 – $1,041'}</div>
                </div>
                <ul className="space-y-4 mb-8 text-[15px] text-[#f5f5f7]">
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'CRM Quản Lý Bán Hàng' : 'Sales CRM'}</li>
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'ERP Mini Đa Nền Tảng' : 'Multi-platform Mini ERP'}</li>
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#86868b] shrink-0" />{lang === 'vi' ? 'Bảo mật & Phân quyền đa cấp' : 'Security & Multi-level roles'}</li>
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
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="mb-20 relative z-10 border-t border-[#d2d2d7]/50 pt-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-semibold tracking-tight bg-gradient-to-r from-[#022640] to-[#5786AB] bg-clip-text text-transparent inline-block pb-1 mb-4"
            >{t.calc_title}</h2>
            <p className="text-xl text-[#86868b] font-medium tracking-tight">{t.calc_desc}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left side - Selection */}
            <div className="lg:col-span-7">
              {/* Tabs */}
              <div className="flex overflow-x-auto gap-2 pb-4 mb-4 scrollbar-hide snap-x">
                {[
                  { id: 'platform', label: lang === 'vi' ? 'Phát hành App' : 'App Publishing' },
                  { id: 'web', label: lang === 'vi' ? 'Website' : 'Website' },
                  { id: 'app', label: lang === 'vi' ? 'Mobile App' : 'Mobile App' },
                  { id: 'crm', label: lang === 'vi' ? 'CRM Custom' : 'CRM Custom' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`shrink-0 snap-start px-5 py-2.5 rounded-full text-[15px] font-medium transition-all ${
                      activeTab === tab.id 
                        ? 'bg-[#1d1d1f] text-white shadow-md' 
                        : 'bg-white text-[#86868b] hover:bg-[#f5f5f7] border border-[#d2d2d7]/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === 'platform' && (
              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8 animate-in fade-in slide-in-from-bottom-2 duration-300">

                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-6 tracking-tight">{lang === 'vi' ? '1. Nền tảng' : '1. Platform'}</h3>
                <div className="space-y-4">
                  {[
                    { id: "android", name: "Basic Android", price: 1200000, fakePrice: lang === 'vi' ? "1.500.000 ₫" : "$62", desc: lang === 'vi' ? "Phát hành lên Google Play" : "Publish to Google Play" },
                    { id: "ios", name: "Basic iOS", price: 2500000, fakePrice: lang === 'vi' ? "3.000.000 ₫" : "$125", desc: lang === 'vi' ? "Phát hành lên App Store" : "Publish to App Store" },
                    { id: "combo", name: "Combo Dual Store", price: 4000000, fakePrice: lang === 'vi' ? "5.500.000 ₫" : "$229", desc: lang === 'vi' ? "Cả Google Play và App Store" : "Both Google Play and App Store" },
                    { id: "full", name: "Full Support", price: 6500000, fakePrice: lang === 'vi' ? "8.500.000 ₫" : "$354", desc: lang === 'vi' ? "Hỗ trợ toàn diện, bảo hành reject" : "Full support, rejection warranty" },
                  ].map((pkg) => (
                    <label
                      key={pkg.id}
                      className={`flex items-center p-5 rounded-[16px] cursor-pointer transition-all border ${
                        baseType === pkg.id ? "border-[#0071e3] ring-1 ring-[#0071e3] bg-[#0071e3]/5" : "border-[#d2d2d7] hover:border-[#86868b]"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        selectCalcBase(pkg.id, pkg.price, pkg.name);
                      }}
                    >
                      <input
                        type="radio"
                        name="calc-package"
                        checked={baseType === pkg.id}
                        readOnly
                        className="h-5 w-5 accent-[#0071e3] border-[#d2d2d7]"
                      />
                      <div className="ml-4 flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                        <div>
                          <div className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">{pkg.name}</div>
                          <div className="text-[13px] text-[#86868b] mt-1">{pkg.desc}</div>
                        </div>
                        <div className="flex items-center gap-2 justify-end">
                          <div className="text-[13px] font-medium text-[#86868b] line-through whitespace-nowrap">{formatMoney(Math.round(parseInt(pkg.fakePrice.replace(/[^0-9]/g, '')) * multiplier))}</div>
                          <div className="text-[17px] font-semibold text-[#1d1d1f] whitespace-nowrap">{formatMoney(Math.round(pkg.price * multiplier))}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              )}

              {activeTab === 'web' && (
              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-6 tracking-tight">{lang === 'vi' ? 'Lập trình Website' : 'Website Development'}</h3>
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
                          <div className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">{lang === 'vi' ? service.name : service.enName}</div>
                          <div className="text-[13px] text-[#86868b] mt-1">{lang === 'vi' ? service.desc : service.enDesc}</div>
                        </div>
                        <div className="flex items-center gap-2 justify-end">
                          <div className="text-[13px] font-medium text-[#86868b] line-through whitespace-nowrap">{lang === 'vi' ? formatMoney(Math.round(parseInt(service.fakePrice.replace(/[^0-9]/g, '')) * multiplier)) : `$${Math.round(parseInt(service.fakePrice.replace(/[^0-9]/g, '')) * multiplier / 24000)}`}</div>
                          <div className="text-[17px] font-semibold text-[#1d1d1f] whitespace-nowrap">{new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'vi-VN', {style: 'currency', currency: lang === 'en' ? 'USD' : 'VND', maximumFractionDigits: 0}).format(lang === 'en' ? Math.round(service.price * multiplier) / 24000 : Math.round(service.price * multiplier))}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              )}

              {activeTab === 'app' && (
              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-6 tracking-tight">{lang === 'vi' ? 'Lập trình Mobile App' : 'Mobile App Development'}</h3>
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
                          <div className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">{lang === 'vi' ? service.name : service.enName}</div>
                          <div className="text-[13px] text-[#86868b] mt-1">{lang === 'vi' ? service.desc : service.enDesc}</div>
                        </div>
                        <div className="flex items-center gap-2 justify-end">
                          <div className="text-[13px] font-medium text-[#86868b] line-through whitespace-nowrap">{lang === 'vi' ? formatMoney(Math.round(parseInt(service.fakePrice.replace(/[^0-9]/g, '')) * multiplier)) : `$${Math.round(parseInt(service.fakePrice.replace(/[^0-9]/g, '')) * multiplier / 24000)}`}</div>
                          <div className="text-[17px] font-semibold text-[#1d1d1f] whitespace-nowrap">{new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'vi-VN', {style: 'currency', currency: lang === 'en' ? 'USD' : 'VND', maximumFractionDigits: 0}).format(lang === 'en' ? Math.round(service.price * multiplier) / 24000 : Math.round(service.price * multiplier))}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              )}

              {activeTab === 'crm' && (
              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-6 tracking-tight">{lang === 'vi' ? 'Hệ thống CRM Custom' : 'Custom CRM System'}</h3>
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
                          <div className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">{lang === 'vi' ? service.name : service.enName}</div>
                          <div className="text-[13px] text-[#86868b] mt-1">{lang === 'vi' ? service.desc : service.enDesc}</div>
                        </div>
                        <div className="flex items-center gap-2 justify-end">
                          <div className="text-[13px] font-medium text-[#86868b] line-through whitespace-nowrap">{lang === 'vi' ? formatMoney(Math.round(parseInt(service.fakePrice.replace(/[^0-9]/g, '')) * multiplier)) : `$${Math.round(parseInt(service.fakePrice.replace(/[^0-9]/g, '')) * multiplier / 24000)}`}</div>
                          <div className="text-[17px] font-semibold text-[#1d1d1f] whitespace-nowrap">{new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'vi-VN', {style: 'currency', currency: lang === 'en' ? 'USD' : 'VND', maximumFractionDigits: 0}).format(lang === 'en' ? Math.round(service.price * multiplier) / 24000 : Math.round(service.price * multiplier))}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              )}

              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8">
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-6 tracking-tight">{lang === 'vi' ? 'Tiện ích bổ sung (Dịch vụ đi kèm)' : 'Add-ons (Accompanied Services)'}</h3>
                <div className="space-y-4">
                  {Object.entries(addons)
                    .filter(([_, addon]) => addon.categories?.includes(activeTab))
                    .map(([key, addon]) => {
                    if (key === "androidTester" && baseType === "ios") return null;
                    return (
                      <label
                        key={key}
                        className={`flex items-center p-5 rounded-[16px] cursor-pointer transition-all border ${
                          addon.selected ? "border-[#0071e3] ring-1 ring-[#0071e3] bg-[#0071e3]/5" : "border-[#d2d2d7] hover:border-[#86868b]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={addon.selected}
                          onChange={() => toggleAddon(key as keyof typeof addons)}
                          className="h-5 w-5 accent-[#0071e3] rounded-[4px] border-[#d2d2d7]"
                        />
                        <div className="ml-4 flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                          <div>
                            <div className="text-[17px] font-medium text-[#1d1d1f] tracking-tight">{lang === 'vi' ? addon.name : (addon as any).enName || addon.name}</div>
                            {(addon as any).desc && (
                              <div className="text-[13px] text-[#86868b] mt-1">{lang === 'vi' ? (addon as any).desc : (addon as any).enDesc}</div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 justify-end">
                            <div className="text-[12px] text-[#86868b] line-through whitespace-nowrap">{lang === 'vi' ? formatMoney(Math.round(parseInt(addon.fakePrice.replace(/[^0-9]/g, '')) * multiplier)) : `$${Math.round(parseInt(addon.fakePrice.replace(/[^0-9]/g, '')) * multiplier / 24000)}`}</div>
                            <div className="font-medium text-[#1d1d1f] whitespace-nowrap">{formatMoney(Math.round(addon.price * multiplier))}</div>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Message Template Display moved here instead of separate section */}
              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">{lang === 'vi' ? 'Bản xem trước báo giá' : 'Quote Preview'}</h3>
                </div>
                <textarea
                  readOnly
                  value={quoteTemplate}
                  className="w-full h-80 bg-[#f5f5f7] border-none rounded-[12px] p-5 text-[14px] font-mono text-[#1d1d1f]/80 focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Right side - Summary */}
            <div className="lg:col-span-5 relative">

              {/* Multiplier Block */}
              <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-6 border border-[#d2d2d7]/40">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0071e3] mb-1">{lang === 'vi' ? 'Phân Khúc Định Giá' : 'Pricing Segment'}</p>
                    <p className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">{lang === 'vi' ? 'Hệ số nhân giá' : 'Price Multiplier'}</p>
                  </div>
                  <span className="text-[13px] font-semibold px-3 py-1.5 rounded-full bg-[#0071e3] text-white whitespace-nowrap">
                    {multiplierMode === 'custom' ? `${lang === 'vi' ? 'Tự chọn' : 'Custom'} ×${multiplier.toFixed(1)}` : `×${multiplier.toFixed(1)}`}
                  </span>
                </div>

                {/* Presets */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {([
                    { key: 'student', label: 'Student', value: 1.0 },
                    { key: 'freelancer', label: 'Freelancer', value: 1.8 },
                    { key: 'agency', label: 'Agency', value: 3.0 },
                  ] as const).map(preset => (
                    <button
                      key={preset.key}
                      onClick={() => { setMultiplierMode(preset.key); setMultiplier(preset.value); }}
                      className={`py-2 rounded-[10px] text-[13px] font-medium transition-all border ${
                        multiplierMode === preset.key
                          ? 'bg-[#1d1d1f] text-white border-[#1d1d1f]'
                          : 'bg-[#f5f5f7] text-[#86868b] border-transparent hover:border-[#86868b]'
                      }`}
                    >
                      {preset.label}<br/><span className="text-[11px] opacity-70">×{preset.value.toFixed(1)}</span>
                    </button>
                  ))}
                </div>

                {/* Custom Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[13px] text-[#86868b]">{lang === 'vi' ? 'Tùy chỉnh hệ số nhân:' : 'Custom multiplier:'}</span>
                    <span className="text-[17px] font-semibold text-[#0071e3]">×{multiplier.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="5.0"
                    step="0.1"
                    value={multiplier}
                    onChange={e => { setMultiplier(parseFloat(e.target.value)); setMultiplierMode('custom'); }}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#0071e3] bg-[#e5e5ea]"
                  />
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[11px] font-medium text-[#86868b] uppercase tracking-wider">{lang === 'vi' ? 'Sàn (×1.0)' : 'Floor (×1.0)'}</span>
                    <span className="text-[11px] font-medium text-[#86868b] uppercase tracking-wider">×3.0</span>
                    <span className="text-[11px] font-medium text-[#86868b] uppercase tracking-wider">{lang === 'vi' ? 'Cao cấp (×5.0)' : 'Premium (×5.0)'}</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#1d1d1f] rounded-[24px] p-8 sticky top-[64px] max-h-[calc(100vh-80px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] shadow-2xl text-[#f5f5f7]">
                <h3 className="text-[13px] font-semibold tracking-wider text-[#86868b] uppercase mb-8">{t.sum_title}</h3>
                
                <div className="space-y-5 text-[15px] mb-8 pb-8 border-b border-white/10">
                  <div className="flex justify-between items-start">
                    <span className="text-[#f5f5f7]/80">{baseName}</span>
                    <span className="font-semibold">{formatMoney(basePrice)}</span>
                  </div>
                  {activeDevServices.map((s, idx) => (
                    <div key={`dev-${idx}`} className="flex justify-between items-start">
                       <span className="text-[#f5f5f7]/80">{lang === 'vi' ? s.name : s.name.replace('Lập trình ', 'Dev ').replace('Hệ thống ', 'System ')}</span>
                      <span className="font-semibold">+{formatMoney(s.price)}</span>
                    </div>
                  ))}
                  {activeAddons.map((addon, idx) => (
                    <div key={idx} className="flex justify-between items-start">
                       <span className="text-[#f5f5f7]/80">{lang === 'vi' ? addon.name : (t as any)[`addon_${addon.name.includes('Store') ? 'listing' : addon.name.includes('Reject') ? 'reject' : addon.name.includes('Tester') ? 'tester' : 'maint'}`]}</span>
                      <span className="font-semibold">+{formatMoney(addon.price)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-end mb-6">
                  <span className="text-[19px] font-medium tracking-tight">{lang === 'vi' ? 'Tổng cộng' : 'Total'}</span>
                  <span className="text-4xl font-semibold tracking-tight">{formatMoney(total)}</span>
                </div>

                <div className="bg-white rounded-[16px] p-5 mb-10 flex flex-col items-center text-center">
                  <p className="text-[13px] font-semibold text-[#86868b] uppercase tracking-wider mb-3">{lang === 'vi' ? 'Quét mã tạm ứng (50%)' : 'Deposit QR Code (50%)'}</p>
                  <div className="bg-[#f5f5f7] p-2 rounded-[12px] mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={qrUrl} 
                      alt="QR Tạm ứng" 
                      className="w-40 h-40 rounded-[8px]" 
                    />
                  </div>
                  <p className="text-[#1d1d1f] font-semibold text-[15px] mb-2">{lang === 'vi' ? 'Số tiền cần ck:' : 'Amount to transfer:'} <span className="text-[#0071e3] text-[17px]">{formatMoney(total / 2)}</span></p>
                  <p className="text-[#1d1d1f] font-semibold text-[15px]">TPBank - {lang === 'vi' ? 'LÊ MINH QUANG' : 'LE MINH QUANG'}</p>
                  <p className="text-[#1d1d1f] text-[14px] font-mono mt-0.5">10387412607</p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-3">
                    <input
                      type="email"
                      placeholder={lang === 'vi' ? "Nhập email để nhận báo giá..." : t.input_email}
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          sendEmail();
                        }
                      }}
                      className="bg-white/10 border border-white/20 focus:border-white rounded-full px-5 py-4 text-[15px] text-white placeholder:text-white/50 outline-none transition-colors w-full"
                    />
                    <button
                      onClick={sendEmail}
                      disabled={isSending}
                      className="bg-white hover:bg-[#f5f5f7] disabled:opacity-50 disabled:cursor-not-allowed px-6 py-4 rounded-full text-[15px] font-semibold transition-colors w-full shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                    >
                      <span className="bg-gradient-to-r from-[#022640] to-[#5786AB] bg-clip-text text-transparent">
                        {isSending ? t.btn_sending : t.btn_send_email}
                      </span>
                    </button>
                  </div>

                  <button
                    onClick={copyFormQuote}
                    className="w-full bg-white/10 hover:bg-white/20 text-white py-4 rounded-full text-[15px] font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    {isCopied ? t.btn_copied : t.btn_copy}
                  </button>

                  <a
                    href="https://zalo.me/0387412607"
                    onClick={handleZaloClick}
                    className="w-full bg-white hover:bg-[#f5f5f7] py-4 rounded-full text-[15px] font-semibold transition-colors flex items-center justify-center gap-2 mt-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  >
                    <img src="/zaloicon.jpg" alt="Zalo" className="w-6 h-6 object-cover" />
                    <span className="bg-gradient-to-r from-[#022640] to-[#5786AB] bg-clip-text text-transparent">
                      {t.btn_zalo}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Extra Costs & Notes (Unified) */}
      <section className="py-20 border-t border-[#d2d2d7]/50 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#f5f5f7] rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <h3 
                className="text-2xl font-semibold tracking-tight mb-8 bg-clip-text text-transparent inline-block pb-1"
                style={{ backgroundImage: 'linear-gradient(90deg, #007AFF, #A855F7, #EC4899, #F97316)' }}
              >
                {(activeTab === 'web' || activeTab === 'crm') 
                  ? (lang === 'vi' ? 'Chi phí Hạ Tầng & Bản Quyền' : 'Infrastructure & License Costs')
                  : (lang === 'vi' ? 'Chi phí riêng cho Tài khoản Store' : 'Separate Store Account Costs')}
              </h3>
              
              {(activeTab === 'web' || activeTab === 'crm') ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-start pb-6 border-b border-[#d2d2d7]/50">
                    <div>
                      <div className="text-[17px] font-semibold text-[#1d1d1f] mb-1">{lang === 'vi' ? 'Tên miền Quốc tế (.com, .net)' : 'International Domain (.com, .net)'}</div>
                      <div className="text-[14px] text-[#86868b]">{lang === 'vi' ? 'Duy trì hằng năm thu bởi nhà đăng ký tên miền' : 'Annual maintenance fee charged by registrars'}<br/>{lang === 'vi' ? 'toàn cầu (GoDaddy, Namecheap, INet...)' : 'like GoDaddy, Namecheap, INet...'}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[17px] font-semibold text-[#1d1d1f] mb-1">{lang === 'vi' ? '300.000đ - 600.000đ/năm' : '$12 - $25/year'}</div>
                      <div className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] bg-[#e8e8ed] px-2 py-1 rounded">{lang === 'vi' ? 'Khách trả' : 'Client pays'}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-start pb-6 border-b border-[#d2d2d7]/50">
                    <div>
                      <div className="text-[17px] font-semibold text-[#1d1d1f] mb-1">{lang === 'vi' ? 'Hạ tầng Cloud Hosting / VPS' : 'Cloud Hosting / VPS'}</div>
                      <div className="text-[14px] text-[#86868b]">{lang === 'vi' ? 'Máy chủ lưu trữ mã nguồn Website, cơ sở' : 'Server for website source code, database'}<br/>{lang === 'vi' ? 'dữ liệu và vận hành cổng APIs' : 'and API gateway operations'}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[17px] font-semibold text-[#1d1d1f] mb-1">{lang === 'vi' ? 'Từ 1.200.000đ/năm' : 'From $50/year'}</div>
                      <div className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] bg-[#e8e8ed] px-2 py-1 rounded">{lang === 'vi' ? 'Khách trả' : 'Client pays'}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-[17px] font-semibold text-[#1d1d1f] mb-1">{lang === 'vi' ? 'Phí tích hợp API thương mại' : 'Commercial API Integration'}</div>
                      <div className="text-[14px] text-[#86868b]">{lang === 'vi' ? 'Các dịch vụ gửi OTP SMS, AI ChatGPT,' : 'Services for SMS OTP, AI ChatGPT,'}<br/>{lang === 'vi' ? 'Bản đồ định vị Google Maps API cao cấp' : 'Premium Google Maps API tracking'}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[17px] font-semibold text-[#1d1d1f] mb-1">{lang === 'vi' ? 'Theo thực tế' : 'Actual usage'}</div>
                      <div className="text-[11px] font-semibold uppercase tracking-widest text-[#f59e0b] bg-[#f59e0b]/10 px-2 py-1 rounded">{lang === 'vi' ? 'Lượng dùng' : 'Pay as you go'}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-start pb-6 border-b border-[#d2d2d7]/50">
                    <div>
                      <div className="text-[17px] font-semibold text-[#1d1d1f] mb-1">Google Play Developer Account</div>
                      <div className="text-[14px] text-[#86868b]">{lang === 'vi' ? 'Phí một lần duy nhất thu bởi Google' : 'One-time fee charged by Google'}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[17px] font-semibold text-[#1d1d1f] mb-1">25 USD</div>
                      <div className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] bg-[#e8e8ed] px-2 py-1 rounded">{lang === 'vi' ? 'Khách trả' : 'Client pays'}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-start pb-6 border-b border-[#d2d2d7]/50">
                    <div>
                      <div className="text-[17px] font-semibold text-[#1d1d1f] mb-1">Apple Developer Program</div>
                      <div className="text-[14px] text-[#86868b]">{lang === 'vi' ? 'Phí duy trì hàng năm thu bởi Apple' : 'Annual maintenance fee charged by Apple'}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[17px] font-semibold text-[#1d1d1f] mb-1">{lang === 'vi' ? '99 USD/năm' : '99 USD/year'}</div>
                      <div className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] bg-[#e8e8ed] px-2 py-1 rounded">{lang === 'vi' ? 'Khách trả' : 'Client pays'}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-start pb-6 border-b border-[#d2d2d7]/50">
                    <div>
                      <div className="text-[17px] font-semibold text-[#1d1d1f] mb-1">{lang === 'vi' ? 'Domain chứa Privacy Policy' : 'Domain with Privacy Policy'}</div>
                      <div className="text-[14px] text-[#86868b]">{lang === 'vi' ? 'Website hiển thị thông tin quyền riêng tư' : 'Website displaying privacy policy information'}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[17px] font-semibold text-[#1d1d1f] mb-1">{lang === 'vi' ? 'Tự trang bị' : 'Self-provided'}</div>
                      <div className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] bg-[#e8e8ed] px-2 py-1 rounded">{lang === 'vi' ? 'Miễn phí nếu có sẵn' : 'Free if available'}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-[17px] font-semibold text-[#1d1d1f] mb-1">{lang === 'vi' ? 'Thiết kế screenshots / icon' : 'Screenshots / icon design'}</div>
                      <div className="text-[14px] text-[#86868b]">{lang === 'vi' ? 'Hình ảnh quảng bá chuẩn kích thước cho Store' : 'Standard size promotional images for Store'}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[17px] font-semibold text-[#1d1d1f] mb-1">{lang === 'vi' ? 'Tính riêng' : 'Priced separately'}</div>
                      <div className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] bg-[#e8e8ed] px-2 py-1 rounded">{lang === 'vi' ? 'Tùy nhu cầu' : 'As needed'}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-[#f5f5f7] rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
               <h3 
                 className="text-2xl font-semibold tracking-tight mb-8 bg-clip-text text-transparent inline-block pb-1"
                 style={{ backgroundImage: 'linear-gradient(90deg, #007AFF, #A855F7, #EC4899, #F97316)' }}
               >
                 {(activeTab === 'web' || activeTab === 'crm') 
                   ? (lang === 'vi' ? 'Ghi Chú Trách Nhiệm & Cam Kết' : 'Important Notes & Guarantees')
                   : (lang === 'vi' ? 'Ghi chú quan trọng & Cam kết' : 'Important Notes & Guarantees')}
               </h3>
               
               {(activeTab === 'web' || activeTab === 'crm') ? (
                  <div className="space-y-6 text-[15px] text-[#1d1d1f] leading-relaxed">
                    <p>
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-[#f59e0b] mr-2">{lang === 'vi' ? 'Hạ tầng vận hành:' : 'Operating Infrastructure:'}</span> 
                      <span>{lang === 'vi' ? 'Toàn bộ bảng giá dịch vụ lập trình chưa bao gồm chi phí thuê bao hệ thống bên thứ ba, hạ tầng tên miền, máy chủ VPS Cloud lưu trữ hoặc các phần mềm quản trị cấu hình bản quyền.' : 'The development pricing does not include third-party system subscription fees, domain infrastructure, VPS Cloud hosting servers, or licensed configuration management software.'}</span>
                    </p>
                    <p>
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-[#f59e0b] mr-2">{lang === 'vi' ? 'Sở hữu mã nguồn:' : 'Source Code:'}</span> 
                      <span>{lang === 'vi' ? 'Sau khi hoàn thành nghiệm thu thanh toán 100% giá trị hợp đồng/gói dịch vụ, bàn giao toàn bộ Source code sạch và bàn giao quyền quản trị hệ thống hosting/tên miền cho khách hàng.' : 'Upon completion of acceptance and 100% payment of the contract/service package, we will hand over the clean source code and the hosting/domain system administration rights to the client.'}</span>
                    </p>
                    <p>
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-[#f59e0b] mr-2">{lang === 'vi' ? 'Cam kết bảo hành:' : 'Warranty Guarantee:'}</span> 
                      <span>{lang === 'vi' ? 'Hỗ trợ khắc phục lỗi phát sinh (bugs) trong vòng 3 - 6 tháng đầu tiên vận hành hệ thống miễn phí. Không bao gồm các yêu cầu viết thêm tính năng mới hoặc thay đổi kiến trúc cơ sở dữ liệu lớn so với thỏa thuận ban đầu.' : 'Free support to fix bugs within the first 3 - 6 months of system operation. Excludes requests to write new features or make major changes to the database architecture compared to the original agreement.'}</span>
                    </p>
                  </div>
               ) : (
                  <div className="space-y-6 text-[15px] text-[#1d1d1f] leading-relaxed">
                    <p>
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-[#f59e0b] mr-2">{lang === 'vi' ? 'Loại trừ chi phí:' : 'Cost Exclusions:'}</span>
                      <span>{lang === 'vi' ? 'Giá trên chưa bao gồm phí đăng ký tài khoản Google Play Developer (25$), Apple Developer (99$/năm), chi phí thiết kế icon/screenshot chuyên nghiệp, hosting/server và sửa đổi lớn trong source code gốc của ứng dụng.' : 'The above prices do not include Google Play Developer ($25) or Apple Developer ($99/year) registration fees, professional icon/screenshot design costs, hosting/servers, and major modifications to the app source code.'}</span>
                    </p>
                    <p>
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-[#f59e0b] mr-2">{lang === 'vi' ? 'Duyệt ứng dụng:' : 'App Approval:'}</span>
                      <span>{lang === 'vi' ? 'Quá trình xét duyệt ứng dụng phụ thuộc 100% vào chính sách xét duyệt của Google Play và App Store.' : 'The app review process depends 100% on the review policies of Google Play and the App Store.'}</span>
                    </p>
                    <p>
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-[#f59e0b] mr-2">{lang === 'vi' ? 'Cam kết từ mình:' : 'My Guarantee:'}</span>
                      <span>{lang === 'vi' ? 'Mình sẽ hỗ trợ cấu hình, tối ưu hồ sơ đăng ký tốt nhất, gỡ lỗi kỹ thuật cơ bản và hỗ trợ giải trình lý do với Google/Apple reviewer để tăng tỷ lệ được duyệt ở mức cao nhất có thể. Không cam kết duyệt 100% đối với các app vi phạm nghiêm trọng luật pháp hoặc chính sách ngặt nghèo của hệ thống.' : 'I will support the best configuration, store listing optimization, basic technical debugging, and explanations to Google/Apple reviewers to maximize the approval rate. I do not guarantee 100% approval for apps that seriously violate laws or strict system policies.'}</span>
                    </p>
                  </div>
               )}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Services Table */}
      <section id="services" className="py-20 border-t border-[#d2d2d7]/50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-semibold tracking-tight bg-gradient-to-r from-[#022640] to-[#5786AB] bg-clip-text text-transparent inline-block pb-1 mb-4"
            >{lang === 'vi' ? 'Chi tiết toàn bộ dịch vụ' : 'Detailed Services'}</h2>
            <p className="text-[17px] text-[#86868b] max-w-2xl mx-auto">{lang === 'vi' ? 'Danh sách đầy đủ tất cả các dịch vụ hỗ trợ đưa ứng dụng lên các kho ứng dụng, áp dụng linh hoạt theo độ phức tạp của app.' : 'Full list of app publishing support services, flexibly applied depending on app complexity.'}</p>
          </div>

          <div className="bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#d2d2d7]/50 bg-[#f5f5f7]/50">
                    <th className="px-6 py-5 text-[13px] font-semibold text-[#86868b] uppercase tracking-wider">{lang === 'vi' ? 'Gói Dịch Vụ' : 'Service Package'}</th>
                    <th className="px-6 py-5 text-[13px] font-semibold text-[#86868b] uppercase tracking-wider">{lang === 'vi' ? 'Nội dung chi tiết hỗ trợ' : 'Detailed Support Content'}</th>
                    <th className="px-6 py-5 text-[13px] font-semibold text-[#86868b] uppercase tracking-wider text-right whitespace-nowrap">{lang === 'vi' ? 'Mức Giá Đề Xuất' : 'Suggested Price'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d2d2d7]/30 text-[15px]">
                  <tr className="hover:bg-[#f5f5f7]/30 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Gói Android cơ bản' : 'Basic Android Package'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Build file release .aab, kiểm tra package name, version, signing key, hỗ trợ upload Google Play, điền thông tin cơ bản' : 'Build .aab release file, check package name, version, signing key, support Google Play upload, fill basic info'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? '800.000 – 1.500.000đ' : '$33 – $62'}</td>
                  </tr>
                  <tr className="hover:bg-[#f5f5f7]/30 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Gói iOS cơ bản' : 'Basic iOS Package'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Build .ipa, cấu hình bundle id, certificate/provisioning, TestFlight/App Store Connect, hỗ trợ submit App Store' : 'Build .ipa, configure bundle id, certificate/provisioning, TestFlight/App Store Connect, support App Store submission'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? '1.500.000 – 3.000.000đ' : '$62 – $125'}</td>
                  </tr>
                  <tr className="hover:bg-[#f5f5f7]/30 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Gói Android + iOS' : 'Android + iOS Package'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Đưa app lên cả Google Play và App Store (Được tối ưu chi phí gộp, tiết kiệm hơn)' : 'Publish to both Google Play and App Store (Optimized bundled cost, more economical)'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? '2.500.000 – 5.000.000đ' : '$104 – $208'}</td>
                  </tr>
                  <tr className="hover:bg-[#f5f5f7]/30 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Cung cấp 20 Tester Android (14 ngày)' : 'Provide 20 Android Testers (14 days)'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Cung cấp đủ 20 người dùng thật tham gia test kín liên tục trong 14 ngày, báo cáo bug và đáp ứng 100% điều kiện bắt buộc của Google Play cho tài khoản cá nhân mới tạo.' : 'Provide exactly 20 real users for closed testing over 14 days, bug reporting, fully meeting Google Play requirements for new personal accounts.'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? '500.000 – 800.000đ' : '$21 – $33'}</td>
                  </tr>
                  <tr className="hover:bg-[#f5f5f7]/30 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Gói xử lý reject' : 'Rejection Handling'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Xem lý do bị từ chối, tư vấn/sửa lỗi cấu hình, sửa mô tả, cấu hình quyền riêng tư, giải trình reviewer' : 'Review rejection reasons, consult/fix configuration errors, edit descriptions, privacy config, explain to reviewer'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? '500.000 – 2.000.000đ/lần' : '$21 – $83/time'}</td>
                  </tr>
                  <tr className="hover:bg-[#f5f5f7]/30 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Gói full store listing' : 'Full Store Listing Package'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Viết mô tả ứng dụng, soạn từ khóa, icon, thiết kế screenshot, privacy policy cơ bản, data safety/app privacy' : 'Write app descriptions, compile keywords, icon, design screenshots, basic privacy policy, data safety/app privacy'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? '1.500.000 – 3.500.000đ' : '$62 – $146'}</td>
                  </tr>
                  <tr className="hover:bg-[#f5f5f7]/30 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Gói app có đăng nhập/chat/user content' : 'App with login/chat/user content'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Cấu hình thêm bộ kiểm tra report/block/delete account, demo account, privacy policy, khai báo dữ liệu đặc thù' : 'Configure report/block/delete account flows, demo account, privacy policy, specific data declarations'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? '4.000.000 – 8.000.000đ' : '$167 – $333'}</td>
                  </tr>
                  <tr className="hover:bg-[#f5f5f7]/30 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Gói app social/dating phức tạp' : 'Complex Social/Dating App'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Kiểm tra moderation, report/block, xóa tài khoản, nội dung người dùng, quyền ảnh/camera/location, hỗ trợ kháng nghị nhiều vòng reject' : 'Check moderation, report/block, delete account, user content, photo/camera/location permissions, support multiple rejection appeals'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? '6.000.000 – 12.000.000đ' : '$250 – $500'}</td>
                  </tr>
                  <tr className="hover:bg-[#f5f5f7]/30 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Bảo trì store hàng tháng' : 'Monthly Store Maintenance'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Cập nhật version mới, thay đổi screenshot/mô tả theo đợt cập nhật, xử lý lỗi nhỏ từ review store' : 'Update new versions, change screenshots/descriptions per update, handle minor errors from store review'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? '1.000.000 – 3.000.000đ/tháng' : '$42 – $125/mo'}</td>
                  </tr>
                  
                  {/* Web Services */}
                  <tr className="bg-[#f5f5f7]/20 hover:bg-[#f5f5f7]/50 transition-colors border-t-2 border-[#d2d2d7]/50">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Website: Landing Page' : 'Website: Landing Page'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? '1 trang đơn, tối ưu chuyển đổi UI/UX cơ bản' : 'Single page, optimized conversion, basic UI/UX'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? '2.500.000đ – 5.500.000đ' : '$104 – $229'}</td>
                  </tr>
                  <tr className="bg-[#f5f5f7]/20 hover:bg-[#f5f5f7]/50 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Website: Doanh Nghiệp' : 'Website: Corporate'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Tối đa 5 trang, chuẩn SEO, Admin quản lý cơ bản' : 'Max 5 pages, SEO optimized, basic Admin panel'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? '7.000.000đ – 12.000.000đ' : '$291 – $500'}</td>
                  </tr>
                  <tr className="bg-[#f5f5f7]/20 hover:bg-[#f5f5f7]/50 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Website: Thương Mại Điện Tử' : 'Website: E-commerce'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Có giỏ hàng, thanh toán online, quản lý đơn hàng & kho' : 'Shopping cart, online payment, order & inventory mgmt'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? '18.000.000đ – 25.000.000đ' : '$750 – $1,041'}</td>
                  </tr>
                  <tr className="bg-[#f5f5f7]/20 hover:bg-[#f5f5f7]/50 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Website: Hệ Thống Custom' : 'Website: Custom System'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Code tay 100% dựa trên yêu cầu đặc thù và luồng nghiệp vụ riêng' : '100% hand-coded based on specific requirements and custom logic'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? '30.000.000đ – 50.000.000đ' : '$1,250 – $2,083'}</td>
                  </tr>

                  {/* App Services */}
                  <tr className="bg-[#f5f5f7]/20 hover:bg-[#f5f5f7]/50 transition-colors border-t-2 border-[#d2d2d7]/50">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Mobile App: Bán Hàng/Booking' : 'Mobile App: Shop/Booking'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'App đa nền tảng (Flutter/RN), có Login, giỏ hàng/đặt lịch, Admin Panel' : 'Cross-platform app, Login, cart/booking, Admin Panel'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? '20.000.000đ – 35.000.000đ' : '$833 – $1,458'}</td>
                  </tr>
                  <tr className="bg-[#f5f5f7]/20 hover:bg-[#f5f5f7]/50 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Mobile App: MXH/Ví Điện Tử' : 'Mobile App: Social/Wallet'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Real-time chat, nạp/rút tiền, bảo mật đa lớp, xử lý dữ liệu lớn' : 'Real-time chat, deposit/withdraw, multi-layer security, big data'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? '40.000.000đ – 60.000.000đ' : '$1,666 – $2,500'}</td>
                  </tr>
                  <tr className="bg-[#f5f5f7]/20 hover:bg-[#f5f5f7]/50 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Mobile App: Quản Trị Nội Bộ' : 'Mobile App: Internal Mgmt'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Quản lý kho bãi, nhân sự, dự án, kết nối thiết bị chuyên dụng, chấm công' : 'Inventory, HR, project mgmt, custom device integration, attendance'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? '30.000.000đ – 50.000.000đ' : '$1,250 – $2,083'}</td>
                  </tr>

                  {/* CRM Services */}
                  <tr className="bg-[#f5f5f7]/20 hover:bg-[#f5f5f7]/50 transition-colors border-t-2 border-[#d2d2d7]/50">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'CRM Quản Lý Bán Hàng' : 'Sales CRM'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Quản lý tệp khách hàng (Lead), lịch sử chăm sóc, hợp đồng, báo cáo doanh thu' : 'Lead mgmt, interaction history, contracts, revenue reports'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? '15.000.000đ – 25.000.000đ' : '$625 – $1,041'}</td>
                  </tr>
                  <tr className="bg-[#f5f5f7]/20 hover:bg-[#f5f5f7]/50 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'ERP Mini Đa Nền Tảng' : 'Multi-platform Mini ERP'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Website Admin + Mobile App cho nhân viên: Quản trị xuyên suốt Sales, HR, Kế toán, Kho' : 'Admin Web + Employee App: Integrated Sales, HR, Accounting, Inventory'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? '35.000.000đ – 70.000.000đ' : '$1,458 – $2,916'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>


      {/* About Me Section */}
      <section id="about" className="py-24 bg-[#f5f5f7] border-t border-[#d2d2d7]/50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left - Identity */}
            <div className="lg:col-span-4">
              <div className="sticky top-[80px] text-center lg:text-left">
                <h2 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] mb-2">Lê Minh Quang</h2>
                <p className="text-[15px] text-[#0071e3] font-medium mb-2">Software Engineer · FPT Information System</p>
                <div className="bg-white p-4 rounded-[16px] mb-5 border border-[#d2d2d7]/50 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                  <p className="text-[14px] text-[#86868b] font-medium leading-relaxed">
                    {lang === 'vi' 
                      ? 'Đam mê khám phá công nghệ, thích xem phim, chơi game và thể thao' 
                      : 'Passionate about exploring tech, watching movies, playing games, and sports'}
                  </p>
                </div>
                <div className="w-full rounded-[20px] overflow-hidden shadow-lg mb-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/877E3A04-27CD-4908-8D40-BD43250F7B02_1_105_c.jpeg" alt="Lê Minh Quang" className="w-full h-auto" />
                </div>
                <p className="text-[14px] text-[#86868b] mb-4">{lang === 'vi' ? 'TP. Hồ Chí Minh, Việt Nam' : 'Ho Chi Minh City, Vietnam'}</p>
                <div className="flex flex-col gap-3 items-center lg:items-start">
                  <a href="mailto:quanglm23@fpt.com" className="flex items-center gap-3 text-[14px] text-[#86868b] hover:text-[#1d1d1f] transition-colors">
                    <Mail className="w-4 h-4 shrink-0" />quanglm23@fpt.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Experience & Skills */}
            <div className="lg:col-span-8 space-y-10">

              {/* Bio */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0071e3] mb-3">{lang === 'vi' ? 'Giới thiệu' : 'About'}</p>
                <p className="text-[17px] text-[#1d1d1f] leading-relaxed">
                  {lang === 'vi'
                    ? `Kỹ sư phần mềm với ${new Date().getFullYear() - 2023}+ năm kinh nghiệm làm freelance và công ty, cùng kinh nghiệm thực chiến tại FPT Information System — một trong những tập đoàn công nghệ hàng đầu Việt Nam. Ngoài công việc chính, mình vận hành thương hiệu StorePublish chuyên hỗ trợ đưa ứng dụng lên App Store và Google Play một cách chuyên nghiệp, nhanh chóng và uy tín.`
                    : `Software Engineer with ${new Date().getFullYear() - 2023}+ years of freelance and corporate experience, including hands-on experience at FPT Information System — one of Vietnam's leading technology corporations. Beyond my main role, I run StorePublish, a specialized service helping developers and businesses publish their apps to the App Store and Google Play professionally and efficiently.`}
                </p>
              </div>

              {/* Experience */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0071e3] mb-6">{lang === 'vi' ? 'Kinh nghiệm làm việc' : 'Work Experience'}</p>
                <div className="space-y-6">

                  {/* FPTIS */}
                  <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#d2d2d7]/30">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-[17px] font-semibold text-[#1d1d1f]">Software Engineer</h3>
                        <p className="text-[14px] text-[#0071e3] font-medium">FPT Information System (FPTIS)</p>
                      </div>
                      <span className="text-[12px] text-[#86868b] bg-[#f5f5f7] px-3 py-1 rounded-full whitespace-nowrap shrink-0">2025 — {lang === 'vi' ? 'Hiện tại' : 'Present'}</span>
                    </div>
                    <p className="text-[14px] text-[#86868b] leading-relaxed">
                      {lang === 'vi'
                        ? 'Phát triển và duy trì hệ thống phần mềm doanh nghiệp tại FPTIS. Tham gia thiết kế kiến trúc, xây dựng API, tối ưu hiệu suất hệ thống và triển khai CI/CD cho các dự án quy mô lớn phục vụ hàng nghìn người dùng.'
                        : 'Developing and maintaining enterprise software systems at FPTIS. Involved in architecture design, API development, system performance optimization, and CI/CD deployment for large-scale projects serving thousands of users.'}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {['Enterprise Software', 'API Development', 'CI/CD', 'System Design'].map(tag => (
                        <span key={tag} className="text-[12px] text-[#1d1d1f] bg-[#f5f5f7] px-3 py-1 rounded-full font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>



                  {/* Gamenect */}
                  <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#d2d2d7]/30">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-[17px] font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Người sáng lập' : 'Founder'}</h3>
                        <a href="https://gamenect.space" target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#0071e3] font-medium hover:underline">
                          Gamenect · gamenect.space
                        </a>
                      </div>
                      <span className="text-[12px] text-[#86868b] bg-[#f5f5f7] px-3 py-1 rounded-full whitespace-nowrap shrink-0">2025 — {lang === 'vi' ? 'Hiện tại' : 'Present'}</span>
                    </div>
                    <p className="text-[14px] text-[#86868b] leading-relaxed">
                      {lang === 'vi'
                        ? 'Sáng lập và phát triển Gamenect — nền tảng kết nối cộng đồng game thủ Việt Nam. Tự xây dựng toàn bộ hệ thống từ thiết kế UI/UX, phát triển backend đến vận hành và phát triển cộng đồng người dùng.'
                        : 'Founded and built Gamenect — a platform connecting the Vietnamese gaming community. Independently developed the entire system from UI/UX design and backend engineering to operations and community growth.'}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {['Flutter', 'Community Platform', 'Full-stack', 'UI/UX Design', 'Product Management'].map(tag => (
                        <span key={tag} className="text-[12px] text-[#1d1d1f] bg-[#f5f5f7] px-3 py-1 rounded-full font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 bg-white text-[#1d1d1f] border-t border-[#d2d2d7]/50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight mb-4 bg-gradient-to-r from-[#022640] to-[#5786AB] bg-clip-text text-transparent inline-block">StorePublish</h2>
              <p className="text-[#86868b] max-w-sm text-[15px]">{lang === 'vi' ? 'Giải pháp trọn gói đưa ứng dụng lên App Store và Google Play.' : 'End-to-end solution for publishing apps to the App Store and Google Play.'}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 
                  className="text-[15px] font-semibold bg-clip-text text-transparent mb-6 uppercase tracking-wider inline-block"
                  style={{ backgroundImage: 'linear-gradient(90deg, #007AFF, #A855F7, #EC4899, #F97316)' }}
                >
                  {lang === 'vi' ? 'Liên Hệ' : 'Contact'}
                </h3>
                <ul className="space-y-4 text-[14px]">
                  <li>
                    <a href="mailto:lmquang.devops@gmail.com" className="hover:text-[#1d1d1f] text-[#86868b] transition-colors flex items-center gap-3">
                      <Mail className="w-5 h-5" /> Email
                    </a>
                  </li>
                  <li>
                    <a href="https://zalo.me/0387412607" target="_blank" rel="noopener noreferrer" className="hover:text-[#1d1d1f] text-[#86868b] transition-colors flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/zaloicon.jpg" alt="Zalo" className="w-5 h-5" /> Zalo (0387 412 607)
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 
                  className="text-[15px] font-semibold bg-clip-text text-transparent mb-6 uppercase tracking-wider inline-block"
                  style={{ backgroundImage: 'linear-gradient(90deg, #007AFF, #A855F7, #EC4899, #F97316)' }}
                >
                  {lang === 'vi' ? 'Địa Chỉ' : 'Address'}
                </h3>
                <a 
                  href="https://maps.google.com/?q=Vinhomes+Grand+Park,+Ho+Chi+Minh+City"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-[#86868b] hover:text-[#1d1d1f] transition-colors leading-relaxed flex items-start gap-3 cursor-pointer"
                >
                  <MapPin className="w-5 h-5 shrink-0" />
                  <p>
                    Vinhomes Grand Park<br />
                    {lang === 'vi' ? 'Thành phố Hồ Chí Minh' : 'Ho Chi Minh City'}
                  </p>
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-[#1d1d1f]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-[#86868b] font-mono">
            <p>© 2026 StorePublish Inc. By Le Minh Quang.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
