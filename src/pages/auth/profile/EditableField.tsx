import { ComponentProps, createSignal, Match, Switch } from 'solid-js';

import CloseIcon from '@/icons/CloseIcon';
import EditIcon from '@/icons/EditIcon';

import { cn } from '@/lib/utils';

interface Props {
	label: string;
	value: string;
	setValue: (value: string) => void;
	inputProps?: ComponentProps<'input'>;
	inputClass?: string;
	class?: string;
}

const EditableField = (props: Props) => {
	const [isEditing, setIsEditing] = createSignal(false);

	const handleBlur = () => {
		setIsEditing(false);
	};

	return (
		<div class="flex w-full flex-col gap-2">
			<h1 class="text-lg font-semibold text-white/80">{props.label}</h1>
			<div class="flex w-full items-center gap-2">
				<Switch>
					<Match when={isEditing()}>
						<input
							value={props.value}
							onInput={(e) =>
								props.setValue((e.target as HTMLInputElement).value)
							}
							onBlur={handleBlur}
							class={cn(
								'w-48 rounded-md bg-white/20 px-2 py-1 text-white outline-none transition-all duration-200 focus:ring focus:ring-blue-400',
								props.inputClass
							)}
							placeholder={`Enter ${props.label.toLowerCase()}...`}
							{...props.inputProps}
						/>
						<button
							type="button"
							onClick={() => setIsEditing(false)}
							class="rounded-md p-1.5 transition-all hover:bg-white/20"
							title="Cancel"
						>
							<CloseIcon class="size-4 text-white/70" />
						</button>
					</Match>

					<Match when={!isEditing()}>
						<h1 class={cn('w-48 px-2 py-1 text-white/80', props.class)}>
							{props.value || `No ${props.label.toLowerCase()} set`}
						</h1>
						<button
							type="button"
							onClick={() => setIsEditing(true)}
							class="rounded-md p-1.5 transition-all hover:bg-white/20"
							title="Edit"
						>
							<EditIcon class="size-4 text-white/70" />
						</button>
					</Match>
				</Switch>
			</div>
		</div>
	);
};

export default EditableField;
