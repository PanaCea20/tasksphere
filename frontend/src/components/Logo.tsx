type LogoProps = {
    withText?: boolean
    className?: string
}

export function Logo({ withText = false, className = "h-8" }: LogoProps) {
    // Use URLs so no extra plugins are needed
    const mark = new URL("../assets/tasksphere-mark.svg", import.meta.url).href
    const full = new URL("../assets/tasksphere-logo.svg", import.meta.url).href

    return <img src={withText ? full : mark} alt="TaskSphere" className={className} />
}
