"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Eye,
  FileText,
  Globe2,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  UserRound,
} from "lucide-react";

type Locale = "vi" | "en";

const missing = {
  vi: "Cần bổ sung",
  en: "Information to add",
};

const content = {
  vi: {
    back: "Về StorePublish",
    badge: "CHÍNH SÁCH QUYỀN RIÊNG TƯ",
    title: "Chính sách quyền riêng tư NearU",
    intro:
      "Chính sách này giải thích cách ứng dụng NearU xử lý dữ liệu cá nhân. Vui lòng đọc kỹ trước khi sử dụng ứng dụng.",
    updated: "Cập nhật lần cuối: 25 tháng 9 năm 2026",
    language: "English",
    overviewTitle: "Tóm tắt nhanh",
    overview: [
      "NearU chỉ chia sẻ vị trí của bạn lên bản đồ khi bạn cấp quyền và chủ động check-in.",
      "Vị trí hiển thị là gần đúng, tự hết hạn sau 2 giờ và có thể dừng chia sẻ bất cứ lúc nào.",
      "Bạn có thể truy cập, chỉnh sửa hoặc yêu cầu xóa dữ liệu và tài khoản ngay trong ứng dụng.",
    ],
    sections: [
      {
        id: "scope",
        title: "1. Phạm vi áp dụng",
        body: [
          "Chính sách này áp dụng cho ứng dụng NearU và các tính năng liên quan mà bạn sử dụng trong ứng dụng.",
          "Các điều khoản vận hành, chủ thể cung cấp ứng dụng và phạm vi dịch vụ cụ thể cần được xác nhận trước khi chính sách này được phát hành chính thức.",
        ],
      },
      {
        id: "data",
        title: "2. Dữ liệu NearU có thể thu thập",
        body: [
          "Dữ liệu tài khoản: thông tin bạn cung cấp để tạo, đăng nhập hoặc quản lý tài khoản. [CẦN BỔ SUNG: phương thức đăng nhập và các trường thông tin thực tế].",
          "Dữ liệu hồ sơ: tên hiển thị, ảnh đại diện và các thông tin hồ sơ mà bạn chọn cung cấp. [CẦN BỔ SUNG: các trường hồ sơ cụ thể].",
          "Nội dung do người dùng tạo: nội dung bạn đăng, gửi, phản hồi hoặc tương tác trong NearU. [CẦN BỔ SUNG: loại nội dung và phạm vi hiển thị cụ thể].",
          "Dữ liệu thiết bị: dữ liệu kỹ thuật cần thiết để ứng dụng hoạt động và xử lý sự cố. [CẦN BỔ SUNG: các loại dữ liệu thiết bị, nhật ký hoặc mã định danh thực tế].",
        ],
      },
      {
        id: "location",
        title: "3. Vị trí và check-in trên bản đồ",
        body: [
          "NearU không tự động công khai vị trí của bạn. Vị trí chỉ được chia sẻ lên bản đồ khi bạn đã cấp quyền vị trí cho ứng dụng và chủ động thực hiện thao tác check-in.",
          "Vị trí hiển thị trên bản đồ là vị trí gần đúng, không phải tọa độ chính xác. Lượt chia sẻ check-in tự hết hạn sau 2 giờ.",
          "Bạn có thể dừng chia sẻ bất cứ lúc nào bằng cách tắt hoặc kết thúc check-in trong ứng dụng. Bạn cũng có thể thu hồi quyền vị trí trong cài đặt của thiết bị.",
        ],
      },
      {
        id: "use",
        title: "4. Cách NearU sử dụng dữ liệu",
        body: [
          "Dữ liệu được sử dụng để cung cấp và vận hành các tính năng bạn yêu cầu, bao gồm tài khoản, hồ sơ, nội dung, tương tác và check-in trên bản đồ.",
          "Dữ liệu cũng có thể được dùng để hỗ trợ người dùng, khắc phục lỗi, phòng ngừa lạm dụng và cải thiện ứng dụng. [CẦN BỔ SUNG: các mục đích xử lý khác, nếu có].",
        ],
      },
      {
        id: "sharing",
        title: "5. Chia sẻ dữ liệu",
        body: [
          "NearU chỉ hiển thị hoặc chia sẻ dữ liệu theo tính năng và lựa chọn của bạn, chẳng hạn nội dung bạn công khai hoặc lượt check-in mà bạn chủ động tạo.",
          "Nếu dữ liệu được chia sẻ với bên xử lý dữ liệu, nhà cung cấp hạ tầng hoặc theo yêu cầu pháp lý, chính sách chính thức cần nêu rõ từng nhóm bên nhận, mục đích và phạm vi dữ liệu. [CẦN BỔ SUNG: thông tin này].",
          "NearU không nêu tên bất kỳ đối tác, đơn vị liên kết hoặc bên nhận dữ liệu nào tại đây khi chưa có thông tin được xác thực.",
        ],
      },
      {
        id: "control",
        title: "6. Quyền truy cập, chỉnh sửa và xóa dữ liệu",
        body: [
          "Bạn có thể xem và chỉnh sửa thông tin hồ sơ trong ứng dụng. [CẦN BỔ SUNG: đường dẫn/tên màn hình chính xác].",
          "Bạn có thể xóa nội dung do mình tạo khi tính năng tương ứng cho phép. [CẦN BỔ SUNG: phạm vi nội dung có thể tự xóa].",
          "Để yêu cầu xóa tài khoản, hãy sử dụng mục yêu cầu xóa tài khoản trong ứng dụng. [CẦN BỔ SUNG: đường dẫn/tên nút chính xác và thời hạn xử lý].",
          "Việc xóa có thể chịu các ngoại lệ lưu giữ theo nghĩa vụ pháp lý hoặc yêu cầu kỹ thuật thực tế. [CẦN BỔ SUNG: chính sách lưu giữ dữ liệu].",
        ],
      },
      {
        id: "safety",
        title: "7. Chặn người dùng",
        body: [
          "Bạn có thể chặn một người dùng từ màn hình hồ sơ hoặc khu vực tương tác của người đó trong ứng dụng. [CẦN BỔ SUNG: vị trí thao tác và tác động chính xác của việc chặn].",
          "Sau khi chặn, NearU sẽ áp dụng giới hạn tương ứng theo thiết kế thực tế của tính năng. [CẦN BỔ SUNG: các giới hạn cụ thể, ví dụ về xem hồ sơ, nhắn tin hoặc tương tác].",
        ],
      },
      {
        id: "security",
        title: "8. Bảo mật và lưu giữ dữ liệu",
        body: [
          "Thông tin về biện pháp bảo mật, nơi lưu trữ, thời hạn lưu giữ và quy trình xử lý sự cố cần phản ánh đúng cách NearU đang vận hành. [CẦN BỔ SUNG: các biện pháp và thời hạn đã được xác thực].",
          "Chính sách này không đưa ra cam kết bảo mật hoặc mô tả kỹ thuật khi chưa có thông tin được xác nhận.",
        ],
      },
      {
        id: "contact",
        title: "9. Liên hệ và cập nhật chính sách",
        body: [
          "Để hỏi về quyền riêng tư hoặc thực hiện quyền đối với dữ liệu, hãy liên hệ qua kênh hỗ trợ chính thức của NearU. [CẦN BỔ SUNG: email hoặc kênh liên hệ].",
          "NearU có thể cập nhật chính sách này khi tính năng hoặc cách xử lý dữ liệu thay đổi. Phiên bản mới sẽ ghi rõ ngày cập nhật.",
        ],
      },
    ],
  },
  en: {
    back: "Back to StorePublish",
    badge: "PRIVACY POLICY",
    title: "NearU Privacy Policy",
    intro:
      "This policy explains how the NearU app handles personal data. Please read it carefully before using the app.",
    updated: "Last updated: September 25, 2026",
    language: "Tiếng Việt",
    overviewTitle: "At a glance",
    overview: [
      "NearU only shares your location on the map when you grant permission and actively check in.",
      "The displayed location is approximate, expires automatically after 2 hours, and can be stopped at any time.",
      "You can access, correct, or request deletion of your data and account from within the app.",
    ],
    sections: [
      {
        id: "scope",
        title: "1. Scope",
        body: [
          "This policy applies to the NearU app and the related in-app features that you use.",
          "The operating entity, specific services, and terms of operation need confirmation before this policy is officially published.",
        ],
      },
      {
        id: "data",
        title: "2. Data NearU may collect",
        body: [
          "Account data: information you provide to create, sign in to, or manage an account. [INFORMATION TO ADD: sign-in methods and actual fields].",
          "Profile data: display name, profile image, and profile information you choose to provide. [INFORMATION TO ADD: specific profile fields].",
          "User-generated content: content that you post, send, reply to, or interact with in NearU. [INFORMATION TO ADD: content types and specific visibility].",
          "Device data: technical data needed for the app to operate and troubleshoot issues. [INFORMATION TO ADD: actual device data, logs, or identifiers].",
        ],
      },
      {
        id: "location",
        title: "3. Location and map check-ins",
        body: [
          "NearU does not automatically make your location public. Your location is only shared on the map after you grant the app location permission and actively check in.",
          "The location shown on the map is approximate, not an exact coordinate. Each check-in sharing period automatically expires after 2 hours.",
          "You can stop sharing at any time by turning off or ending your check-in in the app. You can also revoke location permission in your device settings.",
        ],
      },
      {
        id: "use",
        title: "4. How NearU uses data",
        body: [
          "Data is used to provide and operate the features you request, including accounts, profiles, content, interactions, and map check-ins.",
          "Data may also be used for support, issue resolution, abuse prevention, and app improvement. [INFORMATION TO ADD: any additional processing purposes].",
        ],
      },
      {
        id: "sharing",
        title: "5. Data sharing",
        body: [
          "NearU only displays or shares data in line with a feature and your choices, such as content you make public or a check-in that you actively create.",
          "If data is shared with data processors, infrastructure providers, or in response to legal requirements, the final policy must identify each recipient category, purpose, and data scope. [INFORMATION TO ADD: these details].",
          "NearU does not name any partners, affiliates, or data recipients here without verified information.",
        ],
      },
      {
        id: "control",
        title: "6. Access, correction, and deletion",
        body: [
          "You can view and edit profile information in the app. [INFORMATION TO ADD: exact path or screen name].",
          "You can delete content you create where the applicable feature allows it. [INFORMATION TO ADD: what content can be self-deleted].",
          "To request account deletion, use the in-app account deletion request section. [INFORMATION TO ADD: exact path/button name and processing timeline].",
          "Deletion may be subject to retention exceptions required by applicable law or actual technical requirements. [INFORMATION TO ADD: data retention policy].",
        ],
      },
      {
        id: "safety",
        title: "7. Blocking users",
        body: [
          "You can block a user from their profile screen or the relevant interaction area in the app. [INFORMATION TO ADD: exact location and effect of blocking].",
          "After a block, NearU applies the limits defined by the actual feature design. [INFORMATION TO ADD: specific limits, for example profile viewing, messages, or interactions].",
        ],
      },
      {
        id: "security",
        title: "8. Security and retention",
        body: [
          "Information about security safeguards, storage locations, retention periods, and incident handling must accurately reflect how NearU operates. [INFORMATION TO ADD: verified safeguards and timeframes].",
          "This policy does not make security commitments or technical claims that have not been confirmed.",
        ],
      },
      {
        id: "contact",
        title: "9. Contact and policy updates",
        body: [
          "For privacy questions or to exercise data rights, contact NearU through its official support channel. [INFORMATION TO ADD: email address or contact channel].",
          "NearU may update this policy when its features or data practices change. The new version will state its update date.",
        ],
      },
    ],
  },
};

