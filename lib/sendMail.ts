import nodemailer from "nodemailer";

export async function sendMembershipMail(email: string, name: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Imaigal Trust" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Membership Application Received",
    html: `
      <h2>Thank you for applying for membership</h2>
      <p>Dear ${name},</p>
      <p>Your membership application has been received successfully.</p>
      <p>Our team will review your application and contact you soon.</p>
      <br/>
      <p>Best Regards</p>
      <p>Imaigal Trust Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}