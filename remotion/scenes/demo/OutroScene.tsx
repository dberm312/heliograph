import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedGradient } from "../../components/AnimatedGradient";
import { COLORS, MODULE_COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";

type ModuleIconProps = {
  color: string;
  label: string;
  icon: string;
  initialX: number;
  initialY: number;
  delay: number;
};

const ModuleIcon: React.FC<ModuleIconProps> = ({
  color,
  label,
  icon,
  initialX,
  initialY,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance animation
  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // Converge animation (starts at frame 60)
  const converge = spring({
    frame: frame - 60,
    fps,
    config: { damping: 12, stiffness: 60 },
  });

  const x = interpolate(converge, [0, 1], [initialX, 0]);
  const y = interpolate(converge, [0, 1], [initialY, 0]);
  const scale = interpolate(entrance, [0, 1], [0.5, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Fade out individual icons after merge
  const iconFade = interpolate(frame, [90, 110], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
        opacity: opacity * iconFade,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 20,
          background: `linear-gradient(135deg, ${color}40, ${color}20)`,
          border: `2px solid ${color}60`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          boxShadow: `0 0 40px ${color}40`,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: COLORS.textSecondary,
          fontFamily: FONTS.body,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo reveal after icons merge
  const logoReveal = spring({
    frame: frame - 100,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const logoScale = interpolate(logoReveal, [0, 1], [0.8, 1]);
  const logoOpacity = interpolate(logoReveal, [0, 1], [0, 1]);

  // Tagline entrance
  const taglineProgress = spring({
    frame: frame - 120,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const taglineY = interpolate(taglineProgress, [0, 1], [30, 0]);
  const taglineOpacity = interpolate(taglineProgress, [0, 1], [0, 1]);

  // CTA entrance
  const ctaProgress = spring({
    frame: frame - 140,
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  const ctaY = interpolate(ctaProgress, [0, 1], [20, 0]);
  const ctaOpacity = interpolate(ctaProgress, [0, 1], [0, 1]);

  // Glow pulse for logo
  const glowPulse = interpolate(
    Math.sin(frame * 0.08) * 0.5 + 0.5,
    [0, 1],
    [0.3, 0.6],
  );

  return (
    <AbsoluteFill>
      <AnimatedGradient intensity={0.5} />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Module icons that converge */}
        <div
          style={{
            position: "relative",
            width: 400,
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ModuleIcon
            color={MODULE_COLORS.projectManagement.primary}
            label="Projects"
            icon="📋"
            initialX={-200}
            initialY={-100}
            delay={10}
          />
          <ModuleIcon
            color={MODULE_COLORS.versionControl.primary}
            label="Version Control"
            icon="🔀"
            initialX={200}
            initialY={-100}
            delay={20}
          />
          <ModuleIcon
            color={MODULE_COLORS.stakeholderManagement.primary}
            label="Stakeholders"
            icon="👥"
            initialX={0}
            initialY={120}
            delay={30}
          />
        </div>

        {/* Heliograph logo (reveals after merge) */}
        <div
          style={{
            marginTop: 40,
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          {/* Logo glow */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${COLORS.gradientOrange}40 0%, transparent 70%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 60px rgba(249, 115, 22, ${glowPulse})`,
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${COLORS.gradientOrange}, ${COLORS.gradientBlue})`,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              }}
            />
          </div>

          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: COLORS.textPrimary,
              fontFamily: FONTS.display,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginTop: 16,
            }}
          >
            Heliograph
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 32,
            transform: `translateY(${taglineY}px)`,
            opacity: taglineOpacity,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: COLORS.textPrimary,
              fontFamily: FONTS.display,
              lineHeight: 1.2,
            }}
          >
            One Platform.
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              background: `linear-gradient(90deg, ${COLORS.gradientOrange}, ${COLORS.gradientBlue})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: FONTS.display,
              lineHeight: 1.2,
            }}
          >
            All Your Workflows.
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: 48,
            transform: `translateY(${ctaY}px)`,
            opacity: ctaOpacity,
          }}
        >
          <div
            style={{
              padding: "16px 48px",
              borderRadius: 12,
              background: `linear-gradient(135deg, ${COLORS.gradientOrange}, ${COLORS.gradientBlue})`,
              fontSize: 18,
              fontWeight: 600,
              color: COLORS.textPrimary,
              fontFamily: FONTS.body,
              boxShadow: "0 8px 32px rgba(249, 115, 22, 0.3)",
            }}
          >
            Get Started Today
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
