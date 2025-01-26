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

	return (
		<div class="flex w-full flex-col">
			<h1 class="text-xl font-bold">{props.label}</h1>
			<div class="flex w-full gap-1">
				<Switch>
					{/* TODO: Remove false and add request when add on backend */}
					<Match when={isEditing() && false}>
						<input
							class={cn(
								'w-full rounded-md bg-white/30 px-2 py-1',
								props.inputClass
							)}
							value={props.value}
							onInput={(e) =>
								props.setValue((e.target as HTMLInputElement).value)
							}
							onBlur={() => setIsEditing(false)}
						/>
						<button onClick={() => setIsEditing(false)}>
							<CloseIcon class="size-4 text-white/60" />
						</button>
					</Match>
					<Match when={!isEditing() && true}>
						<h1 class={cn('w-full px-2 py-1', props.class)}>{props.value}</h1>
						{/* 
            <button onClick={() => setIsEditing(true)}>
							<EditIcon class="size-4 text-white/60" />
						</button> 
            */}
					</Match>
				</Switch>
			</div>
		</div>
	);
};

export default EditableField;
