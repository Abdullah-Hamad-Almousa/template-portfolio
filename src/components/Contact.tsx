import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { FadeUp } from "./FadeUp";

export function Contact() {
  const [formData, setFormData] = useState({
    inquiryType: "",
    name: "",
    email: "",
    organization: "",
    role: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
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
    if (!formData.inquiryType) newErrors.inquiryType = "Please select an inquiry type";
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.organization.trim()) newErrors.organization = "Organization is required";
    if (!formData.role.trim()) newErrors.role = "Your role is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

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

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://formspree.io/f/meorrjjr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pt-28 pb-20 container max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <FadeUp as="div" delay={0}>
              <span className="block text-xs tracking-[3px] uppercase text-muted-foreground mb-3">
                GET IN TOUCH
              </span>
            </FadeUp>
            <FadeUp as="h1" delay={0.08}>
              <span className="block text-5xl font-medium tracking-tightish">
                Contact <span className="serif">Me</span>
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
                {isWorkingHours ? "Active Now (Working)" : "Away (Off-hours)"}
              </span>
            </div>
          </FadeUp>

          <FadeUp as="p" delay={0.2} className="text-muted-foreground text-sm leading-relaxed">
            Reach out for machine learning projects, algorithm designs, data pipelines, or technical consultations. I am typically responsive within 24 hours.
          </FadeUp>

          {/* Contact Details */}
          <FadeUp delay={0.24} className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-foreground/90">
              <div className="w-9 h-9 rounded-full bg-foreground/5 border border-border/30 flex items-center justify-center text-primary">
                <Mail size={16} />
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">Email</span>
                <a href="mailto:abdullahmlwork@gmail.com" className="hover:underline">
                  abdullahmlwork@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-foreground/90">
              <div className="w-9 h-9 rounded-full bg-foreground/5 border border-border/30 flex items-center justify-center text-primary">
                <MapPin size={16} />
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">Location</span>
                <span>Riyadh, Saudi Arabia (AST UTC+3)</span>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          <FadeUp delay={0.16}>
            <div className="liquid-glass p-8 rounded-2xl border border-border/30">
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                {/* Inquiry Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">
                    Inquiry Type
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
                      Select inquiry type...
                    </option>
                    <option value="collaboration" className="bg-background">
                      Collaboration
                    </option>
                    <option value="job" className="bg-background">
                      Job Opportunity
                    </option>
                    <option value="technical" className="bg-background">
                      Technical Discussion
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
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Mohammad Ali"
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
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="ali@example.com"
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
                      Organization
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        name="organization"
                        placeholder="Company Name"
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
                        None
                      </button>
                    </div>
                    {errors.organization && (
                      <span className="text-xs text-red-400 block">{errors.organization}</span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase">
                      Your Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      placeholder="e.g. Recruiter"
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
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="What is this regarding?"
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
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Type your message here..."
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
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
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
                  <span>Message sent successfully! Thank you.</span>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 p-4 rounded-lg border border-red-500/30 bg-red-500/5 text-red-400 text-sm flex items-center gap-2.5"
                >
                  <AlertCircle size={16} />
                  <span>Failed to send message. Please try again or email directly.</span>
                </motion.div>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
