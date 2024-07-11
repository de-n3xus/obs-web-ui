export default function (secs) {
	secs = Math.round(secs / 1000)
	const hours = Math.floor(secs / 3600)
	secs -= hours * 3600
	const mins = Math.floor(secs / 60)
	secs -= mins * 60
	return hours > 0
		? `${hours}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
		: `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
}