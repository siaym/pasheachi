"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/lib/constants";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  HelpCircle,
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
      window.location.href = "/dashboard";
    }, 1200);
  };

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <Container variant="standard">
        {/* Wizard Progress Indicator */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-4">
            <span className="text-[#10B981]">STEP {step} OF 5</span>
            <span>
              {step === 1 && "Basics"}
              {step === 2 && "Story & Description"}
              {step === 3 && "Media & Images"}
              {step === 4 && "Milestones (Optional)"}
              {step === 5 && "Review & Submit"}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s <= step ? "bg-[#10B981]" : "bg-slate-200 dark:bg-slate-800"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Wizard Card Container */}
        <div className="max-w-3xl mx-auto rounded-3xl border border-slate-100 bg-white p-6 sm:p-10 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          {/* STEP 1: BASICS */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Start Your Campaign
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Define the core details of your cause or dream
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  label="Campaign Title *"
                  required
                  placeholder="e.g., Help Rina's Mother Get Her Surgery"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  helperText={`${title.length}/100 characters`}
                />

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 font-semibold focus:border-[#10B981] focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Goal Amount (৳) *"
                  required
                  type="number"
                  placeholder="50000"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.target.value)}
                  helperText="Minimum goal ৳1,000"
                />

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Campaign Duration *
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 font-semibold focus:border-[#10B981] focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                  >
                    <option value="15">15 days</option>
                    <option value="30">30 days (Recommended)</option>
                    <option value="60">60 days</option>
                    <option value="90">90 days</option>
                  </select>
                </div>
              </div>

              <Button
                size="lg"
                disabled={!title || !goalAmount}
                onClick={() => setStep(2)}
                className="w-full font-bold gap-2"
              >
                <span>Next: Tell Your Story</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* STEP 2: STORY */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <span className="text-xs text-[#10B981] font-semibold">Saved to draft ✓</span>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Tell Your Story
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Explain why this campaign matters and how funds will be used
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  label="Short Summary *"
                  required
                  placeholder="A concise 2-sentence overview for social cards..."
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                />

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Full Narrative Story *
                  </label>
                  <textarea
                    rows={8}
                    required
                    placeholder="Share your complete story here. Be honest, detailed, and emotional..."
                    value={fullStory}
                    onChange={(e) => setFullStory(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#10B981] focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <Button
                size="lg"
                disabled={!shortDesc || !fullStory}
                onClick={() => setStep(3)}
                className="w-full font-bold gap-2"
              >
                <span>Next: Media & Cover Image</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* STEP 3: MEDIA */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Media & Cover Image
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  High quality photos increase campaign support by 3x
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Cover Image (Required) *
                  </label>
                  <div className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 text-center dark:border-slate-800 dark:bg-slate-950">
                    <Upload className="h-10 w-10 text-[#10B981] mb-2" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Drag & drop cover image or click to browse
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1">
                      16:10 aspect ratio recommended. JPG, PNG up to 5MB.
                    </span>
                  </div>
                </div>

                <Input
                  label="Video Link (Optional)"
                  placeholder="https://youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>

              <Button size="lg" onClick={() => setStep(4)} className="w-full font-bold gap-2">
                <span>Next: Add Milestones</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* STEP 4: MILESTONES */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Milestones & Breakdown (Optional)
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Break down how funds will be used step by step
                </p>
              </div>

              <div className="space-y-3">
                {milestones.map((m, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Input
                      placeholder="Milestone title (e.g. Pre-op Diagnostic Tests)"
                      value={m.title}
                      onChange={(e) => {
                        const updated = [...milestones];
                        updated[idx].title = e.target.value;
                        setMilestones(updated);
                      }}
                    />
                    <Input
                      type="number"
                      placeholder="Amount ৳"
                      value={m.amount}
                      onChange={(e) => {
                        const updated = [...milestones];
                        updated[idx].amount = e.target.value;
                        setMilestones(updated);
                      }}
                      className="w-32 shrink-0"
                    />
                    {milestones.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMilestone(idx)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addMilestone}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#10B981] hover:underline pt-1"
                >
                  <Plus className="h-4 w-4" /> Add Another Milestone
                </button>
              </div>

              <Button size="lg" onClick={() => setStep(5)} className="w-full font-bold gap-2">
                <span>Next: Review & Publish</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* STEP 5: REVIEW & SUBMIT */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Review & Launch Campaign
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Double check your details before submitting for audit approval
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 space-y-3 dark:border-slate-800 dark:bg-slate-950 text-xs">
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-slate-500">Title:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{title || "Help Rina's Mother"}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-slate-500">Goal Amount:</span>
                  <span className="font-bold text-[#10B981]">৳{goalAmount || "50,000"}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-slate-500">Category:</span>
                  <span className="font-bold capitalize">{category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-bold">{duration} days</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 rounded text-[#10B981]" />
                  <span>
                    I certify that all information provided is genuine and truthful under penalty of account termination.
                  </span>
                </label>
              </div>

              <Button
                size="xl"
                isLoading={loading}
                onClick={handleSubmit}
                className="w-full font-bold shadow-lg shadow-[#10B981]/25 gap-2"
              >
                <Sparkles className="h-5 w-5" />
                <span>Submit Campaign for Review</span>
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
