"use client";

import { AnimatedSection } from "@/components/ScrollAnimation";

export function DemoVideoSection() {
	return (
		<section className="px-6 py-20 md:py-32 relative">
			{/* Background overlay */}
			<div
				className="absolute inset-0 bg-white/3 backdrop-blur-sm"
				aria-hidden="true"
			/>

			<AnimatedSection className="max-w-6xl mx-auto relative">
				{/* Heading */}
				<h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-center animate-fade-in-up">
					See it in action
				</h2>

				{/* Description */}
				<p className="text-lg md:text-xl text-white/60 text-center mb-12 max-w-2xl mx-auto animate-fade-in-up delay-100">
					Watch a 1-minute walkthrough of how Heliograph connects your Product,
					Engineering, and Customer teams.
				</p>

				{/* Video container */}
				<div className="relative animate-fade-in-up delay-200">
					<div className="glass-card rounded-3xl p-2 md:p-3 noise-texture">
						<div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900/50">
							<video
								className="w-full h-full object-cover rounded-2xl"
								controls
								preload="metadata"
								playsInline
								aria-label="Heliograph product demo video"
							>
								<source src="/videos/heliograph-demo.mp4" type="video/mp4" />
								<track kind="captions" srcLang="en" label="English" />
								Your browser does not support the video tag.
							</video>
						</div>
					</div>

					{/* Decorative glow */}
					<div
						className="absolute inset-0 -z-10 blur-3xl opacity-20"
						style={{
							background:
								"linear-gradient(135deg, #f97316 0%, #3b82f6 100%)",
							transform: "scale(1.05)",
						}}
						aria-hidden="true"
					/>
				</div>

				{/* Caption */}
				<p className="text-center text-white/50 text-sm mt-6 animate-fade-in-up delay-300">
					1 minute • Project Management • Version Control • Stakeholder Tracking
				</p>
			</AnimatedSection>
		</section>
	);
}
