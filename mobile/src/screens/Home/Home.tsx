import { View, Text, ScrollView } from 'react-native';
import { Header, DailyHabit, daySize } from '../../components';
import { generateDatesFromYearBeginning } from '../../utils/generate-dates-from-year-beginning';

export const Home = () => {
	const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	const datesFromYearBeginning = generateDatesFromYearBeginning();
	const minSummaryDates = 18 * 5 + 1;
	const daysToFillSummary = minSummaryDates - datesFromYearBeginning.length;

	return (
		<View className="flex-1 bg-background px-8 py-16">
			<Header />

			<View className="flex-row mt-6 mb-2">
				{weekDays.map((weekDay, index) => (
					<Text
						key={index}
						className="text-zinc-400 font-bold text-xl text-center mx-1"
						style={{ width: daySize }}
					>
						{weekDay}
					</Text>
				))}
			</View>
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
				<View className="flex-row flex-wrap">
					{datesFromYearBeginning.map((date) => (
						<DailyHabit key={date.toISOString()} />
					))}

					{daysToFillSummary > 0 &&
						Array.from({ length: daysToFillSummary }).map((_, index) => (
							<View
								key={index}
								className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
								style={{ width: daySize, height: daySize }}
							/>
						))}
				</View>
			</ScrollView>
		</View>
	);
};
