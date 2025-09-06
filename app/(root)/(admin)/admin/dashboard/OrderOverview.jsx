"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A bar chart"

const chartData = [
    { month: "January", amount: 200 },
    { month: "February", amount: 305 },
    { month: "March", amount: 237 },
    { month: "April", amount: 73 },
    { month: "May", amount: 209 },
    { month: "June", amount: 214 },
    { month: "July", amount: 674 },
    { month: "August", amount: 555 },
    { month: "September", amount: 450 },
    { month: "October", amount: 34 },
    { month: "November", amount: 234 },
    { month: "December", amount: 100 },
]

const chartConfig = {
    amount: {
        label: "Amount",
        color: "#ff2056",
        // color: "var(--chart-1)",
    },
}

export function OrderOverview() {
    return (
        <div>
            <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                        cursor={true}
                        content={<ChartTooltipContent  />}
                        // content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar dataKey="amount" fill="var(--color-amount)" radius={8} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}

// Okay so, remove satisfies ChartConfig from line 37 to avoid error 