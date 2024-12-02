"use client"

import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import { DotsThreeVertical } from "@phosphor-icons/react"

import config from "@/app/config"
import { Intent } from "@/app/lib/definitions"

function IntentRow({ intent }: { intent: Intent }) {
	const [showContext, setShowContext] = useState(false)

	console.log(typeof(intent.time))
	return (
		<tr className="bg-white p-2 rounded [&>td]:p-2 align-top relative">
			<td className="pl-0 overflow-ellipsis">{intent.id}</td>
			<td>{intent.fullname}</td>
			<td>John</td>
			<td>{intent.status}</td>
			<td className="overflow-ellipsis">{intent.description}</td>
			<td>{new Date(intent.time).toLocaleString("en-SG")}</td>
			<td className="w-4">
				<button className="w-full h-full flex justify-center items-center" onClick={() => {
					setShowContext(true)
				}}>
					<DotsThreeVertical size={32} weight={"bold"} />
				</button>
			</td>
		</tr>
	)
}

function IntentContainer({ intentList }: { intentList: Intent[] }) {
	return (
		<table className="w-full table-fixed">
			<thead>
				<tr className="text-left align-top [&>th]:p-2 [&>th]:bg-[#1a1a1a] text-white">
					<th className="pl-0 rounded-l">Id</th>
					<th>Customer</th>
					<th>Assigned to</th>
					<th>Status</th>
					<th>Description</th>
					<th>Created</th>
					<th className="w-20 rounded-r">Actions</th>
				</tr>
			</thead>
			<tbody>
				{
					intentList.map((intent, i) => 
						<IntentRow key={i} intent={intent} />
					)
				}
			</tbody>
		</table>
	)
}

function FilterButton({ text, isActive }: { text: string, isActive: boolean }) {
	return (
		<button className="px-2 rounded border-black border-2" style={{
			backgroundColor: isActive ? "#fff" : "#f0f0f0",
			borderStyle: isActive ? "solid" : "none",
		}}>
			<p>{text}</p>
		</button>
	)
}

function FilterBar() {
	const [activeIdx, setActiveIdx] = useState(1)

	return (
		<div className="flex gap-2 p-2 rounded bg-[#d1d1d1]">
			<FilterButton text={"All"} isActive={activeIdx === 0} />
			<FilterButton text={"Assigned to me"} isActive={activeIdx === 1} />
		</div>
	)
}

export default function Home() {
	const [intentList, setIntentList] = useState<Intent[]>([])

	useEffect(() => {
		const client = io(config.intent.url)
		client.on("data", (intentData: Intent[]) => {
			setIntentList(intentData)
		})
		client.on("error", (msg: string) => {
			console.warn("Socket emitted error:", msg)
		})
	}, [])

	return (
		<div className="flex flex-col gap-2 p-4">
			<FilterBar />
			<IntentContainer intentList={intentList} />
		</div>
	)
}