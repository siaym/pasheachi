"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Quote } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MOCK_CAMPAIGNS, MOCK_SUCCESS_STORIES } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";

const communityPulse = [
  { mark: "+৳500", name: "Rahim", story: "stood beside a student’s tuition", time: "just now", tone: "bg-[#E5EEE8] text-[#355C52]" },
  { mark: "Goal", name: "Tanvir’s film", story: "reached its first milestone", time: "4 min ago", tone: "bg-[#F3E4DC] text-[#A84D2A]" },
  { mark: "New", name: "Maya", story: "received her first supporter", time: "8 min ago", tone: "bg-[#EEE8DC] text-[#53605C]" },
  { mark: "100%", name: "Kurigram relief", story: "was fully funded by 412 people", time: "12 min ago", tone: "bg-[#E5EEE8] text-[#355C52]" },
];

const supporters = [
  { name: "Sarah Rahman", count: "32 campaigns", quote: "Helping others is my way of giving back.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80" },
  { name: "Anonymous kindness", count: "17 dreams", quote: "A quiet reminder that someone is beside you.", avatar: "" },
  { name: "Arif Ahmed", count: "12 campaigns", quote: "Small acts become a community when we keep showing up.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80" },
];

export function CommunityHome() {
  const [pulseIndex, setPulseIndex] = useState(0);
  const featured = MOCK_CAMPAIGNS[0];

  useEffect(() => {
    const interval = window.setInterval(() => setPulseIndex((index) => (index + 1) % communityPulse.length), 3600);
    return () => window.clearInterval(interval);
  }, []);

  const activePulse = communityPulse[pulseIndex];

  return (
    <div className="paper-grain overflow-hidden">
      <section className="border-b border-[#D9D3C7] pb-16 pt-10 sm:pb-24 sm:pt-16">
        <Container variant="wide">
          <div className="mb-10 flex items-center justify-between border-b border-[#D9D3C7] pb-4 text-xs text-[#68726D]">
            <span className="font-semibold uppercase tracking-[.14em]">Bangladesh&apos;s community of support</span>
            <span className="hidden sm:inline">There is always someone beside you.</span>
          </div>
          <div className="grid gap-10 lg:grid-cols-[1.18fr_.82fr] lg:items-end">
            <div>
              <p className="journal-kicker">A place for people</p>
              <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[.95] text-[#1D2927] sm:text-7xl lg:text-[5.8rem]">Stories carry further <em className="font-normal text-[#A84D2A]">when we carry them together.</em></h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-[#53605C] sm:text-lg">From hospital rooms to classrooms, camera bags to community kitchens—PasheAchi is where people show up for one another.</p>
              <Link href="/discover" className="mt-9 inline-flex items-center gap-2 border-b-2 border-[#A84D2A] pb-2 text-sm font-bold text-[#1D2927] transition-colors hover:text-[#A84D2A]">Meet the community <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="border-t border-[#D9D3C7] pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-[#355C52]"><span className="h-2 w-2 animate-pulse rounded-full bg-[#355C52]" /> Happening now</div>
              <div className="mt-5 min-h-28 transition-opacity"><span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${activePulse.tone}`}>{activePulse.mark}</span><p className="mt-3 text-2xl font-bold leading-tight text-[#1D2927]">{activePulse.name} <span className="font-normal text-[#53605C]">{activePulse.story}.</span></p><p className="mt-3 text-xs text-[#68726D]">{activePulse.time} · Verified community activity</p></div>
              <div className="mt-6 flex gap-1.5">{communityPulse.map((_, index) => <span key={index} className={`h-1.5 rounded-full transition-all ${index === pulseIndex ? "w-7 bg-[#A84D2A]" : "w-1.5 bg-[#CFC6B8]"}`} />)}</div>
            </div>
          </div>
        </Container>
      </section>

      <section className="page-turn py-16 sm:py-24">
        <Container variant="wide">
          <div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:gap-14">
            <div className="lg:pt-8"><p className="journal-kicker">Today&apos;s lead story</p><h2 className="mt-4 text-4xl font-bold leading-tight text-[#1D2927]">Not a campaign. A family asking their community to stand close.</h2><p className="mt-5 text-sm leading-7 text-[#53605C]">Rina is raising money for her mother&apos;s urgent cardiac surgery. One hundred and forty-two people have already made room for her story.</p><Link href="/@rina/medical-fund-mother" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#A84D2A]">Read Rina&apos;s story <ArrowRight className="h-4 w-4" /></Link></div>
            <article className="border-y border-[#D9D3C7] py-5 sm:grid sm:grid-cols-[.9fr_1.1fr] sm:gap-8 sm:py-0">
              <Image src={featured.imageUrl} alt="Rina and her mother" width={800} height={600} className="h-64 w-full object-cover sm:h-full" />
              <div className="py-6 sm:py-10"><div className="flex items-center justify-between text-xs text-[#68726D]"><span>Rina Akter · Dhaka</span><span>12 days left</span></div><h3 className="mt-4 text-3xl font-bold leading-tight text-[#1D2927]">Help Rina&apos;s mother get urgent cardiac care.</h3><p className="mt-4 text-sm leading-6 text-[#53605C]">Her family has exhausted their savings. Every contribution moves the surgery and recovery one step closer.</p><div className="mt-7 border-t border-[#D9D3C7] pt-4"><div className="flex items-end justify-between"><div><p className="text-2xl font-bold">{formatCurrency(featured.raisedAmount)}</p><p className="text-xs text-[#68726D]">raised of {formatCurrency(featured.goalAmount)}</p></div><p className="text-sm font-bold text-[#355C52]">{featured.supportersCount} beside Rina</p></div><div className="mt-4 h-1.5 bg-[#E5DED1]"><div className="h-full w-[69%] bg-[#A84D2A]" /></div></div></div>
            </article>
          </div>
        </Container>
      </section>

      <section className="page-turn border-y border-[#D9D3C7] bg-[#EEE8DC] py-16 sm:py-20">
        <Container variant="wide"><div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr]"><div><p className="journal-kicker">People of PasheAchi</p><h2 className="mt-4 text-4xl font-bold leading-tight text-[#1D2927]">Dreams have names, faces and reasons to matter.</h2><p className="mt-5 text-sm leading-7 text-[#53605C]">Follow people, not just fundraisers. Every page is a living record of what a community can make possible.</p></div><div className="grid gap-px border border-[#D0C7B9] bg-[#D0C7B9] sm:grid-cols-3">{MOCK_CAMPAIGNS.slice(1, 4).map((campaign) => <Link key={campaign.id} href={`/@${campaign.creator.username}/${campaign.slug}`} className="group bg-[#F7F4ED] p-5 transition-colors hover:bg-[#FFFDF8]"><Image src={campaign.creator.avatarUrl} alt={campaign.creator.name} width={96} height={96} className="h-12 w-12 rounded-full object-cover" /><p className="mt-5 text-xs font-bold uppercase tracking-[.1em] text-[#A84D2A]">{campaign.creator.name}</p><h3 className="mt-2 text-2xl font-bold leading-tight text-[#1D2927]">{campaign.title}</h3><p className="mt-4 text-xs leading-5 text-[#68726D]">{campaign.description.slice(0, 92)}…</p><div className="mt-6 flex justify-between border-t border-[#D9D3C7] pt-3 text-xs"><span className="font-semibold text-[#355C52]">{campaign.supportersCount} supporters</span><span>{Math.round(campaign.raisedAmount / campaign.goalAmount * 100)}%</span></div></Link>)}</div></div></Container>
      </section>

      <section className="page-turn py-16 sm:py-24"><Container variant="wide"><div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr]"><div><p className="journal-kicker">The people who return</p><h2 className="mt-4 max-w-xl text-4xl font-bold leading-tight text-[#1D2927]">Support is not anonymous to us.</h2><p className="mt-5 max-w-lg text-sm leading-7 text-[#53605C]">Donors are a vital part of every story. Their names, quiet generosity and small repeat acts form the heartbeat of PasheAchi.</p><div className="mt-10 divide-y divide-[#D9D3C7] border-y border-[#D9D3C7]">{supporters.map((supporter) => <div key={supporter.name} className="flex gap-4 py-5"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E5EEE8] text-[#355C52]">{supporter.avatar ? <Image src={supporter.avatar} alt="" width={96} height={96} className="h-full w-full rounded-full object-cover" /> : <Heart className="h-5 w-5" />}</div><div><div className="flex flex-wrap items-baseline gap-x-3"><h3 className="text-lg font-bold text-[#1D2927]">{supporter.name}</h3><span className="text-xs font-semibold text-[#355C52]">★★★★★ · {supporter.count}</span></div><p className="mt-1 text-sm italic text-[#53605C]">“{supporter.quote}”</p></div></div>)}</div></div><aside className="border-l-2 border-[#A84D2A] pl-6 lg:mt-24"><Quote className="h-8 w-8 text-[#A84D2A]" /><p className="mt-5 font-editorial text-3xl font-bold leading-tight text-[#1D2927]">“When someone supports your dream, you remember the feeling long after the payment.”</p><p className="mt-5 text-xs font-bold uppercase tracking-[.12em] text-[#68726D]">— Rina Akter, Dhaka</p></aside></div></Container></section>

      <section className="bg-[#1D2927] py-16 text-[#FFFDF8] sm:py-24"><Container variant="wide"><div className="max-w-2xl"><p className="eyebrow text-[#DAB29E]">What we make possible</p><h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">Impact is a collection of individual decisions to care.</h2></div><div className="mt-12 grid divide-y divide-[#53605C] border-y border-[#53605C] sm:grid-cols-4 sm:divide-x sm:divide-y-0">{[["10,000+", "dreams supported"], ["৳2.4 Cr+", "community contributions"], ["52,000+", "acts of kindness"], ["98%", "campaigns reaching a milestone"]].map(([number, label]) => <div key={label} className="py-6 sm:px-6 sm:py-2 first:pl-0"><p className="text-4xl font-bold text-[#FFFDF8]">{number}</p><p className="mt-2 text-xs uppercase tracking-[.12em] text-[#C2CBC4]">{label}</p></div>)}</div></Container></section>

      <section className="py-16 sm:py-24"><Container variant="wide"><div className="grid gap-8 border-y border-[#D9D3C7] py-10 lg:grid-cols-[.7fr_1.3fr]"><div><p className="journal-kicker">Dreams realised</p><h2 className="mt-4 text-4xl font-bold leading-tight">The chapter after the ask.</h2></div><div className="grid gap-6 sm:grid-cols-3">{MOCK_SUCCESS_STORIES.map((story) => <article key={story.id}><Image src={story.photoUrl} alt={story.name} width={160} height={160} className="h-20 w-20 rounded-full object-cover" /><p className="mt-4 text-sm leading-6 text-[#53605C]">“{story.quote}”</p><p className="mt-4 text-xs font-bold uppercase tracking-[.1em] text-[#A84D2A]">{story.name} · {story.supportersCount} people beside them</p></article>)}</div></div><div className="mt-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"><p className="text-lg font-medium text-[#53605C]">A story is waiting for someone like you.</p><Link href="/discover" className="inline-flex items-center gap-2 rounded-lg bg-[#A84D2A] px-5 py-3 text-sm font-bold text-white hover:bg-[#843B20]">Explore all stories <ArrowRight className="h-4 w-4" /></Link></div></Container></section>
    </div>
  );
}
