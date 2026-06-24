import re

with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Fix bullet point
content = content.replace(
    "Tính năng code tay đặc thù",
    "Bảo mật & Phân quyền đa cấp"
)
content = content.replace(
    "Custom hand-coded features",
    "Security & Multi-level roles"
)

# Fix table ranges
content = content.replace("Từ 2.500.000đ", "2.500.000đ – 5.500.000đ")
content = content.replace("From $104", "$104 – $229")

content = content.replace("Từ 7.000.000đ", "7.000.000đ – 12.000.000đ")
content = content.replace("From $291", "$291 – $500")

content = content.replace("Từ 18.000.000đ", "18.000.000đ – 25.000.000đ")
content = content.replace("From $750", "$750 – $1,041")

content = content.replace("Từ 30.000.000đ", "30.000.000đ – 50.000.000đ")
content = content.replace("From $1,250", "$1,250 – $2,083")

content = content.replace("Từ 20.000.000đ", "20.000.000đ – 35.000.000đ")
content = content.replace("From $833", "$833 – $1,458")

content = content.replace("Từ 40.000.000đ", "40.000.000đ – 60.000.000đ")
content = content.replace("From $1,666", "$1,666 – $2,500")

content = content.replace("Từ 15.000.000đ", "15.000.000đ – 25.000.000đ")
content = content.replace("From $625", "$625 – $1,041")

content = content.replace("Từ 45.000.000đ", "45.000.000đ – 70.000.000đ")
content = content.replace("From $1,875", "$1,875 – $2,916")

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
