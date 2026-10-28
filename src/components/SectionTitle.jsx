
export default function SectionTitle({title, subtitle}) {
    return (
        <div className="flex flex-col gap-1">
            <h2 className="lg:text-2xl text-lg md:text-xl text-amber-900 font-semibold">{title}</h2>
            <h3 className="italic md:text-lg text-sm">{subtitle}</h3>
        </div>
    )
}
