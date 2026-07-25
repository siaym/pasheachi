import { Container } from "@/components/layout/container";
import { StatsCard } from "@/components/campaign/stats-card";
import { MOCK_STATS } from "@/data/mock";
import { Wallet, Rocket, Users, CheckCircle2 } from "lucide-react";

export function LiveStats() {
  return (
    <section className="py-12 sm:py-16">
      <Container variant="wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatsCard
            value={MOCK_STATS.totalRaised}
            label="Total Raised"
            prefix="৳"
            isCompact
            icon={<Wallet className="h-5 w-5" />}
          />
          <StatsCard
            value={MOCK_STATS.totalCampaigns}
            label="Campaigns Live"
            suffix="+"
            icon={<Rocket className="h-5 w-5" />}
          />
          <StatsCard
            value={MOCK_STATS.totalSupporters}
            label="Generous Supporters"
            suffix="+"
            icon={<Users className="h-5 w-5" />}
          />
          <StatsCard
            value={MOCK_STATS.successRate}
            label="Success Rate"
            suffix="%"
            icon={<CheckCircle2 className="h-5 w-5" />}
          />
        </div>
      </Container>
    </section>
  );
}
