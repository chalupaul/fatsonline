const HourTimes = {
    vigil: 1,
    prime: 5,
    matins: 6,
    terce: 9,
    sext: 12,
    nones: 15,
    vespers: 18,
    compline: 19,
}

const dayMS = 24 * 60 * 60 * 1000;

export function AddDays(date: Date, days: number) {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + days,
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    );
}

export function InLent(date: Date) {
    const year: number = date.getFullYear();
    const easter = GetEaster(year).getTime();
    const lent = GetLent(year).getTime();
    const dateMS = date.getTime();
    return dateMS < easter && dateMS > lent;
}

export function InHolyWeek(date: Date) {
    const year: number = date.getFullYear();
    const easter = GetEaster(year).getTime();
    const holyWeek = GetHolyWeek(year).getTime();
    const dateMS = date.getTime();
    return dateMS < easter && dateMS >= holyWeek;
}

export function InAdvent(date: Date) {
    // Remember, js months start at 0 (jan == 0)
    const xmasEve = new Date(date.getFullYear(), 11, 24, 0, 0, 0, 0);
    let advent = new Date(xmasEve.getTime() - 3 * 7 * dayMS);
    while (advent.getDay() != 0) {
        advent = new Date(advent.getTime() - dayMS);
    }
    const dateMS = date.getTime();
    return dateMS > advent.getTime() && dateMS < xmasEve.getTime() + dayMS;
}

export function In12DaysOfXmas(date: Date) {
    const xmas = new Date(date.getFullYear(), 11, 25, 0, 0, 0, 0);
    const jan5 = new Date(date.getFullYear(), 0, 5, 0, 0, 0, 0);
    const dateMS = date.getTime();
    return dateMS > xmas.getTime() || dateMS < jan5.getTime();
}

export function InEpiphany(date: Date) {
    const epiph = new Date(date.getFullYear(), 0, 6, 0, 0, 0, 0);
    const ashWed = GetLent(date.getFullYear());
    const dateMS = date.getTime();
    return dateMS > epiph.getTime() && dateMS < ashWed.getTime();
}

export function ThroughBaptism(date: Date) {
    const epiph = new Date(date.getFullYear(), 0, 6, 0, 0, 0, 0);
    const dow = epiph.getDay();
    const diff = 7 - dow;
    const bapt = new Date(epiph.getTime() + (diff * dayMS));
    return InEpiphany(date) && date.getTime() < (bapt.getTime() + dayMS);
}

export function IsTransfiguration(date: Date) {
    const ashWed = GetLent(date.getFullYear());
    const dow = ashWed.getDay();
    const tfig = new Date(ashWed.getTime() - (dow * dayMS));
    const dayString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const tfigString = `${tfig.getFullYear()}-${tfig.getMonth() + 1}-${tfig.getDate()}`;;
    return tfigString === dayString;
}

export function InEastertide(date: Date) {
    const year = date.getFullYear();
    const easter = GetEaster(year).getTime();
    const pentecost = GetPentecost(year).getTime();
    const MSdate = date.getTime();
    return MSdate < pentecost && MSdate >= easter;

}

export function GetAscension(year: number) {
    const easter = GetEaster(year);
    const ascension = easter.getTime() + (39 * dayMS);
    return new Date(ascension);
}

export function GetPentecost(year: number) {
    const easter = GetEaster(year);
    const pentecost = easter.getTime() + (49 * dayMS);
    return new Date(pentecost);
}

export function UntilAscension(date: Date) {
    const year = date.getFullYear();
    const easter = GetEaster(year);
    const ascension = GetAscension(year);
    const dateMS = date.getTime();
    return dateMS > easter.getTime() && dateMS < ascension.getTime();
}

export function UntilPentecost(date: Date) {
    const year = date.getFullYear();
    const ascension = GetAscension(year);
    const pentecost = GetPentecost(year);
    const dateMS = date.getTime();
    return dateMS > ascension.getTime() && dateMS < pentecost.getTime();
}

export function AfterPentecost(date:Date) {
    const year = date.getFullYear();
    const pentecost = GetPentecost(year);
    return date.getTime() >= pentecost.getTime();

}

function zeroPad(num: number, pos: number = 2) {
    return String(num).padStart(pos, '0')
}
export function GetEaster(year: number) {
	var f = Math.floor,
		// Golden Number - 1
		G = year % 19,
		C = f(year / 100),
		// related to Epact
		H = (C - f(C / 4) - f((8 * C + 13)/25) + 19 * G + 15) % 30,
		// number of days from 21 March to the Paschal full moon
		I = H - f(H/28) * (1 - f(29/(H + 1)) * f((21-G)/11)),
		// weekday for the Paschal full moon
		J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
		// number of days from 21 March to the Sunday on or before the Paschal full moon
		L = I - J,
		month = 3 + f((L + 40)/44),
		day = L + 28 - 31 * f(month / 4);
    const easterDate: string = `${year}-${zeroPad(month)}-${zeroPad(day)}`;
    return new Date(easterDate);
}

function GetLent(year: number): Date {
    const easter: Date = GetEaster(year);
    return AddDays(easter, -46);
}

function GetHolyWeek(year: number): Date {
    const easter: Date = GetEaster(year);
    return AddDays(easter, -7);
}