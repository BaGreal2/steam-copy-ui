import { createSignal, createContext, useContext, Show } from 'solid-js';
import { ParentProps, Component } from 'solid-js';

import { cn } from '@/lib/utils';

interface PopoverContextValue {
	isOpen: () => boolean;
	toggle: () => void;
	close: () => void;
}

const PopoverContext = createContext<PopoverContextValue>();

export const PopoverProvider: Component<ParentProps> = (props) => {
	const [isOpen, setIsOpen] = createSignal(false);

	const toggle = () => setIsOpen((prev) => !prev);
	const close = () => setIsOpen(false);

	return (
		<PopoverContext.Provider value={{ isOpen, toggle, close }}>
			{props.children}
		</PopoverContext.Provider>
	);
};

const usePopover = () => {
	const context = useContext(PopoverContext);
	if (!context) {
		throw new Error('usePopover must be used within a PopoverProvider');
	}
	return context;
};

export const Popover: Component<ParentProps> = (props) => {
	return <div class="relative inline-block">{props.children}</div>;
};

export const PopoverTrigger: Component<
	ParentProps<{ onClick?: (e: MouseEvent) => void; class?: string }>
> = (props) => {
	const { toggle } = usePopover();

	const handleClick = (e: MouseEvent) => {
		props.onClick?.(e);
		toggle();
	};

	return (
		<button
			onClick={handleClick}
			class={cn(
				'rounded-full p-2 transition-all duration-200 hover:bg-white/10 focus:outline-none',
				props.class
			)}
		>
			{props.children}
		</button>
	);
};

export const PopoverMenu: Component<ParentProps<{ class?: string }>> = (
	props
) => {
	const { isOpen, close, toggle } = usePopover();

	return (
		<Show when={isOpen()}>
			<div
				class={cn(
					'absolute right-0 top-12 z-10 flex min-w-48 flex-col gap-2 rounded-lg bg-[#1c1c1c] px-3 py-2 shadow-lg ring-1 ring-white/10',
					'text-sm text-gray-300',
					props.class
				)}
				onClick={close}
			>
				{props.children}
			</div>
			<button
				class="fixed left-0 top-0 z-0 h-full w-full cursor-default"
				onClick={() => toggle()}
			/>
		</Show>
	);
};
