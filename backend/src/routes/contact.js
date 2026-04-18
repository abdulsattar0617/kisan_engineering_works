import { Router }           from 'express';
import { body, validationResult } from 'express-validator';
import nodemailer             from 'nodemailer';
import { RateLimiterMemory }  from 'rate-limiter-flexible';

const router = Router();

const rateLimiter = new RateLimiterMemory({
  points:   parseInt(process.env.RATE_LIMIT_MAX) || 10,
  duration: 15 * 60, // 15 minutes
});

const validators = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').optional({ checkFalsy: true }).trim().isLength({ max: 20 }),
  body('company').optional({ checkFalsy: true }).trim().isLength({ max: 100 }),
  body('service').optional({ checkFalsy: true }).trim().isLength({ max: 100 }),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
];

function createTransporter() {
  if (!process.env.SMTP_USER) {
    return null;
  }
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
    port:   parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

router.post('/', validators, async (req, res, next) => {
  // Rate limiting
  try {
    await rateLimiter.consume(req.ip);
  } catch {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
    });
  }

  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors:  errors.array(),
    });
  }

  const { name, email, phone, company, service, message } = req.body;

  try {
    const transporter = createTransporter();

    if (transporter) {
      const contactEmail = process.env.CONTACT_EMAIL || 'kissanengg9860@gmail.com';

      // Email to business
      await transporter.sendMail({
        from:    `"Kissan Engineering Works Website" <${process.env.SMTP_USER}>`,
        to:      contactEmail,
        subject: `New Contact Enquiry from ${name}${service ? ` – ${service}` : ''}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:20px;border-radius:12px">
            <div style="background:#1e3a5f;padding:24px;border-radius:8px;text-align:center;margin-bottom:20px">
              <h2 style="color:#f97316;margin:0;font-size:22px">Kissan Engineering Works</h2>
              <p style="color:#94a3b8;margin:4px 0 0;font-size:13px">New Enquiry</p>
            </div>
            <div style="background:#fff;padding:24px;border-radius:8px;border:1px solid #e2e8f0">
              <h3 style="color:#1e3a5f;margin-top:0">Contact Details</h3>
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;color:#64748b;font-size:14px;width:120px"><strong>Name:</strong></td><td style="padding:8px 0;color:#1e293b;font-size:14px">${name}</td></tr>
                <tr><td style="padding:8px 0;color:#64748b;font-size:14px"><strong>Email:</strong></td><td style="padding:8px 0;color:#1e293b;font-size:14px"><a href="mailto:${email}" style="color:#f97316">${email}</a></td></tr>
                ${phone    ? `<tr><td style="padding:8px 0;color:#64748b;font-size:14px"><strong>Phone:</strong></td><td style="padding:8px 0;color:#1e293b;font-size:14px">${phone}</td></tr>` : ''}
                ${company  ? `<tr><td style="padding:8px 0;color:#64748b;font-size:14px"><strong>Company:</strong></td><td style="padding:8px 0;color:#1e293b;font-size:14px">${company}</td></tr>` : ''}
                ${service  ? `<tr><td style="padding:8px 0;color:#64748b;font-size:14px"><strong>Service:</strong></td><td style="padding:8px 0;color:#1e293b;font-size:14px">${service}</td></tr>` : ''}
              </table>
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0">
              <h4 style="color:#1e3a5f;margin:0 0 8px">Message:</h4>
              <p style="color:#475569;font-size:14px;line-height:1.6;white-space:pre-wrap;background:#f8fafc;padding:12px;border-radius:6px">${message}</p>
            </div>
            <p style="text-align:center;color:#94a3b8;font-size:12px;margin-top:16px">Sent via kisanengineering.com contact form</p>
          </div>
        `,
      });

      // Auto-reply to sender
      await transporter.sendMail({
        from:    `"Kissan Engineering Works" <${process.env.SMTP_USER}>`,
        to:      email,
        subject: 'We received your enquiry – Kisan Engineering Works',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#1e3a5f;padding:24px;text-align:center;border-radius:8px 8px 0 0">
              <h2 style="color:#f97316;margin:0">Kisan Engineering Works</h2>
              <p style="color:#94a3b8;margin:4px 0 0;font-size:13px">Engineering Excellence, Built to Last</p>
            </div>
            <div style="background:#fff;padding:28px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px">
              <h3 style="color:#1e293b;margin-top:0">Thank you, ${name}!</h3>
              <p style="color:#475569;font-size:14px;line-height:1.6">We have received your enquiry and our team will get back to you within <strong>24 business hours</strong>.</p>
              ${service ? `<p style="color:#475569;font-size:14px;line-height:1.6">Enquiry regarding: <strong>${service}</strong></p>` : ''}
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0">
              <p style="color:#475569;font-size:13px">For urgent enquiries, please call us directly at <a href="tel:+919700877004" style="color:#f97316">+91 98765 43210</a></p>
              <p style="color:#94a3b8;font-size:12px;margin-top:20px">Kisan Engineering Works | Hyderabad | kissanengg9860@gmail.com</p>
            </div>
          </div>
        `,
      });
    } else {
      // No email config — log to console in dev
      console.log('\n📧  Contact Form Submission:');
      console.log({ name, email, phone, company, service, message });
    }

    res.status(200).json({
      success: true,
      message: 'Your message has been received. We will contact you shortly.',
    });

  } catch (err) {
    next(err);
  }
});

export default router;
