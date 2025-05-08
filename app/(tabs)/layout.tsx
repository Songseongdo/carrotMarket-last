import SideBar from "@/components/side-bar";

export default function TabLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex gap-2 ">
			<div className="w-12 shrink-0 pl-4 lg:w-50">
				<SideBar />
			</div>
			<div className="flex-1 overflow-auto px-5 max-w-[700px] pt-10">{children}</div>
		</div>
	);
}
