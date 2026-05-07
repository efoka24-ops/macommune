import Joi from 'joi';

// Common schemas
const idSchema = Joi.string().alphanum().required();
const emailSchema = Joi.string().email().required();
const cantonEnum = Joi.string().valid('figuil', 'lam', 'biou', 'bidzar_1', 'bidzar_2');
const cantonEnumWithTous = Joi.string().valid('figuil', 'lam', 'biou', 'bidzar_1', 'bidzar_2', 'tous');

// ──── AUTH ─────────────────────────────────────────────────────
export const loginSchema = Joi.object({
  email: emailSchema,
  password: Joi.string().min(6).required(),
});

export const registerSchema = Joi.object({
  email: emailSchema,
  password: Joi.string().min(8).required(),
  full_name: Joi.string().min(3).max(100).required(),
});

// ──── NEWS ARTICLE ─────────────────────────────────────────────
export const newsArticleSchema = Joi.object({
  title: Joi.string().min(5).max(200).required(),
  content: Joi.string().min(20).required(),
  excerpt: Joi.string().max(500).optional(),
  image_url: Joi.string().uri().optional().allow(null, ''),
  category: Joi.string().valid('terrain', 'reunion', 'projet', 'temoignage', 'communique').required(),
  canton: cantonEnumWithTous.required(),
  published: Joi.boolean().optional(),
});

// ──── SUPPORTER ────────────────────────────────────────────────
export const supporterSchema = Joi.object({
  full_name: Joi.string().min(2).max(100).required(),
  phone: Joi.string().regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/).optional().allow(null, ''),
  email: Joi.string().email().optional().allow(null, ''),
  canton: cantonEnum.required(),
  sector: Joi.string().max(100).optional(),
  notes: Joi.string().optional().allow(null, ''),
});

// ──── TESTIMONIAL ──────────────────────────────────────────────
export const testimonialSchema = Joi.object({
  author_name: Joi.string().min(2).max(100).required(),
  author_title: Joi.string().max(100).optional(),
  content: Joi.string().min(10).required(),
  canton: cantonEnum.required(),
});

// ──── BADGE ────────────────────────────────────────────────────
export const badgeSchema = Joi.object({
  email: emailSchema,
  name: Joi.string().max(100).optional(),
  activated: Joi.boolean().optional(),
});

// ──── EVENT ────────────────────────────────────────────────────
export const eventSchema = Joi.object({
  title: Joi.string().min(5).max(200).required(),
  description: Joi.string().min(20).required(),
  event_date: Joi.date().iso().required(),
  location: Joi.string().min(3).max(200).required(),
  canton: cantonEnumWithTous.required(),
  image_url: Joi.string().uri().optional().allow(null, ''),
  published: Joi.boolean().optional(),
});

// ──── DONATION ─────────────────────────────────────────────────
export const donationSchema = Joi.object({
  amount: Joi.number().integer().min(500).max(10000000).required(),
  phone_number: Joi.string().regex(/^[+]?[0-9]{7,15}$/).required(),
  donor_name: Joi.string().max(100).optional(),
  message: Joi.string().max(500).optional(),
});

// ──── PAGE CONTENT (CMS) ───────────────────────────────────────
export const pageContentSchema = Joi.object().unknown(true).min(1);

// Validate function
export function validateData(schema, data) {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });
  
  if (error) {
    const messages = error.details.map(d => `${d.path.join('.')}: ${d.message}`);
    return { valid: false, errors: messages, data: null };
  }
  
  return { valid: true, errors: [], data: value };
}

// Validation middleware factory
export function validateRequest(schema) {
  return (req, res, next) => {
    const validation = validateData(schema, req.body);
    if (!validation.valid) {
      return res.status(400).json({ error: 'Validation failed', details: validation.errors });
    }
    req.validated = validation.data;
    next();
  };
}
