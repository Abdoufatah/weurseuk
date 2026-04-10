interface AdPlacementProps {
  type: "leaderboard" | "mpu" | "sidebar" | "banner";
  className?: string;
}

const AD_SIZES: Record<string, { width: string; height: string; label: string }> = {
  leaderboard: { width: "100%", height: "90px", label: "728 x 90" },
  mpu: { width: "300px", height: "250px", label: "300 x 250" },
  sidebar: { width: "100%", height: "600px", label: "160 x 600" },
  banner: { width: "100%", height: "120px", label: "Bannière" },
};

export default function AdPlacement({ type, className = "" }: AdPlacementProps) {
  const config = AD_SIZES[type];

  return (
    <div className={`ad-label ${className}`}>
      <div
        className="border border-dashed border-border rounded-md flex items-center justify-center bg-muted/30"
        style={{ width: config.width, height: config.height, maxWidth: "100%" }}
      >
        <div className="text-center">
          <p className="text-xs text-muted-foreground font-medium">Espace publicitaire</p>
          <p className="text-[10px] text-muted-foreground/60 mt-1">{config.label}</p>
        </div>
      </div>
    </div>
  );
}
