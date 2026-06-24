import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { to, quoteText, qrUrl } = await request.json();

    if (!to || !quoteText) {
      return NextResponse.json(
        { error: 'Thiếu email nhận hoặc nội dung báo giá.' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlContent = quoteText.replace(/\n/g, '<br/>');

    const mailOptions = {
      from: `"StorePublish" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Báo giá dịch vụ StorePublish',
      text: quoteText,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body style="background-color: #f5f5f7; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 16px; border: 1px solid #e5e5ea; box-shadow: 0 4px 24px rgba(0,0,0,0.04);">
            <div style="text-align: center; margin-bottom: 20px;">
              <h2 style="margin: 0; color: #1d1d1f; font-size: 22px;">BÁO GIÁ DỊCH VỤ</h2>
              <p style="margin: 5px 0 0; color: #86868b; font-size: 14px;">Thương hiệu StorePublish</p>
            </div>
            
            <div style="line-height: 1.6; color: #1d1d1f; font-size: 15px;">
              ${htmlContent}
            </div>

            ${qrUrl ? `
            <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #f5f5f7; border-radius: 12px;">
              <p style="margin: 0 0 15px; font-weight: 600; color: #1d1d1f;">Quét mã QR để tạm ứng (50%)</p>
              <img src="${qrUrl}" alt="QR Thanh toán" style="width: 200px; height: 200px; border-radius: 8px; border: 1px solid #d2d2d7;" />
            </div>
            ` : ''}
            
            <hr style="border: none; border-top: 1px solid #e5e5ea; margin: 30px 0;" />
            <p style="font-size: 12px; color: #86868b; text-align: center; margin: 0; line-height: 1.5;">
              Đây là email tự động từ hệ thống báo giá của StorePublish.<br>
              Vui lòng không trả lời email này.
            </p>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lỗi gửi email:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi gửi email. Vui lòng kiểm tra lại cấu hình.' },
      { status: 500 }
    );
  }
}
