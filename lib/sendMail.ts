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

export async function sendMembershipApprovalMail(email: string, name: string) {
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
    subject: "Membership Application Approved",
    html: `
      <h2>We're ecstatic to have you on board!</h2>
      <p>Dear ${name},</p>
      <p>We are delighted to inform you that your membership application has been <strong>approved</strong>.</p>
      <p>Welcome to the Imaigal Trust family. We look forward to working together for the upliftment of our community.</p>
      <br/>
      <p>Best Regards</p>
      <p>Imaigal Trust Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendMembershipRejectionMail(email: string, name: string) {
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
    subject: "Update on Your Membership Application",
    html: `
      <h2>Membership Application Status</h2>
      <p>Dear ${name},</p>
      <p>Thank you for your interest in joining Imaigal Trust. We have carefully reviewed your application.</p>
      <p>We regret to inform you that your membership application has not been approved at this time.</p>
      <p>Thank you once again for your interest in our organization.</p>
      <br/>
      <p>Best Regards</p>
      <p>Imaigal Trust Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendEventRegistrationMail(email: string, name: string, eventTitle: string) {
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
    subject: `Registration Received: ${eventTitle}`,
    html: `
      <h2>Registration Received</h2>
      <p>Dear ${name},</p>
      <p>Thank you for registering for the event: <strong>${eventTitle}</strong>.</p>
      <p>Your registration is currently under review. We will notify you once your registration is approved.</p>
      <br/>
      <p>Best Regards</p>
      <p>Imaigal Trust Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendEventApprovalMail(email: string, name: string, eventTitle: string) {
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
    subject: `Registration Approved: ${eventTitle}`,
    html: `
      <h2>Event Registration Approved!</h2>
      <p>Dear ${name},</p>
      <p>We are excited to inform you that your registration for <strong>${eventTitle}</strong> has been <strong>approved</strong>!</p>
      <p>We look forward to seeing you at the event.</p>
      <br/>
      <p>Best Regards</p>
      <p>Imaigal Trust Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendEventRejectionMail(email: string, name: string, eventTitle: string) {
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
    subject: `Update on Registration: ${eventTitle}`,
    html: `
      <h2>Event Registration Status</h2>
      <p>Dear ${name},</p>
      <p>Thank you for registering for <strong>${eventTitle}</strong>.</p>
      <p>Unfortunately, we are unable to approve your registration at this time.</p>
      <p>We appreciate your interest and encourage you to participate in our future events.</p>
      <br/>
      <p>Best Regards</p>
      <p>Imaigal Trust Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
