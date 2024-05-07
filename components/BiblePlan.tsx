import { create, all } from 'mathjs'

const mathjs = create(all, {});

class Chapter {
    bookName: string
    chapter: number
    numVerses: number
    numWords: number
    constructor(bookName: string, chapter: number, numVerses: number, numWords: number) {
        this.bookName = bookName;
        this.chapter = chapter;
        this.numVerses = numVerses;
        this.numWords = numWords;
    }
}

export function ProduceCalendar(totalDays: number, data: string) {
    // Building the chapters array
    const chaptersRaw: string[] = data.split(/\n/);

    const chapters = chaptersRaw.map(line => {
        const fields = line.split(',')
        return new Chapter(fields[0], Number(fields[1]), Number(fields[2]), Number(fields[3]))
    })

    // Calculate goal amount of words per day
    const totalWords = chapters.reduce<number>((a: number,v) => a += v.numWords,0);
    const dailyTarget = totalWords / totalDays; 

    // Divide into greedy chunks. The best result was always adding the chapter to the chunk
    // and swapping if it's bigger afterward. Doing look ahead math where you conditionally add
    // the chapter to the chunk or start a new chunk ends up with huge remainder.
    const chunks: Chapter[][] = [];
    let chunk: Chapter[] = [];
    chapters.forEach((chapter) => {
        chunk.push(chapter);
        const chunkSum: number = chunk.reduce((a: number, v) => a += v.numWords, 0);
        if (chunkSum >= dailyTarget) {
            chunks.push(chunk);
            chunk = [];
        }
    });
    if (chunk.length > 0) chunks.push(chunk);

    const buckets: Chapter[][] = chunks.slice(0, totalDays);
    const remaining: Chapter[] = chunks.slice(totalDays).flat(Infinity) as Chapter[];

    buckets.reverse()
    remaining.forEach(r => {
        buckets[0].push(r);
        solver(buckets, dailyTarget)
    })
    // We do it once more in case of 0 remainders. Also, it's frankly good to run this a lot.
    solver(buckets, dailyTarget);
    buckets.reverse();
    return buckets;
}

function solver(buckets: Chapter[][], dailyTarget: number) {
    let solving = true;
    let iterations = 0;
    while (solving && iterations < 1000 ) {
        let tainted = false;
        buckets.forEach((bucket, index) => {
            if (index == buckets.length - 1) return;
            const distance =  dailyTarget - Math.abs(bucket.reduce((a: number, v) => a += v.numWords, 0));
            const nextDistance = dailyTarget - Math.abs(buckets[index + 1].reduce((a: number, v) => a += v.numWords, 0));
            const current = mathjs.distance([dailyTarget, dailyTarget], [distance, nextDistance]) as number;

            const shiftOverTarget = bucket[0].numWords;
            const shiftOverDistance = dailyTarget - Math.abs(bucket.reduce((a: number, v) => a += v.numWords, 0) - shiftOverTarget)
            const shiftOverNextDistance = dailyTarget - Math.abs(buckets[index + 1].reduce((a: number, v) => a += v.numWords, 0) + shiftOverTarget);
            const shiftOver = mathjs.distance([dailyTarget, dailyTarget], [shiftOverDistance, shiftOverNextDistance]) as number;

            const shiftBackTarget = buckets[index + 1][buckets[index + 1].length - 1].numWords;
            const shiftBackDistance = dailyTarget - Math.abs(bucket.reduce((a: number, v) => a += v.numWords, 0) + shiftBackTarget);
            const shiftBackNextDistance = dailyTarget - Math.abs(buckets[index + 1].reduce((a: number, v) => a += v.numWords, 0) - shiftBackTarget);

            const shiftBack = mathjs.distance([dailyTarget, dailyTarget], [shiftBackDistance, shiftBackNextDistance]) as number;

            const selection = Math.min(current, shiftOver, shiftBack);

            if (selection == shiftOver) {
                buckets[index + 1].push(bucket.shift() as Chapter);
                tainted = true;
            } else if (selection == shiftBack) {
                const moving = buckets[index + 1][buckets[index + 1].length - 1];
                bucket.unshift(buckets[index + 1].pop() as Chapter);
                tainted = true;
            }
        })
        iterations++;
        if (!tainted) solving = false;
    }
}