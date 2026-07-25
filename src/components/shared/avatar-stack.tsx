import { Avatar } from "@/components/ui/avatar";

interface AvatarStackProps {
  avatars?: { src?: string; name: string }[];
  count: number;
}

const DEFAULT_AVATARS = [
  { name: "Arif Ahmed", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
  { name: "Fatema Tuz", src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" },
  { name: "Karim Hossain", src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" },
];

export function AvatarStack({ avatars = DEFAULT_AVATARS, count }: AvatarStackProps) {
  const visibleAvatars = avatars.slice(0, 3);
  const remainingCount = Math.max(0, count - visibleAvatars.length);

  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2.5 overflow-hidden py-0.5">
        {visibleAvatars.map((av, idx) => (
          <Avatar key={idx} src={av.src} name={av.name} size="xs" />
        ))}
      </div>
      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
        {count} supporters
      </span>
    </div>
  );
}