const icons = [FileText, UserRound, MapPin, ShieldCheck, Globe2, Eye, LockKeyhole, CheckCircle2, FileText];

function HighlightedText({ text, locale }: { text: string; locale: Locale }) {
  const marker = locale === "vi" ? "[CẦN BỔ SUNG:" : "[INFORMATION TO ADD:";
  const index = text.indexOf(marker);

  if (index === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <span className="mx-1 inline rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">
        {text.slice(index)}
      </span>
    </>
  );
}

export default function NearuPrivacyPolicyPage() {
  const [locale, setLocale] = useState<Locale>("vi");
  const copy = content[locale];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_16%_10%,rgba(59,130,246,0.14),transparent_34%),radial-gradient(circle_at_88%_14%,rgba(99,102,241,0.12),transparent_31%)]" />

      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-[#0b4a80]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          {copy.back}
        </Link>
        <div className="flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
          {(["vi", "en"] as Locale[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setLocale(item)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                locale === item
                  ? "bg-[#0b3559] text-white shadow-sm"
                  : "text-slate-500 hover:text-[#0b3559]"
              }`}
              aria-pressed={locale === item}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <section className="relative mx-auto max-w-6xl px-5 pb-10 pt-10 sm:px-8 sm:pt-16 lg:px-10">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-extrabold tracking-[0.22em] text-[#1769aa]">{copy.badge}</p>
          <h1 className="text-4xl font-black leading-[1.08] tracking-[-0.045em] text-[#082f4d] sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">{copy.intro}</p>
          <p className="mt-5 text-sm font-medium text-slate-500">{copy.updated}</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {copy.overview.map((item, index) => {
            const Icon = [MapPin, Eye, UserRound][index];
            return (
              <article key={item} className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_16px_50px_rgba(15,42,69,0.06)] backdrop-blur">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eaf3fb] text-[#1769aa]">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold leading-6 text-slate-700">{item}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 pb-20 sm:px-8 lg:px-10">
        <div className="rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,42,69,0.08)]">
          <div className="border-b border-slate-100 px-6 py-5 sm:px-9">
            <p className="text-sm font-bold tracking-wide text-[#0b4a80]">{copy.overviewTitle}</p>
          </div>
          <div className="divide-y divide-slate-100">
            {copy.sections.map((section, index) => {
              const Icon = icons[index];
              return (
                <details key={section.id} className="group px-6 sm:px-9" open={section.id === "location"}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-left marker:content-none">
                    <span className="flex items-center gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#edf5fb] text-[#1769aa] transition-colors group-open:bg-[#0b4a80] group-open:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-base font-bold text-slate-800 sm:text-lg">{section.title}</span>
                    </span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <div className="pb-7 pl-0 sm:pl-14">
                    <div className="space-y-4 rounded-2xl bg-slate-50 p-5 sm:p-6">
                      {section.body.map((paragraph) => (
                        <p key={paragraph} className="text-sm leading-7 text-slate-600 sm:text-[15px]">
                          <HighlightedText text={paragraph} locale={locale} />
                        </p>
                      ))}
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </div>

        <aside className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 px-6 py-5 text-sm leading-6 text-amber-900 sm:px-8">
          <strong>{missing[locale]}: </strong>
          {locale === "vi"
            ? "Các mục được đánh dấu trong chính sách cần được xác nhận và hoàn thiện trước khi dùng làm bản công bố chính thức."
            : "The marked items in this policy need to be confirmed and completed before it is used as an official publication."}
        </aside>
      </section>
    </main>
  );
}
