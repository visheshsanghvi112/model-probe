import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				surface: {
					DEFAULT: 'hsl(var(--surface))',
					muted: 'hsl(var(--surface-muted))',
					elevated: 'hsl(var(--surface-elevated))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					muted: 'hsl(var(--primary-muted))',
					glow: 'hsl(var(--primary-glow))',
					variant: 'hsl(var(--primary-variant))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					muted: 'hsl(var(--accent-muted))',
					glow: 'hsl(var(--accent-glow))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))',
					muted: 'hsl(var(--success-muted))',
					glow: 'hsl(var(--success-glow))'
				},
				error: {
					DEFAULT: 'hsl(var(--error))',
					foreground: 'hsl(var(--error-foreground))',
					muted: 'hsl(var(--error-muted))',
					glow: 'hsl(var(--error-glow))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))',
					muted: 'hsl(var(--warning-muted))',
					glow: 'hsl(var(--warning-glow))'
				},
				info: {
					DEFAULT: 'hsl(var(--info))',
					foreground: 'hsl(var(--info-foreground))',
					muted: 'hsl(var(--info-muted))',
					glow: 'hsl(var(--info-glow))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
					border: 'hsl(var(--card-border))',
					elevated: 'hsl(var(--card-elevated))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-left': {
					'0%': { opacity: '0', transform: 'translateX(-30px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'slide-in-right': {
					'0%': { opacity: '0', transform: 'translateX(30px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.9)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: 'var(--shadow-glow-primary)' },
					'50%': { boxShadow: '0 0 80px hsl(260 100% 80% / 0.6), 0 0 120px hsl(280 100% 70% / 0.4)' }
				},
				'pulse-success': {
					'0%, 100%': { boxShadow: 'var(--shadow-glow-success)' },
					'50%': { boxShadow: '0 0 40px hsl(120 100% 50% / 0.6)' }
				},
				'pulse-error': {
					'0%, 100%': { boxShadow: 'var(--shadow-glow-error)' },
					'50%': { boxShadow: '0 0 40px hsl(0 100% 65% / 0.6)' }
				},
				'pulse-warning': {
					'0%, 100%': { boxShadow: '0 0 20px hsl(45 100% 60% / 0.4)' },
					'50%': { boxShadow: '0 0 40px hsl(45 100% 60% / 0.6)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'drift': {
					'0%': { transform: 'translateX(0px) translateY(0px)' },
					'33%': { transform: 'translateX(30px) translateY(-30px)' },
					'66%': { transform: 'translateX(-20px) translateY(20px)' },
					'100%': { transform: 'translateX(0px) translateY(0px)' }
				},
				'scan': {
					'0%': { left: '-100%' },
					'50%': { left: '100%' },
					'100%': { left: '100%' }
				},
				'glow-rotate': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'text-shimmer': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'status-appear': {
					'0%': { opacity: '0', transform: 'scale(0.95) rotateX(10deg)' },
					'100%': { opacity: '1', transform: 'scale(1) rotateX(0deg)' }
				},
				'card-hover': {
					'0%': { transform: 'translateY(0) scale(1)' },
					'100%': { transform: 'translateY(-8px) scale(1.02)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.3s ease-out',
				'accordion-up': 'accordion-up 0.3s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-in-up': 'fade-in-up 0.8s ease-out',
				'slide-in-left': 'slide-in-left 0.6s ease-out',
				'slide-in-right': 'slide-in-right 0.6s ease-out',
				'scale-in': 'scale-in 0.5s ease-out',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'pulse-success': 'pulse-success 2s ease-in-out infinite',
				'pulse-error': 'pulse-error 2s ease-in-out infinite',
				'pulse-warning': 'pulse-warning 2s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'drift': 'drift 20s ease-in-out infinite',
				'scan': 'scan 3s ease-in-out infinite',
				'glow-rotate': 'glow-rotate 8s linear infinite',
				'text-shimmer': 'text-shimmer 3s ease-in-out infinite',
				'status-appear': 'status-appear 0.6s ease-out',
				'card-hover': 'card-hover 0.3s ease-out'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-primary-reverse': 'var(--gradient-primary-reverse)',
				'gradient-success': 'var(--gradient-success)',
				'gradient-error': 'var(--gradient-error)',
				'gradient-warning': 'var(--gradient-warning)',
				'gradient-surface': 'var(--gradient-surface)',
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-mesh': 'var(--gradient-mesh)',
				'text-shimmer': 'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))'
			},
			backgroundSize: {
				'200%': '200% 200%'
			},
			boxShadow: {
				'glow': 'var(--shadow-glow)',
				'glow-primary': 'var(--shadow-glow-primary)',
				'glow-success': 'var(--shadow-glow-success)',
				'glow-error': 'var(--shadow-glow-error)',
				'glow-accent': 'var(--shadow-glow-accent)',
				'inner': 'var(--shadow-inner)',
				'soft': 'var(--shadow-md)',
				'xl-soft': 'var(--shadow-xl)',
				'ultimate': '0 0 100px hsl(var(--primary) / 0.3), 0 0 200px hsl(var(--accent) / 0.2)'
			},
			spacing: {
				'18': '4.5rem',
				'22': '5.5rem'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
