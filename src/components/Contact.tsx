import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { FadeUp } from "./FadeUp";
import { useLanguage } from "../hooks/useLanguage";

export function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    inquiryType: "",
    name: "",
    email: "",
    organization: "",
    role: "",
    subject: "",
    message: "",
    _gotcha: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isWorkingHours, setIsWorkingHours] = useState(true);

  // Check if current Riyadh time is between 9 AM and 6 PM AST (UTC+3)
  useEffect(() => {
    const checkAvailability = () => {
      // Get UTC time
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      // Riyadh is UTC + 3
      const riyadhTime = new Date(utc + 3600000 * 3);
      const hours = riyadhTime.getHours();
      const day = riyadhTime.getDay(); // 0 is Sunday, 6 is Saturday

      // Working hours: Sunday - Thursday, 9:00 to 18:00
      const isWorkingDay = day >= 0 && day <= 4; // Sunday to Thursday (Saudi standard work week)
      const isWorkingHour = hours >= 9 && hours < 18;

      setIsWorkingHours(isWorkingDay && isWorkingHour);
    };

    checkAvailability();
    const interval = setInterval(checkAvailability, 60000);
    return () => clearInterval(interval);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.inquiryType) newErrors.inquiryType = t.contact.validationInquiryType;
    if (!formData.name.trim()) newErrors.name = t.contact.validationFullName;
    
    if (!formData.email.trim()) {
      newErrors.email = t.contact.validationEmailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.contact.validationEmailInvalid;
    }
    
    if (!formData.organization.trim()) newErrors.organization = t.contact.validationOrganization;
    if (!formData.role.trim()) newErrors.role = t.contact.validationRole;
    if (!formData.subject.trim()) newErrors.subject = t.contact.validationSubject;
    if (!formData.message.trim()) newErrors.message = t.contact.validationMessage;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleNoneClick = () => {
    setFormData((prev) => ({ ...prev, organization: "None" }));
    if (errors.organization) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.organization;
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Honeypot: if filled, silently treat as spam — pretend success
    if (formData._gotcha) {
      setSubmitStatus("success");
      setFormData({
        inquiryType: "",
        name: "",
        email: "",
        organization: "",
        role: "",
        subject: "",
        message: "",
        _gotcha: "",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Pack extra fields into message since backend only accepts name/email/message
    const packedMessage = [
      `Inquiry Type: ${formData.inquiryType}`,
      `Organization: ${formData.organization}`,
      `Role: ${formData.role}`,
      `Subject: ${formData.subject}`,
      "",
      formData.message,
    ].join("\n");

    try {
      const response = await fetch("https://api.modelai.website/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: packedMessage,
          _gotcha: "",
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          inquiryType: "",
          name: "",
          email: "",
          organization: "",
          role: "",
          subject: "",
          message: "",
          _gotcha: "",
        });
      } else if (response.status === 400) {
        const data = await response.json().catch(() => ({}));
        if (data.errors && Array.isArray(data.errors)) {
          setErrors(Object.fromEntries(data.errors.map((e: { field: string; message: string }) => [e.field, e.message])));
        }
        setErrorMessage(t.contact.errorFields);
        setSubmitStatus("error");
      } else if (response.status === 429) {
        setErrorMessage(t.contact.errorTooMany);
        setSubmitStatus("error");
      } else {
        setErrorMessage(t.contact.errorGeneric);
        setSubmitStatus("error");
      }
    } catch {
      setErrorMessage(t.contact.errorNetwork);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const headingParts = t.contact.heading.split(t.contact.headingSerifWord);
  const headingBefore = headingParts[0] ?? "";
  const headingAfter = headingParts.slice(1).join(t.contact.headingSerifWord) ?? "";

  return (
    <section className="pt-28 pb-20 container max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <FadeUp as="div" delay={0}>
              <span className="block text-xs tracking-[3px] uppercase text-muted-foreground mb-3">
                {t.contact.tag}
              </span>
            </FadeUp>
            <FadeUp as="h1" delay={0.08}>
              <span className="block text-5xl font-medium tracking-tightish">
                {headingBefore}<span className="serif">{t.contact.headingSerifWord}</span>{headingAfter}
              </span>
            </FadeUp>
          </div>

          {/* Presence Indicator */}
          <FadeUp delay={0.16}>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-foreground/5 border border-border/30">
              <span className={`relative flex h-2.5 w-2.5`}>
                {isWorkingHours && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    isWorkingHours ? "bg-emerald-500" : "bg-zinc-500"
                  }`}
                ></span>
              </span>
              <span className="text-xs font-medium text-foreground/80">
                {isWorkingHours ? t.contact.activeNow : t.contact.away}
              </span>
            </div>
          </FadeUp>

          <FadeUp as="p" delay={0.2} className="text-muted-foreground text-sm leading-relaxed">
            {t.contact.description}
          </FadeUp>

          {/* Contact Details */}
          <FadeUp delay={0.24} className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-foreground/90">
              <div className="w-9 h-9 rounded-full bg-foreground/5 border border-border/30 flex items-center justify-center text-primary">
                <Mail size={16} />
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">{t.contact.emailLabel}</span>
                <a href="mailto:abdullahalmousa@modelai.website" className="hover:underline">
                  abdullahalmousa@modelai.website
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-foreground/90">
              <div className="w-9 h-9 rounded-full bg-foreground/5 border border-border/30 flex items-center justify-center text-primary">
                <MapPin size={16} />
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">{t.contact.locationLabel}</span>
                <span>{t.contact.locationValue}</span>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          <FadeUp delay={0.16}>
            <div className="liquid-glass p-8 rounded-2xl border border-border/30">
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                {/* Honeypot — hidden from real users, bots fill it */}
                <input
                  type="text"
                  name="_gotcha"
                  value={formData._gotcha}
                  onChange={handleInputChange}
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
                />
                {/* Inquiry Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">
                    {t.contact.inquiryTypeLabel}
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className={`w-full bg-background/50 border rounded-lg px-4 py-2.5 text-sm outline-none text-foreground ${
                      errors.inquiryType ? "border-red-500/60" : "border-border/40 focus:border-primary/80"
                    }`}
                  >
                    <option value="" disabled className="bg-background">
                      {t.contact.inquiryTypePlaceholder}
                    </option>
                    <option value="collaboration" className="bg-background">
                      {t.contact.inquiryOptions.collaboration}
                    </option>
                    <option value="job" className="bg-background">
                      {t.contact.inquiryOptions.jobOpportunity}
                    </option>
                    <option value="technical" className="bg-background">
                      {t.contact.inquiryOptions.technicalDiscussion}
                    </option>
                  </select>
                  {errors.inquiryType && (
                    <span className="text-xs text-red-400 block">{errors.inquiryType}</span>
                  )}
                </div>

                {/* Name & Email row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase">
                      {t.contact.fullNameLabel}
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder={t.contact.fullNamePlaceholder}
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full bg-background/50 border rounded-lg px-4 py-2.5 text-sm outline-none text-foreground ${
                        errors.name ? "border-red-500/60" : "border-border/40 focus:border-primary/80"
                      }`}
                    />
                    {errors.name && <span className="text-xs text-red-400 block">{errors.name}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase">
                      {t.contact.emailAddressLabel}
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder={t.contact.emailAddressPlaceholder}
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full bg-background/50 border rounded-lg px-4 py-2.5 text-sm outline-none text-foreground ${
                        errors.email ? "border-red-500/60" : "border-border/40 focus:border-primary/80"
                      }`}
                    />
                    {errors.email && <span className="text-xs text-red-400 block">{errors.email}</span>}
                  </div>
                </div>

                {/* Org & Role row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase">
                      {t.contact.organizationLabel}
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        name="organization"
                        placeholder={t.contact.organizationPlaceholder}
                        value={formData.organization}
                        onChange={handleInputChange}
                        className={`w-full bg-background/50 border rounded-lg pl-4 pr-16 py-2.5 text-sm outline-none text-foreground ${
                          errors.organization ? "border-red-500/60" : "border-border/40 focus:border-primary/80"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={handleNoneClick}
                        className="absolute right-2 px-2.5 py-1 rounded bg-foreground/10 text-[10px] font-semibold text-muted-foreground hover:text-foreground transition-all"
                      >
                        {t.contact.noneButton}
                      </button>
                    </div>
                    {errors.organization && (
                      <span className="text-xs text-red-400 block">{errors.organization}</span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase">
                      {t.contact.yourRoleLabel}
                    </label>
                    <input
                      type="text"
                      name="role"
                      placeholder={t.contact.yourRolePlaceholder}
                      value={formData.role}
                      onChange={handleInputChange}
                      className={`w-full bg-background/50 border rounded-lg px-4 py-2.5 text-sm outline-none text-foreground ${
                        errors.role ? "border-red-500/60" : "border-border/40 focus:border-primary/80"
                      }`}
                    />
                    {errors.role && <span className="text-xs text-red-400 block">{errors.role}</span>}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">
                    {t.contact.subjectLabel}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder={t.contact.subjectPlaceholder}
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full bg-background/50 border rounded-lg px-4 py-2.5 text-sm outline-none text-foreground ${
                      errors.subject ? "border-red-500/60" : "border-border/40 focus:border-primary/80"
                    }`}
                  />
                  {errors.subject && <span className="text-xs text-red-400 block">{errors.subject}</span>}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder={t.contact.messagePlaceholder}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full bg-background/50 border rounded-lg px-4 py-2.5 text-sm outline-none text-foreground resize-none ${
                      errors.message ? "border-red-500/60" : "border-border/40 focus:border-primary/80"
                    }`}
                  />
                  {errors.message && <span className="text-xs text-red-400 block">{errors.message}</span>}
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 bg-foreground text-background font-semibold rounded-lg py-3 text-sm tracking-wider transition-all disabled:opacity-50"
                >
                  <Send size={14} />
                  {isSubmitting ? t.contact.sending : t.contact.sendMessage}
                </motion.button>
              </form>

              {/* Status messages */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 p-4 rounded-lg border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-sm flex items-center gap-2.5"
                >
                  <CheckCircle size={16} />
                  <span>{t.contact.success}</span>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 p-4 rounded-lg border border-red-500/30 bg-red-500/5 text-red-400 text-sm flex items-center gap-2.5"
                >
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}