import dayjs from 'dayjs';
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '.';

export async function appRoutes(app: FastifyInstance) {
	app.post('/habits', async (request) => {
		const createHabitBody = z.object({
			title: z.string(),
			weekDays: z.array(z.number().min(0).max(6)),
		});
		const { title, weekDays } = createHabitBody.parse(request.body);

		//This line will create my date as today's date with the current time being reset back to 00:00:00.000z
		const today = dayjs().startOf('day').toDate();

		await prisma.habit.create({
			data: {
				title: title,
				created_at: today,
				weekDays: {
					create: weekDays.map((weekDay) => {
						return { week_day: weekDay };
					}),
				},
			},
		});
	});

	app.get('/day', async (request) => {
		const getDayParams = z.object({
			//course.date() converts the param zod gets into a date.
			date: z.coerce.date(),
		});

		const { date } = getDayParams.parse(request.query);

		const parsedDate = dayjs(date).startOf('day');
		const weekDay = parsedDate.get('day');

		const possibleHabits = await prisma.habit.findMany({
			where: {
				created_at: {
					lte: date,
				},
				weekDays: {
					some: {
						week_day: weekDay,
					},
				},
			},
		});

		const day = await prisma.day.findUnique({
			where: {
				date: parsedDate.toDate(),
			},
			include: {
				dailyHabits: true,
			},
		});

		const completedHabits = day?.dailyHabits.map((dailyHabit) => {
			return dailyHabit.habit_id;
		});

		return {
			possibleHabits,
			day,
			completedHabits,
		};
	});
}
