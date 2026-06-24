import { useState } from "react";
import { useCreateMemoirRequest } from "@workspace/api-client-react";
import { cn } from "@/lib/utils";

const PACKAGES = [
  {
    id: "essential",
    name: "Essential",
    price: "Contact for pricing",
    description: "A written memoir — interviews, research, and a beautifully crafted long-form piece.",
    features: ["In-depth interview sessions", "Written memoir (2,000–4,000 words)", "Editorial review", "Digital delivery"],
  },
  {
    id: "standard",
    name: "Standard",
    price: "Contact for pricing",
    description: "Everything in Essential, plus a professionally produced audio memoir.",
    features: ["Everything in Essential", "Audio recording & production", "Podcast-ready episode", "Transcript included"],
    featured: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "Contact for pricing",
    description: "The full Memoirs experience — written, audio, and a cinematic video memoir.",
    features: ["Everything in Standard", "Videography & editing", "Cinematic mini-documentary", "Archive-quality masters"],
  },
];

const RELATIONSHIPS = [
  "Child / Stepchild",
  "Spouse / Partner",
  "Grandchild",
  "Sibling",
  "Friend",
  "Colleague",
  "Other family member",
  "The subject themselves",
  "Other",
];

type Step = "details" | "contact" | "success";

export default function RequestMemoir() {
  const [step, setStep] = useState<Step>("details");
  const [selectedPackage, setSelectedPackage] = useState("standard");

  const [form, setForm] = useState({
    subjectName: "",
    subjectAge: "",
    milestone: "",
    relationship: "",
    storyNotes: "",
    requesterName: "",
    requesterEmail: "",
    requesterPhone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate, isPending } = useCreateMemoirRequest({
    mutation: {
      onSuccess: () => setStep("success"),
      onError: () =>
        setErrors({ submit: "Something went wrong. Please try again or email us directly." }),
    },
  });

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validateDetails = () => {
    const e: Record<string, string> = {};
    if (!form.subjectName.trim()) e.subjectName = "Please enter the subject's name.";
    if (!form.relationship) e.relationship = "Please select your relationship.";
    if (!form.storyNotes.trim()) e.storyNotes = "Please tell us a bit about their story.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateContact = () => {
    const e: Record<string, string> = {};
    if (!form.requesterName.trim()) e.requesterName = "Please enter your name.";
    if (!form.requesterEmail.trim() || !form.requesterEmail.includes("@"))
      e.requesterEmail = "Please enter a valid email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleDetailsNext = () => {
    if (validateDetails()) setStep("contact");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContact()) return;
    mutate({
      data: {
        subjectName: form.subjectName.trim(),
        subjectAge: form.subjectAge ? parseInt(form.subjectAge, 10) : null,
        milestone: form.milestone.trim() || null,
        relationship: form.relationship,
        storyNotes: form.storyNotes.trim(),
        package: selectedPackage as "essential" | "standard" | "premium",
        requesterName: form.requesterName.trim(),
        requesterEmail: form.requesterEmail.trim(),
        requesterPhone: form.requesterPhone.trim() || null,
      },
    });
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-8">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif mb-4">Request received.</h1>
          <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
            Thank you. We will review the details and reach out to <strong className="text-foreground">{form.requesterEmail}</strong> within 2–3 business days to discuss the next steps.
          </p>
          <a
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-sm bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Back to Memoirs
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-foreground text-background py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="inline-block mb-6 px-3 py-1 border border-background/20 text-background/50 text-xs font-medium uppercase tracking-widest rounded-sm">
            Memoir Service
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-medium leading-tight mb-6">
            Preserve a life's story.
          </h1>
          <p className="text-xl text-background/70 font-serif leading-relaxed max-w-2xl">
            Commission a professional memoir for someone whose story deserves to be told — especially those marking a milestone birthday, a retirement, or a remarkable chapter of their life.
          </p>
        </div>
      </section>

      {/* Package Selection */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl font-serif mb-2">Choose a package</h2>
          <p className="text-muted-foreground mb-10">Every Memoir is custom. Select the format that feels right.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {PACKAGES.map((pkg) => (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setSelectedPackage(pkg.id)}
                className={cn(
                  "text-left p-6 rounded border-2 transition-all duration-200",
                  selectedPackage === pkg.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/40"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="font-semibold text-base">{pkg.name}</span>
                  {pkg.featured && (
                    <span className="text-xs font-medium bg-primary/15 text-primary px-2 py-0.5 rounded-sm">
                      Most popular
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{pkg.description}</p>
                <ul className="space-y-1.5">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 text-primary flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className={cn(
                  "mt-4 pt-4 border-t text-xs font-medium",
                  selectedPackage === pkg.id ? "border-primary/20 text-primary" : "border-border text-muted-foreground"
                )}>
                  {pkg.price}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-10">
            <div className={cn("flex items-center gap-2 text-sm font-medium", step === "details" ? "text-primary" : "text-muted-foreground")}>
              <span className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2", step === "details" ? "border-primary text-primary" : "border-muted-foreground/40 text-muted-foreground")}>1</span>
              About the Subject
            </div>
            <div className="flex-1 h-px bg-border" />
            <div className={cn("flex items-center gap-2 text-sm font-medium", step === "contact" ? "text-primary" : "text-muted-foreground")}>
              <span className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2", step === "contact" ? "border-primary text-primary" : "border-muted-foreground/40 text-muted-foreground")}>2</span>
              Your Contact Details
            </div>
          </div>

          {step === "details" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif">Tell us about the subject</h2>
              <p className="text-muted-foreground">The person whose life story this Memoir will document.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Their full name <span className="text-primary">*</span></label>
                  <input
                    type="text"
                    value={form.subjectName}
                    onChange={set("subjectName")}
                    placeholder="e.g. Margaret Owusu"
                    className={cn("h-12 w-full rounded-sm border px-4 text-sm bg-background transition-colors focus:outline-none focus:ring-1 focus:ring-primary", errors.subjectName ? "border-destructive" : "border-border")}
                  />
                  {errors.subjectName && <p className="text-destructive text-xs mt-1">{errors.subjectName}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Their age <span className="text-muted-foreground font-normal">(optional)</span></label>
                    <input
                      type="number"
                      value={form.subjectAge}
                      onChange={set("subjectAge")}
                      placeholder="e.g. 80"
                      min={1}
                      max={120}
                      className="h-12 w-full rounded-sm border border-border px-4 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Milestone <span className="text-muted-foreground font-normal">(optional)</span></label>
                    <input
                      type="text"
                      value={form.milestone}
                      onChange={set("milestone")}
                      placeholder="e.g. 80th birthday"
                      className="h-12 w-full rounded-sm border border-border px-4 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Your relationship to them <span className="text-primary">*</span></label>
                  <select
                    value={form.relationship}
                    onChange={set("relationship")}
                    className={cn("h-12 w-full rounded-sm border px-4 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-colors appearance-none", errors.relationship ? "border-destructive" : "border-border")}
                  >
                    <option value="">Select relationship</option>
                    {RELATIONSHIPS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                  {errors.relationship && <p className="text-destructive text-xs mt-1">{errors.relationship}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Tell us about their story <span className="text-primary">*</span></label>
                  <textarea
                    value={form.storyNotes}
                    onChange={set("storyNotes")}
                    rows={5}
                    placeholder="Share whatever feels important — their life, their work, their values, key moments, what makes their story worth telling. There is no wrong answer here."
                    className={cn("w-full rounded-sm border px-4 py-3 text-sm bg-background resize-none focus:outline-none focus:ring-1 focus:ring-primary transition-colors leading-relaxed", errors.storyNotes ? "border-destructive" : "border-border")}
                  />
                  {errors.storyNotes && <p className="text-destructive text-xs mt-1">{errors.storyNotes}</p>}
                </div>
              </div>

              <button
                type="button"
                onClick={handleDetailsNext}
                className="h-12 w-full rounded-sm bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {step === "contact" && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <button type="button" onClick={() => setStep("details")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  Back
                </button>
                <h2 className="text-2xl font-serif">Your contact details</h2>
                <p className="text-muted-foreground mt-1">We will reach out to discuss the project and next steps.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Your name <span className="text-primary">*</span></label>
                  <input
                    type="text"
                    value={form.requesterName}
                    onChange={set("requesterName")}
                    placeholder="Your full name"
                    className={cn("h-12 w-full rounded-sm border px-4 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-colors", errors.requesterName ? "border-destructive" : "border-border")}
                  />
                  {errors.requesterName && <p className="text-destructive text-xs mt-1">{errors.requesterName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Email address <span className="text-primary">*</span></label>
                  <input
                    type="email"
                    value={form.requesterEmail}
                    onChange={set("requesterEmail")}
                    placeholder="you@example.com"
                    className={cn("h-12 w-full rounded-sm border px-4 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-colors", errors.requesterEmail ? "border-destructive" : "border-border")}
                  />
                  {errors.requesterEmail && <p className="text-destructive text-xs mt-1">{errors.requesterEmail}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Phone number <span className="text-muted-foreground font-normal">(optional)</span></label>
                  <input
                    type="tel"
                    value={form.requesterPhone}
                    onChange={set("requesterPhone")}
                    placeholder="+1 (555) 000-0000"
                    className="h-12 w-full rounded-sm border border-border px-4 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="bg-muted/40 rounded border border-border p-5 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subject</span>
                  <span className="font-medium">{form.subjectName}{form.subjectAge ? `, age ${form.subjectAge}` : ""}</span>
                </div>
                {form.milestone && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Milestone</span>
                    <span className="font-medium">{form.milestone}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Package</span>
                  <span className="font-medium capitalize">{selectedPackage}</span>
                </div>
              </div>

              {errors.submit && (
                <p className="text-destructive text-sm bg-destructive/10 px-4 py-3 rounded-sm">{errors.submit}</p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="h-12 w-full rounded-sm bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isPending ? "Submitting…" : "Submit Request"}
              </button>

              <p className="text-xs text-muted-foreground text-center">
                No payment now. We will contact you to discuss the scope and pricing before anything is confirmed.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
