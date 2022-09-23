import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { convertHoutStringToMinutes } from './util/convert-hour-string-to-minutes'
import { convertMinutesToHourString } from './convert-minutes-to-hour-string';

const app = express();

app.use(express.json());
app.use(cors({}));


const prisma = new PrismaClient({
    log: ['query']
});

app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    Ad: true,
                }
            }
        }
    });

    return response.json(games);
});

app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body: any = request.body;

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHoutStringToMinutes(body.hourStart),
            hourEnd: convertHoutStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })



    return response.status(201).json(ad);
});


app.get('/games/:id/ads', async (request, reponse) => {

    const gameId = request.params.id;
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId,
        },
        orderBy: {
            createdAt: 'desc',
        }
    })


    return reponse.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd),
        }
    }))
});



app.get('/ads/:id/discord', async (request, reponse) => {
    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId,
        }
    })
    return reponse.json({
        dirscord: ad.discord,
    });
});

app.listen(3333);