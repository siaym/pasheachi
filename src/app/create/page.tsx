"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { CATEGORIES } from "@/lib/constants";
import { FadeIn, RevealText, PaperLift, InkDivider } from "@/components/ui/motion";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  HelpCircle,
  Paperclip,
} from "lucide-react";

export default function CreateCampaignPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [loading, setLoading] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("medical");
  const [goalAmount, setGoalAmount] = useState("");
  const [duration, setDuration] = useState("30");

  const [shortDesc, setShortDesc] = useState("");
  const [fullStory, setFullStory] = useState("");

  const [videoUrl, setVideoUrl] = useState("");

  const [milestones, setMilestones] = useState<{ title: string; amount: string }[]>([
    { title: "Phase 1 Initial Preparation", amount: "10000" },
  ]);

  const addMilestone = () => {
    setMilestones([...milestones, { title: "", amount: "" }]);
  };

  const removeMilestone = (idx: number) => {
    setMilestones(milestones.filter((_, i) => i !== idx));
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/siyam";
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Decorative Typewriter Text */}
      <div className="absolute top-20 left-10 text-[200px] font-editorial italic text-[#D9D3C7]/20 pointer-events-none -rotate-6 select-none leading-none -z-10">
        Draft
      </div>

      <Container variant="standard" className="relative z-10">
        
        {/* Header Section */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <FadeIn>
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#53605C] mb-4">
              FORM № 409-C <span className="mx-2 text-[#D9D3C7]">|</span> APPLICATION FOR SUPPORT
            </div>
          </FadeIn>
          <h1 className="font-editorial text-5xl sm:text-6xl font-medium leading-[1.1] text-[#1D2927] mb-4">
            <RevealText>Start Your Campaign</RevealText>
          </h1>
          <FadeIn delay={0.2}>
            <p className="text-[#53605C]">
              Complete this document accurately to register your cause in the global index.
            </p>
          </FadeIn>
        </div>

        {/* Wizard Form Wrapper (Physical Application Sheet) */}
        <FadeIn delay={0.3} className="max-w-3xl mx-auto">
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] shadow-paper p-8 sm:p-12 relative min-h-[600px] flex flex-col">
            
            {/* Top Corner Tape */}
            <div className="absolute -top-3 right-12 w-20 h-6 bg-[#EAE5DB] opacity-80 rotate-[3deg] z-10 shadow-sm border border-[#D9D3C7]/50"></div>
            
            {/* Paperclip */}
            <div className="absolute top-8 -left-4 z-20 text-[#8C7A5B] rotate-[-25deg]">
              <Paperclip className="h-10 w-10 stroke-[1.5]" />
            </div>

            {/* Application Header (Progress) */}
            <div className="flex items-center justify-between border-b-2 border-[#1D2927] pb-6 mb-8">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#8C7A5B]">
                Page {step} of 5
              </div>
              <div className="font-editorial text-2xl text-[#1D2927]">
                {step === 1 && "I. Primary Details"}
                {step === 2 && "II. Narrative & Context"}
                {step === 3 && "III. Visual Evidence"}
                {step === 4 && "IV. Budget Breakdown"}
                {step === 5 && "V. Final Declaration"}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#8C7A5B]">
                SEC-0{step}
              </div>
            </div>

            {/* Form Content Area */}
            <div className="flex-1">
              
              {/* STEP 1: BASICS */}
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="relative">
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-2">
                      Campaign Title (Max 100 char) *
                    </label>
                    <input
                      required
                      placeholder="e.g., Medical Support for Rina's Mother..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-[#D9D3C7] focus:border-[#1D2927] py-2 font-editorial text-2xl text-[#1D2927] placeholder:text-[#D9D3C7] placeholder:italic focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-2">
                        Goal Amount (৳) *
                      </label>
                      <input
                        required
                        type="number"
                        placeholder="50000"
                        value={goalAmount}
                        onChange={(e) => setGoalAmount(e.target.value)}
                        className="w-full bg-transparent border-b-2 border-[#D9D3C7] focus:border-[#1D2927] py-2 font-mono text-xl text-[#1D2927] placeholder:text-[#D9D3C7] focus:outline-none transition-colors"
                      />
                    </div>
                    
                    <div className="relative">
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-2">
                        Category *
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-transparent border-b-2 border-[#D9D3C7] focus:border-[#1D2927] py-2 font-mono text-sm uppercase tracking-widest text-[#1D2927] focus:outline-none cursor-pointer transition-colors"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.slug}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-2">
                      Campaign Duration *
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-[#D9D3C7] focus:border-[#1D2927] py-2 font-mono text-sm uppercase tracking-widest text-[#1D2927] focus:outline-none cursor-pointer transition-colors"
                    >
                      <option value="15">15 days</option>
                      <option value="30">30 days (Standard limit)</option>
                      <option value="60">60 days</option>
                      <option value="90">90 days (Extended)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 2: STORY */}
              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="relative">
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-2">
                      Short Summary (2 Sentences) *
                    </label>
                    <input
                      required
                      placeholder="Briefly state the core objective..."
                      value={shortDesc}
                      onChange={(e) => setShortDesc(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-[#D9D3C7] focus:border-[#1D2927] py-2 font-editorial text-xl text-[#1D2927] placeholder:text-[#D9D3C7] placeholder:italic focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <label className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-3">
                      <span>Full Narrative Context *</span>
                      <span className="text-[#8C7A5B] flex items-center gap-1"><HelpCircle className="w-3 h-3"/> Be specific</span>
                    </label>
                    <div className="relative">
                      {/* Ruled lines background effect for the textarea */}
                      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(transparent 95%, #EAE5DB 95%)', backgroundSize: '100% 32px' }}></div>
                      <textarea
                        rows={10}
                        required
                        placeholder="Detail the circumstances, the need, and the impact..."
                        value={fullStory}
                        onChange={(e) => setFullStory(e.target.value)}
                        className="w-full bg-transparent relative z-10 font-editorial text-lg text-[#1D2927] placeholder:text-[#D9D3C7] placeholder:italic focus:outline-none resize-none leading-[32px]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: MEDIA */}
              {step === 3 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="relative">
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-4">
                      Primary Photograph (Cover Image) *
                    </label>
                    <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-[#1D2927] bg-[#EAE5DB]/50 cursor-pointer hover:bg-[#EAE5DB] transition-colors">
                      <div className="w-16 h-16 border-2 border-[#1D2927] flex items-center justify-center rounded-full mb-4 bg-[#FAF8F3]">
                        <Upload className="h-6 w-6 text-[#1D2927]" />
                      </div>
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1D2927] mb-2">
                        Attach Physical Image
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C7A5B] text-center max-w-xs">
                        JPG or PNG. Ensure the image is clear and provides visual evidence of the cause.
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-2">
                      Video Evidence Link (Optional)
                    </label>
                    <input
                      placeholder="https://youtube.com/watch?v=..."
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-[#D9D3C7] focus:border-[#1D2927] py-2 font-mono text-sm text-[#1D2927] placeholder:text-[#D9D3C7] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: MILESTONES */}
              {step === 4 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="font-mono text-xs text-[#53605C] leading-relaxed mb-6">
                    Break down your goal amount into logical phases. This builds trust by showing exactly how funds will be allocated.
                  </p>

                  <div className="border border-[#1D2927] bg-[#FAF8F3]">
                    <div className="grid grid-cols-[1fr,120px,40px] gap-0 border-b border-[#1D2927] bg-[#EAE5DB] font-mono text-[10px] font-bold uppercase tracking-widest text-[#1D2927]">
                      <div className="p-3 border-r border-[#1D2927]">Milestone Description</div>
                      <div className="p-3 border-r border-[#1D2927]">Amount (৳)</div>
                      <div className="p-3 text-center">X</div>
                    </div>
                    
                    {milestones.map((m, idx) => (
                      <div key={idx} className="grid grid-cols-[1fr,120px,40px] gap-0 border-b border-[#D9D3C7] last:border-0 group">
                        <div className="border-r border-[#1D2927]">
                          <input
                            placeholder="e.g. Pre-op Diagnostic Tests"
                            value={m.title}
                            onChange={(e) => {
                              const updated = [...milestones];
                              updated[idx].title = e.target.value;
                              setMilestones(updated);
                            }}
                            className="w-full bg-transparent p-3 font-editorial text-lg text-[#1D2927] placeholder:text-[#D9D3C7] placeholder:italic focus:outline-none"
                          />
                        </div>
                        <div className="border-r border-[#1D2927]">
                          <input
                            type="number"
                            placeholder="0"
                            value={m.amount}
                            onChange={(e) => {
                              const updated = [...milestones];
                              updated[idx].amount = e.target.value;
                              setMilestones(updated);
                            }}
                            className="w-full bg-transparent p-3 font-mono text-sm text-[#1D2927] focus:outline-none text-right"
                          />
                        </div>
                        <div className="flex items-center justify-center bg-[#EAE5DB]/30 group-hover:bg-[#A84D2A]/10 transition-colors">
                          {milestones.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeMilestone(idx)}
                              className="text-[#A84D2A] hover:scale-110 transition-transform"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addMilestone}
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#1D2927] hover:text-[#A84D2A] transition-colors"
                  >
                    <Plus className="h-4 w-4" /> Add Row
                  </button>
                </div>
              )}

              {/* STEP 5: REVIEW & SUBMIT */}
              {step === 5 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="border border-[#1D2927] bg-[#FAF8F3] p-8 relative">
                    {/* Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden">
                      <div className="text-[150px] font-bold uppercase tracking-tighter -rotate-45 whitespace-nowrap">
                        DRAFT
                      </div>
                    </div>

                    <h3 className="font-editorial text-2xl text-[#1D2927] border-b border-dashed border-[#D9D3C7] pb-4 mb-6">
                      Application Summary
                    </h3>
                    
                    <div className="space-y-4 font-mono text-sm text-[#1D2927]">
                      <div className="flex justify-between border-b border-[#EAE5DB] pb-2">
                        <span className="text-[#8C7A5B] uppercase tracking-widest text-[10px]">Title:</span>
                        <span className="font-bold">{title || "Untitled Application"}</span>
                      </div>
                      <div className="flex justify-between border-b border-[#EAE5DB] pb-2">
                        <span className="text-[#8C7A5B] uppercase tracking-widest text-[10px]">Target Funds:</span>
                        <span className="font-bold text-[#A84D2A]">৳{goalAmount || "0"}</span>
                      </div>
                      <div className="flex justify-between border-b border-[#EAE5DB] pb-2">
                        <span className="text-[#8C7A5B] uppercase tracking-widest text-[10px]">Category:</span>
                        <span className="font-bold uppercase">{category}</span>
                      </div>
                      <div className="flex justify-between pb-2">
                        <span className="text-[#8C7A5B] uppercase tracking-widest text-[10px]">Duration:</span>
                        <span className="font-bold">{duration} Days</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#EAE5DB] p-6 border-l-4 border-[#1D2927]">
                    <label className="flex items-start gap-4 cursor-pointer group">
                      <div className="relative flex items-center justify-center mt-0.5">
                        <input type="checkbox" required className="peer sr-only" />
                        <div className="w-5 h-5 border-2 border-[#1D2927] bg-transparent peer-checked:bg-[#1D2927] transition-colors"></div>
                        <Check className="absolute text-[#F7F4ED] w-3 h-3 opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#53605C] leading-relaxed">
                        I hereby declare that all information provided in this document is genuine, truthful, and backed by verifiable evidence. I understand that falsification will result in immediate termination of the application.
                      </span>
                    </label>
                  </div>
                </div>
              )}

            </div>

            {/* Application Footer (Navigation & Actions) */}
            <div className="mt-12 pt-6 border-t border-[#D9D3C7] flex items-center justify-between">
              
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s - 1) as any)}
                  className="h-12 px-6 border border-[#1D2927] bg-transparent text-[#1D2927] font-bold font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-[#1D2927] hover:text-[#F7F4ED] transition-all"
                >
                  <ArrowLeft className="h-4 w-4" /> Previous Section
                </button>
              ) : (
                <div></div> // Empty div for flex spacing
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s + 1) as any)}
                  disabled={step === 1 && (!title || !goalAmount)}
                  className="h-12 px-8 border border-[#1D2927] bg-[#1D2927] text-[#F7F4ED] font-bold font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-[#FAF8F3] hover:text-[#1D2927] transition-all shadow-ink disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="h-14 px-10 border border-[#A84D2A] bg-[#A84D2A] text-[#F7F4ED] font-bold font-mono text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-[#FAF8F3] hover:text-[#A84D2A] transition-all shadow-ink active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Sign & Submit Application"}
                </button>
              )}
            </div>

          </PaperLift>
        </FadeIn>
      </Container>
    </div>
  );
}
