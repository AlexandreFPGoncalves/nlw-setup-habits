import { DailyHabit } from '../../components';
import { generateDatesFromYearBeginning } from '../../utils';

const summaryDates = generateDatesFromYearBeginning();

export const SummaryTable = () => {
	const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	const minSummaryDates = 18 * 7; // 18 weeks (126 days)
	const daysToFillSummary = minSummaryDates - summaryDates.length;

	return (
		<div className="w-full flex">
			{/* WeekDays */}
			<div className="grid grid-rows-7 grid-flow-row gap-3">
				{weekDays.map((weekDay, index) => (
					<div
						key={`${weekDay}-${index}`}
						className="text-zinc-400 font-bold text-xl h-10 w-10 flex items-center justify-center"
					>
						{weekDay}
					</div>
				))}
			</div>
			{/* Habits */}
			<div className="grid grid-rows-7 grid-flow-col gap-3">
				{summaryDates.map((date) => {
					return <DailyHabit key={date.toString()} />;
				})}

				{daysToFillSummary > 0 &&
					Array.from({ length: daysToFillSummary }).map((_, index) => {
						return (
							<div
								key={index}
								className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
							/>
						);
					})}
			</div>
		</div>
	);
};
