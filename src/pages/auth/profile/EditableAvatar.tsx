interface Props {
	avatarBlob: string;
	setAvatarBlob: (blob: string) => void;
}

const EditableAvatar = (props: Props) => {
	const handleNewAvatarUpload = (e: Event) => {
		const file = (e.target as HTMLInputElement).files?.[0] ?? null;
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				props.setAvatarBlob(e.target?.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div class="group relative size-full">
			<img
				src={props.avatarBlob}
				class="relative z-0 size-full object-cover"
				alt="Avatar"
			/>
			<div class="pointer-events-none absolute left-0 top-0 z-10 size-full bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
				<label class="absolute bottom-8 left-1/2 mb-1 -translate-x-1/2 text-sm font-medium">
					Change Avatar
				</label>
				<input
					type="file"
					class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
					onInput={handleNewAvatarUpload}
				/>
			</div>
		</div>
	);
};

export default EditableAvatar;
