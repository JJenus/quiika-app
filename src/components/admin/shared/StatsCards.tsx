// src/components/admin/shared/StatsCards.tsx
import { Card } from "@/components/ui/Card";
import { ReactNode } from "react";

type CardProps = {
  title: string;
  value: ReactNode;
  icon: ReactNode;
  gradient: string;
};

const StatCard = ({ title, value, icon, gradient }: CardProps) => (
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-text-secondary">{title}</p>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </div>
      <div className={`p-3 rounded-xl ${gradient}`}>{icon}</div>
    </div>
  </Card>
);

type Props = {
  cards: CardProps[];
};

export const StatsCards = ({ cards }: Props) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {cards.map((c, i) => (
      <StatCard key={i} {...c} />
    ))}
  </div>
);