import { twMerge } from "tailwind-merge"
import { clsx } from "clsx"

export default function (...inputs) {
	return twMerge(clsx(inputs))
}
