import re

with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add activeTab state
state_search = """  const [basePrice, setBasePrice] = useState(1200000);"""
state_replace = """  const [activeTab, setActiveTab] = useState('platform');
  const [basePrice, setBasePrice] = useState(1200000);"""
content = content.replace(state_search, state_replace)

# 2. Add Tab UI and Conditional Rendering
tab_ui = """            {/* Left side - Selection */}
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
"""

content = content.replace("""            {/* Left side - Selection */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8">""", tab_ui)

# 3. Add closing divs and next conditions
# End of Platform section, start of Web section
content = content.replace("""                </div>
              </div>

              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8">
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-6 tracking-tight">{lang === 'vi' ? '2. Dịch vụ Lập trình Website' : '2. Website Development'}</h3>""", """                </div>
              </div>
              )}

              {activeTab === 'web' && (
              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-6 tracking-tight">{lang === 'vi' ? 'Lập trình Website' : 'Website Development'}</h3>""")

# End of Web section, start of App section
content = content.replace("""                </div>
              </div>

              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8">
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-6 tracking-tight">{lang === 'vi' ? '3. Dịch vụ Lập trình Mobile App' : '3. Mobile App Development'}</h3>""", """                </div>
              </div>
              )}

              {activeTab === 'app' && (
              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-6 tracking-tight">{lang === 'vi' ? 'Lập trình Mobile App' : 'Mobile App Development'}</h3>""")

# End of App section, start of CRM section
content = content.replace("""                </div>
              </div>

              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8">
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-6 tracking-tight">{lang === 'vi' ? '4. Hệ thống CRM Custom' : '4. Custom CRM System'}</h3>""", """                </div>
              </div>
              )}

              {activeTab === 'crm' && (
              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-6 tracking-tight">{lang === 'vi' ? 'Hệ thống CRM Custom' : 'Custom CRM System'}</h3>""")

# End of CRM section, start of Add-ons section
content = content.replace("""                </div>
              </div>

              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8">
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-6 tracking-tight">{lang === 'vi' ? '5. Tiện ích bổ sung' : '5. Add-ons'}</h3>""", """                </div>
              </div>
              )}

              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8">
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-6 tracking-tight">{lang === 'vi' ? 'Tiện ích bổ sung (Áp dụng chung)' : 'Add-ons (Apply to all)'}</h3>""")


with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
