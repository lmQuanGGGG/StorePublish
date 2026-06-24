import re

with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Find the infra section
infra_pattern = re.compile(r"      \{\/\* Extra Costs \*\/.*?<\/section>\n      \)\}", re.DOTALL)
if infra_pattern.search(content):
    content = infra_pattern.sub("", content)

# Find the store section
store_pattern = re.compile(r"      \{\/\* Extra Costs & Notes \*\/.*?<\/section>\n", re.DOTALL)

unified_section = """      {/* Extra Costs & Notes (Unified) */}
      <section className="py-20 border-t border-[#d2d2d7]/50 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#f5f5f7] rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <h3 
                className="text-2xl font-semibold tracking-tight mb-8 bg-clip-text text-transparent inline-block pb-1"
                style={{ backgroundImage: 'linear-gradient(90deg, #007AFF, #A855F7, #EC4899, #F97316)' }}
              >
                {(activeTab === 'web' || activeTab === 'crm') 
                  ? 'Chi phí Hạ Tầng & Bản Quyền.'
                  : (lang === 'vi' ? 'Chi phí riêng cho Tài khoản Store.' : 'Separate Store Account Costs.')}
              </h3>
              
              {(activeTab === 'web' || activeTab === 'crm') ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-start pb-6 border-b border-[#d2d2d7]/50">
                    <div>
                      <div className="text-[17px] font-semibold text-[#1d1d1f] mb-1">Tên miền quốc tế (.com / .net)</div>
                      <div className="text-[14px] text-[#86868b]">Duy trì hằng năm thu bởi nhà đăng ký tên miền<br/>toàn cầu (Mắt Bão, INet, Pavietnam...)</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[17px] font-semibold text-[#1d1d1f] mb-1">350.000đ/năm</div>
                      <div className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] bg-[#e8e8ed] px-2 py-1 rounded">Khách trả</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-start pb-6 border-b border-[#d2d2d7]/50">
                    <div>
                      <div className="text-[17px] font-semibold text-[#1d1d1f] mb-1">Hạ tầng Cloud Hosting / VPS</div>
                      <div className="text-[14px] text-[#86868b]">Máy chủ lưu trữ mã nguồn Website, cơ sở<br/>dữ liệu và vận hành cổng APIs</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[17px] font-semibold text-[#1d1d1f] mb-1">Từ 1.200.000đ/năm</div>
                      <div className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] bg-[#e8e8ed] px-2 py-1 rounded">Khách trả</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-[17px] font-semibold text-[#1d1d1f] mb-1">Phí tích hợp API thương mại</div>
                      <div className="text-[14px] text-[#86868b]">Các dịch vụ gửi OTP SMS, AI ChatGPT,<br/>Bản đồ định vị Google Maps API cao cấp</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[17px] font-semibold text-[#1d1d1f] mb-1">Theo thực tế</div>
                      <div className="text-[11px] font-semibold uppercase tracking-widest text-[#f59e0b] bg-[#f59e0b]/10 px-2 py-1 rounded">Lượng dùng</div>
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
                   ? 'Ghi Chú Trách Nhiệm & Cam Kết.'
                   : (lang === 'vi' ? 'Ghi chú quan trọng & Cam kết.' : 'Important Notes & Guarantees.')}
               </h3>
               
               {(activeTab === 'web' || activeTab === 'crm') ? (
                  <div className="space-y-6 text-[15px] text-[#1d1d1f] leading-relaxed">
                    <p>
                      <strong className="font-semibold text-[#f59e0b]">⚠️ Hạ tầng vận hành:</strong> Toàn bộ bảng giá dịch vụ lập trình chưa bao gồm chi phí thuê bao hệ thống bên thứ ba, hạ tầng tên miền, máy chủ VPS Cloud lưu trữ hoặc các phần mềm quản trị cấu hình bản quyền.
                    </p>
                    <p>
                      <strong className="font-semibold text-[#1d1d1f]">🔍 Quyền sở hữu mã nguồn:</strong> Sau khi hoàn thành nghiệm thu thanh toán 100% giá trị hợp đồng/gói dịch vụ, bàn giao toàn bộ Source code sạch và bàn giao quyền quản trị hệ thống hosting/tên miền cho khách hàng.
                    </p>
                    <p>
                      <strong className="font-semibold text-[#ef4444]">🛡️ Cam kết bảo hành:</strong> Hỗ trợ khắc phục lỗi phát sinh (bugs) trong vòng 3 - 6 tháng đầu tiên vận hành hệ thống miễn phí. Không bao gồm các yêu cầu viết thêm tính năng mới hoặc thay đổi kiến trúc cơ sở dữ liệu lớn so với thỏa thuận ban đầu.
                    </p>
                  </div>
               ) : (
                  <div className="space-y-6 text-[15px] text-[#1d1d1f] leading-relaxed">
                    <p><strong className="font-semibold text-[#f59e0b]">{lang === 'vi' ? '⚠️ Loại trừ chi phí:' : '⚠️ Cost Exclusions:'}</strong> {lang === 'vi' ? 'Giá trên chưa bao gồm phí đăng ký tài khoản Google Play Developer (25$), Apple Developer (99$/năm), chi phí thiết kế icon/screenshot chuyên nghiệp, hosting/server và sửa đổi lớn trong source code gốc của ứng dụng.' : 'The above prices do not include Google Play Developer ($25) or Apple Developer ($99/year) registration fees, professional icon/screenshot design costs, hosting/servers, and major modifications to the app source code.'}</p>
                    <p><strong className="font-semibold text-[#1d1d1f]">{lang === 'vi' ? '🔍 Quyết định duyệt app:' : '🔍 App Approval Decision:'}</strong> {lang === 'vi' ? 'Quá trình xét duyệt ứng dụng phụ thuộc 100% vào chính sách xét duyệt của Google Play và App Store.' : 'The app review process depends 100% on the review policies of Google Play and the App Store.'}</p>
                    <p><strong className="font-semibold text-[#ef4444]">{lang === 'vi' ? '🛡️ Cam kết từ mình:' : '🛡️ My Guarantee:'}</strong> {lang === 'vi' ? 'Mình sẽ hỗ trợ cấu hình, tối ưu hồ sơ đăng ký tốt nhất, gỡ lỗi kỹ thuật cơ bản và hỗ trợ giải trình lý do với Google/Apple reviewer để tăng tỷ lệ được duyệt ở mức cao nhất có thể. Không cam kết duyệt 100% đối với các app vi phạm nghiêm trọng luật pháp hoặc chính sách ngặt nghèo của hệ thống.' : 'I will support the best configuration, store listing optimization, basic technical debugging, and explanations to Google/Apple reviewers to maximize the approval rate. I do not guarantee 100% approval for apps that seriously violate laws or strict system policies.'}</p>
                  </div>
               )}
            </div>
          </div>
        </div>
      </section>
"""

# Replace the store section with empty
if store_pattern.search(content):
    content = store_pattern.sub("", content)

# Insert the unified section right before the detailed services table
target = "      {/* Detailed Services Table */}"
if target in content:
    content = content.replace(target, unified_section + "\n" + target)

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

