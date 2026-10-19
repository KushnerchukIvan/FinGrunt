import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

type StatCardProps = {
    title: string
    amount: string
    change: number
    icon: LucideIcon
    color: 'emerald' | 'blue' | 'rose' | 'violet'
}

const colorStyle = {
    emerald: 'bg-emerald-500/10 text-emerald-400',
    blue: 'bg-blue-500/10 text-blue-400',
    rose: 'bg-rose-500/10 text-rose-400',
    violet: 'bg-violet-500/10 text-violet-400',
}

export default function StatCard({title, amount, change, icon: Icon, color,}: StatCardProps){
    const isPositive = change >= 0
    const {t} = useTranslation()

    return (
        <article className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-slate-400">{title}</p>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight">{amount}</h3>
                </div>
                <div className={`rounded-xl p-3 ${colorStyle[color]}`}>
                    <Icon size={22} />
                </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm">
                {isPositive ? 
                (<ArrowUpRight size={16} className="text-emerald-400" />) : 
                (<ArrowUpRight size={16} className="text-rose-400" />)}
                <span className={isPositive ? 'text-emerald-400' : 'text-rose-400'}>
                    {isPositive ? '+' : ''}{change}%
                </span>
                <span className="text-slate-500">{t('paragraph.vsLastMonth')}</span>
            </div>
        </article>
    )
}