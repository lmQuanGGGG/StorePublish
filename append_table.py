with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

target = """                  <tr className="hover:bg-[#f5f5f7]/30 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Bảo trì store hàng tháng' : 'Monthly Store Maintenance'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Cập nhật version mới, thay đổi screenshot/mô tả theo đợt cập nhật, xử lý lỗi nhỏ từ review store' : 'Update new versions, change screenshots/descriptions per update, handle minor errors from store review'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? '1.000.000 – 3.000.000đ/tháng' : '$42 – $125/mo'}</td>
                  </tr>
                </tbody>"""

replacement = """                  <tr className="hover:bg-[#f5f5f7]/30 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Bảo trì store hàng tháng' : 'Monthly Store Maintenance'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Cập nhật version mới, thay đổi screenshot/mô tả theo đợt cập nhật, xử lý lỗi nhỏ từ review store' : 'Update new versions, change screenshots/descriptions per update, handle minor errors from store review'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? '1.000.000 – 3.000.000đ/tháng' : '$42 – $125/mo'}</td>
                  </tr>
                  
                  {/* Web Services */}
                  <tr className="bg-[#f5f5f7]/20 hover:bg-[#f5f5f7]/50 transition-colors border-t-2 border-[#d2d2d7]/50">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Website: Landing Page' : 'Website: Landing Page'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? '1 trang đơn, tối ưu chuyển đổi UI/UX cơ bản' : 'Single page, optimized conversion, basic UI/UX'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? 'Từ 2.500.000đ' : 'From $104'}</td>
                  </tr>
                  <tr className="bg-[#f5f5f7]/20 hover:bg-[#f5f5f7]/50 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Website: Doanh Nghiệp' : 'Website: Corporate'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Tối đa 5 trang, chuẩn SEO, Admin quản lý cơ bản' : 'Max 5 pages, SEO optimized, basic Admin panel'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? 'Từ 7.000.000đ' : 'From $291'}</td>
                  </tr>
                  <tr className="bg-[#f5f5f7]/20 hover:bg-[#f5f5f7]/50 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Website: Thương Mại Điện Tử' : 'Website: E-commerce'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Có giỏ hàng, thanh toán online, quản lý đơn hàng & kho' : 'Shopping cart, online payment, order & inventory mgmt'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? 'Từ 18.000.000đ' : 'From $750'}</td>
                  </tr>
                  <tr className="bg-[#f5f5f7]/20 hover:bg-[#f5f5f7]/50 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Website: Hệ Thống Custom' : 'Website: Custom System'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Code tay 100% dựa trên yêu cầu đặc thù và luồng nghiệp vụ riêng' : '100% hand-coded based on specific requirements and custom logic'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? 'Từ 30.000.000đ' : 'From $1,250'}</td>
                  </tr>

                  {/* App Services */}
                  <tr className="bg-[#f5f5f7]/20 hover:bg-[#f5f5f7]/50 transition-colors border-t-2 border-[#d2d2d7]/50">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Mobile App: Bán Hàng/Booking' : 'Mobile App: Shop/Booking'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'App đa nền tảng (Flutter/RN), có Login, giỏ hàng/đặt lịch, Admin Panel' : 'Cross-platform app, Login, cart/booking, Admin Panel'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? 'Từ 20.000.000đ' : 'From $833'}</td>
                  </tr>
                  <tr className="bg-[#f5f5f7]/20 hover:bg-[#f5f5f7]/50 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Mobile App: MXH/Ví Điện Tử' : 'Mobile App: Social/Wallet'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Real-time chat, nạp/rút tiền, bảo mật đa lớp, xử lý dữ liệu lớn' : 'Real-time chat, deposit/withdraw, multi-layer security, big data'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? 'Từ 40.000.000đ' : 'From $1,666'}</td>
                  </tr>
                  <tr className="bg-[#f5f5f7]/20 hover:bg-[#f5f5f7]/50 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'Mobile App: Quản Trị Nội Bộ' : 'Mobile App: Internal Mgmt'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Quản lý kho bãi, nhân sự, dự án, kết nối thiết bị chuyên dụng, chấm công' : 'Inventory, HR, project mgmt, custom device integration, attendance'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? 'Từ 30.000.000đ' : 'From $1,250'}</td>
                  </tr>

                  {/* CRM Services */}
                  <tr className="bg-[#f5f5f7]/20 hover:bg-[#f5f5f7]/50 transition-colors border-t-2 border-[#d2d2d7]/50">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'CRM Quản Lý Bán Hàng' : 'Sales CRM'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Quản lý tệp khách hàng (Lead), lịch sử chăm sóc, hợp đồng, báo cáo doanh thu' : 'Lead mgmt, interaction history, contracts, revenue reports'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? 'Từ 15.000.000đ' : 'From $625'}</td>
                  </tr>
                  <tr className="bg-[#f5f5f7]/20 hover:bg-[#f5f5f7]/50 transition-colors">
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f]">{lang === 'vi' ? 'ERP Mini Đa Nền Tảng' : 'Multi-platform Mini ERP'}</td>
                    <td className="px-6 py-5 text-[#86868b] leading-relaxed">{lang === 'vi' ? 'Website Admin + Mobile App cho nhân viên: Quản trị xuyên suốt Sales, HR, Kế toán, Kho' : 'Admin Web + Employee App: Integrated Sales, HR, Accounting, Inventory'}</td>
                    <td className="px-6 py-5 font-semibold text-[#1d1d1f] text-right whitespace-nowrap">{lang === 'vi' ? 'Từ 45.000.000đ' : 'From $1,875'}</td>
                  </tr>
                </tbody>"""

content = content.replace(target, replacement)

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

