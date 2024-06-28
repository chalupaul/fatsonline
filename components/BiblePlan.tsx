import { ESV } from '@/constants/ESV';
import { create, all } from 'mathjs'

const mathjs = create(all, {});

const esv = ESV

export class Chapter {
    bookName: string
    chapter: string // This is b/c for Psalm 119, we embed verses as a hack
    numVerses: number
    numWords: number
    text: string[]
    constructor(bookName: string, chapter: string, numVerses: number, numWords: number) {
        this.bookName = bookName;
        this.chapter = chapter;
        this.numVerses = numVerses;
        this.numWords = numWords;
        this.text = [];
    }
}

function range(start: number, stop: number)
{
    var array = [];

    var length = stop - start; 

    for (var i = 0; i <= length; i++) { 
        array[i] = start;
        start++;
    }

    return array;
}

export function ProduceCalendar(totalDays: number, data: string) {
    // Building the chapters array
    const chaptersRaw: string[] = data.split(/\n/);

    const chapters: Chapter[] = chaptersRaw.map(line => {
        const fields = line.split(',');
        const bookName = fields[0];
        const chapter = fields[1];
        const numVerses = Number(fields[2]);
        const numWords = Number(fields[3]);
        return new Chapter(bookName, chapter, numVerses, numWords)
    })

    const sizes: number[] = Array(totalDays).fill(Math.floor(chapters.length / totalDays));

    let remaining = chapters.length % totalDays;

    while (remaining > 1) {
        const fill = Math.ceil(totalDays / remaining);
        sizes.forEach((_,i) => {
            if ((i+1) % fill === 0) {
                sizes[i]++;
            }
        })
        remaining = remaining -  Math.floor(totalDays / fill);
    }
    // This is kind of a hack, but the 1st one basically never gets incremented b/c it's all 2+ till now.
    if (remaining == 1) sizes[0]++;

    let counter: number = 0;
    const buckets: Chapter[][] = []

    sizes.forEach(s => {
        const chunk = chapters.slice(counter,counter + s);
        buckets.push(chunk);
        counter += s;
    })

    const totalWords = chapters.reduce<number>((a: number,v) => a += v.numWords,0);
    const dailyTarget = totalWords / totalDays;
    solver(buckets, dailyTarget);
    buckets.forEach(bucket => {
        bucket.forEach(chapter => {
            if (chapter.chapter.includes(':')) {
                const chapterParts = chapter.chapter.split(':')
                const realChapter = chapterParts[0]
                const verses = chapterParts[1].split('-')
                const realVerses = range(Number(verses[0]), Number(verses[1]))
                const text: string[] = realVerses.map((verseNum: number) => {
                    const realVerse = verseNum - 1;
                    // @ts-ignore
                    const verseText = ESV[chapter.bookName][realChapter][realVerse];
                    return verseText;
                })
                chapter.text = text;
            } else {
                // @ts-ignore
                chapter.text = ESV[chapter.bookName][chapter.chapter]    
            }
            
        })
    })
    return buckets;
}

function solver(buckets: Chapter[][], dailyTarget: number) {
    buckets.reverse()
    let solving = true;
    let iterations = 0;
    while (solving && iterations < 1000 ) {
        let tainted = false;
        buckets.forEach((bucket, index) => {
            if (index == buckets.length - 1) return;
            const distance =  Math.abs(bucket.reduce((a: number, v) => a += v.numWords, 0));
            const nextDistance = Math.abs(buckets[index + 1].reduce((a: number, v) => a += v.numWords, 0));
            const current = mathjs.distance([dailyTarget, dailyTarget], [distance, nextDistance]) as number;

            const shiftOverTarget = bucket[0].numWords;
            const shiftOverDistance = Math.abs(bucket.reduce((a: number, v) => a += v.numWords, 0) - shiftOverTarget)
            const shiftOverNextDistance = Math.abs(buckets[index + 1].reduce((a: number, v) => a += v.numWords, 0) + shiftOverTarget);
            const shiftOver = mathjs.distance([dailyTarget, dailyTarget], [shiftOverDistance, shiftOverNextDistance]) as number;

            const shiftBackTarget = buckets[index + 1][buckets[index + 1].length - 1].numWords;
            const shiftBackDistance = Math.abs(bucket.reduce((a: number, v) => a += v.numWords, 0) + shiftBackTarget);
            const shiftBackNextDistance = Math.abs(buckets[index + 1].reduce((a: number, v) => a += v.numWords, 0) - shiftBackTarget);
            const shiftBack = mathjs.distance([dailyTarget, dailyTarget], [shiftBackDistance, shiftBackNextDistance]) as number;

            const selection = Math.min(current, shiftOver, shiftBack);

            if (selection == shiftOver) {
                buckets[index + 1].push(bucket.shift() as Chapter);
                tainted = true;
            } else if (selection == shiftBack) {
                bucket.unshift(buckets[index + 1].pop() as Chapter);
                tainted = true;
            }
        })
        iterations++;
        if (!tainted) solving = false;
    }
    buckets.reverse()
}

function StringIt(book: string, start: string, end: string) {
    let chapter: string;
    if (start === end) {
        chapter = `${start}`
    } else {
        chapter = `${start}-${end}`
    }
    return `${book} ${chapter}`
}

export function MakeReadingTitles(bucket: Chapter[]) {
    let curBook: string = bucket[0].bookName
    let curChapterStart: string = bucket[0].chapter
    let curChapterEnd: string = bucket[0].chapter
    const readings: string[] = []

    for (let i = 1; i < bucket.length; i++) {
        if (bucket[i].bookName == curBook) {
            curChapterEnd = bucket[i].chapter;
        } else {
            const combined = StringIt(curBook, curChapterStart, curChapterEnd)
            readings.push(combined)
            curBook = bucket[i].bookName
            curChapterStart = bucket[i].chapter
            curChapterEnd = bucket[i].chapter
        }
    }
    const combined = StringIt(curBook, curChapterStart, curChapterEnd)
    readings.push(combined)
    return readings.join('; ')
}