module.exports = {
    content: ['./index.html', './assets/*.js'],
    theme: {
        extend: {
            colors: {
                dark: '#0a0a0c',
                darker: '#050505',
                gold: '#c5a059',
                gold_dim: '#8b6f3a',
                blood: '#8a0303',
                text_main: '#e2d9c8',
                text_muted: '#8c8577'
            },
            fontFamily: {
                serif: ['"Noto Serif SC"', '"Songti SC"', '"STSong"', '"SimSun"', 'Georgia', 'serif'],
            },
            animation: {
                'fade-in': 'fadeIn 1s ease-out forwards',
                'slide-up': 'slideUp 0.8s ease-out forwards',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        }
    }
};
