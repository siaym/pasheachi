"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { CATEGORIES } from "@/lib/constants";
import { FadeIn, RevealText, PaperLift } from "@/components/ui/motion";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Upload,
  Plus,
  Paperclip,
  CreditCard,
  Building,
  FileText,
  User,
  ShieldCheck,
  Smartphone,
  Monitor,
  Tablet
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // Form states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("medical");
  const [campaignType, setCampaignType] = useState<"flexible" | "fixed">("flexible");
  const [fixedAmount, setFixedAmount] = useState("");
  const [targetParticipants, setTargetParticipants] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [deadline, setDeadline] = useState("30");
  const [tags, setTags] = useState("");

  const [story, setStory] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const calculatedGoal = campaignType === "fixed" && fixedAmount && targetParticipants 
    ? (Number(fixedAmount) * Number(targetParticipants)).toString() 
    : goalAmount;

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard/campaigns");
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-[#F8FAFC]">
      <Container variant="standard" className="relative z-10">
        
        {/* Header Section */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <FadeIn>
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#53605C] mb-4">
              FORM № 409-C <span className="mx-2 text-[#D9D3C7]">|</span> CAMPAIGN AUTHORIZATION
            </div>
          </FadeIn>
          <h1 className="font-editorial text-5xl sm:text-6xl font-medium leading-[1.1] text-[#1D2927] mb-4">
            <RevealText>Create Campaign</RevealText>
          </h1>
          <FadeIn delay={0.2}>
            <p className="text-[#53605C]">
              Complete this 5-step application to submit your campaign for verification.
            </p>
          </FadeIn>
        </div>

        {/* Wizard Form Wrapper */}
        <FadeIn delay={0.3} className="max-w-4xl mx-auto">
          <PaperLift className="bg-[#FAF8F3] border border-[#D9D3C7] shadow-paper p-8 sm:p-12 relative min-h-[700px] flex flex-col">
            
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
                {step === 1 && "I. Campaign Information"}
                {step === 2 && "II. The Story"}
                {step === 3 && "III. Verification Documents"}
                {step === 4 && "IV. Payment Information"}
                {step === 5 && "V. Final Preview"}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#8C7A5B]">
                SEC-0{step}
              </div>
            </div>

            {/* Form Content Area */}
            <div className="flex-1">
              
              {/* STEP 1: CAMPAIGN INFO */}
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

                  <div className="relative">
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-2">
                      Subtitle (Short summary) *
                    </label>
                    <input
                      required
                      placeholder="Briefly state the core objective..."
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-[#D9D3C7] focus:border-[#1D2927] py-2 font-editorial text-xl text-[#1D2927] placeholder:text-[#D9D3C7] placeholder:italic focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-3">
                      Campaign Type *
                    </label>
                    <div className="flex gap-4">
                      <label className={`flex-1 border-2 p-4 cursor-pointer transition-all ${campaignType === 'flexible' ? 'border-[#1D2927] bg-[#EAE5DB]' : 'border-[#D9D3C7] hover:border-[#1D2927]'}`}>
                        <input 
                          type="radio" 
                          name="campaignType" 
                          value="flexible" 
                          checked={campaignType === 'flexible'} 
                          onChange={() => setCampaignType("flexible")}
                          className="sr-only" 
                        />
                        <div className="font-editorial text-lg text-[#1D2927] mb-1">Flexible Goal</div>
                        <div className="font-mono text-[10px] text-[#53605C]">Any amount can be donated until the total goal is reached.</div>
                      </label>
                      <label className={`flex-1 border-2 p-4 cursor-pointer transition-all ${campaignType === 'fixed' ? 'border-[#1D2927] bg-[#EAE5DB]' : 'border-[#D9D3C7] hover:border-[#1D2927]'}`}>
                        <input 
                          type="radio" 
                          name="campaignType" 
                          value="fixed" 
                          checked={campaignType === 'fixed'} 
                          onChange={() => setCampaignType("fixed")}
                          className="sr-only" 
                        />
                        <div className="font-editorial text-lg text-[#1D2927] mb-1">Fixed Contribution</div>
                        <div className="font-mono text-[10px] text-[#53605C]">E.g. Tours/Events where every participant pays a specific set amount.</div>
                      </label>
                    </div>
                  </div>

                  {campaignType === "flexible" ? (
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
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#EAE5DB]/50 p-6 border border-[#D9D3C7]">
                      <div className="relative">
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-2">
                          Amount Per Person (৳) *
                        </label>
                        <input
                          required
                          type="number"
                          placeholder="2000"
                          value={fixedAmount}
                          onChange={(e) => setFixedAmount(e.target.value)}
                          className="w-full bg-transparent border-b-2 border-[#D9D3C7] focus:border-[#1D2927] py-2 font-mono text-lg text-[#1D2927] placeholder:text-[#D9D3C7] focus:outline-none transition-colors"
                        />
                      </div>
                      <div className="relative">
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-2">
                          Target Participants *
                        </label>
                        <input
                          required
                          type="number"
                          placeholder="25"
                          value={targetParticipants}
                          onChange={(e) => setTargetParticipants(e.target.value)}
                          className="w-full bg-transparent border-b-2 border-[#D9D3C7] focus:border-[#1D2927] py-2 font-mono text-lg text-[#1D2927] placeholder:text-[#D9D3C7] focus:outline-none transition-colors"
                        />
                      </div>
                      <div className="relative flex flex-col justify-end pb-2">
                        <div className="font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-1">Calculated Goal</div>
                        <div className="font-editorial text-2xl text-[#1D2927]">৳{calculatedGoal || "0"}</div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-2">
                        Campaign Deadline *
                      </label>
                      <select
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full bg-transparent border-b-2 border-[#D9D3C7] focus:border-[#1D2927] py-2 font-mono text-sm uppercase tracking-widest text-[#1D2927] focus:outline-none cursor-pointer transition-colors"
                      >
                        <option value="15">15 days</option>
                        <option value="30">30 days</option>
                        <option value="60">60 days</option>
                        <option value="90">90 days</option>
                      </select>
                    </div>

                    <div className="relative">
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-2">
                        Tags (Comma separated)
                      </label>
                      <input
                        placeholder="e.g. medical, emergency, surgery"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full bg-transparent border-b-2 border-[#D9D3C7] focus:border-[#1D2927] py-2 font-mono text-sm text-[#1D2927] placeholder:text-[#D9D3C7] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: STORY */}
              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  <div className="relative">
                    <label className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-3">
                      <span>Campaign Story (Rich Text) *</span>
                    </label>
                    <div className="border border-[#1D2927] bg-white p-2 mb-2 flex gap-2 overflow-x-auto">
                      <button className="px-3 py-1 bg-[#EAE5DB] font-bold text-xs text-[#1D2927]">B</button>
                      <button className="px-3 py-1 bg-[#EAE5DB] italic text-xs text-[#1D2927]">I</button>
                      <button className="px-3 py-1 bg-[#EAE5DB] underline text-xs text-[#1D2927]">U</button>
                      <button className="px-3 py-1 border border-[#D9D3C7] font-mono text-[10px] uppercase tracking-widest">H1</button>
                      <button className="px-3 py-1 border border-[#D9D3C7] font-mono text-[10px] uppercase tracking-widest">H2</button>
                    </div>
                    <div className="relative">
                      <textarea
                        rows={8}
                        required
                        placeholder="Tell your story. Why are you raising funds? How will they be used?"
                        value={story}
                        onChange={(e) => setStory(e.target.value)}
                        className="w-full bg-transparent border-b-2 border-[#D9D3C7] focus:border-[#1D2927] py-2 font-editorial text-lg text-[#1D2927] placeholder:text-[#D9D3C7] placeholder:italic focus:outline-none resize-none leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-4">
                        Image Gallery (Cover & Details) *
                      </label>
                      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#1D2927] bg-[#EAE5DB]/50 cursor-pointer hover:bg-[#EAE5DB] transition-colors">
                        <Upload className="h-6 w-6 text-[#1D2927] mb-2" />
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1D2927]">
                          Upload Images
                        </span>
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-4">
                        Video Link (Optional)
                      </label>
                      <input
                        placeholder="https://youtube.com/watch?v=..."
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className="w-full bg-transparent border-b-2 border-[#D9D3C7] focus:border-[#1D2927] py-2 font-mono text-sm text-[#1D2927] placeholder:text-[#D9D3C7] focus:outline-none transition-colors mb-4"
                      />
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-4">
                        Additional Attachments
                      </label>
                      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#1D2927] border border-[#D9D3C7] p-2 hover:bg-[#EAE5DB] cursor-pointer w-fit">
                        <Plus className="h-3 w-3" /> Add PDF / Doc
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: VERIFICATION DOCUMENTS */}
              {step === 3 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  <div className="bg-[#EAE5DB] p-4 border-l-4 border-[#1D2927] mb-6">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#53605C] leading-relaxed flex items-start gap-2">
                      <ShieldCheck className="h-4 w-4 shrink-0 text-[#1D2927]" />
                      PasheAchi requires strict manual verification for all campaigns to ensure authenticity. Please upload the necessary legal and medical documents depending on your category.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PaperLift className="border border-[#D9D3C7] p-6 bg-[#FAF8F3] hover:border-[#1D2927] transition-colors cursor-pointer group">
                      <User className="h-6 w-6 text-[#1D2927] mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="font-bold text-sm text-[#1D2927] mb-1">National ID (NID) *</h3>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] mb-4">Required for all campaigns</p>
                      <button className="h-8 px-4 border border-[#1D2927] font-bold text-[9px] uppercase tracking-widest flex items-center gap-2 w-full justify-center">
                        <Upload className="h-3 w-3" /> Upload File
                      </button>
                    </PaperLift>

                    <PaperLift className="border border-[#D9D3C7] p-6 bg-[#FAF8F3] hover:border-[#1D2927] transition-colors cursor-pointer group">
                      <FileText className="h-6 w-6 text-[#A84D2A] mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="font-bold text-sm text-[#1D2927] mb-1">Medical Documents</h3>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] mb-4">Prescriptions, hospital bills</p>
                      <button className="h-8 px-4 border border-[#1D2927] font-bold text-[9px] uppercase tracking-widest flex items-center gap-2 w-full justify-center">
                        <Upload className="h-3 w-3" /> Upload File
                      </button>
                    </PaperLift>

                    <PaperLift className="border border-[#D9D3C7] p-6 bg-[#FAF8F3] hover:border-[#1D2927] transition-colors cursor-pointer group">
                      <Building className="h-6 w-6 text-[#1D2927] mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="font-bold text-sm text-[#1D2927] mb-1">NGO / Business Reg.</h3>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] mb-4">Trade license, NGO cert</p>
                      <button className="h-8 px-4 border border-[#1D2927] font-bold text-[9px] uppercase tracking-widest flex items-center gap-2 w-full justify-center">
                        <Upload className="h-3 w-3" /> Upload File
                      </button>
                    </PaperLift>

                    <PaperLift className="border border-[#D9D3C7] p-6 bg-[#FAF8F3] hover:border-[#1D2927] transition-colors cursor-pointer group">
                      <User className="h-6 w-6 text-[#1D2927] mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="font-bold text-sm text-[#1D2927] mb-1">Student ID</h3>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-[#53605C] mb-4">For education campaigns</p>
                      <button className="h-8 px-4 border border-[#1D2927] font-bold text-[9px] uppercase tracking-widest flex items-center gap-2 w-full justify-center">
                        <Upload className="h-3 w-3" /> Upload File
                      </button>
                    </PaperLift>
                  </div>

                </div>
              )}

              {/* STEP 4: PAYMENT INFO */}
              {step === 4 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-[#FAF8F3] border border-[#1D2927] p-8">
                    <h3 className="font-editorial text-2xl text-[#1D2927] mb-2 flex items-center gap-2">
                      <CreditCard className="h-6 w-6" /> Payment Information
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#53605C] mb-8">
                      PasheAchi collects funds securely and holds them until withdrawal is requested.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-sm text-[#1D2927] mb-2">Supported Payment Methods</h4>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-[#EAE5DB] border border-[#D9D3C7] font-mono text-[10px] uppercase tracking-widest">bKash</span>
                          <span className="px-3 py-1 bg-[#EAE5DB] border border-[#D9D3C7] font-mono text-[10px] uppercase tracking-widest">Nagad</span>
                          <span className="px-3 py-1 bg-[#EAE5DB] border border-[#D9D3C7] font-mono text-[10px] uppercase tracking-widest">Bank Transfer</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-[#1D2927] mb-2">Verification Process</h4>
                        <p className="text-sm text-[#53605C] leading-relaxed">
                          Once a donor makes a payment, it enters a "Pending" state. Our system verifies the transaction reference with the payment gateway. Once verified, the funds are added to your "Verified Balance" and can be requested for withdrawal. A standard 5% platform fee applies to verified funds.
                        </p>
                      </div>

                      <div className="bg-[#EAE5DB] p-4 border-l-4 border-[#A84D2A]">
                        <h4 className="font-bold text-sm text-[#1D2927] mb-1">Campaign Instructions</h4>
                        <p className="text-xs text-[#53605C]">
                          No further setup is required on your part. A 'Donate Now' button will automatically be added to your public campaign page, handling the entire checkout process.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: REVIEW & SUBMIT */}
              {step === 5 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between border-b border-[#D9D3C7] pb-4 mb-4">
                    <h3 className="font-editorial text-2xl text-[#1D2927]">Live Preview</h3>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setPreviewMode("mobile")} className={`p-2 border transition-colors ${previewMode === "mobile" ? "border-[#1D2927] bg-[#EAE5DB]" : "border-transparent"}`}>
                        <Smartphone className="h-4 w-4" />
                      </button>
                      <button onClick={() => setPreviewMode("tablet")} className={`p-2 border transition-colors ${previewMode === "tablet" ? "border-[#1D2927] bg-[#EAE5DB]" : "border-transparent"}`}>
                        <Tablet className="h-4 w-4" />
                      </button>
                      <button onClick={() => setPreviewMode("desktop")} className={`p-2 border transition-colors ${previewMode === "desktop" ? "border-[#1D2927] bg-[#EAE5DB]" : "border-transparent"}`}>
                        <Monitor className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Mocked Preview Container */}
                  <div className={`mx-auto border-4 border-[#1D2927] bg-white rounded-lg overflow-hidden relative transition-all duration-500 ${
                    previewMode === "mobile" ? "w-[320px] h-[568px]" : 
                    previewMode === "tablet" ? "w-[768px] h-[600px]" : 
                    "w-full h-[600px]"
                  }`}>
                    {/* Fake browser bar */}
                    <div className="h-6 border-b border-[#D9D3C7] bg-[#FAF8F3] flex items-center px-2 gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-400"></div>
                      <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    </div>
                    {/* Preview Content */}
                    <div className="p-6 overflow-y-auto h-full space-y-4">
                      <div className="h-48 bg-[#EAE5DB] w-full flex items-center justify-center text-[#53605C] font-mono text-xs uppercase">
                        Cover Image
                      </div>
                      <h1 className="font-editorial text-3xl text-[#1D2927]">{title || "Untitled Campaign"}</h1>
                      <p className="text-[#53605C] text-sm">{subtitle || "No subtitle provided."}</p>
                      <div className="h-2 w-full bg-[#EAE5DB]"></div>
                      <p className="font-mono text-xs text-[#A84D2A] uppercase">
                        Goal: ৳{calculatedGoal || "0"} 
                        {campaignType === "fixed" && <span className="text-[10px] text-[#53605C] font-normal ml-2">(৳{fixedAmount} per person)</span>}
                      </p>
                      <div className="mt-8 border-t border-[#D9D3C7] pt-4">
                        <p className="text-sm">{story || "Your story will appear here..."}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#EAE5DB] p-6 border-l-4 border-[#1D2927] mt-8">
                    <label className="flex items-start gap-4 cursor-pointer group">
                      <div className="relative flex items-center justify-center mt-0.5">
                        <input type="checkbox" required className="peer sr-only" />
                        <div className="w-5 h-5 border-2 border-[#1D2927] bg-transparent peer-checked:bg-[#1D2927] transition-colors"></div>
                        <Check className="absolute text-[#F7F4ED] w-3 h-3 opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#53605C] leading-relaxed">
                        I hereby declare that all information provided in this document is genuine, truthful, and backed by verifiable evidence. I understand that falsification will result in immediate termination of the application and potential legal action.
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
                  <ArrowLeft className="h-4 w-4" /> Previous
                </button>
              ) : (
                <div></div>
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s + 1) as any)}
                  disabled={
                    step === 1 &&
                    (!title ||
                      !subtitle ||
                      (campaignType === "flexible" && !goalAmount) ||
                      (campaignType === "fixed" && (!fixedAmount || !targetParticipants)))
                  }
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
                  {loading ? "Publishing..." : "Submit for Verification"}
                </button>
              )}
            </div>

          </PaperLift>
        </FadeIn>
      </Container>
    </div>
  );
}
