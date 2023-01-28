interface DailyHabitProps {
	completed?: number;
}

export const DailyHabit: React.FC<DailyHabitProps> = ({ completed }) => {
	return <div className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg " />;
};
