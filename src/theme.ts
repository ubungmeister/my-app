export const device = {
    phone: 650,
    tablet: 900,
    notebook: 1600,
    desktop: 1900,
} as const

export const theme = {
    breakpoint: {
        phone: `@media (max-width: ${device.phone}px)`,
        tablet: `@media (max-width: ${device.tablet}px)`,
        notebook: `@media (max-width: ${device.notebook}px)`,
        desktop: `@media (max-width: ${device.desktop}px)`,
    },


} as const
