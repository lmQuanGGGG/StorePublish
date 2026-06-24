import re

with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# I will insert the infra section before the detailed services table
target = """      {/* Detailed Services Table */}"""

infra_section = """      {/* Extra Costs */}
      {(activeTab === 'web' || activeTab === 'crm') && (
        <section id="infra" className="max-w-7xl mx-auto px-4 md:px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-[#d2d2d7]/50">
              <h3 className="text-[20px] font-semibold tracking-tight text-[#1d1d1f] mb-8 flex items-center gap-3">
                <svg className="w-6 h-6 text-[#0071e3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg> 
                Bảng Chi Phí Hạ Tầng & Bản Quyền (Khách hàng chi trả)
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-start border-b border-[#d2d2d7]/50 pb-6">
                  <div>
                    <h4 className="font-semibold text-[#1d1d1f] text-[15px]">Tên miền quốc tế (.com / .net)</h4>
                    <p className="text-[13px] text-[#86868b] mt-1">Duy trì hằng năm thu bởi nhà đăng ký tên miền toàn cầu<br/>(Mắt Bão, INet, Pavietnam...)</p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-[#1d1d1f] text-[15px]">350.000đ/năm</span>
                    <div className="mt-1"><span className="inline-block bg-[#0071e3]/10 text-[#0071e3] text-[11px] font-semibold px-2 py-1 rounded-full">Khách tự trả</span></div>
                  </div>
                </div>
                <div className="flex justify-between items-start border-b border-[#d2d2d7]/50 pb-6">
                  <div>
                    <h4 className="font-semibold text-[#1d1d1f] text-[15px]">Hạ tầng Cloud Hosting / VPS</h4>
                    <p className="text-[13px] text-[#86868b] mt-1">Máy chủ lưu trữ mã nguồn Website, cơ sở dữ liệu và<br/>vận hành cổng APIs</p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-[#1d1d1f] text-[15px]">Từ 1.200.000đ/năm</span>
                    <div className="mt-1"><span className="inline-block bg-[#0071e3]/10 text-[#0071e3] text-[11px] font-semibold px-2 py-1 rounded-full">Khách tự trả</span></div>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-[#1d1d1f] text-[15px]">Phí tích hợp API thương mại</h4>
                    <p className="text-[13px] text-[#86868b] mt-1">Các dịch vụ gửi OTP SMS, AI ChatGPT, Bản đồ định vị<br/>Google Maps API cao cấp</p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-[#1d1d1f] text-[15px]">Theo thực tế</span>
                    <div className="mt-1"><span className="inline-block bg-[#f59e0b]/10 text-[#f59e0b] text-[11px] font-semibold px-2 py-1 rounded-full">Theo lượng dùng</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#f5f5f7] rounded-[2rem] p-8 md:p-10 border border-[#d2d2d7]/30">
              <h3 className="text-[20px] font-semibold tracking-tight text-[#1d1d1f] mb-8 flex items-center gap-3">
                <svg className="w-6 h-6 text-[#0071e3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Ghi Chú Trách Nhiệm & Cam Kết Dịch Vụ
              </h3>
              <div className="space-y-6 text-[14px] text-[#1d1d1f] leading-relaxed">
                <p>
                  <span className="font-bold text-[#f59e0b]">⚠️ Hạ tầng vận hành:</span> Toàn bộ bảng giá dịch vụ lập trình chưa bao gồm chi phí thuê bao hệ thống bên thứ ba, hạ tầng tên miền, máy chủ VPS Cloud lưu trữ hoặc các phần mềm quản trị cấu hình bản quyền.
                </p>
                <p>
                  <span className="font-bold text-[#1d1d1f]">🔍 Quyền sở hữu mã nguồn:</span> Sau khi hoàn thành nghiệm thu thanh toán 100% giá trị hợp đồng/gói dịch vụ, bàn giao toàn bộ Source code sạch và bàn giao quyền quản trị hệ thống hosting/tên miền cho khách hàng.
                </p>
                <p>
                  <span className="font-bold text-[#ef4444]">🛡️ Cam kết bảo hành:</span> Hỗ trợ khắc phục lỗi phát sinh (bugs) trong vòng 3 - 6 tháng đầu tiên vận hành hệ thống miễn phí. Không bao gồm các yêu cầu viết thêm tính năng mới hoặc thay đổi kiến trúc cơ sở dữ liệu lớn so với thỏa thuận ban đầu.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Detailed Services Table */}"""

if "{/* Extra Costs */}" not in content:
    content = content.replace(target, infra_section)

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

